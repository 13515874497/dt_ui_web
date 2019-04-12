<template>
  <main>
    <!--表格上方查询条件-->
    <section id="printCheck" class="clearfix" v-if="showQuery && tableTitle.length">
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
    </section>
    <!--table表格-->
    <section>
      <Table
        :tableData="data.tableData"
        :tableTitle="tableTitle"
        v-on:checkboxValue="checkboxValue"
        v-if="tableTitle.length"
      />
      <div v-if="tableTitle.length" class="control">
        <!-- <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/> -->
        <OperateBtn :operateList="operateList"></OperateBtn>
        <!--分页-->
        <Pagination :data="data" v-on:pageData="pagination"/>
      </div>
    </section>
    <!-- 新增 -->
    <section>
      <el-dialog title="新增" :visible="add.visible">
        <!-- <Form :formItems="formItems" :formData="data_field" @passData="passData_update"></Form> -->
        <Form :formItems="tableTitle"  @passData="passData_add"></Form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="add.visible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </main>
</template>
<script>
import Query2 from "@/components/ElementUi/Query2";
import InputQuery from "@/components/ElementUi/InputQuery";
import SearchReset from "@/components/ElementUi/SearchReset";
import loading from "@/utils/loading";
// import { findByListProduct } from "@/api";

import Message from "@/utils/Message";
import pUtils from "@/utils/PageUtils";
import Pagination from "@/components/ElementUi/Pagination";
import Table from "@/components/ElementUi/Table";
import AddDelUpButton from "@/components/ElementUi/AddDelUpButton";
import OperateBtn from "@/components/ElementUi/OperateBtn";

import requestAjax from "@/api/requestAjax";

export default {
  data() {
    return {
      queryIds: [],

      tableTitle: [], //表头信息

      multipleSelection: [], //更新按钮数组收集

      data: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25]
      },
      showQuery: true,
      formItems:[],
      //
      add: {
        visible: false
      }
    };
  },
  components: {
    Pagination,
    Table,
    AddDelUpButton,
    OperateBtn,
    Query2,
    InputQuery,
    SearchReset
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
      let _data = { ...data };
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
    },
    
    openDialog_add() {
      console.log("新增");
      this.add.visible = true;
    },
    passData_add(){

    },
    add(){

    },
    initOperateBtn() {
      let self = this;
      this.operateList = [
        //对已上传的文件进行操作的按钮列表
        {
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          label: "新增",
          fn() {
            self.openDialog_add();
          }
        },
        {
          type: "success",
          icon: "el-icon-edit",
          label: "修改",
          fn() {
            self.openDialog_update();
          }
        },
        {
          type: "danger",
          icon: "el-icon-delete",
          label: "删除",
          fn() {
            self.openDialog_remove();
          }
        },
        {
          type: "warning",
          icon: "",
          label: "删除记录",
          fn() {
            self.openDialog_removeRecord();
          }
        }
      ];
    }
  },
  created() {
    this.initOperateBtn();
  },
  async mounted() {
    this.tableTitle =
      (await requestAjax.requestGetHead(this.$route.params.id)) || [];
    this.pagination(this.data);
  }
};
</script>


<style lang="scss" scoped>
#printCheck {
  width: 100%;
  // height: 30px;
  position: relative;
  margin-bottom: 25px;
}
.control {
  margin-top: 20px;
}
</style>
