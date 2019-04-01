<script>
//成交方式
import { findByListWayOfClosing } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      showQuery: false
    };
  },
  methods: {
    queryPage(data) {
      return findByListWayOfClosing(data);
    }
  }
};
</script>

<style>
</style>
