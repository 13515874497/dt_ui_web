<template>
  <div class="check2">
    <el-form :model="data_model" ref="data_model" :inline="true" class="demo-form-inline" size="small">
      <template v-for="(tableTitle,index) in data">
        <!-- 0: str,1: int, 2:date 3: status 4.deadline(起止时间段) 5.boolean-->
        <!-- 带有搜索建议的输入框    字符型-->
        <el-form-item
          :label="tableTitle.headName"
          v-if="tableTitle.inputType === 0"
          v-show="isShow(tableTitle.id)"
          :prop="tableTitle.topType"
          :rules="rules.str"
        >
          <el-autocomplete
            class="inline-input"
            v-model="data_model[tableTitle.topType]"
            :fetch-suggestions="getQuerySuggestions"
            :placeholder="'请输入 ' + tableTitle.headName"
            @focus="curr_query_field=tableTitle.topType"
          ></el-autocomplete>
        </el-form-item>

        <!-- 带有搜索建议的输入框    数值型-->
        <el-form-item
          :label="tableTitle.headName"
          v-else-if="tableTitle.inputType === 1"
          v-show="isShow(tableTitle.id)"
          :prop="tableTitle.topType"
          :rules="rules.number"
        >
          <el-autocomplete
            class="inline-input"
            v-model="data_model[tableTitle.topType]"
            :fetch-suggestions="getQuerySuggestions"
            :placeholder="'请输入 ' + tableTitle.headName"
            @focus="curr_query_field=tableTitle.topType"
          ></el-autocomplete>
        </el-form-item>

        <!-- 日期 -->
        <el-form-item
          :label="tableTitle.headName"
          v-else-if="tableTitle.inputType === 2"
          v-show="isShow(tableTitle.id)"
          :prop="tableTitle.topType"
          :rules="rules.date"
        >
          <el-date-picker           
            value-format="timestamp"
            v-model="data_model[tableTitle.topType]"
            type="datetime"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <!-- 带时间段的日期 -->
        <el-form-item
          :label="tableTitle.headName"
          v-else-if="tableTitle.inputType === 4"
          v-show="isShow(tableTitle.id)"
          :prop="tableTitle.topType"
        >
          <el-checkbox
            v-if="tableTitle.topType == 'pwdValidityPeriod'"
            v-model="data_model['pwdAlways']"
            @change="isValid($event,data[index])"
          >始终有效</el-checkbox>

          <el-checkbox
            v-if="tableTitle.topType == 'userExpirationDate'"
            v-model="data_model['uAlways']"
            @change="isValid($event,data[index])"
          >始终有效</el-checkbox>
          <el-date-picker
            v-show="tableTitle._isShow"
            v-model="data_model[tableTitle.topType+'s']"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- 状态选择 -->
        <el-form-item
          :label="tableTitle.headName"
          v-else-if="tableTitle.inputType === 3"
          v-show="isShow(tableTitle.id)"
          :prop="tableTitle.topType"
          :rules="rules.status"
        >
          <el-select v-model="data_model[tableTitle.topType]" value placeholder="请输入账号状态">
            <el-option
              v-for="(item,index) in tableTitle.statusOptions"
              :key="index"
              :label="item.name"
              :value="item.selectId"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import { isNumber } from "@/utils/verify.js";
import { unique } from "@/utils/Arrays";

