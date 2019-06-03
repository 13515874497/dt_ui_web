<template>
  <div>
    <template v-if="tableOperateList.length>1">
      <el-popover placement="top-start" trigger="hover">
        <el-button
          v-for="(item,index) in tableOperateList"
          :key="index"
          :type="item.type"
          :icon="item.icon"
          @click="item.fn(row,multipleSelection)"
          size="mini"
        >{{item.label}}</el-button>
        <el-button slot="reference">更多</el-button>
      </el-popover>
    </template>
    <template v-else>
      <el-button
        v-for="item in tableOperateList"
        :key="item.label"
        :type="item.type"
        :icon="item.icon"
        @click="item.fn(row,multipleSelection)"
        size="mini"
      >{{item.label}}</el-button>
    </template>
  </div>
</template>

<script>
import OperateBtn from "@/components/ElementUi/OperateBtn";
export default {
  props: {
    tableOperateList: {
      type: Array,
      default: () => []
    },
    row: {
      //当前行的数据
      required: true,
      type: Object
    },
    multipleSelection: {
      type: Array
    }
  }
};
</script>

<style>
</style>
