<template>
  <section>
    <main class="main">
      <el-tag class="tag">{{page.name}}</el-tag>

      <div class="sel" v-if="!onlyShowUpload">
        <slot name="slotType"></slot>
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
          @change="changeSelect_site"
        >
          <el-option
            v-for="item in select_site.render"
            :key="item.id"
            :label="`${item.name}(${item.shortName})`"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-date-picker v-model="value2"  type="month" placeholder="选择月" :picker-options="pickerOptions" v-if="flag" ></el-date-picker>

        <el-button type="primary" class="el-btn">设为默认按钮</el-button>
      </div>
    </main>

    <el-tabs
      type="card"
      style="margin-top:10px"
      v-model="tab_model"
      v-show="(select.model !== '') || onlyShowUpload"
    >
      <el-tab-pane label="文件上传" name="upload" class="tab-content-left">
        <section class="left">
          <!-- 根据不同类型插入不同模块 -->

          <div class="upload">
            <el-upload class="upload-demo" drag action multiple :before-upload="beforeAvatarUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <!-- 将{{}}文件拖到此处，或 -->
                <!-- {{radio.label}}店铺---{{select.label}}--- -->
                将{{onlyShowUpload?'': radio.label+'店铺---' +select.label}}文件拖到此处，或
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
            <i class="el-icon-upload el-icon--left"></i>
            确认上传
          </el-button>
          <el-button
            class="removeBtn"
            v-show="readyFileList.length"
            round
            @click="removeReadyFile_all"
            type="danger"
            plain
            size="mini"
          >
            <i class="el-icon-delete el-icon--left"></i>
            删除待上传文件
          </el-button>
        </section>
      </el-tab-pane>
      <el-tab-pane label="文件查询" name="query">
        <Table
          :tableData="existedFiles.tableData"
          :tableTitle="tableTitle"
          v-if="tableTitle.length"
        >
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
        <!-- <OperateBtn :operateList="operateList"></OperateBtn> -->
        <Pagination :data="existedFiles" v-on:pageData="pagination" style="margin-top:10px"/>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
