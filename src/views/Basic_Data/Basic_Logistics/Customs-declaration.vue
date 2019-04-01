<script>
//基础资料=>出口管理=>报关类型
import { findByListDeclareType } from "@/api";
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
      return findByListDeclareType(data);
    },
  }
}
</script>

<style>

</style>
