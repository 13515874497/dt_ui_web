/*
包含N个接口请求函数的模块
 */
import ajax from './ajax'
import {
  rejects
} from 'assert';

const BASE_URL = '/api/api/v1'
export const BASEURL = '/api/api/v1'

//用户修改密码
export const register = ({
  pwd
}) => ajax(BASE_URL + `/user/upPwd`, {
  pwd
}, 'POST')





//获取图标icon/getIconInfo 
export const icons = () => ajax(BASE_URL + `/icon/getIconInfo`, 'get')



//获取在线人数
export const getOnlineNumber = () => ajax('api/login/uCount')
// 获取用户登陆信息
export const repLoginUser = ({
  userName,
  pwd,
  rememberMe
}) => ajax(`api/login/ajaxLogin`, {
  userName,
  pwd,
  rememberMe
}, 'POST')
//获得所有用户信息
export const repGetUsers = () => ajax(BASE_URL + '/user/getUsers')


//用户信息列表分页查询
export const repUsers = (data) =>
  ajax(BASE_URL + `/user/show`, data, 'POST')



//字段排序
export const upHeadSort = ({
  mId,
  sort
}, successMsg) => ajax(BASE_URL + '/upHeadSort', {
  mId,
  sort
}, 'POST', ["修改排序成功"])

//通过menu_id查询table头信息
export const repHead = (menu_id) => {
  return new Promise((resolve, rejects) => {
    ajax(BASE_URL + '/head', {
      menu_id
    }).then((res) => {
      if (res.code == 200) {
        res.data.sort(function (a, b) {
          return a.index - b.index
        });
        resolve(res);
      }
    })

  });
}

//修改菜单
export const upMenu = ({
  menuId,
  mName,
  icon,
  url
}) => ajax(BASE_URL + '/menu/upMenu', {
  menuId,
  mName,
  icon,
  url
}, 'POST', ['修改菜单成功'])


// export const repHead = (menu_id) => ajax(BASE_URL + '/head', {menu_id})

//通过menuIds查询table头List集合
export const repGetHead = ({
  menuIds
}) => ajax(BASE_URL + '/getByHead', {
  menuIds
}, 'POST')

//查询所有表头信息
export const repGetHeadList = () => ajax(BASE_URL + '/getHeadsList');
//查询所有表头信息 然后service 层通过mid来区别对应的表头信息
export const repFindByHeads = (mId) => ajax(BASE_URL + '/findHeads', {
  mId
})

//访问index页面测试是否登陆
export const repIndex = () => ajax(BASE_URL + `/index`)
//登陆状态
export const getLoginStatus = () => ajax(BASE_URL + '/index/status')
//注销请求
export const repLogout = () => ajax(`api/login/logout`)

//查询哪些用户有哪些菜单
export const repMenu = (type) => ajax(BASE_URL + `/menu/show`, {
  type
})

//修改菜单表信息
export const repUpMenuInfo = ({
  newMenu,
  idsMenu
}) => ajax(BASE_URL + '/menu/up/menu', {
  newMenu,
  idsMenu
}, 'POST')
//校验菜单是否已更新接口
export const repCheckMenuToken = () => ajax(BASE_URL + `/menu/token/menu`)

//角色修改页面 包含删除菜单、修改菜单
export const repGetMenus = ({
  rid,
  menuIds,
}) => ajax(BASE_URL + '/rm/upMenus', {
  rid,
  menuIds,
}, 'POST',[true,true])

//通过角色id来获取菜单id
export const roleMenu = ({
  rid
}) => ajax(BASE_URL + '/menu/role/menu', {
  rid
})

//更新用户信息
export const repUpUserInfo = ({
  pwd,
  accountStatus,
  uid,
  pwdValidityPeriod,
  userExpirationDate,
  userName,
  checkedUpPwd,
  pwdAlways,
  uAlways,
  name,
  mobilePhone,
  version,
  remark
}) => ajax(BASE_URL + `/user/upUserInfo`, {
  pwd,
  accountStatus,
  uid,
  pwdValidityPeriod,
  userExpirationDate,
  userName,
  checkedUpPwd,
  pwdAlways,
  uAlways,
  name,
  mobilePhone,
  version,
  remark
}, 'POST')

// 查询一个角色下的所有用户跟 菜单
export const repGetRoles = ({
  currentPage,
  pageSize,
  rName,
  userName
}) => ajax(BASE_URL + '/role/getRoles', {
  currentPage,
  pageSize,
  rName,
  userName
}, 'POST')

