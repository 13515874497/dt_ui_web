<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
            <el-col :span="8" >
                <el-form-item label="商品编码:" prop="id">
                    <el-input placeholder="请输入商品编码" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="有效日期" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>

            </el-col>

            <el-col :span="8" >
                <el-form-item label="不含税价:" prop="price1">
                    <el-input placeholder="请输入采购价格(不含税价)" v-model="ruleForm.price"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="it">
                    <el-input placeholder="请输入备注" v-model="ruleForm.it"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>

            </el-col>

            <el-col :span="8" >
                <el-form-item label="含税价" prop="price2">
                    <el-input placeholder="请输入采购价格(含税价)" v-model="ruleForm.price2"></el-input>
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
                    id:'',
                    date1:'',
                    price1:'',
                    it:'',
                    price2:''
                },
                rules: {
                    id: [
                        { required: true, message: '商品编码必填', trigger: 'blur' }
                    ],
                    date1: [
                        { required: true, message: '日期必选', trigger: 'blur' }
                    ],
                    price1: [
                        { required: true, message: '不含税价必填', trigger: 'blur' }
                    ],
                    price2: [
                        { required: true, message: '含税价必填', trigger: 'blur' }
                    ]

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



