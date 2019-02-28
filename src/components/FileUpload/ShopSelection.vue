<template>
  <div style="margin-left: 150px">
    <div style="padding-top: 20px;" v-if="ptFrom.mShow">
      <el-radio-group v-model="radioShop" size="mini" @change="changeRadio">
        <el-radio-button :label="sArr" v-for="(sArr,index) in shopArr" :key="index">{{sArr.shopName}}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="ptFrom.mShow && siteOptions.length  > 0">
      <el-select v-model="uploadFrom.siteId" placeholder="请选择" @change="changeSelect" value="">
        <el-option
          v-for="item in siteOptions"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
    </div>
    <div v-if="ptFrom.mShow && areaOptions.length  > 0">
      <el-select v-model="uploadFrom.areaId" placeholder="请选择" @change="changeSelect" value="">
        <el-option
          v-for="item in areaOptions"
          :key="item.areaId"
          :label="item.areaName"
          :value="item.areaId">
        </el-option>
      </el-select>
    </div>
    <FileUp :fileUp="fileUp" :uploadFrom="uploadFrom"/>
  </div>
</template>

<script>
  import {
    repGetShopIdSiteInfo,
    repGetUserUploadInfo,
    repGetRegionInfo, repGetShopName
  } from '../../api'
  import FileUp from '../../components/FileUpload/FileUp'

  export default {
    props: {
      ptFrom: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        shopArr: [], //店铺集合
        uploadFrom: {
          shopId: '',//店铺ID
          siteId: '',//站点 ID
          pId: '', //付款类型ID
          areaId: '',
          tbId: this.$route.params.id,
          businessTime: '' //业务报告日期
        },
        //组建传递的值
        fileUp: {
          newListFile: [],//上传中列表
          icon_list: [], //上传成功后遍历
          isFileUp: '',
          fileListInfo: [],
          areaName: '',
          siteName: '',
          shopName: '',
          bt_show: false,
          disabled: false,
          fileType: ''
        },
        radioShop: '',//店铺 model
        siteOptions: [],//站点信息
        areaOptions: [],//洲信息
      }
    },
    components: {
      FileUp
    },
    async mounted () {
      //获取店铺信息
      const resultShop = await repGetShopName()
      if (resultShop.code === 200) {
        this.shopArr = resultShop.data
      }
    },
    methods: {
      async changeRadio (value) {
        this.uploadFrom.areaId = ''
        this.fileUp.newListFile = []
        this.fileUp.disabled = true
        this.fileUp.bt_show = false
        this.fileUp.shopName = value.shopName
        this.uploadFrom.shopId = value.shopId
        this.fileUp.icon_list = []
        let tbId = this.uploadFrom.tbId
        //获得洲信息
        if (tbId === '109' || tbId === '110' || tbId === '113' || tbId === '114') {
          const resultArea = await repGetRegionInfo({})
          console.log(resultArea)
          if (resultArea.code === 200) {
            this.areaOptions = resultArea.data
          }
        } else {
          //通过 sId  获得站点信息
          const resultSite = await repGetShopIdSiteInfo(this.uploadFrom.shopId)
          if (resultSite.code === 200) {
            this.siteOptions = resultSite.data
          }
          this.uploadFrom.siteId = ''
        }
        this.fileUp.isFileUp = false
      },
      //下拉时获取 通过value=siteId  查询对应的对象 获取 label
      async changeSelect (value) {
        this.uploadFrom.businessTime = this.ptFrom.businessTime
        this.fileUp.fileListInfo = []
        this.fileUp.icon_list = []
        let obj = {}
        //判断 上传文件显示的 结尾类型
        let tbId = this.uploadFrom.tbId
        if (tbId === '85' || tbId === '108' || tbId === '104') {
          this.fileUp.fileType = '.csv'
        } else if (tbId === '105' || tbId === '107' ||
          tbId === '106' || tbId === '125' || tbId === '115') {
          this.fileUp.fileType = '.xls/xlsx'
        } else if (tbId === '109' || tbId === '110' || tbId === '113' || tbId === '114') {
          this.fileUp.fileType = '.txt'
        }
        //通过菜单ID 显示 是洲还是站点类型
        if (tbId === '109' || tbId === '110' || tbId === '113' || tbId === '114') {

          obj = this.areaOptions.find((item) => {
            return item.areaId === value
          })
          this.fileUp.areaName = obj.areaName
        } else {

          obj = this.siteOptions.find((item) => {
            return item.siteId === value
          })
          this.fileUp.siteName = obj.siteName + '站点'
        }

        if (this.ptFrom.pId === undefined) {
          this.uploadFrom.pId = ''
        } else {
          this.uploadFrom.pId = this.ptFrom.pId
        }
        this.fileUp.isFileUp = true
        const resultUploadInfo = await repGetUserUploadInfo(this.uploadFrom)
        //console.log(resultUploadInfo)
        if (resultUploadInfo.code === 200) {
          for (let i = 0; i < resultUploadInfo.data.length; i++) {
            let uploadInfo = resultUploadInfo.data[i]
            //2代表 有些sku没有的 可以重新下载  有问题
            if (uploadInfo.status === 2) {
              console.log(uploadInfo)
              this.$set(this.fileUp.icon_list, this.fileUp.icon_list.length, {
                'isIcon': true,
                'id': uploadInfo.id,
                'filePath': uploadInfo.filePath + uploadInfo.uuidName,
                'name': uploadInfo.name
              })
              this.fileUp.fileListInfo.push(uploadInfo)
            } else {
              this.$set(this.fileUp.icon_list, this.fileUp.icon_list.length, {'isIcon': false, 'id': uploadInfo.id})
              this.fileUp.fileListInfo.push(uploadInfo)
            }
          }
        }
      },
    }
  }
</script>

<style scope lang="scss">
  .icons {
    margin-top: 5px;
    height: 26px;
  }

  .el-upload-list {
    float: right;
    margin-right: 35px !important;
  }

  .el-upload-list__item-name {
    width: 300px;
  }

  .el-icon-warning {
    color: #F56C6C;
  }

  .el-icon-circle-check {
    color: #67C23A;
  }

  .el-button--mini.is-circle:hover {
    background-color: #F56C6C;
  }
</style>
