const qs = require("qs")
const cookie = require('vue-cookies')
import * as type from  '../../requests/user'
import storage from '@/modules/storage/storage'

// 首次调用建立通讯
syJsbGetAppInfo(function(info){

})
//判断是否是ios
function isIos() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
}

//判断是否是android
function isAndroid() {
  return /(Android)/i.test(navigator.userAgent)
}

//转译字符串
function parse(str){
  if(!str){return false}
  if(isIos()){
    var data = eval('(' + str + ')');
    var result = {};
    for(var k in data){
      result[k] = data[k]
    }
    return result;
  }else if(isAndroid()){
    try{
      return JSON.parse(str)
    }catch(e) {
      try{
        return eval('('+str+')')
      }catch(e){
        return str
      }
    }
  }
}

//解析ios appInfo参数
function iosParam(params){
    var data = eval('(' + params + ')');
    return { platform: data.platform, from: data.from ,did: data.did,ver:data.ver,build:data.build,token:data.token};
}

//ios app与页面交互的方法
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    setTimeout(()=>{
      if(!window.WebViewJavascriptBridge){
        callback(false)
      }
    },0)
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  // if (!WVJBIframe.attachEvent) {
  //   window.WVJBCallbacks = "";
  //   callback(false);
  // }
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)

}

//ios  registerHandler
function syJsbIosRegisterHandler(callback) {
  setupWebViewJavascriptBridge(function (bridge) {
    try{
        bridge.registerHandler(callback, function (data) {
        eval(callback + "('" + data + "')");
      });
    }catch (err){
    }
  });
}
function syJsbIosCallHandler(method,params,callback){
  setupWebViewJavascriptBridge(function (bridge) {
    if(!bridge) {
      callback(false);
    } else {
      bridge.callHandler(method, params, function (json_data) {
        var json = parse(json_data);
        callback && callback(json);
      });
    }
  });
}

//获取appinfo
function syJsbGetAppInfo(callback) {
  var appInfo = false;
  if (isAndroid()) {
    try {
      appInfo = syJsb.getAppInfo();
      callback(parse(appInfo));
    } catch (error) {
      callback(appInfo);
    }
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      if(!bridge) {
        callback(appInfo);
      } else {
        bridge.callHandler("getAppInfo", null, function (json_data) {
          var json = iosParam(json_data);
          callback(json)
        });
      }
    });
  } else {
    callback(appInfo);
  }
}

// 获取token
function syJsbGetToken(callback){
  syJsbGetAppInfo(appInfo=>{
    let token = appInfo?appInfo.token:cookie.get('token');
    // let token = appInfo.token
    callback(token)
  })
}
function syJsbIosClientInfo() {
  return new Promise(function (resolve, reject) {
    setupWebViewJavascriptBridge(function (bridge) {
      if (!bridge) {
        resolve(false);
      } else {
        bridge.callHandler("getAppInfo", null, function (appinfo) {
          // var version = appinfo['ver'];
          resolve(appinfo);
        });
      }
    });
  });
}
async function syJsbGetClientInfo() {
  let info = {};
  info['platform'] = 'web';
  info['version'] = '0';
  if (isAndroid()) {
    try {
      let appInfo = syJsb.getAppInfo();
      info['platform'] = appInfo['platform']
      info['version'] = parseInt(appInfo['ver']);
      return info;
    } catch (error) {
      return info;
    }
  } else if (isIos()) {
    let appInfo = await syJsbIosClientInfo()
    if(!appInfo) {
      return info
    }
    info['platform'] = appInfo['platform']
    info['version'] = parseInt(appInfo['ver']);
    return info;
  }
  return info
}

