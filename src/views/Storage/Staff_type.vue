
<script>
// 员工类型  职员类型
import { getEmployee } from "../../api";
import MxTable from "../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      showQuery: false
    };
  },
  methods: {
    queryPage(data) {
      return getEmployee(data);
    }
  }
};
</script>

<style>
</style>
