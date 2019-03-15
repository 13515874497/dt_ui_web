
<script>
import { findByListWar } from "../../../api";
import MxTree from "../../../components/Mixins/MxTree";
export default {
  mixins:[MxTree],
  data() {
    
    return {
      data_tree: [],
      defaultProps: {
        children: "childWarehouse",
        label: "warehouseName"
      },
      nodeKey: "warehouseId",
    };
  },
  methods: {
    queryAjax(){
      return findByListWar();
    }
  }
};
</script>

<style>
</style>
