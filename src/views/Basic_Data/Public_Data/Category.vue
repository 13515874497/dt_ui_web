
<script>
//公共资料=>产品类目
import {findByListProducts} from '../../../api/index'
import MxTree from "../../../components/Mixins/MxTree";
export default {
  mixins:[MxTree],
  data() {
    
    return {
      data_tree: [],
      defaultProps: {
          children: 'childNode',
          label: 'productsName'
      },
      nodeKey: "productsId",
    };
  },
  methods: {
    queryAjax(){
      return findByListProducts();
    }
  }
};
</script>

<style>
</style>
