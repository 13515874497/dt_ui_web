
<script>
import pig from "@/components/HeaderTop/img/pig.jpg";
import storage from "@/utils/storageUtils";
import { repMenu, repCheckMenuToken } from "@/api";

export default {
  props:["showFlag"],
  render() {
    return (
      <div class="test-1" style="height:100%;position:relative;" >
        <h2 class={{user_aside:!this.isCollapse,user_aside_s:this.isCollapse}}>
          {/*2019/05/09  修改人：乌日娜  修改内容：添加头像查看信息提示框*/}
          <a class="t_a"  href="javascript:;" style=" text-decoration: none;display:inline-block;" onMouseover={this.hoverD} onMouseout ={this.outD} ><img class="user_img" src={pig} />
            <div v-show={this.tool_tips_show}  class="tool_tips">
              <p class="top_p">{this.informationMy.company}</p>
              <p class="content_p"><span class="left_span">姓名</span><span class="right_span">{this.informationMy.name}</span></p>
              <p class="content_p"><span class="left_span">电话</span><span class="right_span">{this.informationMy.tel}</span></p>
              <p class="content_p"><span class="left_span">部门</span><span class="right_span">{this.informationMy.department}</span></p>
              <p class="content_p"><span class="left_span">性别</span><span class="right_span">{this.informationMy.sex}</span></p>
              <a class="change_info" onClick={this.change_my_info}>修改个人资料</a>
            </div>
          </a>
          <p class="user_name">{this.userName}</p>
        </h2>

        <el-row class="tac" style="margin-top:110px">
          <el-menu
            default-active={this.$router.path}
            router
            class="el-menu-vertical-demo none"
            style="height: 100%;border-right: 0px"
            background-color="#293846"
            text-color="#fff"
            active-text-color="#ffd04b"
            collapse={this.isCollapse}
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
      menuList: [],
      isCollapse: false, //控制导航栏伸缩
      tool_tips_show:false,
      informationMy:{
          company:'温州电兔电子商务有限公司',
          name:'张三',
          tel:'13xxxxxxxx',
          department:'数据分析部',
          sex:'男'
      }
    };
  },
  watch:{
    //监听父组件传过来的值
    showFlag(n,o){
      this.isCollapse = n;
    }
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
    hoverD(){
      this.tool_tips_show = true;
    },
    outD(){
      this.tool_tips_show = false;
    },
    change_my_info(){
        console.log('跳转去个人信息修改页');
    },
    handleClick(){
      //控制导航栏伸缩
      this.isCollapse = !this.isCollapse

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

                  <i class={item.icon ? item.icon : "el-icon-loading"} />

                <span slot="title" class="mName">
                  {item.mName}
                </span>
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
  },
};
</script>
<style lang="scss" scoped>
.user_down {
  cursor: pointer;
  margin-left: 25px;
}

.user_name {
  font-size: 13px;
  color: aliceblue;
  padding-left: 13px;
  padding-top: 5px;
  margin: 0;
}

.user_img {
  // margin-top: 33px;
  // margin-bottom: 10px;
  // margin-left: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50px 50px 50px 50px;
}

.user_aside {
  background-color: #2f4050;
 // width:220px;
  // height: 80px;
  padding:10px 163px 20px 6px;
  margin: 0;
  display:inline-block;
  position:fixed;
  top:0;
  left:0;
  z-index:999;
  //固定头像
}
.user_aside_s {
  background-color: #2f4050;
 // width:220px;
  // height: 80px;
  padding:10px 6px 20px 6px;
  margin: 0;
  display:inline-block;
  position:fixed;
  top:0;
  left:0;
  z-index:999;
  //固定头像

}
a.t_a:hover{
  background-color:green;
  text-decoration: none;
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
//解决滚动条出现后导航增加10px问题
.test-1{
  max-width:220px;
}
.test-1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  position:relative;
  left:-10px;
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
.test1 {
  width: 180px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: width 0.28s;
  z-index: 1001;
  overflow: hidden;
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 180px;
  }
}
//头像提示框
.tool_tips{
  width:200px;
  height:225px;
  border:1px solid #e2e2e2;
  background-color:white;
  position:absolute;
  top:50px;
  left:55px;
  border-radius:8px;
}
.top_p{
  margin:10px;
  font-size:14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content_p{
  margin:4px;
}
.left_span{
  font-size:13px;
  color:grey;
  margin:4px 15px 4px 4px;
}
.right_span{
  font-size:13px;
  margin:4px 15px 4px 4px;
}
.change_info{
  width:100%;
  height:30px;
  display:inline-block;
  line-height:30px;
  background-color:#e3e3e3;
  text-align:center;
  font-size:14px;
  margin-top:10px;
  text-decoration: none;
  color:black;
  border-radius:0 0 8px 8px;
}
a.change_info:hover{
text-decoration: none;
color:white;
background-color:grey;
}
//信息提示框小箭头，目前没有用到
.rotate_d{
  width:10px;
  height:10px;
  background-color:white;
  transform:translate(-5px,2px) rotate(45deg) ;
}
</style>
