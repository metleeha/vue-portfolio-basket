import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioViewPage from './views/PortfolioViewPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import LoginPage from './views/LoginPage.vue'
import Team from './components/Team.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '*',
			redirect: '/'
		},
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/post',
			name: 'post',
			component: PostPage
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage
		},
		{
			path: '/portfolioview/:title/:body/:date/:imgSrc',
			name: 'portfolioview',
			component: PortfolioViewPage
		},
		{
			path: '/portfoliowriter',
			name: 'portfoliowriter',
			component: PortfolioWriterPage
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage
		},
	  	{
		  path: '/team',
		  name: 'team',
		  component: Team
	  	},

  ]
})

export default router