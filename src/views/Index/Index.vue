<template>
  <el-container>
    <div style="height: 100%">
      <Aside style="overflow-y: auto;height: 1000px;background-color: #293846"/>
    </div>

    <el-container style="float: left">
      <el-header style="height: 90px">
        <Header/>
      </el-header>
      <el-main>
        <!--缓存路由组件-->
        <keep-alive>
          <router-view style="height: 805px"></router-view>
        </keep-alive>
      </el-main>
      <el-footer style="height: 65px">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/HeaderTop/Header";
import Aside from "@/components/Aside/Aside";
import { repIndex } from "@/api";
import Vue from "vue";
export default {
  data() {
    return {
      isRole: true
    };
  },
  methods: {
    connectWebsocket(uid) {
      let self = this;
      function bindEvents(socket) {
        socket.onopen = () => {
          console.log("Socket 已打开");
          socket.send(
            JSON.stringify({
              uId: uid,
              type: "REGISTER"
            })
          );
        };
        socket.onmessage = msg => {
          var resMsg = msg.data;
          // .messageBox_confirm(resMsg)
          console.log(resMsg);

          // .then(() => {
          //   // socket.close();
          // })
          // .catch(() => {
          //   // socket.close();
          // });
        };
        // socket.onerror = () => {
        //   console.log("socket错误");

        //   socket.close();
        //   setTimeout(() => {
        //     self.socket = new WebSocket(`ws://192.168.208.109:3333/ws`);
        //     bindEvents(self.socket);
        //   }, 5000);
        // };
        socket.onclose = () => {
          console.log("socket关闭");
        };
      }
      // this.socket = new WebSocket(`ws://192.168.208.109:9001/webSocket/${uid}`);
      Vue.prototype.$ws = new WebSocket(`ws://192.168.208.109:3333/ws`);

      bindEvents(Vue.prototype.$ws);
      //获得消息事件
    }
  },
   mounted() {
    this.connectWebsocket(+this.getCookie("uId"));
  },
  created() {},
  components: {
    Header,
    Aside
  }
};
</script>

<style scope lang="scss">
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  background-color: #e7eaec;
  color: #333;

  line-height: 60px;
}
</style>
