<template>

    <el-form :model="upForm"  ref="upForm" label-width="180px" >
        <el-col :span="6" >
            <el-form-item label="报告日期:">
                <el-tag>{{upForm.report_date}}</el-tag>
            </el-form-item>
            <el-form-item label="店铺id:">
                <el-tag>{{upForm.store_id}}</el-tag>
            </el-form-item>
            <el-form-item label="站点id:">
                <el-tag>{{upForm.whither_id}}</el-tag>
            </el-form-item>
            <el-form-item label="结算号:">
                <el-tag>{{upForm.clear_id}}</el-tag>
            </el-form-item>
            <el-form-item label="付款类型id:">
                <el-tag>{{upForm.payment_id}}</el-tag>
            </el-form-item>
            <el-form-item label="类型:">
                <el-tag>{{upForm.type}}</el-tag>
            </el-form-item>
            <el-form-item label="订单号:">
                <el-tag>{{upForm.id}}</el-tag>
            </el-form-item>
            <el-form-item label="SKU:">
                <el-tag>{{upForm.SKU}}</el-tag>
            </el-form-item>
            <el-form-item label="SKUID:">
                <el-tag>{{upForm.SKU_ID}}</el-tag>
            </el-form-item>
            <el-form-item label="产品描述:">
                <el-tag>{{upForm.product}}</el-tag>
            </el-form-item>
            <el-form-item label="原始数量:">
                <el-tag>{{upForm.origin_count}}</el-tag>
            </el-form-item>
            <el-form-item label="发货数量:">
                <el-tag>{{upForm.deliver_count}}</el-tag>
            </el-form-item>
        </el-col>
        <el-col :span="6" >
            <el-form-item label="退货数量:">
                <el-tag>{{upForm.refundable_count}}</el-tag>
            </el-form-item>
            <el-form-item label="订单数量:">
                <el-tag>{{upForm.refundable_count}}</el-tag>
            </el-form-item>
            <el-form-item label="调整数量:">
                <el-tag>{{upForm.counts}}</el-tag>
            </el-form-item>
            <el-form-item label="市场:">
                <el-tag>{{upForm.market}}</el-tag>
            </el-form-item>
            <el-form-item label="运输:">
                <el-tag>{{upForm.transport}}</el-tag>
            </el-form-item>
            <el-form-item label="城市:">
                <el-tag>{{upForm.city}}</el-tag>
            </el-form-item>
            <el-form-item label="州:">
                <el-tag>{{upForm.state}}</el-tag>
            </el-form-item>
            <el-form-item label="邮编:">
                <el-tag>{{upForm.code}}</el-tag>
            </el-form-item>
            <el-form-item label="金额:">
                <el-tag>{{upForm.money}}</el-tag>
            </el-form-item>
            <el-form-item label="单价:">
                <el-tag>{{upForm.price}}</el-tag>
            </el-form-item>
            <el-form-item label="上期销售价:">
                <el-tag>{{upForm.last_sale}}</el-tag>
            </el-form-item>
            <el-form-item label="标准售价:">
                <el-tag>{{upForm.standard_sale}}</el-tag>
            </el-form-item>
        </el-col>
        <el-col :span="6" >
            <el-form-item label="新运费:">
                <el-tag>{{upForm.new_freight}}</el-tag>
            </el-form-item>
            <el-form-item label="运费:">
                <el-tag>{{upForm.freight}}</el-tag>
            </el-form-item>
            <el-form-item label="礼物卡:">
                <el-tag>{{upForm.gift_card}}</el-tag>
            </el-form-item>
            <el-form-item label="促销折扣:">
                <el-tag>{{upForm.discount}}</el-tag>
            </el-form-item>
            <el-form-item label="销售税:">
                <el-tag>{{upForm.sales_tax}}</el-tag>
            </el-form-item>
            <el-form-item label="市场服务税:">
                <el-tag>{{upForm.service_tax}}</el-tag>
            </el-form-item>
            <el-form-item label="销售费用:">
                <el-tag>{{upForm.sales}}</el-tag>
            </el-form-item>
            <el-form-item label="FBA费用:">
                <el-tag>{{upForm.FBA}}</el-tag>
            </el-form-item>
            <el-form-item label="其他交易费费用:">
                <el-tag>{{upForm.other_money}}</el-tag>
            </el-form-item>
            <el-form-item label="其他:">
                <el-tag>{{upForm.other}}</el-tag>
            </el-form-item>
            <el-form-item label="总计:">
                <el-tag>{{upForm.total}}</el-tag>
            </el-form-item>
            <el-form-item label="广告费:">
                <el-tag>{{upForm.advertising_fee}}</el-tag>
            </el-form-item>
        </el-col>
        <el-col :span="6" >
            <el-form-item label="转账:">
                <el-tag>{{upForm.transfer_accounts}}</el-tag>
            </el-form-item>
            <el-form-item label="新促销折扣:">
                <el-tag>{{upForm.new_discount}}</el-tag>
            </el-form-item>
            <el-form-item label="运费FBA:">
                <el-tag>{{upForm.freight_FBA}}</el-tag>
            </el-form-item>
            <el-form-item label="标准产品售价:">
                <el-tag>{{upForm.standard_sale2}}</el-tag>
            </el-form-item>
            <el-form-item label="原始标准售价:">
                <el-tag>{{upForm.origin_standard_sale}}</el-tag>
            </el-form-item>
            <el-form-item label="标准售价增加:">
                <el-tag>{{upForm.standard_sale_increase}}</el-tag>
            </el-form-item>
            <el-form-item label="标准售价降低:">
                <el-tag>{{upForm.standard_sale_reduce}}</el-tag>
            </el-form-item>
            <el-form-item label="标准FBA:">
                <el-tag>{{upForm.standard_FBA}}</el-tag>
            </el-form-item>
            <el-form-item label="标准FBA费:">
                <el-tag>{{upForm.standard_FBA_money}}</el-tag>
            </el-form-item>
            <el-form-item label="原始标准FBA费:">
                <el-tag>{{upForm.origin_standard_FBA}}</el-tag>
            </el-form-item>
            <el-form-item label="秒杀费:">
                <el-tag>{{upForm.spike_cost}}</el-tag>
            </el-form-item>
            <el-form-item label="FBA仓储费:">
                <el-tag>{{upForm.FBA_storage}}</el-tag>
            </el-form-item>
        </el-col>

    </el-form>
