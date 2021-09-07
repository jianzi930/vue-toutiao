<template>
  <div class="home-con">
    <!-- 搜索导航栏 -->
    <van-nav-bar class="page-nav-bar" :border="false">
      <van-button slot="title" round type="info" icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 频道标签 -->
    <van-tabs v-model="active" animated swipeable  :border="true">
      <van-tab v-for="obj in channels" :title="obj.name" :key="obj.id">
        <div slot="default">
          <!-- 文章列表 -->
          <ArticleList :channel="obj" :key="obj.id" />
        </div>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="more-btn" @click="isChannelEditShow = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 编辑频道 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <ChannelEdit :myChannels="channels" :active="active" @clickFn="handleClick" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './compontents/article-list'
import ChannelEdit from './compontents/channel-edit'
import { getItem } from '@/utils/storage'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      if (this.$store.user) {
        await getUserChannels()
          .then(({ data }) => {
            this.channels = data.data.channels
          })
          .catch(() => this.$toast('获取用户频道失败'))
      } else {
        this.channels = getItem('MY-CHANNEL') || []
      }
    },
    handleClick (index, bool = true) {
      this.isChannelEditShow = bool
      this.active = index
    }
  }
}
</script>

<style lang="less" scoped>
.home-con {
  // .page-nav-bar {
  //   position: fixed;
  //   width: 100%;
  //   top: 0;
  //   left: 0;
  // }
  /deep/ .van-nav-bar__title {
    max-width: unset;
    .van-button {
      width: 556px;
      height: 65px;
      background-color: #5babfb;
      color: #fff;
      font-size: 27px;
      border: none;
      .van-icon-search {
        color: #fff;
        font-size: 38px;
      }
    }
  }
  /deep/ .van-tabs__nav {
    padding: 0;
    .van-tab {
      width: 192px;
      height: 84px;
    }
    .van-tabs__line {
      width: 31px;
      background-color: #3296fa;
      bottom: 0.2rem;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .more-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
