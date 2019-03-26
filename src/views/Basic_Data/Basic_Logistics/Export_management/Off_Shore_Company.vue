<script>
//离岸公司
import { findByListCompanyOffshore } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data(){
    return {
      showQuery: false,
    }
  },
  methods: {
    queryPage(data) {
      return findByListCompanyOffshore(data);
    }
  }
};
</script>

<style>
</style>
