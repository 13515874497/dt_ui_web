<script>
// 付款类型
import { findPayByListProperty } from "../../../../api";
import MxTable from "../../../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data(){
    return {
       showQuery: false
    }
  },
  methods: {
    queryPage(data) {
      return findPayByListProperty(data);
    }
  }
};
</script>

<style>
</style>
