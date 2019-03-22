<script>
//运输类型
import { findByListType } from "../../../api/index";
import MxTree from "../../../components/Mixins/MxTree";
export default {
  mixins: [MxTree],
  data() {
    return {
      data_tree: [],
      defaultProps: {
        children: "childNode",
        label: "transportTypeName"
      },
      nodeKey: "transportTypeId"
    };
  },
  methods: {
    queryAjax() {
      return findByListType();
    }
  }
};
</script>

<style>
</style>