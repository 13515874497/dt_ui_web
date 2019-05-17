<template>
  <el-dialog :title="`新增 ${page.name}`" :visible="dialogVisible" @close="close" width="90%">
    <Form :formItems="formItems_parent"></Form>
    <TableEditable :editable="true" :tableTitle="tableTitle_children" :tableData="tableData_children"></TableEditable>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import TableEditable from "@/components/ElementUi/Table_Editable";
export default {
  props: {
    visible: Boolean,
    titles: { //接收一个表头列表  里面含有2张表组成  如果是主表  那么显示为form表单 子表则显示为表格
      type: Array,
      required: true
    },
    data: { //接收表头锁对于的数据[所选择的多个子数据是否是对应父表中的单独一条数据,父数据，子数据]
      type: Array
    }
  },
  components: {
    TableEditable
  }, 
  data() {
    return {
      page: {
        id: this.$route.params.id,
        name: this.$route.params.name
      },
      dialogVisible: false,
      formItems_parent: [],
      formData_parent: null,
      tableTitle_children: [],
      tableData_children:[]
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
    formItems() {
      this.getParentFormItems();
      this.getChildrenTableTitle();
    }
  },
  methods: {
    close() {
      this.$emit("close", [true]);
    },
    //获取主表要显示的字段
    getParentFormItems() {
      this.formItems_parent = this.formItems.filter(item => {
        return item.subField === null;
      });
      console.log(this.formItems_parent);
    },
    getChildrenTableTitle() {
      this.tableTitle_children = this.formItems.filter(item => {
        return !item.subField;
      });
    }
  },
  created() {
    console.log(this.page);
  }
};
</script>

<style>
</style>
