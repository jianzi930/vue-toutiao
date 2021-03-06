<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 文章主体 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- 加载完成-文章详情 -->
      <div v-else-if="article" class="article-detail" >
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate || relativeTime}}</div>
          <Follow :authId="article.aut_id" v-model="article.is_followed" />
        </van-cell>
        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="content">这是文章内容</div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <CommentList
        :targetId="articleId"
        :commentList="commentList"
        type="a"
        @updateCommentCount="updateCommentCount"
        @updateReplyShow="updateReplyShow"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isCommentPostShow = true"
          >写评论</van-button>
          <van-icon name="comment-o" :info="commentCount" color="#777" />
          <Star :artId="articleId" v-model="article.is_collected" />
          <PointLike :artId="articleId" v-model="article.attitude" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- 发表评论 -->
        <van-popup v-model="isCommentPostShow" position="bottom">
          <CommentPost
            v-if="isCommentPostShow"
            :targetId="articleId"
            @onCommentPost="onCommentPost"
          />
        </van-popup>
      </div>
      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadAArticle">点击重试</van-button>
      </div>
    </div>
    <!-- 评论回复 -->
    <van-popup closeable v-model="isReplyShow" position="bottom" :style="{ height: '100%' }">
      <CommentReply
        v-if="isReplyShow"
        :artId="articleId"
        :replyCommentObj="replyCommentObj"
      />
    </van-popup>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import { ImagePreview } from 'vant'
import Follow from './components/follow'
import Star from './components/star'
import PointLike from './components/point-like'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
import CommentReply from './components/comment-reply.vue'
import './markdown.css'
export default {
  name: 'Article',
  components: {
    Follow,
    Star,
    PointLike,
    CommentList,
    CommentPost,
    CommentReply
  },
  props: ['articleId'],
  data () {
    return {
      loading: true,
      article: null,
      errStatus: 0, // 请求错误状态码
      isCommentPostShow: false,
      isReplyShow: false,
      commentList: [],
      commentCount: 0,
      replyCommentObj: null
    }
  },
  // provide: {
  //   articleId: this.articleId
  // },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    // 加载文章详情数据
    async loadArticle () {
      this.loading = true // 请求数据中，loading为true
      try {
        const { data } = await getArticle(this.articleId)
        // JSON.parse('qwe') // 人为制造非404错误
        this.article = data.data
        // 异步获取DOM节点
        setTimeout(() => {
          this.getImage()
        })
      } catch (err) {
        // 资源不存在
        if (err.response?.status === 404) {
          this.errStatus = 404
        }
        console.dir(err)
      }
      this.loading = false // 请求结束，loading为false
    },
    // 获取DOM图片，病配置图片预览
    getImage () {
      const imgs = this.$refs.content.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        item.onclick = () => {
          ImagePreview({
            images, // 预览的图片数组
            startPosition: index // 预览图片的起始位置， 第一张为0
          })
        }
        images.push(item.src)
      })
    },
    // 更新评论总数
    updateCommentCount () {
      this.commentCount = this.commentList.length
    },
    // 评论发布，同步更新数据
    onCommentPost (data) {
      this.isCommentPostShow = false
      this.commentList.unshift(data)
      this.updateCommentCount()
    },
    // 评论回复
    updateReplyShow (replyCommentObj) {
      this.isReplyShow = true
      this.replyCommentObj = replyCommentObj
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
