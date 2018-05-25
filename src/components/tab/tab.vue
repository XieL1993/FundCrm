<template>
  <div class="tab">
    <div class="tab-item" v-for="(item,index) in tabs" :key="index" :class="{active:currentIndex===index}"
         @click="changeTab(item,index)">
      <svg-icon :icon-class="currentIndex===index?item.icon+'_on':item.icon" :class="item.icon"></svg-icon>
      <span class="tab-link">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabs: [
          {
            name: '首页',
            icon: 'home',
            path: '/home'
          },
          {
            name: '股票',
            icon: 'stock',
            path: '/stock'
          },
          {
            name: '社区',
            icon: 'community',
            path: '/community'
          },
          {
            name: '我的',
            icon: 'me',
            path: '/me'
          }
        ],
        currentIndex: 0
      }
    },
    mounted() {
      if (this.$route.path.startsWith('/home')) {
        this.currentIndex = 0
      } else if (this.$route.path.startsWith('/stock')) {
        this.currentIndex = 1
      } else if (this.$route.path.startsWith('/community')) {
        this.currentIndex = 2
      } else if (this.$route.path.startsWith('/me')) {
        this.currentIndex = 3
      }
    },
    methods: {
      changeTab(item, index) {
        this.currentIndex = index
        if (this.$route.path !== item.path) {
          this.$router.push(item.path)
        }
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
        &.stock {
          padding: 1px;
        }
      }
    }
  }
</style>
