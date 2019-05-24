<template>
  <div class="header">
    <!-- <img class="img_header" src="./img/logo.png"> -->
    <div class="main">
      <p>欢迎来到 XXX 中文管理后台</p>
      <ul class="ctrl">
          <i class="el-icon-edit" @click="hh" style="font-size:25px"></i>
        <el-dropdown>
          <li >
            <i class="el-icon-edit-outline" @click="feedback" style="font-size:25px"></i>      
          </li>
          <el-dropdown-menu slot="dropdown">
             <!-- <el-dropdown-item @click.native="queryPage"  style="font-size:14px;line-height:30px">查看页面</el-dropdown-item> -->
            <el-dropdown-item @click.native="queryResults"  style="font-size:14px;line-height:30px">查询反馈结果</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       
        <li>
          <i class="iconfont el-iconfont-wenjianchaxun" @click="queryFiles"></i>
        </li>
        <li>
          <el-badge :value="100" :max="10" class="item">
            <i class="icon_sum iconfont icon_dt-nitification" @click="d"></i>
          </el-badge>
        </li>
        <li>
          <el-badge :value="100" :max="99" class="item">
            <i class="icon_sum iconfont icon_dt-tongzhi" @click="c"></i>
          </el-badge>
        </li>
        <li>
          <div>
            <i class="icon_sum iconfont icon_dt-tuichu" @click="logout"></i>
            <span class="quit" @click="logout">注销</span>
          </div>
        </li>
        <li>
          <div>
            <i class="icon_sum iconfont icon_dt-liebiao" @click="a"></i>
          </div>
        </li>
      </ul>
    </div>

    <el-dialog title="文件查询" :visible.sync="showQueryFiles" width="1200px" style="z-index:99">
      <QueryFiles></QueryFiles>
    </el-dialog>

      <el-dialog title="问题反馈" :visible.sync="showFeedback" width="1000px">
      <FeedbackInfor></FeedbackInfor>
    </el-dialog>
  </div>
</template>

<script>
import { repLogout } from "@/api";
import QueryFiles from "@/components/FileUpload/QueryFiles";
import FeedbackInfor from "@/components/FeedBack/FeedbackInfor";
import bus from "../../api/bus";
export default {
  components: {
    QueryFiles, //文件查询
    FeedbackInfor //问题反馈
  },
  data() {
    return {
      showQueryFiles: false,
      showFeedback:false
    };
  },
  methods: {
    async logout() {
      const result = await repLogout();
      if (result.code === 200) {
        this.$router.replace("/login");
      }
    },
    a() {
      console.log("列表");
    },
    c() {
      console.log("消息提示");
    },
    d() {
      console.log("最新提示");
    },
    queryFiles() {
      // this.$router.push('/index/queryFiles')
      this.showQueryFiles = true;
    },
    feedback(){
      console.log('反馈')
      //新增反馈页面、
      this.showFeedback = true;
    },
    // queryPage(){
    //   console.log('页面查看')
    //   this.$router.push('/index/userfeedbackinfor')
    // },
    queryResults(){
      console.log('查询结果')
      this.$router.push('/index/userfeedback')
    },
    hh(){
      console.log('管理员待审核页面')
       this.$router.push('/index/audit')
    }
    
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  background: url("./img/logo.png") no-repeat left center;
  min-width: 930px;
  .main {
    line-height: 90px;
    text-align: center;
  }
  .toggle-btn {
    font-size: 25px;
  }
}
ul.ctrl {
  position: absolute;
  right: 0;
  top: 20px;
  margin: 0;
  padding: 0;
  line-height: 50px;
  li {
    display: inline-block;
    padding: 0 20px;
    vertical-align: middle;
    cursor: pointer;
    .iconfont {
      font-size: 25px;
    }
    :hover {
      color: #409eff;
    }
    sup:hover {
      color: #fff;
    }
  }
}

</style>
