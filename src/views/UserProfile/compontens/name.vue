<template>
  <div class="name-post">
    <van-field
      class="post-field"
      v-model="userProfile.name"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="postName"
    >确定</van-button>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'Name',
  props: ['userProfile'],
  data () {
    return {
    }
  },
  methods: {
    // 发布评论
    async postName () {
      let { name } = this.userProfile
      if (name.trim().length < 1) {
        this.$toast('请输入昵称')
        return
      }
      // 请求数据中
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      await updateUserProfile({
        name
      })
        .then(() => {
          this.$emit('closePopShow') // 接口返回的数据没有is_liking，手动添加
          this.$toast('修改成功')
          name = '' // 清空输入框内容
        })
        .catch(() => {
          this.$toast('修改失败，请稍后重试')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.name-post {
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
