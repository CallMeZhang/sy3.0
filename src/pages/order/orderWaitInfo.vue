<template>
  <div class="wrapper-top">
    <div class="header">
      <span class="order-statue" :class="isWait?'activity-bg':'activity-error'">{{orderText}}</span>
      <template v-if="isWait">
        <span class="time s-right">剩余时间：<span ref="time"></span><br>需付款：<span v-if="orderData.usedPoints!=0">{{orderData.usedPoints}} 积分 + {{orderData.payFeeStr}} 元 </span><span v-if="orderData.usedPoints==0">￥ {{orderData.payFeeStr}}</span></span>

      </template>
    </div>

    <div class="address-wrapper">
      <div class="li-wrapper">
        <div class="div-wrapper-first">
          <span class="name">{{address.reciverName}}</span>
          <span class="phone">{{address.reciverTel}}</span>
        </div>
        <div class="address">
          <span class="address-txt">{{address.areaInfo}}</span>
        </div>
      </div>
    </div>
    <div v-for="item in orderData.waitPayOrderDetail">
      <div class="blank border-bottom-1px border-top-1px"></div>
      <div class="content">
      <div class="shop border-bottom-1px" @click="goStore(item)">
        <img :src="item.storeLogo" alt="" class="head-img">
        <span class="comp-name no-enter">{{item.orderType|mingCheng}}<i style="font-style: normal" v-if="item.storeTye!=30&&item.storeTye!=20">{{item[choose(item.orderType).name]}}</i></span>
        <img :src="'/static/images/goods/fupinma.png'"  alt="" v-if="item.orderType==30">
        <img :src="'/static/images/wishList/go.png'"  alt="" style="height: 0.44rem;margin-top: 0.24rem;"  v-if="item.orderType!==20">
        <div class="s-right div-w12" @click.stop="callSeller(item[choose(item.orderType).phone])">联系ta</div>
      </div>
      <div class="goods-list  border-bottom-1px" v-for="ite in item.orderDetailGoodsVos"  @click="appOpen('goodsDetail',{goodsId:ite.goodsId})">
        <div style="overflow: hidden;">
          <img :src="ite.goodsImage + ossUrl('webp_240')" alt="">
          <div class="text">
            <p style="height: 0.8rem;text-align: justify;"><span style="margin-right:.06rem;color:#FF1919" v-show="item.tradeMode==1" :aa="item.tradeMode">预售 | </span>{{ite.goodsName}}</p>
            <span style="font-weight: 300">{{ite.specUnit}}</span>
            <div class="price">
              <!--<span class="s-left" v-if="orderData.orderType == '10'">{{ite.goodsPriceStr}}元</span>-->
              <!--<span class="s-left" v-else>{{ite.goodsPoints}}积分＋{{ite.goodsPriceStr}}元</span>-->
              <div class="fl">
                <span v-if="ite.goodsPoints-0 != 0">{{ite.goodsPoints}}积分</span><span v-if="ite.goodsPoints-0 != 0 && ite.goodsPriceStr-0 !=0">+</span><span v-if="ite.goodsPriceStr-0 !=0 || ite.goodsPoints-0 == 0">{{ite.goodsPriceStr}}元</span>
              </div>
              <span class="s-right">× {{ite.goodsNum}}</span>
            </div>
          </div>
        </div>
        <p class="notice" v-if="item.isDelay!=0">{{ite.delayReason}}</p>
      </div>
    </div>
    </div>
    <div class="blank border-bottom-1px border-top-1px"></div>
    <div class="pay-info border-bottom-1px">
      <div class="padding-right30"><span>商品总价</span>
        <div class="fr">
          <span v-if="orderData.usedPoints-0 != 0">{{orderData.usedPoints}}积分</span><span v-if="orderData.usedPoints-0 != 0 && orderData.mainGoodsPriceStr-0 !=0">+</span><span v-if="orderData.mainGoodsPriceStr-0 !=0">{{orderData.mainGoodsPriceStr}}元</span>
        </div>
      </div>
      <p class="padding-right30"><span>运费</span><span class="s-right">＋￥{{orderData.mainFreightStr}}</span></p>
      <p class="padding-right30"><span>扶贫码抵扣</span><span class="s-right"> －￥{{orderData.aidCouponStr}}</span></p>
      <p class="padding-right30 padding-b7 border-bottom-1px"><span>优惠券优惠</span><span class="s-right">－￥{{orderData.mainCouponStr}}</span></p>
      <div class="pay">
        <span class="s-left text-color">应付款</span>
        <!--<span class="s-right red">{{orderData.usedPoints}}积分+{{orderData.payFeeStr}}元</span>-->
        <div class="fr red">
          <span v-if="orderData.usedPoints-0 != 0">{{orderData.usedPoints}}积分</span><span v-if="orderData.usedPoints-0 != 0 && orderData.payFeeStr-0 !=0">+</span><span v-if="orderData.payFeeStr-0 !=0">{{orderData.payFeeStr}}元</span>
        </div>
      </div>
    </div>
    <div class="payment" v-if="false">
      <span class="s-left">支付方式</span>
      <span class="s-right">微信支付</span>
    </div>
    <div class="blank border-bottom-1px"></div>
    <div class="copy " v-if="false">
      <p style="font-weight: normal">订单编号：{{mainId}} <span class="copy-span s-right">复制</span></p>
      <div class="order-list">
        <p class="order-info">
          <span class="check"></span>
          <span>生成订单<span class="s-light">{{orderData.waitPayOrderDetail[0].createdAt}}</span>
          </span>
        </p>
        <p class="order-info" v-if="false"><span class="check-un"></span><span>生成订单 <span class="s-light">2015-09-01 15:32</span></span><a class="blue">查看售后</a></p>
        <p class="order-info" v-if="false"><span class="check"></span><span>生成订单 <span class="s-light">2015-09-01 15:32</span></span></p>
      </div>
    </div>
    <div class="footer-div is-iphone10-bottom border-top-1px iphone10-footer-padding34">
      <span class="confirm s-right red" @click="goPay" v-if="isWait">立即支付</span>
      <span class="cancel s-right" @click="cancelOrder" v-if="isWait">取消订单</span>
      <span class="cancel s-right" style="margin-right:.2rem;" @click="deleteOrder" v-if="!isWait">删除订单</span>
    </div>
    <div class="blank-bg"></div>
  </div>
