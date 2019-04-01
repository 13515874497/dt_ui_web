<script>
// 基础资料 => 运营管理 => 辅助资料 => 平台类型
import { findByListPlatform } from "@/api";
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
      return findByListPlatform(data);
    }
  }
};
</script>

<style>
</style>
