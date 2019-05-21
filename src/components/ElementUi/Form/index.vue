<template>
  <!-- 0:字符型  1:数值型   2:日期型  3:下拉框  4：起止日期  5:级联选择器-->
  <el-form
    ref="data_model"
    :model="data_model"
    label-width="108px"
    label-position="right"
    status-icon
    @validate="handlerValidate"
    :rules="rules"
    class="form-content scrollbar"
    :inline="true"
  >
    <template v-for="item in formItems_">
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
          :active-text="item.statusOptions[0].name"
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
        v-else-if="item.inputType == 2 || item.inputType == 4"
        :label="item.headName"
        :prop="item.topType"
        :rules="matchedRule(item)"
      >
        <el-date-picker
          value-format="timestamp"
          v-model="data_model[item.topType]"
          type="date"
          placeholder="选择日期"
          size="small"
        ></el-date-picker>
      </el-form-item>

      <!-- <el-form-item
        v-else-if="item.inputType == 4"
        :label="item.headName"
        :prop="item.topType"
        :rules="matchedRule(item)"
      >
        <el-date-picker
          value-format="timestamp"
          v-model="data_model[item.topType]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        ></el-date-picker>
      </el-form-item> -->

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
          size="small"
        ></el-input>
      </el-form-item>

      <el-form-item
        v-else-if="item.inputType == 3"
        :label="item.headName"
        :prop="item.bindKey ||  item.topType"
        :rules="matchedRule(item)"
        :required="item.required || true"
      >
        <el-select
          v-model="data_model[item.bindKey ||  item.topType]"
          :placeholder="item.placeholder || '请选择'"
          :filterable="item.filterable"
          :remote="item.remote"
          :remoteMethod="item.remoteMethod"
          :clearable="item.remote"
          size="small"
        >
          <el-option
            v-for="option in item.data"
            :key="option[item.key]"
            :label="option[item.label]"
            :value="option[item.key]"
          ></el-option>
        </el-select>
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
          v-model="data_model[item.data_model]"
          @change="triggerFormChange"
          :props="props_inputType5"
          :filterable="true"
          size="small"
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
          size="small"
        ></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import rules from "@/utils/rules.js";
