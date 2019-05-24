<template>
<!-- 查看反馈结果 -->
  <div>
    <div class="usrBox">
      <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam"
              @click="toggleTabs(index)"
              :class="{active:index===nowIndex}">{{item}}
        </li>
    </ul>
    </div>
  <!--切换项组件--> 
   <!--申请的  -->
  <UserApply v-show="nowIndex===0"></UserApply>  
    <!--已审核的  -->
  <Audited v-show="nowIndex===1"></Audited>
  </div>
</template>
<script>
import UserApply from "./UserApply.vue";
import Audited from "./Audited.vue";

export default {
  components: {
    UserApply,
    Audited
  },
  data() {
    return {
      tabsParam: ["我申请的反馈", "已审核的反馈"],
      nowIndex: 0,
    };
  },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.usrBox {
  width:300px;
  height: 40px;
  margin-bottom: 10px;
}
.tabs {
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.li-tab {
  width: 300px;
  height: 40px;
  line-height: 40px;
  align-items: center;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.li-tab.active {
  background: #409eff;
  color: #fff;
  border-radius: 5px;
}
</style>

