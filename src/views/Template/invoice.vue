<template>
    <div id="invoiceBox">
        <h1 class="packTitle">温州电兔电子商务有限公司</h1>
        <h1 class="translation">
          GLOBEGOU WZ CO.,LTD </h1>
        <h3 class="address"> RM 209, BUILDING A, LANJIANG SOFTWARE PARK, LANJIANG ROAD, WENZHOU, ZHEJIANG, CHINA </h3>
        <h1 class="titleTop">COMMERCIAL INVOICE</h1>
        <div class="invoiceContent">
            <div class="invoiceLeft">
                <div class="company">
                    <span class="companyTo">To:</span>
                    <input type="text" v-model="gongsi" class="companInput">
                    <textarea class="inputText"v-model="dizhi"> 
                    </textarea>
                </div>
               
            </div>
            <div class="invoiceRight">
               <div class="invoiceNum">
                    <span class="invoiceNumspan">INV.NO.:</span>
                    <input type="text" class="invoiceNuminput"v-model="hao">
                </div>
                 <div class="invoiceTitle">
                    <span class="invoiceNum">DATE:</span>
                    <input type="text" class="invoiceTitleinput" v-model="shijian">
                </div>
            </div>
        </div>
        <div class="einBox">
          <span class="einBoxspan">EIN No.:</span>
          <input type="text" class="einInput" v-model="bbb">
        </div>
        <div class="delAddress">
          <div class="delTitle">DELIVERY ADDRESS:</div>
          <div class="delText">
            <textarea v-model="texta">
            </textarea>
          </div>
        </div>
        <div class="tableBox">
          <div class="tableBox1">
            <div class="boxTitle1">MARKS:</div>
            <textarea class="boxText" v-model="boxText">
            </textarea>
          </div>
          <div class="tableBox2">
            <div class="boxTitle2">QUANTITIES AND DESCRIPTIONS </div>
            <div class="boxEmpty"></div>
            <div class="boxEmpty"></div>
            <div class="boxName">DOG HARNESS</div>
            <div class="boxContent1">
              <span>HS CODE</span>
              <span>4201000090</span>
            </div>
            <div class="boxContent1">
              <span>NAME:</span>
              <span>DOG HARNESS</span>
            </div>
            <div class="boxContent1">
              <span> Material:</span>
              <span>Polyester fiber</span>
            </div>
            <div class="boxContent1">
               <span>Function:</span>
              <span>HARNESS FOR SMALL ANIMAL</span>
            </div>
            <div class="boxContent1">
               <span> Model:</span>
              <span>DTCW006-L</span>
            </div>
            <div class="boxCompany">
              MANUFACTURER: GLOBEGOU WZ CO.,LTD
            </div>
            <div class="boxContentAddress">
              RM 209, BUILDING A, LANJIANG SOFTWARE PARK, LANJIANG ROAD, WENZHOU, ZHEJIANG, CHINA 
            </div>
          </div>
          <div class="tableBox3">
            <div class="boxTitle3"></div>
            <div class="boxTitlePrice">(PCS)</div>
            <div class="boxEmpty"></div>
            <div class="boxName">4895</div>
          </div>
          <div class="tableBox4">
            <div class="boxTitle4">UNIT PRICE</div>
            <div class="boxusd">(USD)</div>
            <div class="boxusd">DDP</div>
            <div class="boxName">7.642</div>
          </div>
          <div class="tableBox5">
            <div class="boxTitle5">AMOUNT</div>
             <div class="boxusd">(USD)</div>
             <div class="boxEmpty"></div>
             <div class="boxName">37406</div>
          </div>
        </div>
        <div class="tableFooter">
          <div class="tableFooter1"></div>
          <div class="tableFooter2">TTL</div>
          <div class="tableFooter3">4895</div>
          <div class="tableFooter4"></div>
          <div class="tableFooter5">37406</div>
        </div>
        <div class="invfooter">
          TOTAL VALUE SAY US FREIGHT<span>6489 </span>AND PREMIUM <span>41</span>ONLY
        </div>
         <button @click="printContent" id="printBtn">dayin</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gongsi:'GLOBEGOU WZ CO.,LTD  ',
      dizhi:' 245 EAST MAIN STREET, SUITE 115, ALHAMBRA  CA 91801 ',
      texta:"这是地址",
      hao:'123456',
      boxText:'zheshiyixiemark',
      bbb:'111',
      shijian:'2019-01-01'
    };
  },
  methods: {
    // 打印
    printContent() {
       document.getElementById('printBtn').style.display="none";
      let subOutputRankPrint = document.getElementById("invoiceBox");
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
       let subOutputRankPrint = document.getElementById("invoiceBox");
       let oInputs = subOutputRankPrint.getElementsByTagName('input');
       let otextarea = subOutputRankPrint.getElementsByTagName('textarea'); 
       console.log(oInputs); 
      console.log(otextarea);    

       for (var i=0;i<oInputs.length;i++){
          oInputs[i].setAttribute("value",oInputs[i].value)
        
       for (var i=0;i<otextarea.length;i++){
         otextarea[i].innerHTML = otextarea[i].value
       } ;  
    }
  }
  },
  mounted(){
    this.bindData()
  },
};
</script>
<style>
#invoiceBox {
  width: 100%;
  height: 100%;
}
.packTitle {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.translation {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.address {
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
}
.titleTop {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.invoiceContent {
  width: 100%;
  /* height: 170px; */
  display: flex;
  /* border:1px solid red; */
}

.invoiceContent .invoiceLeft {
  width: 50%;
}
.invoiceContent .invoiceRight {
  width: 50%;
  /* text-align: right; */
  padding-right: 20px;
}
.company {
  width: 100%;
  height: 120px;
  display: flex;
  position: relative;
}
.companInput{
  position: absolute;
  top:10px;
  left:20%;
  width:73%;
  border:none;
  outline:none;
}
.companyTo {
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  padding-left: 25px;
  width: 20%;
}
.inputText {
  height: 80px;
  max-height: 80px;
  width: 73%;
  resize: none;
  font-size: 14px;
  overflow: hidden;
  outline: none;
  border: none;
  text-align: left;
  position:absolute;
  left:20%;
  top:40px;
}
.einBox {
  width: 100%;
  height: 40px;
}
.einBoxspan {
  width: 10%;
  display: inline-block;
  /* padding-left: 25px; */
}
.einInput {
  width: 75%;
  height: 40px;
  outline: none;
  border: none;
}
.invoiceRight .invoiceNum {
  line-height: 40px;
}
.invoiceNum .invoiceNumspan {
  width: 20%;
  /* padding-left: 25px; */
  display: inline-block;
}
.invoiceNum .invoiceNuminput {
  width: 70%;
  outline: none;
  border: none;
}
.invoiceTitle {
  line-height: 40px;
}
.invoiceTitle .invoiceNum {
  width: 20%;
  display: inline-block;
}
.invoiceTitleinput {
  width: 75%;
  outline: none;
  border: none;
}
.delAddress {
  width: 100%;
}
.delAddress .delTitle {
  line-height: 30px;
  font-size: 14px;
}
.delAddress .delText {
  width: 100%;
  height: 130px;
}
.delAddress .delText textarea {
  width: 80%;
  height: 130px;
  resize: none;
  max-height: 120px;
  outline: none;
  border: none;
}
.tableBox {
  width: 100%;
  /* height: 300px; */
  /* border: 1px solid black; */
  display: flex;
}
.tableBox .tableBox1 {
  width: 15%;
  border: 1px solid black;
    border-right: none;
}
.tableBox .tableBox2 {
  width: 45%;
  border: 1px solid black;
  border-right: none;
}
.tableBox .tableBox3 {
  width: 10%;
  border: 1px solid black;
  border-left:none;
    border-right: none;
}
.tableBox .tableBox4 {
  width: 15%;
  border: 1px solid black;
    border-right: none;
}

.tableBox .tableBox5 {
  width: 15%;
  border: 1px solid black;
}
.boxTitle1 {
  border-bottom: 1px solid black;
    text-align: center;
}
.boxTitle2 {
  border-bottom: 1px solid black;
  text-align: center;
}
.boxTitle3 {
  border-bottom: 1px solid black;
  height:21px;
}
.boxTitle4 {
  border-bottom: 1px solid black;
}
.boxTitle5 {
  border-bottom: 1px solid black;
}
.tableBox .tableBox1 .boxText {
  width: 100%;
  height: 90%;
  resize: none;
  overflow: hidden;
  outline: none;
  border: none;
}
.boxEmpty {
  width: 100%;
  height: 20px;
}
.boxName {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}
.boxContent1
 {
  width: 100%;
  display: flex;
  font-size: 12px;
  /* border: 1px solid red; */
}
.boxContent1 span {
  display: inline-block;
  width: 50%;
  text-align: center;
  align-items: center;
}
.boxCompany{
  width:100%;
  height: 40px;
  line-height:40px;
  text-align: left;
  font-size:12px;
  font-weight: bold;
}
.boxContentAddress{
  width:100%;
  /* height:70px; */
  font-size:12px;
  font-weight: bold;  
}
.boxTitlePrice{
  text-align:center;
  line-height: 20px;
}
.boxTitle4{
  text-align: center;
}
.boxusd{
  width: 100%;
  height: 20px;
  text-align: center;
}
.boxTitle5{
height: 20px;
width: 100%;
text-align: center;
}
.tableFooter{
  width:100%;
  /* height:60px; */
  /* border:1px solid black; */
  display: flex;
  text-align: center;
}
.tableFooter .tableFooter1 {
  width: 15%;
  border: 1px solid black;
  border-right: none;
  border-top:none;
}
.tableFooter .tableFooter2 {
  width: 45%;
  border: 1px solid black;
  border-right: none;
  border-top:none;
}
.tableFooter .tableFooter3 {
  width: 10%;
  border: 1px solid black;
  border-left:none;
    border-right: none;
    border-top:none;
}
.tableFooter .tableFooter4 {
  width: 15%;
  border: 1px solid black;
  border-right: none;
  border-top:none;
}

.tableFooter .tableFooter5 {
  width: 15%;
  border: 1px solid black;
  border-top:none;
}
.invfooter{
  width:100%;
  border:1px solid black;
  border-top:none;
  text-align: center;
  font-size:14px;
  font-weight: bold;
}
</style>
<style media="print">
@page {
  size: auto A4 landscape;
  margin: 5mm 8mm;
}
</style>

