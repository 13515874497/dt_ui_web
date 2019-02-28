<template>
  <div id="Shop">
    
    <!--table表格显示-->
    <div id="roleTable">
      <!--table表格显示-->
      <Table :tableData="shop.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue"
             v-if="isTableTitle"/>
      <div class="block" style="display: inline-block" v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="shop" v-on:pageData="pageData"/>
      </div>
    </div>
    <ShopAdd></ShopAdd>
    <ShopUp></ShopUp>
  </div>
</template>
<script>
  import {repGetShopInfo} from '../../../api/index'
  //店铺
  import ShopAdd from '../../../components/Basic_Data_modify/ShopItem/ShopAdd'
  import ShopUp from '../../../components/Basic_Data_modify/ShopItem/ShopUp'
  import PubSub_Shop from 'pubsub-js'
  import pUtils from '../../../utils/PageUtils'
  import Table from '../../../components/ElementUi/Table'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import Query from '../../../components/ElementUi/Query'
  import requestAjax from '../../../api/requestAjax'
  import Pagination from '../../../components/ElementUi/Pagination'

  export default {
    data () {
      return {
        tableTitle: [],//表头信息
        multipleSelection: [],
        saveShopValue: true,//新增显示
        isTableTitle: false, //如果table表头的长度是 0
        shop: {
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总数
          pageSize: 1,//显示最大的页
          page_sizes: [1, 10, 15, 20, 25],//显示页数
        }
      }
    },
    components: {
      ShopAdd,
      ShopUp,
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
      this.pagination(this.shop)
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
        PubSub_Shop.publish('saveShopValue', this.saveShopValue)
      },
      up () {
        PubSub_Shop.publish('multipleSelectionUp', this.multipleSelectionUp)
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
        const resultGetShop = await repGetShopInfo(data)
        pUtils.pageInfo(resultGetShop, data)
      }
    }
  }
</script>


<style lang="scss">

</style>
