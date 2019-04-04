<script>
//OAR
import { getOarInfo } from "@/api";
import MxTable  from '@/components/Mixins/MxTable'
export default {
  mixins: [MxTable],
  // data(){
  //   return {
  //      showQuery: false
  //   }
  // },
  methods: {
     queryPage(data) {
      return getOarInfo(data);
    },
  }
}
</script>

<style>

</style>

