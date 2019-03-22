<script>
// 平台类型
import { findByListPlatform } from "../../../../api";
import MxTable from "../../../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListPlatform(data);
    }
  }
};
</script>

<style>
</style>
