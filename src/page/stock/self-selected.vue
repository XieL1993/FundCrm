<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="self-selected">
      <div class="fund-item" v-for="(item,index) in data" :key="index">
        <div class="left">
          <span class="name">{{item.name}}</span>
          <span class="code">{{item.code}}</span>
        </div>
        <div class="middle">{{item.price}}</div>
        <div class="place"></div>
        <div class="right" :class="getColor(item.value)">{{item.value}}%</div>
      </div>
      <div class="add">+添加股票</div>
      <div class="footer">
        <span>行情由第三方提供，详见使用声明</span>
      </div>
    </div>
  </van-pull-refresh>
</template>
<script>
  export default {
    data() {
      return {
        isLoading: false,
        data: [
          {
            name: '上证指数',
            code: '1A0001.SH',
            price: '3168.96',
            value: '-1.41'
          },
          {
            name: '贵州茅台',
            code: '600519.SH',
            price: '723.78',
            value: '-2.14'
          },
          {
            name: '博时黄金',
            code: '000929',
            price: '2.6919',
            value: '+0.26'
          },
          {
            name: '道琼斯',
            code: 'DJI.USI',
            price: '24834.41',
            value: '0.00'
          },
          {
            name: '白银基金',
            code: '161226.SZ',
            price: '0.796',
            value: '+1.13'
          },
          {
            name: '创业板指',
            code: '399006.SZ',
            price: '1845.97',
            value: '-1.60'
          },
          {
            name: '上证指数',
            code: '1A0001.SH',
            price: '3168.96',
            value: '-1.41'
          },
          {
            name: '贵州茅台',
            code: '600519.SH',
            price: '723.78',
            value: '-2.14'
          },
          {
            name: '上证指数',
            code: '1A0001.SH',
            price: '3168.96',
            value: '-1.41'
          },
          {
            name: '贵州茅台',
            code: '600519.SH',
            price: '723.78',
            value: '-2.14'
          },
          {
            name: '上证指数',
            code: '1A0001.SH',
            price: '3168.96',
            value: '-1.41'
          },
          {
            name: '贵州茅台',
            code: '600519.SH',
            price: '723.78',
            value: '-2.14'
          }
        ]
      }
    },
    methods: {
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      },
      getColor(value) {
        if (value > 0) {
          return 'red'
        } else if (value < 0) {
          return 'green'
        } else {
          return 'gray'
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .van-pull-refresh {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none
    }
    .self-selected {
      .fund-item {
        height: 50px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        &:active {
          background: #e8e8e8;
        }
        .left {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          width: 120px;
          .name {
            font-size: 16px;
            color: $color-main;
            margin-bottom: 2px;
          }
          .code {
            font-size: 11px;
            color: $color-info;
          }
        }
        .middle {
          width: 100px;
          font-size: 20px;
          color: #000000;
          text-align: right;
        }
        .place {
          flex: 1 1 auto;
        }
        .right {
          flex: 0 0 auto;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #ffffff;
          font-size: 17px;
          &.red {
            background: $bg-red-deep;
          }
          &.gray {
            background: $bg-gray-deep;
          }
          &.green {
            background: $bg-green;
          }
        }
      }
      .add {
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        color: $color-main;
        text-align: center;
      }
      .footer {
        height: 50px;
        background: $bg-gray;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          color: $color-placeholder;
          font-size: 13px;
        }
      }
    }
  }

</style>
