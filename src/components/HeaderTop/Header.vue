<template>
  <div class="header">
    <!-- <img class="img_header" src="./img/logo.png"> -->
    欢迎来到 XXX 中文管理后台
    <ul class="ctrl">
      <li>
        <i class="iconfont el-iconfont-wenjianchaxun"></i>
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
</template>

<script>
import { repLogout } from "@/api";

export default {
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
    }
  }
};
</script>

<style lang="scss" scoped>

.header {
  position: relative;
  line-height: 90px;
  text-align: center;
  background: url('./img/logo.png') no-repeat left center;
  min-width: 790px;

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
}
</style>
