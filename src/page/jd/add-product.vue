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
            type="number"
            required
            placeholder="请输入产品名称"
          ></van-field>
          <van-field
            v-model="formItems.markert_price"
            type="number"
            label="市场价"
            required
            placeholder="请输入市场价"
          ></van-field>
          <van-field
            v-model="formItems.shop_price"
            type="number"
            label="商城价"
            placeholder="请输入商城价"
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
    </div>
  </transition>
</template>
<script>
  import { Toast } from 'vant'

  export default {
    data() {
      return {
        files: [],
        formItems: {
          pname: '',
          markert_price: '',
          shop_price: ''
        },
        imgSize: 0
      }
    },
    mounted() {
      this.imgSize = (this.$refs.imgList.clientWidth - 10) / 3
    },
    methods: {
      fetchData() {
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
        console.log(file)
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
