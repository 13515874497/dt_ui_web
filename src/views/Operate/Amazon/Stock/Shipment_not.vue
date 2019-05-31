<script>
//出货通知单
import {
  getNotice,
  saveNotice,
  getProductAdnSku,
  getSkuName,
  upNotice,
  delShipNoticeAndNoticeEntry
} from "@/api";
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
      queryKey: "shipNoticeEntry",
      primaryKey: "shipNoticeId",
      nameKey: "no",
      primaryKey_child: "eid",
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
      subField: {
        //radio选项  和  点击新增、修改的时候传给后台的key
        "1": {
          //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          name: "出货通知单",
          key_submit: "salesShipNoticeEntry", //传给后台的key
          key_get: "noticeEntryList" //获取时从哪里拿出来
        }
      },
      tableOperateList:[]
    };
  },
  watch: {
    "form_data_model.shopId"() {
      this.getSkuList("");
      let table_data = this.table_table_data;
      table_data = [];
    },
    "form_data_model.siteId"() {
      this.getSkuList("");
      let table_data = this.table_table_data;
      table_data = [];
    },
    "form_data_model.platformTypeId"(val) {
      console.log(val);
      let fbaShipmentId = this.customField.find(item => {
        return item.topType === "fbaShipmentId";
      });
      if (val === 1) {
        fbaShipmentId.required = true;
      } else {
        fbaShipmentId.required = false;
      }
    },
    table_table_data: {
      handler(table_data) {
        //1.根据表格里的数据计算form里的数据 2.sku不能重复
        let data_model = this.form_data_model;
        if (table_data && table_data.length) {
          let data_model = this.form_data_model;
          // let calcSum = [
          //   "ttlQty:quantity",
          //   "ttlVolume:neVolumeM3",
          //   "ttlGwKg:neGwKg",
          //   "ttlNwKg:neNwKg"
          // ];
          let ttlQty = 0, //总数量
            ttlVolume = 0, //总体积
            ttlGwKg = 0, //总毛重
            ttlNwKg = 0; //总净重
          let ttlPackages = 0; //总件数   以箱号的 '-'和','分割开来 取最大值
          // let skuIds = [];
          for (let i = 0; i < table_data.length; i++) {
            let row = table_data[i];
            row.neNwKg = row.neNwKg_ * row.quantity;
            row.neGwKg = row.neGwKg_ * row.quantity;
            // skuIds.push(row.skuId);
            console.log(row);

            ttlQty += +row.quantity || 0;
            ttlVolume += +row.neVolumeM3 || 0;
            ttlGwKg += +row.neGwKg || 0;
            ttlNwKg += +row.neNwKg || 0;
            let ttlPackages_arr =
              (row.packages && row.packages.split(/,|-/i).map(num => +num)) ||
              [];
            ttlPackages = Math.max(
              ttlPackages,
              Math.max.apply(Math, ttlPackages_arr) || 0
            );
          }

          let timer = null;
          function setValue() {
            //data_model中有些数据需要先请求，必须等待它请求完成
            let keys = Object.keys(data_model);
            if (!keys.length) {
              let self = this;
              timer = setTimeout(() => {
                setValue();
              }, 100);
            } else {
              data_model.ttlQty = ttlQty;
              data_model.ttlVolume = ttlVolume;
              data_model.ttlGwKg = ttlGwKg;
              data_model.ttlNwKg = ttlNwKg;
              data_model.ttlPackages = ttlPackages;
              clearTimeout(timer);
            }
          }
          setValue();

          // if(isRepetArr(skuIds)){
          //   message.infoMessage('sku不能重复');
          //   table_data[1].skuId = null;
          // }
        }
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    queryPage(data) {
      return getNotice(data); //查询页面的接口
    },
    ajax_add(data) {
      return saveNotice(data); //新增的接口
    },
    ajax_update(data) {
      return upNotice(data);
    },
    ajax_remove(data) {
      return delShipNoticeAndNoticeEntry(data);
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
          // Object.defineProperty(row, "quantity", {
          //   enumerable: true,
          //   set(val) {
          //     this.neNwKg = this.neNwKg_ * val;
          //     this.neGwKg = this.neGwKg_ * val;
          //   }
          // });
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
    },
    addRow(row){
      console.log(row);
    },
    initTableOperateList(){
      let self = this;
      this.tableOperateList = [
        {
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          label: "我是自定义功能",
          fn(row) {
            self.addRow(row);
          }
        },
        {
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          label: "我是自定义功能",
          fn(row) {
            self.addRow(row);
          }
        },
        {
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          label: "我是自定义功能",
          fn(row) {
            self.addRow(row);
          }
        },
      ]
    }
  },
  beforeCreate() {
    transportTypeName.hideChild = true;
  },
  created() {
    this.initTableOperateList();
  }
};
</script>

<style>
</style>
