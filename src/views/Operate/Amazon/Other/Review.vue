<script>
//review
import {
  getReview,
  saveReview,
  delReview,
  getSkuName,
} from "@/api";
import {shopName,siteName,starLevelName} from '@/components/ElementUi/Form/customField'
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      primaryKey: "reId",
      customField: [
        shopName,
        siteName,
        starLevelName,
        //sku
        {
          inputType: 3,
          topType: "sku",
          bindKey: "skuId",
          remote: true,
          key: "skuId",
          label: "sku",
          filterable: true,
          placeholder: "输入选择sku,需鼠标点击",
          remoteMethod: this.getSkuList,
        },
      ],
      rule: {
      },
    };
  },
  watch: {
    "form_data_model.shopId"() {
      this.getSkuList("");
    },
    "form_data_model.siteId"() {
      this.getSkuList("");
    }
  },
  methods: {
    queryPage(data) {
      return getReview(data);
    },
    ajax_add(data) {
      return saveReview(data);
    },
    ajax_remove(data) {
      //删除的接口
      return delReview(data);
    },
    //form表单中add字段的验证规则,需要用到form表单中其他字段的数据来进行验证
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
    //获取输入获取sku列表
    async getSkuList(query) {
      console.log(this.form);
      
      let data_model = this.form.data_model;
      console.log(data_model);
      
      let formItems_ = this.form.formItems_;
      let formItem = formItems_.find(formItem=>{
        return formItem.topType === 'sku'
      });
      if (data_model.shopId && data_model.siteId){
        let res = await getSkuName({
          sId: data_model.shopId,
          seId: data_model.siteId,
          kuName: query
        });
        if (res.code === 200) {
          formItem.data = res.data
          this.form.formItems_ = [...this.form.formItems_]
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
    // let res = await findByListStarLevel();
    // console.log(res);
  }
};
</script>