//删除一个用户或者多个用户
export const repDelUserInfo = ({
  ids
}) => ajax(BASE_URL + '/user/delUserInfo', {
  ids
}, 'POST')
//恢复一个用户或者多个用户
export const repReUserInfo = ({
  ids
}) => ajax(BASE_URL + '/user/reUserInfo', {
  ids
}, 'POST')
//获得历史删除用户的信息
export const repDelHistoryUserInfo = ({
  currentPage,
  pageSize
}) => ajax(BASE_URL + '/user/getDelUser', {
  currentPage,
  pageSize
}, 'POST')


/**
 * 
 * 运营管理 => 亚马逊 => 广告
 */

//CPR分页 http://127.0.0.1:9001/api/v1/ad/getCprInfo post
export const getCprInfo = (data) => ajax(BASE_URL + '/ad/getCprInfo', data,'POST');


//运营管理 => 亚马逊 => str查询
export const getStr = (data) => ajax(BASE_URL + `/ad/getStrInfo`,data, 'POST')


//运营管理 => 亚马逊 =>OAR查询
//http://127.0.0.1:9001/api/v1/ad/getOarInfo
export const getOarInfo = (data) => ajax(BASE_URL + `/ad/getOarInfo`,data, 'POST')

//运营管理 => 亚马逊 =>OARWeek查询
//http://127.0.0.1:9001/api/v1/ad/getOarInfo
export const getOarInfoWeek = (data) => ajax(BASE_URL + `/ad/getOarInfo`,data, 'POST')


//运营管理 => 亚马逊 =>cprWeek查询
//http://127.0.0.1:9001/api/v1/ad/getOarInfo
export const getCprInfoWeek = (data) => ajax(BASE_URL + `/ad/getCprInfo`,data, 'POST')

//运营管理 => 亚马逊 =>HL查询
// http://127.0.0.1:9001/api/v1/ad/getHlInfo POST
export const getHlInfo = (data) => ajax(BASE_URL + `/ad/getHlInfo`,data, 'POST')



// 财务管理 => 结算报告
//http://127.0.0.1:9001/api/v1/fsb/getFsbInfo post

export const getFsbInfo = (data) => ajax(BASE_URL + `/fsb/getFsbInfo`,data, 'POST')


// 运营管理=> 亚马逊=>报告

// 业务报告 http://127.0.0.1:9001/api/v1/fba/getBusInfo

export const getBusInfo = (data) => ajax(BASE_URL + `/fba/getBusInfo`,data, 'POST')

// 交易报告 http://127.0.0.1:9001/api/v1/fba/getOrderRePortInfo   post
export const getOrderRePortInfo = (data) => ajax(BASE_URL + `/fba/getOrderRePortInfo`,data, 'POST')


//退货报告 http://127.0.0.1:9001/api/v1/fba/geRefundInfo post
export const geRefundInfo = (data) => ajax(BASE_URL + `/fba/geRefundInfo`,data, 'POST')


//结算报告 http://127.0.0.1:9001/api/v1/fsb/getFsbInfo post
export const getFinalInfo= (data) => ajax(BASE_URL + `/fsb/getFsbInfo`,data, 'POST')

// 业务报告(周) http://127.0.0.1:9001/api/v1/fba/getBusInfo

export const getBusInfoWeek = (data) => ajax(BASE_URL + `/fba/getBusInfo`,data, 'POST')

// 运营管理=> 亚马逊=>库存

// 接收库存 http://127.0.0.1:9001/api/v1/fba/getReceiveInfo  post
export const getReceiveInfo = (data) => ajax(BASE_URL + `/fba/getReceiveInfo`,data, 'POST')

//FBA遗弃 http://127.0.0.1:9002/api/v1/fba/getAbandonInfo post
export const getAbandonInfo = (data) => ajax(BASE_URL + `/fba/getAbandonInfo`,data, 'POST')

// 运营管理=> 亚马逊=>通知单

//出货通知单 http://127.0.0.1:9002/api/v1/fba/getNoticeInfo post
// export const getNoticeInfo = (data) => ajax(BASE_URL + `/fba/getNoticeInfo`,data, 'POST')

/**
 * 
 * 人事管理 => 基础档案
 */
