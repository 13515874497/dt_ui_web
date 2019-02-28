<template>
  <!--汇率-->
  <div>
    <div id="printCheck" v-if="isTableTitle">
      <Query :tableTitle="tableTitle" v-on:getValue="getValue"/>
    </div>
    <!--table表格显示-->
    <Table :tableData="eRate.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue"
           v-if="isTableTitle"/>
    <div id="roleTable">
      <div class="block" style="display: inline-block" v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="eRate" v-on:pageData="pageData"/>
      </div>
    </div>

  </div>

</template>
<script>
  import DeclarationAdd from '../../../components/Customs-declaration/Declaration'
  import PubSub_Exc from 'pubsub-js'
  import Table from '../../../components/ElementUi/Table'
  import Pagination from '../../../components/ElementUi/Pagination'
  import pUtils from '../../../utils/PageUtils'
  import requestAjax from '../../../api/requestAjax'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import Query from '../../../components/ElementUi/Query'
  import {repGetRate} from '../../../api/index'
  //公司
  export default {
    data () {
      return {
        msgInput: '',
        isTableTitle: false, //如果table表头的长度是 0
        multipleSelection: [],//更新按钮数组收集
        FormValue_Dec: false,//新增隐藏form
        tableTitle: [],
        eRate: { //汇率对象
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 2,//显示最大的页
          page_sizes: [2, 10, 15, 20, 25]
        }
      }
    },
    components: {
      DeclarationAdd,
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
      this.isTableTitle = true
      this.pagination(this.eRate)
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
      save () {
        this.FormValue_Dec = true
        //发布搜索消息
        PubSub_Exc.publish('saveFormValue_Dec', this.FormValue_Dec)
      },
      //分页参数传递
      getValue: function (val) {
        this.msgInput = val
      },
      //点击修改的时候 获得 Checkbox中 的属性
      up () {
        //发布订阅消息 修改
        PubSub_Exc.publish('multipleSelection', this.multipleSelection)
      },
      del () {
        console.log('删除')
      },
      recording () {
        console.log('删除记录')
      },
      //封装分页请求
      async pagination (data) {
        const resultRate = await repGetRate(data)
        console.log(resultRate.data)
        if (resultRate.code === 200) {
          //赋值 然后显示
          pUtils.pageInfo(resultRate, data)
        }
      },
    }
  }
</script>


<style>
  /*表格*/
  #roleTable {
    margin-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
