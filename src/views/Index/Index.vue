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
import { repIndex, getLoginStatus } from "@/api";
import Vue from "vue";
// import PubSub from "pubsub-js";
import message from "@/utils/Message";
export default {
  data() {
    return {
      isRole: true,
      ws: null
    };
  },
  methods: {
    connectWebsocket(uid) {
      console.log(this.ws);

      if (this.$ws) return;
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
        socket.addEventListener("message", msg => {
          let resMsg = msg.data;
          let res = JSON.parse(resMsg);
          console.log(res);
          console.log('接收到一条websocket消息~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
          if (res.code === 200) {
            switch (res.type) {
              // case "PROGRESS_BAR":
              //   if (res.msg.indexOf("[{") > -1) {
              //     PubSub.publish("progressBar", JSON.parse(res.msg));
              //   } else {
              //     message.successMessage(res.msg);
              //   }
              //   break;
              case "REGISTER":
                message.successMessage(res.msg);
                break;
            }
          } else if (res.code === -1) {
            switch (res.type) {
              case "KICK_OUT":
                message
                  .messageBox_info(JSON.parse(res.msg).msg)
                  .then(() => {
                    this.$router.replace("/login");
                    socket.close();
                  })
                  .catch(() => {
                    this.$router.replace("/login");
                    socket.close();
                  });
                break;
            }
          }
          // .then(() => {
          //   // socket.close();
          // })
          // .catch(() => {
          //   // socket.close();
          // });
        });
        socket.onclose = () => {
          console.log("socket关闭");
        };
      }
      // this.socket = new WebSocket(`ws://192.168.208.109:9001/webSocket/${uid}`);
      Vue.prototype.$ws =  new WebSocket(`ws://192.168.208.109:3333/ws`);
      bindEvents(this.$ws);
      //获得消息事件
    }
  },
  components: {
    Header,
    Aside
  },

  created() {},
  async mounted() {
    let res = await getLoginStatus();
    if (res.code === 200) {
      this.connectWebsocket(+this.getCookie("uId"));
    }
  },
  beforeDestroy() {
    this.$ws&&this.$ws.close();
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
