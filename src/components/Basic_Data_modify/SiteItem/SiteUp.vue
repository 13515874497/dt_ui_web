<template>
  <el-dialog title="站点信息修改" :visible.sync="siteUp_form" width="800px">
    <el-form :model="siteForm" ref="siteForm" :rules="rules" label-width="92px">


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('siteForm')">重置</el-button>
      <el-button @click=" siteUp_form= false">取 消</el-button>
      <el-button type="primary" @click="saveShopInfo('siteForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {repHead, repGetSiteInfo} from '../../../api/index'
  import PubSub_ShopUp from 'pubsub-js'
  import message from '../../../utils/Message'
  import utils from '../../../utils/PageUtils'
  export default {
    data(){
      return{
        siteUp_form:false,
        tableData:[],//站点信息
        siteForm:{

        },
        role: {
          currentPage: 1,//当前页
          pageSize: 5,//显示最大的页
          page_sizes:[5,10,15,20,25],
          total:0,
        },
        rules:{

        }
      }
    },
    async mounted (){
      //查询获得table表的 头信息
      const resultHead = await
        repHead(this.$route.params.id)
      console.log(resultHead)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
      //获得站点信息
      var regionPage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
      const resultGetSite = await repGetSiteInfo(regionPage)
      console.log(resultGetSite)
      if (resultGetSite.code === 200) {
        this.tableData = resultGetSite.data.dataList
      }
      PubSub_ShopUp.subscribe('Site_Up',(msg,multipleSelection_shop_up)=>{
        const userSaveSelection_com = multipleSelection_shop_up
        if (userSaveSelection_com.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (userSaveSelection_com.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.siteUp_form=true
      })
    },
    methods:{
      resetForm(upForm) {
        this.$refs[upForm].resetFields();
      },
      saveShopInfo(upForm) {
        this.$refs[upForm].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
