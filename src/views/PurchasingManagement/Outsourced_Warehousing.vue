<script>
//外购入库
import {
  getIcBillStock,
  saveIcBillStock,
  delIcBillStock,
  uplIcBillStock,
  getDepartment
} from "@/api";
import {
  supplierFullName, //供应商
  findListWar, //仓库
  findListWarP, //仓位
  findProduct //产品代码
} from "@/components/ElementUi/Form/customField";
import MxTable2 from "@/components/Mixins/MxTable2";
import { isRepetArr } from "@/utils/Arrays";
import message from "@/utils/Message";
export default {
  mixins: [MxTable2],
  data() {
    return {
      nameKey: "no", //点击删除，失败的话会有提示，这个是需要传入的key
      primaryKey: "sbId", //后台返回的
      primaryKey_child: "sbeId", //后台返回的
      queryKey: "purchaseIcBillStockEntry", //后台返回
      customField: [
        supplierFullName,

        //要验证的字段
        {
          topType: "date",
          required: true
        },
        {
          topType: "icNo",
          required: true
        },
        {
          topType: "empId",
          required: true
        },
        {
          topType: "deptId", //部门
          disabled: true
        }
      ],

      customField_table: [
        findListWar,
        findListWarP,
      ],
      editable_field: [
        //表格中哪些字段可以被编辑
        "eRemark",
        "quantity"
        // "rowClosed"
      ],
      parentKey: "purchaseIcBillStock", // 点击新增、修改的时候传给后台的 父key的名字 (后台让传的参数)
      subField: {
        "1": {
          //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          //radio选项  和  点击新增、修改的时候传给后台的key
          name: "外购入库单",
          key_submit: "purchaseIcBillStockEntry", //传给后台的子key(后台给的)
          key_get: "purchaseIcBillStockEntryList" //获取是从后台返回数据拿出来
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
    }
  },
  methods: {
    initTableOperateList() {
      let self = this;
      this.tableOperateList = [
        {
          type: "primary",
          icon: "",
          label: "发票",
          fn(row, mull) {
            self.addRow(row, mull);
          }

          // 这里不写isshow方法操作按钮就默认显示。加入isshow就点击显示
          // isShow(row, mull) {
          //   // console.log(row);
          //   // console.log(mull);
          //   return mull.length;
          // }
        }
        // {
        //   type: "primary",
        //   icon: "",
        //   label: "出库",
        //   fn(row, mull) {
        //     self.redceRow(row, mull);
        //   },

        //   // 这里不写isshow方法操作按钮就默认显示。加入isshow就点击显示
        // isShow(row, mull) {
        //   // console.log(row);
        //   // console.log(mull);
        //   return mull.length;
        // }
        // }
      ];
    },
    async addRow(row, mull) {
      console.log("关联发票");
    },
    // redceRow(row, mull) {
    //   console.log("退库");
    // },
    queryPage(data) {
      return getIcBillStock(data); //查询页面的接口
    },

    ajax_add(data) {
      data.mid = 295; //后台需要传入的参数mid就是当前页面的id
      return saveIcBillStock(data); //新增的接口
    },

    ajax_update(data) {
      return uplIcBillStock(data); //修改
    },
    ajax_remove(data) {
      return delIcBillStock(data); //删除
    },

    async aaa() {
      //   let resa = await getSelThisGroup();
      //   console.log(resa);
      //   let taskId = {
      //     taskId: resa.data[0].taskId
      //   }
      //   console.log(taskId)
      //   goClaim(taskId).then(res =>{
      //   console.log(res)
      // })
    },
    async getDepartment() {
      //部门接口没数据
      let res = await getDepartment();
      console.log(res);
      // if(res.code == 200){
      // 	this.department = res.data.treeName;
      // 	console.log(res);
      // }
    }
  },
  beforeCreate() {
    // transportTypeName.hideChild = true;
  },
  async created() {
    this.initTableOperateList();
    this.aaa();
    this.getDepartment();
  },
  watch: {
    form_data_model(val, oldVal) {
      console.log(val);
      console.log(oldVal);
      console.log(this.form_editing);
      switch (this.form_editing) {
        case "add":
          this.form.data_model.date = new Date().getTime(); //获取input框当前日期的默认时间
          //  this.form_data_model.empId = this.getCookie("name"); //获取当前用户的用户名
          // this.form_data_model.empId = this.getCookie("uId"); //获取当前用户的id
          console.log(this.getCookie("uId"));
          break;
      }
    }
  }
};
</script>

<style>
</style>