</template>

<script>
    export default {
        data() {
            return{
                upForm: {
                    report_date:'报告日期',
                    store_id:'店铺id',
                    whither_id:'站点id',
                    clear_id:'结算号',
                    payment_id:'付款类型id',
                    type:'类型',
                    id:'订单号',
                    SKU:'SKU',
                    SKU_ID:'SKUID',
                    product:'产品描述',
                    origin_count:'原始数量',
                    deliver_count:'发货数量',
                    refundable_count:'退货数量',
                    id_counts:'订单数量',
                    counts:'调整数量',
                    market:'市场',
                    transport:'运输',
                    city:'城市',
                    state:'州',
                    code:'邮编',
                    money:'金额',
                    price:'单价',
                    last_sale:'上期销售价',
                    standard_sale:'标准售价',
                    new_freight:'新运费',
                    freight:'运费',
                    gift_card:'礼物卡',
                    discount:'促销折扣',
                    sales_tax:'销售税',
                    service_tax:'市场服务税',
                    sales:'销售费用',
                    FBA:'FBA费用',
                    other_money:'其他交易费费用',
                    other:'其他',
                    total:'总计',
                    advertising_fee:'广告费',
                    transfer_accounts:'转账',
                    new_discount:'新促销折扣',
                    freight_FBA:'运费FBA',
                    standard_sale2:'标准产品售价',
                    origin_standard_sale:'原始标准售价',
                    standard_sale_increase:'标准售价增加',
                    standard_sale_reduce:'标准售价降低',
                    standard_FBA:'标准FBA',
                    standard_FBA_money:'标准FBA费',
                    origin_standard_FBA:'原始标准FBA费',
                    spike_cost:'秒杀费',
                    FBA_storage:'FBA仓储费',
                }
            }
        }
    }
</script>

<style lang="scss">
    .font_red{
        .el-form-item__label{
            color: red;
        }
    }
</style>
