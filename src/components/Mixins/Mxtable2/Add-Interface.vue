<template>
  <el-dialog :title="`新增 ${page.name}`" :visible.sync="dialogVisible" width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      page: {
        id: this.$route.params.id,
        name: this.$route.params.name
      }
      // dialogVisible: false
    };
  },
  created(){
      console.log(this.page);
      
  }
};
</script>

<style>
</style>
