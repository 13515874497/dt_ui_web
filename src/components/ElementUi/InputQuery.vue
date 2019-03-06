<template>
  <div class="check2">
    <el-form :model="data_model" ref="data_model" :inline="true" class="demo-form-inline">
      <template v-for="(tableTitle,index) in data">
        <!-- 0: str,  1: int, 2:date 3: status 4.deadline-->
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
          v-if="tableTitle.inputType === 1"
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
          v-if="tableTitle.inputType === 2"
          v-show="isShow(tableTitle.id)"
          :prop="tableTitle.topType"
          :rules="rules.date"
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
            value-format="timestamp"
            v-model="data_model[tableTitle.topType]"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <!-- 带时间段的日期 -->
        <!-- <div
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
        </div>-->
        <!-- 状态选择 -->
        <el-form-item
          :label="tableTitle.headName"
          v-if="tableTitle.inputType === 3"
          v-show="isShow(tableTitle.id)"
          :prop="tableTitle.topType"
          :rules="rules.status"
        >
          <el-select v-model="data_model[tableTitle.topType]" value placeholder="请输入账号状态">
            <el-option
              v-for="(item,index) in tableTitle.statusOptions"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import { isNumber } from "../../utils/verify.js";
import PubSub from "pubsub-js";
import { unique } from "../../utils/Arrays";

export default {
  props: {
    tableTitle: Array, //所有可筛选的内容 根据input_type生成不同类型
    selectedIds: Array, //用户要筛选的条件
    querySuggestionsMethod: Function, //查询搜索建议的方法
    querySuggestionsConfig: Object //模糊查询的配置对象
  },
  data() {
    return {
      data: [],
      data_model: {},
      curr_query_field: "", //当前查询搜索建议的字段
      rules: {
        str: [{ required: false, message: "请输入字符", trigger: "change" }],
        number: [{ required: false, validator: isNumber, trigger: "change" }],
        date: [{ required: false, message: "请输入日期", trigger: "change" }],
        status: [{ required: false, message: "请选择状态", trigger: "change" }]
      }
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
    // data: {
    //   handler() {
    //     let obj = {};
    //     this.data.forEach(item => {
    //       obj[item.topType] = item._value ? item._value : "";
    //       if (item.hasOwnProperty("uAlways")) {
    //         obj.uAlways = item.uAlways;
    //       }
    //       if (item.hasOwnProperty("pwdAlways")) {
    //         obj.pwdAlways = item.pwdAlways;
    //       }
    //     });
    //     this.$emit("changeQuery", [obj]);
    //     console.log(obj);
    //   },
    //   deep: true
    // },
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
    }
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
    //需要绑定向上回传的数据
    // data_model() {
    //   let obj = {};
    //   this.data.forEach(item => {
    //     obj[item.topType] = item._value ? item._value : "";
    //     if (item.hasOwnProperty("uAlways")) {
    //       obj.uAlways = item.uAlways;
    //     }
    //     if (item.hasOwnProperty("pwdAlways")) {
    //       obj.pwdAlways = item.pwdAlways;
    //     }
    //   });
    //   return obj;
    // }
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
        // this.data_model[key] = '';
        // tableTitle._value = "";
        this.$set(this.data_model, key, "");
        if (tableTitle.inputType == 2) {
          switch (tableTitle.topType) {
            //用户有效期
            case "userExpirationDate":
              this.data_model.uAlways = false;
              break;
            //密码有效期
            case "pwdValidityPeriod":
              this.data_model.pwdAlways = false;
              break;
          }
          tableTitle._isShow = true;
        }
      }
    },
    //查询 搜索建议下拉列表
    async getQuerySuggestions(queryString, cb) {
      console.log( this.$refs['data_model']);
      console.log(1111);
      
      this.$refs['data_model'].validate(valid => {
        console.log(valid);
        
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      let query = JSON.parse(JSON.stringify(this._querySuggestionsConfig));
      // let query = { ...this._querySuggestionsConfig };

      
      let field = this.curr_query_field;
      query[field] = queryString;
      
      let res = await this.querySuggestionsMethod(query);

      let data = res.data.dataList.map(item => {
        return item[field];
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
        this.data_model[data.topType] = "";
      }
      this.changeQuery();
    },
    //向上回传数据
    changeQuery() {
      this.$emit("changeQuery", [this.data_model]);
      console.log(this.data_model);
    }
  },
  created() {
    this.updateTableTitle();
  }
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
.check2 > .wrap.date {
  width: 220px;
}
.check2 > .wrap.deadline {
  width: 350px;
}
</style>
