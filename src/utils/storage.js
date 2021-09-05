// 设置本地存储
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
    return
  }
  window.localStorage.setItem(key, value)
}
// 获取本地存储
export const getItem = key => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch {
    return window.localStorage.getItem(key)
  }
}
// 删除本地存储
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
