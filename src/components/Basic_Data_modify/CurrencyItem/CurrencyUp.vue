<template>
  <el-dialog title="币别信息修改" :visible.sync="currencyUp_Form" width="800px">
    <el-form :model="currency_upForm" ref="currency_upForm" :rules="rules" label-width="92px">

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="currencyForm('currency_upForm')">重置</el-button>
      <el-button @click="currencyUp_Form = false">取 消</el-button>
      <el-button type="primary" @click="currencyInfo('currency_upForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSubcurr_Up from 'pubsub-js'
  import utils from '../../../utils/PageUtils'
  import message from '../../../utils/Message'
  import {repHead, repGetCurrencyInfo} from '../../../api/index'
  export default {
    data(){
      return{
        currencyUp_Form:false,
        tableTitle:[],//表头信息
        currency:[],//币别所有信息
        currency_upForm:{

        },
        user: {
          currentPage: 1,//当前页
          pageSize: 5,//显示最大的页
          page_sizes:[5,10,15,20,25],
          total:0,
        },
        rules:{

        }
      }
    },
    async mounted(){
      //查询获得table表的 头信息
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
      //获得店铺信息
      var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      const resultGetCurrency = await repGetCurrencyInfo(userPage)
      console.log(resultGetCurrency)
      if (resultGetCurrency.code === 200) {
        this.currency = resultGetCurrency.data
      }

      PubSubcurr_Up.subscribe('CurrencyUp',(msg,multipleSelection_cur_Up)=>{
        const multipleSelection_Up = multipleSelection_cur_Up
        if (multipleSelection_Up.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (multipleSelection_Up.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.currencyUp_Form=true
      })
    },
    methods:{
      currencyForm(formName) {
        this.$refs[formName].resetFields();
      },
      currencyInfo(formName) {
        this.$refs[formName].validate((valid) => {
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
