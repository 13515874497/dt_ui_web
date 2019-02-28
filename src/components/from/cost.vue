<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="商品代码" prop="id">
                <el-select v-model="ruleForm.id" placeholder="请选择">
                    <el-option label="类别一" value="1"></el-option>
                    <el-option label="类别二" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申报成本价:" prop="cost">
                <el-input placeholder="请输入成本价" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="有效日期" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
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
                    id:'',
                    cost: '',
                    data1:'',
                    data2:'',
                    it:''
                },
                rules: {
                    id: [
                        { required: true, message: '商品代码必填', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '成本价必填', trigger: 'blur' }
                    ],
                    data1: [
                        { required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    data2: [
                        { required: true, message: '请选择时间', trigger: 'blur' }
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
<style scoped>
    .line{
        text-align: center;
    }
</style>



