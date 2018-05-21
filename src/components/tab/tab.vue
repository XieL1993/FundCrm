<template>
  <div class="tab">
    <div class="tab-item" :class="{active:currentIndex===0}" @click="currentIndex=0">
      <svg-icon :icon-class="getIconClass(0)" class="home"></svg-icon>
      <span class="tab-link">首页</span>
    </div>
    <div class="tab-item" :class="{active:currentIndex===1}" @click="currentIndex=1">
      <svg-icon :icon-class="getIconClass(1)" class="fund"></svg-icon>
      <span class="tab-link">股票</span>
    </div>
    <div class="tab-item" :class="{active:currentIndex===2}" @click="currentIndex=2">
      <svg-icon :icon-class="getIconClass(2)"></svg-icon>
      <span class="tab-link">社区</span>
    </div>
    <div class="tab-item" :class="{active:currentIndex===3}" @click="currentIndex=3">
      <svg-icon :icon-class="getIconClass(3)"></svg-icon>
      <span class="tab-link">我的</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        names: ['home', 'fund', 'message', 'me'],
        currentIndex: 0
      }
    },
    methods: {
      getIconClass(index) {
        return this.currentIndex === index ? this.names[index] + '_on' : this.names[index]
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";

  .tab {
    height: 50px;
    display: flex;
    border-top: 1px solid $border-normal;
    .tab-item {
      flex: 1 1 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $color-info;
      font-size: 12px;
      &.active {
        color: $base-color;
      }
      .svg-icon {
        font-size: 22px;
        margin-bottom: 7px;
        &.home {
          padding: 2px; // 这个图片有点异常，同等font-size比其他图片略大，暂用padding处理
        }
        &.fund {
          padding: 1px;
        }
      }
    }
  }
</style>
