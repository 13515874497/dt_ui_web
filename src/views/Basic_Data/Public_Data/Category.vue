
<script>
//公共资料=>产品类目
import {findByListProducts} from '@/api/index'
import MxTree from "@/components/Mixins/MxTree";
export default {
  mixins:[MxTree],
  methods: {
    queryAjax(){
      return findByListProducts();
    }
  }
};
</script>

<style>
</style>
