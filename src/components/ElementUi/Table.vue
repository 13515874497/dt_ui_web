<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="500"
    :span-method="arraySpanMethod"
    @selection-change="handleSelectionChange"
    stripe
    border
    @header-dragend="handleHeaderDragend"
  >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column
      :aa = 
      v-if="isHideNumber"
      type="index"
      width="50"
      fixed>
    </el-table-column>
    <template v-for="title  in tableTitle">
      <!--特殊字段 -->
      <el-table-column v-if="title.topType==='create_date'" :label="title.headName" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.createDate | date-format}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="150"
        v-else-if="title.topType==='u_eff_date'"
        sortable
        :label="title.headName"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.effectiveDate!==0">{{ scope.row.effectiveDate | date-format}}</span>
          <span v-if="scope.row.effectiveDate===0">始终有效</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        v-else-if="title.topType==='p_eff_date'"
        sortable
        :label="title.headName"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.pwdStatus!==0">{{ scope.row.pwdStatus | date-format}}</span>
          <span v-if="scope.row.pwdStatus===0">始终有效</span>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="title.topType==='landing_time'"
        :label="title.headName"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.landingTime | date-format}}</span>
        </template>
      </el-table-column>

      <el-table-column v-else-if="title.topType==='e_date'" :label="title.headName" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.effectiveDate | date-format}}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="title.topType==='modify_date'"
        :label="title.headName"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.modifyDate | date-format}}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="title.topType==='create_date'"
        :label="title.headName"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.createDate | date-format}}</span>
        </template>
      </el-table-column>

      <el-table-column v-else-if="title.topType==='audit_date'" :label="title.headName" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.createDate | date-format}}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="title.topType==='account_status'"
        :label="title.headName"
        width="180"
        :formatter="account"
      ></el-table-column>
      <el-table-column
        v-else
        sortable
        :fixed="!!title.isFixed"
        :label="title.headName"
        :prop="title.topType"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    tableData: Array,
    tableTitle: Array
  },
  methods: {
    //是否隐藏编号
    isHideNumber(){
      let flag = false;
      this.tableTitle.forEach((item) => {
        if(item.headName == "编号"){
          flag = true;
        }
      });
      return flag ;
    },
    //tabale表头上下箭头 排序
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2]
      //   } else if (columnIndex === 1) {
      //     return [0, 0]
      //   }
      // }
    },
    //点击选项 checkbox 按钮 获得val赋值给 传给页面
    handleSelectionChange(val) {
      this.$emit("checkboxValue", val);
    },
    //当拖动表头改变了列的宽度的时候会触发该事件
    handleHeaderDragend(newWidth, oldWidth, column, event) {
      //内边距左右各10  每个字符宽度按 15的宽度计算
      column.minWidth = column.label.length * 15 + 20;
      //如果有排序的图标则加24  排序的箭头宽度 26
      if (column.sortable) {
        column.minWidth += 24;
      }
      column.width =
        column.width < column.minWidth ? column.minWidth : column.width;
    },
    //table 账号状态 转换显示
    account: function(row) {
      return row.accountStatus === 0
        ? "正常"
        : row.accountStatus === 1
        ? "冻结"
        : row.accountStatus === 2
        ? "禁用"
        : "";
    }
  }
};
</script>

<style scoped lang="scss">
.el-tooltip__popper {
  max-width: 500px;
  line-height: 180%;
}
</style>
