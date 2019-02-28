<template>
  <el-dialog title="产品信息" :visible.sync="FormValue_Ware" width="900px" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" >

        <el-form-item label="站点名称" prop="site">
          <el-select v-model="ruleForm.site" placeholder="请选择">
            <el-option label="类别一" value="1"></el-option>
            <el-option label="类别二" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="仓库代码:" prop="id">
          <el-input placeholder="请输入仓库代码" v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="国家代码" prop="country">
          <el-select v-model="ruleForm.country" placeholder="请选择">
            <el-option label="类别一" value="1"></el-option>
            <el-option label="类别二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input placeholder="请输入地址" v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="城市:" prop="city">
          <el-input placeholder="请输入城市" v-model="ruleForm.city"></el-input>
        </el-form-item>
        <el-form-item label="州:" prop="z">
          <el-input placeholder="请输入州" v-model="ruleForm.z"></el-input>
        </el-form-item>
        <el-form-item label="邮编:" prop="code">
          <el-input placeholder="请输入邮编" v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="it">
          <el-input placeholder="请输入备注" v-model="ruleForm.it"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>
<script>
  import PubSub_Ware from 'pubsub-js'
  export default {
    data() {
      return {
        FormValue_Ware:false,
        ruleForm: {
          site:'',
          id:'',
          country:'',
          address:'',
          city:'',
          z:'',
          code:'',
          it:''

        },
        rules: {
          site: [
            { required: true, message: '站点名称必选', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '仓库代码必填', trigger: 'blur' }
          ],
          country: [
            { required: true, message: '国家代码必选', trigger: 'blur' }
          ]

        }
      };
    },
    async mounted(){
      PubSub_Ware.subscribe('FormValue_Ware',(msg,FormValue_Ware)=>{
        this.FormValue_Ware=FormValue_Ware
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



