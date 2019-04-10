<template>
  <div class="operateBtn">
      <el-button v-for="item in this.operateList" :key="item.label" :type="item.type" :icon="item.icon" @click="item.fn" size="mini">{{item.label}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    operateList: Array,
    // operateList: [
    //     {
    //         type: 'success',
    //         icon: 'el-icon-edit',
    //         label: '修改',
    //         fn(){}
    //     }
    // ]
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.operateBtn{
  margin-top: 10px;
}
</style>
