<script>
//运价等级
import { findByListLevel } from "@/api/index";
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins: [MxTree],
  methods: {
    queryAjax() {
      return findByListLevel();
    }
  }
};
</script>

<style>
</style>