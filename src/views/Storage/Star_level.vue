<script>
//基础资料 => 运营管理 => 辅助资料 => 星级
import { findByListStarLevel } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data(){
    return {
       showQuery: false
    }
  },
  methods: {
    queryPage(data) {
      return findByListStarLevel(data);
    }
  }
};
</script>

<style>
</style>
