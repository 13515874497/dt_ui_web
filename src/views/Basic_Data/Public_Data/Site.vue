<template>
  <div id="Site">
    <div id="printCheck" v-if="isTableTitle">
      <Query :tableTitle="tableTitle" v-on:getValue="getValue"/>
    </div>
    <!--table表格显示-->
    <div id="roleTable" style="width: 1650px">
      <Table :tableData="site.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue"
             v-if="isTableTitle"/>
      <div v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="site" v-on:pageData="pageData"/>
      </div>
    </div>
    <SiteAdd></SiteAdd>
    <SiteUp></SiteUp>
  </div>
</template>
<script>
  import PubSub_Site from 'pubsub-js'
  import SiteAdd from '../../../components/Basic_Data_modify/SiteItem/SiteAdd'
  import SiteUp from '../../../components/Basic_Data_modify/SiteItem/SiteUp'
  import {repGetSiteInfo} from '../../../api/index'
  import pUtils from '../../../utils/PageUtils'
  import Table from '../../../components/ElementUi/Table'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import Query from '../../../components/ElementUi/Query'
  import requestAjax from '../../../api/requestAjax'
  import Pagination from '../../../components/ElementUi/Pagination'
  //店铺

  export default {
    data () {
      return {
        msgInput:'',
        saveSiteValue: true,
        tableTitle: [],//表头信息
        multipleSelection: [],
        isTableTitle: false, //如果table表头的长度是 0
        site: {
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总数
          pageSize: 1,//显示最大的页
          page_sizes: [1, 10, 15, 20, 25],//显示页数
        }
      }
    },
    components: {
      SiteAdd,
      SiteUp,
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
      //获得用户跟角色信息
      this.isTableTitle = true
      this.pagination(this.site)
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
      getValue: function (val) {
        this.msgInput = val
      },
      save () {
        PubSub_Site.publish('SiteValue', this.saveSiteValue)
      },
      up () {
        PubSub_Site.publish('Site_Up', this.multipleSelection)
      },
      del () {
        console.log('删除')
      },
      recording () {
        console.log('记录')
      },
      //封装分页请求
      async pagination (data) {
        //获得店铺信息
        const resultGetSite = await repGetSiteInfo(data)
        pUtils.pageInfo(resultGetSite, data)
      }
    }
  }
</script>


<style>
  /*表格*/
  #roleTable {

  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
