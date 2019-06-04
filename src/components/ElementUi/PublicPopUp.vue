<template>
  <div class="check1" style="height: 600px;">
			<div id="tablist" style="height: 450px;overflow-y: auto;background-color: #ebeef5;box-shadow: 6px 6px 3px #888888;">
				<div v-for="(item, index) in data" :key="index" style="padding: 25px;border: 1px solid black;margin: 15px;">
					<div>{{item.goodName}}</div>
					<div style="display: inline-block;padding: 3px;" v-for="(items, indexs) in item.data_list" :key="indexs">
							<div style="display: inline-block;padding: 3px;">{{items.name}}: </div>
							<input type="text">
					</div>
				</div>
			</div>
		
			<el-row style="display: flex;justify-content: center;">
				<el-button type="primary" style="margin: 50px 35px;padding:10px 50px;" @click="surePop">确 定</el-button>
				<el-button type="info" style="margin: 50px 35px;padding:10px 50px;" @click="cancelPop">取 消</el-button>
			</el-row>
  </div>
</template>

<script>
  export default {
		props:{
			dataListObj:{
				type:Object,
				default:function(){
					return {}
				}
			},
			pubShow:Boolean
		},
    data () {
      return {
					goodData:[],
					type:'',
					showFlag:false,
					data:[
						{
						goodName:"产品A",
						data_list:[
							{name:'总数量'},
							{name:'确认数量'},
							{name:'入库数量'}
						]
					},
						{
							goodName:"产品B",
							data_list:[
								{name:'总数量'},
								{name:'确认数量'},
								{name:'入库数量'}
							]
						}
						
					]
      }
			
    },
		watch:{
			dataListObj:{
				handler(val){
					this.goodData = val.dataList;
					this.type = val.type;
					console.log(this.goodData);
					console.log(this.type)
					
				}
			},
			pubShow:{
				handler(val){
					this.pubShow = val;
					this.showFlag = this.pubShow;
				}
			}
		},
		methods:{
			surePop(){
				console.log('确定')
				switch(this.type){
					case '01': 
						console.log('到货确认');
						break;
					case '02': 
						console.log('外购入库');
						break;
					case '03': 
						console.log('开始检测');
						break;
					case '04': 
						console.log('不良品入库');
						break;
					case '05': 
						console.log('良品入库');
						break;
					case '06': 
						console.log('良品不良品入库');
						break;
				}
			},
			cancelPop(){
				console.log('取消')
				this.showFlag = false;
				this.$emit('isPubShow',this.showFlag)
			},
		},
		created() {
			this.goodData = this.dataListObj.dataList;
			this.type = this.dataListObj.type;
			this.showFlag = this.pubShow;
			console.log(this.goodData)
		}
  }
</script>

<style scoped lang="scss">
 #tablist::-webkit-scrollbar {
width:7px;
height:5px;
}
/*滚动条里面小方块样式*/
#tablist::-webkit-scrollbar-thumb {
border-radius:100px;
-webkit-box-shadow:inset 0 0 8px rgba(0,0,0,0.1);
background:#ccc;
}
/*滚动条里面轨道样式*/
#tablist::-webkit-scrollbar-track {
-webkit-box-shadow:inset 0 0 8px rgba(0,0,0,0.8);
border-radius:0;
background:rgba(0,0,0,0.1);
}
</style>
