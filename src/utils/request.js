/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '../store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

request.interceptors.request.use(function (config) {
  // 请求成功了，在发出去之前
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) { // 如果有token数据
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 请求出错，发不出去
  return Promise.reject(error)
})
export default request