import { getTreePath } from "@/utils/Arrays";
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
    //     //类目名称
    //     topType: "productsName",
    //     inputType: 5,
    //     ajax: findByListProducts
    //   },
    //     {
    //       inputType: 3,
    //       topType: "siteName",
    //       bindKey: "siteId",
    //       ajax: getSelectSiteRole,
    //       key: "siteId",
    //       label: "siteName",
    //       filterable: true,
    //       placeholder: "请选择站点"
    //     },
    // ],
    formItems: {
      type: Array,
      required: true
    },
    formData: Object, //有传这个说明是修改
    rule: Object, //某些特殊字段的自定义验证规则
    reset: Boolean, // 改变时重置数据
    customField: {
      type: Array,
      default: ()=>[]
    } //某些特殊字段在填写时需要想后台请求数据

  },
  data() {
    return {
      data_model: {},
      rules,
      formItems_: null,
      // _inputType: null,
      props_inputType5: {
        value: "treeId",
        label: "treeName",
        children: "childNode"
      }
      //自定义的字段
      // customField_cache: []
    };
  },
  computed: {},
  watch: {
    rule: {
      deep: true,
      handler() {
        this.mergeRules();
      }
    },
    formItems() {
      // this.initData_model();
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
        this.$emit("giveDataModel", [val]);
        this.triggerFormChange();
      },
      deep: true
    },
    customField: {
      deep: true,
      handler(val) {
        console.log(val);
        //如果只能在外部提供数据(即customField里提供了data属性)  则需要将当前的数据赋值给该组件formItems中对应的字段
        let index = this.formItems_.findIndex(formItem => {
          return formItem.topType === val.currField;
        });

        let custom = val.find(formItem => {
          return formItem.topType === val.currField;
        });
        this.formItems_[index].data = custom.data;
        //如果改变了搜索条件  则重新判断检测的id是否在搜索结果中
        var a = custom.data.findIndex(item => {
          return item[custom.bindKey] === this.data_model[custom.bindKey];
        });

        if (this.data_model[custom.bindKey] != null) {
          if (
            custom.data.findIndex(item => {
              return item[custom.bindKey] === this.data_model[custom.bindKey];
            }) === -1
          ) {
            this.data_model[custom.bindKey] = null;
          }
        }

        // if (this.data_model[custom.bindKey] && val.currQuery === "") {
        //   this.data_model[custom.bindKey] = null;
        // }

        // this.$set(this.$data.formItems_[index], "data", custom.data);
        this.formItems_ = [...this.formItems_]; //触发下更新
      }
    }
  },
  methods: {
    initCustomField() {
      let self = this;
      return new Promise(async (resolve, reject) => {
        if (!self.customField) {
          resolve(null);
          return;
        }

        for (let i = 0; i < self.customField.length; i++) {
          let item = self.customField[i];

          let formItem = self.formItems_.find(formItem => {
            return formItem.topType === item.topType;
          });
          for (let key in item) {
            formItem[key] = item[key];
          }
          if (item.data) continue; //如果写了data 那么就说明从外部提供数据，没写则需要自己去请求获取,然后绑定到该组件的formItems_上
          switch (item.inputType) {
            case 3:
              formItem.data = [];
              let res3 = await item.ajax();
              if (res3.code === 200) {
                // if(res3.data.dataList){
                formItem.data = res3.data.dataList || res3.data;
                // }else {
                //   formItem.data = res3.data;
                // }
              }
              break;
            case 5:
              formItem.data = [];
              let res = await item.ajax();
              if (res.code === 200) {
                formItem.data = res.data;
              }
              self.data_model[item.data_model] = [];
              break;
          }
        }

        //等待前方全部请求完毕
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
        case 3:
        case 4:
          return item.required ? rules._number : rules.number;
          break;
        case 0:
        default:
          return item.required ? rules._str : rules.str;
      }
    },
    initData_model() {
      let self = this;
      if (this.formData) {
        //修改
        this.customField.forEach(item => {
          let formItem = self.formItems_.find(formItem => {
            return formItem.topType === item.topType;
          });
          switch (item.inputType) {
            case 3:
            case 5:
              this.data_model[item.data_model] = getTreePath(
                this.formData[item.bindKey],
                formItem.data,
                this.props_inputType5.value,
                this.props_inputType5.children
              );
              break;
          }
        });
        console.log(this.formData);
        console.log(this.data_model);

        for (let key in this.formData) {
          this.$set(this.data_model, key, this.formData[key]);
        }
        console.log(this.data_model);
      } else {
        //新增
        this.formItems_.forEach(item => {
          if (item.statusOptions && item.statusOptions.length) {
            self.$set(this.data_model, item.topType, item.statusOptions[0].id);
          } else {
            self.$set(this.data_model, item.topType, null);
            if (item.bindKey) {
              self.$set(this.data_model, item.bindKey, null);
            }
          }
        });
      }

      this.data_model_cache = { ...this.data_model }; //用于对比数据 只回传发生改变的数据
    },
    //isModify 为true时，只获取修改的部分
    getFormData(data_model, isModify) {
      let modifyData = {};
      let self = this;
      if (isModify) {
        for (let key in data_model) {
          if (data_model[key] !== this.data_model_cache[key]) {
            modifyData[key] = data_model[key];
          }
        }
      } else {
        modifyData = { ...this.data_model };
      }

      this.customField.forEach(item => {
        switch (item.inputType) {
          case 5:
            let values = data_model[item.data_model]; //这里用data_model是因为 当isModify为true时 由于是数组(引用类型) 缓存对比没有发生变化
            if (values) {
              delete modifyData[item.data_model];
            }
            if (values && values.length) {
              let value = values[values.length - 1];
              modifyData[item.bindKey] = value;
            }
            break;
        }
      });

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
        if (
          this.formData &&
          this.data_model[key] === this.data_model_cache[key]
        ) {
          errCount--;
        }
      }
      return errCount === 0;
    },
    passData(isPass) {
      let data_model = this.data_model;
      // for (let key in data_model) {
      //   if ( this.customField.includes(key)) {
      //   }
      // }
      // [是否验证通过,绑定的数据,修改后发生变化的数据]
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
    this.formItems_ = JSON.parse(JSON.stringify(this.formItems));
    await this.initCustomField();
    this.initData_model();
    this.mergeRules();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.form-content {
  max-height: 500px;
  overflow-y: scroll;
  padding-right: 15px;

  .el-form-item {
    width: 310px;
    margin-right: 16px;
    margin-bottom: 0;
    // /deep/ .el-form-item__label {
    //   text-align: justify;
    //   text-align-last: justify;
    // }
    /deep/ .el-input__inner {
      width: 200px;
    }
    /deep/ .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: unset;
    }
  }
}

// .form-content
</style>
