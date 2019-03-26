
<script>
import { findByListWar } from "@/api";
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins:[MxTree],
  methods: {
    queryAjax(){
      return findByListWar();
    }
  }
};
</script>

<style>
</style>
