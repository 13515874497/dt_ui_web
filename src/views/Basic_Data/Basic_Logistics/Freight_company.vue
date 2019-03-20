

<script>
import { findByListFreight } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListFreight(data);
    },
  }
}
</script>

<style>

</style>
