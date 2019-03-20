<template>
    <div id="salesBox">
        <h1 class="salesTitle">温州电兔电子商务有限公司</h1>
        <h1 class="translation">
          GLOBEGOU WZ CO.,LTD </h1>
        <h3 class="salesTitle"> 售货确认书 </h3>
        <h3 class="translation">SALE CONFIRMATION</h3>
        <div class="salesInformation">
            <div class="salesLeft">
                <div class="salesBuyer">买方</div>
                <div class="buyersNames">
                   <span> BUYERS：</span>
                   <span>GLOBEGOU USA CO.,LTD</span>
                   <span>245 EAST MAIN STREET, SUITE 115, ALHAMBRA  CA 91801 </span>
                </div>
            </div>
            <div class="salesRight">
               <div>合同号码</div> 
               <div class="salesContract">
                   <span>CONTACT NO.:</span>
                   <span style="border-bottom:1px solid black ">GL18AM181US</span>
               </div>
               <div >日期</div>
               <div class="salesContract">
                   <span>DATE：</span>
                   <span style="border-bottom:1px solid black ">Sep.28,2019</span>
               </div>
               <div>签约地点</div>
               <div class="salesContract">
                   <span>SIGNED AT：</span>
                   <span style="border-bottom:1px solid black">WENZHOU</span>
               </div>
            </div>
        </div>
        <div>经买卖双方确认根据下列条款订立本合同：</div>
        <div>THIS CONTRACT IS MADE OUT BY THE SELLERS AND BUYERS AS PER THE FOLLOWING TERMS AND CONDITIONS MUTUILLY CONFIRMED:</div>
        <table class="salesTable">
            <tr>
                <th class="salesTh">
                    <span>货 物 名 称 及 规 格</span>
                    <span>NAME OF COMMODITY AND SPECIFICATION</span>
                </th>
                <th class="salesTh">
                <span>数   量</span>
                <span>QUANTITY</span>  
                </th>
                <th class="salesTh">
                <span>单   价</span>
                <span>UNIT PRICE</span> 
                </th>
                <th class="salesTh">
                <span>金   额</span>
                <span>AMOUNT</span>  
                </th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>DDP</td>
                <td></td>
            </tr>
            <tr>
                <td>DOG HARNESS</td>
                <td>4895</td>
                <td class="Salesusd">
                    <span >usd</span>
                    <span>7.642</span>
                </td>
                <td class="Salesusd">
                    <span>usd</span>
                    <span>37406</span>
                </td>
            </tr>
        </table>
        <div class="salesTotal">
            总    值
        </div>
        <div class="salesTotalAmount">
            <span>TOTAL AMOUNT:</span>
            <span style="border-bottom:1px solid black">usd37406</span>
        </div>
        <div>
            4)数量及总值允许有         %的增减。
        </div>
        <div>
             THE ABOVE GOODS MAY BE ALLOWED WITH         %MORE OR LESS BOTH IN AMOUNT AND QUANTITY ALLOWED
        </div>
        <div class="salesPacking">
            <span>5)包装:出口标准纸箱</span>
            <span>6)装船唛头</span>
        </div>
        <div class="salesPacking"> 
            <span> PACKING:EXPORT CARTON</span>
            <span> SHIPPING MARKS</span>
        </div>
        <div class="salesPacking"> 
            <span> 7)装运期</span>
            <span>   由买方决定</span>
        </div>
        <div class="salesPacking"> 
            <span> TIME OF SHIPMENT: ON OR BEFORE: </span>
            <span>AT THE BUYERS OPTION</span>
        </div>
        <div class="salesPacking"> 
            <span> 8)装运口岸和目的地:</span>
            <span> 至 </span>
        </div>
        <div class="salesPacking"> 
            <span>    DESTINATION :  </span>
            <span> FROM WENZHOU TO   </span>
        </div>
        <div>
            9) 付款 
        </div>
        <div > 
              PAYMENT:T/T
        </div>
        <div>
            A.信用证：买方需在出货前一个月通过中国银行开具不可撤销信用证，以卖方为受益人，单证在温州议付。
        </div>
        <div>
            B.托收：出货后卖方递交全套运输单证连同汇票，通过中国银行寄到买方指定代收行。
        </div>
        <div>
            C.电汇：买方需在收到运输单据前支付货款。
        </div>
        <div>
            A. Payment by L/C:One month before shipment,the buyers shall establish with bank of  China,WENZHOU irrevocable L/C 
             in favour of the sellers,to be available against presentation in Wenzhou of shipping documents.
        </div>
        <div>
            B.Payment by collection: After delivery is made,the sellers shall send through the Sellers' bank a draft drawn on the 
            buyers together with the shipping document to buyers through the Buyers' bank,the Bank of China,Wenzhou for collection.   
        </div>
        <div>
            C.Payment by M/T:Payment to be effected by the Buyers not later than days after receipt of the shipping documents.
        </div>
        <div>
            10）保险由   按发票全部金额110%投保至          为止的    险。按中国海洋运输保险条款办理
        </div>
        <div>
            Insruance To Be Effected by Buyer  for  110% of full invoice covering    Up   to   only，Subject to C.I.C
        </div>
        <div>
             (11)特殊条款
        </div>
        <div>
              OTHER
        </div>
        <div class="salesSure"> 
            <span>  买方确认 </span>
            <span> 温州电兔电子商务有限公司 </span>
        </div>
        <div class="salesSure"> 
            <span>  Confirmed by the Buyer </span>
            <span>  GLOBEGOU WZ CO.,LTD  </span>
        </div>
         <button @click="printContent" id="printBtn">dayin</button>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 打印
    printContent() {
      this.bindData()
       document.getElementById('printBtn').style.display="none";
      let subOutputRankPrint = document.getElementById("salesBox");
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
       let subOutputRankPrint = document.getElementById("salesBox");
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
<style>
.salesContract{
  width:80%;
  display: flex;
}
.salesContract span{
  width:40%;
}
.salesTitle {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 0;
}
.translation {
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 0;
}
.salesInformation {
  width: 100%;
  /* height:150px; */
  /* border: 1px solid black; */
  display: flex;
  margin-bottom: 5px;
  margin-top: 0;
}
.salesLeft {
  width: 50%;
}
.salesRight {
  width: 50%;
  /* border: 1px solid pink; */
  padding-left:20px;
}
.salesTable {
  width: 100%;
  height: 150px;
  border: 1px solid black;
}
.salesTable .salesTh {
  height: 20px;
  border: 1px solid black;
  text-align: center;
}
.salesTable .salesTh span {
  display: block;
}
.salesTable td {
  /* height:20px; */
  text-align: center;
  border-right: 1px solid black;
}
.Salesusd {
  overflow: hidden;
}
.Salesusd span {
  float: left;
  width: 50%;
}
.salesTotal {
  width: 80%;
  text-align: right;
}
.salesTotalAmount {
  width: 90%;
  text-align: right;
}
.salesPacking {
  width: 100%;
  display: flex;
}
.salesPacking span {
  width: 50%;
}
.salesSure {
  width: 100%;
  padding: 0 30px;
  text-align: center;
  display: flex;
}
.salesSure span {
  width: 50%;
  font-size: 14px;
  font-weight: bold;
}
</style>
<style media="print">
@page {
  size: auto A4 landscape;
  margin: 5mm 8mm;
}
</style>

