<template>
  <div class="student">
    <div class="home-head">
      <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
      <h2 class="title">学生管理系统</h2>
      <svg-icon icon-class="add" class="add" @click.native="add"></svg-icon>
    </div>
    <van-search placeholder="请输入学生姓名" background="#F5F5F9" @search="fetchData(true)" v-model="searchText"></van-search>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="fetchData(false)"
      >
        <div class="student-item" v-for="(item,index) in students" :key="index"
             @touchstart="showDeleteButton(item)" @touchmove="clearLoop" @touchend="clearLoop" @click="edit(item)">
          <span class="head-photo" :style="getColor(index)">{{item.sname.charAt(0)}}</span>
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
    <list-dialog :data="dialogData" v-model="isShowDialog" :title="currentItem.sname"></list-dialog>
  </div>
</template>
<script>
  import { Toast } from 'vant'
  import { getStudentList, deleteStudent } from '../../api/student'
  import { mapGetters, mapActions } from 'vuex'
  import ListDialog from '../../components/list-dialog'

  export default {
    data() {
      return {
        searchText: '',
        currentPage: 0,
        pageSize: 10,
        students: [],
        finished: false,
        loading: false,
        isShowDialog: false,
        currentItem: { sname: '' },
        dialogData: [
          {
            label: '从学生管理系统中删除',
            click: this.deleteStudent
          }
        ],
        colors: ['#5EC9F6', '#F65E8D', '#A1887F', '#78C06E', '#F6BF26', '#5C6BC0', '#FF8E6B']
      }
    },
    computed: {
      ...mapGetters(['studentList'])
    },
    watch: {
      studentList(val) {
        if (val) {
          this.refreshStudentList(false)
          this.fetchData(true)
        }
      },
      searchText(val) {
        if (!val) {
          this.fetchData(true)
        }
      }
    },
    methods: {
      ...mapActions(['refreshStudentList']),
      fetchData(isRefresh) {
        if (isRefresh) {
          this.currentPage = 1
        } else {
          this.currentPage = this.currentPage + 1
        }
        getStudentList(this.searchText, this.pageSize, this.currentPage).then(res => {
          if (isRefresh) {
            this.students = res.data.list
          } else {
            for (const item of res.data.list) {
              this.students.push(item)
            }
          }
          this.loading = false
          this.finished = this.currentPage >= res.data.totalPage
        })
      },
      deleteStudent() {
        if (this.currentItem && this.currentItem.sid) {
          Toast.loading('提交中...')
          deleteStudent(this.currentItem.sid).then(res => {
            Toast.clear()
            Toast({ message: res.msg, position: 'bottom' })
            this.fetchData(true)
          })
        }
      },
      back() {
        this.$router.go(-1)
      },
      add() {
        this.$router.push('/student/add')
      },
      getColor(index) {
        const background = this.colors[index % 7]
        return { background }
      },
      showDeleteButton(item) {
        clearInterval(this.Loop)
        this.Loop = setTimeout(function() {
          this.currentItem = item
          this.isShowDialog = true
        }.bind(this), 500)
      },
      edit(item) {
        const query = { sid: item.sid }
        this.$router.push({ path: '/student/add', query })
      },
      clearLoop() {
        clearInterval(this.Loop)
      }
    },
    components: {
      ListDialog
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
    .van-search {
      flex: 0 0 60px;
      height: 60px;
      padding: 10px 10px;
    }
    .main {
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar {
        /*display: none*/
      }
      .student-item {
        height: 80px;
        background: #ffffff;
        margin-top: 10px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        &:first-of-type {
          margin-top: 0;
        }
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
          overflow: hidden;
          padding-right: 10px;
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
