<template>
  <div class="result-con">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="obj in list" :key="obj.art_id" :title="obj.title" />
    </van-list>
  </div>
</template>

<script>

import { getResults } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['searchText'],
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      page: 1, // 页码
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
      // 1. 获取数据
      await getResults({
        page: this.page, // 页码
        per_page: this.perPage, // 每页数量
        q: this.searchText // 搜索关键字
      })
        .then(({ data }) => {
          const { results } = data.data
          // 2. 把数据添加到 list 数组中
          this.list.push(...results)
          // 3. 设置本次加载中 loading 状态结束
          this.loading = false
          // 5. 判是否没有数据了
          if (results.length < 1) { // 没有了，设置加载状态结束，不再触发上拉加载更多了
            this.finished = true
          } else { // 还有，更新下一页数据的页码
            this.page++
          }
        })
        .catch(() => {
          console.log('失败了')
          this.loading = false // 关闭 loading 效果
          this.error = true // 开启错误提示
        })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
