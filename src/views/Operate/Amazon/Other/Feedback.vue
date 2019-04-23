<script>
//feedback
import {getFeedback} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
  mixins:[MxTable],
  data(){
    return{}
  },
  methods:{
    queryPage(data){
      return getFeedback(data)
    }
  }
}
</script>

