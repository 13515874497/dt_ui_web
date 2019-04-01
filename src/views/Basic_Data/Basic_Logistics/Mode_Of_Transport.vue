

<script>
//运输方式
import { findByListModeOfTransport } from "@/api";
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
      return findByListModeOfTransport(data);
    },
  }
}
</script>

<style>

</style>
