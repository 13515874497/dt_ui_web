<template>
    <div id="packBox">
        <h1 class="packTitle">温州电兔电子商务有限公司</h1>
        <h1 class="translation">
          GLOBEGOU WZ CO.,LTD </h1>
        <h3 class="address"> RM 209, BUILDING A, LANJIANG SOFTWARE PARK, LANJIANG ROAD, WENZHOU, ZHEJIANG, CHINA </h3>
        <h3 class="telphone">TEL:0577-89888016</h3>
        <h1 class="titleTop">PACKING LIST</h1>
        <div class="titleContent">
            <div class="titleContentLeft">
                <div class="left1">SHIPPING MARKS:</div>
                <div class="left2">
                    Amazon.com.kydc, LLC  
                        33333 LBJ FWY
                        Dallas, TX 75241-7203
                        US (FTW1)
                </div>
            </div>
             <div class="titleContentRight">
                <div class="titleNum">
                    <span>INV.NO.:</span>
                    <input type="text">
                </div>
                 <div class="titleDate">
                    <span class="invoiceNum">DATE:</span>
                    <input type="text">
                </div>
            </div>
        </div>
         <table border="1" class="tableLists">
                <tr>
                    <th>NOS.</th>
                    <th>SPECIFICATION</th>
                    <th>CARTON</th>
                    <th>QUANTITY</th>
                    <th>GR.WT.</th>
                    <th>NET.WT</th>
                    <th>MEAS.</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>(PCS)</td>
                    <td>(KGS)</td>
                    <td>(KGS)</td>
                    <td>(CBM)</td>
                </tr>
                 <tr>
                    <td></td>
                    <td>DOG HARNESS</td>
                    <td></td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                 <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>(PCS)</td>
                    <td>(KGS)</td>
                    <td>(KGS)</td>
                    <td>(CBM)</td>
                </tr>
                 <tr>
                    <td></td>
                    <td> TOTAL:</td>
                    <td></td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                </tr>
            </table>

            <button @click="printContent">dayin</button>
    </div>
</template>
<script>
export default {
    data(){
       return{} 
    },
    methods:{
         // 打印
    printContent(e) {
      let subOutputRankPrint = document.getElementById("packBox");
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
#packBox {
  width: 100%;
  height: 100%;
}
.packTitle,
.translation {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.address,
.telphone {
  text-align: center;
  font-size: 14px;
}
.titleTop {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.titleContent {
  width: 100%;
  /* height: 150px; */
  display: flex;
  margin-bottom: 30px;
}
.titleContentLeft {
  width: 50%;
}
.titleContentLeft .left1 {
  margin-bottom: 10px;
}
.titleContentRight {
  width: 50%;
}
.titleNum,
.titleDate {
  width: 100%;
  height: 50%;
  text-align: right;
}
.titleDate .invoiceNum{
  padding-right: 14px;
}
.titleNum input {
  width: 70%;
  border: none;
  outline: none;
}
.titleDate input {
  width: 70%;
  border: none;
  outline: none;
}
.tableLists{
    width:100%;
   
}
.tableLists th{
     text-align: center;
     line-height: 40px;
}
.tableLists td{
    text-align: center;
     line-height: 40px; 
}
</style>