// 保存token
function syJsbStoreToken(token, member_id = 0) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      var Cookie = require('tiny-cookie');
      Cookie.setRaw('token', token, {
        expires: 1,
        domain:'17shanyuan.com'
      })
      Cookie.setRaw('token', token, {
        expires: 1
      })
      return
    }
    var Cookie = require('tiny-cookie');
    Cookie.setRaw('token', token, {
      expires: 365
    })
    var platform = appInfo['platform']
    var version = appInfo['ver']
    if (platform == 'android') {
      var params = {method: "saveToken",params:{ token : token ,member_id : member_id}}
      var jsonParam = JSON.stringify(params)
      if (version > 70){
        syJsbCallApp(jsonParam)
      }
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function(bridge) {
        let params = {
          'token': token,
          'member_id': member_id
        };
        var jsonParam = JSON.stringify(params);
        bridge.callHandler('storeToken',jsonParam, function(response) {
        });
      });
    }
  })
}
//调用app的接口 params json字符串 {method: 原生方法名,params:{ key:value}}
function syJsbCallApp(jsonParam) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform =appInfo.platform;
    if (platform === 'android') {
      syJsb.call(jsonParam);
    } else if (platform === 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("call", jsonParam, function (response) {
        });
      });
    } else {
      return false;
    }
  });
}

//
// 版本更新
function syJsbGetNewVersion() {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return
    }
    var platform =appInfo.platform;
    if (platform == 'android') {
      syJsb.getNewVersion();
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('getNewVersion',null, function(response) {
        });
      });
    }
  })
}

//定制分享, shareText, shareUrl
function syJsbShare(jsonParam) {
  jsonParam = typeof jsonParam === 'object'?JSON.stringify(jsonParam):jsonParam;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.share(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("share", jsonParam, function (response) {
        });
      });
    }
  });
}
//定制分享, shareText, shareUrl
function syJsbInviteShare(jsonParam) {
  jsonParam = typeof jsonParam === 'object'?JSON.stringify(jsonParam):jsonParam;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.shareInvite(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("shareInvite", jsonParam, function (response) {
        });
      });
    }
  });
}

//打开新页面
function syJsbLaunchWebview(url,type,isHiddenNav) {
  syJsbOpenNewPage('launchWebview', url,type,isHiddenNav);
}
// 打开页面方式 是否隐藏导航 打开方式 push modal
// @params type  1:push 2:modal   isHiddenNav  0:不隐藏导航 1：隐藏导航
function appOpenMode(page,query,isHiddenNav='0',type='1',){
  appOpen(page,query,false,false,false,type,isHiddenNav)
}
//
//appOpenUnSlide 控制打开的下级ios页面是否能够侧滑 0：可以侧滑 1：不可以侧滑
function appOpenUnSlide(page,query,isClosedSlide) {
  alert('方法废弃')
  if(!page) return false;
  var url=''

  if(/.com/g.test(page)){
    url = page
  }else{
    page = page.charAt(0) !== '/'?'/' + page:page
    url = window.location.origin + page + (query?'?'+qs.stringify(query):'')
  }
  syJsbOpenNewPage('launchWebview', url,'1','1',isClosedSlide)
}
// @params page 组件名 query:参数 fullUrl 是否是完整路径  isCurPage 是否在当前页面打开，isReplace:是否替换当前文档

