<template>
  <div id="home">
    <div class="home-head">
      <div class="title">
        <svg-icon icon-class="search"></svg-icon>
        <span>股票/基金/问答/咨询/用户</span>
      </div>
      <svg-icon icon-class="add"></svg-icon>
    </div>
    <div class="main">
      <div class="quick-entry">
        <div class="entry-item">
          <svg-icon icon-class="yuEbao"></svg-icon>
          余额宝
        </div>
        <div class="entry-item">
          <svg-icon icon-class="save" class="big"></svg-icon>
          定期
        </div>
        <div class="entry-item">
          <svg-icon icon-class="assets" class="big"></svg-icon>
          基金
        </div>
        <div class="entry-item">
          <svg-icon icon-class="gold"></svg-icon>
          黄金
        </div>
      </div>
      <div class="news">
        <div class="news-item">
          <div class="label">要闻</div>
          <div class="title">上证回补拉升 煤炭科技出现机会</div>
        </div>
        <div class="news-item">
          <div class="label">大咖</div>
          <div class="title">天量债务到期，创业板成万绿丛中一点红，房企吞并在一触即发！</div>
        </div>
      </div>
      <div class="fund">
        <section-head title="精选基金" desc="王牌好基 智能优选" right-text="更多"></section-head>
        <div class="fund-item" v-for="(item,index) in funds" :key="index">
          <div class="left">
            <div class="value">{{item.value}}</div>
            <div class="desc">{{item.valueDesc}}</div>
          </div>
          <i class="divide"></i>
          <div class="right">
            <div class="value">{{item.name}}</div>
            <div class="desc">{{item.nameDesc}}</div>
          </div>
        </div>
      </div>
      <div class="hot">
        <section-head :show-right="false" title="投资热点" desc="紧跟趋势 抢占先机"></section-head>
        <div class="hot-item" v-for="(item,index) in hots" :key="index">
          <div class="left" :style="{color:item.color,'border-color':item.color}">{{item.label}}</div>
          <i class="divide"></i>
          <div class="right">
            <div class="title">{{item.title}}</div>
            <div class="info">{{item.info}}</div>
          </div>
        </div>
      </div>
      <div class="current-financial">
        <section-head title="活期理财" desc="活期最佳 随机存取" right-text="更多"></section-head>
        <div class="fund-item" v-for="(item,index) in currents" :key="index">
          <div class="left">
            <div class="value">{{item.value}}</div>
            <div class="desc">{{item.valueDesc}}</div>
          </div>
          <i class="divide"></i>
          <div class="right">
            <div class="value">{{item.name}}</div>
            <div class="desc">{{item.nameDesc}}</div>
          </div>
        </div>
      </div>
      <div class="regular-financial">
        <section-head title="固定期限" desc="省心理财 稳健回报" right-text="更多"></section-head>
        <div class="fund-item" v-for="(item,index) in regulars" :key="index">
          <div class="left">
            <div class="value">{{item.value}}</div>
            <div class="desc">{{item.valueDesc}}</div>
          </div>
          <i class="divide"></i>
          <div class="right">
            <div class="value">{{item.name}}</div>
            <div class="desc">{{item.nameDesc}}</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <i></i>
        <svg-icon icon-class="logo"></svg-icon>
        <span>蚂蚁财富，为人生更自由</span>
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
  import SectionHead from '../../components/section-head'

  export default {
    data() {
      return {
        funds: [
          {
            name: '富国低碳环保混合',
            nameDesc: '36万人追捧的基界大明星',
            value: '+15.28%',
            valueDesc: '近一年涨跌幅'
          },
          {
            name: '富国天利增长债券',
            nameDesc: '贸易战里一招护体',
            value: '+5.02%',
            valueDesc: '近一年涨跌幅'
          },
          {
            name: '华宝海外中国成长混合(QDII)',
            nameDesc: '投资海外中国上市公司',
            value: '+30.51%',
            valueDesc: '近一年涨跌幅'
          },
          {
            name: '中欧行业成长混合A',
            nameDesc: '精准把握强势龙头',
            value: '+27.40%',
            valueDesc: '近一年涨跌幅'
          }
        ],
        currents: [
          {
            name: '人气货基天天有收益',
            nameDesc: '南方天天利货币A',
            value: '4.1890%',
            valueDesc: '七日年化收益率'
          }
        ],
        regulars: [
          {
            name: '短期7天',
            nameDesc: '国寿周周盈',
            value: '4.2710%',
            valueDesc: '七日年化'
          },
          {
            name: '短期30天',
            nameDesc: '长江养老月安享',
            value: '4.8000%',
            valueDesc: '七日年化'
          }
        ],
        hots: [
          {
            title: '抢反弹的不二选择',
            info: '估值见底，拐点显现',
            label: '银行',
            color: '#F4333C'
          },
          {
            title: '行业或迎万亿机遇',
            info: '政策利好，估值合理',
            label: '信息技术',
            color: '#FF8502'
          },
          {
            title: '布局下一个牛市',
            info: '回调充分，适逢市场回暖',
            label: '证券',
            color: '#428BE1'
          }
        ]
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

  #home {
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
        font-size: 20px;
        flex: 0 0 auto;
        margin-left: 15px;
      }
    }
    .main {
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none
      }
      .quick-entry {
        height: 90px;
        padding: 0 15px;
        display: flex;
        background: $base-color;
        .entry-item {
          flex: 1 1 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 12px;
          font-size: 15px;
          color: #ffffff;
          &:active {
            color: rgba(200, 200, 200, 0.8);
          }
          .svg-icon {
            font-size: 34px;
            margin-bottom: 12px;
          }
          &:nth-of-type(1), &:nth-of-type(4) {
            .svg-icon {
              padding: 3px;
            }
          }
        }
      }
      .news {
        padding: 15px;
        .news-item {
          display: flex;
          &:nth-of-type(2) {
            margin-top: 10px
          }
          .label {
            flex: 0 0 auto;
            font-size: 12px;
            line-height: 20px;
            padding: 0 4px;
            background: #FFF6F6;
            color: $bg-red;
          }
          .title {
            flex: 1 1 auto;
            line-height: 20px;
            font-size: 14px;
            margin-left: 6px;
            color: $color-main;
            @include no-wrap;
          }
        }
      }
      .fund, .current-financial, .regular-financial {
        .fund-item {
          border-top: 1px solid $border-info;
          display: flex;
          height: 95px;
          padding: 0 15px;
          align-items: center;
          &:active {
            background: #e8e8e8;
          }
          .left {
            flex: 0 0 auto;
            width: 100px;
            .value {
              color: $bg-red;
              font-size: 23px;
              @include no-wrap;
            }
            .desc {
              margin-top: 6px;
              font-size: 13px;
              color: $color-info;
              @include no-wrap;
            }
          }
          .divide {
            width: 1px;
            height: 40px;
            flex: 0 0 auto;
            background: $border-info;
            margin-left: 10px;
            margin-right: 20px;
          }
          .right {
            flex: 1 1 auto;
            overflow: hidden;
            .value {
              color: $color-main;
              font-size: 17px;
              padding: 3px 0;
              @include no-wrap;
            }
            .desc {
              margin-top: 6px;
              font-size: 13px;
              color: $color-info;
              @include no-wrap;
            }
          }
        }
      }
      .hot {
        .hot-item {
          border-top: 1px solid $border-info;
          display: flex;
          height: 95px;
          padding: 0 15px;
          align-items: center;
          &:active {
            background: #e8e8e8;
          }
          .left {
            flex: 0 0 auto;
            width: 52px;
            height: 52px;
            display: flex;
            padding: 5px;
            margin-left: 10px;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            border: 1px solid $base-color;
            color: $base-color;
            border-radius: 50%;
            text-align: center;
            overflow: hidden;
          }
          .divide {
            width: 1px;
            height: 40px;
            flex: 0 0 auto;
            background: $border-info;
            margin-left: 15px;
            margin-right: 25px;
          }
          .right {
            flex: 1 1 auto;
            overflow: hidden;
            .title {
              color: $color-main;
              font-size: 17px;
              padding: 3px 0;
              @include no-wrap;
            }
            .info {
              margin-top: 6px;
              font-size: 13px;
              color: $color-info;
              @include no-wrap;
            }
          }
        }
      }
      .footer {
        height: 85px;
        background: $bg-gray;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          width: 30px;
          height: 1px;
          background: $border-normal;
        }
        .svg-icon {
          color: $color-placeholder;
          margin-left: 6px;
          margin-top: -2px;
        }
        span {
          margin: 0 8px 0 4px;
          color: $color-placeholder;
          font-size: 13px;
        }
      }
    }

  }
</style>
