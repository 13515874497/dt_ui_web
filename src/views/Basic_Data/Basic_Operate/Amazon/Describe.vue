<script>
// 亚马逊描述
import { findByListDescription } from "../../../../api";
import MxTable from "../../../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListDescription(data);
    }
  }
};
</script>

<style>
</style>
