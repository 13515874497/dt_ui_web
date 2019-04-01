<script>
//公司
import { findByListCompany } from "@/api";
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
      return findByListCompany(data);
    },
  }
}
</script>

<style>

</style>
