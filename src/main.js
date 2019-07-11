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
export const bus = new Vue()

Vue.config.productionTip = false

Vue.use(Vuetify, {
	iconfont: 'fa',
	theme: {
		primary: '#3f51b5',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})

Vue.use(VueSimplemde)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach(function(to, from, next) {
	IncrementCnt.Increment(to.name)
	console.log(from.name+' -> '+to.name)
	next()
})
