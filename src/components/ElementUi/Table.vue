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
    @header-contextmenu="headerClick"
    :header-row-class-name="setTheadClassName"
  >
    <!--inputType   0: str,1: int, 2:date 3: status(option值选项) 4.deadline(起止时间段)-->
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column v-if="isShowNumber()" type="index" width="50" fixed></el-table-column>
    <template v-for="title  in tableTitle">
      <!--特殊字段 -->
      <!-- 根据选项获取值的字段 -->
      <el-table-column
        v-if="title.inputType==3"
        :label="title.headName"
        :fixed="isFixed(title)"
        :formatter="statusOptions"
        :prop="title.topType"
        :render-header="renderHeader"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column
        v-else-if="title.topType==='userExpirationDate'"
        :label="title.headName"
        :fixed="isFixed(title)"
        :show-overflow-tooltip="true"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.userExpirationDate!==0"
          >{{ scope.row.userExpirationDate | date-format}}</span>
          <span v-if="scope.row.userExpirationDate===0">始终有效</span>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="title.topType==='pwdValidityPeriod'"
        :label="title.headName"
        :fixed="isFixed(title)"
        :show-overflow-tooltip="true"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.pwdValidityPeriod!==0"
          >{{ scope.row.pwdValidityPeriod | date-format}}</span>
          <span v-if="scope.row.pwdValidityPeriod===0">始终有效</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        v-else-if="title.topType==='eDate'"
        :label="title.headName"
        :fixed="isFixed(title)"
        :show-overflow-tooltip="true"
         :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.userExpirationDate | date-format}}</span>
        </template>
      </el-table-column>-->

      <el-table-column
        v-else-if="title.inputType==4"
        :fixed="isFixed(title)"
        :label="title.headName"
        :prop="title.topType"
        :show-overflow-tooltip="true"
        :render-header="renderHeader"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" v-show="scope.row[title.topType]"></i>
          <span>{{ scope.row[title.topType] | date-format}}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-else
        sortable
        :fixed="isFixed(title)"
        :label="title.headName"
        :prop="title.topType"
        :show-overflow-tooltip="true"
        :render-header="renderHeader"
      ></el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      menuId: this.$route.params.id,
      fixedCache: {},
      options: {} //存放各种类型的状态
    };
  },
  props: {
    tableData: Array,
    tableTitle: Array
  },
  methods: {
    setTheadClassName() {
      return "noRightKey";
    },
    //是否隐藏编号
    isShowNumber() {
      let flag = true;
      this.tableTitle.forEach(item => {
        if (item.headName == "编号") {
          flag = false;
        }
      });
      return flag;
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
    initOptions() {
      let self = this;
      this.tableTitle.forEach(item => {
        if (item.inputType == 3 && item.statusOptions.length) {
          self.options[item.topType] = item.statusOptions;
        }
      });
    },
    statusOptions: function(row, column, cellValue) {
      let topType = column.property;
      let options = this.options[topType];

      let option = options.find(item => {
        return cellValue == item.selectId;
      });
      if (!option) {
        return null;
      } else {
        return option.name;
      }
    },
    renderHeader(h, { column, $index }) {
      this.setHeaderMinWidth(column);
      return column.label;
    },
    setHeaderMinWidth(column) {
      let span = document.createElement('span');
      span.innerText = column.label;
      let tempSpan = document.getElementById('tempReturnWidth')
      console.log(tempSpan);
      
      // tempSpan.innerHTML = span;  
      console.log(tempSpan.offsetWidth);
      





      //内边距左右各10  每个字符宽度按 15的宽度计算
      let minWidth = column.label.length * 15 + 20;
      //如果有排序的图标则加24  排序的箭头宽度 26
      if (column.sortable) {
        minWidth += 24;
      }
      column.minWidth = minWidth;
      column.width = column.width < minWidth ? minWidth : column.width;
      // column.width < minWidth ? minWidth : column.width;
    },
    //当拖动表头改变了列的宽度的时候会触发该事件
    handleHeaderDragend(newWidth, oldWidth, column, event) {
      this.setHeaderMinWidth(column);
    },
    //根据本地缓存cacheFixed判断是否固定表头
    isFixed(title) {
      return (
        !!title.isFixed || this.fixedCache[this.menuId].includes(title.headName)
      );
    },
    //右键点击表头固定字段并缓存到本地
    headerClick(column, event) {
      let target = event.target || event.srcElement;
      event.preventDefault();
      let cache = this.fixedCache[this.menuId] || [];
      let key = column.label;
      if (cache.indexOf(key) > -1) {
        let index = cache.indexOf(key);
        cache.splice(index, 1);
      } else {
        cache.push(key);
      }
      this.fixedCache[this.menuId] = cache;
      localStorage.setItem("fixedCache", JSON.stringify(this.fixedCache));
    },
    //读取用户自定义固定的表头
    readFixedCache() {
      let fixedCache = localStorage.getItem("fixedCache");
      if (fixedCache) {
        fixedCache = JSON.parse(fixedCache);
      } else {
        fixedCache = {};
      }
      fixedCache[this.menuId] = fixedCache[this.menuId]
        ? fixedCache[this.menuId]
        : [];
      this.fixedCache = fixedCache;
    },
    //删除浏览器默认的右键弹出菜单
    removeRightKeyMenu() {
      let thead = document.querySelector(".noRightKey");
      console.log(thead);
      thead.addEventListener("contextmenu", e => {
        window.event.returnValue = false;
        return false;
      });
    },
    createTempDom(){
      if(!document.getElementById('tempReturnWidth')){
        let tempSpan = document.createElement('span');
        tempSpan.setAttribute('id','tempReturnWidth');
        tempSpan.innerHTML = 1;
        document.body.appendChild(tempSpan);
        console.log(tempSpan);
      }
      
    }
  },
  created() {
    this.readFixedCache();
    this.initOptions();
    this.createTempDom();
  },

  mounted() {
    this.removeRightKeyMenu();
  }
};
</script>

<style lang="scss" scoped>
.el-tooltip__popper {
  max-width: 500px;
  line-height: 180%;
}

.el-table thead {
  color: #336b22;
  font-weight: 500;
}
.el-table td,
.el-table th {
  padding: 6px 0;
}
#returnWidth {
  padding: 0 !important;
  display: inline-block;
  position: fixed;
  left: 100px;
  top: 100px;
}
</style>
