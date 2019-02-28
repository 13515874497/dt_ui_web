<template>
  <div>
    <el-select style="width: 120px;margin-left: 150px" v-model="ptFrom.pId" placeholder="付款类型" @change="changeShow" value="">
      <el-option
        v-for="item in payOptions"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>
    <!-- 店铺选择 站点选择 -->
    <ShopSelection :ptFrom="ptFrom"/>
  </div>
</template>

<script>
  import ShopSelection from '../../components/FileUpload/ShopSelection'

  export default {
    data () {
      return {
        ptFrom: {
          pId: '',
          mShow: false,
        },
        payOptions: [{name: '标准订单', value: '1'}, {name: '发票支付', value: '2'}],//付款类型
      }
    },
    components: {
      ShopSelection
    },
    methods: {
      //付款类型
       changeShow (value) {
        this.ptFrom.mShow = true
      }
    }
  }
</script>

<style scope lang="scss">
</style>
