// 引入 axios请求模块
import request from '../utils/request'

// 调用获取全部频道接口
export const getArticle = (articleId) => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}
// 收藏文章
export const addStar = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deleteStar = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
// 获取评论
export function getComments (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
