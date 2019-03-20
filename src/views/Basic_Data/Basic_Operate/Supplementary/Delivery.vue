<script>
// 发货方式
import { findByListDelivery } from "../../../../api";
import MxTable from "../../../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListDelivery(data);
    }
  }
};
</script>

<style>
</style>
