 <template>
   <div></div>
 </template>
 
 <script>
//HL
import { getHlInfo } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  // data(){
  //   return {
  //      showQuery: false
  //   }
  // },
  methods: {
     queryPage(data) {
      return getHlInfo(data);
    },
  }
}
</script>

<style>

</style>