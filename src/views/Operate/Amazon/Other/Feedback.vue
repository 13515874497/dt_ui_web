<script>
//feedback
import { getFeedback, repGetShopName, getSelectSiteRole } from "@/api";
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
        }
      ]
    };
  },
  methods: {
    queryPage(data) {
      return getFeedback(data);
    },
    rule_add(rule, val, cb) {
      let data = { ...this.form_data_model };
      console.log(data);

      if (val === "" || val === null) {
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
      if (val === "" || val === null) {
        cb();
        return;
      }
      if (data.add !== "" && data.add != null) {
        cb(new Error("不能和新增同时输入"));
      } else {
        cb();
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
  created() {
    this.setRule();
  }
};
</script>

