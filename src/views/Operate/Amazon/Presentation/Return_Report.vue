<script>
// 退货报告
import { geRefundInfo } from "@/api";
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
      return geRefundInfo(data);
    },
  },
}
</script>

<style>

</style>

