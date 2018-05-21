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
        <input type="text" class="username" placeholder="请输入账号">
      </div>
      <div class="container password_box">
        <svg-icon icon-class="password"></svg-icon>
        <input type="text" class="password" placeholder="请输入密码">
      </div>
      <mt-button type="primary" @click="login">登录</mt-button>
    </div>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        Indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
        })
        setTimeout(() => {
          Indicator.close()
          this.$router.push('/home')
        },
        2000)
      }
    }
  }
</script>

<style scoped lang="scss">
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
      opacity: 0.8;
      filter: blur(10px);
      background: url(../../common/image/bg.jpg) top left;

    }
    .header {
      padding: 30px;
      .head-photo {
        display: block;
        margin: 0 auto;
        width: 30%;
        padding-top: 30%;
        border: 1px solid #ffffff;
        height: 0;
        background: url(../../common/image/headPhoto.jpg) no-repeat center center;
        background-size: cover;
        border-radius: 50%;
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
        border: 1px solid #bfbfbf;
        padding: 0 40px;
        .svg-icon {
          color: #bfbfbf;
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
          caret-color: #26a2ff;
          &::placeholder {
            color: #bfbfbf;
          }
        }
      }
      .mint-button {
        width: 100%;
        height: 45px;
        margin-top: 10px;
      }
    }
  }
</style>
