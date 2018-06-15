<template>
  <transition name="slide">
    <div class="page-order">
      <div class="home-head">
        <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
        <h2 class="title">我的订单</h2>
      </div>
      <div class="main">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="fetchData(false)"
        >
          <div class="order-list">
            <div class="order-item" v-for="(order,index) in orders" :key="index">
              <div class="order-title">
                <span>{{order.oid}}</span>
                <span>{{getState(order.state)}}</span>
              </div>
              <div class="order-child" v-for="(item,index) in order.list" :key="index">
                <div class="image" :style="getStyle()" v-lazy:backgroundImage="getUrl(item.product.pimage)"></div>
                <div class="right">
                  <div class="pname">{{item.product.pname}}</div>
                  <div class="price">
                    价格：<span>￥{{item.total/item.quantity}}</span>
                    <span>￥{{item.product.shop_price}}</span></div>
                  <div class="num-box">
                    <span>数量</span>
                    <span>{{item.quantity}}</span>
                  </div>
                </div>
              </div>
              <div class="total-box">共 <span>{{order.list.length}}</span> 件商品 合计：<span>￥{{order.total}}</span> (含运费0.00)
              </div>
              <div class="operate-box">
                <span class="time">下单日期：{{order.ordertime | formatDateTime}}</span>
                <van-button size="small" type="primary" @click.native="deleteOrder(order.oid)">删除订单</van-button>
                <van-button size="small" type="primary" @click.native="detail(order.oid)" v-if="order.state===1">付款
                </van-button>
              </div>
            </div>
          </div>
        </van-list>
        <div class="empty-box" v-show="!orders.length">
          <svg-icon icon-class="nodata"></svg-icon>
          <span>暂无订单</span>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
  import { getOrderList, deleteOrder } from '../../api/jd'
  import { Toast, Dialog } from 'vant'
  import { baseURL } from '../../common/js/config'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['orderList'])
    },
    watch: {
      orderList(val) {
        if (val) {
          this.refreshOrderList(false)
          this.fetchData(true)
        }
      }
    },
    data() {
      return {
        currentPage: 0,
        pageSize: 3,
        orders: [],
        finished: false,
        loading: false
      }
    },
    methods: {
      ...mapActions(['refreshOrderList']),
      fetchData(isRefresh) {
        if (isRefresh) {
          this.currentPage = 1
        } else {
          this.currentPage = this.currentPage + 1
        }
        getOrderList(this.pageSize, this.currentPage).then(res => {
          if (isRefresh) {
            this.orders = res.data.list
          } else {
            for (const item of res.data.list) {
              this.orders.push(item)
            }
          }
          this.loading = false
          this.finished = this.currentPage >= res.data.totalPage
        }).catch(error => {
          Toast({ message: error.message, position: 'bottom' })
        })
      },
      detail(oid) {
        this.$router.push(`/jd/order/detail/${oid}`)
      },
      deleteOrder(oid) {
        Dialog.confirm({
          title: '警告',
          message: '是否删除此订单？'
        }).then(() => {
          Toast.loading('提交中...')
          deleteOrder(oid).then(res => {
            Toast.clear()
            Toast({ message: res.msg, position: 'bottom' })
            this.fetchData(true)
          }).catch(error => {
            Toast.clear()
            Toast({ message: error.message, position: 'bottom' })
          })
        }).catch(res => {
        })
      },
      getStyle() {
        return {
          width: '100px',
          flex: '0 0 100px',
          height: '100px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          cursor: 'pointer',
          backgroundPosition: 'center center'
        }
      },
      getState(val) {
        if (val === 1) {
          return '待付款'
        } else if (val === 2) {
          return '待发货'
        } else if (val === 3) {
          return '已发货'
        } else if (val === 4) {
          return '已收货'
        } else {
          return ''
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
  @import "../../common/styles/mixin";

  @include slide();
  .page-order {
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
        margin-right: 22px;
      }
    }
    .main {
      flex: 1;
      overflow: auto;
      padding-top: 10px;
      &::-webkit-scrollbar {
        display: none
      }
      .order-list {
        .order-item {
          background: #ffffff;
          margin-bottom: 10px;
          .order-title {
            font-size: 12px;
            color: $color-normal;
            line-height: 40px;
            height: 40px;
            padding: 0 15px;
            display: flex;
            border-bottom: 1px solid $border-info;
            span:nth-child(1) {
              flex: 1 1 auto;
            }
            span:nth-child(2) {
              color: $bg-orange;
            }
          }
          .order-child {
            background: #fafafa;
            display: flex;
            height: 140px;
            align-items: center;
            padding: 0 15px;
            margin-bottom: 5px;
            &:nth-last-child(3) {
              margin-bottom: 0;
            }
            .right {
              flex: 1 1 auto;
              margin-left: 15px;
              .pname {
                color: $color-main;
                font-size: 16px;
                font-weight: bold;
                line-height: 20px;
                @include text-ellipsis(2);
              }
              .price {
                color: $color-main;
                font-size: 15px;
                line-height: 20px;
                margin-top: 5px;
                display: flex;
                span:nth-child(1) {
                  flex: 1 1 auto;
                }
                span:nth-child(2) {
                  flex: 0 0 auto;
                  text-decoration: line-through;
                  color: $color-info;
                }
              }
              .num-box {
                display: flex;
                margin-top: 5px;
                align-items: center;
                color: $color-info;
                span:nth-child(1) {
                  flex: 1 1 auto;
                  color: $color-main;
                }
              }
            }
          }
          .total-box {
            height: 40px;
            line-height: 40px;
            text-align: right;
            padding: 0 15px;
            border-top: 1px solid $border-info;
            font-size: 14px;
            color: $color-main;
            span {
              font-size: 16px;
            }
          }
          .operate-box {
            height: 45px;
            display: flex;
            padding: 0 15px;
            border-top: 1px solid $border-info;
            align-items: center;
            .time {
              flex: 1;
              line-height: 45px;
              font-size: 14px;
              color: $color-main;
            }
            .van-button {
              height: 30px;
              background: $bg-blue;
              border: none;
              margin-left: 10px;
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
          color: $color-normal;
        }
        span {
          display: block;
          font-size: 14px;
          color: $color-normal;
          margin-top: 10px;
          padding-left: 20px;
        }
      }
    }
  }
</style>
