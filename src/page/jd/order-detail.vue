<template>
  <transition name="slide">
    <div class="page-order-detail">
      <div class="home-head">
        <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
        <h2 class="title">付款</h2>
      </div>
      <van-notice-bar :scrollable="false">
        <svg-icon icon-class="horn"></svg-icon>
        暂不做真实支付，直接将收货信息传给后台接口即可。
      </van-notice-bar>
      <div class="main">
        <div class="order-item">
          <div class="order-title">
            <span>{{order.oid}}</span>
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
          <div class="operate-box">
            <span class="time">下单日期：{{order.ordertime | formatDateTime}}</span>
          </div>
        </div>
        <van-cell-group>
          <van-field
            v-model="formItems.telephone"
            label="手机"
            required
            type="number"
            placeholder="请输入手机号码"
          ></van-field>
          <van-field
            v-model="formItems.name"
            label="收货人"
            required
            placeholder="请输入收货人"
          ></van-field>
          <van-field
            v-model="formItems.address"
            label="地址"
            required
            placeholder="请输入地址"
          ></van-field>
        </van-cell-group>
      </div>
      <van-submit-bar
        :disabled="!order.list||order.list.length===0"
        class="submit"
        :price="order.total*100"
        button-text="提交订单"
        @submit="onSubmit"
      ></van-submit-bar>
    </div>
  </transition>
</template>
<script>
  import { getOrderDetail, pay } from '../../api/jd'
  import { baseURL } from '../../common/js/config'
  import { Toast } from 'vant'
  import { mapActions } from 'vuex'

  export default {
    created() {
      this.fetchData()
    },
    computed: {
      oid() {
        return this.$route.params.id
      }
    },
    data() {
      return {
        order: {},
        formItems: {
          address: '',
          name: '',
          telephone: ''
        }
      }
    },
    methods: {
      ...mapActions(['refreshOrderList']),
      fetchData() {
        getOrderDetail(this.oid).then(res => {
          this.order = res.data
        })
      },
      onSubmit() {
        if (!this.formItems.telephone) {
          Toast({ message: '手机不能为空', position: 'bottom' })
          return
        }
        if (!this.formItems.name) {
          Toast({ message: '收货人不能为空', position: 'bottom' })
          return
        }
        if (!this.formItems.address) {
          Toast({ message: '地址不能为空', position: 'bottom' })
          return
        }
        Toast.loading('提交中...')
        pay(this.oid, this.formItems.telephone, this.formItems.name, this.formItems.address).then(res => {
          Toast.clear()
          Toast({ message: res.msg, position: 'bottom' })
          this.refreshOrderList(true)
          this.back()
        }).catch(error => {
          Toast.clear()
          Toast({ message: error.message, position: 'bottom' })
        })
      },
      getUrl(url) {
        return `${baseURL}/image?image=${url}`
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
  .page-order-detail {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: $bg-gray;
    z-index: 100;
    padding-bottom: 50px;
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
        }
      }
      .van-cell-group {
        margin-bottom: 10px;
      }
    }
  }
</style>
