<template>
  <el-table
    :data="tableData"
    height="500"
    :span-method="spanMethod"
    @selection-change="handleSelectionChange"
    stripe
    border
    @header-dragend="handleHeaderDragend"
    @header-contextmenu="headerClick"
    :header-row-class-name="setTheadClassName"
    class="content-table"
    :show-summary="showSummary"
    :summary-method="getSummaries"
    :highlight-current-row="editable"
  >
    <!--inputType   0: str,1: int, 2:date 3: status(option值选项) 4.deadline(起止时间段) -->
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column v-if="isShowNumber()" type="index" width="50" fixed></el-table-column>
    <template>
      <div v-for="(title, index) in table_title" :key="index">
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
          :key="Math.random()"
          :column-key="index.toString()"
        >
          <template slot-scope="scope">
            <span class="editting" v-if="editable">
              <el-select
                v-model="scope.row[title.bindKey ||  title.topType]"
                :placeholder="title.placeholder || '请选择'"
                :filterable="title.filterable"
                :remote="title.remote"
                :remoteMethod="title.remoteMethod($event,title)"
                :clearable="title.remote"
                size="small"
              >
                <el-option
                  v-for="option in title.data"
                  :key="option[title.key]"
                  :label="option[title.label]"
                  :value="option[title.key]"
                ></el-option>
              </el-select>
            </span>
            <span class="editted">{{scope.row[title.topType]}}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="title.topType==='userExpirationDate'"
          :label="title.headName"
          :fixed="isFixed(title)"
          :show-overflow-tooltip="true"
          :render-header="renderHeader"
          :key="Math.random()"
          :column-key="index.toString()"
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
          :key="Math.random()"
          :column-key="index.toString()"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.pwdValidityPeriod!==0"
            >{{ scope.row.pwdValidityPeriod | date-format}}</span>
            <span v-if="scope.row.pwdValidityPeriod===0">始终有效</span>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="title.inputType==2 || title.inputType==4"
          :fixed="isFixed(title)"
          :label="title.headName"
          :prop="title.topType"
          :show-overflow-tooltip="true"
          :render-header="renderHeader"
          :key="Math.random()"
          sortable
          :column-key="index.toString()"
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
          :key="Math.random()"
          :column-key="index.toString()"
        >
          <template slot-scope="scope">
            <span class="editting" v-if="editable">
              <el-input size="small" v-model="scope.row[title.topType]"></el-input>
            </span>
            <span class="editted">{{scope.row[title.topType]}}</span>
          </template>
        </el-table-column>
      </div>
    </template>
    <el-table-column label="操作" v-if="showOperate">
      <template slot-scope="scope">
        <slot name="operate" :childData="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Sortable from "sortablejs";
