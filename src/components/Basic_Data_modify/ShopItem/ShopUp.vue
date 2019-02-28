<template>
  <el-dialog title="店铺信息修改" :visible.sync="Shop_up_Form" width="800px">
    <el-form :model="Shop_Form" ref="upForm" :rules="rules" label-width="92px">
      <template v-for="">

      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('Shop_Form')">重置</el-button>
      <el-button @click="Shop_up_Form = false">取 消</el-button>
      <el-button type="primary" @click="saveUserInfo('Shop_Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSubUp from 'pubsub-js'
  import message from '../../../utils/Message'
  import {repHead, repGetShopInfo} from '../../../api/index'
  export default {
    data(){
      return{
        Shop_up_Form:false,
        tableTitle:[],
        Shop_Form:{

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
      PubSubUp.subscribe('multipleSelectionUp',(msg,multipleSelectionUp)=>{
        const userSaveSelection_Up = multipleSelectionUp
        if (userSaveSelection_Up.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (userSaveSelection_Up.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.Shop_up_Form=true
      })
    },
  }
</script>

<style scoped>

</style>
