<template>
  <div class="block">
    <div class="content">
      <span>
        <el-button type="primary" @click="saveMenuInfo">保存</el-button>
      </span>
      <span>
        <el-button type="primary" @click="reset">重置</el-button>
      </span>
      <el-tree
        :data="menuList"
        show-checkbox
        node-key="menuId"
        <!-- :default-expand-all="false" -->
        :expand-on-click-node="false"
        :props="defaultProps"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label}}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              <i class="el-icon-plus"></i>
            </el-button>
            <el-button type="text" size="mini" @click="() => update(data)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">
              <i class="el-icon-delete"></i>
            </el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <el-input v-model="inputMenu" placeholder="请输入菜单名称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMenu">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 点击编辑按钮新增菜单编辑弹框 -->
    <el-dialog v-if="data" title="提示" :visible.sync="updateMenu" width="75%" center>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="菜单信息" name="first">
          <el-form ref="form" :model="data" label-width="80px">
            <el-form-item label="菜单名称">
              <el-input v-model="data.name" placeholder="公共资料"></el-input>
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="data.url" placeholder="请输入监管方式简称"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-select placeholder="请选择图标" v-model="value">
                <el-option
                  v-for="item in options"
                  :key="item.iId"
                  :label="item.icon"
                  :value="item.iId"
                >
                  <i :class="item.icon"></i>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateMenu = false">取 消</el-button>
              <el-button type="primary" @click="updateMenu = false">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="字段信息" name="second">

          <!-- <el-tree
            :data="menuList"
            show-checkbox
            node-key="menuId"
            :default-expand-all="false"
            :expand-on-click-node="false"
            :props="defaultProps"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label}}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">
                  <i class="el-icon-plus"></i>
                </el-button>
                <el-button type="text" size="mini" @click="() => update(data)">
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </span>
            </span>
          </el-tree> -->

          <!-- <Table
            :tableData="menu.tableData"
            :tableTitle="tableTitle"
            v-on:checkboxValue="checkboxValue"
          />-->
          <div>
            <AddDelUpBtn :edit="edit" :del="del" :save="save" :recording="recording"/>
            <!--分页-->
            <Pagination :data="menu" v-on:pageData="pageData"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!--编辑字段信息 -->
    <el-dialog title="编辑字段" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" label-width="80px" ref="editUserForm">
        <el-form-item label="编号" prop="number">
          <el-input v-model="editForm.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司简称" prop="shorter">
          <el-input v-model="editForm.shorter" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标示" prop="mark">
          <el-input v-model="editForm.mark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit('editUserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点击新增菜单 -->
    <el-dialog title="新增菜单表头" :visible.sync="addDialogFormVisible">
      <Form :formItems="formItems"></Form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 引入其他菜单表头 -->
    <el-dialog title="引入其他菜单表头" :visible.sync="IntroDialogFormVisible">
      <Table :tableTitle="tableTitle" :tableData="introList"></Table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="IntroDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="IntroUserSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import storage from "../../utils/storageUtils";
