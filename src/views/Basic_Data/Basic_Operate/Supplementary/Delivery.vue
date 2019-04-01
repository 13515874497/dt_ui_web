<script>
// 基础资料 => 运营管理 => 辅助资料 => 发货方式
import { findByListDelivery } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data(){
    return {
       showQuery: false
    }
  },
  methods: {
    queryPage(data) {
      return findByListDelivery(data);
    }
  }
};
</script>

<style>
</style>
