<template>
  <!--销售目标-->
  <div>
    <!--table表格显示-->
    <div id="roleTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="500"
        :span-method="arraySpanMethod"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
          fixed>
        </el-table-column>
        <template v-for="title in tableTitle">

        </template>
      </el-table>
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="upUserForm">修改
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="saveUserForm">
        新增
      </el-button>
    </div>

  </div>

</template>
<script>
  import PubSub_Ware from 'pubsub-js'

  export default {
    data () {
      return {
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        multipleSelection: [],//更新按钮数组收集
        FormValue_Ware: false,//新增隐藏form
        role: {
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 10//显示最大的页
        }
      }
    },
    components:{

    },
    async mounted () {
      // //查询获得table表的 头信息
      // const resultHead = await
      //   repHead(this.$route.params.id)
      // if (resultHead.code === 200) {
      //   // console.log(resultHead.data)
      //   this.tableTitle = resultHead.data
      // }
      // //获得公司信息信息
      // const resultGetCompany = await repGetCompanyInfo()
      // console.log(resultGetCompany)
      // if (resultGetCompany.code === 200) {
      //   this.tableData = resultGetCompany.data
      // }
      // //新增成功后收到订阅消息
      // PubSub_com.subscribe('saveFormValue_com', (msg, saveFormValue_com) => {
      //   if (!saveFormValue_com) {
      //     var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      //     const resultUsers = repUsers(userPage)
      //     resultUsers.then((result) => {
      //       if (result.code === 200) {
      //         //赋值 然后显示
      //         this.pageUser(result)
      //       }
      //     })
      //   }
      // })
      // //删除角色成功后收到订阅消息
      // PubSub_com.subscribe('delRole', (msg, delRole) => {
      //   if (delRole) {
      //     var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      //     const resultUsers = repUsers(userPage)
      //     resultUsers.then((result) => {
      //       if (result.code === 200) {
      //         //赋值 然后显示
      //         this.pageUser(result)
      //       }
      //     })
      //   }
      // })
      // //新增角色成功后收到订阅消息
      // PubSub_com.subscribe('addRole', (msg, addRole) => {
      //   if (!addRole) {
      //     var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      //     const resultUsers = repUsers(userPage)
      //     resultUsers.then((result) => {
      //       if (result.code === 200) {
      //         //赋值 然后显示
      //         this.pageUser(result)
      //       }
      //     })
      //   }
      // })
      // //更新用户信息功后收到订阅消息
      // PubSub_com.subscribe('upFormValue', (msg, upFormValue) => {
      //   if (!upFormValue) {
      //     var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      //     const resultUsers = repUsers(userPage)
      //     resultUsers.then((result) => {
      //       if (result.code === 200) {
      //         //赋值 然后显示
      //         this.pageUser(result)
      //       }
      //     })
      //   }
      // })
      // //恢复用户信息后收到订阅消息
      // PubSub_com.subscribe('isReUser', (msg, isReUser) => {
      //   if (isReUser) {
      //     var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      //     const resultUsers = repUsers(userPage)
      //     resultUsers.then((result) => {
      //       if (result.code === 200) {
      //         //赋值 然后显示
      //         this.pageUser(result)
      //       }
      //     })
      //   }
      // })
    },
    methods: {
      //分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      //val=当前页 分页
      handleCurrentChange (val) {
        console.log(`当前页 ${val} 条`)
      },
      //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
      handleSelectionChange (val) {
        console.log(val)
        this.multipleSelection = val
      },
      //tabale表头上下箭头 排序
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
      },
      saveUserForm () {
        this.FormValue_Ware = true
        //发布搜索消息
        PubSub_Ware.publish('saveFormValue_Ware', this.FormValue_Ware)
      },
      //点击修改的时候 获得 Checkbox中 的属性
      upUserForm () {
        //发布订阅消息 修改
        PubSub_Ware.publish('multipleSelection', this.multipleSelection)
      },
    }
  }
</script>


<style>
  /*表格*/
  #roleTable {
    margin-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
