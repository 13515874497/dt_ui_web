<template>
  <div class="check1">
    <el-select v-model="tVal" size="small" clearable multiple filterable placeholder="用户信息选择" @change="getValue" value="" >
      <el-option
        v-for="(item,index) in tableTitle"
        :key="index"
        :label="item.headName"
        :value="item.id"
        >
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tVal: [], //下拉框的model
      }
    },
    props: {
		tableTitle: Array,
		// 2019/05/22  下午16:00  添加内容 父组件传值接受 后台返回的上一次搜索框query2内容 用于填充  start
		tValList:{
		  type: Array,
		  default:function(){
		  	return []
		  }
		},
		// 2019/05/22  下午16:00  添加内容 父组件传值接受 后台返回的上一次搜索框query2内容 用于填充  end
    },
    watch: {
      // tableTitle(){
      //   this.tVal = [];
      // },
	 //  tValList(val){
		// this.tVal = val;
		// this.getValue (this.tVal);
		//   
	 //  }
	 // 2019/05/24  下午16:00  添加内容  使下拉框model赋值 填充query2下拉框  start
	 tValList : {
		 handler(val){
			 this.tVal = val;
			 this.getValue (this.tVal);
		 }
	 }
	 // 2019/05/24  下午16:00  添加内容 使下拉框model赋值 填充query2下拉框  end
	 
    },
    methods: {
      //获得第一个input框里的id 通过id去判断显示哪个输入框
      getValue (sel) {
        this.$emit('getValue', sel)
      }
    },
		created() {
			this.tVal = [...this.tValList];
			this.getValue (this.tVal);
		}

  }
</script>

<style scoped lang="scss">
 
</style>
