
<script>
//部门
import {findByListDepartment} from '@/api/index'
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins:[MxTree],
  methods: {
    queryAjax(){
      return findByListDepartment();
    }
  }
};
</script>

<style>
</style>
