<template>
  <div>
    <el-tag >{{page.name}}</el-tag>
    <el-radio-group v-model="radio_model" size="mini">
      <el-radio-button :label="radio.shopName" v-for="radio in radio_render" :key="radio.shopId"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import {
  repGetShopIdSiteInfo,
  repGetUserUploadInfo,
  findByListRegion,
  repGetShopName
} from "@/api";
export default {
  data() {
    return {
      page: {
        name: this.$route.params.name,
        id: this.$route.params.id
      },
      radio_model: "",
      radio_render: [
        {
          shopName: "",
          shopId: 0
        }
      ],
      select_render: [],
      continent: [109, 110, 113, 114] //页面id为洲的信息，其他都是站点
    };
  },

  methods: {
    //渲染可选择的 店铺列表
    async getShopList() {
      let res = await repGetShopName();
      console.log(res);
      if (res.code === 200) {
        this.radio_render = res.data;
      }
    },
    //判断slect渲染洲还是站点
    async getSlectRender() {
      console.log(this.continent.includes(+this.page.id));
      if (this.continent.includes(+this.page.id)) {
        let res = await findByListRegion({});
        console.log(res);
        if (res.code === 200) {
          this.select_render = res.data;
        }
      } else {
        //   let res = await
      }
    }
  },

  created() {
    // this.getSlectRender();
    this.getShopList();
  }
};
</script>

<style lang="scss" scoped>

.el-radio-group{
    display: block;
    margin-left: 180px;
}
</style>


