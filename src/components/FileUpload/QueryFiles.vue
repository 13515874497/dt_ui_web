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
      <div style="display:inline-block;vertical-align:middle" v-if="radio.model">
        <el-radio v-model="isContinent" :label="true">洲</el-radio>
        <el-radio v-model="isContinent" :label="false">站点</el-radio>
      </div>
      <el-select
        placeholder="请选择"
        v-if="select.render.length && uploadFrom.shopId"
        v-model="select.model"
      >
        <el-option v-for="item in select.render" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
  findByListRegion,
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
      isContinent: "",
      radio: {
        model: "",
        label: "",
        render: [],
        isShow: true
      },
      select: {
        model: '',
        label: null,
        render: []
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
        shopId: this.radio.model, //店铺ID
        siteId: this.isContinent ? "" : this.select.model, //站点 ID
        areaId: this.isContinent ? this.select.model : "", //洲 ID
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
    "radio.model"() {
      if (this.isContinent && this.select.render) {
        return;
      } else {
        this.getSelectRender();
      }
    },
    isContinent() {
      this.getSelectRender();
    },
    uploadFrom(){
        this.getExistedFiles();
    }
  },
  methods: {
    async getRadioList() {
      let res = await repGetShopName();
      console.log(res);
      if (res.code === 200) {
        this.radio.render = res.data;
      }
    },
    async getSelectRender() {
      if (this.isContinent === "") return;
      if (this.isContinent) {
        let res = await findByListRegion({});
        if (res.code === 200) {
          this.select.render = res.data.map(item => {
            return {
              id: item.areaId,
              name: item.areaName
            };
          });
        }
      } else {
        this.select.model = null;
        let res = await repGetShopIdSiteInfo(this.radio.model);
        this.select.render = res.data.map(item => {
          return {
            id: item.siteId,
            name: item.siteName
          };
        });
      }
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
    // this.getSelectRender();
    // this.initOperateBtn();
    this.getExistedFiles();
    console.log(this.tableTitle);
    
  }
};
</script>

<style>
</style>
