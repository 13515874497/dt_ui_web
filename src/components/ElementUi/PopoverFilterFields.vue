<template>
  <el-popover popper-class="field-popper" placement="left" title="打√为不显示" width="200" trigger="hover">
    <el-tree class="scrollbar" ref="tree" node-key="id" :data="data" :props="props" show-checkbox @check="check"></el-tree>
    <div slot="reference" class="fieldShow el-button el-button--primary is-plain"></div>
  </el-popover>
</template>

<script>
export default {
  props: {
    data: Array,
		// 2019/05/22  下午16:00  添加内容 接受父组件传值 后台返回的隐藏字段数组 填充隐藏字段  start
		hiddenFieldsList:{
			type:Object,
			default:{}
		},
		// 2019/05/22  下午16:00  添加内容 接受父组件传值 后台返回的隐藏字段数组 填充隐藏字段  end
  },
  data() {
    return {
      props: {
        // children:
        label: "headName"
      },
      page: {
          id: this.$route.params.id
      },
      list: null,
			// 2019/05/22  下午16:00  添加内容 新增用来接收接收父组件传值的对象 用来使用  start
			hiddenFieldsListData:{},
				// 2019/05/22  下午16:00  添加内容 新增用来接收接收父组件传值的对象 用来使用  end
    };
  },
  watch: {
    data(val){
      if(val.length){
        this.readCache();
      }
    }
  },
  methods: {
    check(node, checked) {
    let keys = checked.checkedKeys;
		console.log(keys);
    this.saveCache(keys);
    this.$emit('hideField',[this.list[this.page.id]])
    },
    saveCache(keys){
        this.list[this.page.id] = keys;
        localStorage.setItem('hideFieldList',JSON.stringify(this.list));
			
    },
    readCache(){

			 let list = localStorage.getItem('hideFieldList');
				
			 if(!list){
				 	// 2019/05/22  下午16:00  添加内容 判断能否读取之前存的值 如果没有 就使用后台获取到的隐藏字段数组  start
					 list = this.hiddenFieldsListData	;
					 // 2019/05/22  下午16:00  添加内容 判断能否读取之前存的值 如果没有 就使用后台获取到的隐藏字段数组  end
			 }else {
					 list = JSON.parse(list);
					
			 }
			 this.list = list;
			 let checked = this.list[this.page.id]
			 if(checked){
					 this.$emit('hideField',[checked]);
						this.$refs.tree.setCheckedKeys(checked);
			 }
    }
  },
	// 2019/05/22  下午16:00  添加内容 新增创建钩子 用父组件传来的隐藏字段对象给当前自定义的对象赋值使用  start
	created() {
			this.hiddenFieldsListData= this.hiddenFieldsList;
	}
	// 2019/05/22  下午16:00  添加内容 新增创建钩子 用父组件传来的隐藏字段对象给当前自定义的对象赋值使用  end
};
</script>

<style lang="scss" scoped>

.fieldShow {
  position: absolute;
  right: 11px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 68px;
  width: 23px;
  writing-mode: tb-rl;
  padding: 5px;
  transform: perspective(100px) rotateY(-30deg);
}
.fieldShow::before {
  content: "隐藏字段"; /*用伪元素来生成一个矩形*/
  position: absolute;
  top: 0;
  right: 2px;
  bottom: 0;
  left: 0;
  z-index: 1;
  transform: perspective(100px) rotateY(30deg);
}
</style>

