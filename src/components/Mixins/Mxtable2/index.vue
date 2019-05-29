<template>
  <main>
    <!--表格上方查询条件-->
    <section id="printCheck" class="clearfix" v-if="showQuery && tableTitle.length">
      <el-row :gutter="20">
        <el-col :span="4">
          <Query2 :tableTitle="tableTitle" @getValue="getValue"></Query2>
        </el-col>
        <el-col :span="16">
          <inputQuery
            @changeQuery="setQuery"
            :tableTitle="tableTitle"
            :selectedIds="queryIds"
            :querySuggestionsConfig="data"
            :querySuggestionsMethod="queryPage"
          ></inputQuery>
        </el-col>
        <el-col :span="4">
          <SearchReset @search="search" @reset="reset"></SearchReset>
        </el-col>
      </el-row>
    </section>
    <!--table表格-->
    <section>
      <Table
        :tableData="data.tableData"
        :tableTitle="tableTitle_show"
        v-on:checkboxValue="checkboxValue"
        v-if="tableTitle.length"
        v-loading="loading"
        :mode="2"
      />
      <div v-if="tableTitle.length" class="control">
        <!-- <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/> -->
        <OperateBtn :operateList="operateList"></OperateBtn>
        <!--分页-->
        <Pagination :data="data" v-on:pageData="pagination" :disabled="loading"/>
      </div>
    </section>
    <!-- 新增 -->
    <section>
      <el-dialog :title="`新增 ${page.name}`" :visible.sync="add.visible" width="90%">
        <Mx2Interface
          :titles="formItems"
          :data="add.checkedData"
          :customField="customField"
          :customField_table="customField_table"
          :editable_field="editable_field"
          :parentKey="parentKey"
          :radios="subField"
          @giveForm="getForm"
          @giveTable="getTable"
          @passData="passData_add"
        ></Mx2Interface>
        <span slot="footer" class="dialog-footer">
          <el-button @click="add.visible = false">取 消</el-button>
          <el-button type="primary" @click="send_add(true,true)">确 定</el-button>
        </span>
      </el-dialog>
    </section>

    <!-- 修改 -->
    <section>
      <el-dialog :title="'修改 '+page.name" :visible.sync="update.visible" width="90%">
        <!-- <Form :formItems="formItems" :formData="data_field" @giveFormData="getFormData_update"></Form> -->
        <!-- <Form
          key="修改"
          :formItems="formItems"
          :formData="update.formData"
          @giveFormData="getFormData_update"
          @giveForm="getForm"
          @giveTable="getTable"
          :rule="rule"
          :customField="update.customField"
        ></Form>-->
         <Mx2Interface
          :titles="formItems"
          :data="update.checkedData"
          :customField="customField"
          :customField_table="customField_table"
          :editable_field="editable_field"
          :parentKey="parentKey"
          :radios="subField"
          @giveForm="getForm"
          @giveTable="getTable"
          @passData="passData_add"

          type="update"
        ></Mx2Interface>

        <div slot="footer" class="dialog-footer">
          <el-button @click="update.visible = false">取 消</el-button>
          <el-button type="primary" :disabled="!update.data" @click="send_update">保 存</el-button>
        </div>
      </el-dialog>
    </section>
    <!-- 表格字段筛选 -->
    <section>
      <PopoverFilterFields :data="tableTitle" @hideField="hideField"></PopoverFilterFields>
      <!-- <div class="el-button fieldShow el-button--primary is-plain"></div> -->
    </section>
  </main>
