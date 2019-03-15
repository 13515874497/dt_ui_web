

<script>
import { getTemplate } from "../../api";
import MxTable  from '../../components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  methods: {
     queryPage(data) {
      return getTemplate(data);
    },
  }
}
</script>

<style>

</style>
