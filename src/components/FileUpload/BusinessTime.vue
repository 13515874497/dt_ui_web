<template>
  <div>
    <div>
      <div class="block" style="margin-left: 150px">
        <el-date-picker
          v-model="ptFrom.businessTime"
          align="right"
          :clearable="false"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          @change="changeShow">
        </el-date-picker>
      </div>
      <!-- 店铺选择 站点选择 -->
      <ShopSelection :ptFrom="ptFrom"/>
    </div>
  </div>
</template>

<script>
  import ShopSelection from '../../components/FileUpload/ShopSelection'

  export default {
    data () {
      return {
        ptFrom: {
          businessTime: '',
          mShow: false,
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
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
        if (value !== null) {
          this.ptFrom.mShow = true
        }
      }
    }
  }
</script>

<style scope lang="scss">

</style>
