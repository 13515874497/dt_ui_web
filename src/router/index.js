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
import OP_Ad_Hl from '../views/Operate/Amazon/Advertisement/Ad_HL'//运营管理HL
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
import Exp_Declare from '../views/Basic_Data/Basic_Logistics/Export_management/Declare'//出口管理申报要素
import Exp_HS from '../views/Basic_Data/Basic_Logistics/Export_management/HS_Code'//出口管理HS
import Exp_Off from '../views/Basic_Data/Basic_Logistics/Export_management/Off_Shore_Company'//出口管理离岸公司
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
import Star_level from '../views/Storage/Star_level'//星级
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
          path: '/index/accountManagement/:id/:name',
          component: AccountManagement
        },
        {
          path: '/index/roleManagement/:id/:name',
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
          path: '/index/Customs-clearance/:id/:name',
          component: Clearance
        },
        {
          path:'/index/Customs-declaration/:id/:name',
          component:Declaration
        },
        {
         path:'/index/Err/:id/:name',
         component:Err
        },
        {
          path:'/index/Freight/:id/:name',
          component:Freight
        },
        {
          path:'/index/cpr-upload/:id/:name',
          component:CprUpload
        },
        {
          path:'/index/Business/:id/:name',
          component:Business
        },
        {
          path:'/index/OarUpload/:id/:name',
          component:OarUpload
        },
        {
          path:'/index/OrderUpload/:id/:name',
          component:OrderUpload
        },
        {
          path:'/index/Receive/:id/:name',
          component:Receive
        },
        {
          path:'/index/Return/:id/:name',
          component:Return
        },
        {
          path:'/index/StrUpload/:id/:name',
          component:StrUpload
        },
        {
          path:'/index/Terminal/:id/:name',//期末库存
          component:Terminal
        },
        {
          path:'/index/CategoryItem/:id/:name',//产品类目
          component:Category
        },
        {
          path:'/index/Exchange/:id/:name',//汇率
          component:Exchange
        },
        {
          path:'/index/Measurement/:id/:name',//计量单位
          component:Measurement
        },
        {
          path:'/index/OpiItem/:id/:name',//OPI
          component:OPI
        },
        {
          path:'/index/HL/:id/:name',//HL
          component:HL
        },
        {
          path:'/index/Warehouse/:id/:name',//仓库
          component:Warehouse
        },
        {
          path:'/index/yy-upload/:id/:name',
          component:YyFinanceUploadFile
        },
        {
          path:'/index/OP_Sales_target/:id/:name',//运营管理销售目标
          component:OP_Sales_target
        },
        {
          path:'/index/OP_Sales_plan/:id/:name',//运营管理销售计划
          component:OP_Sales_plan
        },
        {
          path:'/index/OP_Monthly_cost/:id/:name',//运营管理月度仓储费
          component:OP_Monthly_cost
        },
        {
          path:'/index/OP_Order_cost/:id/:name',//运营管理订单处理费
          component:OP_Order_cost
        },
        {
          path:'/index/OP_Permanent_cost/:id/:name',//运营管理长期仓储费
          component:OP_Permanent_cost
        },
        {
          path:'/index/OP_Business_Report/:id/:name',//运营管理业务报告
          component:OP_Business_Report
        },
        {
          path:'/index/OP_Settlement_Report/:id/:name',//运营管理结算报告
          component:OP_Settlement_Report
        },
        {
          path:'/index/OP_Return_Report/:id/:name',//运营管理退货报告
          component:OP_Return_Report
        },
        {
          path:'/index/OP_Transaction_Report/:id/:name',//运营管理交易报告
          component:OP_Transaction_Report
        },
        {
          path:'/index/OP_Ad_CPR/:id/:name',//运营管理CPR
          component:OP_Ad_CPR
        },
        {
          path:'/index/OP_Ad_CPR_week/:id/:name',//运营管理CPR周
          component:OP_Ad_CPR_week
        },
        {
          path:'/index/OP_Ad_Hl/:id/:name',//运营管理HL
          component:OP_Ad_Hl
        },
        {
          path:'/index/OP_Ad_OAR/:id/:name',//运营管理OAR
          component:OP_Ad_OAR
        },
        {
          path:'/index/OP_Ad_OAR_week/:id/:name',//运营管理OAR周
          component:OP_Ad_OAR_week
        },
        {
          path:'/index/OP_Ad_STR/:id/:name',//运营管理STR
          component:OP_Ad_STR
        },
        {
          path:'/index/OP_Receiving_stock/:id/:name',//运营管理接收库存
          component:OP_Receiving_stock
        },
        {
          path:'/index/OP_Ending_stock/:id/:name',//运营管理期末库存
          component:OP_Ending_stock
        },
        {
          path:'/index/OP_Shipment_not/:id/:name',//运营管理出货通知单
          component:OP_Shipment_not
        },
        {
          path:'/index/OP_Transfer_not/:id/:name',//运营管理移仓通知单
          component:OP_Transfer_not
        },
        {
          path:'/index/OP_FBA_stock/:id/:name',//FBA遗弃
          component:OP_FBA_stock
        },
        {
          path:'/index/OP_Feedback/:id/:name',//Feedback
          component:OP_Feedback
        },
        {
          path:'/index/OP_Review/:id/:name',//Review
          component:OP_Review
        },
        {
          path:'/index/OP_Closing/:id/:name',//期末关帐
          component:OP_Closing
        },
        {
          path:'/index/OP_Settle/:id/:name',//期末结账
          component:OP_Settle
        },
        {
          path:'/index/LOG_Status/:id/:name',//物流状态
          component:LOG_Status
        },
        {
          path:'/index/LOG_Query/:id/:name',//物流查询
          component:LOG_Query
        },
        {
          path:'/index/LOG_Record/:id/:name',//物流发货记录
          component:LOG_Record
        },
        {
          path:'/index/LOG_Customs/:id/:name',//物流报关单
          component:LOG_Customs
        },
        {
          path:'/index/LOG_Packing/:id/:name',//物流装箱单
          component:LOG_Packing
        },
        {
          path:'/index/LOG_Invoice/:id/:name',//发票
          component:LOG_Invoice
        },
        {
          path:'/index/LOG_Contract/:id/:name',//外销合同
          component:LOG_Contract
        },
        {
          path:'/index/Bas_Transport/:id/:name',//物流性质
          component:Bas_Transport
        },
        {
          path:'/index/Bas_Types/:id/:name',//物流运输类型
          component:Bas_Types
        },
        {
          path:'/index/Bas_Err/:id/:name',//物流异常类型
          component:Bas_Err
        },
        {
          path:'/index/Bas_Freight/:id/:name',//物流货运公司
          component:Bas_Freight
        },
        {
          path:'/index/Exp_Declare/:id/:name',//出口管理申报要素
          component:Exp_Declare
        },
        {
          path:'/index/Exp_HS/:id/:name',//出口管理HS
          component:Exp_HS
        },
        {
          path:'/index/Exp_Off/:id/:name',//出口管理离岸公司
          component:Exp_Off
        },
        {
          path:'/index/Purchase/:id/:name',//采购价格
          component:Purchase
        },
        {
          path:'/index/Nation/:id/:name',//民族
          component:Nation
        },
        {
          path:'/index/Ama_Describe/:id/:name',//亚马逊描述
          component:Ama_Describe
        },
        {
          path:'/index/Ama_Order/:id/:name',//订单处理类
          component:Ama_Order
        },
        {
          path:'/index/Ama_Payment/:id/:name',//付款类型
          component:Ama_Payment
        },
        {
          path:'/index/Ama_Type/:id/:name',//亚马逊Type
          component:Ama_Type
        },
        {
          path:'/index/Ama_Warehouse/:id/:name',//亚马逊仓库
          component:Ama_Warehouse
        },
        {
          path:'/index/Sup_Delivery/:id/:name',//辅助资料发货方式
          component:Sup_Delivery
        },
        {
          path:'/index/Sub_Platform/:id/:name',//辅助资料平台类型
          component:Sub_Platform
        },
        {
          path:'/index/User_config/:id/:name',//用户配置
          component:User_config
        },
        {
          path:'/index/Library/:id/:name',//库类型
          component:Library
        },
        {
          path:'/index/Table/:id/:name',//表类型
          component:Table
        },
        {
          path:'/index/Edition/:id/:name',//版本信息
          component:Edition
        },
        {
          path:'/index/Company_inf/:id/:name',//公司信息
          component:Company_inf
        },
        {
          path:'/index/Register/:id/:name',//注册信息
          component:Register
        },
        {
          path:'/index/Data_Table/:id/:name',//数据表
          component:Data_Table
        },
        {
          path:'/index/Data_View/:id/:name',//数据视图
          component:Data_View
        },
        {
          path:'/index/Stored/:id/:name',//存储过程
          component:Stored
        },
        {
          path:'/index/Table_field/:id/:name',//表字段
          component:Table_field
        },
        {
          path:'/index/Landing_diary/:id/:name',//登陆日志
          component:Landing_diary
        },
        {
          path:'/index/Operation_diary/:id/:name',//操作日志
          component:Operation_diary
        },
        {
          path:'/index/Import_tem/:id/:name',//导入模板
          component:Import_tem
        },
        {
          path:'/index/Report_week/:id/:name',//业务报告周
          component:Report_week
        },
        {
          path:'/index/Brush_type/:id/:name',//刷单类型
          component:Brush_type
        },
        {
          path:'/index/Department/:id/:name',//部门
          component:Department
        },
        {
          path:'/index/Staff_member/:id/:name',//职员
          component:Staff_member
        },
        {
          path:'/index/Education/:id/:name',//学历
          component:Education
        },
        {
          path:'/index/Staff_type/:id/:name',//职员类型
          component:Staff_type
        },
        {
          path:'/index/Employment_type/:id/:name',//雇佣类型
          component:Employment_type
        },
        {
          path:'/index/Turnover_type/:id/:name',//离职类型
          component:Turnover_type
        },
        {
          path:'/index/Regional/:id/:name',//地区市
          component:Regional
        },
        {
          path:'/index/Province_table/:id/:name',//省州关联表
          component:Province_table
        },
        {
          path:'/index/Menu_header/:id/:name',//菜单头部
          component:Menu_header
        },
        {
          path:'/index/Tariff_rate/:id/:name',//关税税率
          component:Tariff_rate
        },
        {
          path:'/index/Additional_tariff/:id/:name',//附加税率
          component:Additional_tariff
        },
        {
          path:'/index/SKU/:id/:name',//SUK信息表
          component:SKU
        },
        {
          path:'/index/Star_level/:id/:name',//星级
          component:Star_level
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
    }
  ],

})





