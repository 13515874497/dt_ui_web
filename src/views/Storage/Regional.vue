<script>
//国家
import { findCountryInfo } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findCountryInfo(data);
    },
  }
}
</script>

<style>

</style>
