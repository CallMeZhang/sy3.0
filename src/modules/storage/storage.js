/**
 * 设置ls参数key ,time 设置过期时间 毫秒值
 * @param key
 */
function setExpiresKey(key,t = 0) {
  if(getLsItem(key+'syTime')){
    return false;
  }
  var curTime = new Date().getTime() + t;
  setLsItem(key+'syTime', curTime)
}
/**
 * 判断ls参数key是否过期
 * @param key
 * @returns {boolean}
 */
function getExpiresKey(key) {
  var setTime = getLsItem(key+'syTime')
  if(!setTime) {
    return true
  }
  var curTime = new Date().getTime();
  if(curTime - setTime > 0){
    removeLsItem(key+'syTime')
    return true
  }
  return false
}
// 移除过期时间
function removeExpiresKey(){
  removeLsItem(key+'syTime')
}

function setLsItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
function getLsItem(key) {
  try{
    return JSON.parse(window.localStorage.getItem(key))
  }catch(e){
    return window.localStorage.getItem(key)
  }

}
function removeLsItem(key) {
  window.localStorage.removeItem(key)
}
function setSsItem(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}
function getSsItem(key) {
  try{
    return JSON.parse(window.sessionStorage.getItem(key))
  }catch(e){
    return window.sessionStorage.getItem(key)
  }
}
function removeSsItem(key) {
  window.sessionStorage.removeItem(key)
}
const storage = {setExpiresKey,getExpiresKey,removeExpiresKey,setLsItem,getLsItem,removeLsItem,setSsItem,getSsItem,removeSsItem}

export default storage;
