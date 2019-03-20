<script>
import { findByListAbnormal } from "../../../api/index";
import MxTree from "../../../components/Mixins/MxTree";
export default {
  mixins: [MxTree],
  data() {
    return {
      data_tree: [],
      defaultProps: {
        children: "childNode",
        label: "transportAbnormalTypeName"
      },
      nodeKey: "transportAbnormalTypeId"
    };
  },
  methods: {
    queryAjax() {
      return findByListAbnormal();
    }
  }
};
</script>

<style>
</style>