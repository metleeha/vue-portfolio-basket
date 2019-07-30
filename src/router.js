import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioViewPage from './views/PortfolioViewPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import LoginPage from './views/LoginPage.vue'
import AdminPage from './views/AdminPage.vue'

import FirebaseService from '@/services/FirebaseService'

import { Verify } from 'crypto';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '*',
			redirect: '/',
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		// {
		// 	path: '/post',
		// 	name: 'post',
		// 	component: PostPage
		// },
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage
		},
		{
			path: '/portfolioview/:id?/',
			name: 'portfolioview',
			component: PortfolioViewPage,
			props: true,
		},
		// {
		// 	path: '/portfoliowriter',
		// 	name: 'portfoliowriter',
		// 	component: PortfolioWriterPage
		// },
		// {
		// 	path: '/login',
		// 	name: 'login',
		// 	component: LoginPage
		// },
		{
			path: '/admin',
			name: 'admin',
			component: AdminPage,
			beforeEnter: async (to, from, next)=>{
				const check = await FirebaseService.checkAuthMaster();
				if(check){
					next();
				}else{
					alert('admin 접근 권한이 필요합니다.');
					next('/');
				}
			}
		}

  ]
})



export default router