<template>
  <div id="community">
    <div class="home-head">
      <div class="title">
        <svg-icon icon-class="search"></svg-icon>
        <span>股票/基金/问答/咨询/用户</span>
      </div>
      <svg-icon icon-class="person" class="person"></svg-icon>
      <svg-icon icon-class="message" class="message"></svg-icon>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";

  #community {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .home-head {
      flex: 0 0 auto;
      height: 50px;
      background: $base-color;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: #ffffff;
      .title {
        flex: 1 1 auto;
        height: 30px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding-left: 15px;
        .svg-icon {
          font-size: 13px;
        }
        span {
          font-size: 12px;
          line-height: 30px;
          margin-left: 5px;
        }
      }
      .svg-icon {
        flex: 0 0 auto;
        &.person {
          margin-left: 25px;
          font-size: 19px;
        }
        &.message {
          margin-left: 16px;
          font-size: 24px
        }
      }
    }
  }
</style>
