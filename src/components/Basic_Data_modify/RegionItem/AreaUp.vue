<template>
  <el-dialog title="区域信息修改" :visible.sync="Area_up_Form" width="800px">
    <el-form :model="Area_Form" ref="Area_Form" :rules="rules" label-width="92px">
      <template v-for="(title,index) in tableTitle">
        <el-form-item v-if="title.topType==='a_eng'" :label="title.headName">
          <el-tag>{{Area_Form.areaEng}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='a_name'" :label="title.headName">
          <el-tag>{{Area_Form.areaName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='a_number'" :label="title.headName">
          <el-tag>{{Area_Form.areaName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='principal'" :label="title.headName">
          <el-tag>{{Area_Form.areaName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='remark'" :label="title.headName">
          <el-tag>{{Area_Form.areaName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='status_bit'" :label="title.headName">
          <el-tag>{{Area_Form.areaName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='create_user'" :label="title.headName">
          <el-tag>{{Area_Form.areaName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='modify_date'" :label="title.headName">
          <el-tag>{{Area_Form.areaName}}</el-tag>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('Area_Form')">重置</el-button>
      <el-button @click="Area_up_Form = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('Area_Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {repHead, repGetRegionInfo} from '../../../api/index'
  import PubSub_AreaUp from 'pubsub-js'
  import message from '../../../utils/Message'
  import utils from '../../../utils/PageUtils'
  export default {
    data(){
      return{
        Area_up_Form:false,
        tableTitle: [],//表头信息
        tableData: [],//表信息
        currentPage: 1,//当前页
        total_size: 0,//总的页
        pageSize: 5,//显示最大的页
        page_sizes:[5,10,15,20,25],
        Area_Form:{
          areaEng:'123',
          areaName:'31',

        },
        rules:{

        }
      }
    },
    async mounted () {
      //查询获得table表的 头信息
      // console.log("开始执行")
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
      //获得店铺信息
      const regionPage = utils.getUserPage(this.currentPage, this.pageSize)
      const resultGetRegion = await repGetRegionInfo(regionPage)
      console.log(resultGetRegion)
      if (resultGetRegion.code === 200) {
        const data = resultGetRegion.data
        this.tableData = data.dataList
        this.currentPage = data.current_page
        this.total_size = data.total_size
      }
      PubSub_AreaUp.subscribe('Area_multipleSelection',(msg,multipleSelections)=>{
        // console.log("接收数据")
        console.log(multipleSelections)
        const AreaSaveSelection_com = multipleSelections
        if (AreaSaveSelection_com.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (AreaSaveSelection_com.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.Area_up_Form=true
        console.log(this.tableTitle)
        //数组转化对象
        AreaSaveSelection_com.forEach(item =>{
          //
        })
      })
    },
    methods:{
      //确认
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">
  .el-dialog__header {
    text-align: center;
    background-color: #e8e8e8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    .el-dialog__title {
      font-family: "宋体";
      font-size: 20px;
    }
  }
  //表单关闭
  .el-dialog__headerbtn {
    background-color: #F56C6C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 20px;
    height: 20px;
  }

  //表单边框
  .el-dialog {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
</style>
