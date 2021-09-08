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
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    redirect: '/home',
    children: [{
      path: '/home', // path为空表示默认子路由
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '/wenda', // path为空表示默认子路由
      name: 'Wenda',
      component: () => import('@/views/Wenda.vue')
    },
    {
      path: '/videos', // path为空表示默认子路由
      name: 'Videos',
      component: () => import('@/views/Videos.vue')
    },
    {
      path: '/user', // path为空表示默认子路由
      name: 'User',
      component: () => import('@/views/User.vue')
    }]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search/index.vue')
  }
]

// 利用规则创建路由对象
const router = new VueRouter({
  routes
})

// 导出到 main.js 注入到vue实例
export default router
