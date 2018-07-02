import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import request_base from './base'
//省市县
let del_address_Province = host_api + '/user-center/receiveAddr/list'
export const getProvinceInfo = (pid) => {
  return request_base.$httpGetWithToken(del_address_Province+'?pid='+pid )
  // return request_base.$httpPost(del_address_info , data)
}
//获取地址列表
let get_address_list = host_api + '/user-center/bizReceiveAddr/userList'
export const getAddressList= () => {
  return request_base.$httpGetWithToken(get_address_list+ '?')
  // return request_base.$httpPost(del_address_info , data)
}
//集采新增地址
let add_address_info=host_api+ '/user-center/bizReceiveAddr/add'
export const addAddressInfo = (data) => {
  return request_base.$httpPostWithToken(add_address_info , data)
  // return request_base.$httpPost(del_address_info , data)
}
//id获取地址
let get_address_info= host_api+'/user-center/bizReceiveAddr/info'
export const getAddressInfo = (addressId) => {
  return request_base.$httpGetWithToken(get_address_info+'?addressId='+addressId)
  // return request_base.$httpPost(del_address_info , data)
}
//集采修改地址
let edit_address_info=host_api+ '/user-center/bizReceiveAddr/edit'
export const editAddressInfo = (data) => {
  return request_base.$httpPostWithToken(edit_address_info,data)
  // return request_base.$httpPost(del_address_info , data)
}
//del地址
let del_address_info=host_api+ '/user-center/bizReceiveAddr/delete'
export const delAddressInfo = (data) => {
  return request_base.$httpPostWithToken(del_address_info,data)
  // return request_base.$httpPost(del_address_info , data)
}
