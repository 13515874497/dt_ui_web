import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/Index'  //首页
import Login from '../views/Login/Login'  //登录
import AccountManagement from '../views/AccountManagement/AccountManagement' //账号管理
import Menu from '../views/Menu/Menu'                                        //菜单
import RoleManagement from '../views/RoleManagement/RoleManagement'          //角色管理
import Company from '../views/Basic_Data/Public_Data/Company'                //公司
import Shop from '../views/Basic_Data/Public_Data/Shop' // 店铺
import Region from '../views/Basic_Data/Public_Data/Region' //区域
import Site from '../views/Basic_Data/Public_Data/Site' //站点
import Currency from '../views/Basic_Data/Public_Data/Currency'  //币别
import Upload from '../views/Upload/FinanceUploadFile'
import Clearance from '../views/Basic_Data/Basic_Logistics/Customs-clearance'
import Declaration from '../views/Basic_Data/Basic_Logistics/Customs-declaration'   
import EleContent from '../views/Basic_Data/Basic_Logistics/ele_content'  //要素内容
import Err from '../views/Err/Err'
import Freight from '../views/Freight/Freight'

import CprUpload from '../views/Upload/CprUploadFile'
import Business from '../views/Upload/BusinessUploadFile'//业务报告
import OarUpload from '../views/Upload/OarUploadFile'//OAR
import OrderUpload from '../views/Upload/OrderUploadFile'//订单报告
import Receive from '../views/Upload/ReceiveUploadFile'//接收库存
import Return from '../views/Upload/ReturnUploadFile'//退货报告
import StrUpload from '../views/Upload/StrUploadFile'//STR
import FBAUploadFile from '../views/Upload/FBAUploadFile'//FBA遗弃导入
import salesAmazonFbaMonthWarehousefee from '../views/Upload/salesAmazonFbaMonthWarehousefee'//月度仓储费
import salesAmazonFbaLongWarehousefee from '../views/Upload/salesAmazonFbaLongWarehousefee'//长期仓储费
import salesAmazonFbaHandlingfee from '../views/Upload/salesAmazonFbaHandlingfee'//订单处理费
import Terminal from '../views/Upload/TerminalUploadFile'//期末库存
import Category from '../views/Basic_Data/Public_Data/Category'//产品类目
import Exchange from '../views/Basic_Data/Public_Data/Exchange-rate'//汇率
import Measurement from '../views/Basic_Data/Public_Data/Measurement'//计量单位 
import OPI from '../views/Basic_Data/Public_Data/OPI'//产品信息
import HL from '../views/Upload/HlUploadFile'//HL
import Warehouse from '../views/Basic_Data/Public_Data/Warehouse'//仓库
import YyFinanceUploadFile from '../views/Upload/YyFinanceUploadFile'//运营财务导入
import OP_Sales_target from '../views/Operate/Amazon/Sales/Sales_target'//运营管理销售目标
import OP_Sales_plan from '../views/Operate/Amazon/Sales/Sales_plan'//运营管理销售计划
import OP_Monthly_cost from '../views/Operate/Amazon/Cost/Monthly_cost'//运营管理月度仓储费
import OP_Order_cost from '../views/Operate/Amazon/Cost/Order_cost'//运营管理订单处理费
import OP_Permanent_cost from '../views/Operate/Amazon/Cost/Permanent_cost'//运营管理长期仓储费
import OP_Business_Report from '../views/Operate/Amazon/Presentation/Business_Report'//运营管理业务报告
import OP_Return_Report from '../views/Operate/Amazon/Presentation/Return_Report'//运营管理退货报告
import OP_Settlement_Report from '../views/Operate/Amazon/Presentation/Settlement_Report'//运营管理结算报告
import OP_Transaction_Report from '../views/Operate/Amazon/Presentation/Transaction_Report'//运营管理交易报告
import OP_Ad_CPR from '../views/Operate/Amazon/Advertisement/Ad_CPR'//运营管理CPR
import OP_Ad_CPR_week from '../views/Operate/Amazon/Advertisement/Ad_CPR_week'//运营管理CPR周
import OP_Ad_HL from '../views/Operate/Amazon/Advertisement/Ad_HL'//运营管理HL
import OP_Ad_OAR from '../views/Operate/Amazon/Advertisement/Ad_OAR'//运营管理OAR
import OP_Ad_OAR_week from '../views/Operate/Amazon/Advertisement/Ad_OAR_week'//运营管理OAR周
import OP_Ad_STR from '../views/Operate/Amazon/Advertisement/Ad_STR'//运营管理STR
import OP_Receiving_stock from '../views/Operate/Amazon/Stock/Receiving_stock'//运营管理接收库存
import OP_Ending_stock from '../views/Operate/Amazon/Stock/Ending_stock'//运营管理期末库存
import OP_Shipment_not from '../views/Operate/Amazon/Stock/Shipment_not'//运营管理出货通知单
import sales_ship_notice_packing_list from '../views/Operate/Amazon/Stock/Shipment_not'//运营管理出货装箱单

