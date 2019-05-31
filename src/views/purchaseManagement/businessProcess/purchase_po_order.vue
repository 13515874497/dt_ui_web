<script>
//出货通知单
import { getPoOrder, saveNotice, getProductAdnSku, getSkuName,upNotice } from "@/api";
import {
  shopName,
  siteName,
  platformTypeName,
  transportTypeName,
  
} from "@/components/ElementUi/Form/customField";
import MxTable2 from "@/components/Mixins/MxTable2";
import { isRepetArr } from "@/utils/Arrays";
import message from "@/utils/Message";
export default {
  mixins: [MxTable2],
  data() {
    return {
      queryKey: 'poOrderEntry',
      primaryKey: "poId",
      primaryKey_child: 'eid',
      customField: [
        shopName,
        siteName,
        platformTypeName,
        transportTypeName,
        {
          topType: "date",
          required: true
        },
        {
          topType: "deliveryDate",
          required: true
        },
        {
          topType: "arriveDate",
          required: true
        },
        {
          topType: "no",
          required: true
        },
        {
          topType: "ttlQty",
          disabled: true
        },
        {
          topType: "ttlVolume",
          disabled: true
        },
        {
          topType: "ttlGwKg",
          disabled: true
        },
        {
          topType: "ttlNwKg",
          disabled: true
        },
        {
          topType: "ttlPackages",
          disabled: true
        },
        {
          topType: "fbaShipmentId",
          required: false
        }
      ],
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
        //表格中哪些字段可以被编辑
        "neGwKg",
        "neHeightCm",
        "neLengthCm",
        "neNwKg",
        "neWidthCm",
        "neVolumeM3",
        "quantity"
      ],
      parentKey: "salesShipNotice", // 点击新增、修改的时候传给后台的 key的名字
      subField: {  //radio选项  和  点击新增、修改的时候传给后台的key
        "1": { //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          name: "采购订单",
          key_submit: "salesShipNoticeEntry", //传给后台的key
          key_get: "noticeEntryList" //获取时从哪里拿出来
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
     
    },
    ajax_update(data){
   
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
      let table_data = this.table_table_data;
      let index = table_data.findIndex(item => {
        if (item === row) return false;
        return item.skuId === row.skuId;
      });

      if (index !== -1) {
        message.errorMessage("sku不能重复");
        row.skuId = null;
        row.sku = null;
      } else {
        let res = await getProductAdnSku({
          skuId: val
        });
        if (res.code == 200) {
          let data = res.data;
          for (let key in data) {
            row[key] = data[key];
          }
          row.neNwKg_ = row.neNwKg;
          row.neGwKg_ = row.neGwKg;
          row.neNwKg = row.neNwKg_ * row.quantity;
          row.neGwKg = row.neGwKg_ * row.quantity;
          Object.defineProperty(row, "quantity", {
            enumerable: true,
            set(val) {
              this.neNwKg = this.neNwKg_ * val;
              this.neGwKg = this.neGwKg_ * val;
            }
          });

          console.log(res);
        }

        this.table.table_data = [...this.table.table_data];
      }
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
  beforeCreate() {
    transportTypeName.hideChild = true;
  },
  async created() {}
};
</script>

<style>
</style>
