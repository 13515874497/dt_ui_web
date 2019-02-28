<template>
  <el-dialog title="新增币种" :visible.sync="CurrencyAdd" width="900px">
    <el-row type="flex"  justify="center">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="币别编号:" prop="id">
          <el-input placeholder="请输入币别编号" v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="币别名称:" prop="name">
          <el-input placeholder="请输入币别名称" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="币别简写:" prop="en">
          <el-input placeholder="请输入币别简写" v-model="ruleForm.en"></el-input>
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
  import PubSubAdd from 'pubsub-js'
  export default {
    data() {
      return {
        CurrencyAdd:false,
        ruleForm: {
          id:'',
          name: '',
          en:'',
          it:''
        },
        rules: {
          id: [
            { required: true, message: '币别编号必填', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '币别名称必填', trigger: 'blur' }
          ],
          en: [
            { required: true, message: '币别简写必填', trigger: 'blur' }
          ]

        }
      };
    },
    async mounted () {
      PubSubAdd.subscribe('CurrencyAdd',(msg,saveCurrencyAdd)=>{
        this.CurrencyAdd=saveCurrencyAdd
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



