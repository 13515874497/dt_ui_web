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
      />
      <div v-if="tableTitle.length" class="control">
        <!-- <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/> -->
        <OperateBtn :operateList="operateList"></OperateBtn>
        <!--分页-->
        <Pagination :data="data" v-on:pageData="pagination" :disabled="loading"/>
      </div>
    </section>
    <!-- 新增 -->
    <section >
      <el-dialog :title="'新增 '+page.name" :visible.sync="add.visible">
        <!-- <Form :formItems="formItems" :formData="data_field" @passData="passData_update"></Form> -->
        <Form
          key="新增"
          :formItems="formItems"
          @passData="passData_add"
          @giveDataModel="getDataModel"
          :rule="rule"
          :reset="add.reset"
          :customField="customField"
        ></Form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="send_add(true)">保 存</el-button>
          <el-button @click="send_add(false)">保存并复制</el-button>
          <el-button @click="send_add(false,true)">保存并继续</el-button>
          <el-button @click="resetForm_add">重 置</el-button>
          <el-button @click="add.visible = false">取 消</el-button>
        </div>
      </el-dialog>
    </section>

    <!-- 修改 -->
    <section >
      <el-dialog :title="'修改 '+page.name" :visible.sync="update.visible">
        <!-- <Form :formItems="formItems" :formData="data_field" @passData="passData_update"></Form> -->
        <Form
          key="修改"
          :formItems="formItems"
          :formData="update.formData"
          @passData="passData_update"
          @giveDataModel="getDataModel"
          :rule="rule"
          :customField="customField"
        ></Form>

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

import requestAjax from "@/api/requestAjax";
import PubSub from "pubsub-js";
export default {
  data() {
    return {
      page: {
        name: this.$route.params.name
      },
      loading: false,
      queryIds: [],
      showQuery: true, //是否显示最上方的查询组件
      tableTitle: [], //表头信息
      tableTitle_show: [],
      multipleSelection: [], //更新按钮数组收集
      data: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25]
      },
      selection: [], //多选框选择的
      form_data_model: null, //当前form表单(新增、修改)绑定的数据
      add: {
        visible: false,
        data: null,
        isPass: false,
        reset: false
      },
      primaryKey: "", //提供一个修改、删除时的主键
      rule: {},
      update: {
        visible: false,
        formData: null,
        data: null,
        isPass: false
      },
      customField: null,
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
      sysLogForm: ["remark", "status"]
    };
  },
  computed: {
    formItems() {
      return this.tableTitle.filter(item => {
        return !this.sysLogNotForm.includes(item.topType);
      });
    },
    //当前打开的新增或修改的form表单
    // ref_form() {
    //   if (this.add.visible && this.$refs.form_add) {
    //     return this.$refs.form_add;
    //   } else if (this.update.visible && this.$refs.form_update) {
    //     return this.$refs.form_update;
    //   }
    // },
    // //通过ref拿到当前form(新增、修改)绑定的数据
    // ref_form_model() {
    //   if (this.ref_form) {
    //     return this.ref_form.data_model;
    //   }
    // },
  },
  components: {
    Pagination,
    Table,
    AddDelUpButton,
    OperateBtn,
    Query2,
    InputQuery,
    SearchReset,
    PopoverFilterFields
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
      // console.log( this.queryIds)
    },
    //table按钮选择 传参
    checkboxValue: function(value) {
      this.multipleSelection = value;
      console.log(this.multipleSelection);
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
      console.log(data);
      let _data = { ...data };
      delete _data.tableData;
      this.loading = true;
      const res = await this.queryPage(_data);
      console.log(res);
      this.loading = false;
      if (res.code === 200) {
        //赋值 然后显示
        pUtils.pageInfo(res, data);
      }
    },
    reset() {
      //触发下表头变更 让子组件初始化
      this.tableTitle = [...this.tableTitle];
      // this.queryIds = [];
    },
    getDataModel($event){
      this.form_data_model = $event[0];
    },
    //根据勾选的表头字段id去隐藏对应字段
    hideField($event) {
      let list = $event[0];
      console.log(list);
      if (!list) {
        return;
      } else {
        this.tableTitle_show = this.tableTitle.filter(item => {
          return !list.includes(item.id);
        });
      }
       console.log(this.tableTitle_show);
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
    openDialog_add() {
      console.log("新增");
      this.add.visible = true;
    },
    passData_add($event) {
      console.log($event);
      // this.form_data_model = $event[1];
      this.add.isPass = $event[0];
      this.add.data = $event[2];
      this.handlerFormData(this.add.data);
    },
    //需要提供一个新增的接口
    ajax_add(data) {},
    async send_add(isClose, isReset) {
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
      console.log("修改");
      if (this.multipleSelection.length == 0) {
        message.infoMessage("必须选中一条数据");
        return;
      } else if (this.multipleSelection.length > 1) {
        message.infoMessage("只能选中一条数据");
        return;
      }
      this.update.formData = this.multipleSelection[0];
      this.update.visible = true;
    },
    passData_update($event) {
      console.log($event);
      // this.form_data_model = $event[1];
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
        (item.statusId != undefined) && statusIds.push(item.statusId);
        version.push(item.version)
      });
      let data = {
        thisIds: thisIds.join(","),
        version: version.join(',')
      };
      console.log(data);
      if(statusIds.length){
        data.statusIds = statusIds.join(",")
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
    },
  },
  async created() {
    this.initOperateBtn();
    this.tableTitle =
      (await requestAjax.requestGetHead(this.$route.params.id)) || [];
    this.pagination(this.data);
    this.tableTitle_show = [...this.tableTitle];
  },
  async mounted() {
    
  }
};
</script>


<style lang="scss" scoped>
main {
  position: relative;
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
  overflow-y: scroll;
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
