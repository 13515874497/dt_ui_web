<template>
  <!-- 0:字符型  1:数值型   2:日期型  3:下拉框  4：起止日期  -->
  <el-form ref="data_model" :model="data_model" label-width="108px" label-position="left" status-icon>
    <template v-for="item in data">
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
        v-else-if="item.inputType == 0"
        :label="item.headName"
        :prop="item.topType"
        :rules="item.required? rules._str:rules.str"
      >
        <el-input
          v-model="data_model[item.topType]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        ></el-input>
      </el-form-item>

      <el-form-item
        v-else-if="item.inputType == 1"
        :label="item.headName"
        :prop="item.topType"
        :rules="item.required? rules._number : rules.number"
      >
      <el-input
          v-model="data_model[item.topType]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
      ></el-input>
      </el-form-item>

      <!-- 
      <el-form-item
        v-else-if="item.inputType == 'input-switch'"
        :label="item.headName"
        :prop="item.topType"
        :rules="item.required? rules._boolean : rules.boolean"
      >
        <el-switch
          v-model="data_model[item.topType]"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="item.disabled"
        ></el-switch>
      </el-form-item>-->
    </template>
  </el-form>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  props: {
    //模板
    // formItems: [
    //     {
    //         headName: '姓名',//*
    //         topType: 'name',//*
    //         inputType: 0,//*
    //         required: true, //是否必填
    //         placeholder: '0:String, 1:int, 2:Data, 3,statusOption, 4:timeLine', //占位符
    //         disabled: true
    //     }
    // ],
    formItems: Array, 
    formData: Object,
  }, 
  data() {
    return {
      data_model: {},
      rules,
      
    };
  },
  computed: {
    data() {
      console.log(this.formItems);

      return [...this.formItems];
    }
  },
  watch: {
    formData() {
      this.initData_model();
    },
    data_model: {
      handler(val) {
        if (this.isVerifyPass()) this.passData();
        console.log(val);
      },
      deep: true
    }
  },
  methods: {
    testlog(){

    },
    initData_model() {
      let self = this;
      if (this.formData) {
        this.data_model = { ...this.formData };
        return;
      }
      this.data.forEach(item => {
        if (item.statusOptions && item.statusOptions.length) {
          self.$set(this.data_model, item.topType, item.statusOptions[0].id);
        } else {
          self.$set(this.data_model, item.topType, "");
        }
      });
      console.log(this.data_model);
    },
    isVerifyPass() {
      let self = this;
      this.flag = false;
      //   console.log();
        
      // let validData = JSON.parse(JSON.stringify(this.$refs["data_model"])) ;
      this.$refs["data_model"].validate(valid => {  
        if (valid) {
          self.flag = true;
        }
      });
      this.$refs["data_model"].clearValidate();
      return this.flag;
    },
    passData() {
      this.$emit("passData", [this.data_model,this.flag]);
    }
  },
  created() {
    this.initData_model();
  },
  mounted() {

  }
};
</script>

<style>
</style>
