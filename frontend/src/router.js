import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/views/Home.vue')
const Index = () => import('@/views/Index.vue')
const Detail = () => import('@/views/Detail.vue')
const Order = () => import('@/views/Order.vue')
const Register = () => import('@/views/Register.vue')

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: Home,
		children: [{
			path: '/',
			name: 'Index',
			component: Index,
			meta: {
				keepAlive: false,
				requireAuth: false
			}
		},{
			path: '/order',
			name: 'Order',
			component: Order,
			meta: {
				keepAlive: false,
				requireAuth: false
			}
		},{
			path: '/detail',
			name: 'Detail',
			component: Detail,
			meta: {
				keepAlive: false,
				requireAuth: false
			}
		},{
			path: '/random',
			name: 'Random',
			component: Index,
			meta: {
				keepAlive: false,
				requireAuth: false
			}
		}],
		meta: {
			keepAlive: false,
			requireAuth: false
		}
	}, {
		path: '/register',
		name: 'Register',
		component: Register,
		meta: {
			keepAlive: false,
			requireAuth: false
		}
	}]
})
