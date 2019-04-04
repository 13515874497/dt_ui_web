  <!--caiwu-->
<script>
 import {getFsbInfo} from "@/api";
 import MxTable  from '@/components/Mixins/MxTable'

  export default {
    mixins: [MxTable],
    methods: {
     queryPage(data) {
      return getFsbInfo(data);
    },
  }
  }
</script>



