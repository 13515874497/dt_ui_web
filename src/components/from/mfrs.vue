<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="产地:" prop="mfrs">
                <el-input placeholder="请输入产地" v-model="ruleForm.mfrs"></el-input>
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
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    mfrs: '',
                    it:''
                },
                rules: {
                    mfrs: [
                        { required: true, message: '产地必填', trigger: 'blur' }
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