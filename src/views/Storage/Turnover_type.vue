<script>
// 离职类型
import { getHrLeave } from "../../api";
import MxTable from "../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  methods: {
    queryPage(data) {
      return getHrLeave(data);
    }
  }
};
</script>

<style>
</style>
