<template>
  <!-- 0:字符型  1:数值型   2:日期型  3:下拉框  4：起止日期  5:级联选择器-->
  <el-form
    ref="data_model"
    :model="data_model"
    label-width="108px"
    label-position="left"
    status-icon
    @validate="handlerValidate"
    :rules="rules"
    class="form-content scrollbar"
  >
    <template v-for="item in _formItems">
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
        v-else-if="item.inputType === 5"
        :label="item.headName"
        :props="item.topType"
        :rules="matchedRule(item)"
      >
        <el-cascader
          expand-trigger="hover"
          :options="item.data"
          v-model="data_model['_'+item.topType]"
          @change="triggerFormChange"
          :props="props_inputType5"
          :filterable="true"
        ></el-cascader>
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

    // custom_field: [
    //   {
    //     //类目名称=>产品名称
    //     topType: ["productsName", "productName"],
    //     inputType: 5,
    //     headName: "产品类目和产品名称",
    //     ajax: findByListProducts
    //   }
    // ],
    formItems: Array,
    formData: Object, //有传这个说明是修改
    rule: Object, //某些特殊字段的验证规则
    reset: Boolean, // 改变时重置数据
    customField: Array //某些特殊字段在填写时需要想后台请求数据
  },
  data() {
    return {
      data_model: {},
      rules,
      _formItems: null,
      _inputType: null,
      props_inputType5: {
        value: "treeId",
        label: "treeName",
        children: "childNode"
      },
      //自定义的字段
      customField_cache: []
    };
  },
  computed: {},
  watch: {
    formItem() {
      this.initData_model();
    },
    formData() {
      this.initData_model();
    },
    reset() {
      this.initData_model();
    },
    data_model: {
      async handler(val) {
        // console.log(val);
        // this.passData(await this.isVerifyPass());
        this.triggerFormChange();
      },
      deep: true
    }
  },
  methods: {
    initCustomField() {
      let self = this;
      return new Promise(async (resolve, reject) => {
        if(!self.customField) {
          resolve(null);
          return;
        }
        self._customField = [...self.customField];
        for (let i = 0; i < self._customField.length; i++) {
          let item = self._customField[i];

          let formItem = self._formItems.find(formItem => {
            return formItem.topType === item.topType;
          });
          formItem.inputType = item.inputType;
          switch (item.inputType) {
            case 5:
              formItem.data = [];
              let res = await item.ajax();
              if (res.code === 200) {
                // res.data[0].childNode[0].childNode = null;
                formItem.data = res.data;
              }
              self.data_model["_" + item.topType] = [];
              // console.log(self.data_model);
              self.customField_cache.push({
                inputType: 5,
                topType: item.topType,
                topType_model: "_" + item.topType
              });
              break;
          }
        }
        resolve(null);
      });
    },
    mergeRules() {
      this.rules = Object.assign(rules, this.rule);
    },
    matchedRule(item) {
      let key = item.topType,
        rules = this.rules;
      if (rules[key]) {
        return rules[key];
      }
      switch (item.inputType) {
        case 1:
        case 4:
          return item.required ? rules._number : rules.number;
        case 0:
        default:
          return item.required ? rules._str : rules.str;
      }
    },
    initData_model() {
      let self = this;
      if (this.formData) {
        console.log(this.formData);
        
        this.data_model = { ...this.formData };
        this.data_model_cache = { ...this.formData }; //只对基本数据类型做缓存
        return;
      }

      this._formItems.forEach(item => {
        if (item.statusOptions && item.statusOptions.length) {
          self.$set(this.data_model, item.topType, item.statusOptions[0].id);
        } else {
          self.$set(this.data_model, item.topType, null);
        }
      });
      this.data_model_cache = { ...this.data_model };
    },
    //isModify 为true时，只获取修改的部分
    getFormData(data_model, isModify) {
      let modifyData = {};
      if (isModify) {
        for (let key in data_model) {
          if (data_model[key] !== this.data_model_cache[key]) {
            modifyData[key] = data_model[key];
          }
        }
      }else {
        modifyData = {...this.data_model}
      }

      this.customField_cache.forEach(item => {
        switch (item.inputType) {
          case 5:
            let values = this.data_model[item.topType_model];
            if (!values.length) {
              this.data_model[item.topType] = "";
            } else {
              let value = values[values.length - 1];
              this.data_model[item.topType] = value;
              delete modifyData[item.topType_model];
            }
            break;
        }
      });
      // for (let inputType in this.customField_cache) {
      //   let data = this.customField_cache[inputType];
      //   if (!data.length) continue;
      //   switch (inputType) {
      //     case "5":
      //       data.forEach(key => {
      //         let value = this.data_model[key];
      //         this.data_model;
      //       });
      //       break;
      //   }
      // }

      return modifyData;
    },
    async isVerifyPass() {
      let self = this;
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
      let data_model = { ...this.data_model };
      for (let key in data_model) {
        if (this.customField_cache && this.customField_cache.includes(key)) {
        }
      }
      this.$emit("passData", [
        isPass,
        this.getFormData(data_model),
        this.getFormData(data_model, true)
      ]);
    },
    handlerValidate(key, valid, errMsg) {
      if (this.data_model[key] === this.data_model_cache[key]) {
        this.$refs["data_model"].clearValidate([key]);
      }
    },
    async triggerFormChange() {
      this.passData(await this.isVerifyPass());
    }
  },
  async created() {
    console.log(111);
    
    this._formItems = [...this.formItems];

    await this.initCustomField();

    this.initData_model();
    this.mergeRules();
  },
  mounted() {}
};
</script>

<style scoped>
.form-content {
  max-height: 500px;
  overflow-y: scroll;
  padding-right: 15px;
}
</style>
