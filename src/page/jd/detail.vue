<template>
  <transition name="slide">
    <div class="product-detail">
      <div class="image" :style="getStyle()" v-lazy:backgroundImage="getUrl(detail.pimage)"></div>
      <div class="price-box">
        <div class="price shop">狂欢价￥<span>{{detail.shop_price}}</span></div>
        <div class="price market">价格￥<span>{{detail.market_price}}</span></div>
        <svg-icon icon-class="double11"></svg-icon>
      </div>
      <div class="product-name">{{detail.pname}}</div>
      <div class="description">
        <div class="title">
          <span>商品介绍</span>
          <van-stepper
            v-model="count"
            integer
            :min="1"
            :step="1"
          ></van-stepper>
        </div>
        <div class="content">{{detail.pdesc}}</div>
      </div>
      <van-button type="primary" bottom-action @click.native="addToCart">添加购物车</van-button>
    </div>
  </transition>
</template>
<script>
  import { baseURL } from '../../common/js/config'
  import { getProductDetail, addCart } from '../../api/jd'
  import { Toast, Dialog } from 'vant'

  export default {
    created() {
      this.fetchData()
    },
    data() {
      return {
        count: 1,
        detail: {}
      }
    },
    computed: {
      pid() {
        return this.$route.params.id
      }
    },
    methods: {
      fetchData() {
        getProductDetail(this.pid).then(res => {
          this.detail = res.data
        })
      },
      addToCart() {
        Toast.loading('提交中...')
        addCart({
          count: this.count,
          pid: this.detail.pid
        }).then(res => {
          Toast.clear()
          Dialog.alert({
            title: '提示',
            message: res.msg
          }).then(() => {
            this.back()
          })
        }).catch(error => {
          Toast.clear()
          Toast({ message: error.message, position: 'bottom' })
        })
      },
      getStyle() {
        return {
          width: '100%',
          height: '0',
          paddingTop: '70%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          cursor: 'pointer',
          backgroundPosition: 'top center'
        }
      },
      getUrl(url) {
        return `${baseURL}/image?image=${url}`
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/anim";
  @import "../../common/styles/variables";

  @include slide();
  .product-detail {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: $bg-gray;
    z-index: 99;
    padding-bottom: 45px;
    .price-box {
      height: 70px;
      background: linear-gradient(90deg, #FF3434, #FE016A, #FF3434);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 15px;
      position: relative;
      overflow: hidden;
      .price {
        color: #ffffff;
        &.shop {
          font-size: 15px;
          margin-bottom: 5px;
          span {
            font-size: 18px;
          }
        }
        &.market {
          font-size: 14px;
          span {
            text-decoration: line-through;
          }
        }
      }
      .svg-icon {
        position: absolute;
        top: -25px;
        right: 15px;
        font-size: 120px;
        color: #ffffff;
      }
    }
    .product-name {
      color: $color-main;
      margin-top: 10px;
      padding: 0 15px;
      font-size: 16px;
      font-weight: bold;
      line-height: 20px;
    }
    .description {
      margin-top: 5px;
      padding: 0 15px;
      .title {
        display: flex;
        align-items: center;
        span {
          flex: 1 1 auto;
          color: $bg-red-deep;
          font-size: 15px;
        }
        .van-stepper {
          flex: 0 0 auto;
        }
      }
      .content {
        color: $color-main;
        font-size: 14px;
        margin-top: 10px;
        line-height: 20px;
      }
    }
    .van-button {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 45px;
      background: linear-gradient(90deg, #FF3434, #FE016A, #FF3434);
    }
  }
</style>
