import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

const UserToken = 'user_token'
export default new Vuex.Store({
  state: {
    user: getItem(UserToken) // 需要全局共享的数据
  },
  mutations: {
    setUser (state, data) { // 修改user数据的方法
      state.user = data
      setItem(UserToken, data) // 修改本地存储的数据
    }
  },
  actions: {
  },
  modules: {
  }
})
