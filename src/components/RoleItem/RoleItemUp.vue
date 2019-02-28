<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="roleUpVisible"
      width="850px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="配置角色信息" name="first">
          <div class="transfer" style="margin-left: 80px;margin-bottom: 20px">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              :right-default-checked="usersId"
              filter-placeholder="请输入角色信息"
              v-model="usersId"
              :data="userData"
              @change="transferChange"
              :titles="['用户信息', '已有用户信息']"
              :button-texts="['移除', '添加']">
            </el-transfer>
          </div>
        </el-tab-pane>
        <el-tab-pane label="查看角色拥有的菜单信息" name="second">
          <el-form :model="roleFrom" ref="roleFrom" label-width="80px">
            <div id="role_up_from" style="float: right">
              <el-tree
                show-checkbox
                :data="menuDateList"
                node-key="menuId"
                :default-expanded-keys="noUrlCheckedKeys"
                :default-checked-keys="noUrlCheckedKeys"
                @check="checkChange"
                ref="tree"
                :props="defaultProps">
              </el-tree>
              <el-tooltip content="查看信息" placement="top">
                <el-button icon="el-icon-search" circle @click="lookMenuHead" :disabled="isViewMenu"></el-button>
              </el-tooltip>
              <el-tooltip content="关闭信息" placement="top">
                <el-button icon="el-icon-close" circle @click="cMenuHead" :disabled="isCViewMenu"></el-button>
              </el-tooltip>
              <!-- `checked` 为 true 或 false -->
              <el-checkbox v-model="isMenu">菜单编辑</el-checkbox>
              <span style="padding-left: 25px" v-if="isMenu">
                <el-switch
                  v-model="menuFlg"
                  active-text="添加菜单"
                  inactive-text="删除菜单">
                </el-switch>
                <el-button @click="roleUpVisible = false" circle>取 消</el-button>
                <el-button type="primary" @click="upMenuRole" circle>确 定</el-button>
              </span>
              <el-table
                :data="menuTableTitleData"
                border
                style="width: 50%" v-if="menuHedaFlg">
                <el-table-column prop="name" label="菜单名称" width="120"></el-table-column>
                <el-table-column prop="headName" label="拥有的头信息" width="120"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <MenuHeadItem/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  import {repGetUsers, repMenu, repGetHead, repGetMenus, repAdRole} from '../../api'
  import MenuHeadItem from '../../components/RoleItem/MenuHeadItem/MenuHeadItem'

  export default {
    data () {
      var rNameAdd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'))
        } else if (value.length > 10) {
          return callback(new Error('内容长度不能大于10位'))
        }else{
          callback()
        }
      }
      var rSign = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'))
        }else if (value.length > 10) {
          return callback(new Error('内容长度不能大于10位'))
        }else {
          callback()
        }
      }
      return {
        roleAddFrom: {
          rNameAdd: '',//新增角色名称
          rSign: '',//角色标识
        },
        isMenu: false,
        isEdit: false,
        activeName: 'first',
        isCViewMenu: true,//关闭菜单
        isViewMenu: true,//查看菜单
        menuHedaFlg: false,//table框的隐藏跟显示
        menuFlg: true,//选择删除 还是添加
        urlMenList: [],//获得父节点 menuId
        newMenuList: [],//新的一个数组
        checkedMenuList: [],//获得选中的id 添加或更新菜单
        menuDateList: [],//菜单数据
        menuTableTitleData: [],//菜单对应的头数据
        roleUpVisible: false,
        usersId: [],//用户ID
        userData: [],//用户数据
        noUrlCheckedKeys: [],//进去选中的keys没有URL的
        roleFrom: {
          rName: '',
          uIds: '',
          rId: ''
        },
        defaultProps: {
          children: 'childMenus',
          label: 'name'
        },
        rules: {
          rNameAdd: [
            {validator: rNameAdd, trigger: 'blur'}
          ],
          rSign: [
            { validator: rSign, trigger: 'blur' }
          ]
        }
      }
    },
    async mounted () {
      PubSub.subscribe('roleUp', (msg, roleSelection) => {
        this.noUrlCheckedKeys = []
        this.menuTableTitleData = []
        this.menuHedaFlg = false
        this.isCViewMenu = true
        const roleUpSelection = roleSelection
        if (roleUpSelection.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (roleUpSelection.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.roleUpVisible = true
        roleUpSelection.forEach(item => {
          this.roleFrom['rName'] = item.rName
          this.roleFrom['uIds'] = item.uIds
          this.roleFrom['rId'] = item.rId
        })
        const resultUsers = repGetUsers()
        resultUsers.then((result) => {
          if (result.code === 200) {
            const generateData = _ => {
              const data = []
              const users = result.data
              users.forEach((user, index) => {
                data.push({
                  label: user.userName,
                  key: user.uid,
                  users: users[index]
                })
              })
              return data
            }
            this.userData = generateData()
            if (this.roleFrom.uIds) {
              let userStr = this.roleFrom.uIds.split(',')
              this.usersId = userStr.map(function (data) {
                return +data
              })
            }
            const resultMenuList = repMenu()
            resultMenuList.then((result) => {
              if (result.code === 200) {
                this.menuDateList = result.data
              }
            })
          }
        })
      })
    },
    components: {
      MenuHeadItem
    },
    methods: {
      //通过关键字搜索
      filterMethod (query, item) {
        return item.users.userName.indexOf(query) > -1
      },
      async transferChange (value, direction, movedKeys) {
        const uid = movedKeys
        const rolesId = this.roleFrom.rId
        const rid = {rolesId, uid}
        if (direction === 'left') {
          const resultDel = await repDelRole(rid)
          if (resultDel.code === 200) {
            console.log('删除用户成功~')
          }
        } else {
          const resultAdd = await repAdRole(rid)
          if (resultAdd.code === 200) {
            console.log('添加用户成功~')
          }
        }
      },
      //查看所有菜单头信息
      async lookMenuHead () {
        this.isCViewMenu = false
        this.menuHedaFlg = true
        //获得当前选中的menuIds
        let keys = this.$refs.tree.getCheckedKeys()
        //获得当前半选中的menuIds
        let menuIds = this.$refs.tree.getHalfCheckedKeys()
        keys.forEach((i) => {
          menuIds.push(i)
        })
        const menuId = {menuIds}
        const resultHead = await repGetHead(menuId)
        if (resultHead.code === 200) {
          this.menuTableTitleData = resultHead.data
        }
      },
      //关闭查看信息
      cMenuHead () {
        this.menuTableTitleData = []
      },
      //indeterminate节点的子数有没有被选中
      async checkChange (data, daraArr) {
        console.log(data, daraArr)
        if (daraArr.checkedNodes.length <= 0) {
          this.isViewMenu = true
          this.menuHedaFlg = false
          this.menuTableTitleData = []
        } else {
          this.isViewMenu = false
        }
      },
      //点击确认获得数据
      async upMenuRole () {
        if (confirm('请确认？')) {
          //获得当前选中的menuIds
          let keys = this.$refs.tree.getCheckedKeys()
          //获得当前半选中的menuIds
          let half = this.$refs.tree.getHalfCheckedKeys()
          keys.forEach((i) => {
            half.push(i)
          })
          var menuIds = half.map(item => item).join()
          const rid = this.roleFrom.rId
          const menuFlg = this.menuFlg
          const menuRole = {rid, menuIds, menuFlg}
          const result = await repGetMenus(menuRole)
          if (result.code === 200) {
            this.roleUpVisible = false
          }
        }
      },
      //编辑
      handleClick (row) {
        PubSub.publish('upMenuHead', row)
        console.log(row)
      },
      //递归遍历菜单获取id 点击修改的时候自动勾选
      getMenuId (arr, noUrlMenuList) {
        arr.forEach((item) => {
          //判断是否为空
          if (item.menuId) {
            if (item.url) {
              noUrlMenuList.push(item.menuId)
            } else {
              this.urlMenList.push(item.menuId)
            }
            if (item.childMenus && item.childMenus.length > 0) {
              this.getMenuId(item.childMenus, noUrlMenuList)
            }
          }
        })
        this.noUrlCheckedKeys = noUrlMenuList
      },
      //新增角色信息
      addRoleInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    }
  }
</script>

<style scope lang="scss">
  .roleAdd {
    .el-input__inner {
      width: 200px;
    }
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }

  .el-dialog__body {
    #role_up_from {
      width: 100%;
      .el-tree {
        width: 288px;
        padding-left: 80px;
        float: left;
      }
    }
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

  //自定义transfers组建内容样式
  .el-transfer-panel__body {
    .el-transfer-panel__filter.el-input.el-input--small.el-input--prefix {
      width: 168px;
    }
    .el-checkbox-group.el-transfer-panel__list.is-filterable {
      .el-checkbox.el-transfer-panel__item {
        margin-left: 20px;
        display: block;
        font-family: "宋体";
      }
    }
  }

  .el-dialog__header {
    text-align: center;
    background-color: #e8e8e8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    .el-dialog__title {
      font-family: "宋体";
      font-size: 20px;
    }
  }

  //表单关闭
  .el-dialog__headerbtn {
    background-color: #F56C6C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 20px;
    height: 20px;
  }

  //表单边框
  .el-dialog {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }


</style>
