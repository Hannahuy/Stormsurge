<template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/* 禁止鼠标选中文字 */
div {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.el-picker__popper.el-popper {
  inset: 490px auto auto 15px !important;
}
.el-popper__arrow::before {
  display: none;
}
</style>
