<template>
  <div style="height: 100%;display: flex;flex-direction:column">
    <div style="display: flex;top: 0;height: 0;">
      <downLoad></downLoad>
    </div>
    <div class="wrapper" style="flex: 1">
      <div class="pay-order" :class="{'peijuan':pay}">
        <div class="cir cir-one"></div>
        <div class="cir cir-two"></div>
        <div class="cir cir-three"></div>
        <div class="cir cir-four"></div>
        <div class="cir cir-five" v-if="pay"></div>
        <div class="cir cir-six" v-if="pay"></div>
      </div>
      <div class="po-div">
        <img :src="imgUrl+'/common/pays.png'" alt=""
             class="success-img" :class="{'marginTop20':!flag}">
        <h2 class="title">订单已支付成功</h2>
        <div v-if="pay" style="width:100%;text-align:center;height:0.36rem;font-size:0.24rem;font-weight: 300;color:rgba(148,148,148,1);line-height:0.36rem;">订单完成后您将获得{{gainData.sendPoints}}积分</div>
        <div v-if="!flag" style="width:4.97rem;height:0.7rem;font-size:0.32rem;color:rgba(255,255,255,1);background:rgba(255,25,25,1);border-radius:0.08rem;margin:0 auto;margin-top: 0.3rem;line-height: 0.7rem;text-align: center" @click="goIndex">返回首页</div>
        <p class="watch-more" @click="watchOrder" v-if="!flag"> 查看订单 ></p>
        <p class="money" v-if="false">合计现金：￥{{gainData.helpFeeStr}}</p>
        <div class="btn-one" v-if="false" @click="inviteFirends">邀请朋友一起帮扶</div>
        <div class="btn-one btn-two" v-if="false">查看订单</div>
        <div class="second-div" v-if="pay">
          <div class="donation">
            <span>扶贫捐赠：￥</span>&nbsp;
            <div style="position: relative;overflow:hidden;;display: inline-block">
              <div v-for="n in numberArr" :style="'float: left;margin: 0 '+(n=='.'?0:0.1)+'rem'">
                <number-scroll :num="n" :time="900+20*n" v-if="n!=='.'"></number-scroll>
                <div v-if="n=='.'">.</div>
              </div>
            </div>
          </div>
          <img v-lazy="shareUrl" alt="" style="width: 6.2rem;height:2.6rem;margin: 0.3rem auto;display: block;" >
          <p class="watch-more" @click="watchOrderPro" v-if="share.unionInfo.wealUrl!=''"> 查看项目详情 </p>
        </div>
      </div>
      <div class="footer" v-if="false">
        <span class="gry">—— </span>平台谨代表 <span class="org">{{gainData.poorCount}}</span>位贫困户，感谢您的爱心善举 <span class="gry"> ——</span>
      </div>
    </div>
  </div>
</template>

