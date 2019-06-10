<template>
  <Mx2Interface
    :titles="titles"
    :data="add.checkedData"
    :customField="customField"
    :customField_table="customField_table"
    :editable_field="editable_field"
    :radios="subField"
    @giveForm="getForm"
    @giveTable="getTable"
    @passData="passData_add"
  ></Mx2Interface>
</template>

<script>
import requestAjax from "@/api/requestAjax";
import otherFlowMixins from "@/components/Mixins/Mxtable2/otherFlowMixins.js";
console.log(otherFlowMixins);

let page = null;
export default {
  
  props: {
    mixin: {
      type: Object,
      required: true
    }
  },
  mixins: [otherFlowMixins.pageCode],
  data() {
    return {
      titles: [],
    };
  },
  watch: {
    mixin(val) {}
  },
  async created() {
    let titles = (await requestAjax.requestGetHead(otherFlowMixins.pageId)) || [];
    this.titles = titles.filter(item => {
      return !this.sysLogNotForm.includes(item.topType);
    });
    console.log(this.titles);

    // console.log(this.tableTitle);

    // console.log(this.formItems);
  }
};
</script>

<style>
</style>
