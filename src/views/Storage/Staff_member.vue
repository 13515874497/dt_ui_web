<script>
import { findByListEmployee } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListEmployee(data);
    },
  }
}
</script>

<style>

</style>