</template>

<script>

  import sySwitch from '../../components/common/switch'
  import * as type from '../../requests/order'
  export default {
    data() {
      return {
        switchCheck:true,
        orderData:{
          waitPayOrderDetail:[{
            createdAt:''
          }]
        },
        timer:null,
        time:'',
        address:{},
        mainId:null,
        sendData:null,
        isWait:true,
        orderText:'待支付'
      }
    },
    created() {
      this.orderText = this.$route.query.orderText?this.$route.query.orderText:'待支付'
      this.isWait = this.$route.query.isWait !== 'isWait'
//      this.mainId = '201804271625304219912900001'
      this.mainId = this.$route.query.mainId
      this.sendData = {mainId:this.mainId}
//      this.getOrderDetail(data)
      this.getWaitPayOrderDetail()
    },
    mounted(){
      setTimeout(()=>{
        this.$header.setTitle('订单详情')
        var that =this
        this.$header.rightFn({
          type:'img',
          url:require('../../../static/images/mine/service.png'),
          callback:function () {
            that.m7Chat()
          }
        })
      },0)
    },
    filters:{
      mingCheng(p){
        var str = ""
        switch(p){
          case 10:str = "助理人：";break;
          case 12:str = "贫困户：";break;
          case 20:str = "积分商城";break;
          case 30:str = "善源甄选";break;
        }
        return str;
      },
    },
    methods: {
      goPay(){
        this.appOpen('payment',{mainId:this.mainId})
//        this.$router.push({path:'/payment',query:{mainId:this.mainId}})
      },
      cancelOrder(){
        this.getWithToken('/order-center/orderUser/cancelOrder',{mainId:this.mainId}).then(res=>{
          if(res && res.code == 200){
            this.$toast(res.message)
            setTimeout(()=>{
              this.syJsbCloseAppPage(1);
            },1500)
          }
          this.$toast(res?res.message:'取消失败')
        })
      },
      // 删除订单 /orderUser/deleteOrder
      deleteOrder(){
        this.$confirm('确认要删除订单吗',()=>{
          this.getWithToken('/order-center/orderUser/deleteOrder',{mainId:this.mainId}).then(res=>{
            if(res && res.code == 200){
              this.$toast(res.message);
              this.appNotify({callback:'consumRecordRefresh'})
              setTimeout(()=>{
                this.syJsbCloseAppPage()
              },1000)
            }else{
              this.$toast(res?res.message:'删除订单失败');
            }
          })
        })

      },
//      getOrderDetail(){
//        type['getOrderDetail'](this.sendData).then((res)=>{
//          console.log(res)
//          if(res.data.code==200){
//            this.address={
//              areaInfo:res.data.data.waitPayOrderDetail[0].areaInfo,
//              reciverName:res.data.data.waitPayOrderDetail[0].reciverName,
//              reciverTel:res.data.data.waitPayOrderDetail[0].reciverTel,
//            }
//            this.orderData=res.data.data
//          }
//        })
//      },
      timeFn(time){
        var time = (Array(2).join(0)+parseInt(time)).slice(-2)
        return time
      },
      getWaitPayOrderDetail(){
        type['getWaitPayOrderDetail'](this.sendData).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            this.address={
              areaInfo:res.data.data.waitPayOrderDetail[0].areaInfo,
              reciverName:res.data.data.waitPayOrderDetail[0].reciverName,
              reciverTel:res.data.data.waitPayOrderDetail[0].reciverTel,
            }
            let status = res.data.data.waitPayOrderDetail[0].orderStatus;
//            let isDelete = res.data.data.waitPayOrderDetail[0].isDelete = 1; // 订单是否删除
            let isDelete = res.data.data.waitPayOrderDetail[0].isDelete == 1; // 订单是否删除
            if(isDelete){
              this.appOpen('failure',{text:'此订单已删除',title:'订单删除'},false,false,true);
              return;
            }
            this.isWait = status == 10;
            this.orderText = status == 10?'待支付':status == 70?'已过期':'已取消'
            this.orderData=res.data.data
            if(this.orderData.expireTime<=0){
              this.$refs.time.innerText="支付超时"
              return;
            }
            this.time=this.orderData.expireTime
            this.$refs.time.innerText=this.timeFn(this.time/3600)+":"+this.timeFn(this.time/60%60)+":"+this.timeFn(this.time%60)
            this.timer=setInterval(()=>{
              this.time-=1
              this.$refs.time.innerText=this.timeFn(this.time/3600)+":"+this.timeFn(this.time/60%60)+":"+this.timeFn(this.time%60)
              if(this.time<=0){
                clearInterval(this.timer)
                this.$refs.time.innerText="支付超时"
              }
            },1000)
          }
          this.$loading.show=false
        })
      },
      switchFn(){},
      // 跳转店铺详情页
      goStore(item){
        if(this.orderData.orderType==20)return;
        if(item.orderType== 10){
          // 跳转助理人
          this.appOpen('assistant',{storeId:item.storeId})
        }else if(item.orderType== 12){
          // 跳转贫困户
          this.appOpen('poverty',{storeId:item.storeId})
        }else if(item.orderType== 20){
          // 跳转善企
          this.appOpen('company',{storeId:item.storeId})
        }
      },
      callSeller(num){
        this.jsCallPhone(num?num:this.phone)
//        window.location.href = "tel:"+(num?num:this.phone)
      },
      choose:(p)=>{
        var str = {}
        switch(p){
          case 10:str = {name:"sellerName",phone:'storeMobile'};break;
          case 12:str = {name:"sellerName",phone:'storeMobile'};break;
          case 20:str = {name:'storeName',phone:'storeMobile'};break;
          case 30:str = "集采";break;
        }
        return str;
      },
    },
    components: {sySwitch},
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/border.scss";
    .b-one{
      @include border-bottom(#E3E3E3);
    }
img{
  border: 0;
}
.wrapper-top{
  overflow: hidden;
}
.header {
  width:7.5rem;
  height:2rem;
  background:url(../../../static/images/goods/goods-bg.png) no-repeat center center;
  background-size: cover;
  }
.order-statue{
  display: inline-block;
  height: 0.4rem;
  line-height: 0.4rem;
  padding-left: 0.5rem;
  font-size:0.32rem;
  color:rgba(255,255,255,1);
  margin: 0.6rem 0 0 0.3rem;
}
.activity-bg{
  background: url("../../../static/images/common/clock.png") no-repeat left center;
  background-size: contain;
}
.activity-error{
  background: url("../../../static/images/applyRefund/details-error.png") no-repeat left center;
  background-size: contain;
}
.time{
  text-align: right;
  margin-top: 0.67rem;
  font-size:0.24rem;
  font-weight: 300;
  color:rgba(255,255,255,1);
  margin-right: 0.3rem;
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
      }
    }
  }
}
.content {

  .goods-list {
    overflow: hidden;
    padding: 0.3rem 0.3rem 0 0;
    margin-left: 0.3rem;
    position: relative;
    img, .text {
      float: left;
    }
    img {
      width: 1.4rem;
      height: 0.98rem;
      margin-right: 0.2rem;
      background: rgba(216, 216, 216, 1);
    }
    .text {
      font-size: 0.28rem;
      color: rgba(75, 75, 75, 1);
      width: 5.3rem;
      .p {
        font-size: 0.28rem;
        color: rgba(75, 75, 75, 1);
      }
      span {
        margin-top: 0.07rem;
        font-size: 0.24rem;
        color: rgba(148, 148, 148, 1);
        font-weight: normal;
      }

      .price {
        margin-top: 0.33rem;
        .s-left {
          font-size: 0.3rem;
          color: rgba(46, 46, 46, 1);
        }
        .s-right {
          float: right;
          font-size: 0.26rem;
          color: rgba(46, 46, 46, 1);
        }
      }
    }
    .notice {
      clear: both;
      background: rgba(255, 248, 248, 1);
      font-size: 0.24rem;
      color: rgba(255, 101, 51, 1);
      margin: 0.27rem 0 0.33rem;
      padding-left: 0.2rem;
    }
  }
  .goods-list:nth-last-of-type(1) {
    border-bottom: 0;
  }
}
.shop {
   height: 0.88rem;
   padding-left: 0.3rem;
   img, .comp-name {
     float: left;
   }
   .comp-name {
     max-width: 3rem;
     /*text-overflow: ellipsis;*/
     /*white-space: nowrap;*/
     /*overflow: hidden;*/
     padding-top: 0.26rem;
     /*line-height: 0.28rem;*/
     margin-left: 0.1rem;
     font-size: 0.28rem;
     margin-right: 0.07rem;
     font-weight: 300;
     color: rgba(46, 46, 46, 1);
   }
   .head-img {
     margin-top: 0.19rem;
     width: 0.5rem;
     height: 0.5rem;
     background: rgba(216, 216, 216, 1);
     border-radius: 50%;
   }
   img {
     margin-top: 0.26rem;
     height: 0.36rem;
   }
 }