//职员分页
export const findByListEmployee = (data) => ajax(BASE_URL + '/staff/findByListEmployee', data, 'POST');
//员工 tree http://127.0.0.1:9001/api/v1/staff/findByListDepartment  get  tree 部门
export const findByListDepartment = (data) => ajax(BASE_URL + '/staff/findByListDepartment', data);



/**
 * 
 * 基础资料 => 采购管理 => 采购价格
 */
//采购价格分页
export const findByListPrice = (data) => ajax(BASE_URL + '/price/findByListPrice', data, 'POST');








/**
 * 
 * 基础资料 => 出口管理
 */
//HS Code分页 
export const findHsCodeInfo = (data) => ajax(BASE_URL + '/code/findHsCodeInfo', data, 'POST');
//要素内容分页 
export const findElementInfo = (data) => ajax(BASE_URL + '/ele/findElementInfo', data, 'POST');
//报关类型分页 
export const findByListDeclareType = (data) => ajax(BASE_URL + '/declare/findByListDeclareType', data);
//清关类型分页 
export const findByListGrosscustoms = (data) => ajax(BASE_URL + '/gro/findByListGrosscustoms', data);
//包装种类分页
export const findByListPackingType = (data) => ajax(BASE_URL + '/packing/findByListPackingType', data);
//监管方式分页 
export const findMonitoringInfo = (data) => ajax(BASE_URL + '/condition/findMonitoringInfo', data, 'POST');
//运输方式分页 http://127.0.0.1:9001/api/v1/mode/findByListModeOfTransport?pageSize=10&currentPage=10 get
export const findByListModeOfTransport = (data) => ajax(BASE_URL + '/mode/findByListModeOfTransport', data);
//出口关别分页
export const findExitCustomsInfo = (data) => ajax(BASE_URL + '/customs/findExitCustomsInfo', data, 'POST');
//离岸公司分页 http://127.0.0.1:9001/api/v1/Offshore/findByListCompanyOffshore?pageSize=10&currentPage=100 离岸公司 get
export const findByListCompanyOffshore = (data) => ajax(BASE_URL + '/Offshore/findByListCompanyOffshore', data);


/**
 * 
 * 基础资料 => 运营管理 => 亚马逊
 */


//亚马逊描述分页 
export const findByListDescription = (data) => ajax(BASE_URL + '/description/findByListDescription', data, 'POST');
//付款类型分页  
export const findPayByListProperty = (data) => ajax(BASE_URL + '/pay/findByListProperty', data);
//订单处理类分页  
export const findByListHandling = (data) => ajax(BASE_URL + '/handling/findByListHandling', data, 'POST');


//亚马逊type(订单类型)分页
export const findByListAmazon = (data) => ajax(BASE_URL + '/type/findByListAmazon', data, 'POST');
//亚马逊仓库分页  
export const findByListWarehouse = (data) => ajax(BASE_URL + '/amazon/war/findByListWarehouse', data, 'POST');





/**
 * 
 * 基础资料 => 运营管理 => 辅助资料
 */

//发货方式分页   
export const findByListDelivery = (data) => ajax(BASE_URL + '/deli/findByListDelivery', data);

//星级分页   
export const findByListStarLevel = (data) => ajax(BASE_URL + '/star/findByListStarLevel', data);

//刷单类型分页
export const findByListBrush = (data) => ajax(BASE_URL + '/brush/findByListBrush', data);

//平台类型分页
export const findByListPlatform = (data) => ajax(BASE_URL + '/plat/findByListPlatform', data);





/**
 * 
 * 基础资料 => 物流管理
 */
//运输性质分页
export const findByListProperty = (data) => ajax(BASE_URL + '/property/findByListProperty', data);
//运输类型tree
export const findByListType = (data) => ajax(BASE_URL + '/type/findByListType', data);
//货运公司分页
export const findByListFreight = (data) => ajax(BASE_URL + '/freight/findByListFreight', data, 'POST');
//异常类型tree 
export const findByListAbnormal = (data) => ajax(BASE_URL + '/abnormal/findByListAbnormal', data);
//运价等级tree
export const findByListLevel = (data) => ajax(BASE_URL + '/level/findByListLevel', data);
//计价方式tree 
export const findByListValuationMethod = (data) => ajax(BASE_URL + '/valuation/findByListValuationMethod', data);
//计价范围分页
export const findByListRange = (data) => ajax(BASE_URL + '/range/findByListRange', data);
//检验检疫类别分页 http://127.0.0.1:9001/api/v1/inspection/findByListQuarantine?pageSize=10&currentPage=10 get
export const findByListQuarantine = (data) => ajax(BASE_URL + '/inspection/findByListQuarantine', data);
//成交方式分页 http://127.0.0.1:9001/api/v1/closing/findByListWayOfClosing?pageSize=10&currentPage=10 get
export const findByListWayOfClosing = (data) => ajax(BASE_URL + '/closing/findByListWayOfClosing', data);
/**
 * 
 * 基础资料 => 人事管理
 */
