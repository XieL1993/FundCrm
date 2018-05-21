<template>
  <div class="main">
    <div class="app-content">
      <router-view></router-view>
    </div>
    <div class="bottom">
      <tab></tab>
    </div>
  </div>
</template>
<script>
  import Tab from '../components/tab/tab'

  export default {
    data() {
      return {}
    },
    components: {
      Tab
    }
  }
</script>
<style scoped lang="scss">
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .app-content {
      flex: 1 1 auto;
      position: relative;
      overflow: hidden;
    }
    .bottom {
      flex: 0 0 50px;
    }
  }
</style>
