<template>
  <div id="data">
    <!--多选输入框选择输入-->
    <div id="printCheck" class="clearfix" v-if="showQuery && tableTitle.length">
      <el-row :gutter="20">
        <el-col :span="4">
          <Query2 :tableTitle="tableTitle" @getValue="getValue"></Query2>
        </el-col>
        <el-col :span="16">
          <inputQuery
            @changeQuery="setQuery"
            :tableTitle="tableTitle"
            :selectedIds="queryIds"
            :querySuggestionsConfig="data"
            :querySuggestionsMethod="queryPage"
          ></inputQuery>
        </el-col>
        <el-col :span="4">
          <SearchReset @search="search" @reset="reset"></SearchReset>
        </el-col>
      </el-row>
    </div>
    <!--table表格显示-->
    <div id="dataTable">
      <Table
        :tableData="data.tableData"
        :tableTitle="tableTitle"
        v-on:checkboxValue="checkboxValue"
        v-if="tableTitle.length"
      />
      <div v-if="tableTitle.length" class="control">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="data" v-on:pageData="pagination"/>
      </div>
    </div>
    <!--隐藏新增用户记录from表单-->
  </div>
</template>
<script>
import Query2 from "../../components/ElementUi/Query2";
import InputQuery from "../../components/ElementUi/InputQuery";
import SearchReset from "../../components/ElementUi/SearchReset";

// import { findByListProduct } from "../../api";

import Message from "../../utils/Message";
import pUtils from "../../utils/PageUtils";
import Pagination from "../../components/ElementUi/Pagination";
import Table from "../../components/ElementUi/Table";
import AddDelUpButton from "../../components/ElementUi/AddDelUpButton";
import requestAjax from "../../api/requestAjax";

export default {
  data() {
    return {
      queryIds: [],

      tableTitle: [ ], //表头信息

      multipleSelection: [], //更新按钮数组收集

      data: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25]
      },
      showQuery: true
    };
  },
  components: {
    Pagination,
    Table,
    AddDelUpButton,
    Query2,
    InputQuery,
    SearchReset
  },
  async mounted() {
    this.tableTitle =
      (await requestAjax.requestGetHead(this.$route.params.id)) || [];
    this.pagination(this.data);
  },
  methods: {
    setQuery($event) {
      let query = $event[0];
      for (let key in query) {
        let value = query[key];
        this.data[key] = value;
      }
    },
    //获得input框里的id列表
    getValue(val) {
      this.queryIds = val;
    },
    //table按钮选择 传参
    checkboxValue: function(value) {
      this.multipleSelection = value;
    },
    up() {},
    save() {},
    //删除历史记录查看
    async recording() {},
    //删除or 批量删除
    async del() {},
    //点击查询获得table的值
    async search() {
      this.pagination(this.data);
    },
    // queryPage(data) {
    //   // 提供一个查询分页的接口 例如:
    //   // return findByListProduct(data);
    // },
    //封装分页请求
    async pagination(data) {
      console.log(data);
      let _data = {...data};
      delete _data.tableData;
      const res = await this.queryPage(_data);
      console.log(res);
      if (res.code === 200) {
        //赋值 然后显示
        pUtils.pageInfo(res, data);
      }
    },
    reset() {
      //触发下表头变更 让子组件初始化
      this.tableTitle = [...this.tableTitle];
      this.queryIds = [];
    }
  }
};
</script>


<style lang="scss">
.control {
  margin-top: 20px;
}
</style>
