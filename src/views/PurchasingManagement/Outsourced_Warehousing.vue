<script>
//外购入库
import { getIcBillStock, saveIcBillStock, delIcBillStock, uplIcBillStock } from "@/api";
import {
//  supplierId
} from "@/components/ElementUi/Form/customField";
import MxTable2 from "@/components/Mixins/MxTable2";
import { isRepetArr } from "@/utils/Arrays";
import message from "@/utils/Message";
export default {
  mixins: [MxTable2],
  data() {
    return {
      nameKey:'no', //点击删除，失败的话会有提示，这个是需要传入的key
      primaryKey: "sbId",             //后台返回的
      primaryKey_child: 'sbeId',       //后台返回的
      queryKey: 'purchaseIcBillStockEntry', //后台返回
      customField: [
        // supplierId,
          //要验证的字段        
        {
          topType: "date",
          required: true
        },        
        {
          topType: "no",
          required: true
        },
      ],
     
      customField_table: [
       //  自定义字段表
        {
          // inputType: 3,
          // topType: "sku",
          // bindKey: "skuId",
          // remote: true,
          // key: "skuId",
          // label: "sku",
          // filterable: true,
          // placeholder: "选择店铺站点后输入,需鼠标点击",
          // remoteMethod: this.getSkuList,
          // data: [],
          // changeSel: this.changeSku
        }
      ],
      editable_field: [
        //表格中哪些字段可以被编辑
        "eRemark",
        "quantity"
      ],
      parentKey: "purchaseIcBillStock", // 点击新增、修改的时候传给后台的 父key的名字 (后台让传的参数)
      subField: {
        "1": { //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          //radio选项  和  点击新增、修改的时候传给后台的key
          name: "外购入库单",
          key_submit: "purchaseIcBillStockEntry", //传给后台的子key(后台给的)
          key_get: 'purchaseIcBillStockEntryList' //获取是从后台返回数据拿出来
        }
      }
    };
  },
  watch: {
    "form_data_model.shopId"() {
      this.getSkuList("");
    },
    "form_data_model.siteId"() {
      this.getSkuList("");
    },
    "form_data_model.platformTypeId"(val) {
      // if(val === 1){
      //   let fba = this.customField.find(item=>{
      //     return item.topType === 'fba'
      //   })
      //   fba.required = true;
      // }
    },

  },
  methods: {

    queryPage(data) {
      return getIcBillStock(data); //查询页面的接口
    },


    ajax_add(data) {
      data.mid = 295 //后台需要传入的参数mid就是当前页面的id
      return saveIcBillStock(data); //新增的接口
    },

    ajax_update(data) {
      return uplIcBillStock(data); //修改
    },
     ajax_remove(data) {
      return delIcBillStock(data); //删除
    },
   
  },
  beforeCreate() {
    // transportTypeName.hideChild = true;
  },
  async created() {}
};
</script>

<style>
</style>
