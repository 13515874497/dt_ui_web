<template>
  <div id="Reg">
    <!--table表格显示-->
    <div id="roleTable">
      <Table :tableData="region.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue"  v-if="isTableTitle"/>
      <div class="block" style="display: inline-block" v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="region" v-on:pageData="pageData"/>
      </div>
    </div>
    <AreaAdd></AreaAdd>
    <AreaUp></AreaUp>
  </div>
</template>
<script>
  import {repGetRegionInfo} from '../../../api/index'
  import AreaAdd from '../../../components/Basic_Data_modify/RegionItem/AreaAdd'
  import AreaUp from '../../../components/Basic_Data_modify/RegionItem/AreaUp'
  import PubSub_Area from 'pubsub-js'
  import Table from '../../../components/ElementUi/Table'
  import requestAjax from '../../../api/requestAjax'
  import Pagination from '../../../components/ElementUi/Pagination'
  import pUtils from '../../../utils/PageUtils'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import Query from '../../../components/ElementUi/Query'
  //区域
  export default {
    data () {
      return {
        msgInput:'',
        isTableTitle: false, //如果table表头的长度是 0
        regionAdd: true,
        tableTitle: [],//表头信息
        multipleSelections: [],
        region: {
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 2,//显示最大的页
          page_sizes: [2, 10, 15, 20, 25]
        }
      }
    },
    components: {
      AreaAdd,
      AreaUp,
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
      //table按钮选择 传参
      checkboxValue: function (value) {
        this.multipleSelections = value
      },
      //分页参数传递
      pageData: function (data) {
        this.pagination(data)
      },
      //新增
      save () {
        PubSub_Area.publish('Area_RegionAdd', this.regionAdd)
      },
      //点击修改按钮传递消息
      up () {
        PubSub_Area.publish('Area_multipleSelection', this.multipleSelections)
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
        const resultGetRegion = await repGetRegionInfo(data)
        pUtils.pageInfo(resultGetRegion, data)
      }
    }
  }
</script>


<style>
</style>
