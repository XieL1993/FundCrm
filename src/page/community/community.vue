<template>
  <div id="community">
    <div class="home-head">
      <div class="title">
        <svg-icon icon-class="search"></svg-icon>
        <span>股票/基金/问答/咨询/用户</span>
      </div>
      <svg-icon icon-class="person" class="person"></svg-icon>
      <svg-icon icon-class="message" class="message"></svg-icon>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="main">
        <div class="chat">
          <div class="chat-item" v-for="(item,index) in data" :key="index">
            <div class="left" :class="getColor(item.value)">
              <div class="value">{{item.value}}%</div>
              <div class="info">{{item.status}}</div>
            </div>
            <div class="middle">
              <div class="title"><span class="text">{{item.name}}</span><span class="icon" v-if="item.isOwn">持有</span>
              </div>
              <div class="content">{{item.title}}</div>
            </div>
            <div class="right" v-if="item.number>0">{{getNumber(item.number)}}</div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isLoading: false,
        data: [
          {
            name: '上证指数 讨论',
            title: '看见这么多人被骗，我就放心了，各位大傻，今年会到40000点',
            value: '-0.16',
            status: '交易中',
            isOwn: false,
            number: 124
          },
          {
            name: '天弘中证计算机指数C 讨论',
            title: '这只鸡的走势都是往下，暂时起不来了',
            value: '-0.61',
            status: '05-23更新',
            isOwn: true,
            number: 13
          },
          {
            name: '华安媒体互联网混合 讨论',
            title: '今晚能吃鸡吗？',
            value: '+0.44',
            status: '05-23更新',
            isOwn: true,
            number: 30
          },
          {
            name: '国投瑞银国家安全灵活配置混合型证券投资基金 讨论',
            title: '还有没有神奇两点半，坐等',
            value: '0.00',
            status: '05-23更新',
            isOwn: true,
            number: 0
          },
          {
            name: '上证指数 讨论',
            title: '看见这么多人被骗，我就放心了，各位大傻，今年会到40000点',
            value: '-0.16',
            status: '交易中',
            isOwn: false,
            number: 54
          },
          {
            name: '天弘中证计算机指数C 讨论',
            title: '这只鸡的走势都是往下，暂时起不来了',
            value: '-0.61',
            status: '05-23更新',
            isOwn: true,
            number: 12
          },
          {
            name: '华安媒体互联网混合 讨论',
            title: '今晚能吃鸡吗？',
            value: '+0.44',
            status: '05-23更新',
            isOwn: true,
            number: 12
          },
          {
            name: '上证指数 讨论',
            title: '看见这么多人被骗，我就放心了，各位大傻，今年会到40000点',
            value: '-0.16',
            status: '交易中',
            isOwn: false,
            number: 124
          },
          {
            name: '天弘中证计算机指数C 讨论',
            title: '这只鸡的走势都是往下，暂时起不来了',
            value: '-0.61',
            status: '05-23更新',
            isOwn: true,
            number: 124
          },
          {
            name: '华安媒体互联网混合 讨论',
            title: '今晚能吃鸡吗？',
            value: '+0.44',
            status: '05-23更新',
            isOwn: true,
            number: 124
          },
          {
            name: '上证指数 讨论',
            title: '看见这么多人被骗，我就放心了，各位大傻，今年会到40000点',
            value: '-0.16',
            status: '交易中',
            isOwn: false,
            number: 124
          },
          {
            name: '天弘中证计算机指数C 讨论',
            title: '这只鸡的走势都是往下，暂时起不来了',
            value: '-0.61',
            status: '05-23更新',
            isOwn: true,
            number: 124
          },
          {
            name: '华安媒体互联网混合 讨论',
            title: '今晚能吃鸡吗？',
            value: '+0.44',
            status: '05-23更新',
            isOwn: true,
            number: 124
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
      },
      getNumber(number) {
        if (number <= 0) {
          return ''
        } else if (number > 99) {
          return '+99'
        } else {
          return number
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  #community {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .home-head {
      flex: 0 0 auto;
      height: 50px;
      background: $base-color;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: #ffffff;
      .title {
        flex: 1 1 auto;
        height: 30px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding-left: 15px;
        .svg-icon {
          font-size: 13px;
        }
        span {
          font-size: 12px;
          line-height: 30px;
          margin-left: 5px;
        }
      }
      .svg-icon {
        flex: 0 0 auto;
        &.person {
          margin-left: 25px;
          font-size: 19px;
        }
        &.message {
          margin-left: 16px;
          font-size: 24px
        }
      }
    }
    .van-pull-refresh {
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none
      }
      .main {
        .chat {
          .chat-item {
            height: 85px;
            padding:0 15px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid $border-normal;
            &:last-of-type{
              border-bottom: 10px solid $bg-gray;
            }
            &:active {
              background: $color-active;
            }
            .left {
              flex: 0 0 55px;
              width: 55px;
              height: 55px;
              color: #Ffffff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              &.red {
                background: linear-gradient(180deg, #de5f10, #DE4A01);
              }
              &.gray {
                background: linear-gradient(180deg, #80807d, #80797a);
              }
              &.green {
                background: linear-gradient(180deg, #68b35b, #41A73C);
              }
              .value {
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 2px;
              }
              .info {
                font-size: 11px;
                text-align: center;
                color: rgba(255, 255, 255, 0.7);
                transform: scale(0.8);
              }
            }
            .middle {
              flex: 1 1 auto;
              margin: 0 10px;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              .title {
                display: flex;
                align-items: center;
                .text {
                  color: $color-main;
                  font-size: 17px;
                  @include no-wrap;
                }
                .icon {
                  flex: 0 0 auto;
                  margin-left: 5px;
                  background: linear-gradient(90deg, #ffbe46, #FFAB21);
                  color: #ffffff;
                  font-size: 11px;
                  text-align: center;
                  height: 15px;
                  line-height: 15px;
                  padding: 0 3px;
                  transform: scale(0.9);
                }
              }
              .content {
                margin-top: 6px;
                font-size: 13px;
                color: $color-info;
                @include no-wrap;
              }
            }
            .right {
              flex: 0 0 auto;
              background: $bg-red;
              color: #ffffff;
              font-size: 12px;
              padding: 2px 6px;
              border-radius: 8.5px;
            }
          }
        }
      }
    }
  }
</style>
