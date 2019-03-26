
<script>
//站点
import { findByListSite } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListSite(data);
    },
  }
}
</script>

<style>

</style>
