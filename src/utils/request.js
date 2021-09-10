/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '../store'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  // transformResponse 允许对原始的响应数据（字符串）进行转换
  transformResponse: [function (data) {
    try {
      // 把 JSON 格式的字符串转为 JavaScript 对象
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
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
