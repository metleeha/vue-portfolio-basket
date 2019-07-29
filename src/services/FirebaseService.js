import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const BANNERIMAGE = 'bannerimage'

// Setup Firebase
var config = require("../../ignore/firebaseAPI.json");

firebase.initializeApp(config)

/* Firebase PWA enable */
firebase.firestore().enablePersistence()
  .catch(function(err) {
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

const firestore = firebase.firestore()

export default {

	getPosts() {
		const postsCollection = firestore.collection(POSTS)
		return postsCollection
			.where('deleted','==',false)
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.id = doc.id			// 각 데이터 키값
					data.created_at = new Date(data.created_at)
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
	deletePost(id){
		return firestore.collection(POSTS).doc(id).update({
			"deleted": true,
			"deleted_at": firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS)
		return postsCollection
			.where('deleted','==',false)
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.id = doc.id			// 각 데이터 키값
					data.created_at = new Date(data.created_at)
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
	deletePortfolio(id){
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
		return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
			user.user.updateProfile({
				displayName: name,
			});
			firebase.database().ref('/users/').push({
				name: name,
				email: email,
				authority: 'visitor',
				uid: user.user.uid
			});
			return user.user;
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
	async checkAuthMaster(){
		let user = firebase.auth().currentUser;
		return firebase.database().ref('/users/')
			.orderByChild('uid')
			.equalTo(user.uid)
			.once('value')
			.then(function(snapshot){
				if(snapshot.val().authority == 'master'){
					return true;
				} else{
					return false;
				}
		})
	},
	async checkAuthMember(){
		let user = firebase.auth().currentUser;
		return firebase.database().ref('/users/')
			.orderByChild('uid')
			.equalTo(user.uid)
			.once('value')
			.then(function(snapshot){
				if(snapshot.val().authority == 'member'){
					return true;
				} else{
					return false;
				}
		})
	},
	async changeAuthMember(uid){
		if(this.checkAuthMaster){
			let key =  firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					firebase.database().ref('/users/'+childSnapshot.key).update({authority: "member"});
				});
				
			})
		}else{
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	},
	async changeAuthMaster(uid){
		if(this.checkAuthMaster){
			let key =  firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					firebase.database().ref('/users/'+childSnapshot.key).update({authority: "master"});
				});
				
			})
		}else{
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	},
	async changeAuthMember(uid){
		if(this.checkAuthMaster){
			let key =  firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					firebase.database().ref('/users/'+childSnapshot.key).update({authority: "member"});
				});
				
			})
		}else{
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	},
	async changeAuthVisitor(uid){
		if(this.checkAuthMaster){
			let key =  firebase.database().ref('/users/').orderByChild('uid').equalTo(uid).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					firebase.database().ref('/users/'+childSnapshot.key).update({authority: "visitor"});
				});
				
			})
		}else{
			alert("권한 관리는 관리자 계정만 가능합니다.");
			return;
		}
	}
}