// 引入 axios请求模块
import request from '../utils/request'

// 获取联想建议
export const getSuggestions = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getResults = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params
  })
}
