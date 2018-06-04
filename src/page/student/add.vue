<template>
  <div class="add-student">
    <div class="home-head">
      <svg-icon icon-class="back" class="back" @click.native="back"></svg-icon>
      <h2 class="title">{{title}}</h2>
      <span @click="fetchData">提交</span>
    </div>
    <div class="main">
      <van-cell-group>
        <van-field
          v-model="formItems.sname"
          label="用户名"
          required
          placeholder="请输入学生姓名"
        ></van-field>
        <van-cell title="性别" is-link v-model="formItems.gender" @click.native="genderShow = true"></van-cell>
        <van-field
          v-model="formItems.phone"
          label="电话"
          required
          placeholder="请输入电话"
        ></van-field>
        <van-cell title="生日" is-link v-model="formItems.birthday" @click.native="birthdayShow = true"></van-cell>
        <van-field
          v-model="formItems.hobby"
          type="hobby"
          label="爱好"
          required
          placeholder="请输入爱好"
        ></van-field>
        <van-field
          v-model="formItems.info"
          type="info"
          label="备注"
          placeholder="请输入备注"
        ></van-field>
      </van-cell-group>
    </div>
    <div class="date-pick" v-if="birthdayShow">
      <van-datetime-picker
        :value="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="birthdayShow = false"
        @confirm="confirmDate"
      ></van-datetime-picker>
    </div>
    <van-actionsheet v-model="genderShow" :actions="genders" cancel-text="取消"></van-actionsheet>
  </div>
</template>
<script>
  import { Toast } from 'vant'
  import { Dialog } from 'vant'
  import { addStudent, getStudentDetail } from '../../api/student'
  import { mapActions } from 'vuex'

  export default {
    created() {
      if (this.sid) {
        getStudentDetail(this.sid).then(res => {
          this.dealDetail(res.data)
        })
      }
    },
    computed: {
      sid() {
        return this.$route.query.sid
      },
      title() {
        return this.sid ? '编辑学生' : '新增学生'
      }
    },
    data() {
      return {
        formItems: {
          sname: '',
          gender: '女',
          phone: '',
          birthday: '',
          hobby: '',
          info: ''
        },
        genderShow: false,
        birthdayShow: false,
        currentDate: '',
        minDate: this.getMinDate(),
        genders: [
          {
            name: '男',
            callback: this.setGender
          },
          {
            name: '女',
            callback: this.setGender
          }
        ]
      }
    },
    methods: {
      ...mapActions(['refreshStudentList']),
      setGender(val) {
        this.formItems.gender = val.name
        this.genderShow = false
      },
      getMinDate() {
        const date = new Date()
        date.setFullYear(1990)
        return date
      },
      formatDate(date) {
        if (!date) return ''
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      },
      confirmDate(val) {
        this.currentDate = val
        this.formItems.birthday = this.formatDate(val)
        this.birthdayShow = false
      },
      fetchData() {
        if (!this.formItems.sname) {
          Toast({ message: '学生姓名不能为空', position: 'bottom' })
          return
        }
        if (!this.formItems.phone) {
          Toast({ message: '学生电话不能为空', position: 'bottom' })
          return
        }
        if (!this.formItems.hobby) {
          Toast({ message: '学生爱好不能为空', position: 'bottom' })
          return
        }
        const data = Object.assign(this.formItems)
        let method = 'add'
        if (this.sid) {
          data.sid = this.sid
          method = 'update'
        }
        if (data.gender === '男') {
          data.gender = '1'
        } else {
          data.gender = '0'
        }
        Toast.loading('提交中...')
        addStudent(data, method).then(res => {
          Toast.clear()
          Dialog.alert({
            title: '提示',
            message: res.msg
          }).then(() => {
            this.refreshStudentList(true)
            this.back()
          })
        })
      },
      back() {
        this.$router.go(-1)
      },
      dealDetail(data) {
        for (const key of Object.keys(this.formItems)) {
          if (data[key]) {
            if (key === 'gender') {
              this.formItems.gender = data.gender === '0' ? '女' : '男'
            } else if (key === 'birthday') {
              this.currentDate = new Date(data.birthday)
              this.formItems.birthday = this.formatDate(this.currentDate)
            } else {
              this.formItems[key] = data[key]
            }
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .add-student {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: $bg-gray;
    z-index: 100;
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
      .van-cell-group {
        margin-top: 20px;

      }
    }
    .date-pick {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .7);
      .van-picker {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
</style>
