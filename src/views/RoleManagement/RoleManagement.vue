<template>
  <div id="role">
    <!--多选输入框选择输入-->
    <div id="printCheck" v-if="isTableTitle">
      <Query :tableTitle="tableTitle" v-on:getValue="getValue"/>
      <div class="check2">
        <el-input
          v-show="msgInput===16"
          v-model="role.userName"
          placeholder="请输入角色拥有者"
          prefix-icon="el-icon-search"
        ></el-input>
        <el-input
          v-show="msgInput===10"
          v-model="role.rName"
          placeholder="请输入角色名称"
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
      <div class="check7" style="padding-right: 10px">
        <el-button type="primary" icon="el-icon-search" @click="searchUser">查询</el-button>
        <el-button type="primary" @click="reset()">重置</el-button>
      </div>
      <div style="padding-top: 30px">
        <el-tag v-show="role.rName!==''" closable @close="cRName()">角色名称:{{role.rName}}</el-tag>
        <el-tag v-show="role.userName!==''" closable @close="cUName()">角色拥有者:{{role.userName}}</el-tag>
      </div>
    </div>
    <!--table表格显示-->
    <div id="roleTable">
      <Table
        :tableData="role.tableData"
        :tableTitle="tableTitle"
        v-on:checkboxValue="checkboxValue"
        v-if="isTableTitle"
      />
      <div v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="role" v-on:pageData="pageData"/>
      </div>
    </div>
    <!--修改隐藏页面-->
    <RoleItemUp @refresh="refresh"/>
  </div>
</template>
<script>
import { repGetRoles } from "@/api";
import pUtils from "@/utils/PageUtils";
import PubSub from "pubsub-js";
import RoleItemUp from "@/components/RoleItem/RoleItemUp";
import Pagination from "@/components/ElementUi/Pagination";
import requestAjax from "@/api/requestAjax";
import Table from "@/components/ElementUi/Table";
import AddDelUpButton from "@/components/ElementUi/AddDelUpButton";
import Query from "@/components/ElementUi/Query";
//角色管理
export default {
  data() {
    return {
      msgInput: "", //下拉id
      tableTitle: [], //表头信息
      menuTableTitle: {}, //菜单查询到的表头信息
      multipleSelection: [],
      isTableTitle: false, //如果table表头的长度是 0
      role: {
        page_sizes: [2, 10, 15, 20, 25],
        tableData: [], //表信息
        userName: "", //角色拥有者
        rName: "", //角色名称
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 2 //显示最大的页
      },
      defaultProps: {
        children: "childMenus",
        label: "name"
      }
    };
  },
  async mounted() {
    this.tableTitle = await requestAjax.requestGetHead(this.$route.params.id);
    console.log(this.tableTitle);

    //如果为空 =false 直接返回不走下面
    if (!this.tableTitle) {
      return;
    }
    //获得用户跟角色信息
    this.isTableTitle = true;
    this.pagination(this.role);
  },
  components: {
    RoleItemUp,
    Pagination,
    Table,
    AddDelUpButton,
    Query
  },
  methods: {
    //分页参数传递
    pageData: function(data) {
      this.pagination(data);
    },
    //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
    checkboxValue(val) {
      this.multipleSelection = val;
    },
    //分页参数传递
    getValue: function(val) {
      this.msgInput = val.id;
    },
    //修改隐藏框
    up() {
      PubSub.publish("roleUp", this.multipleSelection);
    },
    save() {
      console.log("新增角色");
    },
    del() {
      console.log("删除");
    },
    recording() {
      console.log("删除记录");
    },
    //点击查询获得输入框的value
    async searchUser() {
      this.pagination(this.role);
    },
    //封装分页请求
    async pagination(data) {
      const resultRoles = await repGetRoles(data);
      console.log(resultRoles);

      if (resultRoles.code === 200) {
        //赋值 然后显示
        pUtils.pageInfo(resultRoles, data);
      }
    },
    //重置
    refresh() {
      console.log('刷新');
      
      this.pagination(this.role);
    },
    reset() {
      this.role.rName = "";
      this.role.owner_menu = "";
      this.role.role_name = "";
      this.role.header_Field = "";
    },
    cRName() {
      this.role.rName = "";
    },
    cUName() {
      this.role.userName = "";
    }
  }
};
</script>


<style lang="scss">
/*表格*/
.el-tooltip__popper {
  max-width: 500px;
  line-height: 180%;
}
.check2,
.check1 {
  margin-right: 10px;
  float: left;
}
#printCheck {
  height: 60px;
}
</style>
