<template>
  <div>
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :immediate-check="false"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
      v-for="obj in commentList"
      :key="obj.com_id.toString()"
      :commentObj="obj"
      @updateReplyShow="updateReplyShow"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    commentList: {
      default: () => []
    },
    targetId: {
      type: [String, Number]
    },
    type: {
      type: String,
      validator (tVal) {
        return ['a', 'c'].includes(tVal)
      },
      default: 'a'
    }
  },
  data () {
    return {
      error: false,
      loading: false,
      finished: false,
      articleComment: {
        offset: null
      }
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    // 加载评论详情数据
    async onLoad () {
      this.loading = true // 请求数据中，loading为true
      try {
        // 1. 请求接口获取数据
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.targetId, // 源id，文章id或评论id
          offset: this.articleComment.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10 // 每页大小
        })
        // JSON.parse('qwe') // 人为制造非404错误
        // 2. 将数据给list数组
        this.commentList.push(...data.data.results)
        this.$emit('updateCommentCount')
        // // 4. 判断是否加载完成
        if (data.data.results.length < 1) {
          this.finished = true
        } else {
          this.articleComment.offset = data.data.last_id
        }
      } catch (err) {
        // 资源不存在
        this.error = true
      }
      this.loading = false // 3. 请求结束，loading为false
    },
    updateReplyShow (commentObj) {
      this.$emit('updateReplyShow', commentObj)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
