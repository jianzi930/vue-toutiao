<template>
  <div class="user-con">
    <van-nav-bar class="page-nav-bar" :border="false" title="登录" />
    <div v-if="user" class="header">
      <div class="user-info">
        <div class="img-con">
          <van-image
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="user-name">{{userInfo.name}}</span>
        </div>
        <van-button type="default" size="mini" round>编辑资料</van-button>
      </div>
      <div class="user-status">
        <div class=status-item>
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class=status-item>
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class=status-item>
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class=status-item>
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="login-con" @click="$router.push('/login')">
      <van-image
        round
        src="~@/assets/mobile.png"
      />
      <span class="text">登录 / 注册</span>
    </div>
    <div class="grid-nav">
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <i slot="icon" class="iconfont icon-shoucang"></i>
        </van-grid-item>
        <van-grid-item text="历史">
          <i slot="icon" class="iconfont icon-lishi"></i>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="cell-nav">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <van-cell v-show="user" class="logout" title="退出登录" @click="loginoutFn" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../api/user'
export default {
  name: 'User',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    loginoutFn () {
      this.$dialog.confirm({
        title: '确认退出？'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消了')
        })
    },
    async loadUserInfo () {
      if (this.user) {
        await getUserInfo()
          .then(({ data }) => {
            this.userInfo = data.data
          })
          .catch(() => this.$toast('获取数据失败'))
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user-con {
  .header{
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    .user-info {
      padding: 0 30px;
      height: 231px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img-con {
        display: flex;
        align-items: center;
        .van-image {
          width: 150px;
          height: 150px;
        }
        .user-name {
          color: #fff;
          font-size: 29px;
          margin-left: 10px;
        }
      }
      .van-button__text {
        color: #222;
        font-size: 12px;
      }
    }
    .user-status {
      height: 130px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .status-item {
        height: 66px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        span.count {
          font-size: 32px;
        }
        span.text {
          font-size: 21px;
          margin-top: 10px;
        }
      }
    }
  }
  .login-con {
    height: 361px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    .van-image {
      width: 133px;
      height: 133px;
    }
    .text {
      font-size: 28px;
      color: #fff;
      margin-top: 10px;
    }
  }
  .grid-nav {
    .iconfont {
      font-size: 45px;
    }
    .van-grid-item__text {
      color: #333333;
    }
  }
  .cell-nav {
    margin: 20px 0;
  }
  .logout {
    text-align: center;
    color: #d86262;
    font-size: 29px;
  }
}
</style>
