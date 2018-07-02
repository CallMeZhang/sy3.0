<template>
    <div v-if="isShare" style="height: 1rem;">
      <div class="fixed" style="z-index: 1999999; background: rgba(0, 0, 0, 0.5); width: 100%; height: 1rem;">
        <ul class="clearfix">
          <li class="fl" @click="isShare=false">
            <img :src="imgUrl+'/applyRefund/details-error.png'"
                 alt=""
                 style="width: 0.4rem; height: 0.4rem; vertical-align: middle; margin: 0.3rem 0.43rem 0 0.3rem;">
          </li>
          <li class="fl">
            <img :src="imgUrl+'/common/about1.png'" style="width: 0.66rem; height: 0.65rem; margin: 0.15rem 0.2rem 0px 0;">
          </li>
          <li class="fl" style="margin-top: 0.11rem;">
            <p style="font-size:0.28rem;color:rgba(255,255,255,1);">打开公益中国APP</p>
            <p style="font-size:0.24rem;font-weight: 300;color:rgba(255,255,255,1);">扶贫特产、故乡美味</p>
          </li>
          <li class="fr" @click="open" style="width:1.77rem;height:0.62rem;background:rgba(255,25,25,1);border-radius:0.08rem; text-align: center;line-height: 0.62rem;margin: 0.18rem 0.3rem 0 0">
            <a style="font-size:0.32rem;color:rgba(255,255,255,1);">打开APP</a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ua from '../../modules/_ua/browserUa'
    var uaA = ua();
    export default {
        props:['autoTrigger'],
        data() {
            return {
                isShare:/isShare=yes/ig.test(window.location.href),
                show:true,
                ios:true,
                openInfo:{
                    iosUrl:"pwcn://xxx",                 //打开IOS客户端链接
                    androidUrl:"sypwcn://com.syrs.pwcn/openwith",  //打开android客户端的链接
//                    downloadIosUrl:"http://itunes.apple.com/cn/app/id1240761571?mt=8",  //appstore 客户端连接
                    downloadIosUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn",  //appstore 客户端连接
                    downloadAndroidUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn"  //应用宝下载客户端
                },
                appInfo:false,              //环境信息  appInfo.platform
            }
        },
        computed:{
//            isShare(){
////                不出来的条件 ：
////                1。app环境
////                2。分享环境 && 是safari环境 && 非微信环境
//                var b = this.appInfo || (/isShare=yes/ig.test(window.location.href) && uaA.isSafari && (!uaA.isWx))
//                return !b;
//            }
        },
        created() {
            this.syJsbGetAppInfo(this.getAppInfocallBack);  //得到appInfo
        },
        mounted(){
//            console.log(uaA)
            if(this.autoTrigger){
                setTimeout(()=>{
                    this.open()
                },3000)
            }
        },
        methods:{
            getAppInfocallBack(res){
//                console.log('appInfo',res);
                this.appInfo = res;
            },
//            open(){
//                if (uaA.isIOS) {
//                    console.log(this.openInfo.iosUrl);
//                    window.location.href = this.openInfo.iosUrl;
//                }else{
//                    console.log(this.openInfo.androidUrl);
//                    window.location.href = this.openInfo.androidUrl;
//                }
//            },
            open(){
                var that = this;
                var mobileAppInstall = (function(){
                    var ua = navigator.userAgent,
                            loadIframe,
                            win = window;

                    function getIntentIframe(){
                        if(!loadIframe){
                            var iframe = document.createElement("iframe");
                            iframe.style.cssText = "display:none;width:0px;height:0px;";
                            document.body.appendChild(iframe);
                            loadIframe = iframe;
                        }
                        return loadIframe;
                    }

                    function getChromeIntent(url){
//                        return "intent://t.qq.com/#Intent;scheme=" + url + ";package=com.tencent.WBlog;end";
                        return "sypwcn://com.syrs.pwcn/openwith"
                    }

                    var appInstall = {
                        isChrome:ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
                        isAndroid:ua.match(/(Android);?[\s\/]+([\d.]+)?/),
                        timeout:800,
                        open:function(appurl,h5url){
                            var t = Date.now();
                            appInstall.openApp(appurl);
                            setTimeout(function(){
                                if(Date.now() - t < appInstall.timeout + 100){
//                                    console.log(132456)
                                    h5url && appInstall.openH5(h5url);
                                }
                            },appInstall.timeout)
                        },
                        openApp:function(appurl){
                            if (uaA.isWx) {
                                window.location.href = that.openInfo.downloadAndroidUrl;
                            }else{
                                if (uaA.isSafari) {
                                    win.location.href = appurl;
                                }else{          //safrie不管用 和下面的二选一
                                    getIntentIframe().src = appurl;
                                }
                            }


//                            if(appInstall.isChrome){
//                                if(appInstall.isAndroid){
//                                    win.location.href = getChromeIntent(appurl);
//                                }else{
//                                    win.location.href = appurl;
//                                }
//                            }else{
//                                getIntentIframe().src = appurl;
//                            }
                        },
                        openH5:function(h5url){
                            win.location.href = h5url;
                        }
                    }

                    return appInstall;
                })();
                this.ios = uaA.isIOS;
                var openSrc = this.ios ? this.openInfo.iosUrl : this.openInfo.androidUrl
                var downSrc = this.ios ? this.openInfo.downloadIosUrl : this.openInfo.downloadAndroidUrl
//                console.log(openSrc,downSrc)
                mobileAppInstall.open(openSrc,downSrc)
            }
        },
        components:{}
    }
</script>

<style lang="scss" scoped>

</style>
