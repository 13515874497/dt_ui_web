<script>
//出货通知单
import { getNotice, getProductAdnSku, getSkuName } from "@/api";
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
      customField_table: [
        {
          inputType: 3,
          topType: "sku",
          bindKey: "skuId",
          remote: true,
          key: "skuId",
          label: "sku",
          filterable: true,
          placeholder: "选择店铺站点后输入,需鼠标点击",
          remoteMethod: this.getSkuList,
          data: [],
          changeSel: this.changeSku
        }
      ],
      editable_field: [
        "neGwKg",
        "neHeightCm",
        "neLengthCm",
        "neNwKg",
        "neWidthCm",
        "neVolumeM3",
        "quantity"
      ] //表格中哪些字段可以被编辑
    };
  },
  watch: {
    "form_data_model.shopId"() {
      this.getSkuList("");
    },
    "form_data_model.siteId"() {
      this.getSkuList("");
    },
    table_table_data: {
      handler(table_data) {
        if (table_data && table_data.length ){
          console.log(table_data);
          console.log("7777777777777777777777777777");
          console.log(this.form);
          
          console.log(JSON.stringify(this.form_data_model));
          
          let data_model = this.form_data_model;
          let sum =  table_data.reduce(
            (prev, next, index, array) => {
              return (prev.quantity || 0) + (next.quantity || 0);
            }
          );
          console.log(sum);
          data_model.ttlPackages = sum;
          
          // data_model.ttlPackages = table_data.reduce(
          //   (prev, next, index, array) => {
          //     return (prev.quantity || 0) + (next.quantity || 0);
          //   }
          // );
        }

        // data_model.
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    queryPage(data) {
      return getNotice(data); //查询页面的接口
    },
    // async getSkuList(query) {
    //   console.log(query);

    //   let data = this.form_data_model;
    //   console.log(data);

    //   if (data.shopId && data.siteId) {
    //     let res = await getSkuName({
    //       sId: data.shopId,
    //       seId: data.siteId,
    //       kuName: query
    //     });
    //     console.log(res);
    //     if (res.code === 200) {
    //       console.log(res);
    //     }
    //   }
    // },
    async changeSku(val, row, title) {
      console.log(val);
      console.log(row);
      console.log(title);
      let res = await getProductAdnSku({
        skuId: val
      });
      if (res.code == 200) {
        let data = res.data;
        for (let key in data) {
          row[key] = data[key];
        }
        row.neNwKg = row.neNwKg * row.quantity;
        row.neGwKg = row.neGwKg * row.quantity;
      }

      console.log(res);
      this.table.table_data = [...this.table.table_data];
    },
    //获取输入获取sku列表
    async getSkuList(query, row) {
      console.log(this.form);
      console.log(this.form.data_model);
      let data_model = this.form.data_model;
      if (data_model.shopId && data_model.siteId) {
        let res = await getSkuName({
          sId: data_model.shopId,
          seId: data_model.siteId,
          kuName: query
        });
        if (res.code === 200) {
          if (row) {
            row.sku_data_ = res.data;
          } else {
            this.table.table_data.forEach(item => {
              item.sku_data_ = res.data;
            });
          }
          this.table.table_data = [...this.table.table_data];
        }
      }
    }
  },
  async created() {}
};
</script>

<style>
</style>