import OP_Transfer_not from '../views/Operate/Amazon/Stock/Transfer_not'//运营管理移仓通知单
import OP_FBA_stock from '../views/Operate/Amazon/Stock/FBA_stock'//FBA遗弃
import OP_Feedback from '../views/Operate/Amazon/Other/Feedback'//Feedback
import OP_Review from '../views/Operate/Amazon/Other/Review'//Review
import OP_Closing from '../views/Operate/Ending/Closing_accounts'//期末关帐
import OP_Settle from '../views/Operate/Ending/Settle_accounts'//期末结账


//基础资料=>物流管理

import LOG_Status from '../views/Logistics/Logistics-tracking/Logistics_status'//物流状态
import LOG_Query from '../views/Logistics/Logistics-tracking/Logistics_query'//物流查询
import LOG_Record from '../views/Logistics/Logistics-tracking/Delivery_record'//物流发货记录
import LOG_Customs from '../views/Logistics/Export-management/Customs'//物流报关单
import LOG_Packing from '../views/Logistics/Export-management/Packing'//物流装箱单
import LOG_Invoice from '../views/Logistics/Export-management/Invoice'//发票
import LOG_Contract from '../views/Logistics/Export-management/contract'//外销合同
import Bas_Transport from '../views/Basic_Data/Basic_Logistics/Transport_nature'//物流性质
import Bas_Types from '../views/Basic_Data/Basic_Logistics/Types'//物流运输类型
import Bas_Err from '../views/Basic_Data/Basic_Logistics/Err'//物流异常类型
import Bas_Freight from '../views/Basic_Data/Basic_Logistics/Freight_company'//物流货运公司
import Price_Type from '../views/Basic_Data/Basic_Logistics/Price_Type'//物流计价方式
import Pricing_Range from '../views/Basic_Data/Basic_Logistics/Pricing_Range'//物流计价范围
import Freight_Level from '../views/Basic_Data/Basic_Logistics/Freight_Level'//物流运价等级


//基础资料=>出口管理
import Packing_Type from '../views/Basic_Data/Basic_Logistics/Packing_Type' //包装种类
import Exp_Declare from '../views/Basic_Data/Basic_Logistics/Export_management/Declare'//申报要素
import Exp_HS from '../views/Basic_Data/Basic_Logistics/Export_management/HS_Code'//HScode
import Monitoring_Condition from '../views/Basic_Data/Basic_Logistics/Monitoring_Condition' //监管方式
import Mode_Of_Transport from '../views/Basic_Data/Basic_Logistics/Mode_Of_Transport' //运输方式
import Exit_Customs from '../views/Basic_Data/Basic_Logistics/Exit_Customs' //出口关别
import Exp_Off from '../views/Basic_Data/Basic_Logistics/Export_management/Off_Shore_Company'//出口管理离岸公司
import way_of_closing from '../views/Basic_Data/Basic_Logistics/way_of_closing' //成交方式
import quarantine_type from '../views/Basic_Data/Basic_Logistics/quarantine_type' //检验检疫类别


