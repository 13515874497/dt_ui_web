<script>
// 星级
import { findByListStarLevel } from "../../api";
import MxTable from "../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return findByListStarLevel(data);
    }
  }
};
</script>

<style>
</style>
