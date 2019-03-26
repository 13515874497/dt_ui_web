
<script>
//区域
import { findByListRegion } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListRegion(data);
    },
  }
}
</script>

<style>

</style>
