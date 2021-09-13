<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    :default-index="userProfile.gender"
    @confirm="onConfirm"
    @cancel="$emit('closePopShow')"
  />
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'Gender',
  props: ['userProfile'],
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      console.log(value, index)
      // 请求数据中
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      await updateUserProfile({
        gender: index
      })
        .then(() => {
          this.userProfile.gender = index
          this.$emit('closePopShow') // 接口返回的数据没有is_liking，手动添加
          this.$toast('修改成功')
        })
        .catch(() => {
          this.$toast('修改失败，请稍后重试')
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
