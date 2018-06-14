<template>
  <div class="home-page">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img v-lazy="getUrl(item)"/>
      </van-swipe-item>
    </van-swipe>
    <section-head title="最热商品" desc="火热销售 质量保证" :show-right="false"></section-head>
    <div class="product-list">
      <div class="product-item" v-for="(item,index) in hots" :key="index" @click="detail(item.pid)">
        <div class="product-wrapper">
          <div class="image" :style="getStyle()" v-lazy:backgroundImage="getUrl(item.pimage)"></div>
          <div class="product-name">{{item.pname}}</div>
          <div class="product-price"><span>￥</span>{{item.shop_price}}</div>
        </div>
      </div>
    </div>
    <section-head title="最新商品" desc="最新上架 领先世界" :show-right="false"></section-head>
    <div class="product-list">
      <div class="product-item" v-for="(item,index) in news" :key="index" @click="detail(item.pid)">
        <div class="product-wrapper">
          <div class="image" :style="getStyle()" v-lazy:backgroundImage="getUrl(item.pimage)"></div>
          <div class="product-name">{{item.pname}}</div>
          <div class="product-price"><span>￥</span>{{item.shop_price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SectionHead from '../../components/section-head'
  import { getIndex } from '../../api/jd'
  import { baseURL } from '../../common/js/config'

  export default {
    created() {
      this.fetchIndex()
    },
    data() {
      return {
        banners: [],
        hots: [],
        news: []
      }
    },
    methods: {
      fetchIndex() {
        getIndex().then(res => {
          this.banners = res.data.banners
          this.hots = res.data.hots
          this.news = res.data.news
        })
      },
      detail(pid) {
        this.$router.push(`/jd/detail/${pid}`)
      },
      getStyle() {
        return {
          width: '100%',
          height: '0',
          paddingTop: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          cursor: 'pointer',
          backgroundPosition: 'center center'
        }
      },
      getUrl(url) {
        return `${baseURL}/image?image=${url}`
      }
    },
    components: {
      SectionHead
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .home-page {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none
    }
    .van-swipe {
      height: 180px;
      img {
        display: block;
        margin: auto;
      }
    }
    .section {
      background: #ffffff;
    }
    .product-list {
      display: flex;
      padding: 10px 10px 0 10px;
      border-top: 1px solid $border-normal;
      flex-flow: row wrap;
      .product-item {
        flex: 0 0 50%;
        width: 50%;
        height: 250px;
        margin-bottom: 10px;
        &:nth-child(2n+1) {
          padding-right: 5px;
        }
        &:nth-child(2n) {
          padding-left: 5px;
        }
        .product-wrapper {
          height: 100%;
          background: #ffffff;
          border-radius: 6px;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.12);
          .product-name {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            word-break: break-all;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            font-size: 14px;
            color: $color-main;
            margin: 10px 10px 5px 10px;
          }
          .product-price {
            color: $bg-orange;
            font-size: 15px;
            margin: 0 10px;
            font-weight: bold;
            span {
              font-size: 12px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
