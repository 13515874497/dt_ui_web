<script>
//基础资料 => 运营管理 => 辅助资料 => 刷单类型
import { findByListBrush } from "@/api";
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
      return findByListBrush(data);
    },
  }
}
</script>

<style>

</style>
