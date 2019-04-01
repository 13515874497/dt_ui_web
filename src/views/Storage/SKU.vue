<script>
import { findByListSku } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListSku(data);
    }
  }
};
</script>

<style>
</style>
