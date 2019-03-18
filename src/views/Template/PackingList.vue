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
                    <input type="text" v-model="shijian">
                </div>
            </div>
        </div>
              <el-table
                :data="tableData6"
                border
                center
                :summary-method="getSummaries"
                show-summary
                style="width: 100%; margin-top: 20px;">
                <el-table-column
                  prop="NOS."
                  label="NOS."
                
                  >
                </el-table-column>
                <el-table-column
                  prop="SPECIFICATION"
                  label="SPECIFICATION"
                  
                  >
                </el-table-column>
                <el-table-column
                  prop="CARTON"
                  label="CARTON"
                  
                  >
                </el-table-column>
                <el-table-column
                  prop="QUANTITY"
                  label="QUANTITY"
                   
                  >
                </el-table-column>
                <el-table-column
                  prop="GR_WT"
                  label="GR.WT."
                  >
                </el-table-column>
                <el-table-column
                  prop="NET_WT"
                  label="NET.WT"
                  >
                </el-table-column>
                <el-table-column
                  prop="MEAS"
                  label="MEAS."
                
                  >
                </el-table-column>
              </el-table>

            <button @click="printContent" id="printBtn">dayin</button>
          
    </div>
</template>
<script>
export default {
  data() {
    return {
      shijian: "2019-01-01",
      tableData6: [
        {
          NOS: "",
          SPECIFICATION: "",
          CARTON: "",
          QUANTITY: "(PCS)",
          GR_WT: "  (KGS)",
          NET_WT: "(KGS)",
          MEAS: "(CBM)"
        },
        {
          NOS: "",
          SPECIFICATION: "DOG HARNESS",
          CARTON: "65",
          QUANTITY: "4895",
          GR_WT: "1406",
          NET_WT: "1341",
          MEAS: "5.71"
        },
        {
          NOS: "",
          SPECIFICATION: "DOG HARNESS",
          CARTON: "65",
          QUANTITY: "4895",
          GR_WT: "1406",
          NET_WT: "1341",
          MEAS: "5.71"
        }
      ]
    };
  },
  methods: {
    // 打印
    printContent() {
      document.getElementById("printBtn").style.display = "none";
      let subOutputRankPrint = document.getElementById("packBox");
      // console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    bindData() {
      let subOutputRankPrint = document.getElementById("packBox");
      var oInputs = subOutputRankPrint.getElementsByTagName("input");
      console.log(oInputs);
      for (var i = 0; i < oInputs.length; i++) {
        oInputs[i].setAttribute("value", oInputs[i].value);
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = " TOTAL:";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " ";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
  },
  mounted() {
    this.bindData()
  }
};
</script>
<style scoped>

#packBox {
  height: 100%;
  /* width: 210mm;
  margin: 0 auto;
  padding: 5mm 7mm; */
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
.titleDate .invoiceNum {
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
.tableLists {
  /* width: 100%; */
}
.tableLists th {
  text-align: center;
  line-height: 40px;
}
.tableLists td {
  text-align: center;
  line-height: 40px;
}
</style>
<style media="print">
@page {
  size: auto A4 landscape;
  margin: 5mm 8mm;
}
.el-table--border {
  border: 1px solid black;
}
.el-table--border th {
  text-align: center;
  border-right: 1px solid black;
}

.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid black;
}
.el-table--border td {
  border-right: 1px solid black;
  text-align: center;
}
.el-table__footer-wrapper td {
  border-top: 1px solid black;
}
.el-table__footer-wrapper tbody td,
.el-table__header-wrapper tbody td {
  background-color: #fff;
}
.el-main {
    width: 210mm;
    margin: 0 auto;   
}
</style>

