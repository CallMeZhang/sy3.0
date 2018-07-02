// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './utils/index'
import  Vue from 'vue'
import App from './App'
import router from './router/index'
import bridge from './modules/_appjs/bridge.js'
import FastClick from 'fastclick'
import request from './requests/base_v2'
import vHeader from './components/common/v-header.vue'
import loading from './components/common/loading.vue'
import gHeader from './components/common/g-header.vue'
import 'babel-polyfill'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'


import './components/common/header'
import './directives/directive'
import './filters/filter'
import './dom/dom'
// import config from '../config/sy3.0'
Vue.use(VueAwesomeSwiper)
import storage from './modules/storage/storage'
const config = require('../config/sy3.0')

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
Object.keys(bridge).forEach((k)=>{
  Vue.prototype[k] = bridge[k]
});
Object.keys(storage).forEach((k)=>{
  Vue.prototype[k] = storage[k]
});
Object.keys(request).forEach((k)=>{
  Vue.prototype[k] = request[k]
});
// Vue.prototype.app = bridge
Vue.config.productionTip = false
Vue.prototype.imgUrl = (process.env.NODE_ENV === 'production'?config.assets_production:config.assets_dev) + '/images';
Vue.prototype.ossUrl = function (p) {
  var a={
        thumb_120:'thumb_120',
        thumb_240:'thumb_240',
        thumb_480:'thumb_480',
        thumb_960:'thumb_960',
        webp_120:'webp_120',
        webp_240:'webp_240',
        webp_480:'webp_480',
        webp_960:'webp_960',
        jpg_200:'jpg_200',
        jpg_690:'jpg_690',
        jpg_670:'jpg_670',
        jpg_750:'jpg_750',
        jpg_80:'jpg_80',
        jpg_480:'jpg_480',
      }
  if(!window.supportWebP&&p.split("_")[0]=='webp'){
    var m=''
    for(var key in a){
      if(p.split("_")[1]==a[key].split('_')[1]&&a[key].split('_')[0]!='webp'){
        m=a[key]
      }
    }
  }else{
    var m=p
  }
  return '?x-oss-process=style/'+a[m];
};
Vue.prototype.host = (process.env.NODE_ENV === 'production'?config.host_production:config.host_dev);
Vue.prototype.assetsUrl = (process.env.NODE_ENV === 'production'?config.assets_production:config.assets_dev);
Vue.prototype.appjs = bridge
Vue.prototype.syHomeTownId =config.syHomeTownId
Vue.component('v-header', vHeader)
Vue.component('g-header', gHeader)
/* eslint-disable no-new */
var timer=null
var promise1 = new Promise(function(resolve, reject) {
    var webpImg=document.createElement('img')
    webpImg.style.opacity=0
    webpImg.src='https://cdnm3.17shanyuan.com/static/images/30.webp'
    webpImg.onload=function () {
      if(this.width==30||this.width==window.screen.width){
        window.supportWebP=true
      }else{
        window.supportWebP=false
      }
      document.body.removeChild(this)
      resolve(true)
    }
    webpImg.onerror=function () {
      window.supportWebP=false
      document.body.removeChild(this)
      resolve(true)
    }
    document.body.appendChild(webpImg)
  timer=setTimeout(()=>{
      window.supportWebP=false
      resolve(true)
    },500)
  })
const constructor = Vue.extend(loading);
var instance = new constructor({
  el: document.createElement('div')
});
Vue.prototype.$loading=instance
instance.show = true;
document.body.appendChild(instance.$el);
promise1.finally(()=>{
  clearTimeout(timer)
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})

