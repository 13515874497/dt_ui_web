<template>
	<div style="position: relative;min-width: 350px;">
		<div style="width: 300px;padding: 10px;margin: 20px;border-bottom: 1px solid #000000;">{{headName}}</div>
		<div style="margin: 30px 40px 20px 20px;padding: 20px;border-radius: 12px; 
					background:-webkit-linear-gradient(#f5f7fa,#ccc);
					background:-o-linear-gradient(#f5f7fa,#ccc);
					background:-moz-linear-gradient(#f5f7fa,#ccc);
					background:linear-gradient(#f5f7fa,#ccc);
					 box-shadow:0 0 2px 2px grey,0 0 2px 2px #ccc;
					 min-width: 350px;"
					 >
			<ul>
				<li style="margin: 16px;" v-for="(item,index) in collectionList" :key='index' :row-index='index'>
					<span style="display: inline-block;width: 24px;height: 24px;text-align: center;line-height: 24px;border-radius: 12px;background-color:gainsboro;margin-right: 20px;">{{index+1}}</span>
					<a style="color: #000000;vertical-align:bottom;text-decoration:underline;display: inline-block;width: 65%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" href="###">{{item.urlName}}</a>
					<span style="display: inline-block;width: 24px;height: 24px;line-height: 24px;text-align: center;background-color: #DCDFE6;border-radius: 12px;" @click="del(index)"> x </span>
				</li>
			</ul>
		</div>
		<div class="block" style="margin: 50px 0 0 20px;">
			<el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page.sync="data.currentPage"
			  :page-sizes="data.page_sizes"
			  :page-size="data.pageSize"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="collectionList.length">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Sortable from "sortablejs";
	import {repMenu} from "@/api"
	export default{
		data(){
			return{
				collectionList:[
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费1'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费2'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费3'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费4'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费5'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费6'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费7'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费8'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费9'},
					{url:'',urlName:'数据导入\\运营导入\\亚马逊\\月度仓储费10'}
				],
				headName:'快捷入口',
				data:{
					currentPage:1,
					page_sizes:[10,20,30,40],
					pageSize:10
				}
			}
		},
		methods:{
			del(index){
				alert('删除'+ index)
			},
			more(){
				alert('查看更多')
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			 },
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
		// async created() {
		// 	let res = await repMenu();
		// 	console.log(res);
		// 	let datas = res.data;
		// 	
		// 	// /index/log_customs
		// 	
		// 	
		// 	
		// },
		mounted:function(){

			var $ul = this.$el.querySelector('ul')

			var that = this
	
			new Sortable($ul, {

				onUpdate:function(event){

				  var newIndex = event.newIndex,

					oldIndex = event.oldIndex,

					 $li = $ul.children[newIndex],

					 $oldLi = $ul.children[oldIndex]

				  // 先删除移动的节点

				  $ul.removeChild($li)  

				  // 再插入移动的节点到原有节点，还原了移动的操作

				  if(newIndex > oldIndex) {

					$ul.insertBefore($li,$oldLi)

				  } else {

					$ul.insertBefore($li,$oldLi.nextSibling)

				  }

				  // 更新items数组

				  var item = that.collectionList.splice(oldIndex,1)

				  that.collectionList.splice(newIndex,0,item[0])
				  
				  // 下一个tick就会走patch更新

				}

			  })

		},
	}
</script>

<style scoped>
#gradient{
	 background:-webkit-linear-gradient(#8A2BE2,#DC143C);
	 background:-o-linear-gradient(#8A2BE2,#DC143C);
	 background:-moz-linear-gradient(#8A2BE2,#DC143C);
	 background:linear-gradient(#8A2BE2,#DC143C);

 }
</style>
