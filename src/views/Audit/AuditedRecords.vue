<template>
<!-- 我的审核记录 -->
  <div class="auditBox">
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
            label="反馈编号"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.uuidNumber}}</span>
            </template>
          </el-table-column>
          
          <el-table-column
            property="mName"
            label="反馈菜单"
            width="120">
          </el-table-column>

          <el-table-column
            label="图片"
            width="240">
          
            <template slot-scope="scope" >
              <viewer :images="scope.row.imageUrl"> 
                <img v-for="item in scope.row.imageUrl" :src="item" width="60" height="60" class="head_pic" style="margin-right:5px" />
              </viewer>
            </template>
          </el-table-column>
              
          <el-table-column
            property="reason"
            label="描述"
            width="120">
          </el-table-column>
          <el-table-column
            property="applyUser"
            label="反馈人"
            width="120">
          </el-table-column>
          <el-table-column
            label="反馈时间"
            width="120"
            >
            <template slot-scope="scope">
              <span>{{ scope.row.applyTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            property="applyStatus"
            label="反馈状态"
            width="100">
          </el-table-column>
          </el-table-column>
          <el-table-column
            property="auditor.auditNote"
            label="受理意见"
            width="120">
          </el-table-column>
          <el-table-column
            property="auditor.auditorName"
            label="受理人"
            width="80">
          </el-table-column>
          <el-table-column
            label="受理时间"
            width="120"
            >
            <template slot-scope="scope">
              <span>{{ scope.row.auditor.auditTime | date-format('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核结果"
            property="auditor.result"      
            >
          </el-table-column>
      </el-table>
    <!--分页  -->
    <div class="page">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalCount"
        >
        </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAuditRecord } from "@/api";
import message from "@/utils/Message";
export default {
  data() {
    return {
      tableData: [],
      page: {
        currentPage: 1, //当前页
        pageSize: 10, //每页条数,  默认10条
        totalCount: 0 //总条数
      }
    };
  },
  methods: {
    initList() {
      let params = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      };
      console.log(params);

      getAuditRecord(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.dataList;
          this.page.totalCount = res.data.totalCount;
        } else {
          message.errorMessage("获取数据失败");
        }

        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].imageUrl) {
            //  console.log(this.tableData[i].feedback.imageUrl.split(','))
            this.tableData[i].imageUrl = this.tableData[i].imageUrl.split(",");
          } else if (this.tableData[i].imageUrl == null) {
            this.tableData[i].imageUrl = [];
          }
        }
      });
    },
    //翻页
    sizeChange(val) {
      this.page.pageSize = val;
      this.initList();
      console.log(`每页 ${val} 条`);
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.initList();
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  },
  created() {
    this.initList();
  }
};
</script>

