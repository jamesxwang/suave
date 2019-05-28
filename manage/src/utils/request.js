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
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res && res.err_msg && res.err_code !== 0) {
      if (res.err_code === 7) {
        // to re-login
        MessageBox.confirm('由于您长时间未操作，已自动为您登出后台管理系统', '请重新登录', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.err_msg || 'error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res.err_msg || 'error')
    } else {
      return res
    }
  },
  error => {
    if (error.response && error.response.data && error.response.data.err_msg && error.response.data.err_code === 3) {
      Message({
        message: '用户名或密码错误，请重新输入',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response && error.response.status && error.response.status === 500) {
      Message({
        message: '对不起，服务器出现异常',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      console.log('ERROR: ' + error) // for debug
      Message({
        message: error.response.data.err_msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
