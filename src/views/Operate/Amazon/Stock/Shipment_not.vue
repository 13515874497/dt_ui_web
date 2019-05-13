<script>
//出货通知单
import { getNotice} from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {

    };
  },
  methods: {
    queryPage(data) {
      return getNotice(data); //查询页面的接口
    },
  }
};
</script>

<style>
</style>
