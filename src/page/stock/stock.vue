<template>
  <div id="stock">
    <div class="home-head" :class="{'night':night}">
      <svg-icon icon-class="search" class="search"></svg-icon>
      <h2 class="title">股票</h2>
      <svg-icon :icon-class="night?'day':'night'" class="night" @click.native="night=!night"></svg-icon>
      <svg-icon icon-class="menu" class="menu"></svg-icon>
    </div>
    <div class="main" :class="{'night':night}"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        night: false
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";

  #stock {
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
      transition: all 0.2s ease-in;
      &.night {
        background: $bg-night-head
      }
      h2 {
        flex: 1 1 auto;
        font-size: 17px;
        color: #ffffff;
        text-align: center;
      }
      .svg-icon {
        flex: 0 0 auto;
        &.search {
          font-size: 18px;
          margin-right: 42px;
        }
        &.night {
          font-size: 24px;
        }
        &.menu {
          font-size: 20px;
          margin-left: 16px;
        }
      }
    }
    .main {
      min-height: 100%;
      transition: all 0.2s ease-in;
      &.night {
        background: $bg-night-content;
      }
    }
  }
</style>
