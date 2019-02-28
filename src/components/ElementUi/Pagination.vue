<template>
  <div class="block" style="display: inline-block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="data.currentPage"
      :page-sizes="data.page_sizes"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total_size">
    </el-pagination>
  </div>
</template>

<script>
  /**
   * 封装分也 组建
   */
  export default {
    data () {
      return {}
    },
    props: {
      data: Object
    },
    methods: {
      //分页
      handleSizeChange (val) {
        this.data.pageSize = val
        this.$emit('pageData', this.data)
      },
      //val=当前页 分页
      async handleCurrentChange (val) {
        this.$emit('pageData', this.data)
      },
    }
  }
</script>

<style>

</style>
