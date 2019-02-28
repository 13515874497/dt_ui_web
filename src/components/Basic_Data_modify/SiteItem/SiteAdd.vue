<template>
  <el-dialog title="新增站点" :visible.sync="SiteValueAdd" width="900px">
    <el-row type="flex"  justify="center">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="站点编号:" prop="id">
          <el-input placeholder="请输入站点编号" v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="站点名称:" prop="name">
          <el-input placeholder="请输入站点名称" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="英文名称:" prop="en">
          <el-input placeholder="请输入英文名称" v-model="ruleForm.en"></el-input>
        </el-form-item>
        <el-form-item label="币别名称" prop="rmb">
          <el-select v-model="ruleForm.rmb" placeholder="请选择">
            <el-option label="币别一" value="1"></el-option>
            <el-option label="币别二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域名称" prop="area">
          <el-select v-model="ruleForm.area" placeholder="请选择">
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL:" prop="url">
          <el-input placeholder="请输入URL" v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="VAT税率:" prop="vat">
          <el-input placeholder="请输入VAT税率" v-model="ruleForm.vat"></el-input>
        </el-form-item>
        <el-form-item label="责任人:" prop="person">
          <el-input placeholder="请输入开户行" v-model="ruleForm.person"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="it">
          <el-input placeholder="请输入备注" v-model="ruleForm.it"></el-input>
        </el-form-item>



        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-dialog>


</template>
<script>
  import PubSub_SiteAdd from 'pubsub-js'
  export default {
    data() {
      return {
        SiteValueAdd:false,
        ruleForm: {
          id:'',
          name: '',
          en:'',
          rmb:'',
          area:'',
          url:'',
          vat:'',
          person:'',
          it:''
        },
        rules: {
          id: [
            { required: true, message: '站点编号必填', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '站点名称必填', trigger: 'blur' }
          ],
          en: [
            { required: true, message: '英文名称必填', trigger: 'blur' }
          ],
          rmb: [
            { required: true, message: '币种必填', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '区域必填', trigger: 'blur' }
          ],
          url: [
            { required: true, message: 'URL必填', trigger: 'blur' }
          ],
          vat: [
            { required: true, message: 'VAT税率必填', trigger: 'blur' }
          ],

        }
      };
    },
    async mounted () {
      console.log(333)
      PubSub_SiteAdd.subscribe('SiteValue',(msg,saveSiteValue)=>{
        this.SiteValueAdd=saveSiteValue
      })
    },
    methods: {
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
