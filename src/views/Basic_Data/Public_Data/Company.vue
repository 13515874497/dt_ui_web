<script>
import { repGetCompanyInfo } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  data(){
    return {
       showQuery: false
    }
  },
  methods: {
     queryPage(data) {
      return repGetCompanyInfo(data);
    },
  }
}
</script>

<style>

</style>
