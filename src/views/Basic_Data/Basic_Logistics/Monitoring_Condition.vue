<script>
//监管方式
import { findMonitoringInfo } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findMonitoringInfo(data);
    },
  }
}
</script>

<style>

</style>
