<script>
// 结算报告
import { getFinalInfo } from "@/api";
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
      return getFinalInfo(data);
    },
  },
   created(){
    this.data.sqlMode = 1
  }
}
</script>

<style>

</style>
