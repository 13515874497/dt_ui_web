<template>
    <span>
         <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="save">
          新增
        </el-button>
        <el-button type="success" icon="el-icon-edit" size="mini" @click="edit">修改
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="del">
          删除
        </el-button>
       
        <el-button type="warning" size="mini" @click="recording">
          引用
        </el-button>

        <el-button v-show="showSortBtn" type="success" size="mini" @click="sort">
          字段排序保存
        </el-button>
    </span>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      showSortBtn: Boolean,
      edit: Function,
      del: Function,
      save: Function,
      recording: Function,
      sort: Function
    }
  }
</script>

<style scoped>

</style>
