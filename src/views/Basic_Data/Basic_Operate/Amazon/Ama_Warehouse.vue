<script>
// 亚马逊仓库
import { findByListWarehouse } from "../../../../api";
import MxTable from "../../../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListWarehouse(data);
    }
  }
};
</script>

<style>
</style>
