

<script>
import { findByListProperty } from "../../../api";
import MxTable  from '../../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return findByListProperty(data);
    },
  }
}
</script>

<style>

</style>
