import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import biz_req from './base';
//集采
let get_biz_order_info_url = host_api + '/coupon-center/bizOrderApp/latestOrderExtend?';
export const getBizProductsOrderInfo = ()=>{
  return biz_req.$httpGetWithToken(get_biz_order_info_url)
}
