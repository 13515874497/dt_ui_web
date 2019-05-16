<template>
    <div class="fbBox">
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="反馈编号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="反馈菜单" prop="menu">
                <el-cascader
                  :options="options"
                  v-model="ruleForm.selectedOptions" 
                  :show-all-levels="true" 
                ></el-cascader>
            </el-form-item>

            <el-form-item label="图片" >
              <div class="imgsBox" v-for="(item, index) in imgList">               　
                 <!-- <img width="100%" :src="ruleForm.dialogImageUrl" alt=""> -->
                 <a href="javascript:;" class="img" >
                   <img :src=item  alt="" style="width:100%;height:100%">
                   <a class="closeIcon" @click="delImg(index)">×</a>
                 </a>
              </div>
            
            </el-form-item>

            <el-form-item label="点击上传" >
                 <el-upload
                    action=""
                    class="avatar-uploader"
                    :before-upload="beforeAvatarUpload"
                    accept="image/*"
                    >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
import { BASEURL,repMenu } from "@/api";
import message from "@/utils/Message";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        desc: "",
        selectedOptions: [],
      },
      imgList: [], 
      options: [],
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
    //图片上传
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
          // this.ruleForm.dialogImageUrl= res.data.data[0].url;
          if (this.imgList.length > 2) {
            message.errorMessage("上传图片不能超过3张!");
            return;
          }
          console.log("xiaoyu");
          this.imgList.push(res.data.data[0].url);
        }
      });
    },
    //图片删除
    delImg(index) {
      this.imgList.splice(index, 1);
    },
    async getRepMenu() {
    let res = await repMenu();
    console.log(res)
    let batchdata = res.data
		//valueBatch
		let dataValueBatch = batchdata  => batchdata .map(({menuId, mName, childMenus}) => (childMenus ? {
					value    : menuId,
					label    : mName,
					children : dataValueBatch(childMenus),
			} : {
					value : menuId,
					label : mName,
			}));
      this.options = dataValueBatch(batchdata);
    },
  },
  mounted(){
    this.getRepMenu()
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  outline: none;
}
.imgsBox {
  width: 148px;
  height: 148px;
  border: burlywood;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px dashed #8c939d;
}
.imgsBox {
  width: 150px;
  height: 150px;
  display: block;
  float: left;
  margin-right: 10px;
}
.img {
  position: relative;
  width: 94px;
  height: 94px;
  line-height: 94px;
}
.img .closeIcon {
  display: none;
}
.imgsBox:hover .img .closeIcon {
  display: block;
  position: absolute;
  right: -2px;
  top: -70px;
  line-height: 1;
  font-size: 22px;
  color: #aaa;
}
</style>

