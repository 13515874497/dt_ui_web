<template>
  <div class="shopUpload">
    <!-- <el-tag><span>{{this.$route.params.name}}</span></el-tag> -->
    <!-- 店铺选择 站点选择 -->
    <!-- <ShopSelection :ptFrom="ptFrom"/> -->
    <FilesUpload></FilesUpload>
  </div>
</template>
<script>
  // import ShopSelection from '../../components/FileUpload/ShopSelection'
  import FilesUpload from '@/components/FileUpload/FilesUpload'

  export default {
    data () {
      return {
        // ptFrom: {
        //   mShow: true
        // }
      }
    },
    components: {
      // ShopSelection
      FilesUpload
    }
  }
</script>
<style scoped>
  .shopUpload{ font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu }
</style>
