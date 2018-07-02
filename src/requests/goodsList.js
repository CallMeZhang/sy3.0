import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import request_base from './base'
let get_homes_list = host_api + '/ebgoods/search/homes/list'
export const getHomesList = (data) => {
  var query=data.query||''
  var sortType=data.sortType||0
  var catalogId=data.catalogId||''
  var pageNo=data.pageNo||0
  var pageSize=data.pageSize||20
  return request_base.$httpGetWithToken(get_homes_list+'?query='+query+'&sortType='+sortType+'&catalogId='+catalogId+'&pageNo='+pageNo+'&pageSize='+pageSize)
  // return request_base.$httpPost(del_address_info , data)
}
//积分商城列表
let get_malls_list = host_api + '/ebgoods/search/malls/list'
export const getMallsList = (data) => {
  var query = data.query || ''
  var sortType = data.sortType || 0
  var catalogId = data.catalogId || ''
  var pageNo = data.pageNo || 0
  var pageSize = data.pageSize || 20
  return request_base.$httpGetWithToken(get_malls_list + '?query=' + query + '&sortType=' + sortType + '&catalogId=' + catalogId + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
  // return request_base.$httpPost(del_address_info , data)
}

//获取默认词
let get_list_user = host_api + '/ebgoods/hot-word/list/user'
export const getListUser = (data) => {
  return request_base.$httpGetWithToken(get_list_user+'?')
  // return request_base.$httpPost(del_address_info , data)
}
