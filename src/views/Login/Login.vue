<template>
  <div :style="body_height">
    <div class="div-one">
      <div class="login-box" v-show="isLogin">
        <div style="width: 390px;margin: 0 auto;">
          <div class="login">
            <img src="./img/logo.png">
          </div>
          <p class="login_name">用户名</p>
          <el-input v-model="userName" class="login_input" placeholder="请输入账号"
                    prefix-icon="iconfont icon_dt-icon_zhanghao"></el-input>
          <p class="login_pwd">密码</p>
          <el-input class="input login_input" v-model="passWord" type="password" placeholder="请输入密码" v-focus
                    prefix-icon="iconfont icon_dt-suo" @keyup.enter.native="Login"></el-input>
          <div style="margin-top: 60px">
            <el-button type="primary" class="loading" @click="Login" :disabled="isLanding">登陆</el-button>
            <div style="text-align: center;padding-top: 20px">
              <el-checkbox v-model="rememberMe" style="padding-left: 20px">自动登陆 <span>(一周内)</span></el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {repLoginUser} from '../../api'
  import message from '../../utils/Message'
  import login_intercept from '../../utils/login_intercept'
  import loading from '../../utils/loading'

  export default {
    data () {
      return {
        body_height: {height: ''},
        userName: '',
        passWord: '',
        isLanding: false,//控制 账号跟密码输入款要有value 才能登陆
        isLogin: true, // <!--登录-->
        rememberMe: false
      }
    },
    mounted () {
      if (this.userName === '' || this.passWord === '') {
        this.isLanding = true
        return
      }
      this.isLanding = false
    },
    created () {
      this.hh()
    },
    watch: {
      'userName': function () {
        if (this.userName === '' || this.passWord === '') {
          this.isLanding = true
          return
        }
        this.isLanding = false
      },
      'passWord': function () {
        if (this.userName === '' || this.passWord === '') {
          this.isLanding = true
          return
        }
        this.isLanding = false
      }
    },
    methods: {
      //获取屏幕尺寸
      async hh () {
        let View = this.getViewportSize()
        this.body_height.height = View.height + 'px'
      },
      async Login () {
        let loadingInstance = loading.loading_dom('登陆中', 'body')
        const userName = this.userName
        const pwd = this.passWord
        const rememberMe = this.rememberMe
        const users = {userName, pwd, rememberMe}
        //login_intercept.intercept(loadingInstance)
        //成功执行后续
        if (userName && pwd) {
          const result = await repLoginUser(users)
          if (result.code === 200) {
            const uData = result.data
            this.setCookie('token', uData.token, 7)
            this.setCookie('name', uData.user.name, 7)
            // // 同步记录用户信息
            // this.$store.dispatch('recordUser', uData)
            // 去个主界面
            this.$router.replace('/index')
            loadingInstance.close()
          } else {
            message.messageNotDError(result.msg, '登陆失败')
            loadingInstance.close()
          }
          loadingInstance.close()
        }
        else {
          message.messageNotDError('账号或密码不能为空~', '登陆失败')
          loadingInstance.close()
        }
        loadingInstance.close()
      },
    }
  }
</script>

<style scope lang="scss">
  .div-one {
    width: 100%;
    height: 100%;
    display: flex;
    /*background:url(./img/ReportServer.png) no-repeat*/
  }

  .login-box {
    background-color: #ffffff;
    width: 430px;
    height: 500px;
    margin: auto auto;
    display: flex;
    border-radius: 15px !important;
  }

  //没有边框的样式
  .login_input {
    .el-input__inner {
      width: 390px !important;
      padding-left: 50px !important;
      font-size: 15px !important;
      border-top: 0px !important;
      border-left: 0px !important;
      border-right: 0px !important;
    }
  }

  .login_name {
    margin-top: 50px;
    font-size: 14px;
    width: 390px !important;
  }

  .login_pwd {
    margin-top: 30px;
    font-size: 14px;
    width: 390px !important;
  }

  .login {
    text-align: center;
    font-size: 39px;
  }

  .loading {
    width: 390px !important;
    border-radius: 25px !important;

  }
</style>
