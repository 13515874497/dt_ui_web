<script>
//店铺
import { findByListShop } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListShop(data);
    },
  }
}
</script>

<style>

</style>
