<template>
  <div>
    <van-nav-bar
      class="page-nav-bar"
     :border="false"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="uploadFile" @change="onFileChange">
    <van-cell title="头像" is-link  @click="onChangePhoto">
      <van-image
        round
        fit="cover"
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell title="昵称" is-link :value="userProfile.name" @click="isNameShow = true" />
    <van-cell title="性别" is-link :value="userProfile.gender === 1 ? '女': '男'" @click="isGenderShow = true" />
    <van-cell title="生日" is-link :value="userProfile.birthday" @click="isDateTimeShow = true" />
    <van-popup v-model="isImgShow" position="bottom" style="height: 100%">
      <Cropper v-if="isImgShow" :userProfile="userProfile" @closePopShow="isImgShow = false" />
    </van-popup>
    <van-popup v-model="isGenderShow" position="bottom">
      <Gender :userProfile="userProfile" @closePopShow="isGenderShow = false" />
    </van-popup>
    <van-popup v-model="isDateTimeShow" position="bottom">
      <DateTime :userProfile="userProfile" @closePopShow="isDateTimeShow = false" />
    </van-popup>
    <van-popup v-model="isNameShow" position="bottom">
      <Name :userProfile="userProfile" @closePopShow="isNameShow = false" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import Gender from './compontens/gender'
import DateTime from './compontens/date-time'
import Name from './compontens/name'
import Cropper from './compontens/cropper'
export default {
  name: 'Userprofile',
  props: ['userId'],
  components: {
    Cropper,
    Gender,
    DateTime,
    Name
  },
  data () {
    return {
      userProfile: {},
      isImgShow: false,
      isGenderShow: false,
      isDateTimeShow: false,
      isNameShow: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      await getUserProfile(this.userId)
        .then(({ data }) => {
          console.log(data)
          this.userProfile = data.data
        })
        .catch(() => {
          this.$toast('获取信息失败')
        })
    },
    onChangePhoto () {
      const inputNode = this.$refs.uploadFile
      inputNode.click()
      // this.isImgShow = true
    },
    onFileChange (e) {
      const fileObj = e.target.files[0]
      if (fileObj) {
        this.userProfile.photo = window.URL.createObjectURL(fileObj)
        this.isImgShow = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-image {
  width: 45px;
  vertical-align: middle;
}
</style>
