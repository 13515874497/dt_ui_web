<template>
  <div>
    <el-form :inline="true" ref="form" status-icon :rules="rules" :model="form" label-width="80px" style="margin-top: 10px">
      <el-col :span="6" >
        <el-form-item label="目的店铺 :" prop="shop">
          <el-col :span="18">
            <el-autocomplete
              class="inline-input"
              v-model="form.shop"
              :fetch-suggestions="querySearch1"
              placeholder="请输入目的店铺"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item label="供应商 :">
          <el-col :span="18">
            <el-autocomplete
              class="inline-input"
              v-model="form.supplier"
              :fetch-suggestions="querySearch3"
              placeholder="请输入供应商"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item label="联系人 :" >
          <el-input  v-model="form.con_tac_tr" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="传真 :" >
          <el-input  v-model="form.fax" placeholder="请输入传真"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" >
        <el-form-item label="目的站点 :" prop="site">
          <el-col :span="18">
            <el-autocomplete
              class="inline-input"
              v-model="form.site"
              :fetch-suggestions="querySearch2"
              placeholder="请输入目的站点"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item label="出货日期 :" >
          <el-input :disabled="deliver_dis" v-model="form.deliver_date" placeholder="请输入出货日期"></el-input>
        </el-form-item>
        <el-form-item label="FBA仓库 :">
          <el-col :span="18">
            <el-autocomplete
              class="inline-input"
              v-model="form.warehouse"
              :fetch-suggestions="querySearch4"
              placeholder="请输入FBA仓库"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item label="总体积 :" style="display: block">
          {{form.volume}}
        </el-form-item>
      </el-col>
      <el-col :span="6" >
        <el-form-item label="单据编号 :">
          <el-input v-model="form.id" placeholder="请输入单据编号"></el-input>
        </el-form-item>
        <el-form-item label="最迟到达日期 :" style="display: block" prop="min_deliver_date" >
          <el-date-picker type="date" placeholder="选择日期" v-model="form.min_deliver_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="总数量 :" style="display: block">
          {{form.qty}}
        </el-form-item>
        <el-form-item label="总毛重 :" style="display: block">
          {{form.kg}}
        </el-form-item>
      </el-col>
      <el-col :span="6" >
        <el-form-item label="单据日期 :" prop="date" >
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期 :">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="FBA号 :">
          <el-input  v-model="form.FBA" ></el-input>
        </el-form-item>
        <el-form-item label="总件数 :" style="display: block">
          <el-input  v-model="form.packages" ></el-input>
        </el-form-item>
      </el-col>
      <el-table
        :data="form.data"
        border
        height="450"
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px">
        <el-table-column
          align="right" fixed width="60px">
          <template slot="header" slot-scope="scope">
            <span>序号</span>
          </template>
          <template slot-scope="scope">
            <el-dropdown @command="hand_add_li(scope.$index, scope.row)" trigger="click">
                            <span class="el-dropdown-link" >
                                {{scope.$index+1}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >插入列</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="产品名称"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.product_name"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="SKU"
          label="SKU"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.SKU"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="FN_SKU"
          label="FN_SKU"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.FN_SKU" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="model"
          label="规格型号"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.model" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.unit" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="qty"
          label="数量"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.qty" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="货物">
          <el-table-column
            prop="length"
            label="长"
            width="180">
            <template slot-scope="scope">
              <div class="items">
                <el-input v-model="scope.row.length" ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="width"
            label="宽"
            width="180">
            <template slot-scope="scope">
              <div class="items">
                <el-input v-model="scope.row.width" ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="height"
            label="高"
            width="180">
            <template slot-scope="scope">
              <div class="items">
                <el-input v-model="scope.row.height" ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="volume"
          label="体积"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.volume" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="kg"
          label="重量"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.kg" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="se_qty"
          label="发出数量"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.se_qty" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="re_qty"
          label="接收数量"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.re_qty" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="re_date"
          label="接收时间"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.re_date" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.status" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="180">
          <template slot-scope="scope">
            <div class="items">
              <el-input v-model="scope.row.remark" ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">{{scope.$index===0?'清除':'删除'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="6" class="input_top">
        <el-form-item  label="创建时间 :">
          <el-input :disabled="create_date" v-model="dates" ></el-input>
        </el-form-item>
        <el-form-item label="创建人 :" style="display: block">
          <el-input   ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="input_top">
        <el-form-item label="修改日期 :">
          <el-input  v-model="dates" ></el-input>
        </el-form-item>
        <el-form-item label="修改人 :" style="display: block">
          <el-input   ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="input_top">
        <el-form-item label="审核时间 :">
          <el-input  v-model="dates" ></el-input>
        </el-form-item>
        <el-form-item label="审核人 :" style="display: block">
          <el-input  ></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      let shop = (rule, value, callback) => {
        setTimeout(() => {
          let shop_s =this.form.shop
          if (!shop_s) {
            return callback(new Error('店铺不能为空'));
          }else{
            callback();
          }
        }, 500);
      };
      let site = (rule, value, callback) => {
        setTimeout(() => {
          let site_s =this.form.site
          if (!site_s) {
            return callback(new Error('站点不能为空'));
          }else{
            callback();
          }
        }, 500);
      };
      let date = (rule, value, callback) => {
        setTimeout(() => {
          let startTime= Date.parse(this.dates);
          let endTime=Date.parse(this.form.date);
          if (endTime>startTime) {
            callback(new Error('单据日期不能超过当前日期'));
          }else{
            callback();
          }
        }, 500);
      };
      let min_deliver_date = (rule, value, callback) => {
        setTimeout(() => {
          let startTime= Date.parse(this.dates);
          let endTime=Date.parse(this.form.min_deliver_date);
          if (endTime<startTime) {
            callback(new Error('收货日期不能选择已过日期'));
          }else{
            callback();
          }
        }, 500);
      };
      return{
        count_id:1,//序号
        dates:'',//当前时间
        time:setInterval(this.nowTimes,1000),//计时器
        deliver_dis:true,//出货日期状态
        deliver_FBA:true,//FBA号状态
        deliver_pac:true,//总件数状态
        create_date:true,//创建时间状态

        form:{
          con_tac_tr:'默认联系人',//联系人
          fax:'',//传真
          shop: '',//店铺
          site:'',//站点
          id:'',//单据编号
          supplier:'',//供应商
          date:'',//单据日期
          deliver_date:'',//出货日期
          FBA:'',//FBA号
          warehouse:'',//FBA仓库
          min_deliver_date:'',//最迟到达日期
          volume:'列表中获取',//总体积
          qty:'列表计算获得',//总数量
          kg:'列表计算获得',//毛重
          packages:'123',//总件数
          restaurants1:[],//目的店铺
          restaurants2:[],//目的站点
          restaurants3:[],//供应商
          restaurants4:[],//FBA仓库
          data:[
            {
              product_name:'1', SKU:'2', FN_SKU:'3', model:'4', unit:'5', qty:'6', length:'7', width:'8', height:'9', volume:'10',
              kg:'11', se_qty:'12', re_qty:'13',re_date:'14',status:'15', remark:'16'
            },
          ],
        },
        rules:{
          shop: [
            { required: true, validator: shop, trigger: 'blur'}
          ],
          site: [
            { required: true, validator: site, trigger: 'blur' }
          ],
          date: [
            { required: true, message: '日期不能为空', trigger: 'blur' },
            { validator: date, trigger: 'blur'}
          ],
          min_deliver_date: [
            { required: true, message: '日期不能为空', trigger: 'blur' },
            { validator: min_deliver_date, trigger: 'blur'}
          ],
        }
      }
    },
    // 创建完成时
    created() {
      this.nowTimes();
    },
    methods: {
      //添加
      set_data(){
        this.$set(this.form.data,this.form.data.length,{product_name:'', SKU:'', FN_SKU:'', model:'', unit:'', qty:'', length:'', width:'', height:'', volume:'',
          kg:'', se_qty:'', re_qty:'',re_date:'',status:'', remark:''})
      },
      //目的店铺
      querySearch1(queryString, cb) {
        let restaurants = this.restaurants1;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      //目的站点
      querySearch2(queryString, cb) {
        let restaurants = this.restaurants2;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      //供应商
      querySearch3(queryString, cb) {
        let restaurants = this.restaurants3;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      //仓库
      querySearch4(queryString, cb) {
        let restaurants = this.restaurants4;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll1() {
        return [
          { "value": "店铺一"},
          { "value": "店铺二"},
          { "value": "店铺三"},
        ];
      },
      loadAll2() {
        return [
          { "value": "目的站点一"},
          { "value": "目的站点二"},
          { "value": "目的站点三"},
        ];
      },
      loadAll3() {
        return [
          { "value": "供应商一"},
          { "value": "供应商二"},
          { "value": "供应商三"},
        ];
      },
      loadAll4() {
        return [
          { "value": "FBA仓库一"},
          { "value": "FBA仓库二"},
        ];
      },

      //合计
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总数';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(index===6){
              this.form.qty=sums[index]
            }
            if(index===10){
              this.form.volume=sums[index]
            }
            if(index===11){
              this.form.kg=sums[index]
            }
            if(index===12){
              this.form.packages=sums[index]
            }
            sums[index] += ' ';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      },

      //删除行
      handleDelete(index, row) {
        if(index===0){
          this.$set(this.form.data,index,{product_name:'', SKU:'', FN_SKU:'', model:'', unit:'', qty:'', length:'', width:'', height:'', volume:'',
            kg:'', se_qty:'', re_qty:'',re_date:'',status:'', remark:''})
        }else{
          //其余直接删除
          this.form.data.splice(index,1)
        }
      },
      //选择新增
      hand_add_li(index,row){
        if(index<this.form.data.length-1){
          this.form.data.splice(index+1, 0, {product_name:'', SKU:'', FN_SKU:'', model:'', unit:'', qty:'', length:'', width:'', height:'', volume:'',
            kg:'', se_qty:'', re_qty:'',re_date:'',status:'', remark:''});
        }else{
          console.log("新增")
          this.$set(this.form.data,index+1,{product_name:'', SKU:'', FN_SKU:'', model:'', unit:'', qty:'', length:'', width:'', height:'', volume:'',
            kg:'', se_qty:'', re_qty:'',re_date:'',status:'', remark:''})
        }
      },
      // 定时器函数
      nowTimes(){
        this.timeFormate(new Date());
        this.time;
        clearInterval(this.time);//注意关闭计时器，以免内存泄露
      },
      //按钮下拉选项
      handleSelect(item) {
        console.log(item);
      },
      //提交
      submitForm(formName) {
        console.log(this.form)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("true")
            //默认值无法resetFields,清空数据需在reset后清空默认
            // this.$refs[formName].resetFields();
            // this.form.data=[
            //     {product_name:'', SKU:'', FN_SKU:'', model:'', unit:'', qty:'', length:'', width:'', height:'', volume:'',
            //         kg:'', se_qty:'', re_qty:'',re_date:'',status:'', remark:''}]
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.data=[
          {product_name:'', SKU:'', FN_SKU:'', model:'', unit:'', qty:'', length:'', width:'', height:'', volume:'',
            kg:'', se_qty:'', re_qty:'',re_date:'',status:'', remark:''}]
      }
    },
    mounted() {
      this.restaurants1 = this.loadAll1();
      this.restaurants2 = this.loadAll2();
      this.restaurants3=this.loadAll3();
      this.restaurants4=this.loadAll4();
    }
  }
</script>

<style lang="scss">
  .el-form-item__label{
    height: 80px;
  }
  .el-input{
    width: 220px!important;
  }
  .input_top{
    margin-top: 10px;
  }
  .el-form-item{
    margin-bottom: 0px!important;
  }
  .el-form-item__label{
    width: 120px!important;
    height: 60px!important;
  }

  .el-icon-upload:before{
    font-size: 30px !important;
  }

  td{
    text-align: center!important;
  }
  th{
    text-align: center!important;
  }
  .cell{
    margin-bottom: -12px!important;
    margin-top: -12px!important;
    .items{
      margin-left: -10px!important;
      margin-right: -10px!important;
      .el-input{
        .el-input__inner{
          border: 0px!important;
        }
      }
    }
  }
  .el-dialog__header {
    text-align: center;
    background-color: #e8e8e8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    .el-dialog__title {
      font-family: "宋体";
      font-size: 20px;
    }
  }
  //表单关闭
  .el-dialog__headerbtn {
    background-color: #F56C6C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 20px;
    height: 20px;
  }

  //表单边框
  .el-dialog {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }


</style>
