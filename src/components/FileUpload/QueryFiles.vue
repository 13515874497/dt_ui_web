<template>
  <div>
    <div class="sel">
      <slot name="slotType"></slot>
      <el-radio-group v-model="radio.model" size="mini" v-show="radio.isShow">
        <el-radio-button
          v-for="item in radio.render"
          :label="item.shopId"
          :key="item.shopId"
        >{{item.shopName}}</el-radio-button>
      </el-radio-group>

        <el-select
          placeholder="请选择"
          v-if="select_area.render.length && uploadFrom.shopId"
          v-model="select_area.model"
           @change="changeSelect_area"
        >
          <el-option
            v-for="item in select_area.render"
            :key="item.id"
            :label="`${item.name}(${item.shortName})`"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-select
          placeholder="请选择"
          v-if="select_site.render.length && select_area.model"
          v-model="select_site.model"
        >
          <el-option
            v-for="item in select_site.render"
            :key="item.id"
            :label="`${item.name}(${item.shortName})`"
            :value="item.id"
          ></el-option>
        </el-select>



    </div>

    <Table :tableData="existedFiles.tableData" :tableTitle="tableTitle">
      <template v-slot:operate="scope">
        <el-button
          @click="download(scope)"
          v-if="scope.childData.row.status == 2"
          size="mini"
          type="primary"
          icon="el-icon-download"
        >下载</el-button>
        <el-button @click="remove(scope)" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
      </template>
    </Table>

    <Pagination :data="existedFiles" v-on:pageData="pagination" style="margin-top:10px"/>
  </div>
</template>

<script>
import {
  repGetShopIdSiteInfo,
  repGetUserUploadInfo, //获取已上传的文件信息
  selectReg,
  repGetShopName,
  BASEURL,
  //   repAddUploadInfoMysql,
  repDelUploadInfo
} from "@/api";
import Table from "@/components/ElementUi/Table";
import Pagination from "@/components/ElementUi/Pagination";
import pUtils from "@/utils/PageUtils";
import OperateBtn from "@/components/ElementUi/OperateBtn";
import axios from "axios";
import message from "@/utils/Message";
export default {
  components: {
    Pagination,
    Table,
    OperateBtn
  },
  data() {
    return {
      // isContinent: "",
      radio: {
        model: "",
        label: "",
        render: [],
        isShow: true
      },
       select_area: {
        model: "",
        label: null,
        render: [],
        shortName: ""
      },
      select_site: {
        model: "",
        label: null,
        render: [],
        shortName: ""
      },
      existedFiles: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 7, //显示最大的页
        page_sizes: [5,7, 10, 15, 20, 25]
      }
    };
  },
  computed: {
    uploadFrom() {
      return {
        // closingDate: this.value2,
        shopId: this.radio.model, //店铺ID
        siteId: this.select_site.model, //站点 ID
        areaId: this.select_area.model, //洲 ID
        pId: this.pId || "", //付款类型ID
        // mId: this.page.id,
        businessTime: this.businessTime || "" //业务报告日期
      };
    },
    tableTitle() {
      let arr = [
        {
          topType: "name",
          headName: "文件名",
          inputType: 0
        },
        {
          topType: "status",
          headName: "上传状态",
          inputType: 3,
          statusOptions: [
            {
              id: 0,
              selectId: 0,
              name: "成功"
            },
            {
              id: 1,
              selectId: 1,
              name: "失败"
            },
            {
              id: 2,
              selectId: 2,
              name: "部分skuId错误"
            }
          ]
        },
        {
          topType: "createDate",
          headName: "上传日期",
          inputType: 4
        },
        {
          topType: "remark",
          headName: "备注",
          inputType: 0
        }
      ];
      if (this.uploadFrom.pId) {
        arr.push({
          topType: "businessTime",
          headName: "运营结算报告日期",
          inputType: 0
        });
      }
      return arr;
    }
  },
  watch: {
    "select_area.model"() {
      // this.removeReadyFile_all();
      this.existedFiles.currentPage = 1;
      this.getExistedFiles();
      this.select_site.render = [];
      this.select_site.model = "";
      this.getSelect_site();
      //--------
    },
    "select_site.model"() {
      // this.removeReadyFile_all();
      this.existedFiles.currentPage = 1;
      this.getExistedFiles();
    },
    uploadFrom(){
        this.getExistedFiles();
    }
  },
  methods: {
    async getRadioList() {
      let res = await repGetShopName();
      if (res.code === 200) {
        this.radio.render = res.data;
      }
    },
     //获取洲
    async getSelect_area() {
      let res = await selectReg();
      if (res.code === 200) {
        this.select_area.render = res.data.map(item => {
          return {
            id: item.areaId,
            name: item.areaName,
            shortName: item.areaShortNameEng,
            arId: item.arId
          };
        });
      }
    },
    //获取站点
    async getSelect_site() {
      // if (this.isContinent) return;
      let res = await repGetShopIdSiteInfo(this.select_area.arId);
      if (res.code === 200) {
        this.select_site.render = res.data.map(item => {
          return {
            id: item.siteId,
            name: item.siteName,
            shortName: item.siteShortNameEng
          };
        });
      }
    },
     changeSelect_area(val) {
      let option = this.select_area.render.find(item => {
        return item.id === val;
      });
      // this.select_area.label = option.name;
      // this.select_area.shortName = option.shortName;
      this.select_area.arId = option.arId;
    },
 
     //获取已上传的文件列表
    async getExistedFiles() {
      this.pagination(this.existedFiles);
    },
    //根据分页参数请求数据
    async pagination(data) {
      let requestData = { ...this.uploadFrom, ...data };
      delete requestData.tableData;
      let res = await repGetUserUploadInfo(requestData);
      console.log(res);
      
      pUtils.pageInfo(res, this.existedFiles);
      console.log(this.existedFiles);
      
    },
    initOperateBtn() {
      let self = this;
      this.operateList = [
        //对已上传的文件进行操作的按钮列表
        {
          type: "primary",
          icon: "el-icon-download",
          label: "下载",
          fn() {
            self.download();
          }
        },
        {
          type: "danger",
          icon: "el-icon-delete",
          label: "删除",
          fn() {
            self.remove();
          }
        }
      ];
    },
    //下载status===2的文件
    download(scope) {
      console.log("download");
      console.log(scope);
      let row = scope.childData.row;
      let config = {
        responseType: "blob"
      };
      let path = row.filePath + row.uuidName;
      axios
        .post(
          BASEURL + "/upload/downloadCommonFile",
          { filePath: path },
          config
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res);

            this.downloadFile(res, row.name);
          }
        });
    },
    // 下载文件
    downloadFile(data, fileName) {
      console.log(data);
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(data.data);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    //删除文件
    async remove(scope) {
      let row = scope.childData.row;
      message
        .messageBox_confirm("是否确认删除")
        .then(() => {
          repDelUploadInfo(row.id).then(res => {
            if (res.code === 200) {
              this.getExistedFiles();
            }
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.getRadioList();
    this.getSelect_area();
    this.getExistedFiles();
    console.log(this.tableTitle);
    
  }
};
</script>

<style>
</style>
