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
    props: {
        data: {
            type: Array,
            required: true
        },
        nodeKey: {
            type: String,
        },
        props: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            
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
