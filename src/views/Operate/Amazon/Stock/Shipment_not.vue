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
    async getSkuList(query){
      console.log(query);
      
      let data = this.form_data_model;
      console.log(data);
      
      if (data.shopId && data.siteId) {
        let res = await getSkuName({
          sId: data.shopId,
          seId: data.siteId,
          kuName: query
        });
        console.log(res);
        if (res.code === 200) {
          console.log(res);
        }
      }
    },
    //获取输入获取sku列表
    async getSkuList(query,row) {
      console.log('12312312');
      // console.log(this.form);
      console.log(row);
      
      let data_model = this.form.data_model;
      // console.log(data_model);
      
      // let formItems_ = this.form.formItems_;
      // let formItem = formItems_.find(formItem=>{
      //   return formItem.topType === 'sku'
      // });


      if (data_model.shopId && data_model.siteId){
        let res = await getSkuName({
          sId: data_model.shopId,
          seId: data_model.siteId,
          kuName: query
        });
        if (res.code === 200) {
          row.sku_data_ = res.data;
          console.log(this.table);
          
          this.table.table_data = [...this.table.table_data];
          // formItem.data = res.data
          // this.form.formItems_ = [...this.form.formItems_]
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
