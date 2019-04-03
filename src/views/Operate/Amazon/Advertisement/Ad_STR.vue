
  <!--STR-->
<script>
 import { getStr } from "../../../../api";
 import MxTable  from '../../../../components/Mixins/MxTable.vue'

  export default {
    mixins: [MxTable],
    methods: {
     queryPage(data) {
      return getStr(data);
    },
  }
  }
</script>


<style>
  /*表格*/

</style>
