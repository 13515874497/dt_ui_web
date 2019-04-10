<template>
  <section>
    <main class="main">
      <el-tag class="tag">{{page.name}}</el-tag>
      <div class="sel">
        <el-radio-group
          v-model="radio.model"
          size="mini"
          @change="changeRadio"
          v-show="radio.isShow"
        >
          <el-radio-button
            v-for="item in radio.render"
            :label="item.shopId"
            :key="item.shopId"
          >{{item.shopName}}</el-radio-button>
        </el-radio-group>
        <el-select
          placeholder="请选择"
          v-if="select.render.length"
          v-model="select.model"
          @change="changeSelect"
        >
          <el-option
            v-for="item in select.render"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </main>

    <el-tabs
      type="card"
      style="margin-top:10px"
      v-model="tab_model"
      v-show="uploadFrom.siteId || uploadFrom.areaId"
    >
      <el-tab-pane label="文件上传" name="upload" class="tab-content-left">
        <section class="left">
          <!-- 根据不同类型插入不同模块 -->
          <slot name="slotType"></slot>

          <div class="upload" v-show="select.model">
            <el-upload class="upload-demo" drag action multiple :before-upload="beforeAvatarUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <!-- 将{{}}文件拖到此处，或 -->
                将{{radio.label}}店铺---{{select.label}}---文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传{{validSuffix.join('/')}}文件，且不超过100mb</div>
            </el-upload>
          </div>
        </section>
        <section class="right">
          <ul class="uploadStatus">
            <li v-for="(item,index) in uploadStatus">
              <el-tag
                @close="removeReadyFile(index)"
                style="display: block"
                color="#ffffff"
                closable
              >{{item.fileName}}</el-tag>

              <el-progress
                :percentage="uploadStatus[index].progress.percentage"
                :status="uploadStatus[index].progress.status"
                class="elProgress"
                :text-inside="true"
                :stroke-width="15"
              ></el-progress>
              <el-steps
                :space="200"
                :active="uploadStatus[index].step.count"
                align-center
                finish-status="success"
                process-status="success"
              >
                <el-step :title="uploadStatus[index].step.wait"></el-step>
                <el-step
                  :title="uploadStatus[index].step.uploading"
                  :status="uploadStatus[index].step.uploading_status"
                  :description="uploadStatus[index].step.errorMsg"
                ></el-step>
                <el-step
                  :title="uploadStatus[index].step.dealWith"
                  :status="uploadStatus[index].step.dealWith_status"
                ></el-step>
              </el-steps>
            </li>
          </ul>
          <el-button
            class="uploadBtn"
            v-show="readyFileList.length"
            round
            @click="uploadFiles"
            type="primary"
            plain
            size="mini"
            :disabled="uploadBtn.disabled"
          >
            确认上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </section>
      </el-tab-pane>
      <el-tab-pane label="文件查询" name="query">
        <Table
          :tableData="existedFiles.tableData"
          :tableTitle="tableTitle"
          v-if="tableTitle.length"
        >
          <!-- <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>-->
        </Table>
        <OperateBtn :operateList="operateList"></OperateBtn>
        <Pagination :data="existedFiles" v-on:pageData="pagination" style="margin-top:10px"/>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import {
  repGetShopIdSiteInfo,
  repGetUserUploadInfo, //获取已上传的文件信息
  findByListRegion,
  repGetShopName,
  BASEURL,
  repAddUploadInfoMysql
} from "@/api";
import message from "@/utils/Message";
import checkUtils from "@/utils/CheckUtils";
import axios from "axios";
import Table from "@/components/ElementUi/Table";
import Pagination from "@/components/ElementUi/Pagination";
import pUtils from "@/utils/PageUtils";
import OperateBtn from "@/components/ElementUi/OperateBtn";
export default {
  props: {
    pId: {
      type: String
    },
    businessTime: {
      type: Number
    },
    showNext: {}
  },
  components: {
    Table,
    Pagination,
    OperateBtn
  },
  data() {
    return {
      page: {
        name: this.$route.params.name,
        id: +this.$route.params.id
      },
      tab_model: "upload",
      // -------------------------------文件上传
      radio: {
        model: "",
        label: "",
        render: [],
        isShow: true
      },
      select: {
        model: null,
        label: null,
        render: []
      },
      uploadBtn: {
        disabled: false
      },
      continent: [109, 110, 113, 114], //页面id为洲的信息，其他都是站点
      isContinent: false, //判断该页面显示洲还是站点
      //根据菜单id判断上传类型
      suffix: {
        csv: [85, 108, 104],
        xls: [105, 107, 106, 125, 115],
        xlsx: [105, 107, 106, 125, 115],
        txt: [109, 110, 113, 114]
      },
      readyFileList: [], //待上传的文件(已验证通过)
      uploadStatus: [], //每个文件上传过程中的状态
      curr_progress: 0,
      param: new FormData(),
      //-----------------------------已上传文件查询
      existedFiles: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        page_sizes: [5, 10, 15, 20, 25]
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
        tbId: this.page.id,
        businessTime: this.businessTime || "" //业务报告日期
      };
    },
    //当前页面那些是可传的后缀
    validSuffix() {
      let arr = [];
      for (let key in this.suffix) {
        if (this.suffix[key].includes(this.page.id)) {
          arr.push(key);
        }
      }
      return arr;
    },
    tableTitle() {
      let arr = [
        {
          topType: "name",
          headName: "文件名",
          inputType: 0
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
    async "radio.model"(val) {
      console.log(val);
      if (this.isContinent) {
        return;
      } else {
        let res = await repGetShopIdSiteInfo(val);
        this.select.render = res.data.map(item => {
          return {
            id: item.siteId,
            name: item.siteName
          };
        });
      }
    },
    showNext(val) {
      console.log(val);
      if (val !== undefined) {
        this.radio.isShow = val;
      }
    },
    tab_model(val) {
      if ("query" === val) {
        this.getExistedFiles();
      }
    }
  },
  methods: {
    init() {
      if (this.showNext !== undefined) {
        this.radio.isShow = this.showNext;
      }
    },
    //渲染radio店铺列表
    async getRadioList() {
      let res = await repGetShopName();
      console.log(res);
      if (res.code === 200) {
        this.radio.render = res.data;
      }
    },
    changeRadio(val) {
      this.radio.label = this.radio.render.find(item => {
        return item.shopId === val;
      }).shopName;
    },
    changeSelect(val) {
      console.log(val);
      this.select.label = this.select.render.find(item => {
        return item.id === val;
      }).name;
    },
    //判断slect渲染洲还是站点 如果是洲则直接请求
    async getSlectRender() {
      if (this.continent.includes(this.page.id)) {
        this.isContinent = true;
        let res = await findByListRegion({});
        if (res.code === 200) {
          this.select.render = res.data.map(item => {
            return {
              id: item.areaId,
              name: item.areaName
            };
          });
        }
      }
    },
    verifySuffix(fileName) {
      let pointIndex = fileName.lastIndexOf(".");
      let suffix = fileName.slice(pointIndex + 1);
      if (this.validSuffix.includes(suffix)) {
        return true;
      } else {
        return false;
      }
    },
    //上传校验
    beforeAvatarUpload(file) {
      console.log(this.uploadFrom);

      console.log(file);
      let repeatFile = this.readyFileList.find(item => {
        return item.name === file.name;
      });
      if (repeatFile) {
        message.errorMessage("上传文件名重复");
        return;
      } else {
        if (!this.verifySuffix(file.name)) {
          message.errorMessage(
            `上传文件格式错误,只能上传${this.validSuffix.join("/")}类型的文件`
          );
          return;
        }
        const isFlg = checkUtils.checkFileInfo(file, this.uploadFrom);
        if (!isFlg) {
          return isFlg;
        }

        this.readyFileList.push(file);
        this.uploadStatus.push({
          fileName: file.name,
          step: {
            count: 0,
            wait: "等待上传",
            uploading: "",
            uploading_status: "",
            dealWith: "",
            dealWith_status: "",
            errorMsg: ""
          },
          progress: {
            percentage: 0,
            status: ""
          }
        });
        this.uploadBtn.disabled = false;
      }
    },
    //删除待上传文件
    removeReadyFile(index) {
      console.log(index);

      this.uploadBtn.disabled = false;
      this.readyFileList.splice(index, 1);
      this.uploadStatus.splice(index, 1);
    },
    //初始化上传的状态
    initUploadStatus() {
      for (let i = 0; i < this.readyFileList.length; i++) {
        let s = this.uploadStatus[i];
        s.fileName = this.readyFileList[i].name;
        let ss = s.step;
        ss.count = 0;
        ss.wait = "等待上传";
        ss.uploading = "";
        ss.uploading_status = "";
        ss.dealWith = "";
        ss.dealWith_status = "";
        ss.errorMsg = "";
        let sp = s.progress;
        sp.percentage = 0;
        sp.status = "";
      }
    },
    //点击上传文件
    uploadFiles() {
      let self = this;
      this.curr_progress = 0;
      this.uploadBtn.disabled = true;
      this.initUploadStatus();
      this.param = new FormData();
      this.readyFileList.forEach(file => {
        self.param.append("files", file, file.name);
      });
      this.param.append("sId", this.uploadFrom.shopId);
      this.param.append("seId", this.uploadFrom.siteId);
      this.param.append("payId", this.uploadFrom.pId);
      this.param.append("menuId", this.uploadFrom.tbId);
      this.param.append("areaId", this.uploadFrom.areaId);
      this.param.append("businessTime", this.uploadFrom.businessTime);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        contentType: false,
        processData: false
      };
      axios.post(BASEURL + "/upload/file", this.param, config).then(res => {
        console.log(res);
        let data = res.data.data;
        if (res.data.code == 200) {
          data.forEach((item, index) => {
            let step = self.uploadStatus[index].step;
            switch (item.status) {
              case 0:
              case 2:
                step.uploading = "上传成功";
                break;
              default:
                step.uploading = "上传失败";
                step.uploading_status = "error";
                break;
            }
            step.count++;
          });
          if (data.length) {
            const resultAdd = repAddUploadInfoMysql({
              uploadSuccessList: data
            });
            self.setUploadStatus("数据处理中", 2, "process");
            resultAdd.then(resAdd => {
              console.log(resAdd);
              if (resAdd.code === 200) {
                resAdd.data.forEach((item, index) => {
                  let step = self.uploadStatus[index].step;
                  let progress = self.uploadStatus[index].progress;
                  let data = item.data;
                  switch (data.status) {
                    case 0:
                    case 2:
                      message.messageNotSuccess(data.remark, data.name);
                      step.dealWith = "数据处理成功";
                      step.dealWith_status = "success";
                      step.count++;
                      break;
                    case 1:
                      message.messageNotError(data.remark, data.name);
                      step.dealWith = "数据处理失败";
                      step.dealWith_status = "error";
                      progress.status = "exception";
                      break;
                  }
                });
              } else if (resAdd.code === -1) {
                let msgArr = resAdd.msg.split("*");
                let msg = "";
                msg += msgArr[0] + "\n";
                if (msgArr[1]) {
                  msgArr[1] = JSON.parse(msgArr[1]);
                  for (let key in msgArr[1]) {
                    let value = msgArr[1][key];
                    msg += key + ":\n";
                    for (let i = 0; i < value.length; i++) {
                      msg += value[i] + "\n";
                    }
                  }
                }
                message.messageNotError(msg);
                self.setUploadStatus("数据处理失败", 2, "error");
              }
            });
          }
        } else {
          self.setUploadStatus("上传失败", 1, "error");
        }
      });
    },
    setUploadStatus(msg, count, status) {
      this.uploadStatus.forEach(item => {
        item.count = count;

        switch (count) {
          case 1:
            item.step.uploading = msg;
            item.step.uploading_status = status;
            break;
          case 2:
          case 3:
            item.step.dealWith = msg;
            item.step.dealWith_status = status;
            break;
        }
      });
    },
    //获取上传的进度条信息
    initWs() {
      let self = this;
      //等待父组件连上websocket
      console.log(self.$ws);
      this.wsTimer = setTimeout(() => {
        if (!self.$ws) {
          self.initWs();
          return;
        }
        self.$ws.addEventListener("message", self.bindWsEvent);
      }, 1000);
    },
    //websock绑定事件
    bindWsEvent(msg) {
      let resMsg = msg.data;
      let res = JSON.parse(resMsg);
      if (
        (res.code === 200 || res.code === -1) &&
        res.type === "PROGRESS_BAR"
      ) {
        this.progressBar(res);
      }
    },
    //进度条渲染
    progressBar(res) {
      let self = this;
      console.log(this);
      console.log(this.uploadStatus);

      switch (res.msg) {
        case "success":
          this.uploadStatus[this.curr_progress++].progress.status = "success";
          break;
        case "error":
          this.uploadStatus[this.curr_progress++].progress.status = "error";
          break;
        default:
          if (res.msg.indexOf("[{") > -1) {
            let data = JSON.parse(res.msg);
            console.log(self.curr_progress);
            data.forEach(item => {
              let percentage = item.percentage;
              console.log(percentage);
              self.uploadStatus[
                self.curr_progress
              ].progress.percentage = percentage;
            });
          }
          break;
      }
    },

    //获取已上传的文件列表
    async getExistedFiles() {
      this.pagination(this.existedFiles);

      // console.log(this.uploadFrom);
      // console.log();
      // let requestData = { ...this.uploadFrom, ...this.existedFiles };
      // delete requestData.tableData;
      // let res = await repGetUserUploadInfo(requestData);
      // pUtils.pageInfo(res, this.existedFiles);
      // console.log(res);
    },
    //根据分页参数请求数据
    async pagination(data) {
      let requestData = { ...this.uploadFrom, ...data };
      delete requestData.tableData;
      let res = await repGetUserUploadInfo(requestData);
      pUtils.pageInfo(res, this.existedFiles);
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
    //下载
    download() {
      console.log("download");
    },
    remove(){
      console.log('remove');
      
    }
  },
  created() {
    this.init();
    this.getSlectRender();
    this.getRadioList();
    this.initOperateBtn();
  },
  mounted() {},
  activated() {
    this.initWs();
  },
  deactivated() {
    this.$ws && this.$ws.removeEventListener("message", this.bindWsEvent);
    this.wsTimer && clearTimeout(this.wsTimer);
  }
};
</script>

<style lang="scss" scoped>
.el-step__title {
  line-height: 24px;
}
.tab-content-left {
  padding: 5px 0 0 25px;
}
.sel {
  margin-top: 20px;
  line-height: 40px;
}
.tab-content-left {
  // padding-left: 25px;
  .left,
  .right {
    display: inline-block;
    vertical-align: top;
    .uploadStatus {
      min-width: 400px;
    }
  }
  .left {
    .upload {
      margin-top: 5px;
    }
  }
  .right {
    .uploadStatus {
      div {
        margin-top: 2px;
      }
    }
    .uploadBtn {
      float: right;
    }
  }
}
</style>


