<template>
    <div id="declarationBox">
        <h2 class="deTitle">申 报 要 素</h2>
        <div class="deContainer" v-for="(item,index) in deContainer" :key="index">
            <span>{{item.name}}</span>
            <span>{{item.value}}</span>
        </div>

        <button @click="printContent" id="printBtn">dayin</button>
    </div>
</template>
<script>
export default {
   data() {
    return {
       deContainer:[{name:'HSCODE',value:'4201000090'},{name:'1.品名：',value:'狗背带'},] 
    };
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
<style scoped>
#declarationBox{
  height: 100%;
  width: 210mm;
  margin: 0 auto;
  padding: 5mm 7mm;
}
 
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

