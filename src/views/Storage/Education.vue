<script>
//学历
import { getEducation } from "../../api";
import MxTable from "../../components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data(){
    return {
      showQuery: false,
    }
  },
  methods: {
    queryPage(data) {
      return getEducation(data);
    }
  }
};
</script>

<style>
</style>
