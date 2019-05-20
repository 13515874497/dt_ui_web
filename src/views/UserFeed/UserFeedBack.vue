<template>
    <div class="fanBoxs">
        <!-- 表格 -->
       <Table :tableData="fbFiles.tableData" :tableTitle="tableTitle" ></Table>
       <!-- 分页 -->
       <Pagination :data="fbFiles" v-on:pageData="pagination" style="margin-top:10px"/> 
    </div>
</template>
<script>
import Table from "@/components/ElementUi/Table";
import Pagination from "@/components/ElementUi/Pagination";
import pUtils from "@/utils/PageUtils";
import axios from "axios";
import message from "@/utils/Message";
import {selProcess} from '@/api'
export default {
  components: {
    Pagination,
    Table,
  },
  data() {
    return {
        fbFiles: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        // total_size: 0, //总的页
        pageSize: 10, //显示最大的页
        // page_sizes: [5,7, 10, 15, 20, 25]
      }
    };
  
  },
  methods: {
   //获取已上传的文件列表
    async getfbFiles() {
      this.pagination(this.fbFiles);
      console.log(this.fbFiles)
    },
   
   //根据分页参数请求数据
    async pagination(data) {
      let requestData = { ...data };
      let res = await selProcess(requestData);
      console.log(res);
      if(res.code == 200){
        this.fbFiles.tableData = res.data
      }   
    },
  },
  computed: {
    tableTitle(){
      let arr = [
        {
          topType: "fbNum",
          headName: "反馈编号",
        },
        {
          topType: "mName",
          headName: "反馈菜单",
        },
        {
          topType: "imageUrl",
          headName: "图片",
        },
        {
          topType: "reason",
          headName: "描述",
        },
        {
          topType: "applyUser",
          headName: "反馈人",
        },
        {
          topType: "applyTime",
          headName: "反馈时间",
          inputType:2
        },
        {
          topType: "applyStatus",
          headName: "反馈状态",
        },
        {
          topType: "fbOpinion",
          headName: "受理意见",
        },
        {
          topType: "adPerson",
          headName: "受理人",
        },
        {
          topType: "adTime",
          headName: "受理时间",
        }
      ];
      return arr;//将数据返回出去
    }
  },
   created() {
   this.getfbFiles();
    console.log(this.tableTitle)   
  }
  
};
</script>
