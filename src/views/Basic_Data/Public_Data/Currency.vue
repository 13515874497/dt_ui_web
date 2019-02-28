<template>
  <div id="Cur">
    <!--table表格显示-->
    <div id="roleTable">
      <Table :tableData="currency.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue"  v-if="isTableTitle" />
      <div class="block" style="display: inline-block"  v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="currency" v-on:pageData="pageData"/>
      </div>
    </div>
    <currencyAdd></currencyAdd>
    <currencyUp></currencyUp>
  </div>
</template>
<script>
  import PubSubAdd from 'pubsub-js'
  import currencyAdd from '../../../components/Basic_Data_modify/CurrencyItem/CurrencyAdd'
  import currencyUp from '../../../components/Basic_Data_modify/CurrencyItem/CurrencyUp'
  import {repGetCurrencyInfo} from '../../../api/index'
  import Table from '../../../components/ElementUi/Table'
  import requestAjax from '../../../api/requestAjax'
  import Pagination from '../../../components/ElementUi/Pagination'
  import pUtils from '../../../utils/PageUtils'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import Query from '../../../components/ElementUi/Query'

  //店铺

  export default {
    data () {
      return {
        isTableTitle: false, //如果table表头的长度是 0
        saveCurrencyAdd:true,//显示
        tableTitle: [],//表头信息
        multipleSelections: [],
        currency: {
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 2,//显示最大的页
          page_sizes: [2, 10, 15, 20, 25]
        }
      }
    },
    async mounted () {
      this.tableTitle = await requestAjax.requestGetHead(this.$route.params.id)
      //如果为空 =false 直接返回不走下面
      if (!this.tableTitle) {
        return
      }
      this.isTableTitle=true
      this.pagination(this.currency)
    },
    components:{
      currencyAdd,
      currencyUp,
      Table,
      Pagination,
      AddDelUpButton,
      Query
    },
    methods: {
      //table按钮选择 传参
      checkboxValue: function (value) {
        this.multipleSelections = value
      },
      //分页参数传递
      pageData: function (data) {
        this.pagination(data)
      },
      save(){
        PubSubAdd.publish('CurrencyAdd', this.saveCurrencyAdd)
      },
      up(){
        PubSubAdd.publish('CurrencyUp', this.multipleSelections)
      },
      del(){
        console.log('删除')
      },
      recording(){
       console.log('删除记录')
      },
      //封装分页请求
      async pagination (data) {
        //获得店铺信息
        const resultGetCurrency = await repGetCurrencyInfo(data)
        pUtils.pageInfo(resultGetCurrency, data)
      }
    }
  }
</script>


<style>
  /*表格*/
  #roleTable {
    padding-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
