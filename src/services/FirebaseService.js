import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/messaging'
import 'firebase/database'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const BANNERIMAGE = 'bannerimage'
const SUBSCRIPTION = 'subscription'
const TOPIC_TOKEN = 'topic_token'

// Setup Firebase
var config = require("../../ignore/firebaseAPI.json");

firebase.initializeApp(config)

/* Firebase PWA enable */
firebase.firestore().enablePersistence()
	.catch(function (err) {
		if (err.code == 'failed-precondition') {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
		} else if (err.code == 'unimplemented') {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
		}
	});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const firestore = firebase.firestore();
const database = firebase.database();
const messaging = firebase.messaging();

messaging.usePublicVapidKey("BC1hwgbyv5m4x6yWj8I0V5hqir__Pa7Wu4FOwNJkc_jn31CcfpSFrJc7Mk55mTT-r-3bExBZJ0kWsZqGKnfXD70")

Notification.requestPermission().then(function(permission){
  if(permission === 'granted'){
    console.log("firebase permission granted");
  }else{
    console.log("firebase permission rejected");
  }
})

messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
	console.log('Token refreshed.');
	
	
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

messaging.getToken().then(function(currentToken) {
	console.log(currentToken)
  if (currentToken) {
	var flag = false;
	console.log("getted" , currentToken);
	getTopics().then(function (data){
	  data.forEach(function (elem){
		if(elem.token == currentToken){
		  flag = true
		  throw "Already Saved";
		}
	  })
	  if(!flag){
		firestore.collection(TOPIC_TOKEN).add({
		  token : currentToken,
		  created_at : firebase.firestore.FieldValue.serverTimestamp()
		})
		console.log("Saved")
	  }
	})
  } else {
	console.log('No Instance ID token available. Request permission to generate one.');
  }
}).catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
})

messaging.onMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle =  payload.data.title;
  var notificationOptions = {
    body: payload.data.str,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
})

function getTopics(){
  const postsCollection = firestore.collection(TOPIC_TOKEN)
  return postsCollection
    .orderBy('created_at', 'desc')
    .get()
    .then((docSnapshots) => {
      return docSnapshots.docs.map((doc) => {
        let data = doc.data()
        data.created_at = new Date(data.created_at.toDate())
        return data
      })
    })
}


