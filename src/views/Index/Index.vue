<template>
  <el-container>
    <div style="height: 100%">
      <Aside  style="overflow-y: auto;height: 1000px;background-color: #293846"/>
    </div>

    <el-container style="float: left">
      <el-header style="height: 90px">
        <Header/>
      </el-header>
      <el-main>
        <!--缓存路由组件-->
        <keep-alive>
          <router-view style="height: 805px"></router-view>
        </keep-alive>
      </el-main>
      <el-footer style="height: 65px">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import Header from '../../components/HeaderTop/Header'
  import Aside from '../../components/Aside/Aside'
  import {repIndex} from '../../api'

  export default {
    data () {
      return {
        isRole: true,
      }
    },
    async mounted () {

    },
    components: {
      Header,
      Aside
    }
  }
</script>

<style scope lang="scss">
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header {
    background-color: #e7eaec;
    color: #333;

    line-height: 60px;
  }


</style>
