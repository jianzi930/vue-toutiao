<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar :title="`${replyCommentObj.reply_count}条回复`" />
    <!-- 要回复的评论 -->
    <CommentItem
      :commentObj="replyCommentObj"
    />
    <van-cell title="所有回复" />
    <!-- 回复列表 -->
    <CommentList
      :commentList="replyList"
      type="c"
      :targetId="replyCommentObj.com_id.toString()"
      @updateCommentCount="updateCommentCount"
      @updateReplyShow="updateReplyShow"
    />
    <!--
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
      v-for="obj in replyList"
      :key="obj.com_id.toString()"
      :commentObj="obj"
      />
    </van-list>
    -->
    <!-- 评论当前评论 -->
    <div class="post-btn">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isCommentPostShow = true"
      >写评论</van-button>
    </div>
    <!-- 对当前评论的评论进行回复 -->
    <van-popup v-model="isCommentPostShow" position="bottom">
      <CommentPost
        v-if="isCommentPostShow"
        :targetId="replyCommentObj.com_id.toString()"
        :artId="artId"
        @onCommentPost="onCommentPost"
      />
    </van-popup>
  </div>
</template>

<script>
// import { getComments } from '@/api/article'
import CommentList from './comment-list'
import CommentItem from './comment-item'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentList,
    CommentItem,
    CommentPost
  },
  props: ['replyCommentObj', 'artId'],
  data () {
    return {
      error: false,
      loading: false,
      finished: false,
      replyList: [],
      isCommentPostShow: false,
      currentReply: null,
      articleComment: {
        offset: null
      }
    }
  },
  methods: {
    // 更新回复总数
    updateCommentCount () {
      this.replyCommentObj.reply_count = this.replyList.length
    },
    updateReplyShow (obj) {
      this.isCommentPostShow = true
      this.currentReply = obj
    },
    // 评论发布，同步更新数据
    onCommentPost (data) {
      this.isCommentPostShow = false
      this.replyList.unshift(data)
      this.updateCommentCount()
    }
    // 加载评论详情数据
    // async onLoad () {
    //   this.loading = true // 请求数据中，loading为true
    //   try {
    //     // 1. 请求接口获取数据
    //     const { data } = await getComments({
    //       type: 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
    //       source: this.replyCommentObj.com_id.toString(), // 源id，文章id或评论id
    //       offset: this.articleComment.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
    //       limit: 10 // 每页大小
    //     })
    //     // JSON.parse('qwe') // 人为制造非404错误
    //     // 2. 将数据给list数组
    //     console.log(data)
    //     this.replyList.push(...data.data.results)
    //     // this.$emit('updateCommentList')
    //     // // 4. 判断是否加载完成
    //     if (data.data.results.length < 1) {
    //       this.finished = true
    //     } else {
    //       this.articleComment.offset = data.data.last_id
    //     }
    //   } catch (err) {
    //     // 资源不存在
    //     this.error = true
    //   }
    //   this.loading = false // 3. 请求结束，loading为false
    // }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  padding-bottom: 110px;
}
.post-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #cccc;
  background: #fff;
  text-align: center;
  vertical-align: middle;
  padding: 10px 0;
  .van-button {
    width: 60%;
    vertical-align: middle;
  }
}
</style>
