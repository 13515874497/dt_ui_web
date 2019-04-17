
<script>
//汇率
import { findByListRate,saveRate,upRate,delRate} from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
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
    // ajax_add(data){
    //   return saveRate(data) //新增页面的接口 有问题
    // },
    ajax_update(data){
      return upRate(data) //修改页面接口
    },
    ajax_remove(data){
      return delRate(data)//删除的接口
    }
  }
}
</script>

<style>

</style>
