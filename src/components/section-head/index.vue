<template>
  <div class="section">
    <i class="icon"></i>
    <span class="title">{{title}}</span>
    <span class="desc">{{desc}}</span>
    <span class="right" v-if="showRight">{{rightText}}</span>
    <svg-icon icon-class="arrowRight" v-if="showRight"></svg-icon>
  </div>
</template>
<script>
  export default {
    props: {
      showRight: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      rightText: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .section {
    height: 50px;
    border-top: 10px solid $bg-gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .icon {
      flex: 0 0 auto;
      height: 16px;
      width: 5px;
      background: $base-color;
    }
    .title {
      flex: 0 0 auto;
      font-size: 16px;
      color: $color-main;
      margin-left: 8px;
      line-height: 16px;
      margin-top: 2px;
    }
    .desc {
      flex: 1 1 auto;
      font-size: 13px;
      color: $color-info;
      margin-left: 8px;
      margin-top: 5px;
    }
    .right {
      flex: 0 0 auto;
      font-size: 13px;
      color: $base-color;
      margin-top: 5px;
    }
    .svg-icon {
      color: #C9C9C9;
      font-size: 13px;
      margin-top: 2px;
      margin-left: 5px;
    }
  }
</style>
