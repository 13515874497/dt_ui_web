<script>
//出货通知单
import { getReceiving, saveReceiving, getProductAdnSku, getSkuName ,upReceiving,delReceivingNoticeAndNoticeEntry} from "@/api";
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
		primaryKey: "rnId",
		queryKey: 'purchasePoReceiptNoticeEntry',
		nameKey : 'rnNo',
		primaryKey_child: 'rne_id',
      customField: [
        {
          topType: "date",
          required: true
        },
        // {
        //   topType: "deliveryDate",
        //   required: true
        // },
        {
          topType: "closeUser",
          required: true
        },
        {
          topType: "no",
          required: true
        },
		 {
		  topType: "closeDate",
		  required: true
		},
        {
          topType: 'empId',
          disabled: true,
        },
        {
          topType: 'mangerId',
          disabled: true,
        },
        // {
        //   topType: 'fetchAdd',
        //   disabled: true,
        // },
        // {
        //   topType: 'status',
        //   disabled: true,
        // },
        // {
        //   topType: 'remark',
        //   required: false,
        // }
      ],
      customField_table: [
        // {
        //   inputType: 3,
        //   topType: "sku",
        //   bindKey: "skuId",
        //   remote: true,
        //   key: "skuId",
        //   label: "sku",
        //   filterable: true,
        //   placeholder: "选择店铺站点后输入,需鼠标点击",
        //   remoteMethod: this.getSkuList,
        //   data: [],
        //   changeSel: this.changeSku
        // }
		
      ],
      editable_field: [
        //表格中哪些字段可以被编辑
        "remark",
        "deliveryDate",
        "reciveWarehouseId",
        "recivePositionId",
        "transportCompanyId",
        "trackingNumber",
        "quantity",
		"productId",
		"rowClosed"
      ],
      parentKey: "purchasePoReceiptNotice", // 点击新增、修改的时候传给后台的 key的名字
      subField: {
        "1": { //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          //radio选项  和  点击新增、修改的时候传给后台的key
          name: "收货通知单",
          key_submit: "purchasePoReceiptNoticeEntry", //传给后台的key
          key_get: 'poReceiptNoticeEntryList' //获取时从哪里拿出来
        } 
      }
    };
  },
  
  methods: {
    queryPage(data) {
      return getReceiving(data); //查询页面的接口
    },
    ajax_add(data) {
      return saveReceiving(data); //新增的接口 
    },
	ajax_update(data) {
		data.purchasePoReceiptNotice.statusId = '1';
		data.purchasePoReceiptNoticeEntry.push( {"version": 0})
	  return upReceiving(data);
	},
	ajax_remove(data) {
	  return delReceivingNoticeAndNoticeEntry(data);
	},
	arrival_confirmation(row){
		console.log(row)
		this.more.visible = true;
	},
	outsourced_warehousing(row){
		console.log(row)
		this.more.visible = true;
	},
	start_testing(row){
		console.log(row)
		this.more.visible = true;
	},
	bad_goods(row){
		console.log(row)
		this.more.visible = true;
	},
	good_warehousing(row){
		console.log(row)
		this.more.visible = true;
	},
	all_goods(row){
		console.log(row)
		this.more.visible = true;
	},
	surePop(){
		console.log('确定111')
	},
	cancelPop(){
		console.log('取消222')
	},
	initTableOperateList() {
	    let self = this;
	    this.tableOperateList = [
	      //对已上传的文件进行操作的按钮列表
	      {
	        // type: "arrivalConfirmation",
	        icon: "",
	        label: "到货确认",
	        fn(row) {
	          self.arrival_confirmation(row);
	        }
	      },
	   //    {
	   //      // type: "outsourcedWarehousing",
	   //      icon: "",
	   //      label: "外购入库",
	   //      fn(row) {
	   //        self.outsourced_warehousing(row);
	   //      }
	   //    },
	   //    {
	   //      // type: "startTesting",
	   //      icon: "",
	   //      label: "开始检测",
	   //      fn(row) {
	   //        self.start_testing(row);
	   //      }
	   //    },
	   //    {
	   //      // type: "badGoods",
	   //      icon: "",
	   //      label: "不良品入库",
	   //      fn(row) {
	   //        self.bad_goods(row);
	   //      }
	   //    },
		  // {
		  //   // type: "goodWarehousing",
		  //   icon: "",
		  //   label: "良品入库",
		  //   fn(row) {
		  //     self.good_warehousing(row);
		  //   }
		  // },
		  // {
		  //   // type: "allGoods",
		  //   icon: "",
		  //   label: "良品不良品入库",
		  //   fn(row) {
		  //     self.all_goods(row);
		  //   }
		  // }
	    ];
	  },
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
    // transportTypeName.hideChild = true;
  },
  async created() {
	  this.initTableOperateList();
  }
};
</script>

<style>
</style>
