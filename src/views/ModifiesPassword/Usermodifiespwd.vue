<template>

    <div class="div-two">
      <div class="register-box" >
        <div style="width: 390px;margin: 0 auto;">
          
          <p class="register_pwd">新密码</p> 
          <el-input class="input register_input" type="pwd"  placeholder="请输入密码" v-focus
                    prefix-icon="iconfont icon_dt-suo" v-model="form.pwd">
          </el-input> 

          <p class="register_pwd">确认密码</p>
            <el-input class="input register_input" type="pwd" placeholder="请确认密码" v-focus
                    prefix-icon="iconfont icon_dt-suo" v-model="form.checkPass">
          </el-input>

          <div style="margin-top: 60px">
            <el-button type="primary" class="loading" @click="register">确定</el-button>    
          </div>
   
        </div>
      </div>
    </div>
</template>

<script>
import { register } from "../../api/index.js";
export default {
  data() {
    return {
      form: {
        pwd: "",
        checkPass: ""
      }
    };
  },
  methods: {
   async register() {
      if (this.form.pwd === "" || this.form.checkPass === "") {
        alert("请输入用户名或密码");
      } else {
        // console.log('hello')
        const uInfo = {
          pwd: this.form.pwd,
          userName: this.getCookie("name")
        };
        const res = await register(uInfo);
        console.log(res)
        if(res.code === 200){
        alert('修改密码成功')
        this.$router.replace('/login')
        }
      }
    },
    }
};
</script>

<style scoped lang="scss">
.div-two {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  -ms-transform-origin-x: -50%;
  -ms-transform-origin-y: -50%;
}

.register-box {
  background-color: #ffffff;
  width: 430px;
  height: 500px;
  margin: auto auto;
  display: flex;
}

//没有边框的样式
.register_input {
  .el-input__inner {
    width: 390px !important;
    padding-left: 50px !important;
    font-size: 15px !important;
    border-top: 0px !important;
    border-left: 0px !important;
    border-right: 0px !important;
  }
}

.register_name {
  margin-top: 50px;
  font-size: 14px;
  width: 390px !important;
}

.register_pwd {
  margin-top: 30px;
  font-size: 14px;
  width: 390px !important;
}

.register {
  text-align: center;
  font-size: 39px;
}

.loading {
  width: 390px !important;
  border-radius: 25px !important;
}
</style>



