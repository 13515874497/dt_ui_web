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
    </span>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      edit: Function,
      del: Function,
      save: Function,
      recording: Function
    }
  }
</script>

<style scoped>

</style>