<script>
  import * as type from '../../requests/order'
  const qs = require("qs")

  import numberScroll from '@/components/common/numberScroll.vue'
  import downLoad from "@/components/common/downLoad.vue"

  import ua from '../../modules/_ua/browserUa'
  var uaA = ua();
  export default {
    components: {
      numberScroll,
      downLoad
    },
		data() {
			return {
        pay:false,
        flag:/isShare=yes/ig.test(window.location.href),
        numberArr:'',
        gainData:{
          payFeeStr: 0,
          poorCount:0,
          chooseType:'',
          helpFeeStr:'',
        },
        share:{
          unionInfo:{
            wealIcon:'',
            wealUrl:''
          }
        },
        shareUrl:this.imgUrl+'/index/order-bg2.png'+this.ossUrl('webp_480'),
        openInfo:{
          iosUrl:"pwcn://xxx",                 //打开IOS客户端链接
          androidUrl:"sypwcn://com.syrs.pwcn/openwith",  //打开android客户端的链接
//                    downloadIosUrl:"http://itunes.apple.com/cn/app/id1240761571?mt=8",  //appstore 客户端连接
          downloadIosUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn",  //appstore 客户端连接
          downloadAndroidUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn"  //应用宝下载客户端
        },
      }
		},
    filters:{
      changeNumber(num){
        var a = num.toString().split('.')
        if(!a[1]){
          a[1]='00'
        }
        var c = a[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+'.'+a[1];
        return c;
      }
    },
		created() {
      this.pay=true
      this.getData()
      this.setAppData({ 'h5Key': 'chooseType' , 'h5Value' :''})
      var data={mainId:this.$route.query.mainId||''}
      type['getSuccessPageInfo'](data).then((res)=>{
        if(res.data.code==200){
          this.share=res.data.data
          this.share.unionInfo.wealIcon?this.shareUrl=this.share.unionInfo.wealIcon+this.ossUrl('webp_960'):this.shareUrl=this.imgUrl+'/index/order-bg2.png'+this.ossUrl('webp_480')
          if(this.share.unionInfo==''){
            this.pay=false
          }
          if(this.share.orderType == 20 ){
              this.pay=false
            }
          var query={mainId:this.$route.query.mainId,isShare:'yes'}
          var that=this
          var url = window.location.origin + '/orderShare' + (query?'?'+qs.stringify(query):'')
          this.$header.rightFn({
            type:'img',
            url:require('../../../static/images/common/share.png'),
            callback:function () {
              that.syJsbShare({
                title:'[爱・源于善] 购买这些爱心产品能扶贫，我已下单，你也看看？',
                text:that.share.goodsInfo.goodsName,
                url :url,
                logo :that.share.goodsInfo.goodsImage,
                sms:"[签名]爱・源于善，您的好友购买了爱心产品，推荐您也看看："+url//短信相关
              })
            }
          })
        }
      })
		},
    mounted(){
		  var that=this
      this.appUnBack()
      this.$header.hideBack=false;
      this.$header.setTitle('支付结果')
//      var flag = /isShare=yes/ig.test(window.location.href)
//      if(this.flag){
//        setTimeout(()=>{
//          this.open()
//        },5000)
//      }
    },
		methods: {
      goIndex(){
        this.appBackTabbarIndex(1,0)
      },
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
		  getData(){
        var data={
          outTradeNo:this.$route.query.mainId||'',
          payWay:this.$route.query.payWay||''
        }
        type['getAffirmPayResult'](data).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
//            res.data.data.helpFeeStr=9999
            this.gainData=res.data.data
            this.numberArr=this.gainData.helpFeeStr.toString().split('')
//            this.gainData.sendPoints=25.63
//            if(this.gainData.orderType == 20 ){
//              this.pay=false
//            }
          }
        })
      },
      inviteFirends(){
      },
      watchOrderPro(){
        var url = this.share.unionInfo.wealUrl
        if(this.flag){
          if (/\?/.test(url)) {
            url += '&isShare=yes'
          }else{
            url += '?isShare=yes'
          }
        }
        this.appOpen('webOutside',{url:encodeURIComponent(url)})
      },
      watchOrder(){
        this.appOpen('consumRecord',{chooseType :'receive',payment:'payIndex'})
      }
    }
	}
</script>

<style lang="scss" scoped>
  .marginTop20{
    margin-top: 0.6rem !important;
  }
  .num-box{
    height:.4rem;
    line-height: .4rem;
    overflow: hidden;
    .num-item{
      transition: margin-top 2s;
    }
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
  .cir-five{
    width: 18px;
    height: 18px;
    left: -9px;
    transform: translateY(10px);
    background: #ff3f26;
    bottom:50%;
    z-index: 99;
  }
  .cir-six{
    width: 18px;
    height: 18px;
    right: -9px;
    transform: translateY(10px);
    background: #ff3f26;
    bottom:50%;
    z-index: 99;
  }
  .second-div{
    position: absolute;
    top: 55%;
    width: 100%;

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
  .peijuan::after{
    content: '';
    display: inline-block;
    position: absolute;
    top:50%;
    width: 6.9rem;
    border: 1px dashed rgba(255,25,25,1);;
  }
  .gry{
    font-weight: 300;
    color: #D0D0D0;
    opacity: 0.5;
  }
  .org{
    color: #FF6533;
  }
  .footer{
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.4rem;
    position: fixed;
    bottom: 0.7rem;
    text-align: center;
    width:100%;

  }
  .footer::after{
    width:0.3rem;
    height:0.02rem;
    background: #D0D0D0;
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
    margin-top: 1.4rem;
    margin-bottom: 0.23rem;
  }
  .title{
    height:0.5rem;
    font-size:0.36rem;
    text-align: center;
    color:rgba(46,46,46,1);
    line-height:0.5rem;
  }
  .money{
    text-align: center;
    height:0.37rem;
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
    line-height:0.37rem;
  }
  .btn-one{
    width: 6.9rem;
    margin: 0 auto;
    margin-top: 1.17rem;
    margin-bottom: 0.44rem;
    height:0.88rem;
    font-size:0.32rem;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    text-align: center;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
  }
  .btn-two{
    margin-top: 0;
    color:rgba(46,46,46,1);
    border-radius: 0.16rem ;
    border: 1px solid #D0D0D0;
    background: #fff;
  }
</style>
