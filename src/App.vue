<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
/*滚动条滑块*/
.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: #7a7a7a;
}
/*滚动条轨道*/
.scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background: #ccc;
}

//表格隔行变色颜色
body .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #e6f6fd;
}
//表格鼠标hover颜色
body .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f9ffda;
}

//表格上方条件筛选行
#printCheck {
  width: 100%;
  // height: 30px;
  position: relative;
  margin-bottom: 25px;
}
.el-notification {
      word-break: break-all;
    word-wrap: break-word;
}
</style>
