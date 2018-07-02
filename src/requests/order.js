import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import request_base from './base'
//预提交newPreSubmitOrder
let get_pre_submit = host_api + '/order-center/order/newPreSubmitOrder'
export const getPreSubmit= (data) => {
  var goodsMap=data.goodsMap||''
  var addressId=data.addressId||''
  var storeVids=data.storeVids||'';
  var platformVid=data.platformVid||'';
  var isAidCoupon=data.isAidCoupon||'yes';
  return request_base.$httpGetWithToken(get_pre_submit+'?goodsMap='+goodsMap+'&addressId='+addressId+'&storeVids='+storeVids+'&platformVid='+platformVid+'&isAidCoupon='+isAidCoupon)
}

let post_submit_order = host_api + '/order-center/order/submitOrder'
export const postSubmitOrder= (data) => {
  return request_base.$httpPostWithToken(post_submit_order,data)
}
//订单详情
let get_order_detail = host_api + '/order-center/orderUser/getOrderDetail'
export const getOrderDetail= (data) => {
  var orderId = data.orderId||''
  return request_base.$httpGetWithToken(get_order_detail+"?orderId="+orderId)
}

//待支付订单详情

let get_wait_pay_order_detail = host_api + '/order-center/orderUser/getWaitPayOrderDetail'
export const getWaitPayOrderDetail= (data) => {
  var mainId = data.mainId||''
  return request_base.$httpGetWithToken(get_wait_pay_order_detail+"?mainId="+mainId)
}

//支付

let get_unified_order = host_api + '/payment-center/payment/unifiedOrder'
export const getUnifiedOrder= (data) => {
  return request_base.$httpPostWithToken(get_unified_order,data)
}
//支付确认
///payment/affirmPayResult
let get_affirm_pay_result = host_api + '/payment-center/payment/affirmPayResult'
export const getAffirmPayResult= (data) => {
  return request_base.$httpPostWithToken(get_affirm_pay_result,data)
}

let get_share_data = host_api + '/order-center/orderUser/orderGoodsList'
export const getShareData= (data) => {
  var mainId = data.mainId||''
  return request_base.$httpGet(get_share_data+'?mainId='+mainId)
}
//https://apit.17shanyuan.com/1.0/order-center/orderUser/successPageInfo?token=erw&mainId=werwe

let get_success_page_info = host_api + '/order-center/orderUser/successPageInfo'
export const getSuccessPageInfo= (data) => {
  var mainId = data.mainId||''
  return request_base.$httpGetWithToken(get_success_page_info+'?mainId='+mainId)
}
