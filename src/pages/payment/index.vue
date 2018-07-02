<template>
  <div class="wrapper-payment">

    <div class="not-net" v-if="netWork" @click="setNet">
      <span class="img-error"></span>网络请求失败，请检查您的网络设置
    </div>
    <div class="list-div border-bottom-1px">
      <div class="first border-bottom-1px">
       <p class="text">金额：<span class="red font-nor" v-if="orderData.usedPoints!=0">{{orderData.usedPoints}}</span>
         <span class="color-light" v-if="orderData.usedPoints!=0">积分</span> <span v-if="orderData.payFeeStr==0&&orderData.usedPoints==0">+</span>
         <span class="red font-nor" v-if="orderData.payFeeStr!=0">{{orderData.payFeeStr}}</span>
         <span class="color-light" v-if="orderData.payFeeStr!=0">元</span></p>
       <p class="text">
         数量：{{orderData.allNum}}件商品
       </p>
     </div>
      <div class="first second border-bottom-1px">
        <p class="text">请在<span class="red">{{parseInt(timeFn(time/60%60))+1}}</span>分钟内完成付款 </p>
        <p class="text">逾期订单将自动取消</p>
        <span class="red time" ref="time"></span>
      </div>
    </div>
    <div class="address-div">收货人</div>
    <div class="address-wrapper border-bottom-1px border-top-1px">
      <div class="li-wrapper">
        <div class="div-wrapper-first">
          <span class="name">{{address.reciverName}}</span>
          <span class="phone">{{address.reciverTel}}</span>
        </div>
        <div class="address">
          <span class="address-txt" style="-webkit-box-orient:vertical;-webkit-line-clamp:2;">{{address.areaInfo}}</span>
        </div>
      </div>
    </div>

    <div class="address-div">支付方式</div>

    <div class="list-div border-bottom-1px border-top-1px">
      <div class="pay-choose border-bottom-1px" v-if="false">
          <p class="title">中益钱包</p>
          <p class="text-small">仅支持中国银行卡</p>
          <img class='choose-img':src="img['zyqb']?require('../../../static/images/common/checked.png'):require('../../../static/images/common/cir.png')" alt="" @click="choosePay('zyqb')">
      </div>
      <div class="pay-choose pay-wx border-bottom-1px" v-if="wx">
          <p class="title">微信</p>
          <p class="text-small">推荐已安装微信客户端的用户使用</p>
          <img class='choose-img':src="img['wx']?require('../../../static/images/common/checked.png'):require('../../../static/images/common/cir.png')" alt="" @click="choosePay('wx')"></div>
      <div class="pay-choose pay-zfb border-bottom-1px" v-if="al">
          <p class="title">支付宝</p>
          <p class="text-small">推荐支付宝用户使用</p>
          <img class='choose-img':src="img['zfb']?require('../../../static/images/common/checked.png'):require('../../../static/images/common/cir.png')" alt="" @click="choosePay('zfb')"></div>
    </div>
    <div class="iphone10-footer-padding" style="position: fixed;bottom: 0;width: 100%;height: 0.98rem">
      <div class="submit" @click="submitOrder">
        立即支付
      </div>
    </div>

    <div class="mask" v-show="model">
      <div class="pop-model">
        <div class="model-title">提示</div>
        <div class="model-content"> 您确定要离开支付吗？ <br/>请在 <span class="red" ref="time2"></span>内完成支付，否则订单将被取消。</div>
        <div style="position: absolute;bottom: 0;width: 100%">
          <div class="flex border-top-1px">
            <button style="border-right: 0.6px solid #E3E3E3" @click="model=false">取消</button>
            <button @click="isOk">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import * as type from '../../requests/order'
  import bridge from '../../modules/_appjs/bridge'
  import pay from '../../modules/webPay/webPay'
  import browser from '../../modules/_ua/browserUa'
	export default {
		data() {
			return {
        model:false,
			  img:{
			    zyqb:false,
          wx:true,
          zfb:false
        },
        address:{},
        time:'',
        payType:'wx_app',
        mainId:'',
        timer:null,
        orderData:{},
        netWork:false,
        p_resolve:'',
        wx:true,
        al:true,
      }
		},
    mounted(){
		  var that=this
      window.netState=(p)=>{
        if(p==0){
          that.netWork=true
        }else{
          that.netWork=false
        }
        var p =p==0?'网络断开':'网络连接'
        this.showToast(p)
      }
      this.$header.setTitle('在线支付')
      this.$header.Handle(this.handle)
    },
    created(){
      this.appUnBack()
      this.netStateFn()
      this.payType="wx_app";
      this.checkPay()
      this.mainId = this.$route.query.mainId
      this.getWaitPayOrderDetail({mainId:this.mainId})
    },
		methods: {
      checkPay(){
        if(!/isShare=yes/ig.test(window.location.href)){
          this.wx=true;
          this.al=true;
        }else{
          if(browser().isWx){
            this.wx=true;
            this.al=false;
          }else{
            this.payType="ali_app";
            this.img={
              zyqb:false,
                wx:false,
                zfb:true
            }
            this.wx=false;
            this.al=true;
          }

        }
      },
      isOk(){
        this.model=false;
        this.p_resolve('payment')
      },
      handle(){
        this.model=true;
        var that=this
        return new Promise(function(resolve,reject){
          that.p_resolve=resolve
        })
      },
      submitOrder(){
        //支付方式 wx_public (微信公众号)
        // wx_app (微信原生支付)
        // ali_app (支付宝原生支付)
        // ali_h5  (手机网站支付)
        // boc_pay (中银支付)
        // boc_wallet (公益钱包支付)
        var data = {
          outTradeNo:this.mainId,
          payWay:this.payType
        }
        this.syJsbGetAppInfo(info=>{
          if(info){
            if(typeof info=='string'){
              appInfo=JSON.parse(info)
              var platform = info['platform'];
            }else{
              var platform = info['platform'];
            }
            type['getUnifiedOrder'](data).then((res)=>{
              if (res.data.code == 200) {
                let ad = res.data.data.unifiedResponse
                if(this.payType=='wx_app'){
                  var d=''
                  if(false){
                    d = {
                      package:"3.0.0",//没有实际意义
                      appid:ad.wxappUnifiedRspData.appid,
                      sign:ad.wxappUnifiedRspData.sign,
                      partnerid:ad.wxappUnifiedRspData.partnerid,
                      prepayid:ad.wxappUnifiedRspData.prepayid,
                      noncestr:ad.wxappUnifiedRspData.noncestr,
                      timestamp:ad.wxappUnifiedRspData.timestamp,
                      url_success:window.location.origin+'/success',
                      url_fail:window.location.origin+'/fail',
                      mainId:this.mainId,
                      payWay:'wx_app'
                    }
                  }else{
                    d = {
                      package:"3.0.0",//没有实际意义
                      appid:ad.wxappUnifiedRspData.appid,
                      sign:ad.wxappUnifiedRspData.sign,
                      partnerid:ad.wxappUnifiedRspData.partnerid,
                      prepayid:ad.wxappUnifiedRspData.prepayid,
                      noncestr:ad.wxappUnifiedRspData.noncestr,
                      timestamp:ad.wxappUnifiedRspData.timestamp,
                      url_success:window.location.origin+'/success_v1?payWay=wx_app&mainId='+this.mainId,
                      url_fail:window.location.origin+'/fail_v1',
                      mainId:this.mainId
                    }
                  }
                  bridge.syJsbWxPay(JSON.stringify(d));
                }else if(this.payType=='ali_app'){
                  let d=''
                  if(false){
                    d = {
                      data: ad.aliappUnifiedRspData,
                      url_success:window.location.origin+'/success',
                      url_fail:window.location.origin+'/fail',
                      mainId:this.mainId,
                      payWay:'ali_app'
                    }
                  }else{
                    d = {
                      data: ad.aliappUnifiedRspData,
                      url_success:window.location.origin+'/success_v1?payWay=ali_app&mainId='+this.mainId,
                      url_fail:window.location.origin+'/fail_v1',
                      mainId:this.mainId
                    }
                  }
                  bridge.syJsbAliPay(JSON.stringify(d));
                }else if(this.payType=='boc_pay'){
                  let d = {
                    data: ad.aliappUnifiedRspData,
                    url_syccess:ad.successUrl,
                    payWay:'boc_pay'
                  }
                  bridge.syJsbAliPay(JSON.stringify(d));

                }
              } else {

              }
            })
          }else{
            if(this.payType=='wx_app'){
              pay(this.mainId,()=>{
                this.postWithToken('/payment-center/payment/affirmPayResult',{outTradeNo:this.mainId,payWay:'wx_public'}).then(res=>{
                  if(res && res.code == 200){
                    this.appOpen('success_v1',{money:this.orderData.payFeeStr,mainId:this.mainId,payWay:'wx_public'})
                  }else{
                    this.appOpen('fail_v1',{isShare:'yes'})
                  }
                })
              },(error)=>{
                this.appOpen('fail_v1',{isShare:'yes'})
              })
            }else if(this.payType=== 'ali_app'){
              type['getUnifiedOrder']({outTradeNo:this.mainId,payWay:'ali_h5'}).then(res=>{
                if(res && res.data && res.data.code == 200){
                  window.location.href = res.data.data.unifiedResponse.aliwapUnifiedRspData
                }else{
                  this.$toast(res.data.message)
                }
              })
            }
          }
        })

      },
      timeFn(time){
        var time = (Array(2).join(0)+parseInt(time)).slice(-2)
        return time
      },
      choosePay(p){
        this.img.zyqb=false;
        this.img.wx=false;
        this.img.zfb=false;
        this.payType=''
        switch (p){
          case "zyqb": this.img.zyqb=!this.img.zyqb;this.payType="boc_pay";break;
          case "wx": this.img.wx=!this.img.wx;this.payType="wx_app";break;
          case "zfb": this.img.zfb=!this.img.zfb;this.payType="ali_app";break;
        }
      },
      getWaitPayOrderDetail(p){
        type['getWaitPayOrderDetail'](p).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            this.address={
              areaInfo:res.data.data.waitPayOrderDetail[0].areaInfo,
              reciverName:res.data.data.waitPayOrderDetail[0].reciverName,
              reciverTel:res.data.data.waitPayOrderDetail[0].reciverTel,
            }
            this.orderData=res.data.data
            this.setLsItem('payInfo',{outTradeNo:this.mainId,money:this.orderData.payFeeStr})
            if(this.orderData.expireTime<=0||!this.orderData.expireTime){
              this.$refs.time.innerText="支付超时"
              return;
            }
            this.time=this.orderData.expireTime
            var time=this.orderData.expireTime
            this.$refs.time.innerText=this.timeFn(time/3600)+":"+this.timeFn(time/60%60)+":"+this.timeFn(time%60)
            this.$refs.time2.innerText=this.timeFn(time/3600)+":"+this.timeFn(time/60%60)+":"+this.timeFn(time%60)
            this.timer=setInterval(()=>{
              time-=1
              this.$refs.time.innerText=this.timeFn(time/3600)+":"+this.timeFn(time/60%60)+":"+this.timeFn(time%60)
              this.$refs.time2.innerText=this.timeFn(time/3600)+":"+this.timeFn(time/60%60)+":"+this.timeFn(time%60)
              if(time<=0){
                clearInterval(this.timer)
                this.$refs.time.innerText="支付超时"
                this.$refs.time2.innerText="支付超时"
              }

            },1000)
          }else{
            this.$toast(res.data.message)
          }
        })
      },
    },
		components: {},
    destroyed() {
      clearInterval(this.timer)
    },
	}
