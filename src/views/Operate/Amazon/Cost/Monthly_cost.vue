<script>
//  <!--月度仓储费-->
import {getMWarInfo} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
 mixins:[MxTable],
 methods:{
    queryPage(data){
    return getMWarInfo(data)
  }
 }
}
</script>
