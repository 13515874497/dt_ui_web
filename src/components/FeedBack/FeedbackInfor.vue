<template>
    <div class="fbBox">
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="反馈编号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="反馈菜单" prop="menu">
                <el-input v-model="ruleForm.menu"></el-input>
            </el-form-item> 

            <el-form-item label="图片">
                 <el-upload
                    action
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :limit="3">
                    <i class="el-icon-plus"></i>
                </el-upload>

                
                   <img width="100%" :src="dialogImageUrl" alt="">
                  

            </el-form-item>

            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from "axios";
import { BASEURL } from "@/api";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        menu: "",
        desc: ""
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    beforeAvatarUpload(file) {
      let param = new FormData(); // 创建form对象
      param.append("files", file, file.name); // 通过append向form对象添加数据
      console.log(param.get("files")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios.post(BASEURL + "/upload/images", param, config).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.dialogImageUrl = res.data.data[0].url;
        }
      });
    },
  }
};
</script>

