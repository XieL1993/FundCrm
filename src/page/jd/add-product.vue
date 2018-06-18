<template>
  <transition name="slide">
    <div class="page-add-product">
      <div class="home-head">
        <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
        <h2 class="title">新增产品</h2>
        <span @click="fetchData">提交</span>
      </div>
      <div class="main">
        <van-cell-group>
          <van-field
            v-model="formItems.pname"
            label="产品名称"
            required
            placeholder="请输入产品名称"
          ></van-field>
          <van-cell title="分类" is-link v-model="formItems.cname" @click.native="actionsShow = true"></van-cell>
          <van-field
            v-model="formItems.market_price"
            type="number"
            label="市场价"
            required
            placeholder="请输入市场价"
          ></van-field>
          <van-field
            v-model="formItems.shop_price"
            type="number"
            label="优惠价"
            required
            placeholder="请输入优惠价"
          ></van-field>
          <van-field
            v-model="formItems.pdesc"
            label="备注"
            required
            placeholder="请输入产品备注"
          ></van-field>
        </van-cell-group>
        <div class="img-list" ref="imgList">
          <div class="pick-box" :style="getPikerStyle()">
            <van-uploader :after-read="onRead" :before-read="onBefore">
              <svg-icon icon-class="pick"></svg-icon>
            </van-uploader>
          </div>
          <div class="img-box" :style="getStyle(file.content)" v-for="(file,index) in files" :key="index">
          </div>
        </div>
      </div>
      <van-actionsheet v-model="actionsShow" :actions="actions"></van-actionsheet>
    </div>
  </transition>
</template>
<script>
  import { Toast, Dialog } from 'vant'
  import { addProduct, getCategory } from '../../api/jd'

  export default {
    data() {
      return {
        files: [],
        formItems: {
          pname: '',
          cid: '',
          cname: '',
          market_price: '',
          shop_price: '',
          pdesc: ''
        },
        imgSize: 0,
        actionsShow: false,
        actions: []
      }
    },
    created() {
      getCategory().then(res => {
        const list = res.data
        list.splice(0, 1)
        list.forEach(item => {
          this.actions.push({
            name: item.cname,
            key: item.cid,
            callback: this.setCid
          })
        })
        this.formItems.cid = list[0].cid
        this.formItems.cname = list[0].cname
      })
    },
    mounted() {
      this.imgSize = (this.$refs.imgList.clientWidth - 10) / 3
    },
    methods: {
      fetchData() {
        if (!this.formItems.pname) {
          Toast({ message: '请输入产品名称', position: 'bottom' })
          return
        }
        if (!this.formItems.cid) {
          Toast({ message: '请选择产品分类', position: 'bottom' })
          return
        }
        if (!this.formItems.market_price) {
          Toast({ message: '请输入产品市场价', position: 'bottom' })
          return
        }
        if (!this.formItems.shop_price) {
          Toast({ message: '请输入产品优惠价', position: 'bottom' })
          return
        }
        if (this.files.length === 0) {
          Toast({ message: '请上传产品封面', position: 'bottom' })
          return
        }
        Toast.loading('提交中...')
        const param = new FormData()
        param.append('file', this.files[0].file)
        param.append('pname', this.formItems.pname)
        param.append('cid', this.formItems.cid)
        param.append('market_price', this.formItems.market_price)
        param.append('shop_price', this.formItems.shop_price)
        param.append('pdesc', this.formItems.pdesc)
        addProduct(param).then(res => {
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
      setCid(item) {
        this.formItems.cid = item.key
        this.formItems.cname = item.name
        this.actionsShow = false
      },
      getPikerStyle() {
        return {
          width: `${this.imgSize}px`,
          flex: `0 0 ${this.imgSize}px`,
          height: `${this.imgSize}px`
        }
      },
      getStyle(val) {
        return {
          width: `${this.imgSize}px`,
          flex: `0 0 ${this.imgSize}px`,
          height: `${this.imgSize}px`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage: `url(${val})`
        }
      },
      back() {
        this.$router.back()
      },
      onBefore() {
        Toast.loading('读取中...')
        return true
      },
      onRead(file) {
        this.files.push(file)
        Toast.clear()
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";
  @import "../../common/styles/anim";

  @include slide();
  .page-add-product {
    @include fullScreen(fixed, 99);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    z-index: 99;
    .home-head {
      flex: 0 0 auto;
      height: 50px;
      background: $base-color;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: #ffffff;
      h2 {
        flex: 1 1 auto;
        font-size: 17px;
        text-align: center;
      }
      .svg-icon {
        flex: 0 0 auto;
        &.back {
          font-size: 22px;
          margin-right: 8px;
        }
      }
      span {
        flex: 0 0 auto;
        font-size: 14px;
        width: 30px;
        height: 50px;
        line-height: 50px;
        text-align: right;
      }
    }
    .main {
      flex: 1;
      overflow: auto;
      padding-top: 10px;
      .img-list {
        display: flex;
        flex-flow: row wrap;
        margin: 0 15px;
        .pick-box, .img-box {
          margin-top: 10px;
          margin-right: 5px;
          &:nth-of-type(3n) {
            margin-right: 0;
          }
          &.pick-box {
            border: 1px $border-main dashed;
            .van-uploader {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              .svg-icon {
                color: $color-info;
                font-size: 36px;
              }
            }
          }
        }
      }
    }
  }
</style>
