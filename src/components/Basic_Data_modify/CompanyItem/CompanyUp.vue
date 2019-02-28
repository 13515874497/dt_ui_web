<template>
  <el-dialog title="用户信息修改" :visible.sync="upFormValue_com" width="800px">
    <el-form :model="upForm" ref="upForm" :rules="rules" label-width="92px">
      <template v-for="(title ,index) in tableTitle_com">
        <el-form-item v-if="title.topType==='c_full_name'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.companyFullName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='c_short_name'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.companyShortName}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='c_code'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.up_id}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='b_of_de'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.up_id}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='b_acc'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.up_id}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='address'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.up_id}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='tel_phone'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.up_id}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='remark'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.up_id}}</el-tag>
        </el-form-item>
        <el-form-item v-if="title.topType==='status_bit'" :label="title.headName" style="width: 350px"class="username un">
          <el-tag>{{upForm.up_id}}</el-tag>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('upForm')">重置</el-button>
      <el-button @click="upFormValue = false">取 消</el-button>
      <el-button type="primary" @click="savecomInfo('upForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSubUp from 'pubsub-js'
  import utils from '../../../utils/PageUtils'
  import message from '../../../utils/Message'
  import {
    repHead,
    repFindRoles,
    repUpUserInfo,
    repDelRole,
    repAdRole,
    repGetCompanyInfo
  } from '../../../api/index'
  export default {
    data() {
      return {
        upFormValue_com: false,
        multipleSelection: [], //更新按钮数组收集
        tableTitle_com:[],//表头信息
        companys:[],//公司的所有信息
        upForm: {
          companyFullName: '',
          companyShortName: '',
          up_name_abbr: '',
          up_code: '',
          up_city: '',
          up_bank_id: '',
          up_bank_type: '',
          up_room: '',
          up_iphone: '',
          up_it: ''
        },
        user: {
          currentPage: 1,//当前页
          pageSize: 5,//显示最大的页
          page_sizes:[5,10,15,20,25],
          total:0,
        },
        rules: {
          up_id: [
            { required: true, message: '公司编号必填', trigger: 'blur' }
          ],
          up_name: [
            { required: true, message: '公司全称必填', trigger: 'blur' }
          ],
          up_name_abbr: [
            { required: true, message: '公司简称必填', trigger: 'blur' }
          ],

        }
      }
    },
    async mounted () {
      //查询获得table表的 头信息
      const resultHead_com = await
        repHead(this.$route.params.id)
      if (resultHead_com.code === 200) {
        this.tableTitle_com = resultHead_com.data
        console.log(resultHead_com.data)
      }
      //获得公司信息信息
      var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      const resultGetCompany = await repGetCompanyInfo(userPage)
      console.log(resultGetCompany)
      if (resultGetCompany.code === 200) {
        this.companys = resultGetCompany.data
      }
      //获得传来的标识 显示 隐藏form
      PubSubUp.subscribe('multipleSelection', (msg, multipleSelection) => {
        //每次点击初始化
        console.log(multipleSelection)
        const userSaveSelection_com = multipleSelection
        if (userSaveSelection_com.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (userSaveSelection_com.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.upFormValue_com = true
        //将数组转换成对象
        userSaveSelection_com.forEach(item => {
          this.upForm['companyFullName'] = item.companyFullName
          this.upForm['companyShortName'] = item.companyShortName
          this.upForm['up_name_abbr'] = item.up_name_abbr
          this.upForm['up_code'] = item.up_code
          this.upForm['up_city'] = item.up_city
          this.upForm['up_bank_id'] = item.up_bank_id
          this.upForm['up_bank_type'] = item.up_bank_type
          this.upForm['up_room'] = item.up_room
          this.upForm['up_iphone'] = item.up_iphone
          this.upForm['up_it'] = item.up_it
        })
      })

    },
    methods:{
      //确认
      savecomInfo(upForm) {
        this.$refs[upForm].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(upForm) {
        this.$refs[upForm].resetFields();
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


