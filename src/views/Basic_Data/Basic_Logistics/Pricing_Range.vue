

<script>
//查询计价范围
import { findByListRange } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  data(){
    return {
       showQuery: false
    }
  },
  methods: {
     queryPage(data) {
      return findByListRange(data);
    },
  }
}
</script>

<style>

</style>
