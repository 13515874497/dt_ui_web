<template>
  <el-tree
    :data="data"
    show-checkbox
    :node-key="nodeKey"
    :props="props"
  ></el-tree>
</template>

<script>
export default {
    prop: {
        data: Array,
        nodeKey: String,
        props: Object
    },
    data(){
        return {
            data: [],
            
        }
    },
    methods: {
        init(){

        }
    }
};
</script>

<style lang="scss">
</style>
