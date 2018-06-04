import axios from 'axios'
import Qs from 'qs'

const httpFetch = axios.create({
  baseURL: 'http://192.168.242.80:8080',
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
  ]
})

httpFetch.interceptors.request.use(config => {
  // // 屏蔽不需要加token头的接口
  // const flag = /getSecurityKey|getCheckCode|login/.test(config.url)
  // if (store.getters.token && !flag) {
  //   config.headers.Authorization = `${store.getters.token}`
  //   config.headers.tuid = `${store.getters.tuid}`
  // }
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
  } else {
    return response.data
  }
}, error => {
  console.error(error)
  return Promise.reject(error)
})
export default httpFetch