import { deepClone } from "@/utils/Arrays";
export default {
  data() {
    return {
      menuId: this.$route.params.id,
      fixedCache: {},
      options: {}, //存放各种类型的状态
      table_title: [],
      table_data: [],
			table_title_two:[]
    };
  },
  props: {
    tableData: Array,
    tableTitle: Array,
		tableTitleTwo:Array,
    mode: Number, //在table中表示  需要合并父表的数据  (1普通的表格  2多表合并的表格（需要合并父数据）)
    showOperate: {
      //是否在最右侧显示操作字段
      type: Boolean,
      default: false
    },
    editable: {
      //是否可编辑
      type: Boolean,
      default: false
    },
    customField_table: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    showSummary() {
      return this.table_title.some(item => {
        return item.whetherCal;
      });
    }
  },
  watch: {
    tableTitle: {
      handler(val) {
        this.table_title = val;
      },
      immediate: true
    },
    tableData: {
      // this.setRepeatField();
      handler(val) {
        this.table_data = deepClone(val);
      },
      immediate: true
    },
		tableTitleTwo:{
			handler(val) {
			  this.table_title_two = deepClone(val);
			},
			immediate: true
		}
    // tableData() {
    //   this.setRepeatField();
    // }
  },
  methods: {
    columnDrop() {
      var wrapperTr = this.$el.querySelector(".el-table__header-wrapper tr");
      var oldIndex, newIndex, oldItem, newItem,trIndex;
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onUpdate: evt => {
					// 2019/05/23 下午 14:00 判断拖拽的dom数组内与数据数组一致的元素从第几位开始  start
					for(var i=0;i<wrapperTr.children.length;i++){
						if(!(wrapperTr.children[i].innerText == "")){
							trIndex = i ;
							break;
							}	
					}
					// 2019/05/23 下午 14:00 判断拖拽的dom数组内与数据数组一致的元素从第几位开始  end
          var $li = wrapperTr.children[evt.newIndex],
            $oldLi = wrapperTr.children[evt.oldIndex];

          wrapperTr.removeChild($li);
          if (evt.newIndex > evt.oldIndex) {
            wrapperTr.insertBefore($li, $oldLi);
          } else {
            wrapperTr.insertBefore($li, $oldLi.nextSibling);
          }
          oldIndex = evt.oldIndex - trIndex;
          newIndex = evt.newIndex - trIndex;
          var item = this.table_title.splice(oldIndex, 1);
          this.table_title.splice(newIndex, 0, item[0]);
					// 2019/05/23 下午 15:00 增加新变量接受父组件传来全数据值 用于上传   start
					var itemTwo = this.table_title_two.splice(oldIndex, 1);
					this.table_title_two.splice(newIndex, 0, itemTwo[0]);
          this.$emit("changeTitle", this.table_title_two);
					// 2019/05/23 下午 15:00 增加新变量接受父组件传来全数据值 用于上传   end
        },
        onEnd: evt => {}
      });
    },
    setTheadClassName() {
      return "noRightKey";
    },
    //是否隐藏编号
    isShowNumber() {
      let flag = true;
      this.table_title.forEach(item => {
        if (item.headName == "编号") {
          flag = false;
        }
      });
      return flag;
    },
    //表格某一列数据全部相同则合并
    spanMethod({ row, column, rowIndex, columnIndex }) {
      //如果是多个表的数据合并起来的数据   那么就合并父表的数据
      if (this.mode === 2) {
        let title = this.table_title.find(item => {
          return item.topType === column.property;
        });
        if (title && title.subField === null) {
          if (row._mergeNum) {
            return {
              rowspan: row._mergeNum,
              colspan: 1
            };
          } else {
            return [0, 0];
          }
        }
      }
    },
    //点击选项 checkbox 按钮 获得val赋值给 传给页面
    handleSelectionChange(val) {
      this.$emit("checkboxValue", val);
    },

    initOptions() {
      let self = this;

      this.table_title.forEach(item => {
        if (item.inputType == 3 && item.statusOptions.length) {
          self.options[item.topType] = item.statusOptions;
        }
      });
    },
    statusOptions: function(row, column, cellValue) {
      let topType = column.property;
      let options = this.options[topType];
      if (!options) {
        return null;
      }
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
      //挂在到页面上从而获取宽度
      let TextWidth = this.getTempDomWidth(column.label);
      let minWidth = TextWidth + 20;
      //如果有排序的图标则加24  排序的箭头宽度 26
      if (column.sortable) {
        minWidth += 26;
      }
      column.minWidth = minWidth;
      column.width = column.width < minWidth ? minWidth : column.width;
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
      thead.addEventListener("contextmenu", e => {
        window.event.returnValue = false;
        return false;
      });
    },
    //创建外层的临时dom  用来存放临时的span
    createTempWarpdom() {
      this.tempDiv = document.createElement("div");
      this.tempDiv.style.cssText =
        "position:fixed;height:0;overfolw:hidden;font-weight:700;overflow:hidden";
      document.body.appendChild(this.tempDiv);
    },
    //创建临时的span 用来存放thead中字段的文本text 挂载到外层临时dom上 从而获取到字段的宽度
    getTempDomWidth(text) {
      let tempSpan = document.createElement("span");
      tempSpan.innerHTML = text;
      tempSpan.style.cssText = "display:inline-block";
      this.tempDiv.appendChild(tempSpan);
      return tempSpan.offsetWidth;
    },
    //表格下方合计
    getSummaries(param) {
      const self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (!column.property) {
          sums[index] = "";
          return;
        }
        let title = self.table_title.find(item => {
          return item.topType === column.property;
        });
        if (title && title.whetherCal) {
          let values = [];
          //如果是合并的表格  合并的数据只计算一次
          if (self.mode === 2 && !title.subField) {
            let _mergeNum = 1;
            values = data.map(item => {
              if (item._mergeNum) {
                _mergeNum = item._mergeNum;
              }
              if (--_mergeNum < 1) {
                return Number(item[title.topType] || 0);
              } else {
                return 0;
              }
            });
          } else {
            values = data.map(item => {
              return Number(item[title.topType] || 0);
            });
          }

          if (!values.length) {
            sums[index] = "";
            return;
          }
          sums[index] = values
            .reduce((prev, curr) => {
              return prev + curr;
            })
            .toFixed(3);
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    //初始化自定义的字段 //里所有的select数据都放到title上  也就是表格里的每条数据select都是相同的
    initCustomField() {
      let self = this;
      return new Promise(async (resolve, reject) => {
        if (!self.customField_table) {
          resolve(null);
          return;
        }

        for (let i = 0; i < self.customField_table.length; i++) {
          let item = self.customField_table[i];

          let title = self.titles_.find(title => {
            return title.topType === item.topType;
          });
          for (let key in item) {
            title[key] = item[key];
          }
          if (item.data) continue; //如果写了data 那么就说明从外部提供数据，没写则需要自己去请求获取,然后绑定到该组件的titles_上
          switch (item.inputType) {
            case 3:
              title.data = [];
              let res3 = await item.ajax();
              if (res3.code === 200) {
                // if(res3.data.dataList){
                title.data = res3.data.dataList || res3.data;
                // }else {
                //   title.data = res3.data;
                // }
              }
              break;
            case 5:
              title.data = [];
              let res = await item.ajax();
              if (res.code === 200) {
                title.data = res.data;
              }
              self.data_model[item.data_model] = [];
              break;
          }
        }

        //等待前方全部请求完毕
        resolve(null);
      });
    },
  },
  async created() {
    let self = this;
    // this.table_title = [...this.tableTitle];
	
    this.readFixedCache();
    this.initOptions();
    this.createTempWarpdom();
    await this.initCustomField();
  },

  mounted() {
    this.removeRightKeyMenu();
    this.columnDrop();
  },
  activated() {
    this.createTempWarpdom();
  },
  deactivated() {
    document.body.removeChild(this.tempDiv);
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
.content-table {
  width: calc(100% - 15px);
  /deep/ .el-table .cell {
    white-space: nowrap;
  }
}

.editting {
  display: none;
}
.editted {
  padding: 0 16px;
  display: block;
  font-size: 13px;
  line-height: 32px;
}
.current-row {
  .editting {
    display: block;
  }
  .editted {
    display: none;
  }
}
.el-input-number {
  width: 100%;
}
.el-input-number.is-controls-right .el-input__inner {
  text-align-last: left;
  padding: 0 16px;
}
</style>