let starDate= ""
let endDate = ""
import {
  repGetShopIdSiteInfo,
  repGetUserUploadInfo, //获取已上传的文件信息
  selectReg,
  repGetShopName,
  BASEURL,
  repAddUploadInfoMysql,
  repDelUploadInfo,
  getCheckoutDate
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
      value2: "",
      pickerOptions: {
        disabledDate(time) {
          // console.log(new Date(starDate).toLocaleDateString(), new Date(endDate).toLocaleDateString())
          //8.64e7=1000*60*60*24 一天
           return (time.getTime() < starDate - 8.64e7 || time.getTime() > endDate);
          }          
        },  
      flag:true,
      page: {
        name: this.$route.params.name,
        id: +this.$route.params.id
      },
      tab_model: "upload",

      showUploadmId: [271],
      // -------------------------------文件上传
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
      uploadBtn: {
        disabled: false
      },
      continent: [109, 110, 113, 114, 269, 270, 325], //页面id为洲的信息，其他都是站点(在这个里面的页面只要选择到洲就可以上传文件)

      //根据菜单id判断上传类型
      suffix: {
        csv: [85, 108, 104],
        xls: [105, 107, 106, 125, 115, 271],
        xlsx: [105, 107, 106, 125, 115, 271],
        txt: [109, 110, 113, 114, 269, 270, 325]
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
      },
      notifys: [], //当前页面的所有提示信息
      financialIntroduction: [85] ,//财务导入的id,
      businessReport:[108],//业务报告id
    };
  },
  computed: {
    isContinent() {
      return this.continent.includes(this.page.id);
    },
    select() {
      return this.isContinent ? this.select_area : this.select_site;
    },
    uploadFrom() {
      return {
        closingDate: this.value2,
        shopId: this.radio.model, //店铺ID
        siteId: this.select_site.model, //站点 ID
        areaId: this.select_area.model, //洲 ID
        pId: this.pId || "", //付款类型ID
        mId: this.page.id,
        businessTime: this.businessTime || "" //业务报告日期
      };
    },
    //当前页面哪些是可传的后缀
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
              name: "部分skuId信息错误"
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
    },
    //直接显示文件上传
    onlyShowUpload() {
      if (this.showUploadmId.includes(this.page.id)) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    // async "radio.model"(val) {
    //   console.log(val);
    //   if (this.isContinent) {
    //     return;
    //   } else {
    //     this.select.model = null;
    //     let res = await repGetShopIdSiteInfo(val);
    //     this.select.render = res.data.map(item => {
    //       return {
    //         id: item.siteId,
    //         name: item.siteName,
    //         shortName: item.siteShortNameEng
    //       };
    //     });
    //   }
    // },
    "select_area.model"() {
      this.removeReadyFile_all();
      this.existedFiles.currentPage = 1;
      this.getExistedFiles();
      this.select_site.render = [];
      this.select_site.model = "";
      this.getSelect_site();
      //--------
    },
    "select_site.model"() {
      this.removeReadyFile_all();
      this.existedFiles.currentPage = 1;
      this.getExistedFiles();
    },
    showNext(val) {
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
      if (res.code === 200) {
        this.radio.render = res.data;
      }
    },

    async getDate() {
      console.log(this)
      let _this = this
      if(this.businessReport.includes(this.page.id)){
        this.flag = false;
      }
      if (this.financialIntroduction.includes(this.page.id)) {
        let res = await getCheckoutDate({ menuId: "111" });
        console.log(res);  //财务导入
       if(res.code === 200){
        _this.value2 = res.data.split(":")[0];  
        let time = res.data.split(':')
        let startTime = time[0]
        let endTime = time[1]
        let startTime_ym = startTime.split('-')
        let startTime_y = startTime_ym[0]
        let startTime_m = startTime_ym[1]
        starDate = (new Date(startTime_y,startTime_m )) -1 ; 

        console.log(starDate) //开始的时间
        
        let endTime_ym = endTime.split('-')
        let endTime_y = endTime_ym[0]
        let endTime_m = endTime_ym[1]
        endDate = (new Date(endTime_y,endTime_m)) -1;

        console.log(endDate)//结束的时间

       }
        
      } else {
        let res = await getCheckoutDate({ menuId: "102" });
        console.log(res); //运营导入
        if(res.code === 200){
         _this.value2 = res.data.split(":")[0]
         let time = res.data.split(':')
        let startTime = time[0]
        let endTime = time[1]
        let startTime_ym = startTime.split('-')
        let startTime_y = startTime_ym[0]
        let startTime_m = startTime_ym[1]

       starDate = (new Date(startTime_y,startTime_m )) -1 ; 

        console.log(starDate) //开始的时间
        
        let endTime_ym = endTime.split('-')
        let endTime_y = endTime_ym[0]
        let endTime_m = endTime_ym[1]

        endDate = (new Date(endTime_y,endTime_m)) -1;

        console.log(endDate)//结束的时间

       }
      }
    },
    changeRadio(val) {
      let option = this.radio.render.find(item => {
        return item.shopId === val;
      });
      this.radio.label = option.shopName;
      this.radio.shortName = option.shopShortCode;
    },
    changeSelect_area(val) {
      let option = this.select_area.render.find(item => {
        return item.id === val;
      });
      this.select_area.label = option.name;
      this.select_area.shortName = option.shortName;
      this.select_area.arId = option.arId;
    },
    changeSelect_site(val) {
      let option = this.select_site.render.find(item => {
        return item.id === val;
      });
      this.select_site.label = option.name;
      this.select_site.shortName = option.shortName;
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
      if (this.isContinent) return;
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

        let rule = { radio: this.radio, select: this.select };
        let flag = checkUtils.checkFileInfo(file, rule, this.onlyShowUpload);
        if (!flag) return;

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
    //删除所有待上传的文件
    removeReadyFile_all() {
      this.readyFileList = [];
      this.uploadStatus = [];
    },
    //删除待上传文件
    removeReadyFile(index) {
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
      this.param.append("menuId", this.uploadFrom.mId);
      this.param.append("areaId", this.uploadFrom.areaId);
      this.param.append("businessTime", this.uploadFrom.businessTime);
      this.param.append("closingDate", this.uploadFrom.closingDate);
      console.log(this.uploadFrom.closingDate);
      
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
              if (resAdd.code === 200) {
                resAdd.data.forEach((item, index) => {
                  let step = self.uploadStatus[index].step;
                  let progress = self.uploadStatus[index].progress;
                  if (item.code === 200) {
                    let data = item.data;
                    switch (data.status) {
                      case 0:
                        message.messageNotiSuccess(data.remark, data.name);
                        step.dealWith = "数据处理成功";
                        step.dealWith_status = "success";
                        step.count++;
                        break;
                      case 2:
                        console.log(item);
                        let msg = `<p>${
                          data.remark
                        }<button path="${data.filePath +
                          data.uuidName}" fileName="${
                          data.name
                        }"  type="button" class="sku_download_btn el-button el-button--primary el-button--mini"><i class="el-icon-download"></i><span>下载</span></button></p>`;
                        this.notifys.push(
                          message.messageNotiSuccessHtml(msg, data.name)
                        );
                        console.log(this);

                        step.dealWith = "数据处理成功";
                        step.dealWith_status = "success";
                        step.count++;
                        break;
                      case 1:
                        message.messageNotiError(data.remark, data.name);
                        step.dealWith = "数据处理失败";
                        step.dealWith_status = "error";
                        progress.status = "exception";
                        break;
                    }
                  } else if (item.code === -1) {
                    let msgArr = item.msg.split("*");
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
                    message.messageNotiError(msg);
                    step.dealWith = "数据处理失败";
                    step.dealWith_status = "error";
                    progress.status = "exception";
                  }
                });
              }
            });
          }
        } else {
          self.setUploadStatus(res.data.msg, 1, "error");
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
    bindEventDelegation() {
      document.addEventListener("click", this.eventDelegationFn);
    },
    eventDelegationFn(e) {
      function getDom(target, className) {
        if (target === document) {
          return null;
        }
        if (target.className.indexOf(className) === -1) {
          return getDom(target.parentNode, className);
        } else {
          return target;
        }
      }
      let target = getDom(e.target, "sku_download_btn");
      if (!target) return;
      let path = target.getAttribute("path");
      let fileName = target.getAttribute("fileName");
      this.download(null, path, fileName);
    },
    //获取上传的进度条信息
    initWs() {
      let self = this;
      //等待父组件连上websocket
      console.log(self.$ws);
      this.wsTimer = setTimeout(() => {
        if (self.$ws) {
          switch (self.$ws.readyState) {
            case 0:
              self.initWs();
              break;
            case 1:
              self.$ws.addEventListener("message", self.wsOnMessage);
              self.$ws.addEventListener("close", self.wsOnClose);
              self.$ws.addEventListener("error", self.wsOnError);
              break;
            default:
              self.$initWs();
              self.initWs();
          }
        } else {
          self.$initWs();
          self.initWs();
        }
      }, 1000);
    },
    //只在该页面的  websock onmessage事件
    wsOnMessage(msg) {
      let resMsg = msg.data;
      let res = JSON.parse(resMsg);
      console.log(res);
      
      if (
        (res.code === 200 || res.code === -1) &&
        res.type === "PROGRESS_BAR"
      ) {
        this.progressBar(res);
      }
    },
    //只在该页面的  websock onclose事件
    wsOnClose() {
      this.initWs();
    },
    wsOnError() {
      this.initWs();
    },
    //进度条渲染
    progressBar(res) {
      let self = this;
      let step = this.uploadStatus[this.curr_progress].step;
      let progress = this.uploadStatus[this.curr_progress].progress;
      // console.log(res);
      switch (res.msg) {
        case "存入数据中":
          step.dealWith = "存入数据中";
          step.dealWith_status = "finish";
          break;
        case "success":
          progress.status = "success";
          step.dealWith_status = "success";
          this.curr_progress++;
          break;
        case "error":
          progress.status = "error";
          step.dealWith_status = "error";
          this.curr_progress++;
          break;

        default:
          if (res.msg.indexOf("[{") > -1) {
            let data = JSON.parse(res.msg);
            // console.log(self.curr_progress);
            data.forEach(item => {
              let percentage = item.percentage;
              // console.log(percentage);
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
    //下载status===2的文件 //这里要么传scope(表格上的下载)，要么传path和fileName(上传后直接下载)
    download(scope, path, fileName) {
      console.log("download");
      console.log(scope);
      if (scope) {
        let row = scope.childData.row;
        let path = row.filePath + row.uuidName;
        let fileName = row.name;
      }
      let config = {
        responseType: "blob"
      };
      // let self = this;
      axios
        .post(
          BASEURL + "/upload/downloadCommonFile",
          { filePath: path },
          config
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            this.downloadFile(res, fileName);
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
    },
    closeNotifys() {
      this.notifys.forEach(item => {
        item.close();
      });
    }
  },
  created() {
    this.init();
    this.getSelect_area();
    this.getRadioList();
    this.initOperateBtn();
    this.getDate();     
  },
  
  mounted() {
    
  },
  activated() {
    this.initWs();
    this.bindEventDelegation();
  },
  deactivated() {
    if (this.$ws) {
      this.$ws.removeEventListener("message", this.wsOnMessage);
      this.$ws.removeEventListener("close", this.wsOnClose);
      this.$ws.removeEventListener("error", this.wsOnError);
      document.removeEventListener("click", this.eventDelegationFn);
      this.closeNotifys();
    }
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
    .uploadBtn,
    .removeBtn {
      float: right;
      margin-left: 10px;
    }
  }
}
.el-btn {
  margin-left: 20px;
}
</style>


