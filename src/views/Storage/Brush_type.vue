<script>
//刷单类型
import { findByListBrush } from "../../api";
import MxTable  from '../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListBrush(data);
    },
  }
}
</script>

<style>

</style>
