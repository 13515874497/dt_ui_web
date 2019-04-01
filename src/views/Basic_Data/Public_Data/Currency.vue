
<script>
//币别
import { findByListCurrency } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListCurrency(data);
    },
  }
}
</script>

<style>

</style>
