<script>
//review
import {getReview} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
  mixins:[MxTable],
  data(){
    return{}
  },
  methods:{
    queryPage(data){
      return getReview(data)
    }
  }
}
</script>
