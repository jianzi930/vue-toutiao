import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 加载处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 全局过滤器：处理相对时间
// dayjs() 获得当前时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
