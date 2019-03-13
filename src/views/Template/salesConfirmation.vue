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
                   <span></span>
                </div>
            </div>
            <div class="salesRight">2</div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.salesTitle{
    width:100%;
    font-size:16px;
    font-weight: bold;
    text-align: center;
}
.translation{
    width:100%;
    font-size:14px;
    font-weight: bold;
    text-align: center; 
}
.salesInformation{
width:100%;
height:150px;
border:1px solid red;
display: flex;
}
.salesLeft{
    width:50%;
    
}
.salesRight{
    width:50%;
    border:1px solid pink;
}
</style>

