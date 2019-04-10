<template>
  <el-date-picker
    v-model="businessTime"
    align="right"
    :clearable="false"
    type="date"
    placeholder="选择日期"
    :picker-options="pickerOptions"
    format="yyyy 年 MM 月 dd 日"
    value-format="timestamp"
    @change="changeDate"
  ></el-date-picker>
</template>

<script>
export default {
  data() {
    return {
      businessTime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    //付款类型
    changeDate(value) {
      this.$emit('changeDate',value);   
    }
  }
};
</script>

<style scope lang="scss">
</style>
