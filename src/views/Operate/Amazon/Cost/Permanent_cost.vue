<script>
//长期仓储费
import {getLWarInfo} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
  mixins:[MxTable],
  data(){
    return{}
  },
  methods:{
    queryPage(data){
      return getLWarInfo(data)
    }
  }
}
</script>

