<script>
import { repGetCompanyInfo } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return repGetCompanyInfo(data);
    },
  }
}
</script>

<style>

</style>
