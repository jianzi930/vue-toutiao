<template>
  <div>
    <van-cell>
      <!-- 最多显示两行标题 -->
      <div slot="title" class="van-multi-ellipsis--l2">{{article.title}}</div>
      <!-- 右侧封面图片 -->
      <div class="single-img" slot="extra" v-if="article.cover.type === 1">
        <van-image
          fit="cover"
          :src="article.cover.images[0]"
        />
      </div>
      <div slot="label">
        <!-- 三个封面图片 -->
        <div class="img-con" v-if="article.cover.type === 3">
          <van-image
            fit="cover"
            v-for="(item, index) in article.cover.images"
            :src="item"
            :key="index"
          />
        </div>
        <div>
          <span>{{article.aut_name}} </span>
          <span> {{article.comm_count}}评论 </span>
          <span> {{article.pubdate | relativeTime}}</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.single-img {
  .van-image {
    width: 230px;
    height: 172px;
    margin-left: 10px;
  }
}
.img-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 15px;
  .van-image {
    height: 147px;
    flex: 1;
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
}
</style>
