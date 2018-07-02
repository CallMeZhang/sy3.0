import  Vue from 'vue'
import * as type from '../../requests/wx'
import config from '../../../config/sy3.0'
const appid = config.appId;
function wxAuthorize() {
  return new Promise(function(resolve,reject){
      if(window.location.href.indexOf('state=STATE')==-1){
        var callBack=encodeURIComponent(window.location.href)
        const appId = config.appId;
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+callBack+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }else{
      var code = getQueryVariable('code')
      if(!code){
        resolve('failed')
      }else{
        // type['getWxUserInfo'](code).then((res)=>{
        //   resolve(res);
        // },(error)=>{
        //   reject(error)
        // })
        resolve(code);
      }
    }
  })
}
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
export default wxAuthorize
