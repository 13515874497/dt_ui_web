
<script>
// 关税税率
import { findByListTax } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListTax(data);
    },
  }
}
</script>

<style>

</style>
