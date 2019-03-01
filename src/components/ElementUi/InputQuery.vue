<template>
  <div class="check2">
    <!-- 先用假数据代替 -->
    <template v-for="(tableTitle,index) in data">
      <!-- 普通输入 -->
      <div class="wrap" v-if="tableTitle.inputType == 'other'" v-show="isShow(tableTitle.id)">
        <el-input :placeholder="'请输入 ' + tableTitle.headName" v-model="data[index]['_value']"></el-input>
      </div>

      <!-- 带搜索建议的输入 -->
      <div class="wrap" v-if="tableTitle.inputType == 'str'" v-show="isShow(tableTitle.id)">
        <el-autocomplete
          class="inline-input"
          v-model="data[index]['_value']"
          :fetch-suggestions="getQuerySuggestions"
          :placeholder="'请输入 ' + tableTitle.headName"
          @focus="curr_query_field=tableTitle.topType"
        ></el-autocomplete>
      </div>
      <!-- 日期 -->
      <div
        class="wrap date"
        v-else-if="tableTitle.inputType == 'date'"
        v-show="isShow(tableTitle.id)"
      >
        <el-checkbox @change="isValid($event,data[index])">始终有效</el-checkbox>
        <el-date-picker
          v-show="tableTitle._value !== ''"
          v-model="data[index]['_value']"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <!-- 带时间段的日期 -->
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
      <!-- 状态选择 -->
      <div class="wrap" v-if="tableTitle.inputType == 'status'" v-show="isShow(tableTitle.id)">
        <el-select v-model="data[index]['_value']" value placeholder="请输入账号状态">
          <el-option
            v-for="(item,index) in accountStatusOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </template>
  </div>
</template>

<script>
import PubSub from "pubsub-js";

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
      curr_query_field: "" //当前查询搜索建议的字段
    };
  },
  watch: {
    tableTitle() {
      this.updateTableTitle();
    },
    //改变数据后向上传递
    data: {
      handler() {
        this.$emit("");
      },
      deep: true
    },
    //根据勾选顺序对展示的查询列表进行排序
    selectedIds(val, old) {
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
    }
  },
  computed: {
    _querySuggestionsConfig() {
      //配置模糊查询
      let data = { ...this.querySuggestionsConfig };
      data.pageSize = 50;
      data.currentPage = 1;
      return data;
    }
  },
  methods: {
    //根据父组件传递的数据生成对应的查询列表数据
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
    //查询 搜索建议下拉列表
    async getQuerySuggestions(queryString, cb) {
      let query = { ...this._querySuggestionsConfig };
      let field = this.curr_query_field;
      query[field] = queryString;
      let res = await this.querySuggestionsMethod(query);

      let data = res.data.dataList.map(item => {
        return item[field];
      });

      console.log(data);
      
      // let data = res.data.dataList.map(item => {
      //   return { value: item[field] };
      // });
      cb(data);
    },
    //是否显示
    isShow(id) {
      return this.selectedIds.includes(id);
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
