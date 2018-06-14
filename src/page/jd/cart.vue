<template>
  <transition name="slide">
    <div class="cart">
      <div class="home-head">
        <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
        <h2 class="title">购物车({{items.length}})</h2>
        <div class="clear-box">
          <span class="clear" @click="clear" v-if="items.length">清空</span>
        </div>
      </div>
      <div class="main">
        <div class="cart-item" v-for="(item,index) in items" :key="index"
             @touchstart="showDeleteButton(item)" @touchmove="clearTimer" @touchend="clearTimer">
          <div class="image" :style="getStyle()" v-lazy:backgroundImage="getUrl(item.product.pimage)"></div>
          <div class="right">
            <div class="pname">{{item.product.pname}}</div>
            <div class="price">价格：<span>￥</span>{{item.product.shop_price}}</div>
            <div class="num-box">
              <div class="sub-total"><span>￥</span>{{item.subTotal}}</div>
              <van-stepper
                integer
                :min="1"
                :step="1"
                :default-value="item.num"
              ></van-stepper>
            </div>
          </div>
        </div>
        <van-submit-bar
          :disabled="items.length===0"
          class="submit"
          :price="total*100"
          button-text="提交订单"
          @submit="onSubmit"
        ></van-submit-bar>
        <div class="empty-box" v-show="!items.length">
          <svg-icon icon-class="nodata"></svg-icon>
          <span>暂无数据</span>
        </div>
      </div>
      <list-dialog :data="dialogData" v-model="isShowDialog"
                   :title="currentItem.product&&currentItem.product.pname"></list-dialog>
    </div>
  </transition>
</template>
<script>
  import { getCart, clearCart, deleteCart, addOrder } from '../../api/jd'
  import { baseURL } from '../../common/js/config'
  import { Toast, Dialog } from 'vant'
  import ListDialog from '../../components/list-dialog'
  import { mapGetters } from 'vuex'

  export default {
    created() {
      this.fetchData()
    },
    computed: {
      ...mapGetters(['uid'])
    },
    data() {
      return {
        items: [],
        total: 0,
        currentItem: {},
        isShowDialog: false,
        dialogData: [
          {
            label: '从购物车中删除',
            click: this.delete
          }
        ]
      }
    },
    methods: {
      fetchData() {
        getCart().then(res => {
          this.items = res.data.items
          this.total = res.data.total
        })
      },
      onSubmit() {
        if (this.items.length === 0) {
          return
        }
        Toast.loading('提交订单中...')
        addOrder(this.uid).then(() => {
          Toast.clear()
          this.$router.replace('/jd/order')
        }).catch(error => {
          Toast.clear()
          Toast({ message: error.message, position: 'bottom' })
        })
      },
      clear() {
        if (this.items.length === 0) {
          return
        }
        Dialog.confirm({
          title: '警告',
          message: '是否清空购物车？'
        }).then(() => {
          Toast.loading('提交中...')
          clearCart().then(res => {
            Toast.clear()
            Toast({ message: res.msg, position: 'bottom' })
            this.fetchData()
          }).catch(error => {
            Toast.clear()
            Toast({ message: error.message, position: 'bottom' })
          })
        }).catch(res => {
        })
      },
      showDeleteButton(item) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.currentItem = item
          this.isShowDialog = true
        }, 500)
      },
      clearTimer() {
        clearTimeout(this.timer)
      },
      delete() {
        if (this.currentItem.product && this.currentItem.product.pid) {
          Toast.loading('提交中...')
          deleteCart(this.currentItem.product.pid).then(res => {
            Toast.clear()
            Toast({ message: res.msg, position: 'bottom' })
            this.fetchData()
          }).catch(error => {
            Toast.clear()
            Toast({ message: error.message, position: 'bottom' })
          })
        }
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
      getUrl(url) {
        return `${baseURL}/image?image=${url}`
      },
      back() {
        this.$router.back()
      }
    },
    components: {
      ListDialog
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/anim";
  @import "../../common/styles/variables";

  @include slide();
  .cart {
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
        margin-right: 18px;
      }
      h2 {
        flex: 1 1 auto;
        font-size: 17px;
        color: #ffffff;
        text-align: center;
      }
      .clear-box {
        width: 40px;
        height: 50px;
        .clear {
          display: inline-block;
          width: 100%;
          line-height: 50px;
          font-size: 15px;
          text-align: right;
        }
      }
    }
    .main {
      height: 100%;
      overflow: auto;
      padding-top: 10px;
      padding-bottom: 50px;
      &::-webkit-scrollbar {
        display: none
      }
      .cart-item {
        background: #ffffff;
        border-radius: 6px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.12);
        margin: 0 10px 10px 10px;
        display: flex;
        height: 140px;
        align-items: center;
        padding: 0 15px;
        .right {
          flex: 1 1 auto;
          margin-left: 15px;
          .pname {
            color: $color-main;
            font-size: 16px;
            font-weight: bold;
            line-height: 20px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            word-break: break-all;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
          }
          .price {
            color: $color-main;
            font-size: 15px;
            line-height: 20px;
            margin-top: 5px;
          }
          .num-box {
            display: flex;
            margin-top: 5px;
            align-items: center;
            .sub-total {
              flex: 1 1 auto;
              color: $bg-red;
            }
          }
        }
      }
      .submit {
        position: absolute;
        bottom: 0;
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
