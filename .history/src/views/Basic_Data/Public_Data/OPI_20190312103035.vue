<template>
  <Tree :data="data"></Tree>
</template>












<script>
  import Tree from '../../../components/ElementUi/Tree.vue'
  import {findByListProducts} from '../../../api/index'
  import Table from '../../../components/ElementUi/Table'
  import requestAjax from '../../../api/requestAjax'
  import Pagination from '../../../components/ElementUi/Pagination'
  import pUtils from '../../../utils/PageUtils'
  import AddDelUpButton from '../../../components/ElementUi/AddDelUpButton'
  import Query from '../../../components/ElementUi/Query'
  //公司
  export default {
    data () {
      return {
        data_tree:[],
        isTableTitle: false, //如果table表头的长度是 0
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        multipleSelection: [],//更新按钮数组收集
        FormValue_OPI: false,//新增隐藏form
        opi: {
          tableData: [],//表信息
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 2,//显示最大的页
          page_sizes: [2, 10, 15, 20, 25]
        }
      }
    },
    components:{
      Tree,
      AddDelUpButton,
    },
    async mounted () {

    },
    methods: {
    },
    async created(){
      let res = await findByListProducts();
      console.log(res);
      if(res.code == 200){
        this.data_tree = res;
      }
    }
  }
</script>


<style>

</style>
