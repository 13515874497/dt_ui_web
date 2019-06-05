
import {
  findByListProducts,
  repGetShopName,
  getSelectSiteRole,
  findByListStarLevel,
  findByListPlatform,
  findByListType,
  findByListCurrency,
  findSupList,
	findByListWar,
	findByListWarP,
	findByListFreight,
	findByListProduct
} from '@/api/api'

/**
 *
 * Cascader 级联选择
 */
// topType： 当前要自定义的字段  bindKey：选择后实际要传给后台的字段 data_model: 由于级联选择绑定的是一个数组，二后台只需要最后一个 这个为临时用来绑定的变量
//类目名称
export const productsName = {
  topType: "productsName",
  bindKey: 'productsId',
  data_model: 'productsIds',
  inputType: 5,
  ajax: findByListProducts,
}
//运输类型
export const transportTypeName = {
  topType: "transportTypeName",
  bindKey: 'transportTypeId',
  data_model: 'transportTypeId_',
  inputType: 5,
  ajax: findByListType,
  required: true
}
//仓库 findByListWar
export const findListWar = {
  topType: "reciveWarehouseId",
  bindKey: 'reciveWarehouseId',
  data_model: 'reciveWarehouseIds',
  inputType: 5,
  ajax: findByListWar,
}
//仓位 findByListWarP
export const findListWarP = {
  topType: "recivePositionId",
  bindKey: 'recivePositionId',
  data_model: 'recivePositionIds',
  inputType: 5,
  ajax: findByListWarP,
}
/**
 *
 * select下拉框
 */
//topType： 当前要自定义的字段  bindKey：选择后实际要传给后台的字段 ajax：select渲染的数据 key：option绑定的key  label：option绑定的label filterable：可以输入筛选
//店铺列表
export const shopName = {
  topType: "shopName",
  inputType: 3,
  bindKey: "shopId",
  ajax: repGetShopName,
  key: "shopId",
  label: "shopName",
  placeholder: "请选择店铺"
}
//站点
export const siteName = {
  topType: "siteName",
  inputType: 3,
  bindKey: "siteId",
  ajax: getSelectSiteRole,
  key: "siteId",
  label: "siteName",
  filterable: true,
  placeholder: "请选择站点"
}
//星级
export const starLevelName = {
  inputType: 3,
  topType: "starLevelName",
  bindKey: "starLevelId",
  ajax: findByListStarLevel,
  key: "starLevelId",
  label: "starLevelName",
  // filterable: true,
  placeholder: "请选择星级"
}
//平台类型
export const platformTypeName = {
  inputType: 3,
  topType: "platformTypeName",
  bindKey: "platformTypeId",
  ajax: findByListPlatform,
  key: "platformTypeId",
  label: "platformTypeName",
  filterable: true,
  placeholder: "请选择平台类型"
}
//币别 
export const currencyName = {
  inputType: 3,
  topType: "currencyName",
  bindKey: "currencyId",
  ajax: findByListCurrency,
  key: "currencyId",
  label: "currencyName",
  filterable: true,
  placeholder: "请选择币别"
}
//供应商 findSupList
export const supplierId = {
  inputType: 3,
  topType: "supplierId",
  bindKey: "supplierId",
  ajax: findSupList,
  key: "supplierId",
  label: "supplierFullName",
  filterable: true,
  placeholder: "请选供应商"
}
//预付单号 prePayNo
// export const supplierId = {
//   inputType: 3,
//   topType: "prePayNo",
//   bindKey: "prePayNo",
//   ajax: findSupList,
//   key: "supplierId",
//   label: "supplierFullName",
//   filterable: true,
//   placeholder: "请选供应商"
// }
//货运公司
export const findFreight = {
  inputType: 3,
  topType: "transportCompanyId",
  bindKey: "transportCompanyId",
  ajax: findByListFreight,
  key: "transportCompanyId",
  label: "transportCompanyFullName",
  filterable: true,
  placeholder: "请选货运公司"
}
//商品代码
export const findProduct = {
  inputType: 3,
  topType: "productId",
  bindKey: "productId",
  ajax: findByListProduct,
  key: "productId",
  label: "productCode",
  filterable: true,
  placeholder: "请选商品代码"
}