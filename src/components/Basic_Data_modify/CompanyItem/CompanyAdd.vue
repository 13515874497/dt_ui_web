<template>
  <el-dialog title="新增用户" :visible.sync="saveFormValue_com" width="900px"  class="user">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="公司编号:" prop="id">
        <el-input placeholder="请输入公司编号" v-model="addForm.id"></el-input>
      </el-form-item>
      <el-form-item label="公司全称:" prop="name">
        <el-input placeholder="请输入公司全称" v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="公司简称:" prop="name_abbr">
        <el-input placeholder="请输入公司简称" v-model="addForm.name_abbr"></el-input>
      </el-form-item>
      <el-form-item label="信用代码:" prop="code">
        <el-input placeholder="请输入信用代码" v-model="addForm.code"></el-input>
      </el-form-item>
      <el-form-item label="开 户 行:" prop="city">
        <el-input placeholder="请输入开户行" v-model="addForm.city"></el-input>
      </el-form-item>
      <el-form-item label="银行账号:" prop="bank_id">
        <el-input placeholder="请输入银行账号" v-model="addForm.bank_id"></el-input>
      </el-form-item>
      <el-form-item label="账户类型:" prop="bank_type">
        <el-input placeholder="请输入账户类型" v-model="addForm.bank_type"></el-input>
      </el-form-item>
      <el-form-item label="公司地址:" prop="room">
        <el-input placeholder="请输入公司地址" v-model="addForm.room"></el-input>
      </el-form-item>
      <el-form-item label="公司电话:" prop="iphone">
        <el-input placeholder="请输入公司电话" v-model="addForm.iphone"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="it">
        <el-input placeholder="请输入备注" v-model="addForm.it"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('addForm')">保存并继续</el-button>
      <el-button @click="saveFormValue_com = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
    </div>
  </el-dialog>



</template>

<script>
  import PubSubAdd from 'pubsub-js'
  import {repFindRoles, repGetStaff, repSaveUserInfo} from '../../../api/index'
  import message from '../../../utils/Message'
  export default {
    data() {
      return {
        saveFormValue_com: false,
        rolesData: [],//获得所有角色
        staffStatusOptions: [], //获得员工信息
        addForm: {
          id:'',
          name: '',
          name_abbr:'',
          code:'',
          city:'',
          bank_id:'',
          bank_type:'',
          room:'',
          iphone:'',
          it:''
        },
        rules: {
          id: [
            { required: true, message: '公司编号必填', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '公司全称必填', trigger: 'blur' }
          ],
          name_abbr: [
            { required: true, message: '公司简称必填', trigger: 'blur' }
          ],

        }
      }
    },
    async mounted () {
      //获得传来的标识 显示 隐藏form
      PubSubAdd.subscribe('saveFormValue_com', (msg, saveFormValue_com) => {
        this.saveFormValue_com = saveFormValue_com
        //查询角色信息
        const resultRoles = repFindRoles()
        resultRoles.then((result) => {
          if (result.code === 200) {
            const generateData = _ => {
              const data = []
              const roles = result.data
              roles.forEach((role, index) => {
                data.push({
                  label: role.rName,
                  key: role.rid,
                  roles: roles[index]
                })
              })
              return data
            }
            this.rolesData = generateData()
          }
        })
        //获得员工信息
        const resultStaff = repGetStaff()
        resultStaff.then((result) => {
          if (result.code === 200) {
            this.staffStatusOptions = result.data
          }
        })
      })
    },
    methods: {
      //点击确定
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.addForm)
          if (valid) {
            const resultSave = repSaveUserInfo(this.addForm)
            resultSave.then((result) => {
              console.log(result)
              if (result.code === 200) {
                this.saveFormValue_com = false
                message.successMessage(result.msg)
                PubSubAdd.publish('saveFormValue_com', this.saveFormValue_com)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //保存并继续
      resetForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.addForm)
          if (valid) {
            const resultSave = repSaveUserInfo(this.addForm)
            resultSave.then((result) => {
              console.log(result)
              if (result.code === 200) {
                message.successMessage(result.msg)
                PubSubAdd.publish('saveFormValue_com', this.saveFormValue_com)
                this.$refs[formName].resetFields();
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
