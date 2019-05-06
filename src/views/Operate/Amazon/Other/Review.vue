<script>
//review
import { getReview, saveReview, repGetShopName,getSelectSiteRole } from "@/api";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      customField: [
        {
          //店铺列表
          topType: "shopName",
          inputType: 3,
          ajax: repGetShopName,
          key: "shopId",
          label: "shopName",
          placeholder: '请选择店铺'
        },
        {
          topType: 'siteName',
          inputType: 3,
          ajax: getSelectSiteRole,
          key: 'siteId',
          label: 'siteName',
          filterable: true,
          placeholder: '请选择站点'
        },
        // {
        //   topType: 'sku',
        //   inputType: 3,
        //   filterable: true,
        // }
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
  methods: {
    queryPage(data) {
      return getReview(data);
    },
    ajax_add(data) {
      return saveReview(data);
    },
    //form表单中add字段的验证规则,需要用到form表单中其他字段的数据来进行验证
    rule_add(rule, val, cb) {
      let data = { ...this.ref_form_model };
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
      let data = { ...this.ref_form_model };
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
    // let res =await getSelectSiteRole()
    // console.log(res);
    
  }
};
</script>
