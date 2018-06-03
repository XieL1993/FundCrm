<template>
  <div class="student">
    <div class="home-head">
      <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
      <h2 class="title">学生管理系统</h2>
      <svg-icon icon-class="add" class="add" @click.native="add"></svg-icon>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="fetchData"
      >
        <div class="student-item" v-for="(item,index) in students" :key="index">
          <span class="head-photo" :style="getColor()">{{item.sname.charAt(0)}}</span>
          <div class="content">
            <div class="top">
              <span class="name">{{item.sname}}</span>
              <span class="gender">{{item.gender==='0'?'女':'男'}}</span>
              <span class="phone">{{item.phone}}</span>
            </div>
            <div class="hobby">爱好：{{item.hobby}}</div>
            <div class="info">备注：{{item.info}}</div>
          </div>
        </div>
      </van-list>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { getStudentList } from '../../api/student'

  export default {
    data() {
      return {
        students: [],
        finished: true,
        loading: false,
        colors: ['#5EC9F6', '#F65E8D', '#A1887F', '#78C06E', '#F6BF26', '#0094ff', '#5C6BC0', '#A1887F', '#FF8E6B', '#C5CB63']
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getStudentList().then(res => {
          this.students = res.data
        })
      },
      back() {
        this.$router.go(-1)
      },
      add() {
        this.$router.push('/student/add')
      },
      getColor() {
        const background = this.colors[Math.floor(Math.random() * 10)]
        return { background }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .student {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: $bg-gray;
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
        color: #ffffff;
        text-align: center;
      }
      .svg-icon {
        flex: 0 0 auto;
        &.back {
          font-size: 22px;
          margin-right: 8px;
        }
        &.add {
          font-size: 18px;
          margin-left: 12px;
        }
      }
    }
    .main {
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none
      }
      .student-item {
        height: 80px;
        background: #ffffff;
        margin-top: 10px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        &:active {
          background: $color-active
        }
        .head-photo {
          flex: 0 0 50px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-left: 15px;
          background: #43A649;
          color: #ffffff;
          text-align: center;
          line-height: 50px;
          font-size: 16px;
        }
        .content {
          flex: 1 1 auto;
          height: 100%;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .top {
            font-size: 14px;
            color: $color-normal;
            .name {
              flex: 0 0 auto;
            }
            .phone {
              flex: 0 0 auto;
              margin-left: 8px;
            }
            .gender {
              flex: 0 0 auto;
              margin-left: 8px;
            }
          }
          .hobby, .info {
            font-size: 14px;
            color: $color-normal;
            margin-top: 5px;
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
