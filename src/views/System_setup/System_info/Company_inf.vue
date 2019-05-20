<template>
  <div>
    <div class="logo_img">
        <img :src="img_Url" v-if="img_Url" style="width:100%;height:100%"/>
    </div>
    <div style="display:flex">
       <span class="left_font">LOGO上传 ：</span>
       <el-upload
         class="avatar-uploader"
         action
         accept="image/png"
         :show-file-list="false"
         :before-upload="beforeAvatarUpload" >
          <div style="border:1px dashed #e3e3e3">
           <img v-if="imageUrl" :src="imageUrl" class="avatar">
           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         </div>
       </el-upload>
    </div>
    <div style="width:500px;margin: 40px auto">
        <span >上传图片必须为png格式,建议大小在200kb以内,宽200px以内,高40-65px</span>
    </div>
    <div>
        <div style="display:flex">
            <span class="left_font">公司名称：</span>
            <div style="width:400px;height:30px;line-height:30px">
              <el-input v-model="input1" placeholder="温州电兔电子商务有限公司"></el-input>
            </div>
        </div>
        <div style="display:flex;margin:30px 0 20px 0">
            <span class="left_font">系统名称：</span>
            <div style="width:400px;height:30px;line-height:30px">
              <el-input v-model="input2" placeholder="信息管理系统"></el-input>
            </div>
        </div>
      </div>
      <div style="width:300px;margin: 80px auto">
        <el-row >
            <el-button type="primary" style="padding:7px 30px;margin-right:15px" @click="preserve">保存</el-button>
            <el-button type="primary" style="padding:7px 30px" @click="cancel">取消</el-button>
        </el-row>
      </div>
   </div>
</template>

<script>
import axios from "axios";
import {getCompanyInfo  ,BASE_URL} from "@/api";
import message from "@/utils/Message";

  export default {
    data(){
      return {
        imageUrl: "",
        input1: "",
        input2:"",
        img_Url:"",
        param: new FormData(),

      }
    },
    methods:{
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.2;

        if (!isJPG) {
          message.errorMessage("上传图片只能是 png 格式!");return;
        }
        if (!isLt2M) {
           message.errorMessage('上传图片大小不能超过 200kb!');return;
        }
         this.param = new FormData();
         this.param.append("files", file, file.name);
         let config = {
                 headers: {
                   "Content-Type": "multipart/form-data"
                 },
          }
         axios.post(BASE_URL +"/upload/images",this.param, config).then(res => {
              console.log(res);
             if(res.status == 200){
                this.imageUrl = res.data.data[0].url;
                this.img_Url = res.data.data[0].url;
                console.log( this.imageUrl)
             }
         });

      },
      async preserve(){
          if(!this.img_Url) {message.errorMessage('LOGO图片不能为空');return;}
          if(!this.input1) {message.errorMessage('公司名称不能为空');return;}
          if(!this.input2) {message.errorMessage('系统名称不能为空');return;}
					//上传的数据
					let params = {"companyName":this.input1,"systemName":this.input2,"logoUrl":this.img_Url,"systemLogStatus":{}};
					let res = await getCompanyInfo(params);
					console.log(res);
					if(res.code !== 200){message.errorMessage('保存失败');return;}
					message. successMessage("保存成功");
					this.input1 = '';
					this.input2 = '';
				
      },
      cancel(){
        this.input1 = '';
        this.input2 = '';
      }
    }
  }
</script>

<style scoped>
.logo_img{
  width:200px;
  height:65px;
  border:1px solid black;
  margin:50px auto
}
.left_font{
    display:inline-block;
    margin:10px 10px 0 25%;
}
.font_p{
  font-size:12px;

}
.el-upload {
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

.el-upload:hover {
    border-color: #e3e3e3;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    display: inline-block;

  }
</style>
