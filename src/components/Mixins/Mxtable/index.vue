<template>
  <main>
    <section id="printCheck" class="clearfix" v-if="showQuery && tableTitle.length">
      <el-row :gutter="24">
        <el-col :span="4">
          <Query2 :tableTitle="tableTitle" :tValList="tValList" @getValue="getValue"></Query2>
        </el-col>
        <el-col :span="16">
          <inputQuery
            @changeQuery="setQuery"
            :tableTitle="tableTitle"
            :selectedIds="queryIds"
            :inputData="inputData"
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
        @changeTitle="changeTitle"
        :tableData="data.tableData"
        :tableTitle="tableTitle_show"
        v-on:checkboxValue="checkboxValue"
        v-if="tableTitle.length"
        v-loading="loading"
      />
      <div>
        <div v-if="tableTitle.length" class="control dis_fex" style="margin-right: 10px;">
          <!-- <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/> -->
          <OperateBtn :operateList="operateList"></OperateBtn>
        </div>
        <div class="dis_fex" style="margin-top: 20px;">
          <el-button type="primary" style size="mini" @click="saveSolution">新增查询方案</el-button>
          <el-button type="primary" style size="mini" @click="changeSolution">修改当前方案</el-button>
          <div
            style="display: inline-block;position: relative;"
            v-for="(item, index) in programmeDataList"
          >
            <el-button
              type="primary"
              style="padding-right: 25px;margin-right: 5px;"
              size="mini"
              @click="chaxun(index)"
              :key="index"
            >方案{{item.programName}}</el-button>
            <span
              style="position: absolute;right: 8px;top: 8px;background-color:white ;color: #AAAAAA;border-radius: 8px;"
              class="el-icon-circle-close"
              @click="deleteProgramme(item)"
            ></span>
          </div>
          <!-- <el-select v-model="programmeDataList" placeholder="请选择活动区域">
						<el-option label="item.programName" value="item.programName" ></el-option>
						
          </el-select>-->
        </div>
        <div v-if="tableTitle.length" class="control dis_fex">
          <!--分页-->
          <Pagination :data="data" v-on:pageData="pagination" :disabled="loading"/>
        </div>
      </div>
    </section>
    <!-- 新增 -->
    <section>
      <el-dialog :title="'新增 '+page.name" :visible.sync="add.visible">
        <!-- <Form :formItems="formItems" :formData="data_field" @passData="passData_update"></Form> -->
        <Form
          key="新增"
          :formItems="formItems"
          @passData="passData_add"
          @giveForm="getForm"
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
    <section>
      <el-dialog :title="'修改 '+page.name" :visible.sync="update.visible">
        <!-- <Form :formItems="formItems" :formData="data_field" @passData="passData_update"></Form> -->
        <Form
          key="修改"
          :formItems="formItems"
          :formData="update.formData"
          @passData="passData_update"
          @giveForm="getForm"
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
      <PopoverFilterFields
        :data="tableTitle"
        :hiddenFieldsList="hiddenFieldsList"
        @hideField="hideField"
      ></PopoverFilterFields>
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
import PubSub from "pubsub-js";
import { MessageBox } from "element-ui";
import {
  getConfMapUser,
  getUserConfig,
  delUserConfig,
  upUserConfig
} from "@/api";
export default {
  data() {
    return {
      page: {
        name: this.$route.params.name
      },
      tableTitleUp: [], //要上传的拖拽后的新数据
      nowId: "", //修改方案时存入当前要修改的方案configid
      programme: "", //方案名称
      hiddenFieldsList: {}, //隐藏字段对象 传给子组件使用
      hiddenFieldsListA: [], //隐藏字段数组  接收后台返回数组
      query2List: [], //query2input选中数据数组
      inputQueryData: {}, //inputQuery页input填写数据对象
      hiddenFieldsListData: [],
      programmeDataList: [], //所有方案总和
      loading: false,
      queryIds: [],
      showQuery: true, //是否显示最上方的查询组件
      tableTitle: [], //表头信息
      tableTitle_show: [],
      tValList: [], //自动填充query2组件input数据数组
      inputData: {}, //传给子组件用的搜索框内容对象
      multipleSelection: [], //更新按钮数组收集
      data: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25]
        // shipNoticeEntry: {
        //   currentPage: 0,
        //   pageSize: 10,
        //   packingListEntry: {
        //     currentPage: 0,
        //     pageSize: 10
        //   }
        // }
      },
      // form: null, //当前打开的form表单
      // form_data_model: null,
      form_editing: "add",
      add: {
        visible: false,
        data: null,
        isPass: false,
        reset: false,
        customField: [],
        form: null
      },
      primaryKey: "", //提供一个修改、删除时的主键
      rule: {},
      update: {
        visible: false,
        formData: null,
        data: null,
        isPass: false,
        customField: [],
        form: null
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
      sysLogForm: ["remark", "status"]
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
    form_data_model(){
      return this.form && this.form.data_model || {};
    }
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
      // 2019/05/22  下午16:00  新增搜索框内容对象 用来上传  start
      this.inputQueryData = query;
      // 2019/05/22  下午16:00  新增搜索框内容对象 用来上传  end
      for (let key in query) {
        let value = query[key];
        this.data[key] = value;
      }
    },
    // 2019/05/22  下午16:00  表格拖拽时获取拖拽后数组 目前有问题没有解决 上传用的都是原数组  start
    changeTitle(e) {
      this.tableTitleUp = this.tableTitle;
      // this.tableTitle = e;
      console.log(e);
      console.log(this.tableTitle);
    },
    // 2019/05/22  下午16:00  表格拖拽时获取拖拽后数组 目前有问题没有解决 上传用的都是原数组  end
    // 2019/05/22  下午16:00  新增删除当前方案功能  删除接口未接通 start
    async deleteProgramme(item) {
      // console.log(item);
      // let paramsB = {mid:item.mid,id:item.configId}
      // let res = await delUserConfig(paramsB);
      // console.log(res);
    },
    // 2019/05/22  下午16:00  新增删除当前方案功能 删除接口未接通 end
    // 2019/05/22  下午16:00  新增查询方案功能  查询未完成 start
    chaxun(index) {
      //
      this.tValList = this.programmeDataList[index].queryTwoList;
      this.inputData = this.programmeDataList[index].inputQueryData;
      this.hiddenFieldsList[this.$route.params.id] = this.programmeDataList[
        index
      ].hiddenFieldsList;
      // this.nowId = this.programmeDataList[index].configId;
      console.log(this.programmeDataList[index]);
    },
    // 2019/05/22  下午16:00  新增修改当前方案功能 查询未完成end
    // 2019/05/22  下午16:00  新增修改当前方案功能 修改未完成start
    changeSolution() {
      // MessageBox.prompt('请输入方案名称', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消'
      //   }).then(({ value }) => {
      // 			var reg =  /^\s*$/g;
      // 			if(reg.test(value) || value == null || value == ""){
      // 				message.errorMessage('方案名称不能为空')
      // 				return;
      // 			}else{
      // 				this.programme = value.replace(/\s+/g,"");
      //
      // 				let programmeList = {
      // 					// hiddenFieldsList : this.hiddenFieldsListA,
      // 					// queryTwoList : this.query2List,
      // 					// inputQueryData : this.inputQueryData,
      // 					// programName : this.programme,
      // 					// mid : parseInt(this.$route.params.id),
      // 					// dropTable:this.tableTitleUp,
      // 					// id:this.nowId
      // 				}
      // 				console.log(programmeList)
      //
      // 				upUserConfig(programmeList).then(res=>{
      // 					console.log(res);
      // 					if(res.code == 200){
      // 						message.successMessage('方案修改成功')
      // 					}else{
      // 						message.errorMessage(res.msg)
      // 					}
      // 				})
      //
      // 			}
      //
      //   })
    },
    // 2019/05/22  下午16:00  新增修改当前方案功能 修改未完成start
    // 2019/05/22  下午16:00  新增保存方案功能 start
    saveSolution() {
      MessageBox.prompt("请输入方案名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        var reg = /^\s*$/g;
        if (reg.test(value) || value == null || value == "") {
          message.errorMessage("方案名称不能为空");
          return;
        } else {
          this.programme = value.replace(/\s+/g, "");

          let programmeList = {
            hiddenFieldsList: this.hiddenFieldsListA,
            queryTwoList: this.query2List,
            inputQueryData: this.inputQueryData,
            programName: this.programme,
            dropTable: this.tableTitle,
            mid: parseInt(this.$route.params.id)
          };
          console.log(programmeList);

          getConfMapUser(programmeList).then(res => {
            console.log(res);
            if (res.code == 200) {
              message.successMessage("方案名称保存成功");
            } else {
              message.errorMessage(res.msg);
            }
          });
        }
      });
    },
    // 2019/05/22  下午16:00  新增保存方案功能 end
    //获得input框里的id列表
    getValue(val) {
      this.queryIds = val;
      // 2019/05/22  下午16:00  获取下拉框query2组件内的值 用来上传 start
      this.query2List = val;
      // 2019/05/22  下午16:00  获取下拉框query2组件内的值 用来上传 end
    },
    //table按钮选择 传参
    checkboxValue: function(value) {
      this.multipleSelection = value;
      console.log(this.multipleSelection);
    },
    //点击查询获得table的值
    async search() {
      console.log(this.data);
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
    getForm($event) {
      switch (this.form_editing) {
        case "add":
          this.add.form = $event[0];
          break;
        case "update":
          this.update.form = $event[0];
          break;
      }
      console.log(this.add.form);
      
      // this.form_data_model = this.form.data_model;
    },
    //根据勾选的表头字段id去隐藏对应字段
    hideField($event) {
      let list = $event[0];
      // 2019/05/22  下午16:00  新增一个数组用来接收隐藏字段选择后得到的数组 用来保存方案时上传 start
      this.hiddenFieldsListA = list;
      // 2019/05/22  下午16:00  新增一个数组用来接收隐藏字段选择后得到的数组 用来保存方案时上传 end
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
    openDialog_add() {
      console.log("新增");
      this.form_editing = "add";
      this.add.visible = true;
    },
    passData_add($event) {
      console.log($event);
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
      this.form_editing = "update";
      this.update.formData = this.multipleSelection[0];
      this.update.visible = true;
    },
    passData_update($event) {
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
    // 2019/05/22  下午16:00  添加内容创建时去请求方案的数据 用来填充赋值 start
    let paramsA = { mid: parseInt(this.$route.params.id) };
    getUserConfig(paramsA).then(res => {
      console.log(res);
      if (res.data.length > 0) {
        console.log("222");
        this.programmeDataList = res.data;
        let pIndex = this.programmeDataList.length - 1;
        console.log(pIndex);
        this.tValList = this.programmeDataList[pIndex].queryTwoList;
        this.inputData = this.programmeDataList[pIndex].inputQueryData;
        this.hiddenFieldsList[this.$route.params.id] = this.programmeDataList[
          pIndex
        ].hiddenFieldsList;
        // this.nowId = this.programmeDataList[0].configId;
      }
    });
    // 2019/05/22  下午16:00  添加内容创建时去请求方案的数据 用来填充赋值 end

    this.initOperateBtn();
    this.tableTitle =
      (await requestAjax.requestGetHead(this.$route.params.id)) || [];
    this.pagination(this.data);
    this.tableTitle_show = [...this.tableTitle];

    // this.add.customField = [...this.customField];
    // this.update.customField = [...this.customField];

    // this.add.customField = deepClone(this.customField);
    // this.update.customField = deepClone(this.customField);
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
  overflow-y: scroll;
  padding-right: 15px;
}
.dis_fex {
  display: inline-block;
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
