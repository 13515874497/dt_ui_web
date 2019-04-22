<script>
//产品信息
import { findByListProduct, saveProduct, upProduct, delProduct,findByListProducts } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      primaryKey: "productId"
    };
  },
  methods: {
    queryPage(data) {
      return findByListProduct(data);
    },
    ajax_add(data) {
      return saveProduct(data);
    },
    ajax_update(data) {
      //修改的接口
      return upProduct(data);
    },
    ajax_remove(data) {
      //删除的接口
      return delProduct(data);
    },
    async inputType5(){
      let res = await findByListProducts();
      console.log(res);
    }
  },
  created(){
    this.inputType5();
  }
};
</script>

<style>
</style>