export default {
  props: {
    tableTitle: Array, //所有可筛选的内容 根据input_type生成不同类型
    selectedIds: Array, //用户要筛选的条件
    querySuggestionsMethod: Function, //查询搜索建议的方法
    querySuggestionsConfig: Object, //模糊查询的配置对象
		// 2019/05/22  下午16:00  添加内容 父组件传值接受 后台返回的上一次搜索框内容 用于填充  start
		inputData :{
		  type: Object,
		  default:function(){
					return {}
			}
		},
		// 2019/05/22  下午16:00  添加内容 父组件传值接受 后台返回的上一次搜索框内容 用于填充  end
	},
  data() {
    return {
      data: [],
      data_model: {
        systemLogStatus: {}
      },
      curr_query_field: "", //当前查询搜索建议的字段
      rules: {
        str: [{ required: false, message: "请输入字符", trigger: "change" }],
        number: [{ required: false, validator: isNumber, trigger: "change" }],
        date: [{ required: false, message: "请输入日期", trigger: "change" }],
        status: [{ required: false, message: "请选择状态", trigger: "change" }]
      },
      //用于判断请求参数是否属于systemLogStatus对象（属于systemLogStatus的字段需要放在systemLogStatus ）
      sysLogInclude: [
        "statusId",
        "remark",
        "status",
        "createDate",
        "createUser",
        "modifyDate",
        "modifyUser",
        "auditDate",
        "auditUser",
        "effectiveDate"
      ],
      sysLogNotInclude: [63]
    };
  },
  watch: {
    tableTitle() {
      this.updateTableTitle();
    },
    //改变数据后向上传递
    data_model: {
      handler() {
        this.changeQuery();
      },
      deep: true
    },
    //根据勾选顺序对展示的查询列表进行排序
    selectedIds(val, old) {
      const self = this;
      let data = this.data;
      let arr = [];
      val.forEach(id => {
        let index = data.findIndex(item => {
          return item.id == id;
        });
        if (index !== -1) {
          let remove = data.splice(index, 1);
          arr = [...arr, ...remove];
        }
      });
      this.data = [...arr, ...data];

      //多选select移除tag时,初始化值

      this.data.forEach(item => {
        if (!val.includes(item.id)) {
          this.initValue(item);
        }
      });
    },
		// 2019/05/24  下午16:00  添加内容 填充搜索框内容 拆分systemLogStatus对象 用来显示赋值 start
		inputData : {
			handler(val){//添加初始化数据函数 点击方案按钮切换方案时用来显示数据
				this.inputData = val;
				this.initInput();
			}
		}
		// 2019/05/24  下午16:00  添加内容 填充搜索框内容 拆分systemLogStatus对象 用来显示赋值 end
		
  },
  computed: {
    //直接调用表格的查询 这里改下配置就是模糊查询
    _querySuggestionsConfig() {
      let data = { ...this.querySuggestionsConfig };
      console.log(data);
      data.pageSize = 50; //最大显示50条
      data.currentPage = 1;
      return data;
    }
  },
  methods: {
    //根据父组件传递的数据生成对应的查询列表数据
    updateTableTitle() {
      //复制父组件传递的数据  并根据类型赋值初始化值
      const self = this;
      let data = JSON.parse(JSON.stringify(this.tableTitle));
      data.forEach(item => {
        self.initValue(item);
      });
      this.data = data;
    },

    //初始化数据
    initValue(tableTitle) {
      if (tableTitle) {
        let key = tableTitle.topType;
        this.$set(this.data_model, key, "");
        if (tableTitle.inputType == 4) {
          switch (key) {
            //用户有效期
            case "userExpirationDate":
              this.data_model.uAlways = false;
              break;
            //密码有效期
            case "pwdValidityPeriod":
              this.data_model.pwdAlways = false;
              break;
          }
          this.$set(this.data_model, key + "s", []);
          if (
            this.sysLogInclude.includes(key) &&
            !this.sysLogInclude.includes(key + "s")
          ) {
            this.sysLogInclude.push(key + "s");
          }
          tableTitle._isShow = true;
        }
      }
			
			// 2019/05/22  下午16:00  添加内容 如果内容没有更改也需要对象属性存在  start
			this.initInput();//添加初始化数据函数 点击方案按钮切换方案时用来显示数据
			this.changeQuery();
			// 2019/05/22  下午16:00  添加内容 如果内容没有更改也需要对象属性存在  end
    },
    //查询 搜索建议下拉列表
    async getQuerySuggestions(queryString, cb) {
      let query = JSON.parse(JSON.stringify(this._querySuggestionsConfig));

      let field = this.curr_query_field;
      query[field] = queryString;

      let res = await this.querySuggestionsMethod(query);
      let data = res.data.dataList.map(item => {
        return (
          item[field] || (item.systemLogStatus && item.systemLogStatus[field])
        );
      });
      data = unique(data);

      data = data.map(item => {
        return { value: item };
      });

      cb(data);
    },
    //验证的checkbox是否显示
    isShow(id) {
      return this.selectedIds.includes(id);
    },
    //checkbox 验证是否 始终有效
    isValid(val, data) {
      data._isShow = !val;
      if (val) {
        this.data_model[data.topType + "s"] = [];
      }
      this.changeQuery();
    },
    //向上回传数据
    changeQuery() {
      let data_model = { ...this.data_model };
      for (let key in data_model) {
        if (this.sysLogInclude.includes(key)) {
          data_model.systemLogStatus[key] = data_model[key];
          delete data_model[key];
        }
      }
      this.$emit("changeQuery", [data_model]);
    },
    setSysLogInclude(id) {
      if (this.sysLogNotInclude.includes(id)) {
        this.sysLogInclude.length = 0;
      }
    },
		// 2019/05/23  下午17:00  添加内容 填充搜索框内容 拆分systemLogStatus对象 用来显示赋值 start
		initInput(){
			if(this.inputData.systemLogStatus){
				this.data_model = {...this.inputData};
				console.log(this.data_model)
				for (let key in this.data_model.systemLogStatus) {
					this.data_model[key] = this.data_model.systemLogStatus[key] ;
				  
				}
			}
		}
		// 2019/05/23  下午17:00  添加内容 填充搜索框内容 拆分systemLogStatus对象 用来显示赋值 end
  },
  created() {
    this.updateTableTitle();
    this.setSysLogInclude(+this.$route.params.id)
  },
  mounted() {
		// this.initInput();
	}
};
</script>

<style lang="scss" >
.check2 .el-date-editor .el-range-separator {
  min-width: 32px;
}
</style>
