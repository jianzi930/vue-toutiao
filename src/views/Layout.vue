<template>
  <div class="layout-con">
    <router-view/>
    <van-tabbar class="layout-tab-bar" route v-model="active">
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/wenda">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span>问答</span>
      </van-tabbar-item><van-tabbar-item to="/videos">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item><van-tabbar-item to="/user">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span>{{ this.user? '我的': '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.layout-con {
  .layout-tab-bar {
    .iconfont {
      font-size: 40px;
    }
}
}
</style>
