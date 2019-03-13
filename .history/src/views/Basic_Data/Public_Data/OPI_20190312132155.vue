<template>
  <div id="OPI">
    <!--多选输入框选择输入-->
    <div id="printCheck" class="clearfix" v-if="tableTitle.length">
      <el-row :gutter="20">
        <el-col :span="4">
          <Query2 :tableTitle="tableTitle" @getValue="getValue"></Query2>
        </el-col>
        <el-col :span="16">
          <inputQuery
            @changeQuery="setQuery"
            :tableTitle="tableTitle"
            :selectedIds="msgInput_list"
            :querySuggestionsMethod="repUsers"
            :querySuggestionsConfig="OPI"
          ></inputQuery>
        </el-col>
        <el-col :span="4">
          <SearchReset @search="search"></SearchReset>
        </el-col>
      </el-row>
    </div>
    <!--table表格显示-->
    <div id="userTable">
      <Table
        :tableData="user.tableData"
        :tableTitle="tableTitle"
        v-on:checkboxValue="checkboxValue"
        v-if="tableTitle.length"
      />
      <div v-if="tableTitle.length">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="user" v-on:pageData="pageData"/>
      </div>
    </div>
    <el-input v-model="user.userName" placeholder="请输入内容" @change="getData"></el-input>
    <!--隐藏新增用户记录from表单-->
  </div>
</template>
<script>
import Query2 from "../../../components/ElementUi/Query2";
import InputQuery from "../../../components/ElementUi/InputQuery";
import SearchReset from "../../../components/ElementUi/SearchReset";

import { } from "../../../api";

import Message from "../../../utils/Message";
import pUtils from "../../../utils/PageUtils";
import Pagination from "../../../components/ElementUi/Pagination";
import Table from "../../../components/ElementUi/Table";
import AddDelUpButton from "../../../components/ElementUi/AddDelUpButton";
import requestAjax from "../../../api/requestAjax";

export default {
  data() {
    return {

      msgInput_list: [],


      tableTitle: [], //表头信息

      multipleSelection: [], //更新按钮数组收集
     
      OPI: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25],
      },
    };
  },
  components: {
    UserItemAdd,
    UserItemUp,
    UserItemDel,
    Pagination,
    Table,
    AddDelUpButton,
    Query,
    Query2,
    InputQuery,
    SearchReset
  },
  async mounted() {
    this.tableTitle = await requestAjax.requestGetHead(this.$route.params.id);
    console.log( this.tableTitle)
    //如果为空 =false 直接返回不走下面
    if (!this.tableTitle) {
      return;
    }
    this.pagination(this.user);
  },
  methods: {
    setQuery($event) {
      let user = $event[0];
      for (let key in user) {
        let value = user[key];
        this.user[key] = value;
      }
    },
    //获得input框里的id列表
    getValue(val) {
      this.msgInput_list = val;
    },
    getData() {
      this.pagination(this.user);
    },
    //table按钮选择 传参
    checkboxValue: function(value) {
      this.multipleSelection = value;
    },
    //分页参数传递
    pageData: function(data) {
      this.pagination(data);
    },

    up() {
     
     
    },

    save() {
     
    },
    //删除历史记录查看
    async recording() {
      
    },
    //删除or 批量删除
    async del() {

    },
    //点击查询获得table的值
    async search() {
      this.pagination(this.user);
    },
    repUsers(data) {
      return repUsers(data);
    },
    //封装分页请求
    async pagination(data) {
      console.log(data);
      
      const resultUsers = await repUsers(data);
      if (resultUsers.code === 200) {
        //赋值 然后显示
        pUtils.pageInfo(resultUsers, data);
      }
    },
  }
};
</script>


<style lang="scss">

</style>
