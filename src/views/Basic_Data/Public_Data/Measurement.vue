
<script>
//公共资料=>计量单位
import {findByListUnit} from '@/api/index'
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins:[MxTree],
  methods: {
    queryAjax(){
      return findByListUnit();
    }
  }
};
</script>

<style>
</style>