</script>

<style lang="scss" scoped>
  .wrapper-payment{
    overflow: hidden;
    .model-content{
      width: 5rem;
      text-align: center;
      margin: 0 auto;
      height:1.5rem;
      font-size:0.32rem;
      color:rgba(46,46,46,1);
      line-height:0.5rem;
    }
    .model-title{
      height:1rem;
      font-size:0.36rem;
      text-align: center;
      color:rgba(46,46,46,1);
      line-height:1rem;
    }
    .pop-model{

      width:5.6rem;
      height:4.02rem;
      background:rgba(255,255,255,1);
      border-radius: 0.16rem ;
      position: fixed;
      top:50%;
      left: 50%;
      margin:-2.01rem 0 0 -2.8rem;
      overflow: hidden;
    }
    .flex{

      height: 1rem;
      position: relative;
      >button{
        height: 100%;
        width: 50%;
        float: left;
        line-height: 1rem;
        font-size:0.34rem;
        background: #fff;
        text-align: center;
        color:rgba(0,122,255,1);
      }

    }
  }

  .choose-img{
    width: 0.4rem;
    position: absolute;
    padding:0.38rem 0.4rem 0.38rem 0.9rem;
    top:0rem;
    right:0rem;
  }
  .img-error{
    float: left;
    display: inline-block;
    height: 100%;
    width: 0.3rem;
    margin-right: 0.2rem;
    background: url(../../../static/images/common/error-info.png) no-repeat center center;
    background-size: contain;
  }

  .not-net{
    height:0.6rem;
    padding-left: 0.3rem;
    background: rgba(255,248,248,1) url(../../../static/images/common/right.png) no-repeat 6.9rem center;
    background-size: 0.44rem;
    font-size:0.24rem;
    color:rgba(255,101,51,1);
    line-height:0.6rem;
  }
