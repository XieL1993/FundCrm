<template>
  <div class="home">
    <mt-swipe :auto="4000">
      <mt-swipe-item><img src="../../common/image/girl.jpg" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../../common/image/girl.jpg" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../../common/image/girl.jpg" alt=""></mt-swipe-item>
    </mt-swipe>
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
  .home {
    .mint-swipe {
      height: 200px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