//学历分页  /staff/getEducation
export const getEducation = (data) => ajax(BASE_URL + '/staff/getEducation', data)
//职员类型(员工类型) 分页 /staff/getEmployee
export const getEmployee = (data) => ajax(BASE_URL + '/staff/getEmployee', data)
//雇佣类型分页  staff/getEmployment
export const getEmployment = (data) => ajax(BASE_URL + '/staff/getEmployment', data)
//离职类型分页 
export const getHrLeave = (data) => ajax(BASE_URL + '/staff/getHrLeave', data)
//民族分页 http://127.0.0.1:9001/api/v1/nation/findByListNationInfo?
export const findByListNationInfo = (data) => ajax(BASE_URL + '/nation/findByListNationInfo', data)

/**
 * 
 * 基础资料 => 公共资料
 */
//省州关联表分页 省州关联表 http://127.0.0.1:9001/api/v1/rel/findByListRelation post
export const findByListRelation = (data) => ajax(BASE_URL + '/rel/findByListRelation', data, 'POST');

//计量单位tree  http://127.0.0.1:9001/api/v1/unit/findByListUnit 计量单位  get  树形
export const findByListUnit = (data) => ajax(BASE_URL + '/unit/findByListUnit', data);

//SKU信息分页
export const findByListSku = (data) => ajax(BASE_URL + '/sku/findByListSku', data, 'POST');

//VAT附加税分页
export const findByListSur = (data) => ajax(BASE_URL + '/sur/findByListSur', data, 'POST');

//仓库tree
export const findByListWar = () => ajax(BASE_URL + '/war/findByListWar')
//产品类目tree
export const findByListProducts = () => ajax(BASE_URL + '/pro/findByListProducts')
//导入模板分页
export const getTemplate = (data) => ajax(BASE_URL + '/ctx/getTemplate', data, 'POST');
//关税税率分页 
export const findByListTax = (data) => ajax(BASE_URL + '/tax/findByListTax', data, 'POST');

//产品信息分页
export const findByListProduct = (data) => ajax(BASE_URL + '/product/findByListProduct', data, 'POST');
//产品信息新增
// export const upProduct = (data) => ajax(BASE_URL + '/product/upProduct', data, 'POST');

//产品信息修改
export const upProduct = (data) => ajax(BASE_URL + '/product/upProduct', data, 'POST');
//产品信息删除


//国家分页
export const findCountryInfo = (data) => ajax(BASE_URL + '/country/findCountryInfo', data, 'POST');

//公司分页
export const findByListCompany = (data) => ajax(BASE_URL + '/company/findByListCompany', data, 'POST');
//公司添加 http://127.0.0.1:9002/api/v1/company/saveCompany	
export const saveCompany = (data)=> ajax(BASE_URL + '/company/saveCompany', data, 'POST');
//公司修改
export const upCompany = (data)=> ajax(BASE_URL + '/company/upCompany', data, 'POST');
//公司删除
export const delCompany = (data)=> ajax(BASE_URL + '/company/delCompany', data, 'POST');

// export const 
// 国家分页
// export const getRegional = ({
//   currentPage,
//   pageSize
// }) => ajax(BASE_URL + `/country/findCountryInfo`, {
//   currentPage,
//   pageSize
// }, 'POST')

//公司分页
// export const repGetCompanyInfo = ({
//   currentPage,
//   pageSize
// }) => ajax(BASE_URL + '/company/findByListCompany', {
//   currentPage,
//   pageSize
// }, 'POST')



//店铺分页
export const findByListShop = (data) => ajax(BASE_URL + `/shop/findByListShop`, data, 'POST')
//获取店铺名字
export const repGetShopName = () => ajax(BASE_URL + `/shop/getListShopName`)


//区域分页 repGetRegionInfo
export const findByListRegion = (data) => ajax(BASE_URL + '/reg/findByListRegion', data, 'POST')


//站点分页 repGetSiteInfo
export const findByListSite = (data) => ajax(BASE_URL + '/site/findByListSite', data, 'POST')

