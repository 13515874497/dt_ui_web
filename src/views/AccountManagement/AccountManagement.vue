<template>
  <div id="Account">
    <!--多选输入框选择输入-->
    <div id="printCheck" class="clearfix" v-if="isTableTitle">
      <el-row>
        <el-col :span="4">
          <Query2 :tableTitle="tableTitle" @getValue="getValue2"></Query2>
        </el-col>
        <el-col :span="16">
          <inputQuery
            @changeQuery="setQuery"
            :tableTitle="tableTitle"
            :selectedIds="msgInput_list"
            :querySuggestionsMethod="repUsers"
            :querySuggestionsConfig="user"
          ></inputQuery>
        </el-col>
        <el-col :span="4">
          <SearchReset @search="searchUser"></SearchReset>
        </el-col>
      </el-row>
    </div>
    <!--table表格显示-->
    <div id="userTable">
      <Table
        :tableData="user.tableData"
        :tableTitle="tableTitle"
        v-on:checkboxValue="checkboxValue"
        v-if="isTableTitle"
      />
      <div v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="user" v-on:pageData="pageData"/>
      </div>
    </div>
    <el-input v-model="user.userName" placeholder="请输入内容" @change="getData"></el-input>
    <!--隐藏新增用户记录from表单-->
    <UserItemAdd/>
    <!--隐藏修改from表单-->
    <UserItemUp/>
    <!--隐藏删除from表单-->
    <UserItemDel/>
  </div>
</template>
<script>
import Query2 from "../../components/ElementUi/Query2";
import InputQuery from "../../components/ElementUi/InputQuery";
import SearchReset from "../../components/ElementUi/SearchReset";

import { repUsers, repDelUserInfo } from "../../api";
import UserItemAdd from "../../components/UserItem/UserItemAdd";
import UserItemUp from "../../components/UserItem/UserItemUp";
import UserItemDel from "../../components/UserItem/UserItemDel";
import message from "../../utils/Message";
import pUtils from "../../utils/PageUtils";
import Pagination from "../../components/ElementUi/Pagination";
import Table from "../../components/ElementUi/Table";
import AddDelUpButton from "../../components/ElementUi/AddDelUpButton";
import Query from "../../components/ElementUi/Query";
import PubSub from "pubsub-js";
import requestAjax from "../../api/requestAjax";

export default {
  data() {
    return {
      i_max_length: 20, //设置输入款最大长度
      msgInput: "", //当选择后获得第一个下拉框的id
      msgInput_list: [],
      inputValue: "", //序号
      isTableTitle: false, //如果table表头的长度是 0
      tableTitle: [], //表头信息
      userValue: "", //下拉框的model
      multipleSelection: [], //更新按钮数组收集
      saveFormValue: false, //新增隐藏form
      delFormValue: false, //删除历史记录 隐藏form
      user: {
        tableData: [], //表信息
        userName: "", //账号名
        name: "", //用户名
        rName: "", //角色
        computerName: "", //计算机名
        mobilePhone: "", //手机
        landingTime: "", //登陆时间
        createDate: "", //创建时间
        pwdValidityPeriod: "", //密码有效期
        userExpirationDate: "", //用户有效期
        accountStatus: "", //用户状态
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25],
        pwdAlways: false, //是否勾选始终密码始终有效
        uAlways: false //是否勾选密码始终有效
      },
      accountStatusOptions: [
        {
          id: 0,
          name: "正常"
        },
        {
          id: 1,
          name: "冻结"
        },
        {
          id: 2,
          name: "禁用"
        }
      ]
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
    //如果为空 =false 直接返回不走下面
    if (!this.tableTitle) {
      return;
    }
    this.isTableTitle = true;
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
    getValue2(val) {
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
    //获得第一个input框里的id 通过id去判断显示哪个输入框
    getValue(val) {
      this.msgInput = val.id;
    },
    //点击修改的时候 获得 Checkbox中 的属性
    up() {
      //发布订阅消息 修改
      PubSub.publish("upSelection", this.multipleSelection);
    },
    //新增用户信息
    save() {
      this.saveFormValue = true;
      //发布搜索消息
      PubSub.publish("saveFormValue", this.saveFormValue);
    },
    //删除历史记录查看
    async recording() {
      this.delFormValue = true;
      PubSub.publish("delFormValue", this.delFormValue);
    },
    //删除or 批量删除
    async del() {
      const userDelSelection = this.upSelection;
      if (userDelSelection.length === 0) {
        message.errorMessage("必须选择一个或多个!");
        return;
      }
      if (confirm("确定要删除吗？")) {
        var ids = userDelSelection.map(item => item.uid).join();
        const uidIds = { ids };
        const resultDel = await repDelUserInfo(uidIds);
        if (resultDel.code === 200 && resultDel.data >= 1) {
          message.successMessage("删除成功!");
        } else {
          message.errorMessage("删除失败!");
        }
      }
    },
    //点击查询获得table的值
    async searchUser() {
 
      this.pagination(this.user);
    },
    //触发密码始终有效
    pwd_always_events(value) {
      if (value) {
        this.user.pwdValidityPeriod = "";
      }
    },
    //触发用户始终有效
    user_always_events(value) {
      if (value) {
        this.user.userExpirationDate = "";
      }
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
    //重置
    reset() {
      this.user.userName = "";
      this.user.name = "";
      this.user.rName = "";
      this.user.mobilePhone = "";
      this.user.computerName = ""; //计算机名
      this.user.landingTime = ""; //登陆时间
      this.user.createDate = ""; //创建时间
      this.user.pwdValidityPeriod = ""; //密码有效期
      this.user.userExpirationDate = ""; //用户有效期
      this.user.accountStatus = ""; //用户状态
      this.user.pwdAlways = false; //是否勾选始终密码始终有效
      this.user.uAlways = false; //是否勾选密码始终有效
    },
    //关闭 某属性
    cUserName() {
      this.user.userName = "";
    },
    cName() {
      this.user.name = "";
    },
    cRole() {
      this.user.rName = "";
    },
    cCreate() {
      this.user.createDate = "";
    },
    cPwdDate() {
      this.user.pwdValidityPeriod = "";
    },
    cPwdAlways() {
      this.user.pwdAlways = false;
    },
    cUAlways() {
      this.user.uAlways = false;
    },
    cUDate() {
      this.user.userExpirationDate = "";
    },
    cLanding() {
      this.user.landingTime = "";
    },
    cUStatus() {
      this.user.accountStatus = "";
    },
    cPhone() {
      this.user.mobilePhone = "";
    },
    cComputer() {
      this.user.computerName = "";
    }
  }
};
</script>


<style>
/* 输入 下拉款*/

.box-card {
  /* float: right; */
  width: 500px;
}
</style>
