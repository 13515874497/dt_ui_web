<template>
  <el-dialog title="出库通知单"  :fullscreen="fullScreen" :visible.sync="FormValue_Ship" width="100%" >
    <el-menu
      :default-active="$router.path"
      router
      class="el-menu-demo"
      mode="horizontal"
      menu-trigger="click"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!--!pMenu.url 没有url的-->
      <el-submenu v-if="!pMenu.url" :index=index.toString() v-for="(pMenu,index) in menuList"
                  :key="index">
        <template slot="title">
          {{pMenu.name}}
        </template>
        <!--如果子级有url的就直接点击了-->
        <el-menu-item-group v-if="cMenu.url" v-for="(cMenu,indexUrl) in pMenu.childMenus" :key="indexUrl">
          <el-menu-item :index="cMenu.url+'/'+cMenu.menuId+'/'+cMenu.name">
            {{cMenu.name}}
            {{indexUrl}}
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-else>
          <!--如果没有url的-->
          <el-submenu
            :index="index.toString()+'-'+indexUrl">
            <template slot="title">{{cMenu.name}}
              {{indexUrl}}
            </template>
            <el-menu-item v-if="sMenu.url" :index="sMenu.url+'/'+sMenu.menuId+'/'+sMenu.name"
                          v-for="(sMenu,indexS) in cMenu.childMenus" :key="indexS">{{sMenu.name}},{{indexS}}
            </el-menu-item>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!---->
    <div class="button_top" v-for="(menu,index) in menuHead" :key="index" style="width: 100%;height: 100%;">
      <span v-if="!menu.childMenus">
         <el-button>
   {{menu.name}}
  </el-button>
      </span>
      <span v-if="menu.childMenus">
     <el-dropdown split-button type="primary" @click="hand_user_data(menu)">
  {{menu.name}}
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="(cMenu,cIndex) in menu.childMenus"
                      :key="cIndex">{{cMenu.name}},{{cIndex}}</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </span>
    </div>
    <tables ref="table"></tables>
  </el-dialog>
</template>

<script>
  import lt from '../Amazon/a.css'
  import PubSub_Ship from 'pubsub-js'
  import tables from '../Amazon/AddShipment_table'
  import {repMenu} from '../../../api'

  export default {
    data () {
      return {
        menuList: [],
        fullScreen:true,
        type: 1, //菜单类型的type
        FormValue_Ship: false,
        editableTabsValue2: '2',
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
        menuHead: [],

      }
    },
    mounted () {
      PubSub_Ship.subscribe('saveFormValue_Ship', (msg, FormValue_Ship) => {
        this.menuHead = []
        this.FormValue_Ship = FormValue_Ship
        const result = repMenu(this.type)
        result.then((resultMenu) => {
          //拿到数据
          if (resultMenu.code === 200) {
            //赋值快捷按钮
            this.menuList = resultMenu.data
            //计算 快捷按钮数据
            this.menuList.forEach((item) => {
              if (item.childMenus !== null && item.childMenus.length > 0) {
                item.childMenus.forEach((cItem) => {
                  if (cItem.name === '新增' || cItem.name === '复制'
                    || cItem.name === '保存' || cItem.name === '恢复' ||
                    cItem.name === '打印' || cItem.name === '预览' || cItem.name === '批录'
                    || cItem.name === '删除' || cItem.name === '添加' || cItem.name === '审核' || cItem.name === '关闭'
                    || cItem.name === '作废' || cItem.name === '第一条' || cItem.name === '前一条' || cItem.name === '后一条'
                    || cItem.name === '最后一条' || cItem.name === '邮件' || cItem.name === '消息' || cItem.name === '退出') {
                    this.menuHead.push(cItem)
                  }
                })
              }
            })
          }
        })

        //获得菜单头信息
      })
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      addTab (targetName) {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        this.editableTabsValue2 = newTabName
      },
      removeTab (targetName) {
        let tabs = this.editableTabs2
        let activeName = this.editableTabsValue2
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue2 = activeName
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
      },
      //快捷键
      hand_user_data (val) {
        if (val === '新增') {
          alert('待添加')
        }
        if (val === '复制') {
          alert('待添加')
        }
        if (val === '保存') {
          this.$refs.table.submitForm('form')
        }
        if (val === '恢复') {
          this.$refs.table.resetForm('form')
        }
        if (val === '打印') {
          alert('待添加')
        }
        if (val === '预览') {
          alert('待添加')
        }
        if (val === '批录') {
          alert('待添加')
        }
        if (val === '删除') {
          alert('待添加')
        }
        if (val === '添加') {
          this.$refs.table.set_data()
        }
        if (val === '审核') {
          alert('待添加')
        }
        if (val === '关闭') {
          alert('待添加')
        }
        if (val === '作废') {
          alert('待添加')
        }
        if (val === '第一条') {
          alert('待添加')
        }
        if (val === '前一条') {
          alert('待添加')
        }
        if (val === '后一条') {
          alert('待添加')
        }
        if (val === '最后一条') {
          alert('待添加')
        }
        if (val === '邮件') {
          alert('待添加')
        }
        if (val === '消息') {
          alert('待添加')
        }
        if (val === '退出') {
          alert('待添加')
        }
      },
    },
    components: {
      lt,
      tables
    }
  }
</script>

<style scoped lang="scss">
  .button_top {
    display: inline;
    .el-button {
      width: 70px;
      height: 70px;
      border-left: 0px;
      .iconfont {
        font-size: 25px !important;
      }
    }
  }
  .el-dialog__header {
    text-align: center;
    background-color: #e8e8e8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    .el-dialog__title {
      font-family: "宋体";
      font-size: 20px;
    }
  }
  //表单关闭
  .el-dialog__headerbtn {
    background-color: #F56C6C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 20px;
    height: 20px;
  }

  //表单边框
  .el-dialog {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
</style>
