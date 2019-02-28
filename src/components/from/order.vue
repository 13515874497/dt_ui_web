<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" >

            <el-form-item label="站点名称" prop="site">
                <el-select v-model="ruleForm.site" placeholder="请选择">
                    <el-option label="类别一" value="1"></el-option>
                    <el-option label="类别二" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="原TYPE:" prop="old">
                <el-input placeholder="请输入原TYPE" v-model="ruleForm.old"></el-input>
            </el-form-item>
            <el-form-item label="新TYPE:" prop="new">
                <el-input placeholder="请输入新TYPE" v-model="ruleForm.new"></el-input>
            </el-form-item>
            <el-form-item label="描述:" prop="depict">
                <el-input placeholder="请输入描述" v-model="ruleForm.depict"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="it">
                <el-input placeholder="请输入描述" v-model="ruleForm.it"></el-input>
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
                    site:'',
                    old:'',
                    new:'',
                    depict:'',
                    it:''
                },
                rules: {
                    site: [
                        { required: true, message: '站点名称必选', trigger: 'blur' }
                    ],
                    old: [
                        { required: true, message: '原TYPE必填', trigger: 'blur' }
                    ],
                    new: [
                        { required: true, message: '新TYPE必填', trigger: 'blur' }
                    ],
                    depict: [
                        { required: true, message: '描述必填', trigger: 'blur' }
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



