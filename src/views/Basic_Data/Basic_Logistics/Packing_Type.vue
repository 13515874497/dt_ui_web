

<script>
//包装种类
import { findByListPackingType } from "@/api";
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
      return findByListPackingType(data);
    },
  }
}
</script>

<style>

</style>
