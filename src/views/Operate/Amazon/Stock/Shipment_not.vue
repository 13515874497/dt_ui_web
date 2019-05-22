<script>
//出货通知单
import { getNotice, getProductAdnSku,getSkuName } from "@/api";
import {
  shopName,
  siteName,
  platformTypeName,
  transportTypeName
} from "@/components/ElementUi/Form/customField";
import MxTable2 from "@/components/Mixins/MxTable2";
export default {
  mixins: [MxTable2],
  data() {
    return {
      primaryKey: "awId",
      customField: [shopName, siteName, platformTypeName, transportTypeName],
      customField_table: [{
          inputType: 3,
          topType: "sku",
          bindKey: "skuId",
          remote: true,
          key: "skuId",
          label: "sku",
          filterable: true,
          placeholder: "输入选择sku,需鼠标点击",
          remoteMethod: this.getSkuList,
          data: []
        },]
    };
  },
  watch: {
    "form_data_model.shopId"() {
      this.getSkuList("");
    },
    "form_data_model.siteId"() {
      this.getSkuList("");
    }
  },
  methods: {
    queryPage(data) {
      return getNotice(data); //查询页面的接口
    },
    async getSkuList(query,title){
      console.log(query,title);
      
      let data = this.form_data_model;
      if (data.shopId && data.siteId) {
        let res = await getSkuName({
          sId: data.shopId,
          seId: data.siteId,
          kuName: query
        });
        console.log(res);
        if (res.code === 200) {
          console.log(res);
          // let customField = null;
          // switch (this.form_editing) {
          //   case "add":
          //     customField = this.add.customField;
          //     break;
          //   case "update":
          //     customField = this.update.customField;
          //     break;
          // }
          // let item =  customField.find(item => {
          //   return item.topType === "sku";
          // });

          // item.data = res.data;
          // customField.currField = "sku"; //告诉子组件当前修改的字段是 'sku'
          // customField.currQuery = query;
        }
      }
    },
  },
  async created() {
    let res = getProductAdnSku({
      skuId: 1
    });
    console.log(res);
  }
};
</script>

<style>
</style>
