<template>
  <el-dialog title="新增异常" :visible.sync="ErrAdd" width="900px">
    <el-row type="flex"  justify="center">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="异常类型:" prop="class">
          <el-input placeholder="请输入报关类型" v-model="ruleForm.class"></el-input>
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
  import PubSub_Add from 'pubsub-js'
  export default {
    data() {
      return {
        ErrAdd:false,
        ruleForm: {
          class: '',
          it:''
        },
        rules: {
          class: [
            { required: true, message: '异常必填', trigger: 'blur' }
          ],

        }
      };
    },
    async mounted(){
      PubSub_Add.subscribe('saveFormValue_Err',(msg,FormValue_Err)=>{
        this.ErrAdd=FormValue_Err
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
