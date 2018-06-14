<template>
  <div class="jd-index">
    <div class="home-head">
      <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
      <h2 class="title">京东商城</h2>
      <svg-icon icon-class="cart" class="cart" @click.native="cart"></svg-icon>
    </div>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.cname" v-for="(item,index) in categoryList" :key="index">
        <home-page v-if="item.cname==='首页'"></home-page>
        <child-list v-else :cid="item.cid"></child-list>
      </van-tab>
    </van-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
  import { getCategory } from '../../api/jd'
  import HomePage from './homePage'
  import ChildList from './child-list'

  export default {
    data() {
      return {
        active: '',
        categoryList: []
      }
    },
    created() {
      this.fetchCategory()
    },
    methods: {
      fetchCategory() {
        getCategory().then(res => {
          this.categoryList = res.data
        })
      },
      back() {
        this.$router.back()
      },
      cart() {
        this.$router.push('/jd/cart')
      }
    },
    components: {
      HomePage,
      ChildList
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .jd-index {
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
      .back {
        font-size: 22px;
      }
      h2 {
        flex: 1 1 auto;
        font-size: 17px;
        color: #ffffff;
        text-align: center;
      }
      .cart {
        font-size: 22px;
      }
    }
    .van-tabs {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
