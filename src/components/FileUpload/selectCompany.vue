<template>
  <section>
    <el-tag class="tag">{{page.name}}</el-tag>
    <main class="main">
      <section class="left">
        <div class="sel">
          <el-radio-group v-model="radio.model" size="mini" @change="changeRadio">
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
        <div class="upload" v-show="select.model">
          <el-upload
            class="upload-demo"
            drag
            action="xx"
            multiple
            :before-upload="beforeAvatarUpload"
          >
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
            <el-tag style="display: block" color="#ffffff" closable>{{item.fileName}}</el-tag>

            <el-progress
              :percentage="uploadStatus[index].progress.percentage"
              :status="uploadStatus[index].progress.status"
              class="elProgress"
            ></el-progress>
            <el-steps
              :space="200"
              :active="uploadStatus[index].step.count"
              align-center
              finish-status="success"
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
    </main>
  </section>
</template>

<script>
import {
  repGetShopIdSiteInfo,
  repGetUserUploadInfo,
  findByListRegion,
  repGetShopName,
  BASEURL,
  repAddUploadInfoMysql
} from "@/api";
import message from "@/utils/Message";
import checkUtils from "@/utils/CheckUtils";
import axios from "axios";
export default {
  data() {
    return {
      page: {
        name: this.$route.params.name,
        id: +this.$route.params.id
      },
      radio: {
        model: "",
        label: "",
        render: []
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
      uploadStatus: [
        // {
        //   fileName: file.name,
        //   step: {
        //     count: 0,
        //     wait: "等待上传",
        //     uploading: "",
        //     dealWith: "",
        //     errorMsg: ""
        //   },
        //   progress: {
        //     percentage: 0,
        //     status: ""
        //   }
        // }
      ], //每个文件上传过程中的状态
      curr_progress: 0,
      param: new FormData()
    };
  },
  computed: {
    uploadFrom() {
      return {
        shopId: this.radio.model, //店铺ID
        siteId: this.isContinent ? "" : this.select.model, //站点 ID
        areaId: this.isContinent ? this.select.model : "", //洲 ID
        pId: "", //付款类型ID
        tbId: this.page.id,
        businessTime: "" //业务报告日期
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
    }
  },
  methods: {
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
      //   let suffixVerfy = this.validSuffix.split('/');
    },
    //上传校验
    beforeAvatarUpload(file) {
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
            uploading_status: "success",
            dealWith: "",
            dealWith_status: "success",
            errorMsg: ""
          },
          progress: {
            percentage: 0,
            status: ""
          }
        });
      }
    },
    //点击上传文件
    uploadFiles() {
      let self = this;
      this.curr_progress = 0;
      this.uploadBtn.disabled = false;
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
            this.uploadStatus.forEach(item => {
              item.step.dealWith = "数据处理中";
              item.step.count++;
            });
            resultAdd.then(resAdd => {
              console.log(resAdd);
              if (resAdd.code === 200) {
                resAdd.data.forEach((item, index) => {
                  let step = self.uploadStatus[index].step;
                  let data = item.data;
                  switch (data.status) {
                    case 0:
                    case 2:
                      message.messageNotSuccess(data.remark, data.name);
                      step.dealWith = "数据处理成功";
                      break;
                    case 1:
                      message.messageNotError(data.remark, data.name);
                      step.dealWith = "数据处理失败";
                      break;
                  }
                  step.count++;
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
                self.setUploadStatus();
              }
            });
          }
        } else {
          self.setUploadStatus();
        }
      });
    },
    setUploadStatus(msg) {
      this.uploadStatus.forEach(item => {
        switch (item.step.count++) {
          case 1:
            item.step.uploading = "上传失败";
            item.step.uploading_status = "error";
            break;
          case 2:
            item.step.dealWith = "处理数据失败";
            item.step.dealWith_status = "error";
            break;
        }
      });
    },
    //获取上传的进度条信息
    initWs() {
      let self = this;
      //等待父组件连上websocket
      console.log(self.$ws);
      setTimeout(() => {
        if (!self.$ws) {
          self.initWs();
          return;
        }
        self.$ws.addEventListener("message", msg => {
          let resMsg = msg.data;
          let res = JSON.parse(resMsg);
          console.log(res);
          if (res.code === 200) {
            switch (res.type) {
              case "PROGRESS_BAR":
                if (res.msg.indexOf("[{") > -1) {
                  self.progressBar(JSON.parse(res.msg));
                } else {
                  message.successMessage(res.msg);
                }
                break;
            }
          }
        });
      }, 1000);
    },
    progressBar(res) {
      console.log(res);
      let self = this;
      res.forEach(item => {
        console.log(item.percentage);
        let percentage = item.percentage;

        self.uploadStatus[self.curr_progress].progress.percentage = percentage;
        if (item.percentage === 100) {
          self.uploadStatus[self.curr_progress++].progress.status = "success";
        }
      });
    }
  },
  created() {
    this.getSlectRender();
    this.getRadioList();
  },
  mounted() {
    this.initWs();
  }
};
</script>

<style lang="scss" scoped>
.el-step__title {
  line-height: 24px;
}
.main {
  padding-left: 180px;
  .left,
  .right {
    display: inline-block;
    vertical-align: top;
    .uploadStatus {
      min-width: 400px;
    }
  }
  .left {
    .sel {
      .el-radio-group {
        display: block;
      }
    }
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