export default {

	getPosts() {
		const postsCollection = firestore.collection(POSTS)
		return postsCollection
			.where('deleted', '==', false)
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.id = doc.id			// 각 데이터 키값
					// data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	getPost(id) {
		var cityRef = firestore.collection(POSTS).doc(id);
		var getDoc = cityRef.get()
			.then(doc => {
				if (!doc.exists) {
					console.log('No such document!')
				} else {
					return doc.data()
				}
			})
			.catch(err => {
				console.log('Error getting document', err)
			})

		return getDoc
	},
	postPost(title, body) {
		return firestore.collection(POSTS).add({
			title,
			body,
			created_at: firebase.firestore.FieldValue.serverTimestamp(),
			deleted: false
		})
	},
	updatePost(id, title, body) {
		return firestore.collection(POSTS).doc(id).update({
			"title": title,
			"body": body,
		})
	},
	deletePost(id) {
		return firestore.collection(POSTS).doc(id).update({
			"deleted": true,
			"deleted_at": firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS)
		return postsCollection
			.where('deleted', '==', false)
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.id = doc.id			// 각 데이터 키값
					// data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	getPortfolio(id) {
		var cityRef = firestore.collection(PORTFOLIOS).doc(id);
		var getDoc = cityRef.get()
			.then(doc => {
				if (!doc.exists) {
					console.log('No such document!')
				} else {
					return doc.data()
				}
			})
			.catch(err => {
				console.log('Error getting document', err)
			})

		return getDoc
	},
	postPortfolio(title, body, img) {
		return firestore.collection(PORTFOLIOS).add({
			title,
			body,
			img,
			created_at: firebase.firestore.FieldValue.serverTimestamp(),
			deleted: false
		})
	},
	updatePortfolio(id, title, body, img) {
		return firestore.collection(PORTFOLIOS).doc(id).update({
			"title": title,
			"body": body,
			"img": img,
		})
	},
	deletePortfolio(id) {
		return firestore.collection(PORTFOLIOS).doc(id).update({
			"deleted": true,
			"deleted_at": firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	getBannerImage() {
		const postsCollection = firestore.collection(BANNERIMAGE)
		return postsCollection
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					return data
				})
			})
	},
	postBannerImage(img) {
		return firestore.collection(BANNERIMAGE).add({
			img
		})
	},
	signInWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function (result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function (error) {
			console.error('[Google Login Error]', error)
		})
	},
	signInWithFacebook() {
		let provider = new firebase.auth.FacebookAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(function (result) {

			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			let token = result.credential.accessToken;
			// The signed-in user info.
			let user = result.user;
			return result;
			// ...
		}).catch(function (error) {
			console.error('[Facebook Login Error]', error)
		});
	},
	signInWithGithub() {
		let provider = new firebase.auth.GithubAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(function (result) {
			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			return result;
			// ...
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			if (errorCode == "auth/account-exists-with-different-credential") {
				alert("이미 가입되어있는 이메일입니다.");
			}
			console.error('[Github Login Error]', error)
			// ...
		});
	},
	signInAnonymously() {
		return firebase.auth().signInAnonymously().then(function () {
			return true;
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			console.error('[anonymous] Login Error]', error)
		});

	},
	signUp(email, password, name) {

		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}

		if (name.length < 4) {
			alert('Please enter name');
			return;
		}

		// Sign in with email and pass.
		// [START createwithemail]
		return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (data) {
			data.user.updateProfile({
				displayName: name,
			});
			database.ref('/users/'+data.user.uid).set ({
				name: name,
				email: email,
				authority: 'visitor',
			});
			return data.user;
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode == 'auth/weak-password') {
				alert('The password is too weak.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			// [END_EXCLUDE]
		});

		// [END createwithemail]
	},
	signIn(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
			// [END_EXCLUDE]
		});
	},
	signOut() {
		return firebase.auth().signOut().then(function () {
			return true;
		}).catch(function (error) {
			// An error happened.
			alert("Error: " + error)
		});
	},
	resetPW(email) {
		return firebase.auth().sendPasswordResetEmail(email).then(function () {
			// Email sent.
			return true;
		}).catch(function (error) {
			// An error happened.
			console.log("[Password reset error]: " + error);
		});
	},
	getTodayView() {
		let today = new Date()
		let formattedToday = (today.getMonth() + 1) + '월 ' + today.getDate() + '일'
		return firebase.database().ref('/Page/' + formattedToday + '/home').once('value').then(function (snapshot) {
			let todayView = snapshot.val()
			if (todayView != null) {
				return todayView.View
			}
			else {
				return 0
			}
		})
	},
	async getTotalView() {
		return firebase.database().ref('/Page/TotalView').once('value').then(function (snapshot) {
			let TotalView = snapshot.val().View
			return TotalView
		})
	},
	async checkAuthMaster() {
		const user = await firebase.auth().currentUser;
		if (!user) {
			return false;
		}
		return await firebase.database().ref('/users/')
			.orderByChild('uid')
			.equalTo(user.uid)
			.once('value')
			.then(function (snapshot) {
				console.log(snapshot.val());
				if (snapshot.val().authority == 'master') {
					return true;
				} else {
					return false;
				}
			})
	},
	async checkAuthMember() {
		const user = await firebase.auth().currentUser;
		if (!user) {
			return false;
		}
		return await firebase.database().ref('/users/')
			.orderByChild('uid')
			.equalTo(user.uid)
			.once('value')
			.then(function (snapshot) {
				const auth = snapshot.val().authority;
				if (auth == 'member' || auth == 'master') {
					return true;
				} else {
					return false;
				}
			})
	},
	async changeAuthMember(uid) {
		if (this.checkAuthMaster) {
			let key = firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					firebase.database().ref('/users/' + childSnapshot.key).update({ authority: "member" });
				});

			})
		} else {
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	},
	async changeAuthMaster(uid) {
		if (this.checkAuthMaster) {
			let key = firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					firebase.database().ref('/users/' + childSnapshot.key).update({ authority: "master" });
				});

			})
		} else {
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	},
	async changeAuthMember(uid) {
		if (this.checkAuthMaster) {
			let key = firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					firebase.database().ref('/users/' + childSnapshot.key).update({ authority: "member" });
				});

			})
		} else {
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	},
	async changeAuthVisitor(uid) {
		if (this.checkAuthMaster) {
			let key = firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					firebase.database().ref('/users/' + childSnapshot.key).update({ authority: "visitor" });
				});

			})
		} else {
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	},
	async getUser(uid) {
		if (uid != null) {
			let user = await database.ref('/users/'+uid).once('value').then(function (snapshot) {
				return snapshot.val();
			})
			return user;
		} else {
			return { name: 'Anonymous', email: 'None', authority: 'visitor' };
		}
	},
	onAuthStateChanged(f) {
		return firebase.auth().onAuthStateChanged(f);
	}

}