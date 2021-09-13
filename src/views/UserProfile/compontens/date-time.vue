<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="$emit('closePopShow')"
  />
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'DateTime',
  props: ['userProfile'],
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.userProfile.birthday)
    }
  },
  methods: {
    async onConfirm (value) {
      const currentDate = dayjs(value).format('YYYY-MM-DD')
      // 请求数据中
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      await updateUserProfile({
        birthday: currentDate
      })
        .then(() => {
          this.userProfile.birthday = currentDate
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
