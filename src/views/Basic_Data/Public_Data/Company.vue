<script>
//公司
import { findByListCompany, saveCompany, upCompany, delCompany } from "@/api";
import { lessThan2 } from "@/utils/verify.js";
import MxTable from "@/components/Mixins/MxTable";
export default {
  mixins: [MxTable],
  data() {
    return {
      showQuery: false, //是否显示上方查询功能
      primaryKey: "companyId", //修改、删除的时候需要一个主键
      rule: {
        //某些字段的验证规则
        companyShortCode: [{
          validator: lessThan2, //该字段的自定义验证规则
          trigger: "change"
        }]
      }
    };
  },
  methods: {
    queryPage(data) {
      return findByListCompany(data); //查询页面的接口
    },
    ajax_add(data) {
      return saveCompany(data); //新增的接口
    },
    ajax_update(data) {
      //修改的接口
      return upCompany(data);
    },
    ajax_remove(data) {
      //删除的接口
      return delCompany(data);
    }
  }
};
</script>

<style>
</style>
