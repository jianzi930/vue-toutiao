// 引入 axios请求模块
import request from '../utils/request'

// 调用获取全部频道接口
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
