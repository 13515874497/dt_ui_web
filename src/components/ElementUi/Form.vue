<template>
  <!-- 0:字符型  1:数值型   2:日期型  3:下拉框  4：起止日期  -->
  <el-form
    ref="data_model"
    :model="data_model"
    label-width="108px"
    label-position="left"
    status-icon
    @validate="handlerValidate"
    :rules="rules"
  >
    <template v-for="item in formItems">
      <el-form-item
        v-if="item.statusOptions && item.statusOptions.length == 2"
        :label="item.headName"
        :prop="item.topType"
        :required="true"
        error="必填项"
      >
        <el-switch
          v-model="data_model[item.topType]"
          active-color="#409eff"
          inactive-color="#13ce66"
          :active-text="JSON.stringify(item.statusOptions[0].name)"
          :inactive-text="item.statusOptions[1].name"
          :active-value="item.statusOptions[0].id"
          :inactive-value="item.statusOptions[1].id"
          :disabled="item.disabled"
        ></el-switch>
      </el-form-item>

      <el-form-item
        v-else-if="item.statusOptions && item.statusOptions.length>0"
        :label="item.headName"
        :prop="item.topType"
        :required="true"
        error="必填项"
      >
        <el-select v-model="data_model[item.topType]" placeholder="请选择">
          <el-option
            v-for="option in item.statusOptions"
            :key="option.id"
            :label="option.name"
            :value="option.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-else-if="item.inputType == 4"
        :label="item.headName"
        :prop="item.topType"
        :rules="matchedRule(item)"
      >
        <el-date-picker
          value-format="timestamp"
          v-model="data_model[item.topType]"
          type="datetime"
          placeholder="选择日期"
        ></el-date-picker>
        <!-- <el-input
          v-model="data_model[item.topType]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        ></el-input>-->
      </el-form-item>

      <el-form-item
        v-else-if="item.inputType == 1"
        :label="item.headName"
        :prop="item.topType"
        :rules="matchedRule(item)"
      >
        <el-input
          v-model="data_model[item.topType]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        ></el-input>
      </el-form-item>

      <el-form-item
        v-else-if="item.inputType == 0 || !item.inputType"
        :label="item.headName"
        :prop="item.topType"
        :rules="matchedRule(item)"
      >
        <el-input
          v-model.trim="data_model[item.topType]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        ></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  props: {
    // 模板
    // formItems: [
    //   {
    //     headName: "姓名", //*
    //     topType: "name", //*
    //     inputType: 0, //*
    //     required: true, //是否必填
    //     statusOptions: [
    //       {
    //         id: false,
    //         name: "否"
    //       },
    //       {
    //         id: true,
    //         name: "是"
    //       },

    //       {
    //           id: 0,
    //           name: "字符型"
    //         },
    //         {
    //           id: 1,
    //           name: "数值型"
    //         }
    //     ],
    //     placeholder: "0:String, 1:int, 2:Data, 3,statusOption, 4:timeLine", //占位符
    //     disabled: true
    //   }
    // ],
    formItems: Array,
    formData: Object, //有传这个说明是修改
    rule: Object
  },
  data() {
    return {
      data_model: {},
      rules
    };
  },
  computed: {},
  watch: {
    formItem(){
      this.initData_model();
    },
    formData() {
      this.initData_model();
    },
    data_model: {
      async handler(val) {
        // console.log(val);
        this.passData(await this.isVerifyPass());
      },
      deep: true
    }
  },
  methods: {
    mergeRules(){
      this.rules = Object.assign(rules,this.rule);
      console.log(this.rules);
    },
    matchedRule(item){
      let key = item.topType,
          rules = this.rules;
      if(rules[key]){
        return rules[key] 
      }
      switch(item.inputType){
        case 1:
        case 4:
          return item.required? rules._number : rules.number
        case 0:
        default:
        return item.required? rules._str : rules.str
      }
    },
    initData_model() {
      let self = this;
      if (this.formData) {
        this.data_model = { ...this.formData };
        this.data_model_cache = { ...this.formData }; //只对基本数据类型做缓存
        console.log(this.data_model_cache);

        return;
      }
      console.log(this.formItems);
      
      this.formItems.forEach(item => {
        if (item.statusOptions && item.statusOptions.length) {
          self.$set(this.data_model, item.topType, item.statusOptions[0].id);
        } else {
          self.$set(this.data_model, item.topType, null);
        }
      });
      this.data_model_cache = { ...this.data_model };
      console.log(this.data_model);
    },
    getModifyData() {
      let modifyData = {};
      for (let key in this.data_model) {
        if (this.data_model[key] !== this.data_model_cache[key]) {
          modifyData[key] = this.data_model[key];
        }
      }
      return modifyData;
    },
    async isVerifyPass() {
      let self = this;

      //   console.log();
      let promise = await new Promise((resolve, reject) => {
        this.$refs["data_model"].validate((valid, obj) => {
          resolve([valid, obj]);
        });
      });
      //如果修改的字段验证错误发生时 当前值和原先的值一样, 那么验证通过 flag通过并向上传递
      let errCount = 0;
      for (let key in promise[1]) {
        errCount++;
        if (this.data_model[key] === this.data_model_cache[key]) {
          errCount--;
        }
      }
      return errCount === 0;
    },
    passData(isPass) {
      // [是否验证通过,绑定的数据,修改后发生变化的数据]
      this.$emit("passData", [isPass, this.data_model, this.getModifyData()]);
    },
    handlerValidate(key, valid, errMsg) {
      if (this.data_model[key] === this.data_model_cache[key]) {
        this.$refs["data_model"].clearValidate([key]);
      }
    }
  },
  created() {
    this.initData_model();
    console.log(this.formItems);
    console.log(this.formData);
    this.mergeRules();
    
  },
  mounted() {}
};
</script>

<style>
</style>
