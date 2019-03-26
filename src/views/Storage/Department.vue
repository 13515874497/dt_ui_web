
<script>
//部门
import {findByListDepartment} from '../../api/index'
import MxTree from "../../components/Mixins/MxTree";
export default {
  mixins:[MxTree],
  data() {
    
    return {
      data_tree: [],
      defaultProps: {
          children: 'childNode',
          label: 'treeName'
      },
      nodeKey: "treeId",
    };
  },
  methods: {
    queryAjax(){
      return findByListDepartment();
    }
  }
};
</script>

<style>
</style>