function appOpen(page,query,fullUrl,isCurPage,isReplace,type,isHiddenNav){
  if(!page) return false;
  var flag = /isShare=yes/ig.test(window.location.href)
  let url = '';
  if(fullUrl){ // 是否是完整的url
    url = page
  }else{
    page = page.charAt(0) !== '/'?'/' + page:page
    url = window.location.origin + page + (query?'?'+qs.stringify(query):'')
  }
  if(isReplace){
    if(flag){
      var prams=/\?/ig.test(url)
      if(prams){
        url+='&isShare=yes'
      }else{
        url+='?isShare=yes'
      }
    }
    window.location.replace(url)
    return
  }
  if(isCurPage){
    if(flag){
      var prams=/\?/ig.test(url)
      if(prams){
        url+='&isShare=yes'
      }else{
        url+='?isShare=yes'
      }
    }
    window.location.href = url;
    return
  }
  if(flag){
    var prams=/\?/ig.test(url)
    if(prams){
      url+='&isShare=yes'
    }else{
      url+='?isShare=yes'
    }
  }
  syJsbLaunchWebview(url,type,isHiddenNav)
}
//定制app打开新页面
// @params type  1:push 2:modal   isHiddenNav  0:不隐藏导航 1：隐藏导航
//isClosedSlide 控制打开的下级ios页面是否能够侧滑 0：可以侧滑 1：不可以侧滑
function syJsbOpenNewPage(method, url,type='1',isHiddenNav='0',isClosedSlide='0') {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      window.location = url;
      return false;
    }
    var params = {method: method, params: {url: url,type:type,isHiddenNav:isHiddenNav,isClosedSlide:isClosedSlide}};
    var jsonParam = JSON.stringify(params);
    var platform =appInfo.platform;
    if (platform == 'android') {
      switch (method) {
        case 'launchWebview':
          syJsb.call(jsonParam);
          break;
        case 'launchCart':
          syJsb.call(jsonParam);
          break;
        default:
          window.location = url;
          break;
      }
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("call", jsonParam, function (response) {
        });
      });
    }
  });
}

//定制app关闭当前页面 isReload :isReload 是否刷新  BOOL 0或1 0:不刷新 1:刷新
// times 返回次数 整型  -2表示返回dismiss -1表示返回首页 0,1表示返回一次，2表示返回两次...
function syJsbCloseAppPage(isReload=0,times=1) {
  if(isReload.target){
    isReload=0
  }
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      isReload?history.go(-1):history.back();
      return false;
    }
    var platform =appInfo.platform;
    if (platform == 'android') {
      var params = {method:'closePage',params:{isReload:parseInt(isReload),times:parseInt(times)}};
      var jsonParam = JSON.stringify(params);
      syJsb.call(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      var params = {isReload:isReload,times:times};
      var jsonParam = JSON.stringify(params);
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("closePage", jsonParam, function (response) {
        });
      });
    }
  });
}
// 支付宝支付
function syJsbAliPay(arg){
  let str = typeof arg === 'object'?JSON.stringify(arg):arg;
  if (isAndroid()) {
    syJsb.alipay(str)
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler("alipay", str, function (response) {
      });
    });
  } else {
    return false
  }
}
// 微信支付
function syJsbWxPay(arg){
  let str = typeof arg === 'object'?JSON.stringify(arg):arg;
  if (isAndroid()) {
    syJsb.wxPay(str)
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler("wxPay", str, function (response) {
      });
    });
  } else {
    return false
  }
}

//app上传图片
function syJsbUploadImage(jsonParam) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform =appInfo.platform;
    if (platform == 'android') {
      syJsb.uploadFile(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      syJsbIosCallHandler('uploadFile',jsonParam)
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("setImageByUrl", function (json_data) {
          // 处理ios上传后路径
          var data = parse(json_data)
          setImageByUrl(data.objId, data.fileUrl, data.fileName);
        });
      });
    }
  });
}

/*
 * 显示toast,如果老版本就弹alert
 * message: 内容
 * contentType: 显示正确还是错误提示
 */
function showToast(message, contentType) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      syJsbAlert(message);
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    var params = {method: "notice", params: {content: message, contentType: contentType}};
    var jsonParam = JSON.stringify(params);
    if (platform == 'ios'||platform == 'iphoneX') {
      syJsbCallApp(jsonParam);
    } else if (platform == 'android') {
      syJsbCallApp(jsonParam);
    } else {
      syJsbAlert(message);
    }
  });
}

/**
 * setNavRightItem, // 设置导航右边按钮// params对象参数列表如下
 // color  字体颜色  字符串16进制
 // title  标题文字
 // imageUrl  图片url
 // method  点击之后调用的H5方法
 */
