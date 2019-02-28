<template>
  <div class="test-1">
    <h2 class="user_aside">
      <img class="user_img" src="../HeaderTop/img/pig.jpg"/>
      <p class="user_name">{{userName}}</p>
    </h2>
    <el-row class="tac">

      <el-menu :default-active="$router.path" router class="el-menu-vertical-demo none"
               style="height: 100%;border-right: 0px"
               background-color="#293846"
               text-color="#fff"
               active-text-color="#ffd04b">
        <!--判断父菜单没有url的-->
        <el-submenu v-if="!menu.url" :index="index.toString()" v-show="isRole" v-for="(menu,index) in menuList"
                    :key="index">
          <template slot="title">
            <i :class="menu.icon ? menu.icon : 'el-icon-loading'"></i>
            <span id="spans">{{menu.name}}</span>
          </template>

          <!--判断一级菜单下的子菜单有url的-->
          <el-menu-item-group v-if="cMenu.url" v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild">
            <el-menu-item :index="cMenu.url+'/'+cMenu.menuId+'/'+cMenu.name"><span><i :class="cMenu.icon"></i></span>
              {{cMenu.name}}
            </el-menu-item>
          </el-menu-item-group>

          <!--判断一级菜单下的子菜单没有url的-->
          <el-menu-item-group v-else>
            <el-submenu :index="index+'-'+cMenu.menuId">
              <template slot="title">
                <span><i :class="cMenu.icon ? cMenu.icon : 'el-icon-loading'"></i>
                </span> {{cMenu.name}}
              </template>

              <!--判断二级菜单下的子菜单有url的-->
              <el-menu-item-group v-if="sMenu.url" v-for="(sMenu,indexSun) in cMenu.childMenus" :key="indexSun">
                <el-menu-item :index="sMenu.url+'/'+sMenu.menuId+'/'+sMenu.name"><span><i
                  :class="sMenu.icon? sMenu.icon : 'el-icon-loading'"></i></span> {{sMenu.name}}
                </el-menu-item>
              </el-menu-item-group>
              <!--判断二级菜单下的子菜单没有url的-->
              <el-menu-item-group v-else>
                <el-submenu :index="index+'-'+sMenu.menuId">
                  <template slot="title">
                <span><i :class="sMenu.icon ? sMenu.icon : 'el-icon-loading'"></i>
                </span> {{sMenu.name}}
                  </template>
                  <!--三级下的菜单显示 -->
                  <el-menu-item :index="ssMenu.url+'/'+ssMenu.menuId+'/'+ssMenu.name"
                                v-for="(ssMenu,indexSuns) in sMenu.childMenus" :key="indexSuns">
                    <span><i :class="ssMenu.icon"></i></span>
                    {{ssMenu.name}}
                  </el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>

        <!--判断父菜单有url的-->
        <el-submenu v-else :index="menu.url+'/'+menu.menuId+'/'+menu.name" v-show="isRole">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </el-submenu>
      </el-menu>


    </el-row>
  </div>

</template>

<script>
  import storage from '../../utils/storageUtils'
  import {repMenu, repCheckMenuToken} from '../../api'

  export default {
    data () {
      return {
        userName: '',
        img_user: '',
        width: '220px',
        isRole: true,
        menuList: [],
      }
    },
    async mounted () {
      this.userName = this.getCookie('name')
      //传给后台校验接口
      const resultCheck = await repCheckMenuToken()
      //如果说是-1 说明数据还没更新
      if (resultCheck.code === -1) {
        console.log('没更新')
        //先试着读下本地缓存
        const menu = storage.readData(this.userName + 'menu')
        //如果是 不是0 说明还没缓存 继续走
        if (menu.length !== 0) {
          console.log('读缓存')
          this.menuList = menu
          return
        }
        //读取数据库存入缓存
        const result = await repMenu()
        console.log('读数据库')
        if (result.code === 200) {
          //写入缓存
          storage.saveData(this.userName + 'menu', result.data)
          this.menuList = result.data
          return
        }
      }
      console.log('更新了')
      //如果更新了
      console.log('直接读缓存')
      const result = storage.readData(this.userName + 'menu')
      this.menuList =result
    }
  }
</script>

<style lang="scss">
  .user_down {
    cursor: pointer;
    margin-left: 25px;
  }

  .user_name {
    margin-left: 25px;
    font-size: 13px;
    color: aliceblue;
    margin-top: 0;
    margin-bottom: 0;
  }

  .user_img {
    margin-top: 33px;
    margin-bottom: 10px;
    margin-left: 25px;
    width: 50px;
    height: 50px;
    border-radius: 50px 50px 50px 50px
  }

  .user_aside {
    background-color: #2f4050;
    margin-top: 0px;
    margin-bottom: 0px;
    height: 155px;
  }

  //列表item
  .el-menu.el-menu--horizontal {
    border-bottom: 0px !important;
    > .el-submenu .el-submenu__title {
      padding-left: 25px !important;

      line-height: 20px !important;
      height: 20px !important;
    }
  }

  //悬浮样式
  .el-menu--horizontal > .el-submenu:focus .el-submenu__title, .el-menu--horizontal > .el-submenu:hover .el-submenu__title {
    background-color: #2f4050 !important;
    color: #5B5A5A !important;
  }

  .item_li {
    background-color: #3E5367 !important;

  }

  .el-submenu__title {
    height: 12%;
  }

  .none {
    float: left;
  }

  //一级分类
  .el-submenu__title {
    #spans {
      padding-left: 20%;
    }
  }

  //分类长宽
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }

  .el-submenu__title * {
    margin-top: -10px !important;
  }

  //自定义图标
  .el-submenu [class^=el-icon-] {
    margin-top: -5px;
    margin-left: -4px;
    margin-right: -5px;
  }

  .el-menu--collapse > .el-menu-item [class^=el-icon-], .el-menu--collapse > .el-submenu > .el-submenu__title [class^=el-icon-] {
    margin: 0;
    vertical-align: middle;
    width: 16px;
    text-align: center
  }

  //账号权限按钮
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom: 0px;
    color: #909399 !important;
  }

  //账号权限按钮悬浮
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title:hover {
    border-bottom: 0px;
    color: #585A5A !important;
  }

  //item_title
  .el-menu-item-group__title {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
    display: none;
  }

  .test-1::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .test-1::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  .test-1::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #2f4050;
  }
</style>
