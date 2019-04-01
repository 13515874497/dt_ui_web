<script>
//计价方式
import { findByListValuationMethod } from "@/api/index";
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins: [MxTree],
  methods: {
    queryAjax() {
      return findByListValuationMethod();
    }
  }
};
</script>

<style>
</style>