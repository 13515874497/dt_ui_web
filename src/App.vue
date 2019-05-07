<template>
  <div> 
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style lang="scss">
ul,ol{
  list-style:none
}
.scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
/*滚动条滑块*/
.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0.2);
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

.el-notification {
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
