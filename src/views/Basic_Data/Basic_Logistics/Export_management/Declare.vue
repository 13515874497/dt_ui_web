<template>
    <div id="declarationBox">
        <h2 class="deTitle">申 报 要 素</h2>
        <div class="deContainer">
            <span>HS CODE:</span>
            <span>4201000090</span>
        </div>
        <div class="deContainer">
            <span>1.品名：</span>
            <span>狗背带</span>
        </div>
        <div class="deContainer">
            <span>2.材质：</span>
            <span>涤纶</span>
        </div>
        <div class="deContainer">
            <span>2.材质：</span>
            <span>涤纶</span>
        </div>
        <div class="deContainer">
            <span>3.是否为濒危野生动物材料制：</span>
            <span>否</span>
        </div>
        <div class="deContainer">
            <span>4.型号：</span>
            <span>DTCW006-L等</span>
        </div>
        <div class="deContainer">
            <span>5.用途：</span>
            <span>宠物用品</span>
        </div>
        <div class="deContainer">
            <span>6.品牌:</span>
            <span>Rabbitgoo</span>
        </div>
        <div class="deContainer">
            <span>6.品牌:</span>
            <span>Rabbitgoo</span>
        </div>
        <div class="deContainer">
            <span>7.出口享惠情况：</span>
            <span>出口货物在最终目的国（地区）不享受优惠关税</span>
        </div>
        <div class="deContainer">
            <span>8.品牌类型：</span>
            <span>境内自主品牌</span>
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
    printContent(e) {
      document.getElementById('printBtn').style.display="none";
      let subOutputRankPrint = document.getElementById("declarationBox");
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
}
</script>
<style>
.deTitle{
    width:100%;
    font-size:16px;
    font-weight: bold;
     text-align: center;
}
.deContainer{
    width:100%;  
    display: flex;
}
.deContainer span{
    width:50%;
    text-align: left;
}
</style>
<style media="print">
@page {
  size: auto A4 landscape;
  margin: 5mm 8mm;
}
</style>

