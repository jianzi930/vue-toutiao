<template>
  <div class="channel-edit">
    <div class="my-channel">
      <div class="channel-title">
        <span>我的频道</span>
        <div>
          <van-button plain round type="warning" size="mini" @click="isChannelEdit = !isChannelEdit">{{isChannelEdit? '完 成': '编 辑'}}</van-button>
        </div>
      </div>
      <van-grid :gutter="10" :border="false" :clickable="true" center>
        <van-grid-item v-for="(obj, index) in myChannels" :key="obj.id" icon="close" @click="clickMyItem(obj.id)">
          <van-icon v-show="isChannelEdit" slot="icon" name="close" />
          <div slot="text" :class="{'active': index === active}">{{obj.name}}</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="recommd-channel">
      <div class="channel-title">
        <span>频道推荐</span>
      </div>
      <van-grid direction="horizontal" :gutter="10" :border="false" :clickable="true" center>
        <van-grid-item v-for="(obj) in recommdChannels" :key="obj.id" icon="plus" @click="clickRecommdItem(obj)">
          <div slot="text">{{obj.name}}</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllChannels } from '@/api/home'
import { addUserChannel, deleteUserChannel } from '@/api/user'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number
    }
  },
  data () {
    return {
      isChannelEdit: false,
      allChannels: []
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 获取所有频道
    async loadAllChannels () {
      await getAllChannels()
        .then(({ data }) => {
          this.allChannels = data.data.channels
        })
        .catch(() => this.$toast('获取频道失败'))
    },
    // 添加频道
    async addUserChannelFn (channel) {
      if (!this.user) { // 非登录状态保存到本地
        setItem('MY-CHANNEL', this.myChannels)
      } else { // 登录状态调接口
        await addUserChannel([{
          id: channel.id, // 频道 id
          seq: this.myChannels.length // 频道的 序号
        }])
          .catch(() => this.$toast('添加频道失败'))
      }
    },
    // 删除频道
    async deleteUserChannelFn (id) {
      if (!this.user) { // 非登录状态保存到本地
        setItem('MY-CHANNEL', this.myChannels)
      } else { // 登录状态调接口
        await deleteUserChannel(id)
          .catch(() => this.$toast('删除频道失败'))
      }
    },
    // 点击我的频道中的频道项
    clickMyItem (id) {
      const index = this.myChannels.findIndex(item => item.id === id)
      if (this.isChannelEdit) { // 编辑状态中，删除点击项
        this.myChannels.splice(index, 1)
        this.deleteUserChannelFn(id)
        if (index < this.active) { // 解决active激活频道，通知父级组件
          this.$emit('clickFn', this.active - 1)
        }
      } else { // 非编辑状态中，切换频道，通知父级组件
        this.$emit('clickFn', index, false)
      }
    },
    // 点击频道推荐中的频道项，添加到我的频道
    clickRecommdItem (obj) {
      this.myChannels.push(obj)
      this.addUserChannelFn(obj)
    }
  },
  computed: {
    ...mapState(['user']),
    // 在所有频道中筛选出不是我的频道，就是推荐频道
    recommdChannels () {
      if (this.allChannels.length > 0) {
        return this.allChannels.filter(channel => {
          return !this.myChannels.find(item => item.id === channel.id)
        })
      }
      return []
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 100px;
  .channel-title {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    color: #222222;
    .van-button {
      padding: 20px;
    }
  }
  /deep/ .van-grid{
    padding: 0;
    margin: 32px 0 64px;
    font-size: 28px;
    color: #222222;
    font-family: "Microsoft Ya Hei";
    .van-grid-item {
      .van-grid-item__content{
        background-color: #f4f5f6;
        height: 87px;
        padding-left: 0;
        padding-right: 0;
        .van-grid-item__icon {
          font-size: 28px;
        }
        .van-grid-item__icon-wrapper {
          position: unset;
          .van-icon-close {
            position: absolute;
            top: -10px;
            right: 8px;
          }
        }
        .active {
          color: red;
        }
      }
    }
  }
}
</style>