import Purchase from '../views/Basic_Data/Basic_Purchase/Price'//采购价格
import Nation from '../views/Basic_Data/Basic_Personnel/Nation'//民族
import Ama_Describe from '../views/Basic_Data/Basic_Operate/Amazon/Describe'//亚马逊描述
import Ama_Order from '../views/Basic_Data/Basic_Operate/Amazon/Order_processing'//订单处理类
import Ama_Payment from '../views/Basic_Data/Basic_Operate/Amazon/Payment_type'//付款类型
import Ama_Type from '../views/Basic_Data/Basic_Operate/Amazon/Type'//亚马逊Type
import Ama_Warehouse from '../views/Basic_Data/Basic_Operate/Amazon/Ama_Warehouse'//亚马逊仓库
import Sup_Delivery from '../views/Basic_Data/Basic_Operate/Supplementary/Delivery'//辅助资料发货方式
import Sub_Platform from '../views/Basic_Data/Basic_Operate/Supplementary/Platform_type'//辅助资料平台类型
import User_config from '../views/Storage/User_config'//用户配置
import Library from '../views/Storage/Library'//库类型
import Table from '../views/Storage/Table'//表类型
import Data_Table from '../views/Storage/Data_Table'//数据表
import Data_View from '../views/Storage/Data_View'//数据视图
import Stored from '../views/Storage/Stored'//存储过程
import Table_field from '../views/Storage/Table_field'//表字段
import Landing_diary from '../views/Storage/Landing_diary'//登陆日志
import Operation_diary from '../views/Storage/Operation_diary'//操作日志
import Import_tem from '../views/Storage/Import_template'//导入模板
import Edition from '../views/System_setup/System_info/Edition'//版本信息
import Company_inf from '../views/System_setup/System_info/Company_inf'//公司信息
import Register from '../views/System_setup/System_info/Register'//注册信息
import Report_week from '../views/Storage/Business_Report_week'//业务报告周
import Brush_type from '../views/Storage/Brush_type'//刷单类型
import Department from '../views/Storage/Department'//部门
import Staff_member from '../views/Storage/Staff_member'//职员
import Education from '../views/Storage/Education'//学历
import Staff_type from '../views/Storage/Staff_type'//职员类型
import Employment_type from '../views/Storage/Employment_type'//雇佣类型
import Turnover_type from '../views/Storage/Turnover_type'//离职类型
import Regional from '../views/Storage/Regional'//地区市
import Province_table from '../views/Storage/Province_table'//省州关联表
import Menu_header from '../views/Storage/Menu_header'//菜单头部
import Tariff_rate from '../views/Storage/tariff_rate'//关税税率
import Additional_tariff from '../views/Storage/Additional_tariff'//附加税率
import SKU from '../views/Storage/SKU'//SUK信息表
import VAT from '../views/Storage/VAT'//VAT附加税


import Star_level from '../views/Storage/Star_level'//星级

import UserModifiesPwd from '../views/ModifiesPassword/UserModifiesPwd.vue'  //修改密码

import SettlementReport from '../views/Financial/SettlementReport.vue'  //财务管理

import UserFeedBack from '../views/UserFeed/UserFeedBack.vue'  //用户反馈

import Audit from '../views/Audit/Audit.vue'  //用户反馈

