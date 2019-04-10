<template>
  <el-select
    style="width: 120px"
    v-model="pId"
    placeholder="付款类型"
  >
    <el-option v-for="item in payOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
    data(){
        return {
            pId:'',
            payOptions: [{name: '标准订单', value: '1'}, {name: '发票支付', value: '2'}],//付款类型
        }
    },
    watch: {
        pId(val){
            this.$emit('pIdChange',val)
        }
    }
};
</script>

<style>
</style>
