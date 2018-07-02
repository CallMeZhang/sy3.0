import sy from '../../config/sy3.0'
let host_api = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
// host_api='https://apit.17shanyuan.com/1.0'
import request_base from './base'
//预提交
let get_user_home = host_api + '/user-center/usr/home'
export const getUserHome= () => {
  return request_base.$httpGetWithToken(get_user_home+'?')
}
