import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import request_base from './base'
//联盟详情页 https://apit.17shanyuan.com/1.0/union-center/union/info?id=48
let get_union_info = host_api + '/union-center/union/info'
export const getUnionInfo = (id) => {
  return request_base.$httpGetWithToken(get_union_info+'?id='+id )
  // return request_base.$httpPost(del_address_info , data)
}
//https://apit.17shanyuan.com/1.0/union-center/union/report
let get_union_report = host_api + '/union-center/union/report'
export const getUnionReport = (data) => {
  var unionId=data.unionId||''
  var unionCode=data.unionCode||''
  var clientType=data.clientType||''//Android，iOS，H5
  var appVersion=data.appVersion||''
  var appStoreId=data.appStoreId||''
  return request_base.$httpGetWithToken(get_union_report+"?unionId="+unionId+"&unionCode="+unionCode+"&clientType="+clientType+"&appVersion="+appVersion+"&appStoreId="+appStoreId)
  // return request_base.$httpPost(del_address_info , data)
}
