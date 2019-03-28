<script>
//CPR
import { getCprInfo } from "@/api";
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
      return getCprInfo(data);
    },
  }
}
</script>

<style>

</style>
