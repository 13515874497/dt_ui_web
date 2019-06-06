<template>
    <div class="tags" v-if="showTags">
      <div style="position:relative ;height:54px;overflow:hidden">
        <ul id="tablist" ref="ulId" >
              <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index" :title="item.title"  @click="dianji(index,item)"  @mouseleave="leave()">        
                  <router-link :to="item.path" class="tags-li-title">
                  {{item.title | ellipsis}}
                  </router-link>
                    <span class="tags-li-icon" @click="closeTags(index)" v-show="item.path !== '/index'"><i class="el-icon-close"></i></span> 
                 <div id="hides" v-show="indexHide == index&&isHide && item.path !== '/index'">
                    <el-button  @click.prevent.stop="refresh(item)" class=" el-icon-refresh fresh" size="mini" >刷新</el-button>
                    <el-button @click="collect(item)" class=" el-icon-star-off collect" size="mini" >收藏</el-button> 
                 </div>                                 
              </li>
        </ul>          
      </div>
      <!-- <button class="arrow arrow_left" @click="next_pic" v-show="isShow"><</button>
      <button class="arrow arrow_right" @click="prev_pic" v-show="isShow" >></button> -->
      <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary" class="btnmi">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button> 
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
               
        </div>
    </div>
</template>

<script>
import bus from "../../api/bus";
import {repMenu} from '@/api'
export default {
  inject: ["reload"], //引入页面加载刷新
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
      indexHide: -1,
      isHide: false
    };
  },
  methods: {
    dianji(x, i) {
      //x代表索引，i代表路径
      // console.log(x)
      // console.log(i)
      // console.log(this.isHide)
      this.indexHide = x;
      this.isHide = true;
      // console.log(this.isHide)
    },
    leave() {
      this.isHide = false;
    },

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
      this.$router.push("/index");
      this.tagsList = [];
      this.isShow = false;
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    //刷新页面
    refresh(item) {
      console.log(item)
      this.reload()
    },

    //收藏页面
    collect(item) {
      console.log(item)
      let path = item.path //每个标签页的路径
      console.log(path)
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      console.log(isExist);
      if (!isExist) {
        //   if (this.tagsList.length >= 15) {
        //   this.isShow = true;
        // }
        if (this.tagsList.length >= 18) {
          alert("打开标签过多，请关闭其他标签");
          return;
        }
        this.tagsList.push({
          title: this.$route.params.name,
          path: route.fullPath,
          name: route.name
        });
        console.log(route.fullPath);
        console.log(route.matched[1]);
        console.log(this.$route.params.name);
      }
      bus.$emit("tags", this.tagsList);
    },

    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    }
    //向左点击
    // next_pic() {
    //   let wrap = this.$refs.ulId;
    //   var newLeft;
    //   newLeft = parseInt(wrap.style.left) - 40;
    //   wrap.style.left = newLeft + "px";
    //   console.log(newLeft)

    // },
    // //向右点击
    // prev_pic() {
    //   let wrap = this.$refs.ulId;
    //   var newLeft;
    //   newLeft = parseInt(wrap.style.left) + 40;
    //   wrap.style.left = newLeft + "px";
    //   console.log(newLeft)
    // },
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
      console.log(this.setTags(newValue));
    }
  },
  created() {
    this.setTags(this.$route);
    // console.log(this.setTags(this.$route));
  },
    async mounted() {
      let res = await repMenu();
      console.log(res);
  },
};
</script>


<style lang="scss" scoped>
.arrow_left {
  border: none;
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
.arrow_right {
  border: none;
  position: absolute;
  top: 0px;
  right: 110px;
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
  height: 50px;
  width: 100%;
  background: #fff;
  padding-right: 110px;
  box-shadow: 0 5px 10px #ddd;
  // overflow: hidden;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-decoration: underline;
  padding: 0px;
  // margin-left: 20px;
}

.tags-li {
  // float: left;
  display: inline-block; 
  margin: 7px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  // overflow: hidden;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  border: 1px solid #e9eaec;
  // background: #409EFF;
  padding: 0 13px 0 13px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  position: relative;
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
  top: 23px;
  left: -20px;
  border: none;
  outline: none;
  height: 10px;
  background: none;
}
.collect {
  position: absolute;
  left: 12px;
  top: 23px;
  border: none;
  outline: none;
  height: 10px;
  background: none;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 108px;
  height: 50px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.el-dropdown {
  position: absolute;
  top: 7px;
  left: 7px;
}

// .tags-li .fresh,
// .tags-li .collect{
//   display: none;
// }
// .tags-li:hover .fresh{
//    display:block;
// }
// .tags-li:hover .collect{
//    display:block;
// }
.btnmi {
  padding: 10px 15px;
}
#tablist { 
overflow-x: auto; //设置x轴可滑动 
list-style: none;//去掉li上的小点 
white-space:nowrap;//元素不换行 
width:auto;
position: absolute;
left:0;
transition: all 1s; 
margin-bottom:0;
}
/*-------滚动条整体样式----*/
#tablist::-webkit-scrollbar {
width:5px;
height:5px;
}
/*滚动条里面小方块样式*/
#tablist::-webkit-scrollbar-thumb {
border-radius:100px;
-webkit-box-shadow:inset 0 0 8px rgba(0,0,0,0.1);
background:#ccc;
}
/*滚动条里面轨道样式*/
#tablist::-webkit-scrollbar-track {
-webkit-box-shadow:inset 0 0 8px rgba(0,0,0,0.8);
border-radius:0;
background:rgba(0,0,0,0.1);
}

</style>
