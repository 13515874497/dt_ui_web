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
        draggable
        :allow-drop="allowDrop"
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
    <el-dialog
      v-if="editingMenu.data"
      title="提示"
      :visible.sync="editingMenu.isShow"
      width="800px"
      center
    >
      <el-tabs v-model="activeName" type="card" @tab-click="menuTabClick">
        <el-tab-pane label="菜单信息" name="first">
          <el-form ref="form" :model="editingMenu.data" label-width="80px">
            <el-form-item label="菜单名称">
              <el-input v-model="editingMenu.data.mName" placeholder="公共资料"></el-input>
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="editingMenu.data.url" placeholder="请输入监管方式简称"></el-input>
            </el-form-item>
            <el-form-item label="图标" class="icon-card">
              <div class="iconList scrollbar">
                <el-card
                  v-for="icon in iconOptions"
                  :key="icon.iId"
                  :body-style="{ padding: '0px',textAlign:'center'}"
                  shadow="hover"
                  :class="{'is-hover-shadow':false}"
                >
                  <i :class="icon.icon" style="font-size:20px"></i>
                </el-card>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="editingMenu.isShow = false">取 消</el-button>
              <el-button type="primary" @click="upMenu">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane
          style="min-width:500px"
          v-if="editingMenu.data.url"
          label="字段信息"
          class="field-tree"
          name="second"
        >
          <el-row class="field-row">
            <el-col :span="21">
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
                class="tree-content scrollbar"
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
          <AddDelUpBtn
            :edit="edit"
            :del="del"
            :save="save"
            :recording="recording"
            :sort="sort"
            :showSortBtn="showSortBtn"
          />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 字段列表 =>  修改 -->
    <el-dialog title="编辑字段" :visible.sync="editDialogFormVisible">
      <Form :formItems="formItems" :formData="data_field" @giveFormData="getFormData_update" :rule="rule"></Form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="passedData_update">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点击新增 -->
    <el-dialog title="新增字段" :visible.sync="addDialogFormVisible">
      <Form :formItems="formItems" @giveFormData="getFormData_add" :rule="rule"></Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="passedData_add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 引入其他字段 -->
    <el-dialog title="引入其他字段" :visible.sync="IntroDialogFormVisible">
      <el-autocomplete
        placeholder="输入要查询的字段"
        v-model="introList_filter.input"
        :fetch-suggestions="queryIntroList"
        class="introList-search"
      >
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
      </el-autocomplete>

      <el-tree
        :data="introList_filter.data"
        :props="defaultProps_introList"
        show-checkbox
        ref="tree_introList"
        class="tree-content scrollbar"
        @check="treeCheckNodes"
      ></el-tree>
      <!-- <Table :tableTitle="tableTitle" :tableData="introList"></Table> -->

      <div slot="footer" class="dialog-footer">
        <el-button @click="IntroDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="introList_add()" :disabled="dis">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import storage from "@/utils/storageUtils";
