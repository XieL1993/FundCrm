<template>
  <div class="child-list">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="fetchData(false)"
    >
      <div class="product-list">
        <div class="product-item" v-for="(item,index) in products" :key="index" @click="detail(item.pid)">
          <div class="product-wrapper">
            <div class="image" :style="getStyle()" v-lazy:backgroundImage="getUrl(item.pimage)"></div>
            <div class="product-name">{{item.pname}}</div>
            <div class="product-price"><span>￥</span>{{item.shop_price}}</div>
          </div>
        </div>
        <div class="empty-box" v-show="!products||!products.length">
          <svg-icon icon-class="nodata"></svg-icon>
          <span>暂无数据</span>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
  import { getProductList } from '../../api/jd'
  import { baseURL } from '../../common/js/config'

  export default {
    props: {
      cid: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        currentPage: 0,
        pageSize: 4,
        products: [],
        finished: false,
        loading: false
      }
    },
    methods: {
      fetchData(isRefresh) {
        if (isRefresh) {
          this.currentPage = 1
        } else {
          this.currentPage = this.currentPage + 1
        }
        getProductList(this.cid, this.pageSize, this.currentPage).then(res => {
          if (isRefresh) {
            this.products = res.data.list
          } else {
            for (const item of res.data.list) {
              this.products.push(item)
            }
          }
          this.loading = false
          this.finished = this.currentPage >= res.data.totalPage
        })
      },
      detail(pid) {
        this.$router.push(`/jd/${pid}`)
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
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .child-list {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none
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
      .empty-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .svg-icon {
          font-size: 60px;
          color: $base-color;
        }
        span {
          display: block;
          font-size: 14px;
          color: $base-color;
          margin-top: 10px;
          padding-left: 20px;
        }
      }
    }

  }
</style>
