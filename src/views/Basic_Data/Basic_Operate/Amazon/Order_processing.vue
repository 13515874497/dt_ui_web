<script>
// 订单处理类
import { findByListHandling } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListHandling(data);
    }
  }
};
</script>

<style>
</style>
