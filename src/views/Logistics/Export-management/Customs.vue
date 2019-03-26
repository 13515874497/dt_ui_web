<template>
    <div id="exportBox">
            <div class="logoBox">
            <img src="./img/logo.jpg" alt="" class="exlogo">
            <h2 class="ex-title">中华人民共和国海关出口货物报关单</h2>
            </div>
            <div class="main">
                <div class="table-title" >
                    <div class="table-left">
                      <span class="title1">预录入编号：</span>
                      <input type="text" class="ex-input" >
                    </div>
                     <div class="table-left">
                      <span class="title1">海关编号：</span>
                      <input type="text" class="ex-input" >
                    </div>
                     <div class="table-left">
                      <span class="title1">页码/页数</span>
                      <input type="text" class="ex-input" >
                    </div>
                </div>
                <div class="content1" >
                    <span class="cont-span1" v-for="(i,index) in datas" :key="index" :style="{width:i.width}">
                        <p class="Consignor">{{i.aa}}</p>
                        <input type="text" >
                    </span>
                    <!-- <span class="cont-span2">
                        <p>出境关别</p>
                        <input type="text">
                    </span>
                    <span class="cont-span3">
                        <p>出口日期</p>
                        <input type="text">
                    </span>
                    <span class="cont-span4">
                        <p>申报日期</p>
                        <input type="text">
                    </span>
                    <span class="cont-span5">
                        <p>备案号</p>
                        <input type="text">
                    </span> -->
                </div> 
                <div class="content2">
                    <span class="cont2-span1" v-for="(r,index) in recipient" :key="index" :style="{width:r.width}">
                        <p>{{r.bb}}</p>
                        <input type="text">
                    </span>
                    <!-- <span class="cont2-span2">
                        <p>运输方式</p>
                        <input type="text" >
                    </span>
                    <span class="cont2-span3">
                        <p>运输工具名称及航次号</p>
                        <input type="text">
                    </span>
                    <span class="cont2-span4">
                        <p>提运单号</p>
                        <input type="text">
                    </span> -->
                </div> 
                 <div class="content2">
                    <span class="cont2-span1" v-for="(s,index) in sales " :key="index" :style="{width:s.width}">
                        <p>{{s.cc}}</p>
                        <input type="text">
                    </span>
                       <!-- <span class="cont2-span2">
                        <p>监管方式</p>
                        <input type="text">
                    </span>
                       <span class="cont2-span3">
                        <p>征免性质</p>
                        <input type="text">
                    </span>
                       <span class="cont2-span4">
                        <p>许可证号</p>
                        <input type="text">
                    </span> -->
                </div> 
                 <div class="content3">
                    <span class="cont3-span1" v-for="(contract,index) in contracts" :key="index" :style="{width:contract.width}">
                        <p>{{contract.dd}}</p>
                        <input type="text">
                    </span>
                       <!-- <span class="cont3-span2">
                        <p>贸易国（地区）</p>
                        <input type="text">
                    </span>
                       <span class="cont3-span3">
                        <p>运抵国（地区）</p>
                        <input type="text">
                    </span>
                       <span class="cont3-span4">
                        <p>指运港</p>
                        <input type="text">
                    </span>
                       <span class="cont3-span5">
                        <p>出境口岸</p>
                        <input type="text">
                    </span> -->
                </div>
                <div class="content4">
                    <span class="cont4-span1" v-for="(pack,index) in packs" :key="index" :style="{width:pack.width}">
                        <p>{{pack.ee}}</p>
                        <input type="text">
                    </span>
                    <!-- <span class="cont4-span2">
                        <p>件数</p>
                        <input type="text">
                    </span>
                    <span class="cont4-span3">
                        <p>毛重（千克）</p>
                        <input type="text">
                    </span>
                    <span class="cont4-span4">
                        <p>净重（千克）</p>
                        <input type="text">
                    </span>
                    <span class="cont4-span5">
                        <p>成交方式</p>
                        <input type="text">
                    </span>
                    <span class="cont4-span6">
                        <p>运费</p>
                        <input type="text">
                    </span>
                    <span class="cont4-span7">
                        <p>保费</p>
                        <input type="text">
                    </span>
                    <span class="cont4-span8">
                        <p>杂费</p>
                        <input type="text">
                    </span> -->
                </div>
                <div class="content5">
                    <span class="cont5-span1" :style="{width:documents.width}">
                        <p>{{documents.ff}}</p>
                        <input type="text">
                    </span>
                </div>  
                <div class="content6">
                    <span class="cont6-span1" :style="{width:signs.width}">
                        <p>{{signs.ee}}</p>
                        <input type="text" ></input>
                    </span>
                </div>
                
                <table class="content-table">
                  <tr>
                    <!-- <th v-for="(top,index) in tops" :key="index">{{top.title}}</th> -->
                    <th v-for="(item,index) in headerList.split(',')" :key="index">{{item}}</th>
                    <!-- <th>商品编号</th>
                    <th>商品名称及规格型号 </th>
                    <th>数量及单位</th>
                    <th>单价/总价/币制 </th>
                    <th>原产国（地区）</th>
                    <th>最终目的国（地区）</th>
                    <th>境内货源地 </th>
                    <th>征免</th> -->
                  </tr>
                  <tr v-for="(i,index) in tableDatas" :key="index">
                    <td>{{i.ItemNo}}</td>
                    <td>{{i.No}}</td>
                    <td class="classify">
                      <span>{{i.goods}}</span>
                      <span>{{i.size}}</span>
                    </td> 
                    <td class="classify">
                       <span>{{i.amount}}</span>
                      <span>{{i.unit}}</span>
                    </td>
                    <td>{{i.price}}</td>
                    <td>{{i.start}}</td>
                    <td>{{i.end}}</td>
                    <td>{{i.source}}</td>
                    <td>{{i.free}}</td>    
                  </tr>               
                   <!-- <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>    
                  </tr> -->
                </table>

                <div class="footerOne" >
                  <span v-for="(item,index) in confirm" :key="index" :style="{width:item.width}">{{item.hh}}</span>
                  <!-- <span>价格影响确认:</span>
                  <span>支付特许权使用费确认：</span>
                  <span>自报自缴：</span> -->
                </div>
                
                <div class="footerTwo">
                  <div class="footerLeft">
                    <span style="width:15%">{{information.person}}</span>
                    <span style="width:20%">{{information.personNO}}</span>
                    <span style="width:20%">{{information.tel}}</span>
                    <span style="width:45%">{{information.content}}</span>
                    <span style="width:60%">{{information.unit}}</span>
                    <span style="width:40%">{{information.signature}}</span>
                  </div>
                  <div class="footerRight">
                    <p>{{information.postil}}</p>
                  </div>
                </div>
           </div>
           <button @click="printContent" id="printBtn">dayin</button>
    </div>
    
