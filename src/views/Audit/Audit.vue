<template>
<!-- 查看审核结果 -->
  <div>
    <div class="cheBox">
      <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam"
              @click="toggleTabs(index)"
              :class="{active:index===nowIndex}">{{item}}
        </li>
    </ul>
    </div>
  <!--切换项组件--> 
   <!--待审核  -->
  <checkPending v-show="nowIndex===0"></checkPending>  
    <!--已审核记录  -->
  <AuditedRecords v-show="nowIndex===1"></AuditedRecords>
  </div>
</template>
<script>
import checkPending from "./checkPending.vue";
import AuditedRecords from "./AuditedRecords.vue";

export default {
  components: {
    checkPending,
    AuditedRecords
  },
  data() {
    return {
      tabsParam: ["我的待审核", "查看我的审核记录"],
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
.cheBox {
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

