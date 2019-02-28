<!--vue的组件创建-->

<!--模板-->
<template>
  <el-dialog @closed="closeAnimation" title="历史删除记录" :visible.sync="delFormValue" width="650px">
    <el-table :data="delUserData"
              @selection-change="delSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column property="userName" label="账号" width="150"></el-table-column>
      <el-table-column property="name" width="150" label="用户名称"></el-table-column>
      <el-table-column width="200" label="删除时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.delDate | date-format}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="delSizeChange"
        @current-change="delCurrentChange"
        :current-page.sync="delCurrentPage"
        :page-size="delPageSize"
        layout="total, prev, pager, next"
        :total="delTotal_size">
      </el-pagination>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length ===1">
        永久删除
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length >1">
        批量永久删除
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length ===1" @click="batchRecovery">
        恢复
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length >1" @click="batchRecovery">
        批量恢复
      </el-button>
      <el-button @click="delFormValue = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<!--JS-->
<script>
  import {repDelHistoryUserInfo,repReUserInfo} from '../../api'
  import PubSub from 'pubsub-js'
  import utils from '../../utils/PageUtils'
  import message from '../../utils/Message'

  export default {
    data () {
      return {
        isReUser: false, //判断是否恢复成功
        delFormValue: false,
        delCurrentPage: 1,//当前页
        delTotal_size: 0,//总的页
        delPageSize: 5,//显示最大的页
        delUserData: [],//删除的用户数据
        delSelection: [],//删除按钮数组收集
      }
    },
    async mounted () {
      PubSub.subscribe('delFormValue', (msg, delFormValue) => {
        this.delFormValue = delFormValue
        this.isReUser = false
        var userPage = utils.getUserPage(this.delCurrentPage, this.delPageSize)
        const resultUserInfo = repDelHistoryUserInfo(userPage)
        resultUserInfo.then((result) => {
          console.log(result)
          this.pageUser(result)
        })
      })
    },
    methods: {
      //选择获得ids
      delSelectionChange (val) {
        this.delSelection = val
      },
      //删除历史记录查看分页
      delSizeChange (val) {
        console.log(`最大显示页数: ${val}`)
      },
      //批量恢复 or 单个恢复
      async batchRecovery () {
        const userReSelection = this.delSelection
        if (confirm('确定要恢复吗？')) {
          var ids = userReSelection.map(item => item.uid).join()
          const uidIds = {ids}
          const resultRe = await repReUserInfo(uidIds)
          if (resultRe.code === 200) {
            message.successMessage('恢复成功!')
            this.isReUser = true
            var userPage = utils.getUserPage(this.delCurrentPage, this.delPageSize)
            const resultUserInfo = await repDelHistoryUserInfo(userPage)
            if (resultUserInfo.code === 200) {
              this.pageUser(resultUserInfo)
            }
          }
        }
      },
      async delCurrentChange (val) {
        this.delCurrentPage = val
        var userPage = utils.getUserPage(this.delCurrentPage, this.delPageSize)
        const resultUserInfo = await repDelHistoryUserInfo(userPage)
        if (resultUserInfo.code === 200) {
          this.pageUser(resultUserInfo)
        }
      },
      //el-dialog 关闭时触发
      closeAnimation () {
        PubSub.publish('isReUser', this.isReUser)
      },
      //通用分页节省代码
      pageUser (result) {
        const delData = result.data
        this.delUserData = delData.dataList
        this.delCurrentPage = delData.current_page
        this.delTotal_size = delData.total_size
      }
    }
  }
</script>
<!--CSS样式-->
<style scope>

</style>
