<template>
  <div> 
    <router-view ></router-view>
  </div>
</template>

<script>
export default {

  data(){
    return{
    }
  },
  methods:{
  
  }
};
</script>

<style lang="scss">


//右侧隐藏字段样式只能写在全局
.field-popper .el-tree{
  height: 500px;
  overflow-y: scroll;
}
</style>
