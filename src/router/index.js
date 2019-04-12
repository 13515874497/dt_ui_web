import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
import AccountManagement from '../views/AccountManagement/AccountManagement'
import Menu from '../views/Menu/Menu'
import RoleManagement from '../views/RoleManagement/RoleManagement'
import Company from '../views/Basic_Data/Public_Data/Company'
import Shop from '../views/Basic_Data/Public_Data/Shop'
import Region from '../views/Basic_Data/Public_Data/Region'
import Site from '../views/Basic_Data/Public_Data/Site'
import Currency from '../views/Basic_Data/Public_Data/Currency'
import Upload from '../views/Upload/FinanceUploadFile'
import Clearance from '../views/Basic_Data/Basic_Logistics/Customs-clearance'
import Declaration from '../views/Basic_Data/Basic_Logistics/Customs-declaration'
import EleContent from '../views/Basic_Data/Basic_Logistics/ele_content'
import Err from '../views/Err/Err'
import Freight from '../views/Freight/Freight'
import CprUpload from '../views/Upload/CprUploadFile'
import Business from '../views/Upload/BusinessUploadFile'//业务报告
import OarUpload from '../views/Upload/OarUploadFile'//OAR
import OrderUpload from '../views/Upload/OrderUploadFile'//订单报告
import Receive from '../views/Upload/ReceiveUploadFile'//接收库存
import Return from '../views/Upload/ReturnUploadFile'//退货报告
import StrUpload from '../views/Upload/StrUploadFile'//STR
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
import Tariff_rate from '../views/Storage/Tariff_rate'//关税税率
import Additional_tariff from '../views/Storage/Additional_tariff'//附加税率
import SKU from '../views/Storage/SKU'//SUK信息表
import VAT from '../views/Storage/VAT'//VAT信息表

import Star_level from '../views/Storage/Star_level'//星级

import UserModifiesPwd from '../views/ModifiesPassword/UserModifiesPwd.vue'  //修改密码

