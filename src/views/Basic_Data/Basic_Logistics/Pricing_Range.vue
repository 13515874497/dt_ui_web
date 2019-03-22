

<script>
//查询计价范围
import { findByListRange } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListRange(data);
    },
  }
}
</script>

<style>

</style>
