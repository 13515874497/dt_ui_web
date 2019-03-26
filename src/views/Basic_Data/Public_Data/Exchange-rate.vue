
<script>
//汇率
import { findByListRate } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListRate(data);
    },
  }
}
</script>

<style>

</style>
