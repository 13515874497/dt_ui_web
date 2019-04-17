<script>
//FBA遗弃
import {getAbandonInfo} from '@/api';
import MxTable from '@/components/Mixins/MxTable'
export default {
  mixins:[MxTable],
  // data(){
  //   return{
  //     showQuery:false;
  //   }
  // },

  methods:{
    queryPage(data){
      return getAbandonInfo(data)
    }
  }
}
</script>
