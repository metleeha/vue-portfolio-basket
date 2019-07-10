import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioViewPage from './views/PortfolioViewPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import LoginPage from './views/LoginPage.vue'
import FirebaseService from './services/FirebaseService.js'
import firebase from 'firebase'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
			beforeEnter: (to, from, next) => {
				IncrementCnt('Home')
				next()
			}
		},
		{
			path: '/post',
			name: 'post',
			component: PostPage,
			beforeEnter: (to, from, next) => {
				console.log("this is post")
				next()
			}
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage,
			beforeEnter: (to, from, next) => {
				IncrementCnt('Portfolio')
				next()
			}
		},
		{
			path: '/portfolioview/:title/:body/:date/:imgSrc',
			name: 'portfolioview',
			component: PortfolioViewPage,
			beforeEnter: (to, from, next) => {
				IncrementCnt('Portfolio')
				next()
			}
		},
		{
			path: '/portfoliowriter',
			name: 'portfoliowriter',
			component: PortfolioWriterPage,
			beforeEnter: (to, from, next) => {
				console.log("this is portfoliowriter")
				next()
			}
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage,
			beforeEnter: (to, from, next) => {
				IncrementCnt('Login')
				next()
			}
		}
  ]
})

function IncrementCnt(path) {
	var curNo = 0
	firebase.database().ref('/Page/'+ path).once('value').then(function(snapshot){
		curNo = snapshot.val().View
		console.log(curNo)
		firebase.database().ref('/Page/'+path).set({
			View: curNo+1
		})

		console.log(path+ '\t: '+ (curNo+1))
	})


	firebase.database().ref('Page/Login').set({
	  View: curNo + 1
	});
  }

export default router