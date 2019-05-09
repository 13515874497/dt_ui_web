<template>
  <el-popover popper-class="field-popper" placement="left" title="打√为不显示" width="200" trigger="hover">
    <el-tree class="scrollbar" ref="tree" node-key="id" :data="data" :props="props" show-checkbox @check="check"></el-tree>
    <div slot="reference" class="fieldShow el-button el-button--primary is-plain"></div>
  </el-popover>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      props: {
        // children:
        label: "headName"
      },
      page: {
          id: this.$route.params.id
      },
      list: null
    };
  },
  watch: {
    data(val){
      if(val.length){
        this.readCache();
      }
    }
  },
  methods: {
    check(node, checked) {
    let keys = checked.checkedKeys;
    this.saveCache(keys);
    this.$emit('hideField',[this.list[this.page.id]])
    },
    saveCache(keys){
        this.list[this.page.id] = keys;
        localStorage.setItem('hideFieldList',JSON.stringify(this.list));
    },
    readCache(){
        let list = localStorage.getItem('hideFieldList');
        if(!list){
            list = {};
        }else {
            list = JSON.parse(list);
        }
        this.list = list;
        let checked = this.list[this.page.id]
        if(checked){
            this.$emit('hideField',[checked]);
             this.$refs.tree.setCheckedKeys(checked);
        }
    }
  },
  // mounted(){
  //     this.readCache();
  // }
};
</script>

<style lang="scss" scoped>

.fieldShow {
  position: absolute;
  right: 11px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 68px;
  width: 23px;
  writing-mode: tb-rl;
  padding: 5px;
  transform: perspective(100px) rotateY(-30deg);
}
.fieldShow::before {
  content: "隐藏字段"; /*用伪元素来生成一个矩形*/
  position: absolute;
  top: 0;
  right: 2px;
  bottom: 0;
  left: 0;
  z-index: 1;
  transform: perspective(100px) rotateY(30deg);
}
</style>

