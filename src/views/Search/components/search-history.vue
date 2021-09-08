<template>
  <div class="history-con">
    <van-cell title="历史记录" center>
      <div v-if="isDelete" slot="default">
        <span @click="deleteAllFn()">全部删除 </span>
        <span @click="isDelete = false"> 完成</span>
      </div>
      <van-icon v-else slot="right-icon" name="delete-o" @click="isDelete = true"/>
    </van-cell>
    <van-cell center :title="item" v-for="(item, index) in historyList" :key="index">
      <van-icon v-show="isDelete" slot="right-icon" name="close" @click="deleteFn(index)"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    historyList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  methods: {
    deleteFn (index) {
      this.historyList.splice(index, 1)
    },
    deleteAllFn () {
      this.historyList.splice(0)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