import Collection from '../views/CollectionIndex/CollectionIndex.vue'//收藏

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      meta: {
        showLogin: true
      },
      name:'Index',
      children: [
        {
          path: '/index/account_management/:id/:name',   //系统管理-> 用户管理->账号管理
          component: AccountManagement,
          name:'AccountManagement',
        },
        {
          path: '/index/role_management/:id/:name',  //系统管理-> 用户管理->角色管理
          component: RoleManagement,
          name:'RoleManagement',
        },
        {
          path: '/index/menu/:id/:name',  //系统管理-> 菜单管理-> 菜单管理
          component: Menu,
          name:'Menu',
        },
        {
          path: '/index/company/:id/:name',  //基础资料->公共资料->公司
          component: Company,
          name:'Company',
        },
        {
          path: '/index/shop/:id/:name',    //基础资料->公共资料->店铺
          component: Shop,
          name:'Shop',
        },
        {
          path: '/index/region/:id/:name',  //基础资料->公共资料->区域
          component: Region,
          name:'Region',
        },
        {
          path: '/index/site/:id/:name',  //基础资料->公共资料->站点
          component: Site,
          name:'Site',
        },
        {
          path: '/index/currency/:id/:name',  //基础资料->公共资料->币别
          component: Currency,
          name:'Currency',
        },
        {
          path: '/index/upload/:id/:name',   //数据导入->财务导入-> 亚马逊 -> 结算报告
          component: Upload,
          name:'FinanceUploadFile',
        },
        {
          path: '/index/customs_clearance/:id/:name', //基础资料—>出口管理->清关类型
          component: Clearance,
          name:'Customs-clearance',
        },
        {
          path:'/index/customs_declaration/:id/:name',//基础资料—>出口管理->报关类型
          component:Declaration,
          name:'Customs-declaration',
        },
        {
          path:'/index/ele_content/:id/:name',//基础资料—>出口管理->要素内容
          component:EleContent,
          name:'ele_content',
          
        },
        {
         path:'/index/err/:id/:name',    
         component:Err
        },
        {
          path:'/index/freight/:id/:name',
          component:Freight
        },
        {
          path:'/index/cpr_upload/:id/:name',  //运营导入-> 亚马逊 -> 广告-> cpr
          component:CprUpload,
          name:'CprUploadFile',
        },
        {
          path:'/index/business/:id/:name',      //运营导入-> 亚马逊 -> 报告-> 业务报告
          component:Business, 
          name:'BusinessUploadFile',
        },
        {
          path:'/index/oar_upload/:id/:name',   //运营导入-> 亚马逊 -> 广告-> oar
          component:OarUpload,
          name:'BusinessUploadFile',
        },
        {
          path:'/index/order_upload/:id/:name',   //运营导入-> 亚马逊 -> 报告-> 交易报告
          component:OrderUpload,
          name:'OarUploadFile',
          
        },
        {
          path:'/index/receive/:id/:name',   //运营导入-> 亚马逊 -> 库存-> 接收库存
          component:Receive, 
          name:'ReceiveUploadFile',
        },
        {
          path:'/index/return/:id/:name',  //运营导入-> 亚马逊 -> 报告-> 退货报告
          component:Return,
          name:'ReturnUploadFile',
        },
        {
          path:'/index/str_upload/:id/:name', //运营导入-> 亚马逊 -> 报告-> STR
          component:StrUpload, 
          name:'StrUploadFile',
          
        },
        {
          path:'/index/FBA_import/:id/:name',  //运营导入-> 亚马逊 -> 库存->fba遗弃
          component:FBAUploadFile,
          name:'FBAUploadFile', 
        },
        {
          path:'/index/sales_amazon_fba_month_warehousefee/:id/:name',   //数据导入->运营导入->亚马逊->费用->月度仓储费
          component:salesAmazonFbaMonthWarehousefee,
          name:'salesAmazonFbaMonthWarehousefee',          
        },
        {
          path:'/index/sales_amazon_fba_long_warehousefee/:id/:name', //数据导入->运营导入->亚马逊->费用->长期仓储费
          component:salesAmazonFbaLongWarehousefee,
          name:'salesAmazonFbaLongWarehousefee',
          
        },
        {
          path:'/index/sales_amazon_fba_handlingfee/:id/:name', //数据导入->运营导入->亚马逊->费用->订单处理费
          component:salesAmazonFbaHandlingfee,
          name:'salesAmazonFbaHandlingfee',
        },
        {
          path:'/index/terminal/:id/:name',//数据导入 -> 运营导入-> 期末库存
          component:Terminal, 
          name:'TerminalUploadFile',
          
        },
        {
          path:'/index/category_item/:id/:name',//基础资料->公共资料->产品类目
          component:Category,
          name:'Category',
        },
        {
          path:'/index/exchange/:id/:name',//基础资料->公共资料->汇率
          component:Exchange,
          name:' Exchange-rate',
         
        },
        {
          path:'/index/measurement/:id/:name',//基础资料-> 公共资料->计量单位
          component:Measurement,
          name:' Measurement',
          
        },
        {
          path:'/index/opi_item/:id/:name',// 基础资料-> 公共资料->产品信息
          component:OPI,
          name:'OPI',
        },
        {
          path:'/index/hl/:id/:name',//     //运营导入-> 亚马逊 -> 报告-> HL 
          component:HL,
          name:'HlUploadFile',
        },
        {
          path:'/index/warehouse/:id/:name',//基础资料-> 公共资料->仓库
          component:Warehouse,
          name:'Warehouse',
        },
        {
          path:'/index/yy_upload/:id/:name',  //运营导入-> 亚马逊 -> 报告-> 结算报告
          component:YyFinanceUploadFile,
          name:'YyFinanceUploadFile',
        },
        {
          path:'/index/op_sales_target/:id/:name',//绩效管理->销售指标——>销售目标
          component:OP_Sales_target,
          name:'Sales_target',
        },
        {
          path:'/index/op_sales_plan/:id/:name',//绩效管理->销售指标——>销售计划
          component:OP_Sales_plan,
          name:'Sales_plan',
        },
        {
          path:'/index/op_monthly_cost/:id/:name',//运营管理->亚马逊->费用->月度仓储费
          component:OP_Monthly_cost,
          name:'Monthly_cost',
        },
        {
          path:'/index/op_order_cost/:id/:name',//运营管理->亚马逊->费用-订单处理费
          component:OP_Order_cost,
          name:'Order_cost',
        },
        {
          path:'/index/op_permanent_cost/:id/:name',  //运营管理->亚马逊->费用->长期仓储费
          component:OP_Permanent_cost,
          name:'Permanent_cost',
          
        },
        {
          path:'/index/op_business_report/:id/:name',//运营管理->亚马逊->报告->业务报告
          component:OP_Business_Report,
          name:'Business_Report',
        },
        {
          path:'/index/op_settlement_report/:id/:name',//运营管理->亚马逊->报告->结算报告
          component:OP_Settlement_Report,
          name:'Settlement_Report',
        },
        {
         
          path:'/index/op_return_report/:id/:name',//运营管理->亚马逊->报告->退货报告
          component:OP_Return_Report,
          name:'Return_Report',
          
        },
        {
          path:'/index/op_transaction_report/:id/:name',//运营管理->亚马逊->报告->交易报告
          component:OP_Transaction_Report,
          name:'Transaction_Report',
          
        },
        {
          path:'/index/op_ad_cpr/:id/:name',//运营管理->亚马逊->广告->CPR
          component:OP_Ad_CPR,
          name:'Ad_CPR',
        },
        {
          path:'/index/op_ad_cpr_week/:id/:name',//运营管理->亚马逊->广告->CPR周
          component:OP_Ad_CPR_week,
          name:'Ad_CPR_week',
          
        },
        {
          path:'/index/op_ad_hl/:id/:name',//运营管理->亚马逊->广告->HL
          component:OP_Ad_HL,
          name:' Ad_HL',
        },
        {
          path:'/index/op_ad_oar/:id/:name',//运营管理->亚马逊->广告->OAR
          component:OP_Ad_OAR,
          name:' Ad_OAR',
         
        },
        {
          path:'/index/op_ad_oar_week/:id/:name',//运营管理->亚马逊->广告->OAR周
          component:OP_Ad_OAR_week,
          name:' Ad_OAR_wek',
        },
        {
          path:'/index/op_ad_str/:id/:name',//运营管理->亚马逊->广告->STR
          component:OP_Ad_STR,
          name:' Ad_STR',
        },
        {
          path:'/index/op_receiving_stock/:id/:name',//运营管理->亚马逊->库存->接收库存
          component:OP_Receiving_stock,
          name:' Receiving_stock',
          
        },
        {
          path:'/index/op_ending_stock/:id/:name',//运营管理->亚马逊->库存->期末库存
          component:OP_Ending_stock,
          name:' Ending_stock',
        },
        {
          path:'/index/op_shipment_not/:id/:name',//运营管理->亚马逊->通知单->出货通知单
          component:OP_Shipment_not,
          name:'Shipment_not',
        },
        {
          path:'/index/sales_ship_notice_packing_list/:id/:name',//运营管理->亚马逊->通知单->出货装箱单
          component:sales_ship_notice_packing_list,
        },


        {
          path:'/index/op_transfer_not/:id/:name', //运营管理->亚马逊->通知单->移仓通知单
          component:OP_Transfer_not,
          name:'Transfer_not',
        },
        {
          path:'/index/op_fba_stock/:id/:name',//运营管理->亚马逊->库存->FBA遗弃
          component:OP_FBA_stock,
          name:'FBA_stock',
          
        },
        {
          path:'/index/op_feedback/:id/:name',//运营管理->亚马逊->库存->Feedback
          component:OP_Feedback,
          name:'Feedback',
        },
        {
          path:'/index/op_review/:id/:name',//运营管理->亚马逊->库存->Review
          component:OP_Review,
          name:'Review',
          
        },
        {
          path:'/index/op_closing/:id/:name',//运营管理->期末处理->期末关帐
          component:OP_Closing,
          name:' Closing_accounts',
         
        },
        {
          path:'/index/op_settle/:id/:name',//运营管理->期末处理->期末结账
          component:OP_Settle,
          name:' Settle_accounts',
        },
        {
          path:'/index/log_status/:id/:name',// 物流管理-> 物流更踪->物流状态
          component:LOG_Status,
          name:' Logistics_status',
        },
        {
          path:'/index/log_query/:id/:name',//物流管理-> 物流更踪->物流查询
          component:LOG_Query,
          name:' Logistics_query',
        },
        {
          path:'/index/log_record/:id/:name',//物流管理-> 物流更踪->物流发货记录
          component:LOG_Record,
          name:' Delivery_record',
        },
        {
          path:'/index/log_customs/:id/:name',//出口管理->报关单
          component:LOG_Customs,
          name:'Customs',
          
        },
        {
          path:'/index/log_packing/:id/:name',//出口管理->装箱单
          component:LOG_Packing,
          name:'Packing',
        },
        {
          path:'/index/log_invoice/:id/:name',//出口管理->发票
          component:LOG_Invoice,
          name:'Invoice',
        },
        {
          path:'/index/log_contract/:id/:name',//出口管理->外销合同
          component:LOG_Contract,
          name:'contract',
        },
        {
          path:'/index/bas_transport/:id/:name',//基础资料->物流管理->运输性质
          component:Bas_Transport,
          name:'Transport_nature',
          
        },
        {
          path:'/index/bas_types/:id/:name',//基础资料->物流管理->运输类型
          component:Bas_Types,
          name:'Types',
        },
        {
          path:'/index/price_type/:id/:name',//基础资料->物流管理->物流计价方式
          component:Price_Type,
          name:'Price_Type',
        },
        {
          path:'/index/pricing_range/:id/:name',//基础资料->物流管理->物流计价范围
          component:Pricing_Range,
          name:'Pricing_Range',
          
        },
        {
          path:'/index/freight_level/:id/:name',//基础资料->物流管理->运价等级
          component:Freight_Level,
          name:' Freight_Level',
        },
        {
          path:'/index/bas_err/:id/:name',//基础资料->物流管理->异常类型
          component:Bas_Err,
          name:' Err',
         
        },
        {
          path:'/index/bas_freight/:id/:name',//基础资料->物流管理->货运公司
          component:Bas_Freight,
          name:' Freight_company',
        },
        {
          path:'/index/packing_type/:id/:name',//基础资料->出口管理->包装种类
          component:Packing_Type,
          name:' Packing_Type',
          
        },

        { name:'Declare',
          path:'/index/exp_declare/:id/:name',//出口管理->申报要素
          component:Exp_Declare,
        },
        {
          path:'/index/exp_hs/:id/:name',//基础资料->出口管理->HScode
          component:Exp_HS,
          name:' HS_Code',
          
        },
        {
          path:'/index/monitoring_condition/:id/:name',//基础资料->出口管理->监管方式
          component:Monitoring_Condition,
          name:' Monitoring_Condition',
          
        },
        {
          path:'/index/mode_of_transport/:id/:name',//基础资料->出口管理->运输方式
          component:Mode_Of_Transport,
          name:' Mode_Of_Transport',
          
        },
        {
          path:'/index/exit_customs/:id/:name',//基础资料->出口管理->出口关别
          component:Exit_Customs,
          name:' Exit_Customs',
          
        },
        {
          path:'/index/way_of_closing/:id/:name',//基础资料->出口管理->成交方式
          component:way_of_closing,
          name:' way_of_closing',
        },
        {
          path:'/index/quarantine_type/:id/:name',//基础资料->出口管理->检验检疫类别
          component:quarantine_type,
          name:'quarantine_type',
          
        },
        {
          path:'/index/exp_off/:id/:name',//基础资料->出口管理->离岸公司
          component:Exp_Off,
          name:'Off_Shore_Company',
          
        },
        {
          path:'/index/purchase/:id/:name',//基础资料-> 采购管理->采购价格管理
          component:Purchase,
          name:'Price',
          
        },
        {
          path:'/index/nation/:id/:name',//基础资料->人事管理->民族
          component:Nation,
          name:'Nation',
          
        },
        {
          path:'/index/ama_describe/:id/:name',//基础资料->运营管理-> 亚马逊->亚马逊描述
          component:Ama_Describe,
          name:'Describe',
          
        },
        {
          path:'/index/ama_order/:id/:name',//基础资料->运营管理-> 亚马逊->订单处理类
          component:Ama_Order,
          name:'Order_processing',
        },
        {
          path:'/index/ama_payment/:id/:name',//基础资料->运营管理-> 亚马逊->付款类型
          component:Ama_Payment,
          name:'Payment_type',
        },
        {
          path:'/index/ama_type/:id/:name',//基础资料->运营管理-> 亚马逊->亚马逊Type
          component:Ama_Type,
          name:'Type',
        },
        {
          path:'/index/ama_warehouse/:id/:name',//基础资料->运营管理-> 亚马逊->亚马逊仓库
          component:Ama_Warehouse,
          name:'Ama_Warehouse',
        },
        {
          path:'/index/sup_delivery/:id/:name',//基础资料->运营管理->辅助资料->发货方式
          component:Sup_Delivery,
          name:'Delivery',
        },
        {
          path:'/index/sub_platform/:id/:name',//基础资料->运营管理->辅助资料->平台类型
          component:Sub_Platform,
          name:'Platform_type',
        },
        {
          path:'/index/user_config/:id/:name',//系统管理->用户管理->用户配置
          component:User_config,
          name:'User_config',
          
        },
        {
          path:'/index/library/:id/:name',//系统管理->数据库->库类型
          component:Library,
          name:'Library',
          
        },
        {
          path:'/index/table/:id/:name',//系统管理->数据库->表类型
          component:Table,
          name:'Table',
        },
        {
          path:'/index/edition/:id/:name',//系统管理-> 系统信息->版本信息
          component:Edition,
          name:'Edition',
          
        },
        {
          path:'/index/company_inf/:id/:name',//系统管理-> 系统信息->公司信息
          component:Company_inf,
          name:'Company_inf',
        },
        {
          path:'/index/register/:id/:name',//系统管理-> 系统信息->注册信息
          component:Register,
          name:'Register',
        },
        {
          path:'/index/data_table/:id/:name',//系统管理->数据库->数据表
          component:Data_Table,
          name:'Data_Table',
          
        },
        {
          path:'/index/data_view/:id/:name',//系统管理->数据库->数据视图
          component:Data_View,
          name:'Data_View',
        },
        {
          path:'/index/stored/:id/:name',//系统管理->数据库->存储过程
          component:Stored,
          name:'Stored',
          
        },
        {
          path:'/index/table_field/:id/:name',//系统管理->数据库->表字段
          component:Table_field,
          name:'Table_field',         
        },
        {
          path:'/index/landing_diary/:id/:name',//系统管理->日志管理->登陆日志
          component:Landing_diary,
          name:'Landing_diary',  
        },
        {
          path:'/index/operation_diary/:id/:name',//系统管理->日志管理->操作日志
          component:Operation_diary,
          name:'Operation_diary',  
        },
        {
          path:'/index/import_tem/:id/:name',//系统管理->菜单管理->导入模板
          component:Import_tem,
          name:'Import_template', 
        },
        {
          path:'/index/report_week/:id/:name',////运营管理->亚马逊->报告->业务报告周
          component:Report_week,
          name:'Business_Report_week',

        },
        {
          path:'/index/brush_type/:id/:name',//基础资料->运营管理->辅助资料->刷单类型
          component:Brush_type,
          name:'Brush_type',
          
        },
        {
          path:'/index/department/:id/:name',//人事管理->基础档案->部门
          component:Department,
          name:'Department',
          
        },
        {
          path:'/index/staff_member/:id/:name',//人事管理->基础档案->职员
          component:Staff_member,
          name:'Staff_member',
        },
        {
          path:'/index/education/:id/:name',//基础资料->人事管理->学历
          component:Education,
          name:'Education',
          
        },
        {
          path:'/index/staff_type/:id/:name',//基础资料->人事管理->职员类型
          component:Staff_type,
          name:'Staff_type',
        },
        {
          path:'/index/employment_type/:id/:name',//基础资料->人事管理->雇佣类型
          component:Employment_type,
          name:'Employment_type',
        },
        {
          path:'/index/turnover_type/:id/:name',//基础资料->人事管理->离职类型
          component:Turnover_type,
          name:'Turnover_type',
          
        },
        {
          path:'/index/regional/:id/:name',//基础资料->公共资料-> 国家
          component:Regional,
          name:'Regional', 
        },
        {
          path:'/index/province_table/:id/:name',//基础资料->公共资料-> 省州关联表
          component:Province_table,
          name:'Province_table', 
          
        },
        {
          path:'/index/menu_header/:id/:name',//系统管理->菜单管理->菜单头部
          component:Menu_header,
          name:'Menu_header', 
          
        },
        {
          path:'/index/tariff_rate/:id/:name',//基础资料->公共资料->关税税率
          component:Tariff_rate,
          name:'tariff_rate',
 
        },
        {
          path:'/index/additional_tariff/:id/:name',//基础资料->公共资料->附加税率
          component:Additional_tariff
        },
        {
          path:'/index/sku/:id/:name',//基础资料->公共资料->SKU信息表
          component:SKU,
          name:'SKU',
        },
        {
          path:'/index/vat/:id/:name',//基础资料->公共资料->VAT附加税
          component:VAT,
          name:'VAT',
        },
        {
          path:'/index/star_level/:id/:name',//基础资料->运营管理->辅助资料->星级
          component:Star_level,
          name:'Star_level',
          
        },
        {
          path: '/index/financial_sales_amazon_balance/:id/:name',  //财务管理-> 销售报告-> 亚马逊-> 结算报告
          component: SettlementReport ,
          name:'SettlementReport',   
        }, 
        //
        {
          path: '/index/userfeedback',  //用户反馈
          component: UserFeedBack ,
          name:'UserFeedBack',   
        }, 
        {
          path: '/index/audit',  //用户反馈
          component: Audit,
          name:'Audit',   
        }, 
					{
				  path: '/index/collection_index/:id/:name',  //收藏
				  component: Collection,
				  name:'Collection',   
				}
      ],
			redirect:'/index/collection_index/336/收藏'
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/userModifiesPwd',
      component: UserModifiesPwd //用户修改密码
    },      
  ],

})





