<template>
  <Tree :data="data_tree" :props="defaultProps" :nodeKey="'productsId'"></Tree>
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
        defaultProps: {
          children: 'childPros',
          label: 'productsName'
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
        this.data_tree = res.data;
      }
    },
    mounted(){
    }
  }
</script>


<style>

</style>
