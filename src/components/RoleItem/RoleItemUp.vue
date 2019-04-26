<template>
  <div>
    <el-dialog title="提示" :visible.sync="roleUpVisible" width="780px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="配置角色信息" name="first">
          <div class="transfer">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              :right-default-checked="usersId"
              filter-placeholder="请输入角色信息"
              v-model="usersId"
              :data="userData"
              @change="transferChange"
              :titles="['用户信息', '已有用户信息']"
              :button-texts="['移除', '添加']"
            ></el-transfer>
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
                :props="defaultProps"
              ></el-tree>
              <el-tooltip content="查看信息" placement="top">
                <el-button
                  icon="el-icon-search"
                  circle
                  @click="lookMenuHead"
                  :disabled="isViewMenu"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="关闭信息" placement="top">
                <el-button icon="el-icon-close" circle @click="cMenuHead" :disabled="isCViewMenu"></el-button>
              </el-tooltip>
              <!-- `checked` 为 true 或 false -->
              <el-checkbox v-model="isMenu">菜单编辑</el-checkbox>
              <span style="padding-left: 25px" v-if="isMenu">
                <!-- <el-switch v-model="menuFlg" active-text="添加菜单" inactive-text="删除菜单"></el-switch> -->
                <el-button @click="roleUpVisible = false" circle>取 消</el-button>
                <el-button type="primary" @click="upMenuRole" circle>确 定</el-button>
              </span>
              <el-table :data="menuTableTitleData" border style="width: 50%" v-if="menuHedaFlg">
                <el-table-column prop="mName" label="菜单名称" width="120"></el-table-column>
                <el-table-column
                  prop="headName"
                  label="拥有的头信息"
                  width="120"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="配置店铺" name="shop">
          <div class="transfer">
            <el-transfer
              filterable
              filter-placeholder="请输入店铺名称"
              v-model="shop_exist"
              :data="shops"
              :titles="['全部店铺', '已有店铺']"
              :button-texts="['移除', '添加']"
            ></el-transfer>
            <el-button type="primary" class="saveBtn" @click="shopSave" :disabled="isShopSave()">保存</el-button>
          </div>

          <!-- <el-tree :data="shopTree" show-checkbox node-key="id" ref="shopTree"></el-tree> -->
        </el-tab-pane>
        <el-tab-pane label="配置站点" name="site"></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <MenuHeadItem @moved="refreshTabel"/>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import message from "@/utils/Message";
import {
  repGetUsers,
  roleMenu,
  repMenu,
  repGetHead,
  repGetMenus,
  repAdRole,
  repDelRole,
  selectShopList,
  selectSiteList,
  saveShopRole,
  selectArea //
} from "@/api";
import MenuHeadItem from "@/components/RoleItem/MenuHeadItem/MenuHeadItem";

