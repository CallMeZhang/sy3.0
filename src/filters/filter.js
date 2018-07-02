import Vue from 'vue'

function addZero(val){
  return val < 10?"0" +val:val
}

/*  时间格式化  formatTime
*  @params  vlaue:当前的时间  type: 格式化类型  join:以什么符号分割
* *
* */
function formatTime(value,type,join){
    var dataTime="";
    var data = new Date();
    data.setTime(value);
    var year   =  data.getFullYear();
    var month  =  addZero(data.getMonth() + 1);
    var day    =  addZero(data.getDate());
    var hour   =  addZero(data.getHours());
    var minute =  addZero(data.getMinutes());
    var second =  addZero(data.getSeconds());
    var add = join || '/'
    if(type == "YMD" || !type){
      dataTime =  ''+year + add + month + add + day;
      // console.log(year)
    }else if(type == "YMDHMS"){
      dataTime = ''+year + add + month + add + day + " " +hour+ ":"+minute+":" +second;
    }else if(type == "HMS"){
      dataTime = ''+hour+":" + minute+":" + second;
    }else if(type == "YM"){
      dataTime = ''+year + add + month;
    }else if(type == 'china'){
      dataTime = ''+year + '年' + month + '月' + day + '日'
    }else if(type == 'MD'){
        dataTime = ''+month + add + day;
    }else if(type == 'HM'){
        dataTime = ''+hour+":" +minute;
    }
    return dataTime;//将格式化后的字符串输出到前端显示
}
Vue.prototype.formatTime = formatTime
Vue.filter("formatTime",formatTime);

/*   数字加千分号  formatComma
*     @params  str:格式化数字
* */
function formatComma(str){
  return (str+'').split('').reverse().reduce((prev,next,index)=>{
    return((index%3)?next:(next+','))+prev
  })
}
Vue.prototype.formatComma = formatComma
Vue.filter("formatComma",formatComma);

/*
*   保留两位小数
*   @params  num:保留小数位数 默认保留两位
* */
function toFloat(value,num=2){
  try{
    return parseFloat(value).toFixed(num)
  }catch (e){
    let v=Math.round(parseFloat(value)*Math.pow(10,num))/Math.pow(10,num);
    let s=v.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + num) {
      s += '0';
    }
    return s
  }
}
Vue.prototype.toFloat = toFloat
Vue.filter("toFloat",toFloat);

//超过一万四舍五入并保存两位小数
function wan(value){
    value = parseFloat(value);
    if (value) {
        if (value>=10000) {
            var v = Math.round(value/100);
            return (v/100).toFixed(2) + '万';
        }else{
            return value;
        }
    }else{
        return 0
    }
}
Vue.prototype.wan = wan;
Vue.filter("wan",wan);
