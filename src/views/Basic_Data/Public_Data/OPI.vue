<script>
//产品信息
import { findByListProduct } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListProduct(data);
    },
  }
}
</script>

<style>

</style>
