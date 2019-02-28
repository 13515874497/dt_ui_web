<template>
  <el-dialog
    title="提示"
    :visible.sync="menuHeadUpVisible"
    width="50%">
    <el-form :model="menuHeadFrom" ref="roleFrom" label-width="80px">
      <el-form-item style="width: 350px">
        <el-tag>{{menuHeadFrom.name}}</el-tag>
      </el-form-item>
      <el-form-item>
        <div>
          <el-transfer
            filterable
            :filter-method="filterMethod"
            :right-default-checked="menuHeadFrom.ids"
            filter-placeholder="请输入表头信息"
            @change="transferChange"
            v-model="menuHeadFrom.ids"
            :data="HeadResultData"
            :titles="['表头信息', '已有表头信息']"
            :button-texts="['移除', '添加']">
          </el-transfer>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="menuHeadUpVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {repFindByHeads, repAddHeadMenu, repDelHeadMenu,repHead} from '../../../api'

  export default {
    data () {
      return {
        HeadResultData: [],//表头数据
        menuHeadUpVisible: false,//显示或隐藏
        menuHeadFrom: {
          name: '',
          ids: [],
          menuId: ''
        }
      }
    },
    mounted () {
      PubSub.subscribe('upMenuHead', (msg, row) => {
        this.menuHeadFrom.ids = []
        this.menuHeadUpVisible = true
        this.menuHeadFrom.menuId = row.menuId
        const resultHeads = repFindByHeads(this.menuHeadFrom.menuId)
        resultHeads.then((result) => {
          console.log(result)
          if (result.code === 200) {
            const generateData = _ => {
              const data = []
              const heads = result.data
              heads.forEach((heade, index) => {
                data.push({
                  label: heade.headName,
                  key: heade.id,
                  heads: heads[index]
                })
              })
              return data
            }
            this.HeadResultData = generateData()
          }
          this.menuHeadFrom.name = row.name
          if (row.ids) {
            var headStr = row.ids.split(',')
            this.menuHeadFrom.ids = headStr.map(function (data) {
              return +data
            })
          }
        })
      })
    },
    methods: {
      //通过关键字搜索
      filterMethod (query, item) {
        return item.heads.headName.indexOf(query) > -1
      },
      async transferChange (value, direction, movedKeys) {
        const thIds = movedKeys
        const mId = this.menuHeadFrom.menuId
        const menuHead = {mId, thIds}
        if (direction === 'left') {
          const resultDel = repDelHeadMenu(menuHead)
          if (resultDel.code === 200) {
            console.log('移除成功~')
          }
        } else {
          const resultAdd = await repAddHeadMenu(menuHead)
          if (resultAdd.code === 200) {
            console.log('添加成功~')
          }
        }
      }
    }
  }
</script>

<style scope lang="scss">
  .el-transfer {
    .el-transfer__buttons {
      width: 150px;
      .el-button.el-button--primary.is-disabled.el-transfer__button.is-with-texts {
        margin-left: 0;
        width: 89px;
        font-family: "宋体";
      }
      .el-button.el-button--primary.el-transfer__button.is-with-texts {
        margin-left: 0;
        width: 89px;
        font-family: "宋体";
      }
    }
  }
</style>
