<template>
  <van-icon
    v-if="attitude === 1"
    color="#777"
    name="good-job"
    @click="changeStar(true)"
  />
  <van-icon
    v-else
    color="#777"
    name="good-job-o"
    @click="changeStar(false)"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/user'
export default {
  name: 'Follow',
  model: {
    prop: 'attitude',
    event: 'updateAttitude'
  },
  props: ['attitude', 'artId'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async changeStar (bool) {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      if (bool) { // 已点赞，要取消点赞
        await deleteLike(this.artId)
          .then(() => {
            this.$toast('取消点赞成功')
            this.$emit('updateAttitude', 0)
          })
          .catch(() => this.$toast('取消点赞失败，请稍后重试'))
      } else { // 未点赞，需要点赞
        await addLike(this.artId)
          .then(() => {
            this.$toast('点赞成功')
            this.$emit('updateAttitude', 1)
          })
          .catch(() => this.$toast('点赞失败，请稍后重试'))
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
