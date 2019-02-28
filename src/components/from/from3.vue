<template>
    <el-tabs v-model="activeName" @tab-click="handleClick"class="Schedule">
        <el-tab-pane label="发货记录明细表" name="first" >
            <el-form :model="upForm"  ref="upForm" label-width="180px" >
                <el-col :span="6" >
                    <el-form-item label="下单日期:" class="font_red">
                        <el-tag type="danger">{{upForm.up_date1}}</el-tag>
                    </el-form-item>
                    <el-form-item label="出口报关类型:" class="font_red">
                        <el-tag type="danger">{{upForm.up_type1}}</el-tag>
                    </el-form-item>
                    <el-form-item label="PO号:" class="font_red">
                        <el-tag type="danger">{{upForm.up_PO}}</el-tag>
                    </el-form-item>
                    <el-form-item label="目的店铺:" class="font_red">
                        <el-tag type="danger">{{upForm.up_store1}}</el-tag>
                    </el-form-item>
                    <el-form-item label="发出体积:" class="font_red">
                        <el-tag type="danger">{{upForm.up_tg}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内运输联系人:">
                        <el-tag >{{upForm.up_contact1dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内保险金额(¥):">
                        <el-tag >{{upForm.up_safe1dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内其他费用1备注(¥):">
                        <el-tag >{{upForm.up_money1dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="报关单号:">
                        <el-tag >{{upForm.up_id1}}</el-tag>
                    </el-form-item>
                    <el-form-item label="海关申报总值:">
                        <el-tag >{{upForm.up_custom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际保险费用(¥):">
                        <el-tag >{{upForm.up_safe1int}}</el-tag>
                    </el-form-item>
                    <el-form-item label="VAT税:">
                        <el-tag >{{upForm.up_vat}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内其他费用3备注(¥):">
                        <el-tag >{{upForm.up_money3int}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际运费单价(元/kg):">
                        <el-tag >{{upForm.up_price1int}}</el-tag>
                    </el-form-item>

                </el-col>
                <el-col :span="6" >
                    <el-form-item label="出货日期:" >
                        <el-tag >{{upForm.up_date2}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国外清关类型:" class="font_red">
                        <el-tag type="danger">{{upForm.up_type2}}</el-tag>
                    </el-form-item>
                    <el-form-item label="货运类型:" class="font_red">
                        <el-tag type="danger">{{upForm.up_type3}}</el-tag>
                    </el-form-item>
                    <el-form-item label="目的站点:" class="font_red">
                        <el-tag type="danger">{{upForm.up_whither}}</el-tag>
                    </el-form-item>
                    <el-form-item label="发出重量(kg):" class="font_red">
                        <el-tag type="danger">{{upForm.up_kg}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内联系号码:" >
                        <el-tag >{{upForm.up_contact1dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内保险费用(¥):" >
                        <el-tag >{{upForm.up_safe1dom2}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内其他费用备注2(¥):" >
                        <el-tag >{{upForm.up_money2dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="报关成本总额:" >
                        <el-tag >{{upForm.up_cost1}}</el-tag>
                    </el-form-item>
                    <el-form-item label="清关总值:" >
                        <el-tag >{{upForm.up_cost2}}</el-tag>
                    </el-form-item>
                    <el-form-item label="报关费:" >
                        <el-tag >{{upForm.up_cost3}}</el-tag>
                    </el-form-item>
                    <el-form-item label="手续费:" >
                        <el-tag >{{upForm.up_cost4}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际运输费(¥):" >
                        <el-tag >{{upForm.up_transportation_int}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际运费单价(元/m³):" >
                        <el-tag >{{upForm.up_price1int2}}</el-tag>
                    </el-form-item>

                </el-col>
                <el-col :span="6" >
                    <el-form-item label="最迟到达日期:">
                        <el-tag>{{upForm.up_date3}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际运单号:" class="font_red">
                        <el-tag type="danger">{{upForm.up_id2}}</el-tag>
                    </el-form-item>
                    <el-form-item label="报关抬头"  class="font_red">
                        <el-tag type="danger">{{upForm.up_type4}}</el-tag>
                    </el-form-item>
                    <el-form-item label="发出总数:"  class="font_red">
                        <el-tag type="danger">{{upForm.up_count1}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内运输公司" >
                        <el-tag>{{upForm.up_company_dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内运单号:" >
                        <el-tag>{{upForm.up_id3}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内进仓费(¥):" >
                        <el-tag>{{upForm.up_money_get_dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内进监管仓日期:" >
                        <el-tag>{{upForm.up_date4}}</el-tag>
                    </el-form-item>
                    <el-form-item label="报关运费:" >
                        <el-tag>{{upForm.up_cost5}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际运输公司" class="font_red">
                        <el-tag type="danger">{{upForm.up_company_int}}</el-tag>
                    </el-form-item>
                    <el-form-item label="检测检验费:" >
                        <el-tag>{{upForm.up_cost6}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际其他费用1:" >
                        <el-tag>{{upForm.up_money1int}}</el-tag>
                    </el-form-item>
                    <el-form-item label="费用总计:" >
                        <el-tag>{{upForm.up_money_total}}</el-tag>
                    </el-form-item>
                    <el-form-item label="备注:" >
                        <el-tag>{{upForm.up_it}}</el-tag>
                    </el-form-item>
                </el-col>
                <el-col :span="6" >
                    <el-form-item label="合同号:">
                        <el-tag>{{upForm.up_id4}}</el-tag>
                    </el-form-item>
                    <el-form-item label="FBA号:" class="font_red">
                        <el-tag type="danger">{{upForm.up_id5}}</el-tag>
                    </el-form-item>
                    <el-form-item label="发货仓库">
                        <el-tag>{{upForm.up_origin}}</el-tag>
                    </el-form-item>
                    <el-form-item label="发出箱数:" class="font_red">
                        <el-tag type="danger">{{upForm.up_count2}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内运输车牌号:" >
                        <el-tag>{{upForm.up_plate_number}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内监管仓地址:" >
                        <el-tag>{{upForm.up_room_dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国内运输费用(¥):" >
                        <el-tag>{{upForm.up_transportation_dom}}</el-tag>
                    </el-form-item>
                    <el-form-item label="报关申报日期:" >
                        <el-tag>{{upForm.up_date5}}</el-tag>
                    </el-form-item>
                    <el-form-item label="报关保费:" >
                        <el-tag>{{upForm.up_cost7}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际保险金额:" >
                        <el-tag>{{upForm.up_safe1int2}}</el-tag>
                    </el-form-item>
                    <el-form-item label="关税:" >
                        <el-tag>{{upForm.up_tariff}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国际其他费用2:" >
                        <el-tag>{{upForm.up_money2int}}</el-tag>
                    </el-form-item>
                    <el-form-item label="FBA仓库代码:"  class="font_red">
                        <el-tag type="danger">{{upForm.up_FBA_room_id}}</el-tag>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">按钮1</el-button>
                        <el-button @click="">按钮2</el-button>
                    </el-form-item>
                </el-col>

            </el-form>
        </el-tab-pane>
        <el-tab-pane label="国内物流追踪信息表" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="国际物流追踪信息表" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="物流异常信息表" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>

</template>

<script>
    export default {
        data() {
            return{
                activeName: 'first',
                upForm: {
                    up_company_dom:'国内运输公司',//国内运输公司
                    up_company_int:'国际运输公司',//国际运输公司
                    up_money_get_dom:'国内进仓费',//国内进仓费
                    up_origin:'发货仓库',//发货仓库
                    up_room_dom:'国内监管仓地址',//国内监管仓地址
                    up_date1:'2018-11-30',//下单日期
                    up_date2:'2018-12-03',//出货日期
                    up_date3:'2018-12-20',//最迟收货日期
                    up_date4:'进监管仓日期',//进监管仓日期
                    up_date5:'报关申报日期',//报关申报日期
                    up_type1:'出口报关件',//出口报关类型
                    up_type2:'自有VAT申报',//国外清关类型
                    up_type3:'货运类型',//货运类型
                    up_type4:'报关抬头',//报关抬头
                    up_count1:'发出总数',//发出总数
                    up_count2:'发出箱数',//发出箱数
                    up_id1:'报关单号',//报关单号
                    up_id2:'国际运单号',//国际运单号
                    up_id3:'国内运单号',//国内运单号
                    up_id4:'CX18AM018UK',//合同号
                    up_id5:'FBA号',//FBA号
                    up_PO:'201811301617000252395',//PO号
                    up_FBA_room_id:'FBA仓库代码',//FBA仓库代码
                    up_plate_number:'运输车牌号',//运输车牌号
                    up_cost1:'报关成本总额',//报关成本总额
                    up_cost2:'清关总值',//清关总值
                    up_cost3:'报关费',//报关费
                    up_cost4:'手续费',//手续费
                    up_cost5:'报关运费',//报关运费
                    up_cost6:'检测检验费',//检测检验费
                    up_cost7:'报关保费费',//报关保费费
                    up_custom:'海关申报总值',//海关申报总值
                    up_store1:'电兔',//目的店铺
                    up_whither:'目的站点',//目的站点
                    up_tg:'1.03',//发出体积
                    up_kg:'发出重量',//发出重量
                    up_vat:'VAT税',//VAT税
                    up_money_total:'费用总计',//费用总计
                    up_contact1dom:'国内运输联系人',//国内运输联系人
                    up_safe1dom:'国内保险金额',//国内保险金额
                    up_safe1dom2:'国内保险费用',//国内保险费用
                    up_safe1int:'国际保险费用',//国际保险费用
                    up_safe1int2:'国际保险金额',//国际保险金额
                    up_money1dom:'国内其他费用备注',//国内其他费用备注
                    up_money2dom:'国内其他费用备注2',//国内其他费用备注2
                    up_money1int:'国际其他费用备注',//国际其他费用备注
                    up_money2int:'国际其他费用备注2',//国际其他费用备注2
                    up_money3int:'国际其他费用备注3',//国际其他费用备注3
                    up_price1int:'国际运费单价',//国际运费单价
                    up_price1int2:'国际运费单价',//国际运费单价
                    up_transportation_dom:'国内运输费用',//国内运输费用
                    up_transportation_int:'国际运输费用',//国际运输费用
                    up_tariff:'关税',//关税
                    up_it:'备注',//备注

                }
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
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
    .Schedule{
        .el-tabs__header{
            .el-tabs__nav-wrap{
                .el-tabs__nav-scroll{
                    background-color: #ADD5FF;
                    .el-tabs__nav.is-top{
                        .el-tabs__item.is-top{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
</style>
