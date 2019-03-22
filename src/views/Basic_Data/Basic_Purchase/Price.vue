<script>
//基础资料=>采购管理=>采购价格
import { findByListPrice } from "../../../api";
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
      return findByListPrice(data);
    },
  }
}
</script>

<style>

</style>
