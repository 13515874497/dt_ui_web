<script>
import { findByListSur } from "../../api";
import MxTable  from '../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListSur(data);
    },
  }
}
</script>

<style>

</style>
