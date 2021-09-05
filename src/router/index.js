import Vue from 'vue'
// 引入路由函数
import VueRouter from 'vue-router'

// 注册全局组件
Vue.use(VueRouter)

// 配置路由规则
const routes = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

// 利用规则创建路由对象
const router = new VueRouter({
  routes
})

// 导出到 main.js 注入到vue实例
export default router
