import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant核心组件库
import Vant from 'vant'
// 引入vant 全局样式
import 'vant/lib/index.css'
// 动态设置rem基准值
import 'amfe-flexible'
import './styles/index.less'

// 全局注册
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
