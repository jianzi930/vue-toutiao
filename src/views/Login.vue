<template>
  <div class="login-con">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        type="number"
        :rules="loginFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="验证码"
        type="number"
        maxlength=6
        :rules="loginFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down v-if="showCountDown" time="60" format="ss s" @finish="showCountDown=false"/>
          <van-button v-else class="send-sms-btn" round size="small" type="default" @click="onSendSms" native-type="button">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '../api/login'

export default {
  data () {
    return {
      time: 30 * 60 * 60 * 1000,
      showCountDown: false,
      mobile: '',
      code: '',
      loginFormRules: { // 表单校校验规则
        mobile: [{
          required: true,
          message: '请填写手机号码'
        }, {
          pattern: /^1(3|5|7|8|9)\d{9}$/,
          message: '手机号码格式错误'
        }],
        code: [{
          required: true,
          message: '请填写验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
    }
  },
  methods: {
    // 登录表单提交
    async onSubmit (values) {
      this.$toast.loading({ // 加载状态
        message: '加载中...',
        duration: 0,
        forbidClick: true // 是否禁止背景点击
      })
      // console.log(await login(values))
      // 调用登录函数
      await login(values)
        .then(({ data }) => {
          this.$toast.success('登录成功')
          this.$storestore.commit('setUser', data.data) // 修改store中的user数据
        })
        .catch(() => this.$toast.fail('登录失败'))
    },
    // 发送验证码
    async onSendSms () {
      // 手机号码校验
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 调用发送验证码函数
      await sendSms(this.mobile)
        .then(() => {
          this.showCountDown = true
          this.$toast('发送验证码成功')
        })
        .catch(() => this.$toast('发送验证码失败'))
    }
  }
}
</script>
<style scoped lang="less">
.login-con {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
