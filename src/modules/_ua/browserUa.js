export default function () {
  /*
   * 浏览器相关信息
   * */
  var Browser = {
    getBrowser: function () {
      var UA = navigator.userAgent || '';
      var isAndroid = (function () {
        return UA.match(/Android/i) ? true : false;
      })();
      var isQQ = (function () {
        return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA);
      })();
      var isIOS = (function () {
        return UA.match(/iPhone|iPad|iPod/i) ? true : false;
      })();
      var isSafari = (function () {
        return /iPhone|iPad|iPod\/([\w.]+).*(safari).*!/i.test(UA);
      })();
      var isWx = (function () {
        return UA.match(/micromessenger/i) ? true : false;
      })()
      var isWb = (function () {
        return UA.match(/weibo/i) ? true : false;
      })();
      var isAndroidChrome = (function () {
        return (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ;
      })();
      var isQZ = (function () {
        return UA.indexOf('Qzone/') !== -1;
      })();
      var newBrowser = {
        isAndroid: isAndroid,
        isIOS: isIOS,
        isSafari: isSafari,
        isQQ: isQQ,
        isWb: isWb,
        isWx: isWx,
        isQZ: isQZ,
        isAndroidChrome: isAndroidChrome
      }
      return newBrowser;
    }()
  }
  return Browser.getBrowser;
}
