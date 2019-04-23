<script>
// 订单处理费
import {getHlFee} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
mixins: [MxTable],
data(){
  return{}
},
methods:{
  queryPage(data){
      return getHlFee(data)
  }
}
}
</script>
