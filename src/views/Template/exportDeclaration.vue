<template>
    <div id="exportBox">
            <div class="logoBox">
            <img src="./img/logo.jpg" alt="" class="exlogo">
            <h2 class="ex-title">中华人民共和国海关出口货物报关单</h2>
            </div>
            <div class="main">
                <div class="table-title">
                    <span class="title1">预录入编号：<input type="text" class="ex-input" v-model="luru"></span>
                    <span class="title2">海关编号：<input  type="text" class="ex-input2" v-model="haiguan"></span>
                    <span class="title3">页码/页数：<input  type="text" class="ex-input3" v-model="yema"></span>
                </div>
                <div class="content1">
                    <span class="cont-span1">
                        <p class="Consignor">境内发货人</p>
                        <input type="text" v-model="diantu">
                    </span>
                       <span class="cont-span2">
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
                    </span>
                </div> 
                <div class="content2">
                    <span class="cont2-span1">
                        <p>境内收货人</p>
                        <input type="text" v-model="shouhuo">
                    </span>
                       <span class="cont2-span2">
                        <p>运输方式</p>
                        <input type="text" v-model="yunshu">
                    </span>
                       <span class="cont2-span3">
                        <p>运输工具名称及航次号</p>
                        <input type="text">
                    </span>
                       <span class="cont2-span4">
                        <p>提运单号</p>
                        <input type="text">
                    </span>
                </div> 
                 <div class="content2">
                    <span class="cont2-span1">
                        <p>生产销售单位</p>
                        <input type="text">
                    </span>
                       <span class="cont2-span2">
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
                    </span>
                </div> 
                 <div class="content3">
                    <span class="cont3-span1">
                        <p>合同协议号</p>
                        <input type="text">
                    </span>
                       <span class="cont3-span2">
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
                    </span>
                </div>
                <div class="content4">
                    <span class="cont4-span1">
                        <p>包装种类</p>
                        <input type="text">
                    </span>
                    <span class="cont4-span2">
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
                    </span>
                </div>
                <div class="content5">
                    <span class="cont5-span1">
                        <p>随附单证及编号</p>
                        <input type="text">
                    </span>
                </div>  
                <div class="content6">
                    <span class="cont6-span1">
                        <p>标记唛码及备注</p>
                        <input type="text" :value="wenben"></input>
                    </span>
                </div>
                
                <table class="content-table">
                  <tr>
                    <th>项号</th>
                    <th>商品编号</th>
                    <th>商品名称及规格型号 </th>
                    <th>数量及单位</th>
                    <th>单价/总价/币制 </th>
                    <th>原产国（地区）</th>
                    <th>最终目的国（地区）</th>
                    <th>境内货源地 </th>
                    <th>征免</th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>4201000090</td>
                    <td class="classify">
                      <span>DOG HARNESS</span>
                      <span>狗背带</span>
                    </td> 
                    <td class="classify">
                       <span>1</span>
                      <span>2</span>
                    </td>
                    <td>7.642/37406/美金</td>
                    <td>中国</td>
                    <td>美国</td>
                    <td>浙江</td>
                    <td></td>    
                  </tr>               
                   <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>1</td>
                    <td>2</td>
                    <td>1</td>
                    <td>2</td>
                    <td>1</td>
                    <td>2</td>
                    <td>1</td>    
                  </tr>
                </table>

                <div class="footerOne">
                  <span>特殊关系确认:</span>
                  <span>价格影响确认:</span>
                  <span>支付特许权使用费确认：</span>
                  <span>自报自缴：</span>
                </div>
                
                <div class="footerTwo">
                  <div class="footerLeft">
                    <span style="width:15%">报关人员</span>
                    <span style="width:20%">报关人员证号</span>
                    <span style="width:20%">电话</span>
                    <span style="width:45%">兹申明对以上内容承担如实申报、依法纳税之法律责任</span>
                    <span style="width:60%">申报单位</span>
                    <span style="width:40%">申报单位（签章）</span>
                  </div>
                  <div class="footerRight">
                    <p>海关批注及签章</p>
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
      luru:'123',
      haiguan:'234',
      yema:'456',
      diantu:"温州电兔电子商务有限公司",
      wenben:'这是个文本输入框',
      shouhuo:'GLOBEGOU USA CO.,LTD ',
      yunshu:'集装箱'
    };
  },
  methods: {
  
    // 打印
    printContent() {
       document.getElementById('printBtn').style.display="none";
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
    bindData(){
       let subOutputRankPrint = document.getElementById("exportBox");
       var oInputs = subOutputRankPrint.getElementsByTagName('input');
       console.log(oInputs);     
       for (var i=0;i<oInputs.length;i++){
          oInputs[i].setAttribute("value",oInputs[i].value)
       } ;  
    }

  },
  mounted(){
    this.bindData()
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
  line-height:80px;
  margin:0;
}
.table-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.table-title .title1 {
  padding-left: 8px;
  width: 45%;
  float: left;
}
.table-title .title2 {
  width: 35%;
  float: left;
}
.table-title .title3 {
  width: 20%;
  float: left;
}
input {
  border: none;
  outline: none;
}
.ex-input {
  width: 75%;
}
.ex-input2 {
  width: 75%;
}
.ex-input3 {
  width: 55%;
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
  width:100%;
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
.classify span{
  width:100%;
  display: block;
  height:30px;
}
.footerOne{
  width:100%;
  height:25px;
  border:1px solid black;
  display: flex;
}
.footerOne span{
 width:25%;
 height:100%;
 padding-left:30px;
}
.footerTwo{
  width:100%;
  height: 90px;
  display: flex;
 border: 1px solid black;
}
.footerTwo .footerLeft{
  width:75%;
  height: 100%;
  border-right: 1px solid black;
}
.footerTwo .footerLeft span{
  display: inline-block;
  padding-left:10px;
  line-height: 40px;
}
.footerTwo .footerRight{
  width:25%;
  height: 100%
}
.footerTwo .footerRight p{
  padding-left:15px;
}
.exlogo{
  width:60px;
  height:60px;
  position: absolute;
  left:0;
  top:0;
}
.logoBox{
  width:100%;
position: relative;
height:80px;

}
</style>
<style media="print">
@page {
  size: auto A4 landscape;
  margin: 5mm 8mm;
}
</style>




