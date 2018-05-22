<template>
  <div id="me">
    <div class="home-head">
      <h2 class="title">我的</h2>
      <svg-icon icon-class="warn" class="warn"></svg-icon>
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

  #me {
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
  }
</style>
