<template>
  <van-icon
    v-if="isStar"
    color="#777"
    name="star"
    @click="changeStar(true)"
  />
  <van-icon
    v-else
    color="#777"
    name="star-o"
    @click="changeStar(false)"
  />
</template>

<script>
import { addStar, deleteStar } from '@/api/article'
export default {
  name: 'Star',
  model: {
    prop: 'isStar',
    event: 'updateStar'
  },
  props: ['isStar', 'artId'],
  data () {
    return {
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
      if (bool) { // 已收藏，要取消收藏
        await deleteStar(this.artId)
          .then(() => {
            this.$toast('取消收藏成功')
            this.$emit('updateStar', false)
          })
          .catch(() => this.$toast('取消收藏失败，请稍后重试'))
      } else { // 未收藏，需要收藏
        await addStar(this.artId)
          .then(() => {
            this.$toast('收藏成功')
            this.$emit('updateStar', true)
          })
          .catch(() => this.$toast('收藏失败，请稍后重试'))
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
