<script>
//外购入库
import { getIcBillStock, saveIcBillStock, delIcBillStock, getSkuName } from "@/api";
import {
  shopName,
  siteName,
  platformTypeName,
  transportTypeName
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
          //要验证的字段        
        // {
        //   topType: "date",
        //   required: true
        // },
        // {
        //   topType: "deptId",
        //   required: true
        // },
        // {
        //   topType: "supplierId",
        //   required: true
        // },
        // {
        //   topType: "no",
        //   required: true
        // },
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
        // "neGwKg",
        // "neHeightCm",
        // "neLengthCm",
        // "neNwKg",
        // "neWidthCm",
        "eRemark",
        "quantity"
      ],
      parentKey: "purchaseIcBillStock", // 点击新增、修改的时候传给后台的 父key的名字 (后台让传的参数)
      subField: {
        "1": { //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          //radio选项  和  点击新增、修改的时候传给后台的key
          name: "外购入库单",
          key_submit: "purchaseIcBillStockEntry", //传给后台的子key
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
    // table_table_data: {
    //   handler(table_data) {
    //     //1.根据表格里的数据计算form里的数据 2.sku不能重复
    //     let data_model = this.form_data_model;
    //     if (table_data && table_data.length) {
    //       let data_model = this.form_data_model;
    //       // let calcSum = [
    //       //   "ttlQty:quantity",
    //       //   "ttlVolume:neVolumeM3",
    //       //   "ttlGwKg:neGwKg",
    //       //   "ttlNwKg:neNwKg"
    //       // ];
    //       let ttlQty = 0, //总数量
    //         ttlVolume = 0, //总体积
    //         ttlGwKg = 0, //总毛重
    //         ttlNwKg = 0; //总净重
    //       let ttlPackages = 0; //总件数   以箱号的 '-'和','分割开来 取最大值
    //       // let skuIds = [];
    //       for (let i = 0; i < table_data.length; i++) {
    //         let data = table_data[i];
    //         // skuIds.push(data.skuId);
    //         console.log(data);

    //         ttlQty += +data.quantity || 0;
    //         ttlVolume += +data.neVolumeM3 || 0;
    //         ttlGwKg += +data.neGwKg || 0;
    //         ttlNwKg += +data.neNwKg || 0;
    //         let ttlPackages_arr =
    //           (data.packages && data.packages.split(/,|-/i).map(num => +num)) ||
    //           [];
    //         ttlPackages = Math.max(
    //           ttlPackages,
    //           Math.max.apply(Math, ttlPackages_arr) || 0
    //         );
    //       }

    //       let timer = null;
    //       function setValue() {
    //         //data_model中有些数据需要先请求，必须等待它请求完成
    //         let keys = Object.keys(data_model);
    //         if (!keys.length) {
    //           let self = this;
    //           timer = setTimeout(() => {
    //             setValue();
    //           }, 100);
    //         } else {
    //           data_model.ttlQty = ttlQty;
    //           data_model.ttlVolume = ttlVolume;
    //           data_model.ttlGwKg = ttlGwKg;
    //           data_model.ttlNwKg = ttlNwKg;
    //           data_model.ttlPackages = ttlPackages;
    //           clearTimeout(timer);
    //         }
    //       }
    //       setValue();

    //       // if(isRepetArr(skuIds)){
    //       //   message.infoMessage('sku不能重复');
    //       //   table_data[1].skuId = null;
    //       // }
    //     }
    //   },
    //   deep: true
    //   // immediate: true
    // }
  },
  methods: {
    queryPage(data) {
      return getIcBillStock(data); //查询页面的接口
    },
    ajax_add(data) {
      return saveIcBillStock(data); //新增的接口
    },
    ajax_update(data) {
      return upNotice(data); //修改
    },
     ajax_remove(data) {
      return delIcBillStock(data); //删除
    },
    // async changeSku(val, row, title) {
    //   console.log(val);
    //   console.log(row);
    //   console.log(title);
    //   let table_data = this.table_table_data;
    //   let index = table_data.findIndex(item => {
    //     if (item === row) return false;
    //     return item.skuId === row.skuId;
    //   });

    //   if (index !== -1) {
    //     message.errorMessage("sku不能重复");
    //     row.skuId = null;
    //     row.sku = null;
    //   } else {
    //     let res = await getProductAdnSku({
    //       skuId: val
    //     });
    //     if (res.code == 200) {
    //       let data = res.data;
    //       for (let key in data) {
    //         row[key] = data[key];
    //       }
    //       row.neNwKg_ = row.neNwKg;
    //       row.neGwKg_ = row.neGwKg;
    //       row.neNwKg = row.neNwKg_ * row.quantity;
    //       row.neGwKg = row.neGwKg_ * row.quantity;
    //       Object.defineProperty(row, "quantity", {
    //         enumerable: true,
    //         set(val) {
    //           this.neNwKg = this.neNwKg_ * val;
    //           this.neGwKg = this.neGwKg_ * val;
    //         }
    //       });

    //       console.log(res);
    //     }

    //     this.table.table_data = [...this.table.table_data];
    //   }
    // },
    //获取输入获取sku列表
    // async getSkuList(query, row) {
    //   console.log(this.form);
    //   console.log(this.form.data_model);
    //   let data_model = this.form.data_model;
    //   if (data_model.shopId && data_model.siteId) {
    //     let res = await getSkuName({
    //       sId: data_model.shopId,
    //       seId: data_model.siteId,
    //       kuName: query
    //     });
    //     if (res.code === 200) {
    //       if (row) {
    //         row.sku_data_ = res.data;
    //       } else {
    //         this.table.table_data.forEach(item => {
    //           item.sku_data_ = res.data;
    //         });
    //       }
    //       this.table.table_data = [...this.table.table_data];
    //     }
    //   }
    // }
  },
  beforeCreate() {
    // transportTypeName.hideChild = true;
  },
  async created() {}
};
</script>

<style>
</style>
