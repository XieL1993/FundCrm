<template>
  <div class="login">
    <div class="background">
    </div>
    <div class="header">
      <img class="head-photo">
    </div>
    <div class="form">
      <div class="container username_box">
        <svg-icon icon-class="account"></svg-icon>
        <input type="text" class="username" placeholder="请输入账号" v-model="username">
      </div>
      <div class="container password_box">
        <svg-icon icon-class="password"></svg-icon>
        <input type="text" class="password" placeholder="请输入密码" v-model="password">
      </div>
      <van-button type="primary" bottom-action @click.native="login">登录</van-button>
      <div class="register" @click="register">注册账号</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { Toast } from 'vant'
  import { login } from '../../api/user'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        username: '郑爽',
        password: 'love'
      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      login() {
        if (!this.username) {
          Toast({ message: '用户名不能为空', position: 'bottom' })
          return
        }
        if (!this.password) {
          Toast({ message: '密码不能为空', position: 'bottom' })
          return
        }
        Toast.loading('登录中...')
        login(this.username, this.password).then(res => {
          Toast.clear()
          this.saveUserInfo(res.data)
          this.$router.push('/home')
        }).catch(error => {
          Toast.clear()
          Toast({ message: error.message, position: 'bottom' })
        })
      },
      register() {
        this.$router.push('/login/register')
      }
    }
  }
</script>

<style scoped lang="scss">
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #222222;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(20px);
      background: url(../../common/image/bg.jpg);

    }
    .header {
      padding: 30px;
      .head-photo {
        display: block;
        margin: 0 auto;
        width: 30%;
        padding-top: 30%;
        border: 1px solid rgba(255, 255, 255, 0.5);
        height: 0;
        background: url(../../common/image/bg.jpg) no-repeat center center;
        background-size: cover;
        border-radius: 50%;
        animation: rotate 6s linear infinite;
      }
    }
    .form {
      padding: 0 20px;
      .container {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        height: 45px;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0 40px;
        .svg-icon {
          color: rgba(255, 255, 255, 0.3);
          font-size: 20px;
          position: absolute;
          top: 50%;
          margin-top: -10px;
          left: 10px;
        }
        &.password_box {
          margin-top: 10px;
        }
        input {
          font-size: 16px;
          line-height: 45px;
          color: #ffffff;
          border: none;
          background: transparent;
          outline: none;
          caret-color: rgba(255, 255, 255, 0.6);
          &::placeholder {
            color: rgba(255, 255, 255, 0.3);
          }
        }
      }
      .van-button {
        width: 100%;
        height: 45px;
        margin-top: 10px;
        border-radius: 3px;
      }
      .register {
        position: absolute;
        left: 10px;
        color: #ffffff;
        font-size: 16px;
        margin-top: 10px;
        padding: 10px;
        text-align: right;
        &:active {
          color: #409EFF;
        }
      }
    }
  }
</style>
