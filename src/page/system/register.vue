<template>
  <transition name="slide">
    <div class="register">
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
        <van-button type="primary" bottom-action @click.native="register">注册</van-button>
      </div>
    </div>
  </transition>
</template>
<script>
  import { Toast } from 'vant'
  import { register } from '../../api/user'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      register() {
        if (!this.username) {
          Toast({ message: '用户名不能为空', position: 'bottom' })
          return
        }
        if (!this.password) {
          Toast({ message: '密码不能为空', position: 'bottom' })
          return
        }
        Toast.loading('注册中...')
        register(this.username, this.password).then(res => {
          Toast.clear()
          Toast({ message: res.msg, position: 'bottom' })
          this.$router.back()
        }).catch(error => {
          Toast.clear()
          Toast({ message: error.message, position: 'bottom' })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/anim";

  @include rotate();
  @include slide();
  .register {
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
      background: url(../../common/image/bg2.jpg);

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
        background: url(../../common/image/bg2.jpg) no-repeat center center;
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
    }
  }
</style>