.blank {
  height: 0.2rem;
  background: #FAFAFA;
}
  .footer-div {
    width: 7.5rem;
    position: fixed;
    bottom: 0;
    padding-top:0.16rem;
    height:0.98rem;
    background:rgba(248,248,248,0.82);
  }
  .cancel,.confirm{
    width:1.6rem;
    border-radius: 0.08rem ;
    height:0.66rem;
    line-height: 0.66rem;
    text-align: center;
    font-size:0.28rem;
  }
  .cancel{
    border: 1px solid #D0D0D0;
    color:rgba(46,46,46,1);
  }
  .confirm{
    border: 1px solid #FF1919;
    color:#FF1919;
    margin-left: 0.2rem;
    margin-right: 0.3rem;
  }
  .m-right {
    margin-right: 0.3rem;
  }

  .bg-right {
    background: url('https://mt.17shanyuan.com/static/images/order/arrow-more.png') no-repeat 6.8rem 0.29rem;
    background-size: 0.13rem;
  }

  .s-left {
    float: left;
  }

  .s-right {
    float: right;
  }

  .red {
    color: #FF1919;
  }
  .footer{
    position: fixed;
    bottom: 0;
    height: 0.98rem;

  }
  .div-right,.div-left{
    line-height: 0.98rem;
  }
  .div-left{
    box-sizing: border-box;
    border-top: 1px solid #E3E3E3;
    padding-left: 0.3rem;
    font-size:0.3rem;
    color:rgba(35,34,34,1);
    width: 4.5rem;
    height:0.98rem;
    background:rgba(248,248,248,0.82);
  }
