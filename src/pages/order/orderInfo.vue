<template>
  <div class="wrapper-top iphone10-footer-padding34">
    <div class="header">
      <span class="order-statue activity-error" v-if="orderData.isClosed == 1 || (orderData.refundType == 2 && orderData.orderStatus == 60)">已关闭</span>
      <span class="order-statue" :class="statusComputed" v-else>{{orderData.orderStatus|orderStatueFilter}}</span>
      <span class="time s-right" v-html="topTip"></span>
    </div>
    <div class="delay" v-if="orderData.isDelay">
      <div class="delay-con">{{orderData.delayReason}}</div>
    </div>
    <div class="address-wrapper">
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
    <div >
      <div class="blank border-bottom-1px border-top-1px"></div>
      <div class="content">
      <div class="shop border-bottom-1px" @click="goStore">
        <img :src="orderData.storeLogo?orderData.storeLogo + ossUrl('webp_120'):imgUrl+'/store/store_img.jpg'" alt="" class="head-img">
        <span class="comp-name">{{orderData.orderType|mingCheng}}<i style="font-style: normal" v-if="orderData.orderType!=30&&orderData.orderType!=20">{{orderData[choose(orderData.orderType).name]}}</i></span>
        <img :src="imgUrl+'/goods/fupinma.png'"  alt="" v-if="orderData.orderType==30">
        <img :src="imgUrl+'/wishList/go.png'"  alt="" style="height: 0.44rem;margin-top: 0.24rem;" v-if="orderData.orderType!=20 && orderData.orderType!=30">
        <div class="s-right div-w12" @click.stop="callSeller(orderData[choose(orderData.orderType).phone])">联系ta</div>
      </div>
      <div class="goods-list  border-bottom-1px" v-for="ite in orderData.orderDetailGoodsVos" @click="appOpen('goodsDetail',{goodsId:ite.goodsId})">
        <div style="overflow: hidden;">
          <img v-lazy="ite.goodsImage + ossUrl('webp_240')" alt="">
          <div class="text">
            <p style="height: 0.8rem;text-align: justify;"><span style="margin-right:.06rem;color:#FF1919" v-show="ite.tradeMode ==1">预售 | </span>{{ite.goodsName}}</p>
            <span style="font-weight: 300">{{ite.specUnit}}</span>
            <div class="price">
              <!--<span class="s-left" v-if="orderData.orderType == '10'">{{ite.goodsPriceStr}}元</span>-->
              <!--<span class="s-left" v-else>{{ite.goodsPoints}}积分＋{{ite.goodsPriceStr}}元</span>-->
              <div class="fl">
                <span v-if="ite.goodsPoints-0 != 0">{{ite.goodsPoints}}积分</span><span v-if="ite.goodsPoints-0 != 0 && ite.goodsPriceStr-0 !=0">+</span><span v-if="ite.goodsPriceStr-0 !=0">￥{{ite.goodsPriceStr}}</span>
              </div>
              <span class="s-right">× {{ite.goodsNum}}</span>
            </div>
          </div>
        </div>
        <p class="notice" v-if="ite.delayReason && ite.delayReason != 0">{{ite.delayReason}}</p>
      </div>
    </div>
    </div>
    <div class="blank border-bottom-1px"></div>
    <div class="pay-info ">
      <p class="padding-right30"><span>商品总价</span><span class="s-right">{{(orderData.orderType == '10' || orderData.usedPoints-0 == 0)?'':orderData.usedPoints+'积分+'}}{{orderData.goodsPriceStr}}元</span></p>
      <p class="padding-right30"><span>运费</span><span class="s-right">＋￥{{orderData.logistPriceStr}}</span></p>
      <p class="padding-right30"><span>扶贫码抵扣</span><span class="s-right"> －￥{{orderData.aidCouponFeeStr}}</span></p>
      <p class="padding-right30 padding-b7 border-bottom-1px"><span>优惠券优惠</span><span class="s-right">－￥{{orderData.totalCouponStr}}</span></p>
      <div class="pay">
        <span class="s-left text-color">{{(orderStatus == 80||orderStatus == 70)?'应付款':'实付款'}}</span>
        <div class="fr red">
          <span>{{realityPay}}</span>
        </div>
        <!--<span class="s-right red" v-if="orderData.orderType == '10'">{{orderData.payFeeStr}}元</span>-->
        <!--<span class="s-right red" v-else>{{orderData.usedPoints}}积分+{{orderData.payFeeStr}}元</span>-->
      </div>
    </div>
    <div class="payment" v-show="orderStatus != 80 && orderStatus != 70">
      <span class="s-left">支付方式</span>
      <span class="s-right">{{orderData.payWay | payWayFilter}}</span>
    </div>
    <div class="blank border-bottom-1px border-top-1px"></div>
    <div class="copy ">
      <p style="font-weight: normal" v-if="!(orderStatus == 70 || orderStatus == 80)">订单编号：{{orderData.orderCode}} <button class="tag-read copy-span s-right" :data-clipboard-text="orderData.orderCode" @click="copyOrderId">复制</button></p>


      <div class="order-list" v-show="statusLog.length && orderStatus != 70">
        <!--<p class="order-info">-->
          <!--<span class="check"></span>-->
          <!--<span>生成订单 <span class="s-light">{{orderData.createdAt}}</span>-->
          <!--</span>-->
        <!--</p>-->
        <p class="order-info" v-for="(item,index) in statusLog" v-if="!((orderStatus == 70 || orderStatus == 80) && item.type == 'submit_success')">
          <span :class="(!index || item.type == 'order_closed')?'check':'check-un'"></span>
          <span>{{item.logMsg}} </span>
          <span class="s-light"> {{item.createAt}}</span>
          <a class="blue" v-if="item.type == 'apply_refund'" @click="appOpen('/applyRefundDetails',{orderId:orderId})">查看售后</a>
        </p>
        <!--<p class="order-info" v-if="true"><span class="check"></span><span>生成订单 <span class="s-light">2015-09-01 15:32</span></span></p>-->
      </div>
    </div>
    <div class="footer-div iphone10-footer-padding border-top-1px" ref="footer" v-show="!(orderData.isClosed == 1 || (orderData.refundType == 2 && orderData.orderStatus == 60))">

      <!-- 待发货 -->
      <template v-if="orderStatus == 20 ">
        <span class="confirm s-right red" v-if="orderData.urgeNum == 0 && orderData.urgeSendButton" @click="urgeSendPackage">提醒发货</span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '0'" @click="refund">申请退款</span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '12'" @click="callSeller()">投诉</span>
      </template>
      <!-- 待收货 -->
      <template v-if="orderStatus == 30">
        <span class="confirm s-right red" v-if="!(orderData.isClosed == 1 || (orderData.refundType == 2 && orderData.orderStatus == 60))"  @click="sureReceived">确认收货</span>
        <span class="cancel s-right" v-if="orderData.mDelayed == '0' && orderData.delayReceivedButton" @click="delay">延迟收货</span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '0'" @click="refund">申请退款</span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '12'" @click="callSeller()">投诉</span>
      </template>
      <!-- 待评价 -->
      <template v-if="orderStatus == 40">
        <span class="confirm s-right red" @click="evaluate">评价有礼</span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '0'" @click="refund">申请退款</span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '12'" @click="callSeller()">投诉</span>
      </template>
      <!-- 已完成 -->
      <template v-if="orderStatus == 50">
        <span style="float: right;width:.1rem;height:100%;"></span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '0'" @click="refund">申请退款</span>
        <span class="cancel s-right" v-if="orderData.refundStatus == '12'" @click="callSeller()">投诉</span>
      </template>
      <!-- 已过期 已取消 -->
      <template v-if="orderStatus == 70 || orderStatus == 80">
        <span class="cancel s-right right-space" @click="deleteOrder">删除订单</span>
      </template>
      <!--<template v-if="orderStatus == 100">-->
        <!--<span class="confirm s-right red" @click="sureReceived">确认收货</span>-->
        <!--&lt;!&ndash;<span class="cancel s-right" v-if="orderData.mDelayed == '0' && orderData.delayReceivedButton" @click="delay">延迟收货</span>&ndash;&gt;-->
        <!--<span class="cancel s-right" v-if="orderData.refundStatus == '12'" @click="callSeller()">投诉</span>-->
      <!--</template>-->
    </div>
    <div class="blank-bg" ref="footer_div"></div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import sySwitch from '../../components/common/switch'
