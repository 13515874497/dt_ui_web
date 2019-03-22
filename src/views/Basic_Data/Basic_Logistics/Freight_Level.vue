<script>
//运价等级
import { findByListLevel } from "../../../api/index";
import MxTree from "../../../components/Mixins/MxTree";
export default {
  mixins: [MxTree],
  data() {
    return {
      data_tree: [],
      defaultProps: {
        children: "childNode",
        label: "transportFreightLevelName"
      },
      nodeKey: "transportFreightLevelId"
    };
  },
  methods: {
    queryAjax() {
      return findByListLevel();
    }
  }
};
</script>

<style>
</style>