.div-right{
  text-align: center;
  width: 3rem;
  height:0.98rem;
  font-size:0.3rem;
  color:rgba(255,255,255,1);
  background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
}
  .font24{
    font-size: 0.24rem;
  }
  .font26{
    font-size: 0.26rem;
  }
  .fontW600{
    font-weight: normal;
  }
  input::placeholder{
    color: #949494;
  }
  .top-not{
    padding-left: 0.6rem;
    background:rgba(255,248,248,1) url("../../../static/images/common/error-info.png") no-repeat 0.2rem center;
    background-size: 0.26rem;
    height:0.6rem;
    font-size:0.24rem;
    line-height: 0.6rem;
    color:rgba(255,101,51,1);
  }
  .div-w12{
    margin-right: 0.3rem;
    height: 100%;
    line-height: 0.88rem;
    font-size:0.26rem;
    color:rgba(148,148,148,1);
    text-align: right;
    background: url(../../../static/images/goods/info.png) no-repeat left center;
    background-size: 0.44rem;
    width: 1.26rem;
  }
  .pay-info{
    font-size:0.26rem;
    padding:0.2rem 0 0.2rem 0.3rem;
    color:rgba(148,148,148,1);
  }
  .blank-bg{
    height: 0.98rem;
  }
  .goods-list:nth-last-of-type(1){
    &::after{
      border: 0;
    }
  }
  .text-color{
    font-size:0.28rem;
    color:rgba(75,75,75,1);
  }
  .padding-right30{
    line-height:0.44rem;
    padding-right: 0.3rem;
  }
  .padding-b7{
    padding-bottom: 0.1rem;
  }
  .pay{
    height: 0.57rem;
    line-height: 0.77rem;
    font-size: 0.28rem;
    overflow: hidden;
    padding-right: 0.3rem;
  }
  .copy{
    overflow: hidden;
    font-size:0.26rem;
    position: relative;
    padding:0.32rem 0.3rem;
    color:rgba(148,148,148,1);
  }
  .copy-span{
    font-size:0.22rem;
    position: absolute;
    top:0.3rem;
    width:1rem;
    border: 1px solid #D0D0D0;
    line-height: 0.44rem;
    text-align: center;
    height:0.44rem;
    border-radius: 0.08rem ;
    right: 0.3rem;
    color:rgba(46,46,46,1);
  }
  .payment{
    height: 0.76rem;
    overflow: hidden;
    font-size:0.28rem;
    line-height: 0.76rem;
    padding:0 0.3rem;
    color:rgba(75,75,75,1);
  }
  .order-info{
    height: 0.6rem;
  }
  .check{
    top: 0.1rem;
    float: left;
    margin-right: 0.23rem;
    padding:0 0.04rem;
    height: 0.6rem;
    display: inline-block;
    position: relative;
    width: 0.14rem;
    &::after{
      content: '';
      display: inline-block;
      width: 0.14rem;
      height: 0.14rem;
      background: #FF1919;
      box-shadow: 0 0 6px 0 rgba(255,25,25,0.70);
      border-radius:50%;
      position: absolute;
      top:0;
    }
    &::before{
      content: '';
      position: absolute;
      height: 100%;
      border-left: 1px solid #D0D0D0;
      left: 49%;
    }
  }
  .check-un{
    top: 0.1rem;
    float: left;
    margin-right: 0.23rem;
    position: relative;
    height: 0.6rem;
    padding:0 0.04rem;
    display: inline-block;
    width: 0.14rem;
    &::after{

      position: absolute;
      top:0;
      content: '';
      display: inline-block;
      width: 0.14rem;
      height: 0.14rem;
      background: #FFFFFF;
      box-sizing: border-box;
      border: 2px solid #FF1919;
      box-shadow: 0 0 6px 0 rgba(255,25,25,0.70);
      border-radius:50%;
    }
    &::before{
      content: '';
      position: absolute;
      height: 100%;
      border-left: 1px solid #D0D0D0;
      left: 49%;
    }
  }
  .order-info:nth-last-of-type(1) span{
    &::before{
      border: 0;
    }
  }
  .order-list{
margin-top: 0.21rem;
  }
  .blue{
    color: #007AFF;
    margin-left: 0.2rem;
  }
  a{
    text-decoration:underline
  }
  .s-light{
    font-weight: 300;
  }
</style>
