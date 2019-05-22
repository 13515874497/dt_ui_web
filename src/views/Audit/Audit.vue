<template>
     <div class="auBoxs">
        <!-- 表格 -->
        <el-table
            border
            stripe
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%"
            height="500">
            <el-table-column
            type="index"
            width="50"
            label="序号">
            </el-table-column>
            <el-table-column
            property="feedback.uuidNumber"
            label="反馈编号"
            width="120">
            </el-table-column>
            <el-table-column
            property="feedback.mName"
            label="反馈菜单"
            width="120">
            </el-table-column>
            <el-table-column
            label="图片"
            width="240">
            <!-- <template slot-scope="scope" >
        　　　　<img v-for="item in scope.row.feedback.imageUrl" :src="item" width="60" height="60" class="head_pic" style="margin-right:5px"/>
        　　</template> -->
            <template slot-scope="scope" >
              <viewer :images="scope.row.feedback.imageUrl"> 
                <img v-for="item in scope.row.feedback.imageUrl" :src="item" width="60" height="60" class="head_pic" style="margin-right:5px" />
              </viewer>
            </template>
            </el-table-column>
              
            <el-table-column
            property="feedback.reason"
            label="描述"
            width="120">
            </el-table-column>
            <el-table-column
            property="feedback.applyUser"
            label="反馈人"
            width="120">
            </el-table-column>
            <el-table-column
            label="反馈时间"
            width="120"
            >
            <template slot-scope="scope">
              <span>{{ scope.row.feedback.applyTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            </el-table-column>
             <el-table-column
            property="feedback.applyStatus"
            label="反馈状态"
            width="120">
            </el-table-column>
             <el-table-column
            property=""
            label="受理意见"
            width="120">
            </el-table-column>
             <el-table-column
            property="auditor"
            label="受理人"
            width="120">
            </el-table-column>
            <el-table-column
            label="受理时间"
            >
             <!-- <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
            </template> -->
            </el-table-column>
        </el-table>
       <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.pageNo"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalCount"
        >
        </el-pagination>
      </div>
    </div>
</template>
<script>
import { selThisAudit } from "@/api";
import moment from "moment";
import Vue from 'vue'

// 时间格式转换
Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});
export default {
  data() {
    return {
      tableData: [], //表信息
      page: {
        pageNo: 1, //当前页
        pageSize: 10, //每页条数,  默认10条
        totalCount: 0 //总条数
      }
    };
  },
  methods: {
    initList() {
      let params = {
        currentPage: this.page.pageNo,
        pageSize: this.page.pageSize
      };
      // console.log(params)

      selThisAudit(params).then(res => {
        console.log(res);
        this.tableData = res.data.dataList;
        this.page.totalCount = res.data.totalCount;

        for(var i = 0; i< this.tableData.length;i++){
          if(this.tableData[i].feedback.imageUrl){
            //  console.log(this.tableData[i].feedback.imageUrl.split(','))
            this.tableData[i].feedback.imageUrl = this.tableData[i].feedback.imageUrl.split(',')           
          }else if(this.tableData[i].feedback.imageUrl == null){
            this.tableData[i].feedback.imageUrl = []
          }
         
        }
      });
    },
    //翻页
    sizeChange(val) {
      // console.log(val);
      this.page.pageSize = val;
      this.initList();
      console.log(this.tableData);
      console.log(`每页 ${val} 条`);
    },
    currentChange(val) {
      // console.log(val);
      this.page.pageNo = val;
      this.initList();
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
  created() {
    this.initList();
  }
};
</script>
