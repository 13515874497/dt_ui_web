<template>
    <div class="tags" v-if="showTags">
      <div style="position:relative ;height:40px;overflow:hidden">
        <ul class="tablist" ref="ulId" style="position: absolute;left:0;width:1700px;transition: all 1s;">
              <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index" :title="item.title" >
                  <router-link :to="item.path" class="tags-li-title" >
                  {{item.title | ellipsis}}
                  </router-link>
                  <span class="tags-li-icon" @click="closeTags(index)" v-show="index !==0"><i class="el-icon-close"></i></span>
              </li>
          </ul>          
      </div>
      <button class="arrow arrow_left" @click="next_pic" v-show="isShow"><</button>
      <button class="arrow arrow_right" @click="prev_pic" v-show="isShow" >></button>
      <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
             <el-button type="primary"  @click="refresh" class="el-icon-refresh fresh" size="mini">刷新页面</el-button >
        </div>
    </div>
</template>

<script>
import bus from "../../api/bus";
export default {
  inject: ["reload"],//引入页面加载刷新
  //标签字数大于4个就显示省略号
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 4) {
        return value.slice(0, 4) + "...";
      }
      return value;
    }
  },
  data() {
    return {
      tagsList: [],
      isShow:false,
    };
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/index");
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/index");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    //刷新页面
    refresh() {
      this.reload();
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      console.log(isExist);
      if (!isExist) {
          if (this.tagsList.length >= 8) {
          this.isShow = true;
        }
        if (this.tagsList.length >= 18) {
          alert("打开标签过多，请关闭其他标签");
          return;
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.name
    });
        console.log(route.meta.title);
        console.log(route.fullPath);
        console.log(route.matched[1]);
      }
      bus.$emit("tags", this.tagsList);
    },

    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    },
    //向左点击
    next_pic() {
      let wrap = this.$refs.ulId;
      var newLeft;
      newLeft = parseInt(wrap.style.left) - 40;
      wrap.style.left = newLeft + "px";
      console.log(newLeft)
   
    },
    //向右点击
    prev_pic() {
      let wrap = this.$refs.ulId;
      var newLeft;
      newLeft = parseInt(wrap.style.left) + 40;
      wrap.style.left = newLeft + "px";
      console.log(newLeft)
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
      //   console.log(this.setTags(newValue));
    }
  },
  created() {
    this.setTags(this.$route);
    // console.log(this.setTags(this.$route));
    // 监听关闭当前页面的标签页
    bus.$on("close_current_tags", () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push("/index");
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    });
  }
};
</script>


<style lang="scss" scoped>
.arrow_left{
  border:none;
    position: absolute;
    top: 0px;
    left: 0px;
    display: inline-block;
    /* margin-top: 6px; */
    z-index: 9;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    width: 20px;
    text-align: center;
    background: antiquewhite;
    cursor: pointer;
      outline: none;
}
.arrow_right{
   border:none;
  position: absolute;
    top: 0px;
    right: 205px;
    display: inline-block;
    /* margin-top: 6px; */
    z-index: 9;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    width: 20px;
    text-align: center;
    background: antiquewhite;
    cursor: pointer;
      outline: none;
}
a {
  text-decoration: none;
  outline: none;
}
.tags {
  position: relative;
  height: 40px;
  width: 100%;
  background: #fff;
  padding-right: 205px;
  box-shadow: 0 5px 10px #ddd;
  // overflow: hidden;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-decoration: underline;
  padding: 0px;
  margin-left: 20px;
}

.tags-li {
  float: left;
  margin: 7px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  border: 1px solid #e9eaec;
  // background: #409EFF;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  // color: #fff;
  background: #409eff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}
.fresh {
  position: absolute;
  right: 5px;
  top: 7px;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 205px;
  height: 40px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.el-dropdown {
  position: absolute;
  top: 7px;
  left: 7px;
}
</style>
