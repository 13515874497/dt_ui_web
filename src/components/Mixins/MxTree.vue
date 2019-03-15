<template>
  <Tree :data="data_tree" :props="defaultProps" :nodeKey="nodeKey"></Tree>

</template>


<script>
  import Tree from '../../components/ElementUi/Tree.vue'
  import AddDelUpButton from '../../components/ElementUi/AddDelUpButton'

  export default {
    data () {
      return {
        data_tree:[],
        defaultProps: {
          children: 'childPros',
          label: 'productsName'
        },
        nodeKey: 'productsId'
      }
    },
    components:{
      Tree,
      AddDelUpButton,
    },
    methods: {
      queryAjax(){
        //mixin后需要重写下请求数据的接口
        // return xxx()
      }
    },
    async created(){
      let res = await this.queryAjax();
      console.log(res);
      if(res.code == 200){
        this.data_tree = res.data;
      }
    }
  }
</script>


<style>

</style>
