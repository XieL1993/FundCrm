<template>
  <div id="home">
    <div class="home-head">
      <div class="title">
        <svg-icon icon-class="search"></svg-icon>
        <span>股票/基金/问答/咨询/用户</span>
      </div>
      <svg-icon icon-class="add"></svg-icon>
    </div>
    <div class="main">
      <div class="quick-entry">
        <div class="entry-item">
          <svg-icon icon-class="yuEBao"></svg-icon>
          余额宝
        </div>
        <div class="entry-item">
          <svg-icon icon-class="save" class="big"></svg-icon>
          定期
        </div>
        <div class="entry-item">
          <svg-icon icon-class="assets" class="big"></svg-icon>
          基金
        </div>
        <div class="entry-item">
          <svg-icon icon-class="gold"></svg-icon>
          黄金
        </div>
      </div>
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
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

  #home {
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
        font-size: 20px;
        flex: 0 0 auto;
        margin-left: 15px;
      }
    }
    .main {
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none
      }
      .quick-entry {
        height: 90px;
        padding: 0 15px;
        display: flex;
        background: $base-color;
        .entry-item {
          flex: 1 1 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 12px;
          font-size: 15px;
          color: #ffffff;
          .svg-icon {
            font-size: 34px;
            margin-bottom: 12px;
          }
          &:nth-of-type(1), &:nth-of-type(4) {
            .svg-icon {
              padding: 3px;
            }
          }
        }
      }
      .content {
        height: 500px;
        &:nth-of-type(2) {
          background: yellowgreen;
        }
        &:nth-of-type(3) {
          background: palevioletred;
        }
        &:nth-of-type(4) {
          background: orange;
        }
      }
    }

  }
</style>
