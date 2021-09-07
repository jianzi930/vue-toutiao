<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 文章列表项 -->
        <ArticleItem v-for="obj in list" :key="obj.art_id" :article="obj"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/user'
import ArticleItem from './article-item'
export default {
  name: 'ArticleList',
  props: ['channel'],
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 0
      })
        .then(({ data }) => {
          const { results } = data.data
          // 2. 把数据添加到 list 数组中
          this.list.push(...results)
          if (this.refreshing) {
            this.refreshing = false
          }
          // 3. 设置本次加载中 loading 状态结束
          this.loading = false
          // 5. 判是否没有数据了
          if (results.length < 1) { // 没有了，设置加载状态结束，不再触发上拉加载更多了
            this.finished = true
          } else { // 还有，更新下一页数据的时间戳
            this.timestamp = data.data.pre_timestamp
          }
        })
        .catch(() => {
          this.loading = false // 关闭 loading 效果
          this.error = true // 开启错误提示
        })
    },
    onRefresh () {
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
