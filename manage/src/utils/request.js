import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const API_KEY = '227415ba68c811e9b1a48c8590c7151e'
    config.headers['X-API-KEY'] = API_KEY

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response

    // if the custom code is not 200, it is judged as an error.
    if (res.status !== 200) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    if (error.response && error.response.status && error.response.status === 400) {
      Message({
        message: '用户名或密码错误，请重新输入',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response && error.response.status && error.response.status === 500) {
      // Message({
      //   message: '对不起，服务器出现异常',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // to re-login
      MessageBox.confirm('身份验证已过期， 请重新登录', '登出确认', {
        confirmButtonText: '确认',
        // cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (error.response && error.response.status && error.response.status === 700) {
      // to re-login
      MessageBox.confirm('身份验证已过期， 请重新登录', '登出确认', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消登录',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      console.log('ERROR: ' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
