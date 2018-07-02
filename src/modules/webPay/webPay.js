// import wx from 'weixin-js-sdk'
import request from '@/requests/base_v2'
import config from '../../../config/sy3.0'
const appid = config.appId;
const redirect_uri = window.location.href;
// const redirect_uri = 'https://v3m.17shanyuan.com';
function wx_config(appId, timestamp, nonceStr,pack,signType,sign,callback,error) {
  // wx.config({
  //   debug: false, //调试阶段建议开启
  //   appId: appId || 'wxf8b4f85f3a794e77',
  //   timestamp: timestamp || '1525937081',
  //   nonceStr: nonceStr || 'QSDP96BH7ZQcyvDJ',
  //   signature: signature || 'ecc1589635c90388205077f39aa1c25082931218',
  //   jsApiList: ["chooseWXPay"]
  // });
  //
  // wx.ready(function(){
  //   wx.chooseWXPay({
  //     timestamp: timestamp,
  //     nonceStr: nonceStr,
  //     // package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
  //     package: pack,
  //     signType: signType, // 注意：新版支付接口使用 MD5 加密
  //     paySign: sign,
  //     success: function (res) {
  //       // 支付成功后的回调函数
  //       console.log(res)
  //     },
  //     cancel:function(res){
  //
  //     }
  //   });
  // })
  let data = {
    "appId" : appId,     //公众号名称，由商户传入
    "timeStamp":timestamp,         //时间戳，自1970年以来的秒数
    "nonceStr" : nonceStr, //随机串
    "package" : pack,
    "signType" : signType,         //微信签名方式:
    "paySign" : sign //微信签名
  }
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', function(){onBridgeReady(data,callback,error)}, false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', function(){onBridgeReady(data,callback,error)});
      document.attachEvent('onWeixinJSBridgeReady', function(){onBridgeReady(data,callback,error)});
    }
  }else{
    onBridgeReady(data,callback,error);
  }
  function onBridgeReady(data,callback,error){
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', data,
      function(res){
        if(res.err_msg == "get_brand_wcpay_request:ok" ) {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          callback && callback(res)
        }else{
          error && error(res.err_msg)
        }
      }
    );
  }

}
// let data = {"package":"prepay_id=wx15170212157270ae90e8f4290289566357","appId":"wxd28e2eb6ab457d84","paySign":"39073506DF734DB89E11F6D06FC176DE","signType":"MD5","partnerid":"1472451102","prepayid":"wx15170212157270ae90e8f4290289566357","nonceStr":"3bindoljpTw6iMg2","timeStamp":"1526374932"}



function getQuery (name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return unescape(r[2]); return null;
}
function inWeixin(){
  var ua = window.navigator.userAgent.toLowerCase();
  return  ua.match(/MicroMessenger/i) == 'micromessenger'
}
function payAjax(outTradeNo,publicCode,callback,error){
  return request.postWithToken('payment-center/payment/unifiedOrder',{payWay:'wx_public',outTradeNo:outTradeNo,publicCode:publicCode}).then(res=>{
    if(res && res.code == 200){
      let data = res.data.unifiedResponse.wxpublicUnifiedRspData;
      wx_config(data.appId,data.timeStamp,data.nonceStr,data.package,data.signType,data.paySign,callback,error)
    }else{

    }
  })
}

function pay(outTradeNo,callback,error){
  if(inWeixin () && !getQuery('code')){
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+encodeURIComponent(redirect_uri)+"&response_type=code&scope=snsapi_base#wechat_redirect"
  }
  let publicCode = getQuery('code')
  payAjax(outTradeNo,publicCode,callback,error)
}

if(inWeixin () && !getQuery('code')){
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+encodeURIComponent(redirect_uri)+"&response_type=code&scope=snsapi_base#wechat_redirect"
  // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd28e2eb6ab457d84&redirect_uri=https%3a%2f%2fv3m.17shanyuan.com&response_type=code&scope=snsapi_base#wechat_redirect'
  // console.log("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+encodeURIComponent(redirect_uri)+"&response_type=code&scope=snsapi_base#wechat_redirect")
}

export default pay
