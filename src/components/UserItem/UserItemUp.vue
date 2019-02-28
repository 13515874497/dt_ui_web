<!--suppress ALL -->
<template>
  <!--隐藏修改from表单-->
  <el-dialog title="用户信息修改" :visible.sync="upFormValue" width="800px">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name="first">
        <div class="transfer" style="margin-left: 80px;margin-bottom: 20px">
          <el-transfer
            filterable
            :filter-method="filterMethod"
            :right-default-checked="rolesId"
            filter-placeholder="请输入角色信息"
            v-model="rolesId"
            @change="transferChange"
            :data="rolesData"
            :titles="['角色信息', '角色信息']"
            :button-texts="['移除', '添加']">
          </el-transfer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色信息" name="second">
        <el-form :model="userForm" ref="userForm" :rules="rules" label-width="92px">
          <template v-for="(title ,index) in tableTitle">
            <el-form-item v-if="title.topType==='uName'" :label="title.headName" style="width: 350px"
                          class="user_margin_left" prop="uName">
              <el-tag>{{userForm.uName}}</el-tag>
            </el-form-item>

            <el-form-item v-if="title.topType==='phone'" :label="title.headName" style="width: 350px"
                          class="state user_margin_left" prop="uMobilePhone">
              <el-input clearable style="width:150px" v-model="userForm.uMobilePhone"></el-input>
            </el-form-item>

            <el-form-item v-if="title.topType==='name'" :label="title.headName" style="width: 200px"
                          class="user_margin_left" prop="name">
              <el-input clearable style="width: 150px" v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="title.headName" v-if="title.topType==='u_eff_date'" prop="effectiveDate"
                          class="date3">
              <div class="block">
                <el-date-picker
                  style="width: 250px"
                  type="datetime"
                  value-format="timestamp"
                  :disabled="isUserFlg"
                  @change="changeSearchForUser" v-model="userForm.effectiveDate">
                </el-date-picker>
                <el-checkbox @change="checkedUser" v-model="userForm.checkedUserAlways" :disabled="isCheFlgUser">用户始终有效
                </el-checkbox>
              </div>
            </el-form-item>
            <el-form-item :label="title.headName" prop="pwdAlwaysInput" v-if="title.topType==='p_eff_date'" class="date3">
              <div class="block">
                <el-date-picker
                  style="width: 250px"
                  type="datetime"
                  value-format="timestamp"
                  :disabled="isAlwaysFlg"
                  @change="blurSearchForAlways" v-model="userForm.pwdAlwaysInput">
                </el-date-picker>
                <el-checkbox @change="checkedAlways" v-model="userForm.checkedPwdAlways" :disabled="isCheFlgAlways">
                  密码始终有效
                </el-checkbox>
              </div>
            </el-form-item>

            <el-form-item v-if="title.topType==='account_status'" :label="title.headName" class="state"
                          prop="accountStatus">
              <el-select v-model="userForm.accountStatus" clearable value="" style="width: 250px">
                <el-option v-for="(item,index) in accountStatusOptions" :key="index" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-form-item label="密码" style="width: 350px;">
            <el-switch
              @change="switchPwd"
              v-model="isPwd"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="isPwd" label="新密码" prop="pwd" class="pwd3">
            <el-input clearable style="width: 250px" v-model="userForm.pwd" type="password" maxlength="20"></el-input>
            <el-checkbox v-model="userForm.checkedUpPwd">首次登陆修改密码</el-checkbox>

          </el-form-item>
          <el-form-item v-if="isPwd" label="确认密码" prop="confirmPwd"
                        class="pwd3">
            <el-input clearable style="width: 250px" v-model="userForm.confirmPwd" type="password"></el-input>
            <el-checkbox v-model="userForm.checkedPwd">密码满足复杂度要求</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="upFormValue = false">取 消</el-button>
            <el-button type="primary" @click="saveUserInfo('userForm')" :disabled="isButton">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  import {
    repHead,
    repFindRoles,
    repUpUserInfo,
    repAdRole,
    repDelRole
  } from '../../api'

  export default {
    data () {
      var name = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error('名字不能为空'))
        } else {
          callback()
        }
      }
      var pwd = (rule, value, callback) => {
        var pwd = /^[A-Za-z0-9]{6,20}$/
        if (this.isPwd === true) {
          if (value === '') {
            callback(new Error('请输入密码'))
          }
          if (this.userForm.checkedPwd === true) {
            if (!pwd.test(value)) {
              callback(new Error('密码规则：6-20位字母或数字组合'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      }
      var confirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.userForm.pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var effectiveDate = (rule, value, callback) => {
        if (this.userForm.checkedUserAlways !== true) {
          if (value === '' || value === null) {
            callback(new Error('必须选择一个时间~'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var pwdAlwaysInput = (rule, value, callback) => {
        if (this.userForm.checkedPwdAlways !== true) {
          if (value === '' || value === null) {
            callback(new Error('必须选择一个时间~'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var uMobilePhone = (rule, value, callback) => {
        if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.userForm.uMobilePhone)) {
          callback(new Error('手机格式不正确'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'first',
        isButton: true, //数据没变化的时候 不能点确定按钮
        tableTitle: [],//表头信息
        upFormValue: false,
        upSelection: [], //更新按钮数组收集
        rolesId: [],//角色id
        rolesData: [],//角色数据
        uRId: {},//点击保存的时候处理的数据
        isCheFlgAlways: false,//密码始终有效 判断标识
        isCheFlgUser: false,//用户始终有效 判断标识
        isAlwaysFlg: false,//密码有效期 判断标识
        isUserFlg: false,//用户有效期 判断标识
        isPwd: false,//是否点开修改密码
        oldUserForm: {}, //老的from表单记录
        userForm: {
          uid: '',//用户id
          uName: '',//账号
          name: '',//用户名
          accountStatus: '',//账号状态
          uMobilePhone: '',//手机
          rName: '',//角色
          rid: '',//角色id
          pwd: '',//密码
          confirmPwd: '',//确认密码
          checkedPwd: false, //密码满足复杂度要求  checked
          checkedUpPwd: false, //首次登陆修改密码修改  checked
          checkedUserAlways: false, //用户始终有效  checked
          checkedPwdAlways: false, //密码始终有效 checked
          pwdAlwaysInput: '', //密码有效期
          effectiveDate: '' //用户有效期
        },
        accountStatusOptions: [{
          id: 0,
          name: '正常'
        }, {
          id: 1,
          name: '冻结'
        }, {
          id: 2,
          name: '禁用'
        }],
        rules: {
          name: [
            {validator: name, trigger: 'blur'}
          ],
          pwd: [
            {validator: pwd, trigger: 'blur'}
          ],
          confirmPwd: [
            {validator: confirmPwd, trigger: 'blur'}
          ],
          effectiveDate: [
            {validator: effectiveDate, trigger: 'blur'}
          ],
          pwdAlwaysInput: [
            {validator: pwdAlwaysInput, trigger: 'blur'}
          ],
          uMobilePhone: [
            {validator: uMobilePhone, trigger: 'blur'}
          ],
        }
      }
    },
    //监视form表单里发生的变化
    watch: {
      //姓名
      name (newValue) {
        this.monitoringChange(newValue, this.oldUserForm.name)
      },
      //手机
      uMobilePhone (newValue) {
        this.monitoringChange(newValue, this.oldUserForm.mobilePhone)
      },
      //账号状态
      accountStatus (newValue) {
        this.monitoringChange(newValue, this.oldUserForm.accountStatus)
      },
      //密码有效期
      pwdAlwaysInput (newValue) {
        this.monitoringChange(newValue, this.oldUserForm.pwdAlwaysInput)
      },
      //用户有效期
      effectiveDate (newValue, oldValue) {
        this.monitoringChange(newValue, this.oldUserForm.effectiveDate)
      }
    },
    //深度监视
    computed: {
      name () {
        return this.userForm.name
      },
      uMobilePhone () {
        return this.userForm.uMobilePhone
      },
      accountStatus () {
        return this.userForm.accountStatus
      },
      pwdAlwaysInput () {
        return this.userForm.pwdAlwaysInput
      },
      effectiveDate () {
        return this.userForm.effectiveDate
      }
    },
    async mounted () {
      //查询获得table表的 头信息
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        this.tableTitle = resultHead.data
      }
      //获得传来的标识 显示 隐藏form
      PubSub.subscribe('upSelection', (msg, upSelection) => {
        //每次点击初始化
        this.isCheFlgAlways = false//密码始终有效 判断标识
        this.isCheFlgUser = false//用户始终有效 判断标识
        this.isAlwaysFlg = false//密码有效期 判断标识
        this.isUserFlg = false//用户有效期 判断标识
        this.userForm.checkedUserAlways = false //用户始终有效  checked
        this.userForm.checkedPwdAlways = false //密码始终有效 checked

        const userSaveSelection = upSelection
        if (userSaveSelection.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (userSaveSelection.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.upFormValue = true
        //将数组转换成对象
        userSaveSelection.forEach(item => {
          //获得老的userFrom对象 到时候比较监听的时候用
          this.oldUserForm = item
          this.userForm['uName'] = item.userName
          this.userForm['name'] = item.name
          this.userForm['rName'] = item.rName
          this.userForm['accountStatus'] = item.accountStatus
          this.userForm['uMobilePhone'] = item.mobilePhone
          this.userForm['uid'] = item.uid
          this.userForm['rid'] = item.rId
          this.userForm['pwdAlwaysInput'] = item.pwdStatus
          this.userForm['effectiveDate'] = item.effectiveDate
        })
        //密码有效期
        if (this.userForm.pwdAlwaysInput === 0) {
          this.userForm.checkedPwdAlways = true
          this.isAlwaysFlg = true
          this.userForm.pwdAlwaysInput = ''
        } else {
          this.userForm.checkedPwdAlways = false
          this.isCheFlgAlways = true
        }
        //用户有效期
        if (this.userForm.effectiveDate === 0) {
          this.userForm.checkedUserAlways = true
          this.isUserFlg = true
          this.userForm.effectiveDate = ''
        } else {
          this.userForm.checkedUserAlways = false
          this.isCheFlgUser = true
        }
        const resultRoles = repFindRoles()
        resultRoles.then((result) => {
          if (result.code === 200) {
            const generateData = _ => {
              const data = []
              const roles = result.data
              roles.forEach((role, index) => {
                data.push({
                  label: role.rName,
                  key: role.rid,
                  roles: roles[index]
                })
              })
              return data
            }
            this.rolesData = generateData()
            if (this.userForm.rid) {
              var roleStr = this.userForm.rid.split(',')
              this.rolesId = roleStr.map(function (data) {
                return +data
              })
            }
          }
        })
      })
    },
    methods: {
      //tabs标签页
      handleClick (tab, event) {
        // console.log(tab, event);
      },
      switchPwd () {
        if (!this.isPwd) {
          this.isButton=true
          this.userForm.pwd = ''//密码
          this.userForm.confirmPwd = ''
          return
        }
        this.isButton=false
      },
      //确认后更新用户信息操作
      async saveUserInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.userForm)
            const resultUserInfo = repUpUserInfo(this.userForm)
            resultUserInfo.then((result) => {
              console.log(resultUserInfo)
              if (result.code === -1) {
                message.errorMessage('你没有权限修改数据')
              } else if (result.code === 200) {
                message.successMessage('更新成功~')
                this.upFormValue = false
              } else {
                message.infoMessage('系统错误~')
              }
            })
          } else {
            message.errorMessage('表单验证不通过')
            return false
          }
        })
      },
      //通过关键字搜索
      filterMethod (query, item) {
        return item.roles.rName.indexOf(query) > -1
      },

      //角色框移动信息
      async transferChange (value, direction, movedKeys) {
        const uid = this.userForm.uid
        const rolesId = movedKeys
        const rid = {rolesId, uid}
        if (direction === 'left') {
          const resultDel = await repDelRole(rid)
          if (resultDel.code === 200) {

          }
        } else {
          const resultAdd = await repAdRole(rid)
          if (resultAdd.code === 200) {
          }
          console.log(resultAdd)
        }
      },
      //获得 checkedAlways flg如果=true 就禁用input 输入框
      checkedAlways (flg) {
        this.isAlwaysFlg = flg === true
      },
      //获得 checkedUser flg如果=true 就禁用input 输入框
      checkedUser (flg) {
        this.isUserFlg = flg === true
      },
      //blurSearchForAlways 失去焦点时 判断值是否为空 如果不为空 锁定按钮
      blurSearchForAlways () {
        this.isCheFlgAlways = !!this.userForm.pwdAlwaysInput
      },
      //blurSearchForUser 失去焦点时 判断值是否为空 如果不为空 锁定按钮
      changeSearchForUser () {
        this.isCheFlgUser = !!this.userForm.effectiveDate
      },
      //封装 监视
      monitoringChange (newValue, value) {
        if (newValue !== value) {
          this.isButton = false
          return
        }
        this.isButton = true
      }
    }
  }
</script>

<style scope lang="scss">
  .changeColor {
    background: #409EFF;
    color: #ffffff;
  }

  .user_margin_left {
    margin-left: 45px;
    font-family: "宋体";
    font-size: 15px;
  }

  //密码修改
  .el-form-item.pwd3 {
    font-family: "宋体";
    font-size: 15px;

    .el-form-item__content {
      .el-checkbox {
        padding-left: 50px;
        color: #F56C6C;
      }
    }
  }

  //有效期
  .el-form-item.date3 {
    .el-form-item__label {
      color: #F56C6C;
      font-family: "宋体";
    }
    .el-form-item__content {
      .block {
        .el-checkbox {
          padding-left: 50px;
          font-family: "宋体";
        }
      }
    }
  }

  //账号状态
  .el-form-item.state {
    font-family: "宋体";
    font-size: 15px;
  }

  //自定义添加转移
  .transfer {
    .el-transfer {
      .el-transfer__buttons {
        width: 150px;
        .el-button.el-button--primary.is-disabled.el-transfer__button.is-with-texts {
          margin-left: 0;
          width: 89px;
          font-family: "宋体";
        }
        .el-button.el-button--primary.el-transfer__button.is-with-texts {
          margin-left: 0;
          width: 89px;
          font-family: "宋体";
        }
      }
    }
  }

</style>
