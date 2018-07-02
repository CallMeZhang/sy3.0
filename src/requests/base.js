import axios from 'axios'
import appjs from '@/modules/_appjs/index'
import bridge from '@/modules/_appjs/bridge.js'

axios.defaults.withCredentials = true
axios.interceptors.response.use((res) => {
  //对响应数据处理
  if(res.status!=200){
    var str=/index|mine|bizIndex|hometownGoods/ig.test(window.location.href)
    if(!str){
      window.location.href = '/500'
    }
  }
  if (res && res.data && res.data.code == 403) {
    bridge.syJsbGetAppInfo(function (appInfo) {
      if(!appInfo){
        let callbackUrl = encodeURIComponent(window.location.href);
        window.location.href = window.location.protocol+'//'+window.location.host+'/code_login?callback=' + callbackUrl
      }else{
         bridge.appLogin()
      }
    })
  }
  return res
}, (error) => {
  return Promise.reject(error);
});
/**
 * get请求请求该url数据
 * @param url
 *
 * @returns {Promise.<T>|*}
 */
function $httpGet (url) {
  return axios.get(url).catch(error => {
    window.location.href = '/500'
  });
}

function $httpGetWithToken(url) {
  return bridge.syJsbGetClientInfo().then((res)=> {
    if(res['platform'] === 'web') {
      var Cookie = require('tiny-cookie');
      let token = Cookie.get('token')
        if (/\?/.test(url)) {
            url += '&token=' + token
        }else{
            url += '?token=' + token
        }
      return $httpGet(url)
    } else {
      return new Promise(function (r, s) {
        bridge.syJsbGetAppInfo(function (appInfo) {
          if(typeof appInfo =='string'){
            appInfo = JSON.parse(appInfo)
          }
          // var Cookie = require('tiny-cookie');
          // Cookie.setRaw('token', appInfo['token'], {
          //   expires: 365
          // })
          var token = appInfo['token']
          var device_id = appInfo['did']
          if(!token) {
            var Cookie = require('tiny-cookie');
            token = Cookie.get('token')
          }
          url += '&token=' + token + '&did=' + device_id
          r(url)
        })
      }).then((url) => {
        return $httpGet(url)
      })
    }
  })
}

let qs = require("qs")
function $httpPost(url, data) {
  return axios.post(url, data).catch(error => {
    // window.location.href = '/500'
  });
}

function $httpPostWithToken(url, data) {
  return bridge.syJsbGetClientInfo().then((res)=> {
    if(res['platform'] === 'web') {
      var Cookie = require('tiny-cookie');
      let token = Cookie.get('token')
      let request_data = data
      request_data['token'] = token
      return $httpPost(url, request_data)
    } else {
      return new Promise(function (r, s) {
        bridge.syJsbGetAppInfo(function (appInfo) {
          if(typeof appInfo =='string'){
            appInfo = JSON.parse(appInfo)
          }
          // var Cookie = require('tiny-cookie');
          // Cookie.setRaw('token', appInfo['token'], {
          //   expires: 365
          // })
          var token=appInfo['token']
          var device_id = appInfo['did']
          if(!token) {
            var Cookie = require('tiny-cookie');
            token = Cookie.get('token')
          }
          let request_data = data
          request_data['token'] = token
          request_data['did'] = device_id
          r(request_data)
        })
      }).then((request_data) => {
        return $httpPost(url, request_data)
      })
    }
  })
}


export default {
  $httpGet,
  $httpGetWithToken,
  $httpPost,
  $httpPostWithToken
}
