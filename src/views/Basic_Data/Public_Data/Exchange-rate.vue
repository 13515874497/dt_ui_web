
<script>
//汇率
import { findByListRate,saveRate } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
import {lessThan2} from '@/utils/verify.js'
export default {
  mixins: [MxTable],
  data(){
    return{
      showQuery:true,//是否显示上方查询功能
      primaryKey:"exchangeRateId",//修改删除的时候需要一个key
    }
  },
  methods: {
     queryPage(data) {
      return findByListRate(data); //查询页面的接口
    },
    ajax_add(data){
      return saveRate(data)//新增页面的接口
    }
  }
}
</script>

<style>

</style>
