import axios from 'axios'
import bridge from '../modules/_appjs/bridge'
import sy from '../../config/sy3.0'
import qs from 'qs'
import cookie from 'vue-cookies'
axios.defaults.withCredentials = false
axios.defaults.baseURL = process.env.NODE_ENV === 'production'?sy.api_production:sy.api_dev;
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if (config.method === 'post') {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // axios.defaults.headers.post['Content-Type'] = 'application/json'
    config.data = qs.stringify(config.data);
    // config.data = config.data;

  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据处理
  if(res.status!=200){
    var str=/index|mine|bizIndex|hometownGoods/ig.test(window.location.href)
    if(!str){
      window.location.href = '/500'
    }
  }
  return res
}, (error) => {
  return Promise.reject(error);
})

function method(type, url, params) {
  return axios[type](url, params)
    .then(response => {
      if (response && response.data && response.data.code == 403) {
        bridge.syJsbGetAppInfo(function (appInfo) {
          if(!appInfo){
            let callbackUrl = encodeURIComponent(window.location.href);
            // bridge.appOpen()
            window.location.href = window.location.protocol+'//'+window.location.host+'/code_login?callback=' + callbackUrl
          }else{
            bridge.appLogin()
          }
        })
      }
      return (response && response.data);
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
function get(url, params = {}) {
  let tmp = params;


  url += url.indexOf('?') > -1 ? '&' + qs.stringify(tmp) : '?' + qs.stringify(tmp);
  return method('get', url)
}
function post(url, params = {}) {
  return method('post', url, params)
}
function withToken(type,url,params){
  return new Promise((resolve, reject) => {
    bridge.syJsbGetAppInfo( function(appInfo){
      if(!appInfo) {
        var Cookie = require('tiny-cookie');
        let token = Cookie.get('token')
        let tmp = params||{};
            tmp['token']=token
        if (/\?/.test(url)) {
          url += '&'+qs.stringify(tmp)
        }else{
          url += '?'+qs.stringify(tmp)
        }
        method(type, url,params).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }else{
        if(typeof appInfo =='string'){
          appInfo = JSON.parse(appInfo)
        }
        let tmp = params||{};
        let finalToken = appInfo['token'];
        // if(!finalToken) {
        //   var Cookie = require('tiny-cookie');
        //   finalToken = Cookie.get('token')
        // }
        tmp['token'] = finalToken;
        if (/\?/.test(url)) {
          url += '&'+qs.stringify(tmp)
        }else{
          url += '?'+qs.stringify(tmp)
        }
        method(type, url).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }
    })
  })
}
function getWithToken(url, params) {
  return withToken('get',url,params)
}
function deleteWithToken(url,params){
  return withToken('delete',url,params)
}
function postWithToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    bridge.syJsbGetAppInfo( function(appInfo){
      if(!appInfo) {
        var Cookie = require('tiny-cookie');
        let token = Cookie.get('token')
        let request_data = params
        request_data['token'] = token
        method('post',url, request_data).then(data=>{
          resolve(data)
        }).catch(err=>{
          reject(err)
        })
      }else{
        if(typeof appInfo =='string'){
          appInfo = JSON.parse(appInfo)
        }
        let token = appInfo['token'];
        // if(!token) {
        //   var Cookie = require('tiny-cookie');
        //   token = Cookie.get('token')
        // }
        params.token = token;
        method('post',url, params).then(data=>{
          resolve(data)
        }).catch(err=>{
          reject(err)
        })
      }
    })
  })
}
export default {get, post, getWithToken, postWithToken,deleteWithToken}

