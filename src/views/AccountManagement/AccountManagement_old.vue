<template>
  <div id="Account">
    <!--多选输入框选择输入-->
    
    <div id="printCheck" v-if="isTableTitle">
      <Query2 :tableTitle="tableTitle" @getValue="getValue2"></Query2>
      <inputQuery :tableTitle="tableTitle" :selectedIds="msgInput_list" :querySuggestionsMethod="repUsers" :autoCompleteData="user"></inputQuery>
      
      <Query :tableTitle="tableTitle" v-on:getValue="getValue"/>
      <SearchReset></SearchReset>
      <div class="check2">
        <el-input
          v-show="msgInput===7"
          v-model="user.userName"
          placeholder="请输入账号"
          prefix-icon="el-icon-search"
          clearable
          :maxlength="i_max_length"
        ></el-input>
        <el-input
          v-show="msgInput===8"
          v-model="user.name"
          placeholder="请输入姓名"
          prefix-icon="el-icon-search"
          clearable
          :maxlength="i_max_length"
        ></el-input>
        <el-input
          v-show="msgInput===10"
          v-model="user.rName"
          placeholder="请输入角色名称"
          prefix-icon="el-icon-search"
          clearable
          :maxlength="i_max_length"
        ></el-input>
        <el-input
          v-show="msgInput===14"
          v-model="user.computerName"
          placeholder="请输入计算机名"
          prefix-icon="el-icon-search"
          clearable
          :maxlength="i_max_length"
        ></el-input>

        <el-select v-show="msgInput===17" v-model="user.accountStatus" value laceholder="请输入账号状态">
          <el-option
            v-for="(item,index) in accountStatusOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-input
          v-show="msgInput===9"
          v-model="user.mobilePhone"
          placeholder="请输入手机号"
          prefix-icon="el-icon-search"
          clearable
          :maxlength="i_max_length"
        ></el-input>
        <div class="block" v-show="msgInput===11">
          <el-date-picker
            v-model="user.createDate"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <!-- `checked` 为 true 或 false -->
        <el-checkbox
          v-show="msgInput===51"
          v-model="user.pwdAlways"
          @change="pwd_always_events"
        >始终有效</el-checkbox>
        <div class="block" v-if="user.pwdAlways===false   && msgInput===51">
          <el-date-picker
            v-model="user.pwdStatus"
            type="datetime"
            value-format="timestamp"
            placeholder="选择密码有效期"
          ></el-date-picker>
        </div>
        <div class="block" v-show="msgInput===13">
          <el-date-picker
            v-model="user.landingTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择最近登陆时间"
          ></el-date-picker>
        </div>
        <!-- `checked` 为 true 或 false -->
        <el-checkbox v-show="msgInput===50" v-model="user.uAlways" @change="user_always_events">始终有效</el-checkbox>
        <div class="block" v-show="user.uAlways===false && msgInput===50">
          <el-date-picker
            v-model="user.effectiveDate"
            type="datetime"
            value-format="timestamp"
            placeholder="选择用户有效期"
          ></el-date-picker>
        </div>
      </div>
      <div class="check7" style="padding-right: 10px">
        <el-button type="primary" icon="el-icon-search" @click="searchUser">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </div>    
      <!-- 显示输入参数div-->
      <div style="padding-top: 30px" class="box-card">
        <el-tag v-show="user.userName!==''" closable @close="cUserName()">账号:{{user.userName}}</el-tag>
        <el-tag v-show="user.name!==''" closable @close="cName()">姓名:{{user.name}}</el-tag>
        <el-tag v-show="user.rName!==''" closable @close="cRole()">角色名称:{{user.rName}}</el-tag>
        <el-tag
          v-show="user.createDate!==''"
          closable
          @close="cCreate()"
        >创建时间:{{user.createDate | date-format}}</el-tag>
        <el-tag v-show="user.pwdAlways" closable @close="cPwdAlways()">密码有效期:始终有效</el-tag>
        <el-tag v-show="user.pwdStatus!=='' && !user.pwdAlways" closable @close="cPwdDate()">
          密码有效期:{{user.pwdStatus |
          date-format}}
        </el-tag>
        <el-tag v-show="user.uAlways" closable @close="cUAlways()">用户有效期:始终有效</el-tag>
        <el-tag v-show="user.effectiveDate!=='' && !user.uAlways" closable @close="cUDate()">
          用户有效期:{{user.effectiveDate
          |
          date-format}}
        </el-tag>
        <el-tag v-show="user.landingTime!==''" closable @close="cLanding()">
          最近登陆时间:{{user.landingTime |
          date-format}}
        </el-tag>
        <el-tag v-show="user.accountStatus!==''" closable @close="cUStatus()">
          账号状态:{{user.accountStatus === 0 ? '正常' : user.accountStatus === 1 ? '冻结' : user.accountStatus === 2 ? '禁用' :
          '无条件'}}
        </el-tag>
        <el-tag v-show="user.mobilePhone!==''" closable @close="cPhone()">手机号:{{user.mobilePhone}}</el-tag>
        <el-tag
          v-show="user.computerName!==''"
          closable
          @close="cComputer()"
        >计算机名:{{user.computerName}}</el-tag>
      </div>
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
import Query2 from "@/components/ElementUi/Query2";
import InputQuery from "@/components/ElementUi/InputQuery";
import SearchReset from "@/components/ElementUi/SearchReset";

import { repUsers, repDelUserInfo } from "@/api";
import UserItemAdd from "@/components/UserItem/UserItemAdd";
import UserItemUp from "@/components/UserItem/UserItemUp";
import UserItemDel from "@/components/UserItem/UserItemDel";
import message from "@/utils/Message";
import pUtils from "@/utils/PageUtils";
import Pagination from "@/components/ElementUi/Pagination";
import Table from "@/components/ElementUi/Table";
import AddDelUpButton from "@/components/ElementUi/AddDelUpButton";
import Query from "@/components/ElementUi/Query";
import PubSub from "pubsub-js";
import requestAjax from "@/api/requestAjax";

export default {
  data() {
    return {
      i_max_length: 20, //设置输入款最大长度
      msgInput: "", //当选择后获得第一个下拉框的id
      msgInput_list:[],
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
        pwdStatus: "", //密码有效期
        effectiveDate: "", //用户有效期
        accountStatus: "", //用户状态
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25],
        pwdAlways: false, //是否勾选始终密码始终有效
        uAlways: false, //是否勾选密码始终有效
        // version: ""
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
    SearchReset,
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
    getValue2(val){
      this.msgInput_list = val;
    },
    getData(){
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
        this.user.pwdStatus = "";
      }
    },
    //触发用户始终有效
    user_always_events(value) {
      if (value) {
        this.user.effectiveDate = "";
      }
    },
    repUsers(data){
      return repUsers(data);
    },
    //封装分页请求
    async pagination(data) {
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
      this.user.pwdStatus = ""; //密码有效期
      this.user.effectiveDate = ""; //用户有效期
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
      this.user.pwdStatus = "";
    },
    cPwdAlways() {
      this.user.pwdAlways = false;
    },
    cUAlways() {
      this.user.uAlways = false;
    },
    cUDate() {
      this.user.effectiveDate = "";
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