function syJsbSetRightItem(params){
  syJsbGetAppInfo(function(info){
    if(!info){
      return false;
    }
    var tmp = { method: 'setNavRightItem',
      params: { color: params.color||'4A90E2',title:params.title,imageUrl:params.imageUrl,method:params.method,alertTitle:params.alertTitle,alertDesc:params.alertDesc} };
    if(isIos()){
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler(params.method, function() {
          eval(params.method + "()")
        });
      });
    }
    var jsonParam = JSON.stringify(tmp);
    syJsbCallApp(jsonParam);
  })
}

//返回按钮 isReload :isReload 是否刷新  BOOL 0或1 0:不刷新 1:刷新
// times 返回次数 整型  -2表示返回dismiss -1表示返回首页 0,1表示返回一次，2表示返回两次...
function syJsbSetLeftItem(isReload,times){
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if( isAndroid()){
      var platform =appInfo.platform;
    }else {
      var info = iosParam(appInfo)
      var platform = info.platform;
    }
    var params = {method:'setNavLeftItem',params:{isReload:isReload,times:times}};
    var jsonParam = JSON.stringify(params);
    if (platform == 'android') {
      syJsb.call(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      syJsbCallApp(jsonParam)
    }
  });
}

//登录
function appLogin(){
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if( isAndroid()){
      appInfo=JSON.parse(appInfo)
      var platform =appInfo.platform;
    }else {
      var info = appInfo
      var platform = info.platform;
    }
    if (platform == 'android') {
      syJsb.appLogin();
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("appLogin", null, function (response) {
        });
      });
    }
  });
}
//退出
function appLogout(){
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.appLogout();
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("appLogout", null, function (response) {
        });
      });
    }
  });
}



//上传图片
/*
 * {
 id : 'pic',
 rateX : 1,
 rateY : 1,
 token : this.token,
 uploadType : 'Head',
 pNum:'1'
 }
 */
//  回调函数名字   setImageByUrl
function syJsbUploadFile(param){
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }

    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.uploadFile(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("uploadFile", jsonParam, function (response) {
        });
      });
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("setImageByUrl", function (json_data) {
          // 处理ios上传后路径
          setImageByUrl(json_data);
        });
      });
    }
  });
}
function wxLogin(){
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.wxLogin();
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("wxLogin", null, function (response) {
        });
      });
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("wxLoginState", function (json_data) {
          // 处理ios
          wxLoginState(json_data);
        });
      });
    }
  });
}

//alertTitle：标题
//alertDesc: 描述
//alertOk、alertCancel：确认取消文案
//okCallBackJs，cancelCallBackJs:确认取消执行的函数 本地注册
function nativeAlert(param){
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {

      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.nativeAlert(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("nativeAlert", jsonParam, function (response) {
        });
      });
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("nativeAlertOk", function (json_data) {
          nativeAlertOk(json_data);
        });
      });
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("nativeAlertCancel", function (json_data) {
          nativeAlertCancel(json_data);
        });
      });
    }
  })
}
function netStateFn() {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {

    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("netState", function (json_data) {
          netState(json_data);
        });
      });
    }
  })
}
//@prams
//evalueScene:使用场景 ；两个参数 1 pay 2 goodDetail
function leadEvalue(param){
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
     // syJsb.leadEvalue(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("leadEvalue", jsonParam, function (response) {
        });
      });
    }
  })
}
function setNet() {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
       syJsb.setNet();
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("setNet", null, function (response) {
        });
      });
    }
  })
}
//setLoaclData({ 'h5Key': key , 'h5Value' :value})   getLocalData( key )
function setAppData(param){

  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      window.localStorage.setItem(param.h5Key, param.h5Value);
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      window.localStorage.setItem(param.h5Key, param.h5Value);
      // syJsb.leadEvalue(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("setLocalData", jsonParam, function (response) {

        });
      });
    }
  })
}
function getAppData(param,callback){
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      callback( window.localStorage.getItem(param))
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      callback( window.localStorage.getItem(param))
      // syJsb.leadEvalue(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("getLocalData", jsonParam, function (response) {
          callback(response)
        });
      });
    }
  })
}
function getNewVersion(){
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      // syJsb.leadEvalue(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("getNewVersion", null, function (response) {
        });
      });
    }
  })
}

