<template>
  <div>
    <template v-if="btnList.length>1">
      <el-popover placement="top-start" trigger="hover">
        <el-button
          v-for="(item,index) in btnList"
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
        v-for="item in btnList"
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
      //  {
      //     type: "primary",
      //     icon: "el-icon-circle-plus-outline",
      //     label: "生成收货通知单",
      //     fn(row, mul) { //点击时的回调
      //       self.btn_generateReceivingNotice(row, mul);
      //     },
      //     isShow(row, mul){ //当前行是否显示该按钮
      //       return false;
      //     }
      //   }
    },
    row: {
      //当前行的数据
      required: true,
      type: Object
    },
    multipleSelection: {
      type: Array
    }
  },
  data(){
    return {
      btnList: []

    }
  },
  watch: {
    row: {
      handler(val) {
        this.handlerBtnList(val, this.multipleSelection);
      },
      deep: true,
      immediate: true
    },
    multipleSelection:{
      handler(val) {
        this.handlerBtnList(this.row, val);

      }
    }
  },
  methods: {
    handlerBtnList(row, mul) {
      let btnList = [];
      this.tableOperateList.forEach(item => {
        if (!item.isShow) {
          //默认显示按钮
          btnList.push(item);
        } else {
          let flag = item.isShow(row, mul);
          if (flag) {
            btnList.push(item);
          }
        }
      });
      this.btnList = btnList;
    }
  }
};
</script>

<style>
</style>
