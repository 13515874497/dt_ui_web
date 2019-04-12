<script>
// 业务报告
import { getBusInfoWeek } from "@/api";
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
      return getBusInfoWeek(data);
    },
  },
  created(){
    this.data.sqlMode = 1
  }
}
</script>

<style>

</style>
