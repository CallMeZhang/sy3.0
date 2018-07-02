import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import fpm_req from './base';
//扶贫码表单回显  发票管理回显
let get_fpm_order_info_url = host_api + '/coupon-center/bizOrderApp/latestOrderExtend?';
export const getFpmOrderInfo= ()=>{
  return fpm_req.$httpGetWithToken(get_fpm_order_info_url)
}
//扶贫码采购下单 第一步
let post_fpm_order_url = host_api + '/coupon-center/aidCouponApp/saveFirst';
export const postFpmOrderInfoFirst = (data)=>{
  return fpm_req.$httpPostWithToken(post_fpm_order_url,data)
}
//扶贫码采购下单 第二步
let post_fpm_order_url_second = host_api + '/coupon-center/aidCouponApp/saveAidSecond';
export const postFpmOrderInfoSecond = (data)=>{
  return fpm_req.$httpPostWithToken(post_fpm_order_url_second,data)
}
//扶贫码采购下单 同意并下单
let post_fpm_order_url_agree = host_api + '/coupon-center/aidCouponApp/submitAidCoupon';
export const postFpmOrderInfoAgree = (data)=>{
  return fpm_req.$httpPostWithToken(post_fpm_order_url_agree,data)
}
//扶贫码订单信息显示
let get_fpm_order_show_url = host_api + '/coupon-center/aidCouponApp/getBizSaveInfo';
export const getShowFpmOrderInfo= (bizId)=>{
  return fpm_req.$httpGetWithToken(get_fpm_order_show_url+'?bizId='+bizId)
}

//扶贫码订单详情  (扶贫码下单成功 也调用)
let get_order_detail_url = host_api + '/coupon-center/bizOrderApp/memberOrdersDetail';
export const getOrderDetail = (order_id)=>{
  return fpm_req.$httpGetWithToken(get_order_detail_url + '?mainId='+order_id)
}
//扶贫码订单记录
let get_order_record_url = host_api + '/coupon-center/bizOrderApp/memberOrders';
export const getOrderRecord = (size,curpage)=>{
  return fpm_req.$httpGetWithToken(get_order_record_url + '?pageSize='+size+'&curPage='+curpage)
}
//扶贫码取消订单
let cancel_fpm_order_url = host_api + '/coupon-center/bizOrderApp/cancelOrder';
export const cancelFpmOrder = (main_id)=>{
  return fpm_req.$httpGetWithToken(cancel_fpm_order_url + '?mainId='+main_id)
}
//扶贫码订单变更
let alteration_fpm_order_url = host_api + '/coupon-center/bizOrderApp/confirmEditOrder';
export const alterationFpmOrder = (main_id)=>{
  return fpm_req.$httpGetWithToken(alteration_fpm_order_url + '?mainId='+main_id);
}

//扶贫码删除订单
let del_fpm_order_url = host_api + '/coupon-center/bizOrderApp/deleteOrder';
export const delFpmOrder = (main_id)=>{
  return fpm_req.$httpGetWithToken(del_fpm_order_url + '?mainId='+main_id)
}
//扶贫码登记转账信息
let register_transfer_info = host_api + '/coupon-center/bizOrderApp/addTransferInfo';
export const registerTransferInfo = (data)=>{
  return fpm_req.$httpPostWithToken(register_transfer_info,data)
}
//扶贫码查看转账信息
let look_transfer_info = host_api + '/coupon-center/bizOrderApp/memberTransferInfo';
export const look_transferInfo = (mId)=>{
  return fpm_req.$httpGetWithToken(look_transfer_info + '?mainId='+mId)
}
//发票管理 或 修改发票信息
let invoice_management_url = host_api + '/coupon-center/bizOrderApp/addInvoiceInfo';
export const postInvoiceInfo = (data)=>{
  return fpm_req.$httpPostWithToken(invoice_management_url, data)
}
//App获取扶贫码链接
let create_fpm_url = host_api + '/coupon-center/aidCouponApp/couponCode/url';
export const createFpmCode = (mainId) =>{
  return fpm_req.$httpGetWithToken(create_fpm_url + '?mainId='+ mainId)
}
