<template>
  <div class="dis_fex" style="margin-top: 20px;">
  	<el-button type="primary" style="" size="mini" @click="saveSolution">新增查询方案</el-button>
  	<el-button type="primary" style="" size="mini" @click="changeSolution" v-if="programmeLists.length>0">修改当前方案</el-button>
  	<el-button type="primary" style="" size="mini" @click="delAllSolution" v-if="programmeLists.length>0">删除全部方案</el-button>
	<el-dialog
	  title="确认删除方案吗?"
	  :visible.sync="centerDialogVisible"
	  width="30%"
	  center>
	  <span slot="footer" class="dialog-footer">
		<el-button @click="centerDialogVisibleCancel">取 消</el-button>
		<el-button type="primary" @click="centerDialogVisibleSure">确 定</el-button>
	  </span>
	</el-dialog>
  	<div style="display: inline-block;position: relative;" v-for="(item, index) in programmeLists">
  		<el-button type="primary" style="padding-right: 25px;margin-right: 5px;" size="mini" @click="chaxun(index)"  :key="index">方案{{item.programName}}</el-button>
  		 <span style="position: absolute;right: 8px;top: 8px;background-color:white ;color: #AAAAAA;border-radius: 8px;" class="el-icon-circle-close" @click="deleteProgramme(item)"></span>
  	</div>
	
  	<!-- <el-select v-model="programmeDataList" placeholder="请选择活动区域">
  		<el-option label="item.programName" value="item.programName" ></el-option>
  		
    </el-select>-->
  </div>
</template>

<script>
	import { MessageBox } from "element-ui";
	import message from "@/utils/Message";
	import {
	  getConfMapUser,
	  getUserConfig,
	  delUserConfig,
	  upUserConfig
	} from "@/api";
export default {
  props: {
	programmeNeedData:Object,//父组件内其他相关自组件传递的值
	mid:String,//父组件的路由id
	inputQueryDataD:{//搜索框的数据
		type:Object,
		default:function(){
			return {}
		}
	},
	queryTwoListD:{//query2搜索框的数据
		type:Array,
		default:function(){
			return []
		}
	},
	hiddenFieldsListAD:{//隐藏字段的数据
		type:Array,
		default:function(){
			return []
		}
	},
	dropTableD:{//表格的数据
		type:Array,
		default:function(){
			return []
		}
	}
    
  },
	inject: ["reload"],
  data() {
    return {
			needData:{},
			programme:"",
			tValList:[],
			inputData:{},
			hiddenFieldsList:{},
			hiddenFieldsListA:[],
			nowId:"",
			tableTitle :{},
			configIdList:[],
			programmeLists:{},
			centerDialogVisible: false,
			dialogConfigId:'',
			dialogMid:''
		
		};
  },
	methods:{
		msgBox(res,msg,nowId){
			MessageBox.prompt('请输入方案名称', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消'
			}).then(({ value }) => {
						var reg =  /^\s*$/g;
						if(reg.test(value) || value == null || value == ""){
							message.errorMessage('方案名称不能为空')
							return;
						}else{
							this.programme = value.replace(/\s+/g,"");
							
							let programmeList = {
								hiddenFieldsList : this.hiddenFieldsListA,
								queryTwoList : this.tValList,
								inputQueryData : this.inputData,
								programName : this.programme,
								dropTable:this.tableTitle,
								mid : parseInt(this.mid),
								configId:nowId
							}
							console.log(programmeList)
							this.resPro(res,programmeList,msg)
						
							
						}
						
			})
		},
		resPro(res,data,m){
			// getConfMapUser,upUserConfig
			res(data).then(res=>{
				console.log(res);
				if(res.code == 200){
					message.successMessage(m);
					this.reload();
				}else{
					message.errorMessage(res.msg)
				}
			})
		},
		saveSolution(){
			
			this.msgBox(getConfMapUser,"方案名称保存成功","")
				
		},
		programData(index,data){
			this.tValList = data[index].queryTwoList;
			this.inputData = data[index].inputQueryData;
			this.hiddenFieldsList[this.mid] = data[index].hiddenFieldsList;
			this.nowId = data[index].configId;
			this.tableTitle = data[index].dropTable;
			console.log(this.tValList);
			console.log(this.inputData);
		},
		async deleteProgramme(item){
			this.centerDialogVisible = true;
			this.dialogConfigId = [item.configId];
			this.dialogMid = item.mid;
		},
		async delAllSolution(){
			this.centerDialogVisible = true;
			this.dialogConfigId = this.configIdList;
			this.dialogMid = parseInt(this.mid);
		},
		async centerDialogVisibleSure(){
			let paramsB = {mid:this.dialogMid,configIds:this.dialogConfigId};
			
			let res = await delUserConfig(paramsB);
			this.centerDialogVisible = false;
			this.dialogMid = "";
			this.dialogConfigId = '';
			if(res.code == 200){
				this.reload();
			}
		},
		centerDialogVisibleCancel(){
			this.centerDialogVisible = false;
			this.dialogConfigId = '';
			this.dialogMid = "";
		},
		chaxun(index){
			this.inputData = {};
			this.programData(index,this.programmeLists);
			this.$emit("programme", [this.programmeLists,index]);
			console.log(this.programmeLists);
			console.log(index);
		},
		changeSolution(){
			
			this.msgBox(upUserConfig,"方案名称修改成功",this.nowId)
		},
	},
	watch:{
		inputQueryDataD:{
			handler(val){
				this.inputData = val;
				console.log(val)
			}
		},
		hiddenFieldsListAD:{
			handler(val){
				this.hiddenFieldsList[this.mid] = val;
				this.hiddenFieldsListA = val;
				console.log(val)
			}
		},
		queryTwoListD:{
			handler(val){
				this.tValList = val;
				console.log(val)
			}
		},
		dropTableD:{
			handler(val){
				this.tableTitle = val;
				console.log(val)
			}
		}
	},
	async created() {
		
		let paramsA = {mid:parseInt(this.mid)};
			
		let res = await getUserConfig(paramsA);
		if(res.code == 200 && res.data.length>0){
			this.programmeLists = res.data;
			this.programData(0,this.programmeLists);
			console.log(this.programmeLists)
			for(let i=0;i<this.programmeLists.length;i++){
				this.configIdList.push(this.programmeLists[i].configId)
			}
			 this.$emit("programme", [this.programmeLists,0]);
			 
		}
		
	}
};
</script>

<style scoped>
.dis_fex {
  display: inline-block;
}
</style>