//通过shop id 获取站点信息
export const repGetShopIdSiteInfo = (sId) => ajax(BASE_URL + `/site/getByShopIdListSite`, {
  sId
})

//币别分页 repGetCurrencyInfo
export const findByListCurrency = (data) => ajax(BASE_URL + '/currency/findByListCurrency', data, 'POST')

//汇率分页 repGetRate
export const findByListRate = (data) => ajax(BASE_URL + '/rate/findByListRate', data, 'POST')

//新增汇率接口 http://127.0.0.1:9002/api/v1/rate/saveRate		POST
export const saveRate = (data) => ajax(BASE_URL + '/rate/saveRate', data, 'POST')

/**
 * 
 * 菜单管理 => 菜单管理
 */
//获取可引用的表头字段 
export const reference = (data) => ajax(BASE_URL + '/reference', data,'GET',[false,true])
//新增表头字段 api/v1/saveHead
export const saveHead = (data) => ajax(BASE_URL + '/saveHead', data,'POST',[true,true])
//新增引用数据 
export const saveReference = (data) => ajax(BASE_URL + '/saveReference', data,'POST',[true,true])
//字段名称(headName)对比数据库是否重复  http://127.0.0.1:9001/api/v1/IsHeadName?headName=备注 
export const isHeadName = (data) => ajax(BASE_URL + '/isHeadName', data)
//字段英文名称(topType)对比数据库是否重复 /api/v1/isTopType 
export const isTopType = (data) => ajax(BASE_URL + '/isTopType', data)



/**
 * 
 * 数据导入
 */
/**
 * 
 * 菜单管理 => 菜单管理
 */



















//获取所有角色信息
export const repFindRoles = () => ajax(BASE_URL + `/role/findByListRoles`)

//获取员工信息 还没被注册的
export const repGetStaff = () => ajax(BASE_URL + `/staff/getStaff`)

//获得用户名字是否存在
export const repGetUserName = (userName) => ajax(BASE_URL + `/user/getUserName`, {
  userName
})




//新增用户信息
export const repSaveUserInfo = ({
  userName,
  pwd,
  confirmPwd,
  checkedPwd,
  checkedUpPwd,
  uAlways,
  pwdAlways,
  rolesId,
  staffValue,
  pwdValidityPeriod,
  userExpirationDate,
  remark
}) => ajax(BASE_URL + '/user/saveUserInfo', {
  userName,
  pwd,
  confirmPwd,
  checkedPwd,
  checkedUpPwd,
  uAlways,
  pwdAlways,
  rolesId,
  staffValue,
  pwdValidityPeriod,
  userExpirationDate,
  remark
}, 'POST')

//新增角色
export const repAdRole = ({
  rolesId,
  uid
}) => ajax(BASE_URL + '/ur/addRole', {
  rolesId,
  uid
}, 'POST')
//移除角色信息
export const repDelRole = ({
  rolesId,
  uid
}) => ajax(BASE_URL + '/ur/delRole', {
  rolesId,
  uid
}, 'POST')
//新增菜单关联表头字段
export const repAddHeadMenu = ({
  mId,
  thIds
}) => ajax(BASE_URL + '/hm/saveHeadMenu', {
  mId,
  thIds
}, 'POST')

//删除菜单关联表头字段
export const repDelHeadMenu = ({
  mId,
  thIds
}) => ajax(BASE_URL + '/hm/delTbHeadMenu', {
  mId,
  thIds
}, 'POST')
//

//查询用户记录  查询已上传的文件信息
export const repGetUserUploadInfo = (data) => ajax(BASE_URL + '/upload/getInfo', data, 'POST')

//通过id 删除用户记录信息 
export const repDelUploadInfo = (id) => ajax(BASE_URL + `/upload/delInfo`, {
  id
},'GET',[true,true])

//上传成功后 发送数据给后台写入数据库
export const repAddUploadInfoMysql = ({
  uploadSuccessList
}) => ajax(BASE_URL + '/upload/addInfo', {
  uploadSuccessList
}, 'POST')

//物流状态查询
export const repGetLogisticsInfo = ({
  currentPage,
  pageSize
}) => ajax(BASE_URL + '/logistics/info', {
  currentPage,
  pageSize
}, 'POST')
//查询字段的选项
export const getGeneralInfo = (data)=> ajax(BASE_URL + '/general/getGeneralInfo',data)

