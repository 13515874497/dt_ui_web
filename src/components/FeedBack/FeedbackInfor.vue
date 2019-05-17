<template>
    <div class="fbBox">
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="反馈菜单" prop="menu">
                <el-cascader
                  :options="options"
                  v-model="ruleForm.selectedOptions" 
                  :show-all-levels="true"
                  @change="handleMenu" 
                  ref="cascaderMenu"    
                ></el-cascader>
            </el-form-item>

            <el-form-item label="图片" >
              <div class="imgsBox" v-for="(item, index) in ruleForm.imgList">               　
                 <!-- <img width="100%" :src="ruleForm.dialogImageUrl" alt=""> -->
                 <a href="javascript:;" class="img" >
                   <img :src=item  alt="" style="width:100%;height:100%">
                   <a class="closeIcon" @click="delImg(index)">×</a>
                 </a>
              </div>
            
            </el-form-item>

            <el-form-item label="点击上传" >
                 <el-upload
                    action
                    class="avatar-uploader"
                    :before-upload="beforeAvatarUpload"
                    accept="image/*"
                    >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="描述" prop="reason">
                <el-input type="textarea" v-model="ruleForm.reason"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from "axios";
import { BASE_URL, repMenu, startFee } from "@/api";
import message from "@/utils/Message";
export default {
  data() {
    return {
      ruleForm: {
        reason: "",
        selectedOptions: [],
        imgList: [],
        mName: ""
      },
      options: [],
    };
  },
  methods: {
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
      axios.post(BASE_URL + "/upload/images", param, config).then(res => {
        console.log(res);
        if (res.status == 200) {
          // this.ruleForm.dialogImageUrl= res.data.data[0].url;
          if (this.ruleForm.imgList.length > 2) {
            message.errorMessage("上传图片不能超过3张!");
            return;
          }
          console.log("xiaoyu");
          this.ruleForm.imgList.push(res.data.data[0].url);
        }
      });
    },
    //图片删除
    delImg(index) {
      this.ruleForm.imgList.splice(index, 1);
    },
    //获取菜单
    async getRepMenu() {
      let res = await repMenu();
      console.log(res);
      let batchdata = res.data;
      //valueBatch
      let dataValueBatch = batchdata =>
        batchdata.map(
          ({ menuId, mName, childMenus }) =>
            childMenus
              ? {
                  value: menuId,
                  label: mName,
                  children: dataValueBatch(childMenus)
                }
              : {
                  value: menuId,
                  label: mName
                }
        );
      this.options = dataValueBatch(batchdata);
      // this.ruleForm.selectedOptions=[304,129,130]
      // console.log(this.ruleForm.selectedOptions)
    },
    //
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          let params = {
            imageUrl: this.ruleForm.imgList.join(","),
            reason: this.ruleForm.reason,
            mName: this.ruleForm.mName.join("/")
          };
          startFee(params).then(res => {
            console.log(res);
            if (res.code !== 200) {
              message.errorMessage("保存失败");
              return;
            }
            message.successMessage("保存成功");
            this.ruleForm.reason = "";
            this.ruleForm.imgList = "";
            this.ruleForm.mName = "";
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.mName = "";
    },
    //获取级联选择器中输入框的值
    handleMenu() {
      this.ruleForm.mName = this.$refs["cascaderMenu"].currentLabels; //获取label值
      console.log(this.ruleForm.mName);
    }
  },
  mounted() {
    this.getRepMenu();
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

