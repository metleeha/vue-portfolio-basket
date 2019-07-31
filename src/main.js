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

import VueDisqus from 'vue-disqus'
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

let isSubscribed = false;
let swRegistration = null;

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

if ('serviceWorker' in navigator && 'PushManager' in window) {
	console.log('Service Worker and Push is supported');

	navigator.serviceWorker.register('sw.js')
		.then(function (swReg) {
			console.log('Service Worker is registered', swReg);

			swRegistration = swReg;
			initialiseUI();
		})
		.catch(function (error) {
			console.error('Service Worker Error', error);
		});
} else {
	console.warn('Push messaging is not supported');
}

function initialiseUI() {

	if (isSubscribed) {
		// TODO: Unsubscribe user
	} else {
		subscribeUser();
	}

	// Set the initial subscription value
	swRegistration.pushManager.getSubscription()
		.then(function (subscription) {
			isSubscribed = !(subscription === null);

			updateSubscriptionOnServer(subscription);

			if (isSubscribed) {
				console.log('User IS subscribed.');
			} else {
				console.log('User is NOT subscribed.');
			}
		});
}

function subscribeUser() {
	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

	swRegistration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: applicationServerKey
	})
		.then(function (subscription) {
			console.log('User is subscribed:', subscription);

			updateSubscriptionOnServer(subscription);

			isSubscribed = true;
		})
		.catch(function (err) {
			console.log('Failed to subscribe the user: ', err);
		});
}

function updateSubscriptionOnServer(subscription) {
	// TODO: Send subscription to application server
	const subscriptionJson = document.querySelector('.js-subscription-json');
	const subscriptionDetails =
		document.querySelector('.js-subscription-details');

	if (subscription) {
		subscriptionJson.textContent = JSON.stringify(subscription);
		subscriptionDetails.classList.remove('is-invisible');
	} else {
		subscriptionDetails.classList.add('is-invisible');
	}
}