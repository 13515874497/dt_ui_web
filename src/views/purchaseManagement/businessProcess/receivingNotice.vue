<script>
//出货通知单
import { 
	getReceiving, 
	saveReceiving, 
	getProductAdnSku, 
	getSkuName ,
	upReceiving,
	delReceivingNoticeAndNoticeEntry, 
	getDepartment
	} from "@/api";
import {
  shopName,
  siteName,
  platformTypeName,
  transportTypeName,
  supplierId,
  findListWar,
  findFreight
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
		nameKey : 'no',
		primaryKey_child: 'rne_id',
		customField: [
		  supplierId,
		  
		  // findFreight
		  // findListWar
  //       {
  //         topType: "date",
  //         required: true
  //       },
  //       // {
  //       //   topType: "deliveryDate",
  //       //   required: true
  //       // },
  //       {
  //         topType: "closeUser",
  //         required: true
  //       },
  //       {
  //         topType: "no",
  //         required: true
  //       },
		//  {
		//   topType: "closeDate",
		//   required: true
		// },
  //       {
  //         topType: 'empId',
  //         disabled: true,
  //       },
  //       // {
  //       //   topType: 'mangerId',
  //       //   disabled: true,
  //       // },
  //       // {
  //       //   topType: 'fetchAdd',
  //       //   disabled: true,
  //       // },
  //       // {
  //       //   topType: 'status',
  //       //   disabled: true,
  //       // },
  //       // {
  //       //   topType: 'remark',
  //       //   required: false,
  //       // },
		// 	{
		// 		topType:'deptId',
		// 		disabled:true
		// 	}
      ],
      customField_table: [
		  findListWar
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
      },
	  department:'',
	  dataList:[],
	  procedure : {
		  goodNum:100,//商品数量
		  nowNum : 50,//确认数量
		  goNum:70,//入库数量
		  isclosed:false,//是否关闭
		  isTesting : {//检测
			  noTesting : false,//免检
			  yesTesting:{
				  allTesting:false,//全检
				  everyTesting : true//抽检
			  },
		  },
		  badNum:{//不良产品
			  badGoodsNum:0,//不良产品数量
			  goodsNum:90//合格产品数量
			  
		  }  
	  }
    };
  },
  
  methods: {
	  async aaa(){
		 // let res = await findByListFreight();
		 // console.log(res);
	  },
	btnShow(){
		let self = this;
		if(this.procedure.isclosed){//如果关闭了
			this.tableOperateList = [
			  //对已上传的文件进行操作的按钮列表
			  {
			    type: "",
			    icon: "",
			    label: "已完成",
			    fn(row,mull) {
			    }
			  },
			]
		}else{//没有关闭
		
			if(this.procedure.nowNum == 0){//如果确认数量为0
				this.tableOperateList = [
				  //对已上传的文件进行操作的按钮列表
				  {
				    type: "",
				    icon: "",
				    label: "到货确认",
				    fn(row,mull) {
				      self.arrival_confirmation(row,mull);
				    }
				  },
				]
			}else{//确认数量不为0
				//各品类数量显示按钮
				// if(this.procedure.badNum.badGoodsNum>0&&this.procedure.badNum.goodsNum==0){
				// 	this.tableOperateList.push({icon: "",label: "不良品入库",fn(row,mull) {self.bad_goods(row,mull);}})
				// }else if(this.procedure.badNum.badGoodsNum==0&&this.procedure.badNum.goodsNum>0){
				// 	this.tableOperateList.push({icon: "",label: "良品入库",fn(row,mull) {self.good_warehousing(row,mull);}})
				// }else if(this.procedure.badNum.badGoodsNum>0&&this.procedure.badNum.goodsNum>0){
				// 	this.tableOperateList.push({icon: "",label: "良品不良品入库",fn(row,mull) {self.all_goods(row,mull);}})
				// }
				//入库数量小于确认数量
				if( this.procedure.goNum < this.procedure.nowNum){
					this.tableOperateList.push({icon: "",label: "外购入库",fn(row,mull) {self.outsourced_warehousing(row,mull);}})
				}else if(this.procedure.goNum == this.procedure.nowNum){
					this.tableOperateList.push({icon: "",label: "已完成",fn(row,mull) {}})
				}
				if(this.procedure.isTesting.noTesting){//如果免检
					if(this.procedure.nowNum>0&&this.procedure.nowNum<this.procedure.goodNum){//确认数量大于0并且小于数量
						this.tableOperateList.push({icon: "",label: "到货确认",fn(row,mull) {self.arrival_confirmation(row,mull);}},{icon: "",label: "外购入库",fn(row,mull) {self.outsourced_warehousing(row,mull);}})
					}else if(this.procedure.nowNum > this.procedure.goodNum || this.procedure.nowNum == this.procedure.goodNum){//确认数量大于等于数量
						this.tableOperateList.push({icon: "",label: "外购入库",fn(row,mull) {self.outsourced_warehousing(row,mull);}})
					}
				}else {
					if(this.procedure.nowNum>0&&this.procedure.nowNum<this.procedure.goodNum){//确认数量大于0并且小于数量
						this.tableOperateList.push({icon: "",label: "到货确认",fn(row,mull) {self.arrival_confirmation(row,mull);}},{icon: "",label: "开始检测",fn(row,mull) {self.start_testing(row,mull);}})
					}else if(this.procedure.nowNum > this.procedure.goodNum || this.procedure.nowNum == this.procedure.goodNum){//确认数量大于等于数量
						this.tableOperateList.push({icon: "",label: "开始检测",fn(row,mull) {self.start_testing(row,mull);}})
					}
			
				}
		
			}
			
		}
	},
	async getDepartment(){
		//部门接口有问题 目前先使用数组第一个的充数
		let res = await getDepartment();
		if(res.code == 200){
			this.department = res.data.treeName;
			console.log(res);
		}
		
	},
    queryPage(data) {
      return getReceiving(data); //查询页面的接口
    },
    ajax_add(data) {
      return saveReceiving(data); //新增的接口 
    },
	ajax_update(data) {
		// data.parentKey.statusId = '1';
		// data.entry[0].version = 0 ;
	  return upReceiving(data);
	},
	ajax_remove(data) {
	  return delReceivingNoticeAndNoticeEntry(data);
	},
	arrival_confirmation(row,mull){//到货确认
		console.log(row,mull)
		this.more.visible = true;
		mull.length>0?this.dataList = mull:this.dataList = [row];
		this.dataListObj = {type:'01',dataList:this.dataList}
		console.log(this.dataListObj);
	},
	outsourced_warehousing(row,mull){//外购入库
		console.log(row,mull)
		this.more.visible = true;
		mull.length>0?this.dataList = mull:this.dataList = [row]
		this.dataListObj = {type:'02',dataList:this.dataList}
		console.log(this.dataListObj);
	},
	start_testing(row,mull){//开始检测
		console.log(row,mull)
		this.more.visible = true;
		mull.length>0?this.dataList = mull:this.dataList = [row]
		this.dataListObj = {type:'03',dataList:this.dataList}
		console.log(this.dataListObj);
	},
	// bad_goods(row,mull){//不良品入库
	// 	console.log(row,mull)
	// 	this.more.visible = true;
	// 	mull.length>0?this.dataList = mull:this.dataList = [row]
	// 	this.dataListObj = {type:'04',dataList:this.dataList}
	// 	console.log(this.dataListObj);
	// },
	// good_warehousing(row,mull){//良品入库
	// 	console.log(row,mull)
	// 	this.more.visible = true;
	// 	mull.length>0?this.dataList = mull:this.dataList = [row]
	// 	this.dataListObj = {type:'05',dataList:this.dataList}
	// 	console.log(this.dataListObj);
	// },
	// all_goods(row,mull){//良品不良品入库
	// 	console.log(row,mull)
	// 	this.more.visible = true;
	// 	mull.length>0?this.dataList = mull:this.dataList = [row]
	// 	this.dataListObj = {type:'06',dataList:this.dataList}
	// 	console.log(this.dataListObj);
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
  watch:{
	  form_data_model(val,oldVal){
		  console.log(val);
		  console.log(oldVal);
		  console.log(this.form_editing)
		  switch(this.form_editing){
			   case 'add':
					this.form.data_model.date = new Date().getTime();
					this.form_data_model.empId = this.getCookie("name");
					this.form_data_model.deptId = this.department;
					console.log('1111')
					break;
				
			}
	  }
  },
  beforeCreate() {
    // transportTypeName.hideChild = true;
  },
  async created() {
	  // this.initTableOperateList();
	  this.btnShow();
	  this.getDepartment();
	 this.aaa();
  }
};
</script>

<style>
</style>
