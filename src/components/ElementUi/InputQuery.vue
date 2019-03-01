<template>
  <div class="check2">
    <!-- 先用假数据代替 -->
    <template v-for="(tableTitle,index) in data">
      <div class="wrap" v-if="tableTitle.inputType == 'str'" v-show="isShow(tableTitle.id)">
        <el-input :placeholder="'请输入 ' + tableTitle.headName" v-model="data[index]['_value']"></el-input>
      </div>
      
      <div
        class="wrap deadline"
        v-else-if="tableTitle.inputType == 'deadline'"
        v-show="isShow(tableTitle.id)"
      >
        <el-checkbox @change="isValid($event,data[index])">始终有效</el-checkbox>
        <el-date-picker
          v-show="tableTitle._value !== ''"
          v-model="data[index]['_value']"
          type="daterange"
          range-separator="至"
          :start-placeholder="tableTitle.headName+' 开始日期'"
          :end-placeholder="tableTitle.headName+' 结束日期'"
        ></el-date-picker>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tableTitle: Array, //所有可筛选的内容 根据input_type生成不同类型
    selectedId: Array //用户要筛选的条件
  },
  data() {
    return {
      data: []
    };
  },
  watch: {
    tableTitle() {
      this.updateTableTitle();
    },
    data:{
        handler(){
            this.$emit('')
            console.log(this.data);
            
        },
        deep: true
    }
  },
  computed: {},
  methods: {
    updateTableTitle() {
      //复制父组件传递的数据  并根据类型赋值初始化值
      let data = JSON.parse(JSON.stringify(this.tableTitle));
      data.forEach((item, index) => {
        switch (item.inputType) {
          case "str":
            item._value = "";
            break;
          case "deadline":
            item._value = true;
            break;
        }
      });
      this.data = data;
    },
    //是否显示
    isShow(id) {
      return this.selectedId.includes(id);
    },
    //checkbox 验证是否 始终有效
    isValid(val, data) {
      if (val) {
        data._value = "";
      } else {
        data._value = false;
      }
    }
  },
  created() {
    this.updateTableTitle();
     console.log(this.tableTitle);
  },
};
</script>

<style lang="scss" >
.check2 > .wrap {
  display: inline-block;
  vertical-align: top;
  width: 200px;
}
.check2 > .wrap ~ .wrap {
  margin-left: 10px;
  vertical-align: top;
}
.check2 > .wrap .el-date-editor .el-range-separator {
  min-width: 32px;
}
.check2 > .wrap.deadline {
    // width: 350px;
    width:455px;
}
</style>
