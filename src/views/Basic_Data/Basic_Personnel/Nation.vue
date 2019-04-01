<script>
//民族
import { findByListNationInfo } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data(){
    return {
      showQuery: false,
    }
  },
  methods: {
    queryPage(data) {
      return findByListNationInfo(data);
    }
  }
};
</script>

<style>
</style>
