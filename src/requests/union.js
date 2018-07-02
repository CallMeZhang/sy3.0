import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import request_base from './base'
//联盟详情页 https://apit.17shanyuan.com/1.0/union-center/union/info?id=48
let get_union_info = host_api + '/union-center/union/info'
export const getUnionInfo = (id) => {
  return request_base.$httpGetWithToken(get_union_info+'?code='+id )
  // return request_base.$httpPost(del_address_info , data)
}
//https://apit.17shanyuan.com/1.0/union-center/union/report
let get_union_report = host_api + '/union-center/union/report'
export const getUnionReport = (data) => {
  var id=data.id||''
  var code=data.code||''
  var clientType=data.clientType||''//Android，iOS，H5
  var appVersion=data.appVersion||''
  var appStoreId=data.appStoreId||''
  return request_base.$httpGetWithToken(get_union_report+"?id="+id+"&code="+code+"&clientType="+clientType+"&appVersion="+appVersion+"&appStoreId="+appStoreId)
  // return request_base.$httpPost(del_address_info , data)
}
//https://apit.17shanyuan.com/1.0/union-center/union/list
let get_union_list = host_api + '/union-center/union/list'
export const getUnionList = (data) => {
  var type=data.type||''
  var clientType=data.clientType||''
  var appVersion=data.appVersion||''
  var appStoreId=data.appStoreId||''
  return request_base.$httpGetWithToken(get_union_list+"?type="+type+"&clientType="+clientType+"&appVersion="+appVersion+"&appStoreId="+appStoreId)
  // return request_base.$httpPost(del_address_info , data)
}
///user-center/usr/joinOrg
// let get_union_joinOrg = host_api + '/user-center/usr/joinOrg'
// export const getUnionJoinOrg = (data) => {
//   var type=data.type||''
//   var clientType=data.clientType||''
//   var appVersion=data.appVersion||''
//   var appStoreId=data.appStoreId||''
//   return request_base.$httpGetWithToken(get_union_joinOrg+"?type="+type+"&clientType="+clientType+"&appVersion="+appVersion+"&appStoreId="+appStoreId)
//   // return request_base.$httpPost(del_address_info , data)
// }
//https://apit.17shanyuan.com/1.0/union-center/union/getTopUnion
let get_union_getTopUnion = host_api + '/union-center/union/getTopUnion'
export const getUnionGetTopUnion = (data) => {
  var type=data.type||''
  var clientType=data.clientType||''
  var appVersion=data.appVersion||''
  var appStoreId=data.appStoreId||''
  return request_base.$httpGetWithToken(get_union_getTopUnion+"?type="+type+"&clientType="+clientType+"&appVersion="+appVersion+"&appStoreId="+appStoreId)
  // return request_base.$httpPost(del_address_info , data)
}
///union-center/union/orgTopList

let get_union_orgTopList = host_api + '/union-center/union/orgTopList'
export const getUnionOrgTopList = (data) => {
  var type=data.type||''
  var code=data.code||''
  var id=data.id||''
  var clientType=data.clientType||''
  var appVersion=data.appVersion||''
  var appStoreId=data.appStoreId||''
  return request_base.$httpGetWithToken(get_union_orgTopList+"?id="+id+"&code="+code+"&type="+type+"&clientType="+clientType+"&appVersion="+appVersion+"&appStoreId="+appStoreId)
  // return request_base.$httpPost(del_address_info , data)
}
//查询子联盟
//https://apit.17shanyuan.com/1.0/union-center/unionManage/sub/list

let get_union_sub_list= host_api + '/union-center/unionManage/sub/list'
export const getUnionSubList = (data) => {
  var unionCode=data||''
  return request_base.$httpGet(get_union_sub_list+"?unionCode="+unionCode)
  // return request_base.$httpPost(del_address_info , data)
}
///user-center/usr/joinOrg
//加入部门

let get_union_join_org= host_api + '/user-center/usr/joinOrg'
export const getUnionJoinOrg = (data) => {
  return request_base.$httpPostWithToken(get_union_join_org,data)
  // return request_base.$httpPost(del_address_info , data)
}
//union-center/org/list


let get_union_org_list= host_api + '/union-center/org/list'
export const getUnionOrgList = (data) => {
  var orgId=data.orgId||''
  var unionCode=data.unionCode||''
  var clientType=data.clientType||''//Android，iOS，H5
  var appVersion=data.appVersion||''
  var appStoreId=data.appStoreId||''
  return request_base.$httpGet(get_union_org_list+"?orgId="+orgId+"&unionCode="+unionCode+"&clientType="+clientType+"&appVersion="+appVersion+"&appStoreId="+appStoreId)

  // return request_base.$httpPost(del_address_info , data)
}
//火热集结
let get_union_top_list= host_api + '/union-center/union/topList'
export const getUnionTopList = (data) => {
  return request_base.$httpGet(get_union_top_list+"?")

  // return request_base.$httpPost(del_address_info , data)
}
