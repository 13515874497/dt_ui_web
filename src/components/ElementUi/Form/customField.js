// Cascader 级联选择
import {findByListProducts,BASE_URL,repGetShopName,getSelectSiteRole} from '@/api/api'
//类目名称
export const productsName = {
  topType: "productsName",
  bindKey: 'productsId',
  data_model: '_productsId',
  inputType: 5,
  ajax: findByListProducts,
}
// select下拉框
//店铺列表
export const shopName ={
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

