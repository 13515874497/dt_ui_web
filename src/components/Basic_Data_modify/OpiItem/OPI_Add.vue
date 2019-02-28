<template>
  <el-dialog title="产品信息" :visible.sync="FormValue_OPI" width="900px" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
      <el-col :span="8" >
        <el-form-item label="产品名称:" prop="name">
          <el-input placeholder="请输入产品名称" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="产品SKU:" prop="product">
          <el-input placeholder="请输入产品SKU" v-model="ruleForm.product"></el-input>
        </el-form-item>
        <el-form-item label="宽(CM):" prop="W">
          <el-input placeholder="请输入产品类别名称" v-model="ruleForm.W"></el-input>
        </el-form-item>
        <el-form-item label="毛重(KG):" prop="mk">
          <el-input placeholder="请输入产品毛重" v-model="ruleForm.mk"></el-input>
        </el-form-item>
        <el-form-item label="生产周期:" prop="cycle">
          <el-input placeholder="请输入生产周期" v-model="ruleForm.cycle"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="it">
          <el-input placeholder="请输入备注" v-model="ruleForm.it"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8" >
        <el-form-item label="规格型号:" prop="spec">
          <el-input placeholder="请输入产品类别名称" v-model="ruleForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="产品类别" prop="products">
          <el-select v-model="ruleForm.products" placeholder="请选择">
            <el-option label="类别一" value="1"></el-option>
            <el-option label="类别二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="高(CM):" prop="H">
          <el-input placeholder="请输入产品高(CM)" v-model="ruleForm.H"></el-input>
        </el-form-item>
        <el-form-item label="体积(m³):" prop="tk">
          <el-input placeholder="请输入产品体积(m³)" v-model="ruleForm.tk"></el-input>
        </el-form-item>
        <el-form-item label="运输周期:" prop="time">
          <el-input placeholder="请输入运输周期" v-model="ruleForm.time"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-col>

      <el-col :span="8" >
        <el-form-item label="产品编号" prop="id">
          <el-input placeholder="请输入产品编号" v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="长(CM):" prop="L">
          <el-input placeholder="请输入产品类别名称" v-model="ruleForm.L"></el-input>
        </el-form-item>
        <el-form-item label="净重(kg):" prop="jk">
          <el-input placeholder="请输入净重" v-model="ruleForm.jk"></el-input>
        </el-form-item>
        <el-form-item label="最小起订量:" prop="min">
          <el-input placeholder="请输入最小起订量" v-model="ruleForm.min"></el-input>
        </el-form-item>
        <el-form-item label="检验周期:" prop="time2">
          <el-input placeholder="请输入最小起订量" v-model="ruleForm.min"></el-input>
        </el-form-item>
      </el-col>


    </el-form>
  </el-dialog>
</template>
<script>
  import PubSub_OPI from 'pubsub-js'
  export default {
    data() {
      return {
        FormValue_OPI:false,
        ruleForm: {
          name:'',
          product:'',
          W:'',
          mk:'',
          cycle:'',
          it:'',
          spec:'',
          products:'',
          H:'',
          tk:'',
          time:'',
          id:'',
          L:'',
          jk:'',
          min:'',
          time2:'',
        },
        rules: {
          name: [
            { required: true, message: '产品名称必填', trigger: 'blur' }
          ],
          product: [
            { required: true, message: '产品SKU必填', trigger: 'blur' }
          ],
          spec: [
            { required: true, message: '规格型号必填', trigger: 'blur' }
          ],
          products: [
            { required: true, message: '产品类别必填', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '产品代码必填', trigger: 'blur' }
          ],

        }
      };
    },
    async mounted(){
      PubSub_OPI.subscribe('saveFormValue_OPI',(msg,FormValue_OPI)=>{
        this.FormValue_OPI=this.FormValue_OPI
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
<style scoped lang="scss">

</style>



