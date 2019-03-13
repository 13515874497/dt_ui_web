<template>
  <el-tree
    :data="data"
    show-checkbox
    :node-key="nodeKey"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[5]"
    :props="defaultProps"
  ></el-tree>
</template>

<script>
export default {
    prop: {
        data: Array,
        nodeKey: String,
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
