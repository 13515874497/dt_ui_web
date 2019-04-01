<script>
//运输类型
import { findByListType } from "@/api/index";
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins: [MxTree],
  methods: {
    queryAjax() {
      return findByListType();
    }
  }
};
</script>

<style>
</style>