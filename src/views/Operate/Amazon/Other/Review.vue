<script>
//review
import {
  getReview,
  saveReview,
  repGetShopName,
  getSelectSiteRole,
  getSkuName
} from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      customField: [
        {
          //店铺列表
          inputType: 3,
          topType: "shopName",
          bindKey: "shopId",
          ajax: repGetShopName,
          key: "shopId",
          label: "shopName",
          placeholder: "请选择店铺"
        },
        //站点
        {
          inputType: 3,
          topType: "siteName",
          bindKey: "siteId",
          ajax: getSelectSiteRole,
          key: "siteId",
          label: "siteName",
          filterable: true,
          placeholder: "请选择站点"
        },
        //sku
        {
          inputType: 3,
          topType: 'sku',
          bindKey: 'skuId',
          remote: true,
          key: 'skuId',
          label: 'sku',
          filterable: true,
          placeholder: '请输入后选择sku',
          remoteMethod: this.getSkuList,
          data:[]
        }
      ],
      rule: {
        //某些字段的验证规则
        // add: [{
        //   validator: lessThan2, //该字段的自定义验证规则
        //   trigger: "change"
        // }]
      }
    };
  },
  watch: {
    "form_data_model.shopId"() {
      this.getSkuList('');
    },
    "form_data_model.siteId"() {
      this.getSkuList('');
    }
  },
  methods: {
    queryPage(data) {
      return getReview(data);
    },
    ajax_add(data) {
      return saveReview(data);
    },
    //form表单中add字段的验证规则,需要用到form表单中其他字段的数据来进行验证
    rule_add(rule, val, cb) {
      let data = { ...this.form_data_model };
      console.log(data);

      if (val === "") {
        cb();
        return;
      }
      if (data.move !== "" && data.move != null) {
        cb(new Error("不能和移除同时输入"));
      } else {
        cb();
      }
    },
    //同上
    rule_move(rule, val, cb) {
      let data = { ...this.form_data_model };
      if (val === "") {
        cb();
        return;
      }
      if (data.add !== "" && data.add != null) {
        cb(new Error("不能和新增同时输入"));
      } else {
        cb();
      }
    },
    //获取输入获取sku列表
    async getSkuList(query) {
      let data = this.form_data_model;
      if (data.shopId && data.siteId) {
        let res = await getSkuName({
          sId: data.shopId,
          seId: data.siteId,
          kuName: query
        });
        console.log(res);
        if (res.code === 200) {
          console.log(res);
          this.sku_formItem.data = res.data
          this.customField.currField = 'sku'; //告诉子组建当前修改的字段是 'sku'
          this.customField.currQuery = query;
        }
      }
    },
    setRule() {
      let rule = {
        add: [
          {
            validator: this.rule_add, //该字段的自定义验证规则
            trigger: "change"
          }
        ],
        move: [
          {
            validator: this.rule_move, //该字段的自定义验证规则
            trigger: "change"
          }
        ]
      };
      this.rule = { ...this.rule, ...rule };
    }
  },
  async created() {
    this.setRule();
    this.sku_formItem = this.customField.find(item=>{
      return item.topType === 'sku';
    });
  }
};
</script>
