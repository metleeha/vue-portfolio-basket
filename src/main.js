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
	iconfont: 'mdi',
	theme: {
		primary: '#112d4e',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})

Vue.use(VueSimplemde)

Vue.use(VueDisqus)
let app = null;

firebaseService.onAuthStateChanged( async function (user) {
	if(user){
		let uid = user.uid;
		let userInfo = await firebaseService.getUser(uid);
		store.commit('setUser', userInfo);
	}
	if(!app){
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app');
	}
});

router.beforeEach(function (to, from, next) {
	IncrementCnt.Increment(to.name)
	next()
})
