
<script>
// 学历
import { getEducation } from "../../api";
import MxTable  from '../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return getEducation(data);
    },
  }
}
</script>

<style>

</style>
