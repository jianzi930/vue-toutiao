<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="changeFllowed(true)"
    :loading="loading"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="changeFllowed(false)"
    :loading="loading"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'Follow',
  model: {
    prop: 'isFollowed',
    event: 'updateFllowed'
  },
  props: ['isFollowed', 'authId'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async changeFllowed (bool) {
      this.loading = true
      if (bool) { // 已关注，要取消关注
        await deleteFollow(this.authId)
          .then(() => {
            this.$toast('取消关注成功')
            this.$emit('updateFllowed', false)
          })
          .catch(() => this.$toast('取消关注失败，请稍后重试'))
      } else { // 未关注，需要关注
        await addFollow(this.authId)
          .then(() => {
            this.$toast('关注成功')
            this.$emit('updateFllowed', true)
          })
          .catch(err => {
            if (err.response?.status === 400) {
              this.$toast('不能关注自己')
              return
            }
            this.$toast('关注失败，请稍后重试')
          })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
