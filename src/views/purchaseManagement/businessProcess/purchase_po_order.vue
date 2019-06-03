<script>
//采购订单
import { getPoOrder, savePoOrder } from "@/api";
import {
  // shopName,
  // siteName,
  // platformTypeName,
  // transportTypeName,
  currency
} from "@/components/ElementUi/Form/customField";
import MxTable2 from "@/components/Mixins/MxTable2";
import { isRepetArr } from "@/utils/Arrays";
import message from "@/utils/Message";
export default {
  mixins: [MxTable2],
  data() {
    return {
      queryKey: 'poOrderEntry', //分页中查询的key
      primaryKey: "poId",
      primaryKey_child: 'poeId',
      customField: [
        currency
      ],
      customField_table: [

      ],
      editable_field: [
        //表格中哪些字段可以被编辑
      ],
      parentKey: "purchasePoOrder", // 点击新增、修改的时候传给后台的 key的名字
      subField: {  //radio选项  和  点击新增、修改的时候传给后台的key
        "1": { //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          name: "采购订单",
          key_submit: "purchasePoOrderEntry", //传给后台的key
          key_get: "poOrderEntryList" //获取时从哪里拿出来
        }
      }
    };
  },
  watch: {

  },
  methods: {
    queryPage(data) {
      return getPoOrder(data); //查询页面的接口
    },
    ajax_add(data) {
     return savePoOrder(data);
    },
    ajax_update(data){
   
    },
  },
  beforeCreate() {
  },
  async created() {
    console.log(this.customField);
    
  }
};
</script>

<style>
</style>
