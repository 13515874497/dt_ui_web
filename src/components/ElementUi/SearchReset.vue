<template>
    <div class="searchReset">
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </div>   
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        search(){
            this.$emit('search');
        },
        reset(){
            this.$emit('reset');
        }
    }
}
</script>

<style>

</style>
