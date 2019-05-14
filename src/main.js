import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import config from './assets/js/config'
import utils from './assets/js/utils'
import axios from 'axios'
import qs from 'qs'

FastClick.attach(document.body)

import 'mint-ui/lib/style.css'
import {Toast, Indicator, DatetimePicker,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator

Vue.config.productionTip = false
axios.defaults.timeout = 5000
// axios兼容IE 8-9
axios.interceptors.response.use(response => {
	// IE 8-9
	if (response.data == null && response.config.responseType === 'json' && response.request.responseText != null) {
		try {
			// eslint-disable-next-line no-param-reassign
			response.data = JSON.parse(response.request.responseText)
		} catch (e) {
			// ignored
		}
	}
	return response
})

axios.interceptors.request.use(config => {
	const API_KEY = '227415ba68c811e9b1a48c8590c7151e'
	config.headers = {
	  'X-API-KEY': API_KEY,
	}
	return config
},err => {
	return Promise.reject(err)
})

// let uploadOSS = function (type, options) {
// 	return new Promise((resolve, reject) => {
// 		if (type === 'image') {

// 		} else if (type === 'audio') {
			
// 		}
// 	})
// }

let request = function (options) {
	let dataParams = options.data
	let data = {}
	let requestUrl = options.url
	let showLoading = options.showLoading==undefined ? true : options.showLoading

	if(options.upload){ // 上传图片
		return axios({
			url: config.baseApi + requestUrl,
			method: options.method,
			responseType: 'json',
			data: options.data,
			headers:{'Content-Type':'multipart/form-data'}
		})
	}

	for (let key in dataParams) {
		data[key] = dataParams[key]
	}
	data = qs.stringify(data)
	let method = options.method.toLowerCase()
	let needStrParam = method === 'get' || method === 'put' || method === 'delete'
	if(data.length && needStrParam){
		requestUrl += config.baseApi.indexOf('?')>=0 ? '&' : '?'
		requestUrl += data
	}

	if(showLoading){
		Indicator.open({
	  		spinnerType: 'fading-circle'
		})
	}
	
	return new Promise(function(resolve, reject){
		axios({
			url: config.baseApi + requestUrl,
			method: options.method,
			responseType: options.dataType || 'json',
			data: needStrParam ? '' : data
		}).then(res=>{
			showLoading && Indicator.close()
			if(res.data.success){
				resolve(res.data)
			}else{
				reject(res.data)
			}
		}).catch(e=>{
			showLoading && Indicator.close()
			reject(e)
		})
	})
}

// Vue.prototype.$oss = uploadOSS
Vue.prototype.$axios = axios
Vue.prototype.$ajax = request
Vue.prototype.siteConfig = config
Vue.prototype.siteUtils = utils

Vue.prototype.setTitle = function(title){
	document.title = title
}

Vue.prototype.goBack = function(){
	window.history.length > 1 ? router.go(-1) : router.push('/')
}

//设置页面字体大小
let resizeTimer;
let setFontSize = ()=>{
	let winW = document.documentElement.clientWidth || document.body.clientWidth
  	document.getElementsByTagName('html')[0].style.fontSize = winW / 375 * 100 + 'px';
};
window.onresize = ()=>{
  	clearTimeout(resizeTimer);
  	resizeTimer = setTimeout(()=>{
    	setFontSize()
  	}, 500)
}
setFontSize();




router.beforeEach((to, from, next) => {
	// if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
	// 	if (store.state.loginStatus == 1) {  // 通过vuex state获取当前的loginStatus
	// 		next();
	// 	}
	// 	else {
	// 		next({
	// 			path: '/login',
	// 			query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
	// 		})
	// 	}
	// } else {
	// 	next()
	// }
	next()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#appBox')
