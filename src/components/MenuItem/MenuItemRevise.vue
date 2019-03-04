<template>
    <div class="elastic">
        
        <el-dialog
            title="提示"
            :visible.sync="UpdateMenu"
            width="30%"
            center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="UpdateMenu = false">取 消</el-button>
                <el-button type="primary" @click="UpdateMenu = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
      return {
        UpdateMenu: false
      };
    }
};
</script>
<style lang="scss" scoped>
</style>


