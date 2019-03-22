<script>
//基础资料=>出口管理=>要素内容
import { findElementInfo } from "../../../api";
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
      return findElementInfo(data);
    },
  }
}
</script>

<style>

</style>
