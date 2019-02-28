<template>
  <div >
    <img class="img_header" src="./img/logo.png"/>
    <div style="float: right;margin-top: 10px;margin-left: 50px;margin-right: 20px">
      <i class="icon_sum iconfont icon_dt-liebiao" @click="a"></i>
    </div>
    <div style="float: right;margin-top: 10px" >
      <i class="icon_sum iconfont icon_dt-tuichu" @click="logout"  style="padding-right: 10px;margin-top: 23px"></i>
      <span class="quit" style="float: right" @click="logout">
                注销
            </span>
    </div>

    <el-badge :value="100" :max="99" class="item" style="float: right">
      <i class="icon_sum iconfont icon_dt-tongzhi" @click="c"></i>
    </el-badge>
    <el-badge :value="100" :max="10" class="item" style="float: right">
      <i class="icon_sum iconfont icon_dt-nitification" @click="d"></i>
    </el-badge>
    <p class="p-one">欢迎来到 XXX 中文管理后台</p>
  </div>
</template>

<script>
  import {repLogout} from '../../api'

  export default {
    methods:{
      async logout () {
        const result = await repLogout()
        if (result.code === 200) {
          this.$router.replace('/login')
        }
      },
      a(){
        console.log("列表")
      },
      c(){
        console.log("消息提示")
      },
      d(){
        console.log("最新提示")
      }
    }
  }
</script>

<style lang="scss">
  .img_header{
    float: left;
    margin-top: 10px;
  }
  .p-one{
    float: right;
    padding-top: 0px!important;
    margin-top: 10px!important;
    margin-right: 50px;
    color: #888888;
  }
  .quit{
    cursor: pointer;
    color: #999c9e;
  }
  .icon_sum{
    color: #999c9e;
    font-size: 25px !important;
    cursor: pointer;
  }
  .el-col-24{
    width: 64px!important;
  }
  .el-badge__content.is-fixed{
    margin-top: 12px;
  }
  .el-icon-message{
    font-size: 25px;
  }
  .item {
    margin-top: 10px;

    margin-right: 60px;
  }
</style>
