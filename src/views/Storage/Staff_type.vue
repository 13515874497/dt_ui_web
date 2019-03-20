
<script>
// 员工类型  职员类型
import { getEmployee } from "../../api";
import MxTable  from '../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return getEmployee(data);
    },
  }
}
</script>

<style>

</style>
