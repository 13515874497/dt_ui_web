<template>
  <div class="header">
    <!-- <img class="img_header" src="./img/logo.png"> -->
    <div class="main">
      <p>欢迎来到 XXX 中文管理后台</p>
      <ul class="ctrl">
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

    <el-dialog title="文件查询" :visible.sync="showQueryFiles" width="1200px">
      <QueryFiles></QueryFiles>
    </el-dialog>
  </div>
</template>

<script>
import { repLogout } from "@/api";
import QueryFiles from "@/components/FileUpload/QueryFiles";

export default {
  components: {
    QueryFiles
  },
  data() {
    return {
      showQueryFiles: false
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
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  background: url("./img/logo.png") no-repeat left center;
  min-width: 790px;
  .main {
    line-height: 90px;
    text-align: center;
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
