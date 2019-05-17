<template>

  <div class="wrapper" >
      <el-container style="height:100%" >
    <!-- <div style="height: 100%;overflow-y: auto"> -->
      <div style="height: 100%;">
      <Aside style="overflow-y: auto;background-color: #293846"  v-bind:showFlag = "this.isCollapse"/>
      </div>

    <el-container style="float: left;position:relative;">
      <el-header style="height: 90px" >
        <Header  />
      </el-header>

      <Tags></Tags>

      <el-main style="position:relative;overflow-y:scroll;padding-right:0">
          <div >
            <a href="####" class="divFlag"  @click="this.handleClick" v-show='!this.isCollapse' >《</a>
            <a href="####" class="divFlag"  @click="this.handleClick"  v-show='this.isCollapse'>》</a>
          </div>
        <!--缓存路由组件 , 2019/05/08 修改人：乌日娜  修改内容  在keep-alive外套了div  解决问题：导航伸缩按钮要求固定 这个main页面有滚动条的时候会导致不固定-->
          <div style="height:100%;overflow-y:auto;overflow-x:hidden;" > 
            <keep-alive v-if="isRouterAlive">
             <router-view ></router-view>
            </keep-alive>
          </div>

      </el-main>
      <el-footer style="height: 20px">Footer</el-footer>
     </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/HeaderTop/Header";
import Aside from "@/components/Aside/Aside";
import Tags from '@/components/HeaderTop/Tags'
import { repIndex, getLoginStatus } from "@/api";
import Vue from "vue";
// import PubSub from "pubsub-js";
import message from "@/utils/Message";
import bus from '@/api/bus';
export default {
    provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true, //页面刷新
      isRole: true,
      tagsList: [],
      isCollapse:false
    };
  },
  methods: {
      reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    handleClick(){
      this.isCollapse = !this.isCollapse;
    },

    initWs() {
      console.log(this.$ws);

      if (this.$ws && this.$ws.readyState == 1) return;
      let uId = +this.getCookie("uId")
      let self = this;
      function bindEvents(socket) {
        socket.onopen = () => {
          console.log("Socket 已打开");
          socket.send(
            JSON.stringify({
              uId,
              type: "REGISTER"
            })
          );
        };
        socket.addEventListener("message", msg => {
          let resMsg = msg.data;
          let res = JSON.parse(resMsg);
          // console.log(
          //   "接收到一条websocket消息~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
          // );
          // console.log(res);

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
                    self.$router.replace("/login");
                    socket.close();
                  })
                  .catch(() => {
                    self.$router.replace("/login");
                    socket.close();
                  });
                break;
            }
          }
        });
        socket.onclose = () => {
          console.log("socket关闭");
        };
      }
      // this.socket = new WebSocket(`ws://192.168.208.109:9001/webSocket/${uid}`);
      Vue.prototype.$ws = new WebSocket(`ws://192.168.208.109:3333/ws`);
      // Vue.prototype.$wsBindEvents = bindEvents;
      Vue.prototype.$initWs = this.initWs;
      bindEvents(this.$ws);
      //获得消息事件
    }
  },
  components: {
    Header,
    Aside,
    Tags,
  },
  async mounted() {
    let res = await getLoginStatus();
    if (res.code === 200) {
      this.initWs();
    }
  },
  beforeDestroy() {
    this.$ws && this.$ws.close();
  },

};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
}
.divFlag{
display:inline-block;
width:15px;
height:50px;
background-color:#e3e3e3;
position:absolute;
left:0;
top:50%;
text-align:center;
line-height:50px;
font-weight:700;
z-index:999;
border-radius:0 8px 8px 0;
}

a.divFlag:link {
color: #000000;
text-decoration: none;
}
a.divFlag:visited {
color: #000000;
text-decoration: none;
}
a.divFlag:hover {
color: white;
background-color:grey;

text-decoration: none;
}
.el-table .cell {
  white-space: nowrap;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 20px;
}
.el-header {
  background-color: #e7eaec;
  color: #333;

  // line-height: 60px;
}
</style>
