/*
包含N个接口请求函数的模块
 */
import ajax from './ajax'

const BASE_URL = '/api'

// 查询国家
export const getRegional = ({currentPage,pageSize}) => ajax(BASE_URL + `/country/findCountryInfo`, {currentPage,pageSize}, 'POST')


// 获取用户登陆信息
export const repLoginUser = ({userName, pwd, rememberMe}) => ajax(BASE_URL + `/ajaxLogin`, {
  userName,
  pwd,
  rememberMe
}, 'POST')
//获得所有用户信息
export const repGetUsers = () => ajax(BASE_URL + '/user/getUsers')
//获取用户管理信息
export const repUsers = ({
                           currentPage, pageSize, userName, name,
                           createDate, pwdStatus, landingTime,
                           effectiveDate, computerName, accountStatus, mobilePhone, rName, pwdAlways, uAlways
                         }) =>
  ajax(BASE_URL + `/user/show`, {
    currentPage, pageSize, userName, name,
    createDate, pwdStatus, landingTime,
    effectiveDate, computerName, accountStatus, mobilePhone, rName, pwdAlways, uAlways
  }, 'POST')

//通过menu_id查询table头信息
export const repHead = (menu_id) => ajax(BASE_URL + '/head', {menu_id})

//通过menuIds查询table头List集合
export const repGetHead = ({menuIds}) => ajax(BASE_URL + '/getByHead', {menuIds}, 'POST')

//查询所有表头信息 然后service 层通过mid来区别对应的表头信息
export const repFindByHeads = (mId) => ajax(BASE_URL + '/findHeads', {mId})

//访问index页面测试是否登陆
export const repIndex = () => ajax(BASE_URL + `/index`)

//注销请求
export const repLogout = () => ajax(BASE_URL + `/logout`)

//查询哪些用户有哪些菜单
export const repMenu = (type) => ajax(BASE_URL + `/menu/show`, {type})

//修改菜单表信息
export const repUpMenuInfo = ({newMenu, idsMenu}) => ajax(BASE_URL + '/menu/up/menu', {
  newMenu,
  idsMenu
}, 'POST')
//校验菜单是否已更新接口
export const repCheckMenuToken = () => ajax(BASE_URL + `/menu/token/menu`)

//通过角色id来获取菜单id
export const repGetMenus = ({rid, menuIds, menuFlg}) => ajax(BASE_URL + '/rm/upMenus', {rid, menuIds, menuFlg}, 'POST')

//更新用户信息
export const repUpUserInfo = ({pwd, accountStatus, uid, pwdAlwaysInput, effectiveDate, uName, checkedUpPwd, checkedPwdAlways, checkedUserAlways, name, uMobilePhone}) => ajax(BASE_URL + `/user/upUserInfo`,
  {
    pwd,
    accountStatus,
    uid,
    pwdAlwaysInput,
    effectiveDate,
    uName,
    checkedUpPwd,
    checkedPwdAlways,
    checkedUserAlways,
    name,
    uMobilePhone
  }, 'POST')

// 查询一个角色下的所有用户跟 菜单
export const repGetRoles = ({currentPage, pageSize, rName, userName}) => ajax(BASE_URL + '/role/getRoles', {
  currentPage,
  pageSize,
  rName, userName
}, 'POST')

//删除一个用户或者多个用户
export const repDelUserInfo = ({ids}) => ajax(BASE_URL + '/user/delUserInfo', {ids}, 'POST')
//恢复一个用户或者多个用户
export const repReUserInfo = ({ids}) => ajax(BASE_URL + '/user/reUserInfo', {ids}, 'POST')
//获得历史删除用户的信息
export const repDelHistoryUserInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/user/getDelUser', {
  currentPage,
  pageSize
}, 'POST')

//获取公司的所有信息
// export const repGetCompanyInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/company/findByListCompany',{currentPage, pageSize},'POST')
export const repGetCompanyInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/company/findByListCompany', {
  currentPage,
  pageSize
}, 'POST')
//获取店铺名字
export const repGetShopName = () => ajax(BASE_URL + `/shop/getListShopName`)
//获取店铺的所有信息
export const repGetShopInfo = ({currentPage, pageSize}) => ajax(BASE_URL + `/shop/findByListShop`, {
  currentPage,
  pageSize
}, 'POST')

//获取区域的所有信息
export const repGetRegionInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/reg/findByListRegion', {
  currentPage,
  pageSize
}, 'POST')

//获取站点的所有信息
export const repGetSiteInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/site/findByListSite', {
  currentPage,
  pageSize
}, 'POST')

//通过shop id 获取站点信息
export const repGetShopIdSiteInfo = (sId) => ajax(BASE_URL + `/site/getByShopIdListSite`, {sId})

//获取币别的所有信息
export const repGetCurrencyInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/currency/findByListCurrency', {
  currentPage,
  pageSize
}, 'POST')
//获取汇率的所有信息
export const repGetRate = ({currentPage, pageSize}) => ajax(BASE_URL + '/rate/findByListRate', {
  currentPage,
  pageSize
}, 'POST')
//获取所有角色信息
export const repFindRoles = () => ajax(BASE_URL + `/role/findByListRoles`)

//获取员工信息 还没被注册的
export const repGetStaff = () => ajax(BASE_URL + `/staff/getStaff`)

//获得用户名字是否存在
export const repGetUserName = (userName) => ajax(BASE_URL + `/user/getUserName`, {userName})

//新增用户信息
export const repSaveUserInfo = ({
                                  userName, pwd, confirmPwd, checkedPwd, checkedUpPwd,
                                  checkedUserAlways, checkedPwdAlways, rolesId, staffValue, pwdAlwaysInput, effectiveDate
                                }) => ajax(BASE_URL + '/user/saveUserInfo', {
  userName, pwd, confirmPwd, checkedPwd, checkedUpPwd,
  checkedUserAlways, checkedPwdAlways, rolesId, staffValue, pwdAlwaysInput, effectiveDate
}, 'POST')

//新增角色
export const repAdRole = ({rolesId, uid}) => ajax(BASE_URL + '/ur/addRole', {rolesId, uid}, 'POST')
//移除角色信息
export const repDelRole = ({rolesId, uid}) => ajax(BASE_URL + '/ur/delRole', {rolesId, uid}, 'POST')
//新增菜单关联表头字段
export const repAddHeadMenu = ({mId, thIds}) => ajax(BASE_URL + '/hm/saveHeadMenu', {mId, thIds}, 'POST')

//删除菜单关联表头字段
export const repDelHeadMenu = ({mId, thIds}) => ajax(BASE_URL + '/hm/delTbHeadMenu', {mId, thIds}, 'POST')

//查询用户记录
export const repGetUserUploadInfo = ({shopId, siteId, pId, areaId, tbId}) => ajax(BASE_URL + '/upload/getInfo', {
  shopId,
  siteId,
  pId,
  areaId,
  tbId
}, 'POST')

//通过id 删除用户记录信息
export const repDelUploadInfo = (id) => ajax(BASE_URL + `/upload/delInfo`, {id})

//上传成功后 发送数据给后台读数据
export const repAddUploadInfoMysql = ({uploadSuccessList}) => ajax(BASE_URL + '/upload/addInfo', {uploadSuccessList}, 'POST')

//物流状态查询
export const repGetLogisticsInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/logistics/info', {
  currentPage,
  pageSize
}, 'POST')