//  import * as type from '../../requests/order'
  export default {
    data() {
      return {
        switchCheck:true,
        orderData:{},
        statueClass:2,
        timer:null,
        time:'',
        address:{},
        orderId:null,
        sendData:{},
        orderStatus:'',
        statusLog:'',
        topTip:'',
        phone:'4006667308',
        mineData:{},
        realityPay:'',
        statusComputed:'activity-wait'
      }
    },
    created() {
      this.orderId = this.$route.query.orderId || '201805031514456095488800001'
      this.sendData = {orderId:this.orderId}
      this.getOrderDetail().then(()=>{
        this.statusTip()
//        this.sureReceived()
      })
      this.getOrderStatusLog()
    },
    mounted(){
      setTimeout(()=>{
        this.$header.setTitle('订单详情')
//        this.$header.setBackData = {isReload:0,times:1}
        this.getData().then(()=>{
          this.$header.rightFn({
            type:'img',
            url:this.imgUrl + '/mine/service.png',
            callback:()=>{
              this.m7Chat({head_image:this.mineData.avatar,member_truename:this.mineData.dispName})
            }
          })
        })

      },0)
    },
    filters:{
      mingCheng:(p)=>{
        var str = ""
        p = parseInt(p)
        switch(p){
          case 10:str = "助理人：";break;
          case 12:str = "贫困户：";break;
          case 20:str = "积分商城";break;
          case 30:str = "善源甄选";break;
        }
        return str;
      },
      pay(item){

      },
      payWayFilter(way){
        let data = {wx_public:'微信支付',wx_app:'微信支付',ali_app:'支付宝支付',ali_h5:'支付宝支付',boc_pay:'中银支付',boc_wallet:'公益钱包支付',mix_pay:'扶贫码支付',biz_pay:'扶贫码支付',points_pay:'积分支付',coupon_pay:'优惠券支付',offline_transfer:'线下转账' }
        return data[way]
      },
      orderStatueFilter:(p)=>{
        p+=""
        var str = '';
        switch(p){
          case "10":str = '待支付';
            this.statueClass=1
            break;
          case "20":str = '待发货';
            this.statueClass=1
            break;
          case "30":str = '待收货';
            this.statueClass=1
            break;
          case "40":str = '待评价';
            this.statueClass=1
            break;
          case "50":str = '已完成';
            this.statueClass=2
            break;
          case "70":str = '已过期';
            this.statueClass=3
            break;
          case "60":str = '已完成';
            this.statueClass=3
            break;
          case "80":str = '已取消';
            this.statueClass=3
            break;
        }
        return str
      }
    },
    computed:{
//      statusComputed(){
//        console.log(this.statueClass + 'sss')
//        return this.statueClass==1?'activity-wait':this.statueClass==2?'activity-success':'activity-error'
//      },

    },
    watch:{
//      statueClass:{
//        immediate:true,
//        handler(val){
//          this.statusComputed = val==1?'activity-wait':val==2?'activity-success':'activity-error'
//
//        }
//        console.log('222')
//        console.log(val)
//      },

    },
    methods: {
      // 获取订单详情
      getOrderDetail(){
        return this.getWithToken('/order-center/orderUser/getOrderDetail',this.sendData).then(res=>{
//        return this.get('/order-center/orderUser/getOrderDetail',{orderId:'201806141041041842734200001',token:'34e42f5c6a274f1cb2f4fb6fecde9872'}).then(res=>{
          if(res.code==200){
            this.orderData=res.data.orderDetail
            this.orderStatus = this.orderData.orderStatus;
            if(this.orderData.isDelete == 1){
              this.appOpen('failure',{text:'此订单已删除',title:'订单删除'},false,false,true);
              return;
            }
            let s = this.orderData.refundStatus;
            let isAll = this.orderData.refundType;
            if(isAll == 2 && s == 14){
              this.statueClass=3;
              this.orderData.orderStatus = 60;
              this.orderData.isClosed = 1;
            } //
            this.statusComputed = this.orderStatueFilter(this.orderStatus)
//            if(isAll == 1 && s == 14 && this.orderStatus == 30){
//              this.orderStatus = 100
//            }
//            console.log(this.orderData)
//            let a = '<span v-if="orderData.usedPoints-0 != 0">{{orderData.usedPoints}}积分</span><span v-if="orderData.usedPoints-0 != 0 && orderData.payFeeStr-0 !=0">+</span><span v-if="orderData.payFeeStr-0 !=0">{{orderData.payFeeStr}}元</span>'

            let p = this.orderData.usedPoints - 0 !=0?this.orderData.usedPoints+'积分':'';
            let m = this.orderData.payFeeStr - 0 !=0?this.orderData.payFeeStr+'元':'';
            if(p && m){
              this.realityPay = p + '+' + m;
            }else{
              this.realityPay = p + m;
            }
            if(!p && !m){
              this.realityPay = this.orderData.payFeeStr+'元'
            }
            this.address={
              areaInfo:this.orderData.areaInfo,
              reciverName:this.orderData.reciverName,
              reciverTel:this.orderData.reciverTel,
            }
            this.$nextTick(()=>{
              if(!this.$refs.footer.children.length){
                this.$refs.footer.style.display = 'none';
                this.$refs.footer_div.style.display = 'none';
              }
            })
          }else{
            this.$toast(res.data.message)
          }
          this.$loading.show=false
        })
      },
      // 获取订单日志列表
      getOrderStatusLog(){
        this.getWithToken('/order-center/orderUser/getOrderStatusLog',{orderId:this.orderId}).then(res=>{
          if(res && res.code == 200){
            this.statusLog = res.data.onlineLogBos;
          }else{
            this.$toast(res?res.message:'获取订单日志失败')
          }
        })
      },
      // 获取个人信息
      getData(){
        return this.getWithToken('/user-center/usr/home').then(res => {
          if(res.code == 200){
            this.mineData = res.content;
          }else {
            this.$toast(res.message)
          }
        })
      },
      switchFn(){},
      // 催发货
      urgeSendPackage(){
        this.getWithToken('/order-center/urge/urgeSendPackage',this.sendData).then(res=>{
          if(res && res.code == 200){
            this.orderData.urgeNum = '1';
            this.$toast('已提醒卖家发货')
//            this.$header.setBack({isReload:1,times:1});
            this.appNotify({callback:'consumRecordRefresh'})
          }else{
            this.$toast(res?res.message:'催发货失败');
          }
        })
      },
      // 确认收货
      sureReceived(){
//        this.appOpen('payment',{orderId:this.orderId}) /affirmReceived/packageReceived
        if(this.orderData.packageCount == 1){
          this.$confirm('亲，请务必在收到货后，再确认收货，否则您可能钱货两空！',()=>{
            this.getWithToken('/order-center/affirmReceived/packageReceived',{orderId:this.orderId,packageCount:'1'}).then(res=>{
              if(res && res.code == 200){
                this.$toast(res.message)
                this.getOrderDetail()
                this.getOrderStatusLog()
//                this.$header.setBack({isReload:1,times:1});
                this.appNotify({callback:'consumRecordRefresh'})
              }else{
                this.$toast(res?res.message:'确认收货失败')
              }
            })
          })
        }else{
          this.appOpen('receive',{orderId:this.orderData.orderId})
        }

      },
      // 延迟收货
      delay(){
        this.getWithToken('/order-center/delay/delayReceived',this.sendData).then(res=>{
          if(res && res.code == 200){
            this.orderData.mDelayed = '1';
            this.$toast(res.message)
//            this.$header.setBack({isReload:1,times:1});
            this.appNotify({callback:'consumRecordRefresh'})
          }else{
            this.$toast(res?res.message:'延迟收货失败');
          }
        })
      },
      // 删除订单 /orderUser/deleteOrder
      deleteOrder(){
        this.$confirm('确认要删除订单吗',()=>{
          this.getWithToken('/order-center/orderUser/deleteOrder',{mainId:this.orderData.mainId}).then(res=>{
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
      // 申请退款
      refund(){
        this.appNotify({callback:'consumRecordRefresh'})
//        this.$header.setBack({isReload:1,times:1});
        this.appOpen('applyRefund',{orderId:this.orderId})
      },
      // 评价
      evaluate(){
//        this.appNotify({callback:'consumRecordRefresh'})
//        this.$header.setBack({isReload:1,times:1});
        this.appOpen('/evaluationPublish',{orderId:this.orderId,orderCode:this.orderData.orderCode})
      },
      // 订单状态文案显示
      statusTip(){
        let s = this.orderData.refundStatus;
        let isAll = this.orderData.refundType;
        let o = {'10':'处理中','11':'退款中','12':'退款被拒绝','13':'已补发','14':'已退款'}
        if(isAll == 1 && s == 14){
          this.topTip = '部分货品已退款'
          return;
        }
        if(isAll == 2 && s == 14){
          this.topTip = '已退款';
          return;
        }
        if(s){
          this.topTip = o[s+'']
        }else if(this.orderStatus == 30){
          let t = this.orderData.receiptAutoAt;
          if(t-0){
            let day = parseInt(t/24);
            let hour = t%24;
            this.topTip ='还剩'+ day +'天'+ hour +'小时' + '自动确认收货'
          }else{
            this.topTip = '已自动确认收货'
          }
        }else if(this.orderStatus == 40){
          this.topTip = '评价您的公益消费体验<br/>可获得'+(this.orderData.score || '')+'公益积分'
        }else if(this.orderStatus == 50){
          this.topTip = '感谢您的爱心帮扶'
        }

      },
      // 跳转店铺详情页
      goStore(){
        if(this.orderData.orderType==20)return;
        if(this.orderData.orderType==30)return;
        if(this.orderData.orderType== 10){
          // 跳转助理人
          this.appOpen('assistant',{storeId:this.orderData.storeId})
        }else if(this.orderData.orderType== 12){
          // 跳转贫困户
          this.appOpen('poverty',{storeId:this.orderData.storeId})
        }else if(this.orderData.orderType== 20){
          // 跳转善企
          this.appOpen('company',{storeId:this.orderData.storeId})
        }
      },
      // 复制文字
      copyOrderId() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$toast('已复制剪切板',800)
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$toast('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
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
      orderStatueFilter:(p)=>{
        p+=""
        var str = '';
        switch(p){
          case "10":
          case "20":
          case "30":
          case "40":str = 'activity-wait';
            break;
          case "50":
          case "60":str = 'activity-success';
            break;
          case "70":
          case "80":str = 'activity-error';
            break;
        }
        return str
      }
    },
    components: {sySwitch},
  }
</script>
<style>
</style>
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
.activity-wait{
  background: url("../../../static/images/applyRefund/details-wait.png") no-repeat left center;
  background-size: contain;
}
.activity-success{
  background: url("../../../static/images/applyRefund/details-success.png") no-repeat left center;
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
.delay{
  color:#FF6533;
  height:.6rem;
  line-height: .6rem;
  background:rgba(255,248,248,1);
  padding-left:.2rem;
  .delay-con{
    padding-left:.4rem;
    background: url("/static/images/common/tip.png") no-repeat left center;
    background-size:.26rem;
  }
}
.address-wrapper {
  overflow: hidden;
  .li-wrapper {
    overflow: hidden;
    text-align: left;
    padding-left: 0.8rem;
    padding-bottom:.2rem;
    /*height: 1.7rem;*/
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
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
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
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
     margin-top: 0.30rem;
     line-height: 0.28rem;
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
    width:100%;
    position: fixed;
    bottom: 0;
    padding-top:0.16rem;
    height:0.82rem;
    background:rgba(248,248,248,1);
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
    margin-right:.2rem;
    border: 1px solid #D0D0D0;
    color:rgba(46,46,46,1);
  }
  .confirm{
    border: 1px solid #FF1919;
    color:#FF1919;
    /*margin-left: 0.2rem;*/
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
  .right-space{
    margin-right:.3rem !important;
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
    background: #fff;
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
