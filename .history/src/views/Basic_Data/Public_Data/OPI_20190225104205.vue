<template>

  <div id="Opi">
    <div id="printCheck" v-if="isTableTitle">
      <Query :tableTitle="tableTitle" v-on:getValue="getValue"/>
    </div>
    <!--table表格显示-->
    <div id="roleTable">
      <Table :tableData="region.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue"  v-if="isTableTitle"/>
      <div class="block" style="display: inline-block" v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="region" v-on:pageData="pageData"/>
      </div>
    </div>
    <OPI_Add></OPI_Add>
  </div>
</template>
<script>
  import {} from '../../../api/index'
  import OPI_Add from '../../../components/Basic_Data_modify/OpiItem/OPI_Add'
  import PubSub_OPI from 'pubsub-js'
  import Table from '../../../components/ElementUi/Table'
  import requestAjax from '../../../api/requestAjax'
  import Pagination from '../../../components/ElementUi/Pagination'
  import pUtils from '../../../utils/PageUtils'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import Query from '../../../components/ElementUi/Query'
  //公司
  export default {
    data () {
      return {
        isTableTitle: false, //如果table表头的长度是 0
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        multipleSelection: [],//更新按钮数组收集
        FormValue_OPI: false,//新增隐藏form
        opi: {
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 2,//显示最大的页
          page_sizes: [2, 10, 15, 20, 25]
        }
      }
    },
    components:{
      OPI_Add,
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
      this.pagination(this.region)
    },
    methods: {
      save () {
        this.FormValue_OPI = true
        //发布搜索消息
        PubSub_OPI.publish('saveFormValue_OPI', this.FormValue_OPI)
      },
      //点击修改的时候 获得 Checkbox中 的属性
      up () {
        //发布订阅消息 修改
        PubSub_OPI.publish('multipleSelection', this.multipleSelection)
      },
      //封装分页请求
      async pagination (data) {
        // //获得店铺信息
        // const resultGetRegion = await repGetRegionInfo(data)
        // pUtils.pageInfo(resultGetRegion, data)
      }
    }
  }
</script>


<style>

</style>
