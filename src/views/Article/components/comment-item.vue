<template>
<van-cell >
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px;"
      :src="commentObj.aut_photo"
    />
    <span style="color: #466b9d;" slot="title">{{commentObj.aut_name}}</span>
    <div slot="label">
      <p style="color: #363636;">{{commentObj.content}}</p>
      <p>
        <span style="margin-right: 10px;">{{commentObj.pubdate | relativeTime}}</span>
        <van-button size="mini" type="default" @click="$emit('updateReplyShow', commentObj)">回复 {{commentObj.reply_count}}</van-button>
      </p>
    </div>
    <van-icon slot="right-icon" :name="commentObj.is_liking? 'like': 'like-o'" @click="updateCommentLike(commentObj)" />
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/user'

export default {
  name: 'CommentItem',
  props: ['commentObj'],
  data () {
    return {
    }
  },
  methods: {
    // 更新点赞状态
    async updateCommentLike (obj) {
      if (obj.is_liking) { // 已经点赞，要取消
        await deleteCommentLike(obj.com_id.toString())
      } else { // 要点赞
        await addCommentLike(obj.com_id.toString())
      }
      obj.is_liking = !obj.is_liking
    }

  }
}
</script>
<style lang="less" scoped>
</style>
