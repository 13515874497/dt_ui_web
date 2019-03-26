<script>
// 离职类型
import { getHrLeave } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      showQuery: false
    };
  },
  methods: {
    queryPage(data) {
      return getHrLeave(data);
    }
  }
};
</script>

<style>
</style>
