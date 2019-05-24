<template>
     <div class="auBoxs">
      <!-- 做搜索功能 -->
      <div class="searBox" style="width:100%;display:flex;margin-bottom:10px">
        <el-button  icon="el-icon-search" @click="initList"></el-button>
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initList"></el-input>
      </div>
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
              <span>{{ scope.row.feedback.uuidNumber}}</span>
            </template>
          </el-table-column>
          
          <el-table-column
            property="feedback.mName"
            label="反馈菜单"
            width="120">
          </el-table-column>

          <el-table-column
            label="图片"
            width="240">
          
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
            width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="agree(scope.row.tid,1)" >通过</el-button>   
              <el-button size="mini" type="danger" @click="refuse(scope.row.tid,0)">拒绝</el-button>
            </template>
          </el-table-column>
      </el-table>
      <!-- 弹框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入意见"
            v-model="textarea">
          </el-input>       
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="Submission()">确 定</el-button>
        </span>
      </el-dialog>
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
import { selThisAudit, review } from "@/api";
import moment from "moment";
import Vue from "vue";
import message from "@/utils/Message";
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
      },
      dialogVisible: false,
      textarea: "", //输入意见
      submissionId: "", //判断通过还是拒绝
      submissionTid: "", //每行的tid
      query: "" //搜索的值
    };
  },
  methods: {
    initList() {
      let params = {
        currentPage: this.page.pageNo,
        pageSize: this.page.pageSize,
        uuidNumber: this.query
      };
      console.log(params);

      selThisAudit(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.dataList;
          this.page.totalCount = res.data.totalCount;
        } else {
          message.errorMessage("获取数据失败");
        }

        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].feedback.imageUrl) {
            //  console.log(this.tableData[i].feedback.imageUrl.split(','))
            this.tableData[i].feedback.imageUrl = this.tableData[i].feedback.imageUrl.split(",");
          } else if (this.tableData[i].feedback.imageUrl == null) {
            this.tableData[i].feedback.imageUrl = [];
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
    //同意弹框
    agree(s, i) {
      this.submissionTid = s;
      this.dialogVisible = true;
      this.submissionId = i;
    },
    //拒绝弹框
    refuse(s, i) {
      this.submissionTid = s;
      this.dialogVisible = true;
      this.submissionId = i;
    },
    //取消按钮
    cancel() {
      this.textarea = "";
      this.dialogVisible = false;
    },
    //确定按钮
    Submission() {
      if (!this.textarea) {
        message.errorMessage("受理意见不能为空");
        return;
      }
      let params = {
        tid: this.submissionTid,
        auditor: {
          result: this.submissionId >= 1 ? "审核通过" : "审核拒绝",
          auditNote: this.textarea
        }
      };
      review(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          message.successMessage("审核成功");
        }
      });
      this.textarea = "";
      this.dialogVisible = false;
      this.submissionId = "";
      this.submissionTid = "";
    }
  },
  created() {
    this.initList();
  }
};
</script>
<style lang="scss" scoped>
</style>

