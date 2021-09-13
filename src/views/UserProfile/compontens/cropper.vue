<template>
  <div class="cropper-wrap">
    <img id="image" class="img" :src="userProfile.photo" ref="img">
    <div class="btns">
      <button class="btn" @click="$emit('closePopShow')">取消</button>
      <button class="btn" @click="onConfirm">确认</button>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'Cropper',
  props: ['userProfile'],
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    this.imgHandler()
  },
  methods: {
    imgHandler () {
      const image = this.$refs.img
      console.log(image)
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
      })
    },
    async onConfirm () {
      // 请求数据中
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 获取裁剪后图片
      const photo = this.cropper.getCroppedCanvas({
        imageSmoothingQuality: 'high'
      }).toDataURL('image/jpeg')
      const fm = new FormData()
      fm.append('photo', photo)

      await updateUserPhoto(fm)
        .then(() => {
          this.userProfile.photo = photo
          this.$emit('closePopShow')
          this.$toast('保存成功')
        })
        .catch(() => {
          this.$toast('请稍后重试')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.cropper-wrap {
  background: #000;
  height: 100%;
    .img {
    display: block;
    max-width: 100%;
  }
  .btns {
    position: fixed;
    display: flex;
    bottom: 0;
    justify-content: space-between;
    width: 100%;
    .btn {
      display: inline-block;
      border: none;
      background: none;
      color: #fff;
    }
  }
}

</style>
