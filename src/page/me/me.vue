<template>
  <div id="me">
    <div class="home-head">
      <h2 class="title">我的</h2>
      <svg-icon icon-class="warn" class="warn"></svg-icon>
    </div>
    <van-notice-bar :scrollable="true">
      <svg-icon icon-class="horn"></svg-icon>
      本页面为学习JAVAEE的页面DEMO的入口地址，demo作用是请求后台接口，辅助学习后台，页面效果可能较low请无视！。
    </van-notice-bar>
    <div class="main">
      <div class="entrance-item" @click="toStudent">
        <span>学生管理系统</span>
        <svg-icon icon-class="arrowRight"></svg-icon>
      </div>
      <div class="entrance-item">
        <span>待定</span>
        <svg-icon icon-class="arrowRight"></svg-icon>
      </div>
      <div class="entrance-item">
        <span>待定</span>
        <svg-icon icon-class="arrowRight"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      toStudent() {
        this.$router.push('/student')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";

  #me {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: $bg-gray;
    .home-head {
      flex: 0 0 auto;
      height: 50px;
      background: $base-color;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: #ffffff;
      h2 {
        flex: 1 1 auto;
        font-size: 17px;
        color: #ffffff;
        text-align: center;
        margin-left: 35px;
      }
      .svg-icon {
        font-size: 20px;
        flex: 0 0 auto;
        margin-left: 15px;
      }
    }
    .main {
      .entrance-item {
        height: 50px;
        background: #ffffff;
        margin-top: 10px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        span {
          flex: 1;
          height: 100%;
          line-height: 50px;
          color: $color-main;
          font-size: 15px;
        }
        .svg-icon {
          color: $color-normal;
          font-size: 13px;
          flex: 0 0 auto;
        }
        &:active {
          background: $color-active;
        }
      }
    }
  }
</style>
