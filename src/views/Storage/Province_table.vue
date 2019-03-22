<script>
//省州关联表
import { findByListRelation } from "../../api";
import MxTable  from '../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListRelation(data);
    },
  }
}
</script>

<style>

</style>
