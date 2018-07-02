//https://apit.17shanyuan.com/1.0/user-center/wxApi/accessToken?code=
//https://apit.17shanyuan.com/1.0/user-center/wxApi/userInfo?code=
import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import request_base from './base'
//
// let get_wx_accessToken = host_api + '/user-center/wxApi/accessToken'
// export const getWxAccessToken= (data) => {
//   var code=data||''
//   return request_base.$httpGet(get_wx_accessToken+'?code='+code)
//   // return request_base.$httpPost(del_address_info , data)
// }
//
let get_wx_userInfo = host_api + '/user-center/wxApi/userInfo'
export const getWxUserInfo= (data) => {
  var code=data||''
  return request_base.$httpGet(get_wx_userInfo+'?code='+code)
  // return request_base.$httpPost(del_address_info , data)
}
