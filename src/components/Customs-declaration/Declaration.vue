<template>
  <el-dialog title="新增报关" :visible.sync="DeclarationAdd" width="900px">
    <el-row type="flex"  justify="center">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="编号:" prop="id">
          <el-input placeholder="请输入编号" v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="报关类型:" prop="class">
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
        DeclarationAdd:false,
        ruleForm: {
          id:'',
          class: '',
          it:''
        },
        rules: {
          id: [
            { required: true, message: '编号必填', trigger: 'blur' }
          ],
          class: [
            { required: true, message: '报关类型必填', trigger: 'blur' }
          ],

        }
      };
    },
    async mounted(){
      PubSub_Add.subscribe('saveFormValue_Dec',(msg,FormValue_Dec)=>{
        this.DeclarationAdd=FormValue_Dec
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