.submit{
  width: 100%;
  bottom: 0;
  text-align: center;
  font-size:0.32rem;
  color:rgba(255,255,255,1);
  line-height:0.98rem;
  height:0.98rem;
  background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
}
  .address-wrapper {
    overflow: hidden;
    .li-wrapper {
      overflow: hidden;
      text-align: left;
      padding-left: 0.8rem;
      height: 1.7rem;
      box-sizing: border-box;
      background: #fff url('../../../static/images/common/local@1.5x.png') no-repeat 0.27rem 0.25rem;
      background-size: 0.3rem;
      .div-wrapper-first {
        padding-top: 0.24rem;
        overflow: hidden;
        .name, .phone, .default {
          font-size: .30rem;
          float: left;
          color: rgba(75, 75, 75, 1);
        }
        .name {
          margin-right: 0.3rem;
          max-width: 1.1rem;
          overflow: hidden;
          line-height: 0.42rem;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .address {
        margin-top: 0.05rem;
        .address-txt {
          font-size: .26rem;
          line-height: .40rem;
          width: 6.4rem;
          display: inline-block;
          text-align: justify;
          font-weight: 300;
          color: rgba(75, 75, 75, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          display:-webkit-box;
        }
      }
    }
  }
  .address-div{

    height:0.7rem;
    font-size:0.26rem;
    color:rgba(148,148,148,1);
    line-height:0.7rem;
    padding-left: 0.3rem;
    background:rgba(250,250,250,1);
  }
  .title{
    margin-top: 0.24rem;
    height:0.42rem;
    font-size:0.3rem;
    color:rgba(75,75,75,1);
    line-height:0.42rem;
  }
  .text-small{
    height:0.33rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }

  .list-div{
    padding-left: 0.3rem;
    background: #fff;
  }
  .first{
    padding-top:0.27rem;
    box-sizing: border-box;
    height: 1.4rem;
  }
  .pay-choose:nth-last-of-type(1),.first:nth-last-of-type(1){
    &::after{
        border: 0;
    }
  }
  .pay-choose{
    position: relative;
height: 1.2rem;
    overflow: hidden;
    background: url(../../../static/images/common/zyqb.png) no-repeat left center;
    background-size: 0.6rem;
    padding-left: 0.8rem;
  }
  .pay-wx{
    background: url(../../../static/images/common/wx.png) no-repeat left center;
    background-size: 0.6rem;
  }
  .pay-zfb{
    background: url(../../../static/images/common/zfb.png) no-repeat left center;
    background-size: 0.6rem;
  }
  .second{
    position: relative;
    p{
      line-height:0.4rem;
      font-size: 0.26rem;
      font-weight: 300;
      color: #949494;
    }
    .time{
      font-size:0.32rem;
      position: absolute;
      right:0.39rem;
      top:.39rem;
      color:rgba(255,25,25,1);
    }
  }
.text{
  font-weight: 300;
  font-size:0.3rem;
  color:rgba(75,75,75,1);
}
.color-light{
  color: #2E2E2E;
}
.font-nor{
  font-weight: normal;
}
  .red{
    color: #FF1919;
  }
</style>
