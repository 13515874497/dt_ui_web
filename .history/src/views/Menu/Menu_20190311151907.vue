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
        :default-expand-all="false"
        :expand-on-click-node="false"
        :props="defaultProps"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label}}</span>
          <span>
            <el-button v-if="!data.url" type="text" size="mini" @click="() => append(data)">
              <i class="el-icon-plus"></i>
            </el-button>
            <el-button type="text" size="mini" @click="() => update(data)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              v-if="!data.childMenus || (data.childMenus && !data.childMenus.length)"
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
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

    <!-- 点击编辑按钮打开菜单编辑弹框 -->
    <el-dialog v-if="editingMenu.data" title="提示" :visible.sync="editingMenu.isShow" width="75%" center>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="菜单信息" name="first">
          <el-form ref="form" :model="editingMenu.data" label-width="80px">
            <el-form-item label="菜单名称">
              <el-input v-model="editingMenu.data.name" placeholder="公共资料"></el-input>
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="editingMenu.data.url" placeholder="请输入监管方式简称"></el-input>
            </el-form-item>
            <el-form-item label="图标" class="icon-card">
              <el-card
                v-for="icon in iconOptions"
                :key="icon.iId"
                :body-style="{ padding: '0px',textAlign:'center'}"
                shadow="hover"
                :class="{'is-hover-shadow':false}"
              >
                <i :class="icon.icon" style="font-size:20px"></i>
              </el-card>
            </el-form-item>
            <el-form-item>
              <el-button @click="editingMenu.isShow = false">取 消</el-button>
              <el-button type="primary" @click="updateMenu">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane
          style="min-width:600px"
          v-if="editingMenu.data.url"
          label="字段信息"
          class="field-tree"
          name="second"
          @click="getField"
        >
          <el-row>
            <el-col :span="12">
              <el-tree
                show-checkbox
                :data="menu.tableData"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                draggable
                :allow-drop="allowDrop"
                @node-drop="handleDrop"
                @check="treeCheck"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ data.headName }}</span>
                  <span>
                    <el-button type="text" size="mini" @click="() => editField(data)">
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" size="mini" @click="() => removeField(data)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </el-col>
          </el-row>
          <AddDelUpBtn :edit="edit" :del="del" :save="save" :recording="recording" :sort="sort"   :showSortBtn="showSortBtn"/>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 字段列表 =>  修改 -->
    <el-dialog title="编辑字段" :visible.sync="editDialogFormVisible">
      <Form :formItems="formItems" :formData="data_field"></Form>

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
import {
  repUpMenuInfo,
  repMenu,
  repHead,
  repGetHeadList,
  icons,
  upHeadSort
} from "../../api";
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
      editingMenu: {
        isShow: false,
        data: null
      },
      data: null, //菜单列表选中的数据对象
      data_field: {}, //字段列表选中的数据对象
      cols: null,
      iconOptions: [],
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
      showSortBtn: false, //是否显示字段排序的按钮
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
      //字段表头
      formItems: [
        {
          label: "name",
          key: "name",
          type: "input-str",
          required: false
        },
        {
          label: "topType",
          key: "topType",
          type: "input-str",
          required: true
        },
        // {
        //   label: "menuId",
        //   key: "menuId",
        //   type: "input-number",
        //   required: true,
        //   disabled: true
        // },
        {
          label: "topOrder",
          key: "topOrder",
          type: "input-str",
          required: false
        },
        {
          label: "isFixed",
          key: "isFixed",
          type: "input-switch-number",
          required: true,
          activeValue: 1,
          inactiveValue: 0
        },
        {
          label: "inputType",
          key: "inputType",
          type: "input-number",
          required: true,
          placeholder: "0:String, 1:int, 2:Data, 3,statusOption, 4:timeLine"
        },
        {
          label: "isRef",
          key: "isRef",
          type: "input-switch-number",
          required: true,
          activeValue: 1,
          inactiveValue: 0
        }
      ],
      defaultProps: {
        //转换参数
        children: "childMenus",
        label: "name"
      },
      //引入菜单表头的数据
      introList: [],
      
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
      this.iconOptions = result.data;
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
    //编辑菜单后点击确定
    updateMenu(){
      this.editingMenu.isShow = false;
      console.log(this.editingMenu.data);
      
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
    //菜单列表 => 编辑
    async update(data) {
      this.editingMenu.data = data;
      this.editingMenu.isShow = true;
      this.activeName = "first";
      console.log(data);
      // let menuId = data.menuId;
      // let res = await repHead(menuId);
      // if (res.code == 200) {
      //   this.menu.tableData = res.data;
      // }
      // console.log(res);
      
      
    },
    //菜单列表 => 编辑 => 字段信息
    getField(){
      let menuId = this.editingMenu.data.menuId;
      let res = await repHead(menuId);
      if (res.code == 200) {
        this.menu.tableData = res.data;
      }
      console.log(res);
      this.activeName = "first";
    },

    formatter(row, column) {
      return row.address;
    },

    //字段tree被选中
    treeCheck(dataAll, data) {
      console.log(dataAll);
      console.log(data);
      this.checkedNodes = data.checkedNodes;
    },
    //修改隐藏框
    edit() {
      console.log("修改");
      // 显示编辑用户对话框
      if (this.checkedNodes.length > 1) {
        Message({
          showClose: true,
          message: "点击修改时只能选中一项",
          type: "error"
        });
        return;
      }
      this.editField(this.checkedNodes[0]);
      // this.editDialogFormVisible = true;
    },
    //编辑字段
    editField(data) {
      console.log("编辑字段");
      console.log(data);
      this.data_field = data;
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
      

     
      if (this.introList.length) {
        this.IntroDialogFormVisible = true;
        return
      };
      let res = await repGetHeadList();
      console.log(res);
      if (res.code == 200) {
        this.introList = res.data;
         this.IntroDialogFormVisible = true;
      } else {
        Message({
          showClose: true,
          message: "获取引用信息失败",
          type: "error"
        });
      }
    },
    async sort(){
      console.log('保存排序接口');
      let res = await upHeadSort(this.sortedAjaxObj,'修改排序成功');
      console.log(res);
      
      // if(res.code == 200){
      //    Message({
      //     showClose: true,
      //     message: "修改排序成功",
      //     type: "success"
      //   });
      //   this.showSortBtn = false;
      // }else {
      //    Message({
      //     showClose: true,
      //     message: res.message,
      //     type: "error"
      //   });
      // }
    },
     //拖拽跟踪 防止拖到内部
    allowDrop(draggingNode, dropNode, type) {
      if (type == "inner") return false;
      return true;
    },

    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log(111222);

      console.log(draggingNode);
      console.log(dropNode);
      console.log(dropType);
      console.log(ev);
      console.log(this.menu.tableData);
      let data = this.menu.tableData.map((item, index) => {
        return {
          id: item.id,
          topOrder: item.topOrder,
          index: index,
          menuId: item.menuId
        };
      });
      console.log(data);
      this.sortedAjaxObj =  {
        mId: this.editingMenu.data.menuId,
        sort: data
      };
      this.showSortBtn = true;
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
    },

   
  }
};
</script>

<style lang="scss" scoped>
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
.field-tree .custom-tree-node {
  cursor: move;
}
.icon-card .el-card {
  display: inline-block;
  padding: 0 14px;
  cursor: pointer;
}
.icon-card .el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
  border: 1px solid #409eff;
}
.icon-card .el-card {
  margin-right: 10px;
}
</style>