import { repUpMenuInfo, repMenu, repHead, repGetHeadList } from "../../api";
import { icons } from "../../api";
import message from "../../utils/Message";
import Pagination from "../../components/ElementUi/Pagination"; // 分页组件
import AddDelUpBtn from "../../components/ElementUi/AddDelUpBtn"; //增删改组件
import requestAjax from "../../api/requestAjax";
import Table from "../../components/ElementUi/Table";
import { Message } from "element-ui";
let id = 1000; //假菜单ID
export default {
  data() {
    return {
      data: null,
      cols: null,
      options: [],
      value: "",
      userName: "", //读取缓存名字
      addNewMenu: [], //新添加传递到后台的数组
      menuIds: [],
      dataMenu: {}, //点击时获得数据
      inputMenu: "",
      menuList: [],
      resetMenuList: [], //保留一份重置数据
      centerDialogVisible: false,
      tableTitle: [
        {
          headName: "编号",
          topType: "id"
        },
        {
          headName: "ids",
          topType: "ids"
        },
        {
          headName: "名称",
          topType: "headName"
        },
        {
          headName: "name",
          topType: "name"
        },
        {
          headName: "字段名称",
          topType: "topType"
        },
        {
          headName: "menuId",
          topType: "menuId"
        },
        {
          headName: "topOrder",
          topType: "topOrder"
        },
        {
          headName: "状态选项",
          topType: "statusOptions"
        },
        {
          headName: "是否固定",
          topType: "isFixed"
        },
        {
          headName: "类型",
          topType: "inputType"
        }
      ], //表头信息
      isTableTitle: false, //如果table表头的长度是 0
      multipleSelection: [],
      menuTableTitle: {}, //菜单查询到的表头信息
      updateMenu: false, //修改菜单，
      activeName: "first",
      menu: {
        page_sizes: [2, 10, 15, 20, 25],
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 2, //显示最大的页
        tableData: [
          { headName: "报关单编号", topType: "bgd_number" },
          { headName: "xxxx", topType: "bgd_xxxx" },
          { headName: "xxxx2", topType: "bgd_xxxx" }
        ] //表单信息
      },
      // 控制编辑用户对话框显示隐藏
      editDialogFormVisible: false,
      //新增添加菜单显示隐藏
      addDialogFormVisible: false,
      //引入别的菜单表头显示隐藏
      IntroDialogFormVisible: false,
      // 存储编辑的用户信息
      editForm: {
        number: "",
        name: "",
        shorter: "",
        mark: ""
      },
      //新增菜单表头
      formItems: [
        {
          label: "名称",
          key: "name",
          type: "input-str"
        },
        {
          label: "字段名称",
          key: "topType",
          type: "input-str"
        },
        {
          label: "menuId",
          key: "menuId",
          type: "input-number"
        },
        {
          label: "topOrder",
          key: "topOrder",
          type: "input-str"
        },
        {
          label: "是否固定",
          key: "fixed",
          type: "input-switch"
        },
        {
          label: "类型",
          key: "inputType",
          type: "input-number"
        }
      ],
      defaultProps: {
        //转换参数
        children: "childMenus",
        label: "name"
      },
      //
      introList: []
    };
  },
  components: {
    Pagination,
    AddDelUpBtn,
    Table
    // Form
  },
  async mounted() {
    //  this.tableTitle = await requestAjax.requestGetHead(this.$route.params.id);
    //   console.log(this.tableTitle);

    this.userName = this.getCookie("name");
    //读取本地缓存
    const menu = storage.readData(this.userName + "menu");
    this.menuList = menu;
    this.resetMenuList = menu;
    console.log(menu);
  },
  //添加图标
  async created() {
    const result = await icons();
    console.log(result);
    if (result.code === 200) {
      this.options = result.data;
    }
  },
  methods: {
    //添加 菜单
    append(data) {
      this.inputMenu = "";
      console.log(data);
      if (data.url !== null) {
        message.errorMessage("这目录下有url----->不能添加子目录");
        return;
      }
      this.centerDialogVisible = true;
      this.dataMenu = data;
    },
    //设置菜单名称
    addMenu() {
      const newChild = { menuId: ++id, name: this.inputMenu, childMenus: [] };
      if (!this.dataMenu.childMenus) {
        this.$set(this.dataMenu, "childMenus", []);
      }
      this.dataMenu.childMenus.push(newChild);
      //拿到对象
      const menu = { parentId: this.dataMenu.menuId, name: this.inputMenu };
      //插入数组
      this.addNewMenu.push(menu);
      this.centerDialogVisible = false;
    },
    //重置按钮(
    reset() {
      //重置缓存数据
      const resetMenu = storage.readData(this.userName);
      this.menuList = resetMenu;
    },
    //保存按钮
    saveMenuInfo() {
      message
        .messageBox("确认保存")
        .then(() => {
          //如果都是空的 说明没有操作
          if (this.addNewMenu.length === 0 && this.menuIds.length === 0) {
            message.errorMessage("没有任何修改,不需要保存");
            return;
          }
          const newMenu = this.addNewMenu;
          const idsMenu = this.menuIds;
          const menu = { newMenu, idsMenu };
          const resultMenuInfo = repUpMenuInfo(menu);
          resultMenuInfo.then(result => {
            if (result.code === 200) {
              message.successMessage("添加菜单成功");
              //更新成功后-----读取数据库存入缓存
              const resultMenuInfo = repMenu();
              resultMenuInfo.then(item => {
                if (item.code === 200) {
                  //写入缓存
                  console.log("写入缓存");
                  storage.saveData(this.userName + "menu", item.data);
                }
              });
            }
          });
        })
        .catch(() => {
          this.menuList = this.resetMenuList;
          console.log("不保存");
        });
    },
    //删除菜单
    remove(node, data) {
      if (node.childNodes.length > 0) {
        message.messageNotDError("该节点下还有子菜单", "操作错误");
        return;
      }
      const parent = node.parent;
      const children = parent.data.childMenus || parent.data;
      const index = children.findIndex(d => d.menuId === data.menuId);
      children.splice(index, 1);
      //删除数组里的数据
      for (let i = 0; i < this.addNewMenu.length; i++) {
        const item = this.addNewMenu[i];
        if (item.menuId === data.menuId) {
          this.addNewMenu.splice(i, 1);
        }
      }
      //获得删除的菜单ID
      this.menuIds.push(data.menuId);
    },
    //点击编辑 => 字段信息
    async update(data) {
      this.data = data;

      console.log(data);
      let menuId = data.menuId;
      let res = await repHead(menuId);
      if (res.code == 200) {
        this.menu.tableData = res.data;
      }
      console.log(111);

      console.log(res);

      this.updateMenu = true;
    },

    formatter(row, column) {
      return row.address;
    },
    //修改隐藏框
    edit() {
      console.log("修改");
      // 显示编辑用户对话框
      this.editDialogFormVisible = true;
    },
    save() {
      console.log("新增角色");
      this.addDialogFormVisible = true;
    },
    del() {
      console.log("删除");
    },
    //点击引用
    async recording() {
      console.log("引用菜单表头");
      if (this.introList.length) return;

      this.IntroDialogFormVisible = true;
      let res = await repGetHeadList();
      console.log(res);
      if (res.code == 200) {
        this.introList = res.data;
      } else {
        Message({
          showClose: true,
          message: "获取引用信息失败",
          type: "error"
        });
      }
    },
    //分页参数传递
    pageData: function(data) {
      this.pagination(data);
    },
    //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
    checkboxValue(val) {
      this.multipleSelection = val;
    },

    addUserSubmit() {
      console.log(this.menuHead);
      if (this.menuHead == "") {
        alert("请输入菜单表头");
        return;
      }
      this.addDialogFormVisible = false;
      this.tableTitle.push({ headName: this.menuHead });
    }
  }
};
</script>

<style>
.content {
  width: 300px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

