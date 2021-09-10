<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="postComment"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/user'
export default {
  name: 'CommentPost',
  props: {
    targetId: {
      type: [String, Number]
    },
    artId: {
      default: null
    }
  },
  data () {
    return {
      message: '',
      offset: null
    }
  },
  methods: {
    // 发布评论
    async postComment () {
      if (this.message.trim().length < 1) {
        this.$toast('请输入评论')
        return
      }
      // 请求数据中
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComment({
          target: this.targetId, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.artId// 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // JSON.parse('qwe') // 人为制造非404错误
        this.$emit('onCommentPost', { ...data.data.new_obj, is_liking: false }) // 接口返回的数据没有is_liking，手动添加
        this.$toast('发布成功')
        this.message = '' // 清空输入框内容
      } catch (err) {
        // 资源不存在
        this.$toast('发布失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