import {
  repUpMenuInfo,
  repMenu,
  repHead,
  icons,
  upHeadSort,
  upMenu,
  saveHead,
  upHeadInfo,
  reference,
  saveReference
} from "@/api";
import message from "@/utils/Message";
import Pagination from "@/components/ElementUi/Pagination"; // 分页组件
import AddDelUpBtn from "@/components/ElementUi/AddDelUpBtn"; //增删改组件
import requestAjax from "@/api/requestAjax";
import Table from "@/components/ElementUi/Table";
import Form from "@/components/ElementUi/Form";
import { Message } from "element-ui";
import { DBFieldRepeat } from "@/utils/verify";
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
      rule: {
        headName: [
          {
            required: true,
            type: "string",
            message: "请输入字符",
            trigger: "change"
          },
          {
            validator: DBFieldRepeat, //验证字段在数据库是否冲突
            trigger: "change"
          }
        ],
        topType: [
          {
            required: true,
            type: "string",
            message: "请输入字符",
            trigger: "change"
          },
          {
            validator: DBFieldRepeat, //验证字段在数据库是否冲突
            trigger: "change"
          }
        ]
      },
      multipleSelection: [],
      showSortBtn: false, //是否显示字段排序的按钮
      activeName: "first",
      menu: {
        page_sizes: [2, 10, 15, 20, 25],
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 2, //显示最大的页
        tableData: [] //表单信息
      },
      // 控制编辑用户对话框显示隐藏
      editDialogFormVisible: false,
      //新增添加菜单显示隐藏
      addDialogFormVisible: false,
      //引入别的菜单表头显示隐藏
      IntroDialogFormVisible: false,
      //新增字段的所有类型 字段表头
      formItems: [
        {
          headName: "字段名称",
          topType: "headName",
          // type: "input-str",
          inputType: 0,
          // statusOptions:
          required: true
        },
        {
          headName: "字段英文名称",
          topType: "topType",
          inputType: 0,
          required: true
        },
        // {
        //   headName: "菜单ID",
        //   topType: "menuId",
        //   inputType: 1000,
        //   required: true,
        //   disabled: true
        // },

        {
          headName: "是否固定表头",
          topType: "fixed",
          inputType: 5,
          required: true,
          statusOptions: [
            {
              id: true,
              name: "是"
            },
            {
              id: false,
              name: "否"
            }
          ]
        },
        {
          headName: "inputType",
          topType: "inputType",
          inputType: 1,
          required: true,
          statusOptions: [
            {
              id: 0,
              name: "字符型"
            },
            {
              id: 1,
              name: "数值型"
            },
            {
              id: 2,
              name: "日期型"
            },
            {
              id: 3,
              name: "下拉框"
            },
            {
              id: 4,
              name: "起止日期"
            }
          ]
        },
        {
          headName: "是否可被引用",
          topType: "reference",
          inputType: 5,
          required: true,
          statusOptions: [
            {
              id: true,
              name: "是"
            },
            {
              id: false,
              name: "否"
            }
          ]
        },
        {
          headName: "topOrder",
          topType: "topOrder",
          inputType: 0,
          required: false,
          defaultValue: "1"
        }
      ],
      defaultProps: {
        //转换参数
        children: "childMenus",
        label: "mName"
      },
      defaultProps_introList: {
        children: null,
        label: "headName"
      },
      //引入菜单表头的数据
      introList: [],
      introList_filter: {
        input: "", //输入框中的数据
        autocomplete: [], //用于筛选的数据
        data: [] //根据用户输入筛选符合的字段
      },
      dis: false
    };
  },
  components: {
    Pagination,
    AddDelUpBtn,
    Table,
    Form
  },
  watch: {
    "introList_filter.input": function(val) {
      this.introList_filter.data = this.introList.filter(item => {
        return item.headName.indexOf(val) > -1;
      });
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
      const newChild = { menuId: ++id, mName: this.inputMenu, childMenus: [] };
      if (!this.dataMenu.childMenus) {
        this.$set(this.dataMenu, "childMenus", []);
      }
      this.dataMenu.childMenus.push(newChild);

			console.log(this.dataMenu);
      //拿到对象
      const menu = { parentId: this.dataMenu.menuId, mName: this.inputMenu };
      //插入数组
      this.addNewMenu.push(menu);
			console.log(this.addNewMenu);
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
        message.messageNotiDError("该节点下还有子菜单", "操作错误");
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
    update(data) {
			console.log(data);
      this.editingMenu.data = { ...data };
      this.editingMenu.isShow = true;
      this.activeName = "first";
    },
    //菜单列表 => 编辑 =>确定
    async upMenu() {
      this.editingMenu.isShow = false;
      let { menuId, mName, icon, url } = this.editingMenu.data;
      let res = await upMenu({ menuId, mName, icon, url });
      console.log(res);
      if (res.code == 200) {
        this.upStorageMenu();
      }
    },
    async upStorageMenu() {
      let res = await repMenu();
      if (res.code === 200) {
        storage.saveData(this.userName + "menu", res.data);
        this.menuList = res.data;
        this.resetMenuList = res.data;
      }
    },
    //菜单列表 => 编辑 => 菜单信息 | 字段信息
    async menuTabClick(tab) {
      console.log(tab);
      switch (tab.label) {
        case "字段信息":
          let menuId = this.editingMenu.data.menuId;
          console.log(menuId);
          if (menuId == this.cacheField) return;
          this.getRepHead();
          break;
      }
    },
    async getRepHead() {
      let menuId = this.editingMenu.data.menuId;
      console.log(menuId);
      // if (menuId == this.cacheField) return;
      let res = await repHead(menuId);
      console.log(res);
      if (res.code == 200) {
        this.menu.tableData = res.data;
        this.cacheField = menuId;
      }
    },

    //菜单信息  字段tree被选中
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

    //点击引用选中字段信息做长度限制
    treeCheckNodes(dataAll, data) {
      console.log(dataAll);
      console.log(data);
      this.checkedNodes = data.checkedNodes;
      console.log(data.checkedNodes);

      if (this.checkedNodes.length >= 10) {
        Message({
          showClose: true,
          message: "引用字段过多,须小于10条",
          type: "error"
        });
        //当超过限制时，将确定按钮禁用
        this.dis = true;
      } else {
        this.dis = false;
      }
    },
    //点击引用
    async recording() {
      console.log("引用菜单表头");
      console.log(this.introList);
      if (this.introList.length) {
        this.IntroDialogFormVisible = true;
        return;
      }
      console.log(this.editingMenu);

      let res = await reference({ menuId: this.editingMenu.data.menuId });
      console.log(res);
      if (res.code == 200) {
        this.introList = res.data;
        this.IntroDialogFormVisible = true;
        this.introList_filter.autocomplete = this.introList.map(item => {
          return { value: item.headName };
        });
        this.introList_filter.data = this.introList;
      }
    },
    //根据输入 提示引用字段
    queryIntroList(queryString, cb) {
      function createFilter() {
        return fieldList.filter(item => {
          return (
            item.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
          );
        });
      }
      let fieldList = this.introList_filter.autocomplete;
      console.log(fieldList);

      let result = queryString ? createFilter() : fieldList;
      cb(result);
    },
    //引用完成后发起请求
    introList_add() {
      let checked = this.$refs.tree_introList.getCheckedNodes();
      console.log(checked);
      if (!checked.length) {
        Message({
          showClose: true,
          message: "未选择",
          type: "error"
        });
        return;
      }
      // if (checked.length >= 10) {
      //   Message({
      //     showClose: true,
      //     message: "引用字段过多,需小于10个",
      //     type: "error"
      //   });
      //   return;
      // }
      console.log(checked);

      let mId = this.editingMenu.data.menuId;
      let data = checked.map(item => {
        return {
          id: item.id,
          menuId: item.menuId + "," + mId,
          version: item.version
        };
      });

      saveReference({ headList: data });
      console.log(data);
    },
    async sort() {
      console.log("保存排序接口");
      let res = await upHeadSort(this.sortedAjaxObj);

      console.log(res);
    },
    //拖拽跟踪 防止拖到内部
    allowDrop(draggingNode, dropNode, type) {
      if (type == "inner") return false;
      return true;
    },
    //处理拖拽
    handleDrop(draggingNode, dropNode, dropType, ev) {
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
          menuId: item.menuId,
          version: item.version
        };
      });
      console.log(data);
      this.sortedAjaxObj = {
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
    //对某个菜单进行新增字段 实时接收用户编辑中的字段
    getFormData_add($event) {
      // debugger;
      let isPass = $event[0];
      let data = $event[1];
      let modifyData = $event[2];
      //新增的字段数据
      console.log(isPass, data, modifyData);

      this.add_field = {
        data,
        isPass
      };
    },
    //对某个菜单进行新增字段 如果验证通过则向后台发起请求
    async passedData_add() {
      if (this.add_field && this.add_field.isPass) {
        let TableHead = {
          menuId: this.editingMenu.data.menuId,
          ...this.add_field.data
        };
        console.log(TableHead);
        let res = await saveHead(TableHead);
        console.log(res);
        this.addDialogFormVisible = false;
      } else {
        Message({
          showClose: true,
          message: "验证未通过",
          type: "error"
        });
      }
    },
    getFormData_update($event) {
      let isPass = $event[0];
      let data = $event[1];
      let modifyData = $event[2];
      modifyData.version = data.version;
      modifyData.menuId = data.menuId;
      modifyData.id = data.id;
      this.update_field = {
        data: modifyData,
        isPass
      };
      console.log($event[1]);

      console.log(this.update_field);
    },
    async passedData_update() {
      if (this.update_field && this.update_field.isPass) {
        let TableHead = {
          // menuId: this.editingMenu.data.menuId,
          ...this.update_field.data
        };
        console.log(TableHead);
        let res = await upHeadInfo(TableHead);
        console.log(res);
        if (res.code === 200) {
          message.successMessage(res.msg);
          this.getRepHead();
        } else {
          message.errorMessage(res.msg);
        }
        this.editDialogFormVisible = false;
      } else {
        Message({
          showClose: true,
          message: "验证未通过",
          type: "error"
        });
      }
    }
  },
  //添加图标
  async created() {
    const result = await icons();
    console.log(result);
    if (result.code === 200) {
      this.iconOptions = result.data;
    }
  },
  async mounted() {
    this.userName = this.getCookie("name");
    //读取本地缓存
    const menu = storage.readData(this.userName + "menu");
    this.menuList = menu;
    this.resetMenuList = menu;
    console.log(menu);
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
.field-tree {
  .custom-tree-node {
    cursor: move;
  }
}
.tree-content {
  max-height: 450px;
  overflow-y: auto;
}
.field-row {
  margin-bottom: 15px;
}
.iconList {
  border: 1px solid #dcdfe6;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  min-height: 40px;
  border-radius: 5px;
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
.introList-search {
  margin-bottom: 16px;
}
</style>

