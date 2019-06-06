<script>
//采购订单
import {
  getPoOrder,
  savePoOrder,
  upPoOrder,
  delPoOrder,
  startProcess,
} from "@/api";
import {
  currencyName,
  supplierFullName,
  prePayId,
  findListWar,
  findListWarP
} from "@/components/ElementUi/Form/customField";
import MxTable2 from "@/components/Mixins/MxTable2";
import { isRepetArr } from "@/utils/Arrays";
import message from "@/utils/Message";
export default {
  mixins: [MxTable2],
  data() {
    return {
      // queryKey: 'poOrderEntry', //分页中查询的key
      // queryKey: 'entry', //分页中查询的key
      primaryKey: "poId",
      primaryKey_child: "poeId",
      customField: [
        currencyName,
        supplierFullName,
        prePayId,
        {
          topType: "no",
          required: true
        },
        {
          topType: "date",
          required: true
        }
        // {
        //   topType: 'quantity',
        //   required: true
        // },
      ],
      customField_table: [findListWar, findListWarP],
      editable_field: [
        //表格中哪些字段可以被编辑
      ],
      // parentKey: "purchasePoOrder", // 点击新增、修改的时候传给后台的 key的名字
      subField: {
        //radio选项  和  点击新增、修改的时候传给后台的key
        "1": {
          //1代表  第一个二级子字段  2代表第二个子字段  1-1代表第1个2级子字段的第1个3级子字段(暂时不考虑3级子字段)
          name: "采购订单"
          // key_submit: "purchasePoOrderEntry" //传给后台的key
          // key_get: "poOrderEntryList" //获取时从哪里拿出来
          // key_get: "entryList" //获取时从哪里拿出来
        }
      }
    };
  },
  watch: {
    tableTitle(val) {
      let self = this;
      this.tableTitle.forEach(title => {
        self.editable_field.push(title.topType);
      });
    }
  },
  methods: {
    queryPage(data) {
      return getPoOrder(data); //查询页面的接口
    },
    ajax_add(data) {
      console.log(data);
      // let start = {...data};
      // start.pOrderGroup = "数据部,供应中心";
      // startProcess(start);
      return savePoOrder(data);
    },
    ajax_update(data) {
      return upPoOrder(data);
    },
    ajax_remove(data) {
      return delPoOrder(data);
    },
    //点击生成收货通知单
    async btn_generateReceivingNotice(row, mul) {
      this.setOther(294);
    },
    //选择供应商后自动填写联系人和联系电话
    changeSel_supplierFullName(val, formItem, option) {
      this.form.data_model.contactPerson = option.contactPerson;
      this.form.data_model.telPhone = option.telPhone;
    },
    //选择预付单号后自动填写预付金额
    changeSel_prePayId(val, formItem, option) {
      this.form.data_model.prePayAmt = option.amount;
    },
    //初始化表格右侧操作按钮
     initTableOperateList() {
      let self = this;
      this.tableOperateList = [
        {
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          label: "生成收货通知单",
          fn(row, mul) {
            self.btn_generateReceivingNotice(row, mul);
          },
          // isShow(row, mul) {
          //   console.log(row);
          //   console.log(mul);

          //   return mul.length;
          // }
        }
      ];
    },
  },
  beforeCreate() {},

  async created() {
    console.log(MxTable2);
    
    prePayId.cb = this.changeSel_prePayId;
    supplierFullName.cb = this.changeSel_supplierFullName;
    supplierFullName.required = true;
    this.initTableOperateList();
    // let res = await getRPPay();
  }
};
</script>

<style>
</style>
