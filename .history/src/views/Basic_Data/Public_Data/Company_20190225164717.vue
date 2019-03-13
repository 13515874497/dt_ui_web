<template>
  <div id="Com">
    <!--table表格显示-->
    <div id="roleTable" style="width: 1650px">
      <Table :tableData="company.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue" v-if="isTableTitle"/>
      <div class="block" style="display: inline-block" v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="company" v-on:pageData="pageData"/>
      </div>
    </div>
    <CompanyAdd/>
    <CompanyUp/>
  </div>

</template>
<script>
  import {repGetCompanyInfo} from '../../../api/index'
  import CompanyAdd from '../../../components/Basic_Data_modify/CompanyItem/CompanyAdd'
  import CompanyUp from '../../../components/Basic_Data_modify/CompanyItem/CompanyUp'
  import pUtils from '../../../utils/PageUtils'
  import Table from '../../../components/ElementUi/Table'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import requestAjax from '../../../api/requestAjax'
  import Pagination from '../../../components/ElementUi/Pagination'
  import PubSub_com from 'pubsub-js'
  import Query from '../../../components/ElementUi/Query'
//公司
  export default {
    data () {
      return {
        isTableTitle: false, //如果table表头的长度是 0
        tableTitle: [],//表头信息
        multipleSelection: [],//更新按钮数组收集
        saveFormValue_com: false,//新增隐藏form
        company: {
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总数
          pageSize: 5,//显示最大的页
          page_sizes: [5, 10, 15, 20, 25],//显示页数
        }
      }
    },
    components:{
      CompanyAdd,
      CompanyUp,
      Table,
      Pagination,
      AddDelUpButton,
      Query
    },
    async mounted () {
      this.tableTitle = await requestAjax.requestGetHead(this.$route.params.id)
      //如果为空 =false 直接返回不走下面
      if (!this.tableTitle) {
        return
      }
      this.isTableTitle=true
      this.pagination(this.company)
    },
    methods: {
      //table按钮选择 传参
      checkboxValue: function (value) {
        this.multipleSelection = value
      },
      //分页参数传递
      pageData: function (data) {
        this.pagination(data)
      },
      //分页参数传递
      save () {
        this.saveFormValue_com = true
        //发布搜索消息
        PubSub_com.publish('saveFormValue_com', this.saveFormValue_com)
      },
      //点击修改的时候 获得 Checkbox中 的属性
      up () {
        //发布订阅消息 修改
        PubSub_com.publish('multipleSelection', this.multipleSelection)
      },
      del () {
        console.log('删除')
      },
      recording () {
        console.log('删除记录')
      },
      //封装分页请求
      async pagination (data) {
        //获得店铺信息
        const resultGetCompany = await repGetCompanyInfo(data)
        pUtils.pageInfo(resultGetCompany, data)
      }
    }
  }
</script>


<style>

</style>
