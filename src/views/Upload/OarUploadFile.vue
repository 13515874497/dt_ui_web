<template>
  <div>
    <el-tag><span>{{this.$route.params.name}}</span></el-tag>
    <!-- 店铺选择 站点选择 -->
    <ShopSelection :ptFrom="ptFrom"/>
  </div>
</template>
<script>
  import ShopSelection from '../../components/FileUpload/ShopSelection'

  export default {
    data () {
      return {
        ptFrom: {
          mShow: true
        }
      }
    },
    components: {
      ShopSelection
    }
  }
</script>
<style scoped>
</style>
