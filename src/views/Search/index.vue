<template>
  <div class="search-con">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText" />
    <!-- 联想建议 -->
    <SearchSuggest v-else-if="searchText" :searchText="searchText" @clickSearch="onSearch"/>
    <!-- 搜索历史记录 -->
    <SearchHistory v-else :historyList="historyList" />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggest from './components/search-suggest'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Search',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      historyList: getItem('SEARCH-HISTORY') || []
    }
  },
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
      this.historyList.unshift(val)
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    historyList (val) {
      // 同步到本地存储
      setItem('SEARCH-HISTORY', val)
    }
  }
}
</script>
<style lang="less" scoped>
.search-con {
  .van-search {
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
