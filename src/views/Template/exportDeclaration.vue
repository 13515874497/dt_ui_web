<template>
    <div id="exportBox">
            <h2 class="ex-title">中华人民共和国海关出口货物报关单</h2>
            <div class="main">
                <div class="table-title">
                    <span class="title1">预录入编号：<input type="text" class="ex-input"></span>
                    <span class="title2">海关编号：<input type="text" class="ex-input2"></span>
                    <span class="title3">页码/页数：<input type="text" class="ex-input3"></span>
                </div>
                <div class="content1">
                    <span class="cont-span1">
                        <p class="Consignor">境内发货人</p>
                        <input type="text">
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
                <!-- <div class="content2">
                    <span class="cont2-span1">
                        <p>境内收货人</p>
                        <input type="text">
                    </span>
                       <span class="cont2-span2">
                        <p>运输方式</p>
                        <input type="text">
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
                        <textarea rows="" cols="" ></textarea>
                    </span>
                </div>   -->
           </div>
           <button @click="printContent">dayin</button>
    </div>
    
</template>





<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 打印
    printContent(e) {
      let subOutputRankPrint = document.getElementById("exportBox");
      // console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      // window.location.reload();
      // document.body.innerHTML = oldContent;
      // return false;
    }
  }
};
</script>

<style>
*{
padding:0;
margin:0;
}

#exportBox {
  width: 100%;
  height: 100%;
}
.ex-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bolder;
}
.table-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-title .title1{
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
}
.cont-span2 {
  width: 20%;
}
.cont-span3,
.cont-span4,
.cont-span5 {
  width: 15%;
}
span {
  float: left;
  height: 40px; 
}
.cont-span1,
{
border-right: 1px solid black;
}
p {
  width: 100%;
  margin: 0 0 3px;
}
input {
  width: 100%;
  border: none;
  outline: none;
}

span:nth-child(5) {
  border-right: none;
}

/* .content2 {
  width: 100%;
  border: 1px solid black;
  border-top: none;
  overflow: hidden;
}
.cont2-span1 {
  width: 35%;
}
.cont2-span2 {
  width: 20%;
}
.cont2-span3 {
  width: 15%;
}
.cont2-span4 {
  width: 30%;
}
span {
  float: left;
  height: 40x;
  border-right: 1px solid black;
}
p {
  width: 100%;
  margin: 0 0 3px;
}
input {
  width: 100%;
  border: none;
  outline: none;
}

span:nth-child(4) {
  border-right: none;
}

.content3 {
  width: 100%;
  border: 1px solid black;
  overflow: hidden;
  border-top: none;
}
.cont3-span1 {
  width: 35%;
}
.cont3-span2 {
  width: 20%;
}
.cont3-span3,
.cont3-span4,
.cont3-span5 {
  width: 15%;
}
span {
  float: left;
  height: 40x;
  border-right: 1px solid black;
}
p {
  width: 100%;
  margin: 0 0 3px;
}
input {
  width: 100%;
  border: none;
  outline: none;
}

span:nth-child(5) {
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
}
.cont4-span2,
.cont4-span3 {
  width: 10%;
}
.cont4-span4,
.cont4-span5 {
  width: 10%;
}
.cont4-span6,
.cont4-span7,
.cont4-span8 {
  width: 8%;
}
span {
  float: left;
  height: 40x;
  border-right: 1px solid black;
}
p {
  width: 100%;
  margin: 0 0 3px;
}
input {
  width: 100%;
  border: none;
  outline: none;
}

span:nth-child(8) {
  border-right: none;
}

.content5 {
  width: 100%;
  border: 1px solid black;
  border-top: none;
}
p {
  width: 100%;
  margin: 0 0 3px;
}
input {
  width: 100%;
  border: none;
  outline: none;
}

.content6 {
  width: 100%;
  height: 80px;
  border: 1px solid black;
  border-top: none;
}
p {
  width: 100%;
  margin: 0 0 3px;
}
textarea {
  resize: none;
  width: 100%;
  height: 55px;
  max-width: 100%;
  max-height: 55px;
  border: none;
  outline: none;
} */
</style>





