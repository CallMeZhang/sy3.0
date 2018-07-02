function wxAuthorize(t,url,shareUrl) {
  document.title = t
  var div = document.createElement("div");

  div.style.display='none'
  var img1 = new Image();
  img1.src=url
  img1.style.width='300px'
  img1.style.height='300px'
  div.appendChild(img1)
  document.body.appendChild(div)
  window.history.pushState("weixin-share-url", "weixinshare", 'http://192.168.1.142:8080/index');//只可设置同域链接s
}
export default wxAuthorize
