<template>
  <div class="wrapper">
    <div class="pay-order">
      <div class="cir cir-one"></div>
      <div class="cir cir-two"></div>
      <div class="cir cir-three"></div>
      <div class="cir cir-four"></div>
    </div>
    <div class="po-div">
      <img :src="imgUrl+'/common/payfail.png'" alt=""
           class="success-img" :class="{'height1rem':!isShare}">
      <h2 class="title">支付异常</h2>
      <p class="title-un"> 若您已付款，请勿重新支付，我们正在持续查询支付结果 如有疑问请致电 <a :href="!p?'tel:4006667308':'javascript:void(0)'"><span @click='phone' class="blue">4006667308</span></a></p>
      <p class="watch-more" @click="watchOrder"  v-if="!flag" > 查看订单 ></p>
      <section v-show="!isShare" class="download" >
        <div style="width: 6.9rem;margin: 0 auto;display: flex" class="loaded">
          <div><img :src="imgUrl+'/common/about1.png'" alt="" style="width:0.66rem;height:0.65rem;"></div>
          <div>
            <p style="height:0.4rem;font-size:0.28rem;color:rgba(75,75,75,1);line-height:0.4rem;">安装公益中国APP</p>
            <p style="height:0.4rem;font-size:0.24rem;font-weight: 300;color:rgba(75,75,75,1);line-height:0.33rem;">查看订单详情，关注配送信息</p>
          </div>
          <div>
            <button @click="open" style="width:1.77rem;height:0.62rem;background:rgba(255,25,25,1);border-radius:0.08rem;font-size:0.36rem;font-weight: 300;text-align: center;color:rgba(255,255,255,1);line-height:0.62rem;">打开APP</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import ua from '../../modules/_ua/browserUa'
  var uaA = ua();
  export default {
    data() {
      return {
        flag:/isShare=yes/ig.test(window.location.href),
        p:true,
        isShare:true,
        openInfo:{
          iosUrl:"pwcn://xxx",                 //打开IOS客户端链接
          androidUrl:"sypwcn://com.syrs.pwcn/openwith",  //打开android客户端的链接
//                    downloadIosUrl:"http://itunes.apple.com/cn/app/id1240761571?mt=8",  //appstore 客户端连接
          downloadIosUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn",  //appstore 客户端连接
          downloadAndroidUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn"  //应用宝下载客户端
        },
      }
    },
    created() {
      if(this.flag){
        this.isShare=false
//        setTimeout(()=>{
//          this.open()
//        },5000)
      }
      this.syJsbGetAppInfo(appInfo=>{
        if(appInfo){
          this.p=true
        }else{
          this.p=false
        }

      })
    },
    mounted(){
      this.appUnBack()
      this.$header.hideBack=false;
      this.$loading.show=false
      this.$header.setTitle('支付结果')
    },
    methods: {
      open(){
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
                  h5url && appInstall.openH5(h5url);
                }
              },appInstall.timeout)
            },
            openApp:function(appurl){
              if (uaA.isSafari) {
                win.location.href = appurl;
              }else{          //safrie不管用 和下面的二选一
                getIntentIframe().src = appurl;
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
        mobileAppInstall.open(openSrc,downSrc)
      },
      phone(){
        this.jsCallPhone('4006667308')
      },
      watchOrder(){
        this.appOpen('consumRecord',{chooseType :'pay',payment:'payIndex'})
      }
    },
  }
</script>

<style lang="scss" scoped>
  .loaded{
    justify-content: space-between;
    align-items:center;
    padding:0 0.35rem;
    box-sizing: border-box;
  }
  .loaded>div{
    float: left;
  }
  .height1rem{
    margin-top: 1rem !important;
  }
  .download{
    height: 1rem;
    margin-top: 1.58rem;
   }
  .cir{
    position: absolute;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  .cir-one{
    left: -15px;
    top:-15px;
    background: #ff1b1a;
  }
  .cir-two{
    right: -15px;
    background: #ff1b1a;
    top:-15px;
  }
  .cir-three{
    left: -15px;
    background: #ff6433;
    bottom:-15px;
  }
  .cir-four{
    right: -15px;
    background: #ff6433;
    bottom:-15px;
  }
  .donation{
    transform: translateX(-50%);
    margin-left: 50%;
    font-size:0.28rem;
    color:rgba(255,101,51,1);
    line-height:0.4rem;
    width: 6.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .watch-more{
    padding-top:0.3rem;
    width:100%;
    height:0.36rem;
    font-size:0.26rem;
    text-align: center;
    text-decoration: underline;
    margin-top: 0.2rem;
    color:rgba(255,25,25,1);
    line-height:0.36rem;
  }
  .po-div{
    height: 100%;
    position: absolute;
    z-index: 20;
    top: 0;
    width: 6.9rem;
    margin-left: 0.3rem;
  }
  .pay-order{
    position: relative;
    display: block;
    margin: 0 auto;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    background: #fff;
    width: 6.9rem;
    height: calc(100% - 0.3rem);

  }
  .wrapper{
    box-sizing: border-box;
    padding-bottom: 0.3rem;
    background:linear-gradient(180deg,rgba(255,25,25,1),rgba(255,101,51,1));
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .success-img{
    border: 0;
    display: block;
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    margin-top: 1.6rem;
    margin-bottom: 0.23rem;
  }
  .title-un{
    margin: 0 auto;
    width:6rem;
    height:0.72rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    text-align: center;
    line-height:0.36rem;
  }
  .blue{
    color:#007AFF
  }
  .title{
    height:0.5rem;
    font-size:0.36rem;
    text-align: center;
    color:rgba(46,46,46,1);
    line-height:0.5rem;
  }
</style>
