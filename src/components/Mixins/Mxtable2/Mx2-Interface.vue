<template>
  <div>
    <section>
      <Form
        :formItems="formItems_parent"
        @passData="passData"
        @giveDataModel="getDataModel"
        :rule="rule"
        :customField="customField"
      ></Form>
    </section>
    <section>
      <el-radio-group v-model="radio" size="mini">
        <el-radio-button :label="page.name"></el-radio-button>
      </el-radio-group>
      <Table
        :editable="true"
        :tableTitle="tableTitle_children"
        :tableData="tableData_children"
        :customField_table="customField_table"
      ></Table>
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
export default {
  props: {
    visible: Boolean,
    titles: {
      //接收一个表头列表  里面含有2张表组成  如果是主表  那么显示为form表单 子表则显示为表格
      type: Array,
      required: true
    },
    data: {
      //[true,{},[]]接收表头锁对于的数据[所选择的多个子数据是否是对应父表中的单独一条数据,父数据,子数据]
      type: Array
    },
    rule: { 
      type: Object,
      default: () => ({})
    },
    customField: {
      type: Array,
      default: () => []
    },
    customField_table: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Table
  },
  data() {
    return {
      page: {
        id: this.$route.params.id,
        name: this.$route.params.name
      },
      dialogVisible: false, //是否显示该组件
      form_data_model: null,
      formItems_parent: [],
      formData_parent: null,
      tableTitle_children: [],
      tableData_children: [],
      radio: this.$route.params.name
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
    }
  },
  methods: {
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
    passData($event){
      console.log($event);
    },
    //form表单中的数据
    getDataModel($event){
      this.form_data_model = $event[0];
      this.$emit("giveDataModel", [this.form_data_model]);
    }
  },
  created() {
    console.log(this.page);
  }
};
</script>

<style>
</style>