export default {
  data() {
    var rNameAdd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      } else if (value.length > 10) {
        return callback(new Error("内容长度不能大于10位"));
      } else {
        callback();
      }
    };
    var rSign = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      } else if (value.length > 10) {
        return callback(new Error("内容长度不能大于10位"));
      } else {
        callback();
      }
    };
    return {
      roleAddFrom: {
        rNameAdd: "", //新增角色名称
        rSign: "" //角色标识
      },
      isMenu: false,
      isEdit: false,
      activeName: "first",
      isCViewMenu: true, //关闭菜单
      isViewMenu: true, //查看菜单
      menuHedaFlg: false, //table框的隐藏跟显示
      // menuFlg: true, //选择删除 还是添加
      urlMenList: [], //获得父节点 menuId
      newMenuList: [], //新的一个数组
      checkedMenuList: [], //获得选中的id 添加或更新菜单
      menuDateList: [], //菜单数据
      menuTableTitleData: [], //菜单对应的头数据
      roleUpVisible: false,
      usersId: [], //用户ID
      userData: [], //用户数据
      noUrlCheckedKeys: [], //进去选中的keys没有URL的
      roleFrom: {
        rName: "",
        uIds: "",
        rid: ""
      },

      defaultProps: {
        children: "childMenus",
        label: "mName"
      },
      rules: {
        rNameAdd: [{ validator: rNameAdd, trigger: "blur" }],
        rSign: [{ validator: rSign, trigger: "blur" }]
      },
      menuIds: [], //当前表格中要查看的菜单id

      data: null, //当前选中项的数据
      shopTree: [],
      shops: [], //全部的店铺
      shop_exist: [], //已有的店铺Id
      shop_exist_cache: []
    };
  },
  watch: {
    activeName(val) {
      switch (val) {
        case "shop":
          this.initShop();
          break;
        case "site":
          break;
      }
    },
    data(val) {
      console.log(val);
      if (!val.sIds) {
        this.shop_exist = [];
        this.shop_exist_cache = [...this.shop_exist];
        return;
      }
      this.shop_exist = val.sIds.split(",");
      this.shop_exist_cache = [...this.shop_exist];
    }
  },
  async mounted() {
    PubSub.subscribe("roleUp", (msg, roleSelection) => {
      this.noUrlCheckedKeys = [];
      this.menuTableTitleData = [];
      this.menuHedaFlg = false;
      this.isCViewMenu = true;
      if (roleSelection.length <= 0) {
        message.errorMessage("必须选中一条修改");
        return;
      } else if (roleSelection.length >= 2) {
        message.errorMessage("修改只能选中一条");
        return;
      }
      this.roleUpVisible = true;
      console.log(22222222);
      console.log(this.data === roleSelection[0]);

      this.data = roleSelection[0];

      this.roleFrom["rName"] = this.data.rName;
      this.roleFrom["uIds"] = this.data.uIds;
      this.roleFrom["rid"] = this.data.rid;
      const resultUsers = repGetUsers();

      resultUsers.then(result => {
        console.log(result);

        if (result.code === 200) {
          const generateData = _ => {
            const data = [];
            const users = result.data;
            users.forEach((user, index) => {
              data.push({
                label: user.userName,
                key: user.uid,
                users: users[index]
              });
            });
            return data;
          };
          this.userData = generateData();
          if (this.roleFrom.uIds) {
            let userStr = this.roleFrom.uIds.split(",");
            this.usersId = userStr.map(function(data) {
              return +data;
            });
          }
          repMenu().then(result => {
            if (result.code === 200) {
              this.menuDateList = result.data;
            }
          });
          roleMenu({ rid: this.roleFrom.rid }).then(res => {
            this.getMenuId(res.data, this.noUrlCheckedKeys);
          });
        }
      });
    });
  },
  components: {
    MenuHeadItem
  },
  methods: {
    //通过关键字搜索
    filterMethod(query, item) {
      return item.users.userName.indexOf(query) > -1;
    },
    async transferChange(value, direction, movedKeys) {
      const uid = movedKeys;
      const rolesId = "" + this.roleFrom.rid;
      const rid = { rolesId, uid };
      if (direction === "left") {
        const resultDel = await repDelRole(rid);
        if (resultDel.code === 200) {
          console.log("删除用户成功~");
        }
      } else {
        const resultAdd = await repAdRole(rid);
        if (resultAdd.code === 200) {
          console.log("添加用户成功~");
        }
      }
    },
    //查看所有菜单头信息
    async lookMenuHead() {
      this.isCViewMenu = false;
      this.menuHedaFlg = true;

      //获得当前选中的节点对象
      let sel_nodes = this.$refs.tree.getCheckedNodes();
      // 筛选没有url的并返回menuId的数组
      this.menuIds = sel_nodes
        .filter(item => {
          return item.url;
        })
        .map(item => item.menuId);

      this.refreshTabel();
    },
    //刷新表格信息
    async refreshTabel() {
      const resultHead = await repGetHead({ menuIds: this.menuIds });
      if (resultHead.code === 200) {
        console.log(resultHead);

        this.menuTableTitleData = resultHead.data;
      }
    },
    //关闭查看信息
    cMenuHead() {
      this.menuTableTitleData = [];
    },
    //indeterminate节点的子数有没有被选中
    async checkChange(data, daraArr) {
      if (daraArr.checkedNodes.length <= 0) {
        this.isViewMenu = true;
        this.menuHedaFlg = false;
        this.menuTableTitleData = [];
      } else {
        this.isViewMenu = false;
      }
    },
    //点击确认获得数据
    async upMenuRole() {
      if (confirm("请确认？")) {
        //获得当前选中的menuIds
        let checkedKeys = this.$refs.tree.getCheckedKeys();
        let halfKeys = this.$refs.tree.getHalfCheckedKeys();
        let keys = checkedKeys.concat(halfKeys);
        if (!keys.length) return;
        //获得当前半选中的menuIds
        // let half = this.$refs.tree.getHalfCheckedKeys();
        // keys.forEach(i => {
        //   half.push(i);
        // });
        var menuIds = keys.map(item => item).join();
        const rid = this.roleFrom.rid;
        // const menuFlg = this.menuFlg;
        const menuRole = { rid, menuIds };
        console.log(menuRole);
        const result = await repGetMenus(menuRole);
        if (result.code === 200) {
          this.roleUpVisible = false;
        }
      }
    },
    //编辑
    handleClick(row) {
      PubSub.publish("upMenuHead", row);
    },
    // //递归遍历菜单获取id 点击修改的时候自动勾选
    // getMenuId(arr, noUrlMenuList) {
    //   arr.forEach(item => {
    //     //判断是否为空
    //     if (item.menuId) {
    //       if (item.url) {
    //         noUrlMenuList.push(item.menuId);
    //       } else {
    //         this.urlMenList.push(item.menuId);
    //       }
    //       if (item.childMenus && item.childMenus.length > 0) {
    //         this.getMenuId(item.childMenus, noUrlMenuList);
    //       }
    //     }
    //   });
    //   this.noUrlCheckedKeys = noUrlMenuList;
    // },
    getMenuId(data, arr) {
      data.forEach(item => {
        // if (item.menuId) {
        if (item.url) {
          arr.push(item.menuId);
        }
        if (item.childMenus && item.childMenus) {
          this.getMenuId(item.childMenus, arr);
        }

        // }
      });
      this.isViewMenu = arr.length ? false : true;
    },
    //新增角色信息
    addRoleInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //初始化 配置店铺
    async initShop() {
      // if (this.shops.length) return;
      //获取全部店铺
      let res = await selectShopList();
      console.log(res);
      if (res.code === 200) {
        this.shops = res.data.map(item => {
          return {
            key: "" + item.shopId,
            label: item.shopName
          };
        });
      }
    },
    //店铺按钮是否可以点击
    isShopSave() {
      console.log(this.shop_exist.join());
      console.log(this.shop_exist_cache.join());

      return this.shop_exist.join() === this.shop_exist_cache.join();
    },
    //店铺发生改变时
    shopChange() {
      console.log(123);
      // let res = saveShopRole({
      //   sIds: this.shop_exist.join(","),
      //   rId: this.data.rid
      // });
      let origin = this.shop_exist_cache;
      let curr = this.shop_exist;
      let add = curr
        .filter(item => {
          return !origin.includes(item);
        })
        .join(",");
      let del = origin
        .filter(item => {
          return !curr.includes(item);
        })
        .join(",");
      add = add ? add : null;
      del = del ? del : null;
      console.log("add:   " + add);
      console.log("del:   " + del);
      return {
        rId: this.data.rid,
        sIds: add,
        delSid: del
      };
    },
    async shopSave() {
      console.log(this.shopChange());
      let res = await saveShopRole(this.shopChange());
      console.log(res);
      if (res.code === 200) {
        this.shop_exist_cache = [...this.shop_exist];
        this.$emit("refresh");
      }
    }
  },
  created() {}
};
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
  // position: relative;
  display: flex;
  justify-content: space-around;
  // flex-direction: row-reverse;
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
  .saveBtn {
    align-self: flex-end;
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
  background-color: #f56c6c;
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
