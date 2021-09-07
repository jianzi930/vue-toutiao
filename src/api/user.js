// 引入 axios请求模块
import request from '../utils/request'
// import store from '../store'
// 调用登录接口
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
// 发送验证码接口
export const sendSms = data => {
  return request({
    url: '/app/v1_0/sms/codes/' + data
  })
}
// 获取用户信息接口
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}` // 设置头部参数，携带token数据
    // }
  })
}
// 获取用户频道接口
export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels'
  })
}
// 添加用户频道接口
export const addUserChannel = channels => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
// 删除用户频道接口
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
// 获取文章接口
export const getArticles = data => {
  return request({
    url: '/app/v1_1/articles',
    params: data
  })
}
