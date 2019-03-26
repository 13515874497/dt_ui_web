<script>
//出口关别
import { findExitCustomsInfo } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findExitCustomsInfo(data);
    },
  }
}
</script>

<style>

</style>