</template>
<script>
import Query2 from "@/components/ElementUi/Query2";
import InputQuery from "@/components/ElementUi/InputQuery";
import SearchReset from "@/components/ElementUi/SearchReset";
import message from "@/utils/Message";
import pUtils from "@/utils/PageUtils";
import Pagination from "@/components/ElementUi/Pagination";
import Table from "@/components/ElementUi/Table";
import AddDelUpButton from "@/components/ElementUi/AddDelUpButton";
import OperateBtn from "@/components/ElementUi/OperateBtn";
import PopoverFilterFields from "@/components/ElementUi/PopoverFilterFields";
import { deepClone } from "@/utils/Arrays";
import requestAjax from "@/api/requestAjax";
import Mx2Interface from "./Mx2-Interface";
export default {
  data() {
    return {
      mode: 2,
      page: {
        name: this.$route.params.name
      },
      loading: false,
      queryIds: [],
      showQuery: true, //是否显示最上方的查询组件
      tableTitle: [], //表头信息
      tableTitle_show: [],
      multipleSelection: [], //当前表格checkbox选中的[childList,parent]
      origin_tableData: [], // 未处理的表格数据
      data: {
        tableData: [], //表信息

        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25],
        shipNoticeEntry: {
          currentPage: 0,
          pageSize: 10
        }
      },
      // form: null, //当前form表单(新增、修改)绑定的数据
      // form_data_model: null,
      form_editing: "",
      // table: null,//当前可编辑的table
      add: {
        visible: false,
        data: null, //表单返回过来的数据
        isPass: false, //表单验证是否通过
        reset: false, //改变就重置表单 无关false true
        customField: [], //form表单自定义的字段
        checkedData: [true, null, []], //选中的数据[是否是关联的数据(同一个爹),父数据,子数据列表]
        form: null, //绑定的form
        table: null //绑定的table
      },
      primaryKey: "", //提供一个修改、删除时的主键
      rule: {},
      update: {
        visible: false,
        // formData: null,
        data: null,
        isPass: false,
        customField: [],
        checkedData: [true, null, []],
        form: null,
        table: null
      },
      customField: [],
      //在form中不需要填写的
      sysLogNotForm: [
        "statusId",
        // "remark",
        // "status",
        "createDate",
        "createUser",
        "modifyDate",
        "modifyUser",
        "auditDate",
        "auditUser",
        "effectiveDate"
      ],
      //在form中需要填写的
      sysLogForm: ["remark", "status"],
      subField:{}, //有二级字段的表格必须提供这个 如下:
      // subField: {
      //   "1": {
      //     //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
      //     //radio选项  和  点击新增、修改的时候传给后台的key
      //     name: "出货通知单",
      //     key_submit: "salesShipNoticeEntry", //传给后台的key
      //     key_get: "noticeEntryList" //获取时从哪里拿出来
      //   }
      // }
    };
  },
  computed: {
    formItems() {
      return this.tableTitle.filter(item => {
        return !this.sysLogNotForm.includes(item.topType);
      });
    },
    form() {
      switch (this.form_editing) {
        case "add":
          return this.add.form;
          break;
        case "update":
          return this.update.form;
      }
    },
    form_data_model() {
      return (this.form && this.form.data_model) || null;
    },
    table() {
      switch (this.form_editing) {
        case "add":
          console.log(this.add.table);
          return this.add.table;
          break;
        case "update":
          return this.update.table;
      }
    },
    table_table_data() {
      return (this.table && this.table.table_data) || null;
    }
  },
  components: {
    Pagination,
    Table,
    AddDelUpButton,
    OperateBtn,
    Query2,
    InputQuery,
    SearchReset,
    PopoverFilterFields,
    Mx2Interface
  },
  methods: {
    setQuery($event) {
      let query = $event[0];
      for (let key in query) {
        let value = query[key];
        this.data[key] = value;
      }
    },
    //获得input框里的id列表
    getValue(val) {
      this.queryIds = val;
    },
    //table按钮选择 传参
    checkboxValue: function(val) {
      this.multipleSelection = val;
    },

    //点击查询获得table的值
    async search() {
      this.pagination(this.data);
    },
    queryPage(data) {
      // 提供一个查询分页的接口 例如:
      // return findByListProduct(data);
    },
    //封装分页请求
    async pagination(data) {
      let _data = { ...data };
      delete _data.tableData;
      this.loading = true;
      const res = await this.queryPage(_data);

      this.loading = false;
      if (res.code === 200) {
        //对表格数据进行处理
				console.log(res)
        this.origin_tableData = JSON.parse(JSON.stringify(res.data.dataList));
        pUtils.handlerTableData(res, data,this.subField);
      }
    },
    reset() {
      //触发下表头变更 让子组件初始化
      this.tableTitle = [...this.tableTitle];
      // this.queryIds = [];
    },
    getForm($event) {
      switch (this.form_editing) {
        case "add":
          this.add.form = $event[0];
          break;
        case "update":
          this.update.form = $event[0];
          break;
      }
    },
    getTable($event) {
      switch (this.form_editing) {
        case "add":
          this.add.table = $event[0];
          break;
        case "update":
          this.update.table = $event[0];
          break;
      }
    },
    //根据勾选的表头字段id去隐藏对应字段
    hideField($event) {
      let list = $event[0];
      if (!list) {
        return;
      } else {
        this.tableTitle_show = this.tableTitle.filter(item => {
          return !list.includes(item.id);
        });
      }
    },
    handlerFormData(data) {
      data.systemLogStatus = {};
      for (let key in data) {
        if (this.sysLogForm.includes(key)) {
          data.systemLogStatus[key] = data[key];
          delete data[key];
        }
      }
    },
    //对选中的数据进行校验
    checkVerifyHandler() {
      let self = this;
      let val = this.multipleSelection;
      let result = [];
      if (!val.length) {
        result = [true, null, [], []];
      } else {
        let id = val[0][this.primaryKey]; //选中的父id必须相同
        if (id == undefined) {
          message.errorMessage("未提供主键或主键错误");
          result[0] = false;
        } else {
          let isOneParent = val.every(item => {
            //判断选中的条目是否是同一个父对象
            return item[self.primaryKey] === id;
          });
          result[0] = isOneParent;
          if (!isOneParent) {
            message.errorMessage("不能多选非关联的数据");
          } else {
            result[1] = this.origin_tableData.find(item => {
              return item[self.primaryKey] === id;
            });
            result[2] = val;
            result[3] = this.data.tableData.filter(item => {
              return item[self.primaryKey] === id;
            });
          }
        }
      }
      return result;
    },
    openDialog_add() {
      console.log("新增");

      console.log(this.checkVerifyHandler());
      let result = this.checkVerifyHandler();
      if (!result[0]) return;

      this.form_editing = "add";
      this.add.visible = true;
      this.add.checkedData = result;
    },
    passData_add($event) {
      console.log($event);

      this.add.isPass = $event[0];
      this.add.data = $event[1];
    },
    // getFormData_add($event) {
    //   console.log($event);
    //   this.add.isPass = $event[0];
    //   this.add.data = $event[2];
    //   this.handlerFormData(this.add.data);
    // },
    //需要提供一个新增的接口
    ajax_add(data) {},
    async send_add(isClose, isReset) {
      // isClose: 是否关闭 isReset：是否重置
      if (!this.add.isPass) {
        message.errorMessage("验证未通过");
        return;
      }
      let res = await this.ajax_add(this.add.data);
      if (res.code === 200) {
        message.successMessage(res.msg);
        this.search();
        if (isClose) {
          this.add.visible = false;
        }
        if (isReset) {
          this.resetForm_add();
        }
      } else {
        message.errorMessage(res.msg);
      }
      console.log(res);
    },
    openDialog_update() {
      // console.log("修改");
      // if (this.multipleSelection.length == 0) {
      //   message.infoMessage("必须选中一条数据");
      //   return;
      // } else if (this.multipleSelection.length > 1) {
      //   message.infoMessage("只能选中一条数据");
      //   return;
      // }
      // this.update.formData = this.multipleSelection[0];
      // this.update.visible = true;
      // this.form_editing = "update";
      let result = this.checkVerifyHandler();
      if (!result[0]) return;

      this.form_editing = "update";
      this.update.checkedData = result;
      this.update.visible = true;
    },
    getFormData_update($event) {
      console.log($event);

      this.update.isPass = $event[0];

      this.update.data = $event[2];

      this.update.data[this.primaryKey] = $event[1][this.primaryKey];

      this.update.data.statusId = $event[1].statusId;

      this.update.data.version = $event[1].version;

      this.handlerFormData(this.update.data);
    },
    ajax_remove(data) {},
    openDialog_remove() {
      if (this.multipleSelection.length < 1) {
        message.infoMessage("需要选中一条以上的数据");
        return;
      }
      let thisIds = [],
        statusIds = [],
        version = [];
      this.multipleSelection.forEach(item => {
        thisIds.push(item[this.primaryKey]);
        item.statusId != undefined && statusIds.push(item.statusId);
        version.push(item.version);
      });
      let data = {
        thisIds: thisIds.join(","),
        version: version.join(",")
      };
      console.log(data);
      if (statusIds.length) {
        data.statusIds = statusIds.join(",");
      }
      message
        .messageBox_confirm("是否确认删除")
        .then(() => {
          let res = this.ajax_remove(data).then(res => {
            console.log(res);
            if (res.code === 200) {
              message.successMessage(res.msg);
              this.search();
            } else {
              message.errorMessage(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    //需要提供一个修改的接口
    ajax_update(data) {},
    async send_update() {
      let res = await this.ajax_update(this.update.data);
      console.log(res);
      if (res.code == 200) {
        message.successMessage(res.msg);
        this.search();
        this.update.visible = false;
      } else {
        message.errorMessage(res.msg);
      }
    },
    // close_add($event) {
    //   this.add.visible = !$event[0];
    // },
    //reset值发生改变即重置表单
    resetForm_add() {
      this.add.reset = !this.add.reset;
    },
    initOperateBtn() {
      let self = this;
      this.operateList = [
        //对已上传的文件进行操作的按钮列表
        {
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          label: "新增",
          fn() {
            self.openDialog_add();
          }
        },
        {
          type: "success",
          icon: "el-icon-edit",
          label: "修改",
          fn() {
            self.openDialog_update();
          }
        },
        {
          type: "danger",
          icon: "el-icon-delete",
          label: "删除",
          fn() {
            self.openDialog_remove();
          }
        },
        {
          type: "warning",
          icon: "",
          label: "删除记录",
          fn() {
            self.openDialog_removeRecord();
          }
        }
      ];
    }
  },
  async created() {
    this.initOperateBtn();
    this.tableTitle =
      (await requestAjax.requestGetHead(this.$route.params.id)) || [];
    this.pagination(this.data);
    this.tableTitle_show = [...this.tableTitle];
    this.add.customField = deepClone(this.customField);
    this.update.customField = deepClone(this.customField);
  },
  async mounted() {}
};
</script>


<style lang="scss" scoped>
main {
  position: relative;
  padding-right: 7px;
}
#printCheck {
  width: 100%;
  // height: 30px;
  position: relative;
  margin-bottom: 25px;
}
.control {
  margin-top: 20px;
}
.form-content {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 15px;
}
// .fieldShow {
//   position: absolute;
//   right: -9px;
//   top: 0;
//   bottom: 0;
//   margin: auto 0;
//   height: 68px;
//   width: 23px;
//   writing-mode: tb-rl;
//   padding: 5px;
//   transform: perspective(100px) rotateY(-30deg);
// }
// .fieldShow::before {
//   content: "字段信息"; /*用伪元素来生成一个矩形*/
//   position: absolute;
//   top: 0;
//   right: 2px;
//   bottom: 0;
//   left: 0;
//   z-index: 1;
//   transform: perspective(100px) rotateY(30deg);

// }
</style>
