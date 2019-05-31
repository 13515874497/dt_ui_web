<template>
  <div>
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  porps: {
    tableOperateList: {
      type: Array
    },
    row: { //当前行的数据
      required: true,
      type: Object
    }
  }
};
</script>

<style>
</style>
