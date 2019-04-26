<script>
//review
import {getReview,saveReview} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
  mixins:[MxTable],
  data(){
    return{}
  },
  methods:{
    queryPage(data){
      return getReview(data)
    },
    ajax_add(data){
      return saveReview(data) 
    },
  }
}
</script>
