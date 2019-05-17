<script>
//出货通知单
import { getNotice} from "@/api";
import MxTable2 from "@/components/Mixins/MxTable2";
export default {
  mixins: [MxTable2],
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
