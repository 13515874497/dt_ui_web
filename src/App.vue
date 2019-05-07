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


//右侧隐藏字段样式只能写在全局
.field-popper .el-tree{
  height: 500px;
  overflow-y: scroll;
}
</style>
