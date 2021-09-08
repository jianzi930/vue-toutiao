<template>
  <div class="suggest-con">
    <van-cell icon="search" v-for="(item, index) in options" :key="index" @click="$emit('clickSearch', item)">
      <span slot="title" v-html="highLight(item, searchText)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggest',
  props: ['searchText'],
  data () {
    return {
      options: [],
      timer: null
    }
  },
  methods: {
    // 搜索联想建议
    async loadSuggestions (q) {
      await getSuggestions(q)
        .then(({ data }) => {
          this.options = data.data.options
        })
        .catch(() => this.$toast('获取数据失败'))
    },
    // 搜索关键字高亮
    highLight (text, highLightText) {
      const reg = new RegExp(highLightText, 'gi')
      return text.replace(reg, `<span style="color: red">${highLightText}</span>`)
    }
  },
  watch: {
    // 监控输入框内容变化并联想搜索
    searchText: {
      immediate: true,
      handler (text) {
        // 防抖优化
        if (this.timer) clearTimeout(this.timer) // 已经有定时器开启了，清空定时器
        this.timer = setTimeout(() => { // 开启新的定时器
          this.loadSuggestions(text)
        }, 500)
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