import SettlementReport from '../views/Financial/SettlementReport.vue'  //财务管理

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      meta: {
        showLogin: true
      },
      children: [
       
        {
          path: '/index/account_management/:id/:name',
          component: AccountManagement
        },
        {
          path: '/index/role_management/:id/:name',
          component: RoleManagement
        },
        {
          path: '/index/menu/:id/:name',
          component: Menu
        },
        {
          path: '/index/company/:id/:name',
          component: Company
        },
        {
          path: '/index/shop/:id/:name',
          component: Shop
        },
        {
          path: '/index/region/:id/:name',
          component: Region
        },
        {
          path: '/index/site/:id/:name',
          component: Site
        },
        {
          path: '/index/currency/:id/:name',
          component: Currency
        },
        {
          path: '/index/upload/:id/:name',
          component: Upload
        },
        {
          path: '/index/customs_clearance/:id/:name', //清关类型
          component: Clearance
        },
        {
          path:'/index/customs_declaration/:id/:name',//报关类型
          component:Declaration
        },
        {
          path:'/index/ele_content/:id/:name',//报关类型
          component:EleContent
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
          path:'/index/cpr_upload/:id/:name',
          component:CprUpload
        },
        {
          path:'/index/business/:id/:name',
          component:Business
        },
        {
          path:'/index/oar_upload/:id/:name',
          component:OarUpload
        },
        {
          path:'/index/order_upload/:id/:name',
          component:OrderUpload
        },
        {
          path:'/index/receive/:id/:name',
          component:Receive
        },
        {
          path:'/index/return/:id/:name',
          component:Return
        },
        {
          path:'/index/str_upload/:id/:name',
          component:StrUpload
        },
        {
          path:'/index/terminal/:id/:name',//期末库存
          component:Terminal
        },
        {
          path:'/index/category_item/:id/:name',//产品类目
          component:Category
        },
        {
          path:'/index/exchange/:id/:name',//汇率
          component:Exchange
        },
        {
          path:'/index/measurement/:id/:name',//计量单位
          component:Measurement
        },
        {
          path:'/index/opi_item/:id/:name',//OPI
          component:OPI
        },
        {
          path:'/index/hl/:id/:name',//HL
          component:HL
        },
        {
          path:'/index/warehouse/:id/:name',//仓库
          component:Warehouse
        },
        {
          path:'/index/yy_upload/:id/:name',
          component:YyFinanceUploadFile
        },
        {
          path:'/index/op_sales_target/:id/:name',//运营管理销售目标
          component:OP_Sales_target
        },
        {
          path:'/index/op_sales_plan/:id/:name',//运营管理销售计划
          component:OP_Sales_plan
        },
        {
          path:'/index/op_monthly_cost/:id/:name',//运营管理月度仓储费
          component:OP_Monthly_cost
        },
        {
          path:'/index/op_order_cost/:id/:name',//运营管理订单处理费
          component:OP_Order_cost
        },
        {
          path:'/index/op_permanent_cost/:id/:name',//运营管理长期仓储费
          component:OP_Permanent_cost
        },
        {
          path:'/index/op_business_report/:id/:name',//运营管理业务报告
          component:OP_Business_Report
        },
        {
          path:'/index/op_settlement_report/:id/:name',//运营管理结算报告
          component:OP_Settlement_Report
        },
        {
          path:'/index/op_return_report/:id/:name',//运营管理退货报告
          component:OP_Return_Report
        },
        {
          path:'/index/op_transaction_report/:id/:name',//运营管理交易报告
          component:OP_Transaction_Report
        },
        {
          path:'/index/op_ad_cpr/:id/:name',//运营管理CPR
          component:OP_Ad_CPR
        },
        {
          path:'/index/op_ad_cpr_week/:id/:name',//运营管理CPR周
          component:OP_Ad_CPR_week
        },
        {
          path:'/index/op_ad_hl/:id/:name',//运营管理HL
          component:OP_Ad_HL
        },
        {
          path:'/index/op_ad_oar/:id/:name',//运营管理OAR
          component:OP_Ad_OAR
        },
        {
          path:'/index/op_ad_oar_week/:id/:name',//运营管理OAR周
          component:OP_Ad_OAR_week
        },
        {
          path:'/index/op_ad_str/:id/:name',//运营管理STR
          component:OP_Ad_STR
        },
        {
          path:'/index/op_receiving_stock/:id/:name',//运营管理接收库存
          component:OP_Receiving_stock
        },
        {
          path:'/index/op_ending_stock/:id/:name',//运营管理期末库存
          component:OP_Ending_stock
        },
        {
          path:'/index/op_shipment_not/:id/:name',//运营管理出货通知单
          component:OP_Shipment_not
        },
        {
          path:'/index/op_transfer_not/:id/:name',//运营管理移仓通知单
          component:OP_Transfer_not
        },
        {
          path:'/index/op_fba_stock/:id/:name',//FBA遗弃
          component:OP_FBA_stock
        },
        {
          path:'/index/op_feedback/:id/:name',//Feedback
          component:OP_Feedback
        },
        {
          path:'/index/op_review/:id/:name',//Review
          component:OP_Review
        },
        {
          path:'/index/op_closing/:id/:name',//期末关帐
          component:OP_Closing
        },
        {
          path:'/index/op_settle/:id/:name',//期末结账
          component:OP_Settle
        },
        {
          path:'/index/log_status/:id/:name',//物流状态
          component:LOG_Status
        },
        {
          path:'/index/log_query/:id/:name',//物流查询
          component:LOG_Query
        },
        {
          path:'/index/log_record/:id/:name',//物流发货记录
          component:LOG_Record
        },
        {
          path:'/index/log_customs/:id/:name',//物流报关单
          component:LOG_Customs
        },
        {
          path:'/index/log_packing/:id/:name',//物流装箱单
          component:LOG_Packing
        },
        {
          path:'/index/log_invoice/:id/:name',//发票
          component:LOG_Invoice
        },
        {
          path:'/index/log_contract/:id/:name',//外销合同
          component:LOG_Contract
        },
        {
          path:'/index/bas_transport/:id/:name',//物流性质
          component:Bas_Transport
        },
        {
          path:'/index/bas_types/:id/:name',//物流运输类型
          component:Bas_Types
        },
        {
          path:'/index/price_type/:id/:name',//物流计价方式
          component:Price_Type
        },
        {
          path:'/index/pricing_range/:id/:name',//物流计价范围
          component:Pricing_Range
        },
        {
          path:'/index/freight_level/:id/:name',//运价等级
          component:Freight_Level
        },
        {
          path:'/index/bas_err/:id/:name',//物流异常类型
          component:Bas_Err
        },
        {
          path:'/index/bas_freight/:id/:name',//物流货运公司
          component:Bas_Freight
        },
        {
          path:'/index/packing_type/:id/:name',//物流货运公司
          component:Packing_Type
        },

        {
          path:'/index/exp_declare/:id/:name',//出口管理申报要素
          component:Exp_Declare
        },
        {
          path:'/index/exp_hs/:id/:name',//出口管理HS
          component:Exp_HS
        },
        {
          path:'/index/monitoring_condition/:id/:name',//监管方式
          component:Monitoring_Condition
        },
        {
          path:'/index/mode_of_transport/:id/:name',//运输方式
          component:Mode_Of_Transport
        },
        {
          path:'/index/exit_customs/:id/:name',//出口关别
          component:Exit_Customs
        },
        {
          path:'/index/way_of_closing/:id/:name',//出口关别
          component:way_of_closing
        },
        {
          path:'/index/quarantine_type/:id/:name',//出口关别
          component:quarantine_type
        },
        {
          path:'/index/exp_off/:id/:name',//出口管理离岸公司
          component:Exp_Off
        },
        {
          path:'/index/purchase/:id/:name',//采购价格
          component:Purchase
        },
        {
          path:'/index/nation/:id/:name',//民族
          component:Nation
        },
        {
          path:'/index/ama_describe/:id/:name',//亚马逊描述
          component:Ama_Describe
        },
        {
          path:'/index/ama_order/:id/:name',//订单处理类
          component:Ama_Order
        },
        {
          path:'/index/ama_payment/:id/:name',//付款类型
          component:Ama_Payment
        },
        {
          path:'/index/ama_type/:id/:name',//亚马逊Type
          component:Ama_Type
        },
        {
          path:'/index/ama_warehouse/:id/:name',//亚马逊仓库
          component:Ama_Warehouse
        },
        {
          path:'/index/sup_delivery/:id/:name',//辅助资料发货方式
          component:Sup_Delivery
        },
        {
          path:'/index/sub_platform/:id/:name',//辅助资料平台类型
          component:Sub_Platform
        },
        {
          path:'/index/user_config/:id/:name',//用户配置
          component:User_config
        },
        {
          path:'/index/library/:id/:name',//库类型
          component:Library
        },
        {
          path:'/index/table/:id/:name',//表类型
          component:Table
        },
        {
          path:'/index/edition/:id/:name',//版本信息
          component:Edition
        },
        {
          path:'/index/company_inf/:id/:name',//公司信息
          component:Company_inf
        },
        {
          path:'/index/register/:id/:name',//注册信息
          component:Register
        },
        {
          path:'/index/data_table/:id/:name',//数据表
          component:Data_Table
        },
        {
          path:'/index/data_view/:id/:name',//数据视图
          component:Data_View
        },
        {
          path:'/index/stored/:id/:name',//存储过程
          component:Stored
        },
        {
          path:'/index/table_field/:id/:name',//表字段
          component:Table_field
        },
        {
          path:'/index/landing_diary/:id/:name',//登陆日志
          component:Landing_diary
        },
        {
          path:'/index/operation_diary/:id/:name',//操作日志
          component:Operation_diary
        },
        {
          path:'/index/import_tem/:id/:name',//导入模板
          component:Import_tem
        },
        {
          path:'/index/report_week/:id/:name',//业务报告周
          component:Report_week
        },
        {
          path:'/index/brush_type/:id/:name',//刷单类型
          component:Brush_type
        },
        {
          path:'/index/department/:id/:name',//部门
          component:Department
        },
        {
          path:'/index/staff_member/:id/:name',//职员
          component:Staff_member
        },
        {
          path:'/index/education/:id/:name',//学历
          component:Education
        },
        {
          path:'/index/staff_type/:id/:name',//职员类型
          component:Staff_type
        },
        {
          path:'/index/employment_type/:id/:name',//雇佣类型
          component:Employment_type
        },
        {
          path:'/index/turnover_type/:id/:name',//离职类型
          component:Turnover_type
        },
        {
          path:'/index/regional/:id/:name',//地区市
          component:Regional
        },
        {
          path:'/index/province_table/:id/:name',//省州关联表
          component:Province_table
        },
        {
          path:'/index/menu_header/:id/:name',//菜单头部
          component:Menu_header
        },
        {
          path:'/index/tariff_rate/:id/:name',//关税税率
          component:Tariff_rate
        },
        {
          path:'/index/additional_tariff/:id/:name',//附加税率
          component:Additional_tariff
        },
        {
          path:'/index/sku/:id/:name',//SUK信息表
          component:SKU
        },
        {
          path:'/index/vat/:id/:name',//VAT附加税
          component:VAT
        },
        {
          path:'/index/star_level/:id/:name',//星级
          component:Star_level
        },
        {
          path: '/index/financial_sales_amazon_balance/:id/:name',
          component: SettlementReport     //结算报告
        }, 
      ]
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
      path: '/user_modifies_pwd',
      component: UserModifiesPwd //用户修改密码
    },  
     
  ],

})