function jsCallPhone(param){
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.dial(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("dial", jsonParam, function (response) {
        });
      });
    }
  })
}
function m7Chat(param){
  if(!param || param.head_image=='' || param.member_truename==''){
    type['getUserHome']().then((res)=>{
      if(res.data.code!=200)return;
      var data = res.data.content
        param={
          head_image:data.avatar,
          member_truename:data.dispName
        }
      let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
      syJsbGetAppInfo(function (appInfo) {
        if (!appInfo) {
          return false;
        }
        if(typeof appInfo=='string'){
          appInfo=JSON.parse(appInfo)
          var platform = appInfo['platform'];
        }else{
          var platform = appInfo['platform'];
        }
        if (platform == 'android') {
          syJsb.m7Chat(jsonParam);
        } else if (platform == 'ios'||platform == 'iphoneX') {
          setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler("m7Chat", jsonParam, function (response) {
            });
          });
        }
      })
    })
  }else{
    let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
    syJsbGetAppInfo(function (appInfo) {
      if (!appInfo) {
        return false;
      }
      if(typeof appInfo=='string'){
        appInfo=JSON.parse(appInfo)
        var platform = appInfo['platform'];
      }else{
        var platform = appInfo['platform'];
      }
      if (platform == 'android') {
        syJsb.m7Chat(jsonParam);
      } else if (platform == 'ios'||platform == 'iphoneX') {
        setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler("m7Chat", jsonParam, function (response) {
          });
        });
      }
    })
  }
}
// 唤起ali验证
function aliVerify(arg){
  let str = typeof arg === 'object'?JSON.stringify(arg):arg;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.verifySuccess(str)
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("verifySuccess", str, function (response) {

        });
      });
    }
  })
}
function verifyLogin(arg){
  // let d = {
  //   status:true,
  //   data:{
  //     sessionId: "010B3TrWzwsdkM2Lqh18cIU_dlhI61bMGQraUIKgq3LASBZCBf…OVlOqR_ZkDnTxZGeKLAbdzSYtFU3ctzi8nCkBOcZPQW2jF7TT",
  //     sig: "05XqrtZ0EaFgmmqIQes-s-CMZLtPseox6Ot678SozI0eEVj3JN…tVxQaqnIS2wmSTprmfssn6Sq5fgjd9El9B675DimD1X0BgPDz",
  //     stoken: "FFFF0N00000000005BCF:1528364462094:0.4991030466169759",
  //     scene: "nc_message_h5"
  //   }
  // }
  let str = typeof arg === 'object'?JSON.stringify(arg):arg;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.verifyLogin(str)
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("verifyLogin", str, function (response) {

        });
      });
    }
  })
}

function syJsbSignin(param){
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.signin(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("signin", jsonParam, function (response) {
        });
      });
    }
  })
}
function appBackTabbarIndex(index,isReload){
  var param={
    tabBarIndex:index,
    selectedIndexIsReload:isReload
    }
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      window.history.go(-1)
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.backTabbarIndex(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("backTabbarIndex", jsonParam, function (response) {
        });
      });
    }
  })
}
function appUnBack(){
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.unBack();
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("unBack", null, function (response) {
        });
      });
    }
  })
}
function appRefreshTabbarIndex(index,isReload){
  var param={
    tabBarIndex:index,
    selectedIndexIsReload:isReload
  }
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      // syJsb.unBack();
    } else if (platform == 'ios'||platform == 'iphoneX') {
      let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("refreshTabbarIndex", jsonParam, function (response) {
        });
      });
    }
  })
}
//callback:fn
function appNotify(param) {
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
     syJsb.notify(jsonParam);
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("notify", jsonParam, function (json_data) {
        });
        // bridge.registerHandler(param.callback, function (json_data) {
        //   eval(param.callback + "('" + json_data + "')");
        // });
      });
    }
  })
}
//通知ios我的首页未读消息数
function syJsbMsgNum(param) {
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      // syJsb.msgNum(jsonParam);
      return;
    } else if (platform == 'ios'||platform == 'iphoneX') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("msgNum", jsonParam, function (json_data) {
        });
        // bridge.registerHandler(param.callback, function (json_data) {
        //   eval(param.callback + "('" + json_data + "')");
        // });
      });
    }
  })
}

