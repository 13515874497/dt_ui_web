<template>
  <Tree :data="data_tree" :props="defaultProps" :nodeKey="nodeKey" @add="add"></Tree>
</template>

<script>
  import Tree from '@/components/ElementUi/Tree.vue'
  import AddDelUpButton from '@/components/ElementUi/AddDelUpButton'
  export default {
    data () {
      return {
        data_tree:[],
        defaultProps: {
          children: 'childNode',
          label: 'treeName'
        },
        nodeKey: 'treeId'
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
      },
      add($event){
        let node = $event[0];
        
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
