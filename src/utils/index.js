import Vue from 'vue'

// 校验手机号
Vue.prototype.checkPhone = function (num) {
  let phone = /^1[0-9]{10}$/;
  return phone.test(num)
};

// 校验身份证号
Vue.prototype.checkCard = function (num) {
  let isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  return isIDCard.test(num)
}

// 校验银行卡号
Vue.prototype.checkBankCard = function (num) {
  if (!num) return false;
  if (num.length < 16 || num.length > 19) {
    return "银行卡号长度必须在16到19之间";
  }
  let numTmp = /^\d*$/; //全数字
  if (!numTmp.exec(num)) {
    return "银行卡号必须全为数字";
  }
  //开头6位
  let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if (strBin.indexOf(num.substring(0, 2)) === -1) {
    return "银行卡号开头6位不符合规范";
  }
  return true
}
Vue.prototype.checkCorporateCard = function (num) {
  if (!num) return false;
  if (num.length < 12 || num.length > 19) {
    return "银行卡号长度必须在12到19之间";
  }
  let numTmp = /^\d*$/; //全数字
  if (!numTmp.exec(num)) {
    return "银行卡号必须全为数字";
  }
  //开头6位
  let strBin = "01,10,18,30,32,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if (strBin.indexOf(num.substring(0, 2)) === -1) {
    return "银行卡号开头6位不符合规范";
  }
  return true
}

// 校验邮箱
Vue.prototype.checkMail = function (mail) {
  let a = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/;
  return a.test(mail)
}

// 判断是否是微信浏览器
Vue.prototype.inWeixin = ()=>{
  var ua = window.navigator.userAgent.toLowerCase();
  return  ua.match(/MicroMessenger/i) == 'micromessenger'
}

// 判断是否是空对象
Vue.prototype.isEmpty = function (obj) {
  for (var k in obj) {
    return false
  }
  return true;
};

// 数组去重
Vue.prototype.removeArr = function (arr) {
  var n = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) == i) n.push(arr[i]);
  }
  return n;
};
Vue.prototype.removeJsonArr = function (array, key) {
    if (!array.length) {
    return []
  }
  var result = [JSON.parse(JSON.stringify(array[0]))];
  for (var i = 1; i < array.length; i++) {
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(JSON.parse(JSON.stringify(item)));
    }
  }
  return result;
}

// 获取
Vue.prototype.getQuery = (name)=>{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return unescape(r[2]); return null;
}

// 获取时间字符串
  Vue.prototype.getDateStr = (val) => {
    function addZero(val) {
      return val < 10 ? "0" + val : val
    }
    var data = val ? new Date(val) : new Date();
    var year = data.getFullYear();
    var month = addZero(data.getMonth() + 1);
    var day = addZero(data.getDate());
    return '' + year + month + day
  };
Vue.prototype.isIphoneX = ()=>{
  return /iphone/gi.test(window.navigator.userAgent) && (window.screen.height == 812 && window.screen.width == 375)
};
Vue.prototype.getCookie=function (name) {
  var strCookie=document.cookie;
  var arrCookie=strCookie.split(";");
  console.log(arrCookie)
  for(var i=0;i<arrCookie.length;i++){
    var c=arrCookie[0].split("=");
    if(c[0]==name){
      return c[1];
    }
  }
  return "";
}