/**
 * 长按保存图片
 * */
function syJsbClickImage(obj){
  var jsonParam = typeof obj === 'object'?JSON.stringify(obj):obj;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    /*console.log('syJsbClickImage');
    console.log(jsonParam);*/
    // var info='';
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    /* console.log(platform);
    if( isAndroid()){
     var platform =appInfo.platform;
     }else {
     var data = eval('(' + appInfo + ')');
     var json_data = { platform: data.platform, from: data.from ,did: data.did,ver:data.ver,token:data.token};
     info = JSON.stringify(json_data);
     var platform = JSON.parse(info).platform;
     }*/
    if (platform == 'android') {
      // console.log('syJsbClickImage android')
      syJsb.clickImage(jsonParam);
    } else if (platform == 'ios') {
      // console.log('syJsbClickImage ios')
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("clickImage", jsonParam, function (response) {
        });
      });
    }
    // console.log("end")
  });
}

// 废弃
function loadState(param) {
  let jsonParam = typeof param === 'object'?JSON.stringify(param):param;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    if(typeof appInfo=='string'){
      appInfo=JSON.parse(appInfo)
      var platform = appInfo['platform'];
    }else{
      var platform = appInfo['platform'];
    }
    if (platform == 'android') {
      syJsb.loadState(jsonParam);
    }
  })
}

const app={
  isIos,//判断是否是ios
  isAndroid,//判断是否是android
  parse,//转译字符串
  iosParam,//解析ios参数
  setupWebViewJavascriptBridge,//ios app与页面交互的方法
  syJsbIosRegisterHandler,//ios  registerHandler
  syJsbGetAppInfo,//获取appinfo
  syJsbGetToken, // 获取token
  syJsbStoreToken, // 存储token
  syJsbCallApp,//调用app的接口 params json字符串 {method: 原生方法名,params:{ key:value}}
  syJsbGetNewVersion,//版本更新
  syJsbShare,//定制分享
  syJsbInviteShare,//邀请有礼分享
  syJsbLaunchWebview,
  appOpen,//打开新页面
  appOpenMode,  // 其他方式打开app页面
  syJsbOpenNewPage,//定制app打开新页面
  syJsbCloseAppPage, // 关闭当前页，
  syJsbAliPay,//支付宝支付
  syJsbWxPay,//微信支付
  syJsbUploadImage,//app上传图片//-------------------
  showToast,//显示toast
  syJsbSetRightItem,//设置导航右边按钮
  syJsbSetLeftItem,//返回按钮
  appLogin,//登录
  appLogout,//退出
  syJsbUploadFile,//上传图片
  syJsbGetClientInfo,
  wxLogin,//微信绑定
  nativeAlert,//原生彈框
  leadEvalue,//评价引导
  getNewVersion,
  netStateFn,//网络请求
  setNet,//
  setAppData,//存储数据
  getAppData,//获取数据
  jsCallPhone,//打电话
  m7Chat,//客服咨询
  syJsbSignin,// 弹窗签到
  appOpenUnSlide, //打开的ios页面是否有侧滑
  aliVerify, // 阿里弹窗验证
  verifyLogin,
  appBackTabbarIndex,//跳转指定tableBar页面
  appUnBack,//禁止物理键侧滑返回
  appRefreshTabbarIndex,//ios 刷新table bar 页面 ios 私有
  appNotify,//app通知
  loadState,  // 测试速度
  syJsbMsgNum,//通知ios我的首页未读消息数
  syJsbClickImage,//长按保存图片
  };
export default app;
