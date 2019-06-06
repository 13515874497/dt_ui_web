<script>
//到货通知单
import { 
	getReceiving, 
	saveReceiving, 
	getProductAdnSku, 
	getSkuName ,
	upReceiving,
	delReceivingNoticeAndNoticeEntry, 
	getDepartment,
	getFindByListQIMethod,
	findByListWarP,
	findByListFreight,
	getSelThisGroup,
	goClaim,
	goComplete
	} from "@/api";
import {
  shopName,
  siteName,
  platformTypeName,
  transportTypeName,
  supplierId,
  findListWar,
  findListWarP,
  findFreight,
  findProduct,
  getQIMethod
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
		//   
  //       {
  //         topType: "date",//单据日期
  //         required: true
  //       },
  //       {
  //         topType: "no",//单据编号
  //         required: true
  //       },
  //       {
  //         topType: 'empId',//业务员
  //         disabled: true,
  //       },
		// {
		//   topType: 'supplierId',//供应商
		//   disabled: true,
		// },
  //       {
  //         topType: 'mangerId',//主管
  //         disabled: true,
  //       },
		// {
		//   topType: 'closeUser',//关闭人
		//   disabled: true,
		// },
  //       {
  //         topType: 'fetchAdd',//交货地点
  //         disabled: true,
  //       },
		// {
		//   topType: 'explanation',//摘要
		//   disabled: true,
		// },
		// {
		//   topType: 'version',//版本
		//   disabled: true,
		// },
  //       {
  //         topType: 'status',//状态
  //         disabled: true,
  //       },
		// {
		//   topType: 'printCount',//打印次数
		//   disabled: true,
		// },
  //        {
  //         topType: "closeDate",//关闭时间
  //         disabled: true,
  //       },
		// {
		// 	topType:'deptId',//部门
		// 	disabled:true
		// }
      ],
      customField_table: [
		  findListWar,
		  findListWarP,
		  findFreight,
		  findProduct,
		  getQIMethod
        
		
      ],
      editable_field: [
        //表格中哪些字段可以被编辑
  //       "remark",
  //       "deliveryDate",
		// "sourceTypeId",
		// "sourceId",
		// "eRemark",
		// "arQty",
		// "iqQty",
		// "quQty",
		// "faQty",
		// "loQty",
		// "inQty",
		// "ivQty",
		// "rtQty",
  //       "reciveWarehouseId",
  //       "recivePositionId",
  //       "transportCompanyId",
  //       "trackingNumber",
  //       "quantity",
		// "productId",
		// "rowClosed"
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
	  async bbb(){
		// let res = await getFindByListQIMethod();
		//   console.log(res);
	  },
	  async aaa(){
		  // let resA = await getSelThisGroup();
		  // console.log(resA)
		 //  let tkId = {
			//   taskId : resA.data[0].tkId
		 //  }
		 //  console.log(tkId);
		 // let resB = await goClaim(tkId);
		 // console.log(resB);
		 // // let tackId = JSON.stringify(tkId);
		 // let aaa = {taskId : resA.data[0].tkId,rNoticerGroup:'供应中心'}
		 // let resC = await goComplete(aaa);
		 // console.log(resC)
	  },
	  initTableOperateList() {
	    let self = this;
	    this.tableOperateList = [
	      // {
	      //   type: "",
	      //   icon: "",
	      //   label: "外购入库",
	      //   fn(row, mul) {
	      //     self.outsourced_warehousing(row, mul);
	      //   },
	      //   isShow(row, mul){
	      //     console.log(row);
	      //     console.log(mul);
	      //     
	      //     return mul.length;
	      //   }
	      // },
		  // {
		  //   type: "",
		  //   icon: "",
		  //   label: "开始检测",
		  //   fn(row, mul) {
		  //     self.start_testing(row, mul);
		  //   },
		  //   isShow(row, mul){
		  //     console.log(row);
		  //     console.log(mul);
		  //     
		  //     return mul.length;
		  //   }
		  // },
		  {
		    type: "",
		    icon: "",
		    label: "到货确认",
		    fn(row, mul) {
		      self.arrival_confirmation(row, mul);
		    },
		    isShow(row, mul){
		      if(!row.rowClosed){
				   // return row.arQty;
				   return !row.quantity
			  }
		     
		    }
		  },
		  {
		    type: "",
		    icon: "",
		    label: "已完成",
		    fn(row, mul) {},
		    isShow(row, mul){
		      
		      return row.rowClosed;
		    }
		  }
	    ];
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
		// delete data.entry[0]._reciveWarehouseId;
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
		// if(mull.length>0){
		// 	for()
		// }
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
    },
	product_change(val,row,title,option){
	  console.log(val);
	  console.log(row);
	  console.log(title);
	  console.log(option)
	  // console.log(this.form.data_model);
	  // 
	  // this.form.data_model.contactPerson = option.contactPerson;
	  // this.form.data_model.telPhone = option.telPhone;
	  row.model = option.model;
	  row.productName = option.productName;
	  row.unitId = option.unitId;
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
	  },
	  
  },
  beforeCreate() {
    // transportTypeName.hideChild = true;
  },
  async created() {
	  this.initTableOperateList();
	  // this.btnShow();
	  this.getDepartment();
	 this.aaa();
	 this.bbb();
	 findProduct.required = true;
	 findProduct.cb = this.product_change;
  }
};
</script>

<style>
</style>
