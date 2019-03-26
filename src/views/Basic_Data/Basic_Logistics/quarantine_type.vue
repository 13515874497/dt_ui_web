<script>
//检验检疫类别
import { findByListQuarantine } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  data(){
    return {
       showQuery: false
    }
  },
  methods: {
     queryPage(data) {
      return findByListQuarantine(data);
    },
  }
}
</script>

<style>

</style>
