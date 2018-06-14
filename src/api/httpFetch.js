import axios from 'axios'
import Qs from 'qs'
import store from '../store'
import { Dialog } from 'vant'
import router from '../router'
import { baseURL } from '../common/js/config'

const httpFetch = axios.create({
  baseURL,
  timeout: 15000, // request timeout
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function(data) {
      data = Qs.stringify(data)
      return data
    }
  ],
  params: {},
  // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {}
})

httpFetch.interceptors.request.use(config => {
  const flag = /logout|login|register/.test(config.url)
  if (store.getters.token && !flag) {
    config.headers.token = store.getters.token
  }
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})
httpFetch.interceptors.response.use(response => {
  // axios处理ie返回时为String类型
  if (response.data && typeof response.data === 'string') {
    response.data = JSON.parse(response.data)
  }
  if (!response || response.status !== 200) {
    console.error(`response.status:${response.status}`)
    return Promise.reject(new Error(`response.status:${response.status}`))
  } else if (response.data.code !== 1) {
    if (response.data.code === 403) {
      Dialog.alert({
        title: '提示',
        message: response.data.msg
      }).then(() => {
        // 重新登录
        if (router.history.current.path !== '/login') {
          router.replace({ path: '/login' })
        }
      })
    }
    console.error(response.data.msg)
    return Promise.reject(new Error(response.data.msg))
  } else {
    return response.data
  }
}, error => {
  console.error(error)
  return Promise.reject(error)
})
export default httpFetch
