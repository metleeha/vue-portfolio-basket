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

import firebase from 'firebase'

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

let app;

firebase.auth().onAuthStateChanged(function (user) {
	if(!app){
		app = new Vue({
			router,
			store,
			render: h => h(App) 
		}).$mount('#app')
	}
	if (user) {
		// User is signed in.
		if(user.isAnonymous){
			store.state.user = {name: 'Anonymous', email: 'None'}
		}else{
			store.state.user = {name: user.displayName, email: user.email }
		}
		
	} else {
		// User is signed out.
		// ...
	}
});



router.beforeEach(function(to, from, next) {
	IncrementCnt.Increment(to.name)
	next()
})
