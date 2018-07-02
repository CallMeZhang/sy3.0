import Vue from 'vue'

Vue.prototype.$confirm = function(text='提示',confirmFn,btnText){
  var sure = '确定';
  var cancel = '取消'
  var title = '';
  let titleDom = ''
  if(btnText){
    sure = btnText.sure;
    cancel = btnText.cancel;
    title = btnText.title || '手机号码登录'
  }
  if(title){
    titleDom = '<div style="text-align: center;padding-top:.37rem;font-size: .34rem;color:#2e2e2e">'+title+'</div>'
  }
  var body = document.getElementsByTagName("body")[0]
  if(document.getElementById('fx_confirm_content')){
    body.removeChild(document.getElementById('fx_confirm_content'))
  }
  let str = '<div class="mask" id="fx_confirm_content" style="z-index: 999999999999">'+
    '<div class="absolute" style="width:5.6rem;left:50%;top:50%;margin-left:-2.8rem;margin-top:-1.5rem;background: #fff;border-radius: .2rem;text-align: center">'+titleDom+
    '<div style="padding:.6rem .3rem;color:#999;font-size:.3rem;border-bottom: 1px solid #D2D3D5">'+text+
    '</div>'+
    '<div style="font-size: .36rem;" class="clearfix">'+
    '<div style="float: left;width:50%;box-sizing: border-box;padding:.2rem 0;" id="fx_cancel_btn">'+cancel+'</div>'+
    '<div style="float: right;width:50%;box-sizing: border-box;padding:.2rem 0;border-left:1px solid #D2D3D5;color:#4A90E2" id="fx_confirm_btn">'+sure+'</div>'+
    '</div>'+
    '</div>'+
    '</div>'
  var template = document.createElement('div')
  // template.id="fx_confirm_content";
  template.innerHTML = str;
  body.appendChild(template.children[0])
  // console.log(document.getElementById('fx_confirm_content'))
  document.getElementById('fx_cancel_btn').onclick = function(){
    body.removeChild(document.getElementById('fx_confirm_content'))
  };
  document.getElementById('fx_confirm_content').ontouchmove=function(event){
    event.preventDefault();
  };
  document.getElementById('fx_confirm_btn').addEventListener('click',confirmFn)
  document.getElementById('fx_confirm_btn').addEventListener('click',function(){
    body.removeChild(document.getElementById('fx_confirm_content'))
  })
}
Vue.prototype.$alert = function(text,fn,sure="确定"){
  var body = document.getElementsByTagName("body")[0]
  if(document.getElementById('fx_alert_content')){
    body.removeChild(document.getElementById('fx_alert_content'))
  }
  let str = '<div class="mask" id="fx_alert_content" style="z-index: 999999999999">'+
    '<div class="cen" style="width:5.6rem;background: #fff;border-radius: .2rem;text-align: center">'+
    '<div style="padding:.7rem .3rem;color:#999;font-size:.3rem;border-bottom: 1px solid #D2D3D5">'+text+
    '</div>'+
    '<div style="font-size: .36rem;" class="clearfix">'+
    '<div style="text-align:center;box-sizing: border-box;padding:.3rem 0;color:#4A90E2" id="fx_alert_btn">'+sure+'</div>'+
    '</div>'+
    '</div>'+
    '</div>'
  var template = document.createElement('div')
  // template.id="fx_alert_content";
  template.innerHTML = str;
  body.appendChild(template.children[0])

  document.getElementById('fx_alert_btn').addEventListener('click',fn)
  document.getElementById('fx_alert_btn').addEventListener('click',function(){body.removeChild(document.getElementById('fx_alert_content'))})
}
Vue.prototype.$alertTips = function(tipsT,text,btnT,fn){
  var tipsTitle = tipsT || "提示"
  var btnTxt = btnT || "确定"
  var body = document.getElementsByTagName("body")[0]
  if(document.getElementById('fx_alert_tips_content')){
    body.removeChild(document.getElementById('fx_alert_tips_content'))
  }
  let str = '<div class="mask" id="fx_alert_tips_content" style="z-index: 999999999999">'+
    '<div class="cen" style="width:5.6rem;background: #fff;border-radius: .2rem;text-align: center">'+
      '<div style="height:1rem;padding:0 0.3rem;font-size:0.36rem;color:rgba(46,46,46,1);line-height:1rem;text-align:center;">'+tipsTitle+'</div>'+
    '<div style="padding:0 0.3rem .2rem;color:#999;font-size:.3rem;line-height:0.5rem;text-align: center;border-bottom: 1px solid #D2D3D5">'+text+
    '</div>'+
    '<div style="font-size: .36rem;" class="clearfix">'+
    '<div style="text-align:center;box-sizing: border-box;padding:.3rem 0;color:#4A90E2" id="fx_alert_btn">'+btnTxt+'</div>'+
    '</div>'+
    '</div>'+
    '</div>'
  var template = document.createElement('div')
  // template.id="fx_alert_tips_content";
  template.innerHTML = str;
  body.appendChild(template.children[0])
  document.getElementById('fx_alert_tips_content').ontouchmove=function(event){
    event.preventDefault();
  };
  document.getElementById('fx_alert_btn').addEventListener('click',fn)
  document.getElementById('fx_alert_btn').addEventListener('click',function(){body.removeChild(document.getElementById('fx_alert_tips_content'))})
}
Vue.prototype.$toast = function(text,time=1500){
  var body = document.getElementsByTagName("body")[0]
  if(document.getElementById('fx_toast_content')){
    body.removeChild(document.getElementById('fx_toast_content'))
  }
  let str = `<div id="fx_toast" style="position: fixed;top:48%;;left:50%;margin-left:-2.7rem;z-index: 9999;background: #000;opacity:.7;border-radius: .1rem;width: 5.4rem;text-align: center;padding:.24rem .3rem;box-sizing: border-box">
        <p style="font-size: .32rem;color: #FFF;letter-spacing: 0;line-height: .45rem;">${text}</p>
      </div>`
  var template = document.createElement('div')
  template.id="fx_toast_content";
  template.innerHTML = str;
  template.style.zIndex = '99999999999999'
  body.appendChild(template)
  setTimeout(function(){
    if(document.getElementById('fx_toast_content')){
      body.removeChild(document.getElementById('fx_toast_content'))
    }
  },time)
};
Vue.prototype.$shortToast = function(text,time=1500){
  var body = document.getElementsByTagName("body")[0]
  if(document.getElementById('fx_toast_content')){
    body.removeChild(document.getElementById('fx_toast_content'))
  }
  let str = `<div id="fx_toast" style="position: fixed;top:48%;;left:50%;transform:translateX(-50%);z-index: 9999;background: #000;opacity:.7;border-radius: .1rem;max-width: 5.4rem;text-align: center;padding:.24rem .3rem;box-sizing: border-box">
        <p style="font-size: .32rem;color: #FFF;letter-spacing: 0;line-height: .45rem;">${text}</p>
      </div>`
  var template = document.createElement('div')
  template.id="fx_toast_content";
  template.innerHTML = str;
  template.style.zIndex = '9999'
  body.appendChild(template)
  setTimeout(function(){
    if(document.getElementById('fx_toast_content')){
      body.removeChild(document.getElementById('fx_toast_content'))
    }
  },time)
};
Vue.prototype.$scroll = callback => {
  window.addEventListener('scroll',function(){
    var timer;
    return function(){
      function innerScroll(){
        var offsetHeight = document.body.scrollHeight;
        var clientHeight = document.body.clientHeight;
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        if (offsetHeight - clientHeight - scrollTop <= 20 ) {
          callback()
        }
      }
      innerScroll()
      if(timer){clearTimeout(timer)}
      timer = setTimeout(innerScroll,100)
    }
  }())
};
Vue.prototype.$handleScroll = callback => {
  window.addEventListener('scroll',function(){
    var timer;
    return function(){
      function innerScroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var offsetHeight = document.body.scrollHeight;
        var clientHeight = document.body.clientHeight;
        var offset = offsetHeight - clientHeight - scrollTop;
        callback(scrollTop,offset)
      }
      innerScroll()
      if(timer){clearTimeout(timer)}
      timer = setTimeout(innerScroll,20)
    }
  }())
};
