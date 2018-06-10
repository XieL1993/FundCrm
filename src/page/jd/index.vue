<template>
  <div class="jd-index">
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.cname" v-for="(item,index) in categoryList" :key="index">{{item.cname}}</van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { getCategory, getIndex } from '../../api/jd'

  export default {
    data() {
      return {
        active: '',
        categoryList: []
      }
    },
    created() {
      this.fetchCategory()
      this.fetchIndex()
    },
    methods: {
      fetchCategory() {
        getCategory().then(res => {
          this.categoryList = res.data
          console.log(this.categoryList.length)
          if (this.categoryList && this.categoryList.length) {
            this.active = this.categoryList[0].cid
          }
        })
      },
      fetchIndex() {
        getIndex().then(res => {
          console.log(res.data)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .jd-index {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: $bg-gray;
  }
</style>
