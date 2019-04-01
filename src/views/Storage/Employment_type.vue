<script>
//雇佣类型
import { getEmployment } from "@/api";
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
      return getEmployment(data);
    }
  }
};
</script>

<style>
</style>
