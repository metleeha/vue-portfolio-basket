import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const BANNERIMAGE = 'bannerimage'

// Setup Firebase
const config = {
	apiKey: "AIzaSyACLDe92JVp2hp2IcEWC6bc1oswsv4UzgY",
	authDomain: "webmobile-sub2-ssafy.firebaseapp.com",
	databaseURL: "https://webmobile-sub2-ssafy.firebaseio.com",
	projectId: "webmobile-sub2-ssafy",
	messagingSenderId: "49180175175",
	appId: "1:49180175175:web:f6c4ec970a1b7ce1",
	storageBucket: 'gs://webmobile-sub2-ssafy.appspot.com'
}

firebase.initializeApp(config)
const firestore = firebase.firestore()

export default {

	getPosts() {
		const postsCollection = firestore.collection(POSTS)
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
	},
	postPost(title, body) {
		return firestore.collection(POSTS).add({
			title,
			body,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS)
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
	},
	postPortfolio(title, body, img) {
		return firestore.collection(PORTFOLIOS).add({
			title,
			body,
			img,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
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
		return firebase.auth().signInAnonymously().then(function(){
			return true;
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			console.error('[anonymous] Login Error]', error)
		});

	},
	signUp(email, password) {
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}
		// Sign in with email and pass.
		// [START createwithemail]
		return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
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
			console.log(error);
			document.getElementById('quickstart-sign-in').disabled = false;
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
	currentUser() {
		return firebase.auth().currentUser;
	},
	onAuthStateChanged() {
		return firebase.auth().onAuthStateChanged();
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

}