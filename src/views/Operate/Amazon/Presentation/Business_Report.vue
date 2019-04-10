<script>
// 业务报告
import { getBusInfo } from "@/api";
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
      return getBusInfo(data);
    },
  },
}
</script>

<style>

</style>

