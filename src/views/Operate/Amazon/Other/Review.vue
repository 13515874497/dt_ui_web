<script>
//review
import { getReview, saveReview, repGetShopName } from "@/api";
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
          label: "shopName"
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
  methods: {
    queryPage(data) {
      return getReview(data);
    },
    ajax_add(data) {
      return saveReview(data);
    },
    //form表单中add字段的验证规则,需要用到form表单中字段的数据
    rule_add(rule, val, cb) {
      if(val === '') {
        cb();
        return;
      }
      if(this.passData && (this.passData.move !== '' && this.passData.move != null)){
        cb(new Error('不能和移除同时输入'))
      }else {
        cb();
      }
    },
    rule_move(rule, val, cb) {
      if(val === '') {
        cb();
        return;
      }
      if(this.passData && (this.passData.add !== '' && this.passData.add != null)){
        cb(new Error('不能和新增同时输入'))
      }else {
        cb();
      }
    },
    setRule() {
      let rule = {
          add: [{
          validator: this.rule_add, //该字段的自定义验证规则
          trigger: "change"
        }],
        move: [{
          validator: this.rule_move, //该字段的自定义验证规则
          trigger: "change"
        }]
      }
      this.rule = {...this.rule,...rule}
    }
  },
  created(){
    this.setRule();
  }
};
</script>
