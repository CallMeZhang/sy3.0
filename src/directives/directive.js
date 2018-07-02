import Vue from 'vue'
import Lazyload from '../../static/js/vue-lazyload'

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
Vue.directive('drag',function(block){
  let oW,oH;
  // 绑定touchstart事件
  block.addEventListener("touchstart", function(e) {
    let touches = e.touches[0];
    oW = touches.clientX - block.offsetLeft;
    oH = touches.clientY - block.offsetTop;
  },false);

  block.addEventListener("touchmove", function(e) {
    e.preventDefault();
    let touches = e.touches[0];
    let oLeft = touches.clientX - oW;
    let oTop = touches.clientY - oH;
    if(oLeft < 0) {
      oLeft = 0;
    }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
      oLeft = (document.documentElement.clientWidth - block.offsetWidth);
    }
    block.style.left = oLeft + "px";
    block.style.top = oTop + "px";
  },false);

  block.addEventListener("touchend",function() {
    block.removeEventListener("touchmove",null,false);
  },false);
});

Vue.directive('to-top',{
  inserted: function (el,data){
    if(data.value){
      window.scrollTo(0,el.offsetTop)
    }
  }
});
Vue.directive('urlreplace',{
  inserted: function (el,data){
  }
});

Vue.directive('img-cover',{
  inserted: function (el,data){
    function getStyle(element, property){
      var proValue;
      if (!document.defaultView) {
        proValue = element.currentStyle[property];
      } else {
        proValue = document.defaultView.getComputedStyle(element)[property];
      }
      return proValue;
    }
    var img = new Image();
    img.src = data.value;
    img.onload = ()=>{
      let imgWidth = img.width;
      let imgHeight = img.height;
      let parentHeight = parseInt(getStyle(el.parentElement, 'height'));
      let parentWidth = parseInt(getStyle(el.parentElement, 'width'));
      // let parentHeight = el.parentElement.offsetHeight;
      if(!imgWidth || !imgHeight || !parentWidth || !parentHeight){
        return
      }
      if(imgWidth/imgHeight > parentWidth/parentHeight){
        el.style.height=parentHeight +'px';
        el.style.width = parentHeight * imgWidth / imgHeight + 'px';
      }else{
        el.style.width = parentWidth + 'px';
        el.style.height = parentWidth * imgHeight / imgWidth + 'px';
      }
      // console.log(el.style.height)
      el.parentElement.style.overflow = 'hidden'
      if(getStyle(el.parentElement,'position') === 'static'){
        el.parentElement.style.position = 'relative'
      }
      el.style.position = 'absolute';
      el.style.left = '50%';
      el.style.top = '50%';
      // console.log(el.style.height)
      el.style.marginTop = -parseInt(el.style.height)/2 +'px'
      el.style.marginLeft = -parseInt(el.style.width)/2 +'px'
      el.style.maxWidth = el.style.width
    }
  }
});
Vue.directive('img-contain',{
  inserted: function (el,data){
    function getStyle(element, property){
      var proValue;
      if (!document.defaultView) {
        proValue = element.currentStyle[property];
      } else {
        proValue = document.defaultView.getComputedStyle(element)[property];
      }
      return proValue;
    }
    var img = new Image();
    img.src = data.value;
    img.onload = ()=>{
      let imgWidth = img.width;
      let imgHeight = img.height;
      let parentHeight = parseInt(getStyle(el.parentElement, 'height'));
      let parentWidth = parseInt(getStyle(el.parentElement, 'width'));
      // let parentHeight = el.parentElement.offsetHeight;
      if(!imgWidth || !imgHeight || !parentWidth || !parentHeight){
        return
      }
      if(imgWidth/imgHeight > parentWidth/parentHeight){
        el.style.width = parentWidth + 'px';
        el.style.height = parentWidth * imgHeight / imgWidth + 'px';
      }else{
        el.style.height=parentHeight +'px';
        el.style.width = parentHeight * imgWidth / imgHeight + 'px';
      }
      // console.log(el.style.height)
      el.parentElement.style.overflow = 'hidden'
      if(getStyle(el.parentElement,'position') === 'static'){
        el.parentElement.style.position = 'relative'
      }
      el.style.position = 'absolute';
      el.style.left = '50%';
      el.style.top = '50%';
      // console.log(el.style.height)
      el.style.marginTop = -parseInt(el.style.height)/2 +'px'
      el.style.marginLeft = -parseInt(el.style.width)/2 +'px'
      el.style.maxWidth = el.style.width
    }
  }
});
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 3,
  listenEvents:[ 'scroll', 'touchmove','wheel', 'mousewheel']

});
