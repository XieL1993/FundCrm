<template>
  <div class="list-dialog" v-if="value" @click="hide">
    <div class="dialog_box">
      <div class="title">{{title}}</div>
      <div class="list-item" v-for="(item,index) in data" :key="index" @click="onClick(item)">{{item.label}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClick(item) {
        item.click()
        this.$emit('input', false)
      },
      hide() {
        this.$emit('input', false)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .list-dialog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    align-items: center;
    justify-content: center;
    .dialog_box {
      width: 90%;
      background: #ffffff;
      padding: 10px 0;
      .title {
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        font-size: 13px;
        color: $color-info;
        user-select: none;
        @include text-single();
      }
      .list-item {
        height: 40px;
        padding: 0 15px;
        line-height: 40px;
        user-select: none;
        font-size: 15px;
        color: $color-main;
        @include text-single();
        &:active {
          background: $color-active;
        }
      }
    }
  }
</style>
