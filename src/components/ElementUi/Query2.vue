<template>
  <div class="check1">
    <el-select v-model="tVal" clearable multiple filterable placeholder="用户信息选择" @change="getValue" value="">
      <el-option
        v-for="(item,index) in tableTitle"
        :key="index"
        :label="item.headName"
        :value="item.id"
        >
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tVal: [], //下拉框的model
      }
    },
    props: {
      tableTitle: Array,
    },
    watch: {
      // tableTitle(){
      //   this.tVal = [];
      // }
    },
    methods: {
      //获得第一个input框里的id 通过id去判断显示哪个输入框
      getValue (sel) {
        this.$emit('getValue', sel)
      }
    }

  }
</script>

<style scoped lang="scss">
 
</style>
