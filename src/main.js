import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import IncrementCnt from './services/IncrementCnt'

import firebaseService from './services/FirebaseService'

export const bus = new Vue()

Vue.config.productionTip = false

Vue.use(Vuetify, {
	iconfont: 'fa',
	theme: {
		primary: '#112d4e',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})

Vue.use(VueSimplemde)

Vue.use(VueDisqus)

firebaseService.onAuthStateChanged(function (user) {
	let uid = user.uid;
	let userInfo = firebaseService.getUser(uid);
	store.commit('setUser', user);

	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
});

router.beforeEach(function (to, from, next) {
	IncrementCnt.Increment(to.name)
	next()
})



const applicationServerPublicKey = 'BC1hwgbyv5m4x6yWj8I0V5hqir__Pa7Wu4FOwNJkc_jn31CcfpSFrJc7Mk55mTT-r-3bExBZJ0kWsZqGKnfXD70';

// // var express = require('express')
// var pushapp = express.Router()


// let isSubscribed = false;
// let swRegistration = null;

function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

// if ('serviceWorker' in navigator && 'PushManager' in window) {
// 	console.log('Service Worker and Push is supported');
  
// 	navigator.serviceWorker.register('sw.js')
// 	.then(function(swReg) {
// 	  console.log('Service Worker is registered', swReg);
  
// 	  swRegistration = swReg;
// 	  initialiseUI();
// 	})
// 	.catch(function(error) {
// 	  console.error('Service Worker Error', error);
// 	});
//   } else {
// 	console.warn('Push messaging is not supported');
//   }

//   function initialiseUI() {

// 	if (isSubscribed) {
// 	  // TODO: Unsubscribe user
// 	} else {
// 	  subscribeUser();
// 	}

// 	// Set the initial subscription value
// 	swRegistration.pushManager.getSubscription()
// 	.then(function(subscription) {
// 	  isSubscribed = !(subscription === null);
  
// 	  updateSubscriptionOnServer(subscription);
  
// 	  if (isSubscribed) {
// 		console.log('User IS subscribed.');
// 	  } else {
// 		console.log('User is NOT subscribed.');
// 	  }
// 	});
//   }

//   function subscribeUser() {
// 	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

// 	swRegistration.pushManager.subscribe({
// 	  userVisibleOnly: true,
// 	  applicationServerKey: applicationServerKey
// 	})
// 	.then(function(subscription) {
// 	  console.log('User is subscribed:', subscription);
  
// 	  updateSubscriptionOnServer(subscription);

// 	  sendSubscriptionToBackEnd(subscription)

// 	  isSubscribed = true;
// 	})
// 	.catch(function(err) {
// 	  console.log('Failed to subscribe the user: ', err);
// 	});
//   }
  
//   function sendSubscriptionToBackEnd(subscription) {
// 	return fetch('/api/save-subscription/', {
// 	  method: 'POST',
// 	  headers: {
// 		'Content-Type': 'application/json'
// 	  },
// 	  body: JSON.stringify(subscription)
// 	})
// 	.then(function(response) {
// 	  if (!response.ok) {
// 		throw new Error('Bad status code from server.');
// 	  }
  
// 	  return response.json();
// 	})
// 	.then(function(responseData) {
// 	  if (!(responseData.data && responseData.data.success)) {
// 		throw new Error('Bad response from server.');
// 	  }
// 	});
//   }

  

//   pushapp.post('/api/save-subscription/', function (req, res) {
// 	  return saveSubscriptionToDatabase(req.body)
// 	  .then(function(subscriptionId) {
// 		res.setHeader('Content-Type', 'application/json');
// 		res.send(JSON.stringify({ data: { success: true } }));
// 	  })
// 	  .catch(function(err) {
// 		res.status(500);
// 		res.setHeader('Content-Type', 'application/json');
// 		res.send(JSON.stringify({
// 		  error: {
// 			id: 'unable-to-save-subscription',
// 			message: 'The subscription was received but we were unable to save it to our database.'
// 		  }
// 		}));
// 	  });
// })

//   function saveSubscriptionToDatabase(subscription) {
// 	return firebaseService.postSubscription(subscription);
//   }

//   function updateSubscriptionOnServer(subscription) {
// 	// // TODO: Send subscription to application server
// 	// const subscriptionJson = document.querySelector('.js-subscription-json');
// 	// const subscriptionDetails =
// 	//   document.querySelector('.js-subscription-details');
  
// 	// if (subscription) {
// 	//   subscriptionJson.textContent = JSON.stringify(subscription);
// 	//   subscriptionDetails.classList.remove('is-invisible');
// 	// } else {
// 	//   subscriptionDetails.classList.add('is-invisible');
// 	// }
//   }

//   const vapidKeys = {
// 	publicKey:
//   'BC1hwgbyv5m4x6yWj8I0V5hqir__Pa7Wu4FOwNJkc_jn31CcfpSFrJc7Mk55mTT-r-3bExBZJ0kWsZqGKnfXD70',
// 	privateKey: '1JRyjA88pExwzcASksxNIuagdAdUR59y64Nk_B5Jrgg'
//   };
  
//   const webpush = require('web-push');

//   webpush.setVapidDetails(
// 	'mailto:web-push-book@gauntface.com',
// 	vapidKeys.publicKey,
// 	vapidKeys.privateKey
//   );

//   pushapp.post('/api/trigger-push-msg/', function (req, res) {
// 	return getSubscriptionFromDatabase()
//   .then(function(subscriptions) {
//     let promiseChain = Promise.resolve();

//     for (let i = 0; i < subscriptions.length; i++) {
//       const subscription = subscriptions[i];
//       promiseChain = promiseChain.then(() => {
//         return triggerPushMsg(subscription, dataToSend);
//       });
//     }

//     return promiseChain;
//   })
// })

//   async function getSubscriptionFromDatabase() {
// 	const subscriptions = await firebaseService.getSubscription()
// 	return subscriptions
//   }

//   const triggerPushMsg = async function(subscription, dataToSend) {
// 	return await webpush.sendNotification(subscription, dataToSend)
// 	.catch((err) => {
// 	  if (err.statusCode === 404 || err.statusCode === 410) {
// 		console.log('Subscription has expired or is no longer valid: ', err);
// 		return deleteSubscriptionFromDatabase(subscription._id);
// 	  } else {
// 		throw err;
// 	  }
// 	});
//   };
