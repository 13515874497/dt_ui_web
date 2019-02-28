<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" >
            <el-col :span="8" >
                <el-form-item label="SKU:" prop="sku">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.sku"></el-input>
                </el-form-item>
                <el-form-item label="站点名称" prop="site">
                    <el-select v-model="ruleForm.site" placeholder="请选择">
                        <el-option label="类别一" value="1"></el-option>
                        <el-option label="类别二" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="长(CM):" prop="L">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.L"></el-input>
                </el-form-item>
                <el-form-item label="净重(KG):" prop="jk">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.jk"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="it">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.it"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" >
                <el-form-item label="子ASIN:" prop="asin">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.asin"></el-input>
                </el-form-item>
                <el-form-item label="商品代码" prop="id">
                    <el-select v-model="ruleForm.id" placeholder="请选择">
                        <el-option label="类别一" value="1"></el-option>
                        <el-option label="类别二" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="宽(CM):" prop="W">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.W"></el-input>
                </el-form-item>
                <el-form-item label="毛重(KG):" prop="mk">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.mk"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-col>

            <el-col :span="8" >
                <el-form-item label="店铺名称" prop="name">
                    <el-select v-model="ruleForm.name" placeholder="请选择">
                        <el-option label="类别一" value="shanghai"></el-option>
                        <el-option label="类别二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理类名" prop="class">
                    <el-select v-model="ruleForm.class" placeholder="请选择">
                        <el-option label="类别一" value="1"></el-option>
                        <el-option label="类别二" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="高(CM):" prop="H">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.H"></el-input>
                </el-form-item>
                <el-form-item label="体积(m³):" prop="tk">
                    <el-input placeholder="请输入产品类别名称" v-model="ruleForm.tk"></el-input>
                </el-form-item>
            </el-col>


        </el-form>

    </el-row>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    sku:'',
                    site:'',
                    L:'',
                    jk:'',
                    it:'',
                    asin:'',
                    id:'',
                    W:'',
                    mk:'',
                    name:'',
                    class:'',
                    H:'',
                    tk:''
                },
                rules: {
                    sku: [
                        { required: true, message: 'SKU必填', trigger: 'blur' }
                    ],
                    site: [
                        { required: true, message: '站点名称必填', trigger: 'blur' }
                    ],
                    asin: [
                        { required: true, message: 'ASIN必填', trigger: 'blur' }
                    ],
                    id: [
                        { required: true, message: '商品代码必填', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '店铺名称必填', trigger: 'blur' }
                    ],
                    class: [
                        { required: true, message: '处理类名必填', trigger: 'blur' }
                    ],

                }
            };
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



