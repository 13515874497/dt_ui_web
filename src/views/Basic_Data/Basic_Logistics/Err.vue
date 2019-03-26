<script>
//异常类型
import { findByListAbnormal } from "@/api/index";
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins: [MxTree],
  methods: {
    queryAjax() {
      return findByListAbnormal();
    }
  }
};
</script>

<style>
</style>