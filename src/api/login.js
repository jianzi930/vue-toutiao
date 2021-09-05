// 引入 axios请求模块
import request from '../utils/request'

// 调用登录接口
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
// 调用发送验证码接口
export const sendSms = data => {
  return request({
    url: '/app/v1_0/sms/codes/' + data
  })
}
