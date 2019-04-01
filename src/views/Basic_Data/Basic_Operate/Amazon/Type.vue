<script>
// 亚马逊type 订单类型
import { findByListAmazon } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListAmazon(data);
    }
  }
};
</script>

<style>
</style>
