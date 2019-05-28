<template>
  <div>
    <section>
      <Form
        :formItems="formItems_parent"
        @giveFormData="getFormData"
        @giveForm="getForm"
        :rule="rule"
        :customField="customField"
        :reset="reset"
      ></Form>
    </section>
    <section>
      <el-radio-group v-model="radio" size="mini">
        <el-radio-button v-show="radio.name" v-for="radio in radios" :label="radio.key" :key="radio.key">{{radio.name}}</el-radio-button>
      </el-radio-group>
      <Table
        :editable="true"
        :editable_field="editable_field"
        :height="300"
        :tableTitle="tableTitle_children"
        :tableData="tableData_children"
        :customField_table="customField_table"
        @giveTable="getTable"
        @giveTableData="getTableData"
      ></Table>
      <OperateBtn :operateList="operateList"></OperateBtn>
    </section>
    <section></section>
  </div>
  <!-- 
  <el-dialog :title="`新增 ${page.name}`" :visible="dialogVisible" @close="close" width="90%">
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>-->
</template>

<script>
import Table from "@/components/ElementUi/Table";
import OperateBtn from "@/components/ElementUi/OperateBtn";
import {saveNotice} from '@/api'
export default {
  props: {
    visible: Boolean,
    titles: {
      //接收一个表头列表  里面含有2张表组成  如果是主表  那么显示为form表单 子表则显示为表格
      type: Array,
      required: true
    },
    data: {
      //[true,{},[]]接收表头所对应的数据[所选择的多个子数据是否是对应父表中的单独一条数据,父数据,子数据]
      type: Array
    },

    rule: {
      //form表单自定义验证的规则
      type: Object,
      default: () => ({})
    },
    customField: {
      //form自定义显示字段

      type: Array,
      default: () => []
    },
    customField_table: {
      //table自定义显示字段
      type: Array,
      default: () => []
    },
    reset: {
      type: Boolean,
      default: false
    },
    editable_field: {
      type: Array,
      default: () => []
    },
    parentKey: {
      type: String
    },
    radios: {
      type: Array,
      default:() => []
    }
  },
  components: {
    Table,
    OperateBtn
  },
  data() {
    return {
      page: {
        id: this.$route.params.id,
        name: this.$route.params.name
      },
      dialogVisible: false, //是否显示该组件
      form: null, //表单组件对象
      form_data_model: null, //表单里的data_model对象
      formItems_parent: [], //form里要显示的字段
      formData_parent: null, //form初始值 ，有就代表是修改
      tableTitle_children: [], //
      tableData_children: [],
      isPass: null,
      passData: {},
      radio: this.radios && this.radios[0].key
    };
  },
  computed: {
    titles_() {
      return JSON.parse(JSON.stringify(this.titles));
    },
    data_() {
      return JSON.parse(JSON.stringify(this.data));
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
    titles_: {
      immediate: true,
      handler() {
        this.getParentFormItems();
        this.getChildrenTableTitle();
      }
    },
    data_: {
      immediate: true,
      handler() {
        this.getParentFormData();
        this.getChildrenTableData();
      }
    },
    passData: {
      handler(val){
        console.log('2222222222');
        
        this.$emit('passData',[this.isPass,val]);
      },
      deep: true
    },
    tableData_children() {}
  },
  methods: {
    initOperateBtn() {
      let self = this;
      this.operateList = [
        //对已上传的文件进行操作的按钮列表
        {
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          label: "新增",
          fn() {
            self.addRow();
          }
        }
      ];
    },
    close() {
      this.$emit("close", [true]);
    },
    //获取主表要显示的form字段
    getParentFormItems() {
      this.formItems_parent = this.titles_.filter(item => {
        return item.subField === null;
      });
      console.log(this.formItems_parent);
    },
    //获取子表要显示的tableTitle
    getChildrenTableTitle() {
      this.tableTitle_children = this.titles_.filter(item => {
        return item.subField;
      });
    },
    //获取主表中要显示的form数据
    getParentFormData() {},
    //获取子表中要显示的tableData列表
    getChildrenTableData() {
      this.tableData_children = this.data_[2];
      console.log(this.tableData_children);
    },
    //form表单中的验证结果
    getFormData($event) {
      console.log($event);
      this.isPass = $event[0];
      
      this.passData[this.parentKey] = $event[2];
      console.log(this.passData);
      
    },
    //form表单中的数据
    //获取表单组件对象
    getForm($event) {
      this.form = $event[0];
      this.form_data_model = this.form.data_model;
      this.$emit("giveForm", [this.form]);
    },
    //获取表格组件对象
    getTable($event) {
      this.table = $event[0];
      this.$emit("giveTable", [this.table]);
    },
    getTableData($event){
      this.passData[this.radio] = $event[0];
      console.log(this.passData);
      // saveNotice(this.passData);
    },
    //点击新增给表格加一行空数据
    addRow() {
      let row = {};
      this.tableTitle_children.forEach(item => {
        row[item.topType] = null;
        if (item.bindKey) {
          row[item.bindKey] = null;
        }
      });
      this.tableData_children.push(row);

      console.log(this.tableTitle_children);
    }
  },
  created() {
    let self = this;
    this.initOperateBtn();
    this.$set(this.passData,this.parentKey,{});
    this.radios.forEach(radio=>{
      self.$set(this.passData,radio.key,[])
    });
  }
};
</script>

<style>
</style>
