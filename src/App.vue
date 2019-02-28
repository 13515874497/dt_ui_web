<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


  export default {


  }

</script>

<style lang="scss">
//表格隔行变色颜色
body .el-table--striped .el-table__body tr.el-table__row--striped td{
  background-color: #e6f6fd;
}
//表格鼠标hover颜色
body .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f9ffda;
}


//表格上方条件筛选行
#printCheck {
  width: 100%;
  height: 30px;
  position: relative;
  margin-bottom: 25px;
}
#printCheck > div {
  float: left;
  margin-left: 25px;
}
#printCheck > .el-row {
  float: none;
}
</style>
