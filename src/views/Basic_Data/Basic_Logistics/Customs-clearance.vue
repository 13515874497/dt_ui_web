<script>
//基础资料=>出口管理=>清关类型
import { findByListGrosscustoms } from "../../../api";
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
      return findByListGrosscustoms(data);
    },
  }
}
</script>

<style>

</style>
