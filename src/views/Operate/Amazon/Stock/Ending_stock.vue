<script>
//期末库存
import {getInventoryInfo} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
  mixins:[MxTable],
  data(){
    return{}
  },
  methods:{
    queryPage(data){
      return getInventoryInfo(data)
    }
  }
}
</script>