</template>
<script>
export default {
  data() {
    return {
      datas: [{aa: "境内发货人",width: "35%"},{aa: "出关境别",width: "20%"},{ aa: "出口日期", width: "15%" },{aa: "申报日期",width: "15%" }, { aa: "备案号",width: "15%" }],
      recipient:[ { bb:'境外收货人', width: "35%"},{ bb:'运输方式', width: "20%"},{bb:'运输工具名称及航次号', width: "15%"}, {bb:'提运单号', width: "30%"}],
      sales:[{cc:'生产销售单位',width: "35%"},{cc:'监管方式',width: "20%"},{cc:'征免性质', width: "15%"},{cc:'许可证号',width: "30%"}],
      contracts:[{dd:'合同协议号',width: "35%"},{dd:'贸易国（地区）',width: "20%"},{dd:'运抵国（地区）',width: "15%"},{dd:'指运港',width: "15%"},{dd:'出境口岸',width: "15%"}],
      packs:[{ee:'包装种类',width: "35%"},{ee:'件数',width: "8%"},{ee:'毛重（千克）',width: "12%"},{ee:'净重（千克）',width: "15%"},{ee:'成交方式',width: "7.5%"},{ee:'运费',width: "7.5%"},{ee:'保费',width: "7.5%"},{ee:'杂费',width: "7.5%"}],
      documents:{ff:'随附单证及编号',width:'100%'},
      signs:{ee:'标记唛码及备注',width:'100%'},
      confirm:[{hh:'特殊关系确认',width:'25%'},{hh:'价格影响确认',width:'25%'},{hh:' 支付特许权使用费确认：',width:'25%'},{hh:'自报自缴：',width:'25%'},],
      information:{person: '报关人员',personNO:' 报关人员证号 ',tel:' 电话  ',content:'兹申明对以上内容承担如实申报、依法纳税之法律责任',unit:' 申报单位 ',signature:'申报单位（签章）',postil:'海关批注及签章'},
        // tops: [
        //         {
        //             title:'项号',
        //         },
        //          {
        //             title:'商品编号',
        //         },
        //          {
        //             title:'商品名称及规格型号',
        //         },
        //          {
        //             title:'数量及单位',
        //         },
        //          {
        //             title:'单价/总价/币制',
        //         },
        //          {
        //             title:'原产国（地区）',
        //         },
        //          {
        //             title:'最终目的国（地区）',
        //         },
        //           {
        //             title:'境内货源地',
        //         },

        //          {
        //             title:'征免',
        //         },
        // ],
        headerList: "项号,商品编号,商品名称及规格型号,数量及单位,单价/总价/币制,原产国（地区）,最终目的国（地区）,境内货源地,征免",
        tableDatas:[
          {ItemNo:'', No:'123',goods:'12',size:'111',amount:'112',unit:'1',price:'234',start:'1',end:'0',source:'1',free:'1'},
          {ItemNo:'', No:'',goods:'',size:'',amount:'',unit:'',price:'',start:'',end:'',source:'',free:''}
          ]
    }
  },
  methods: {
    // 打印
    printContent() {
      this.bindData();
      document.getElementById("printBtn").style.display = "none";
      let subOutputRankPrint = document.getElementById("exportBox");
      // console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      // window.location.reload();
      // document.body.innerHTML = oldContent;
      // return false;
    },
    bindData() {
      let subOutputRankPrint = document.getElementById("exportBox");
      var oInputs = subOutputRankPrint.getElementsByTagName("input");
      console.log(oInputs);
      for (var i = 0; i < oInputs.length; i++) {
        oInputs[i].setAttribute("value", oInputs[i].value);
      }
    }
  },
  mounted() {
    this.bindData();
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

#exportBox {
  width: 100%;
  height: 100%;
}
.ex-title {
  text-align: center;
  font-size: 16px;
  font-weight: bolder;
  line-height: 80px;
  margin: 0;
}
.table-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.table-left {
  width: 33%;
  float: left;
}
.table-left.title1 {
  padding-left: 8px;
  width: 35%;
}

input {
  border: none;
  outline: none;
}
.ex-input {
  width: 70%;
}
.content1 {
  width: 100%;
  border: 1px solid black;
  overflow: hidden;
}
.cont-span1 {
  width: 35%;
  border-right: 1px solid black;
}
.cont-span2 {
  width: 20%;
  border-right: 1px solid black;
}
.cont-span3,
.cont-span4,
.cont-span5 {
  width: 15%;
  border-right: 1px solid black;
}
span {
  float: left;
  height: 40px;
}
p {
  margin: 0;
}
input {
  width: 100%;
  border: none;
  outline: none;
}
.cont-span5 {
  border-right: none;
}

.content2 {
  width: 100%;
  border: 1px solid black;
  border-top: none;
  overflow: hidden;
}
.cont2-span1 {
  width: 35%;
  border-right: 1px solid black;
}
.cont2-span2 {
  width: 20%;
  border-right: 1px solid black;
}
.cont2-span3 {
  width: 15%;
  border-right: 1px solid black;
}
.cont2-span4 {
  width: 30%;
  border-right: 1px solid black;
}

.cont2-span4 {
  border-right: none;
}

.content3 {
  width: 100%;
  overflow: hidden;
  border: 1px solid black;
  border-top: none;
}
.cont3-span1 {
  width: 35%;
  border-right: 1px solid black;
}
.cont3-span2 {
  width: 20%;
  border-right: 1px solid black;
}
.cont3-span3,
.cont3-span4,
.cont3-span5 {
  width: 15%;
  border-right: 1px solid black;
}

.cont3-span5 {
  border-right: none;
}
.content4 {
  width: 100%;
  border: 1px solid black;
  overflow: hidden;
  border-top: none;
}
.cont4-span1 {
  width: 35%;
  border-right: 1px solid black;
}
.cont4-span2,
.cont4-span3 {
  width: 10%;
  border-right: 1px solid black;
}
.cont4-span4,
.cont4-span5 {
  width: 10%;
  border-right: 1px solid black;
}
.cont4-span6,
.cont4-span7,
.cont4-span8 {
  width: 8%;
  border-right: 1px solid black;
}

.cont4-span8 {
  border-right: none;
}

.content5 {
  width: 100%;
  border: 1px solid black;
  border-top: none;
  overflow: hidden;
}

.content6 {
  width: 100%;
  height: 60px;
  border: 1px solid black;
  border-top: none;
}
.cont6-span1 {
  width: 100%;
}
.cont6-span1 input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
.content-table {
  width: 100%;
  text-align: center;
  border: 1px solid black;
}

.content-table th {
  text-align: center;
}
.content-table tr {
  border: 1px dashed black;
  line-height: 40px;
}
.classify span {
  width: 100%;
  display: block;
  height: 30px;
}
.footerOne {
  width: 100%;
  height: 25px;
  border: 1px solid black;
  display: flex;
}
.footerOne span {
  width: 25%;
  height: 100%;
  padding-left: 30px;
}
.footerTwo {
  width: 100%;
  height: 90px;
  display: flex;
  border: 1px solid black;
}
.footerTwo .footerLeft {
  width: 75%;
  height: 100%;
  border-right: 1px solid black;
}
.footerTwo .footerLeft span {
  display: inline-block;
  padding-left: 10px;
  line-height: 40px;
}
.footerTwo .footerRight {
  width: 25%;
  height: 100%;
}
.footerTwo .footerRight p {
  padding-left: 15px;
}
.exlogo {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 0;
  top: 0;
}
.logoBox {
  width: 100%;
  position: relative;
  height: 80px;
}
</style>
<style media="print">
@page {
  size: auto A4 landscape;
  margin: 5mm 8mm;
}
</style>




