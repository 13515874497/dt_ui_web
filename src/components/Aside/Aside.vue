<script>
import pig from "@/components/HeaderTop/img/pig.jpg";
import storage from "@/utils/storageUtils";
import { repMenu, repCheckMenuToken } from "@/api";
export default {
  render() {
    return (
      <div class="test-1">
        <h2 class="user_aside">
          <img class="user_img" src={pig} />
          <p class="user_name">{this.userName}</p>
        </h2>
        <el-row class="tac">
          <el-menu
            default-active={this.$router.path}
            router
            class="el-menu-vertical-demo none"
            style="height: 100%;border-right: 0px"
            background-color="#293846"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            {this.renderMenuItem(this.menuList)}
          </el-menu>
        </el-row>
      </div>
    );
  },
  data() {
    return {
      userName: this.getCookie("name"),
      menuList: []
    };
  },
  methods: {
    readCache() {
      const menu = storage.readData(this.userName + "menu");
      if (!menu || !menu.length) {
        this.getRepMenu();
        return;
      }
      this.menuList = menu;
    },
    async getRepMenu() {
      let res = await repMenu();

      if (res.code === 200) {
        storage.saveData(this.userName + "menu", res.data);
        this.menuList = res.data;
        return;
      }
    },
    renderMenuItem(list) {
      var arr = list.map((item, index) => {
        if (!item.url && item.childMenus && item.childMenus.length) {
          return (
            <el-submenu index={item.menuId.toString()} key={item.menuId}>
              <template slot="title">
                <span>
                  <i class={item.icon ? item.icon : "el-icon-loading"} />
                </span>
                <span class="mName">{item.mName}</span>
              </template>
              <el-menu-item-group key={item.menuId}>
                {this.renderMenuItem(item.childMenus)}
              </el-menu-item-group>
            </el-submenu>
          );
        } else {
          return (
            <el-menu-item
              index={item.url + "/" + item.menuId + "/" + item.mName}
              key={item.menuId}
            >
              <span>
                <i class={item.icon} />
              </span>
              <span class="mName">{item.mName}</span>
            </el-menu-item>
          );
        }
      });

      return arr;
    }
  },

  async mounted() {

    //传给后台校验接口
    const resultCheck = await repCheckMenuToken();
    switch (resultCheck.code) {
      case -1:
        this.readCache();
        break;
      case 200:
        this.getRepMenu();
        break;
    }
  }
};
</script>
<style lang="scss" scoped>
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
  border-radius: 50px 50px 50px 50px;
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
.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  background-color: #2f4050 !important;
  color: #5b5a5a !important;
}

.item_li {
  background-color: #3e5367 !important;
}

.el-submenu__title {
  height: 12%;
}

.none {
  float: left;
}
.mName {
  padding-left: 20%;
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
.el-submenu [class^="el-icon-"] {
  margin-top: -5px;
  margin-left: -4px;
  margin-right: -5px;
}

.el-menu--collapse > .el-menu-item [class^="el-icon-"],
.el-menu--collapse > .el-submenu > .el-submenu__title [class^="el-icon-"] {
  margin: 0;
  vertical-align: middle;
  width: 16px;
  text-align: center;
}

//账号权限按钮
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: 0px;
  color: #909399 !important;
}

//账号权限按钮悬浮
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title:hover {
  border-bottom: 0px;
  color: #585a5a !important;
}

//item_title
.el-menu-item-group__title {
  padding-top: 0px;
  padding-bottom: 0px;
}

.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  display: none;
}

.test-1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.test-1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.test-1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #2f4050;
}
</style>
