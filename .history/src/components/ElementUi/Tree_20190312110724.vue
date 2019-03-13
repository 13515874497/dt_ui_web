<template>
  <el-tree :data="data" show-checkbox :node-key="nodeKey" :props="props">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label}}</span>
      <span>
        <el-button v-if="data.isParent" type="text" size="mini" @click="() => add(data)">
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button type="text" size="mini" @click="() => update(data)">
          <i class="el-icon-edit"></i>
        </el-button>
        <el-button
          v-if="!data.childMenus || (data.childMenus && !data.childMenus.length)"
          type="text"
          size="mini"
          @click="() => remove(data)"
        >
          <i class="el-icon-delete"></i>
        </el-button>
      </span>
    </span>
  </el-tree>
</template>

<script>
import AddDelUpBtn from "../../components/ElementUi/AddDelUpBtn"; //增删改组件
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    nodeKey: {
      type: String
    },
    props: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    add(data) {
      this.$emit("add", [data]);
    },
    updata(data) {
      this.$emit("update", [data]);
    },
    remove(data) {
      this.$emit("remove", [data]);
    },
    init() {}
  }
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
