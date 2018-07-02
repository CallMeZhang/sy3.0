<template>
  <div class="wrapper-top" :class="{'isHeight':juanzen}">
    <div class="header" :class="{'height2rem':!orderData.unionMap.wealIcon}" style="position: relative"
         @click="zanwugongneng"
         v-if="orderData.orderPayVo.orderList[0].storeTye!=20&&!!orderData.union">
      <div class="have-bg" v-if="orderData.unionMap.wealIcon">
        <img :src="imgUrl+'/biz/order-bg.png'" alt="">
        <img v-lazy="orderData.unionMap.wealIcon+ossUrl('webp_480')" alt=""
             class="juanzeng-bg">
      </div>
      <img v-if="!orderData.unionMap.wealIcon" key="2"
           v-lazy="imgUrl+'/biz/mask.png'"
           alt="" style="width: 100%;height: 2rem;" >
      <p class="uniond" :class="{'linetrue':!orderData.unionMap.wealIcon}">平台将为本订单进行扶贫捐赠 <img :src="imgUrl+'/biz/quest.png'" alt="" style="width: 0.27rem !important;display: inline-block;vertical-align: middle;"></p>
    </div>
    <div class="top-not" v-if="false">由于北京两会，10月5日之后才能为北京用户发货</div>
    <div class="address-wrapper">
      <div class="li-wrapper">
        <div class="div-wrapper-first">
          <span class="name">{{address.receiveName}}</span>
          <span class="phone">{{address.telephone}}</span>
          <span class="default" v-if="address.isDefault==1">默认</span>
        </div>
        <div class="address" @click="goEditAddress(address.addressId)">
          <img :src="imgUrl+'/common/arrow.png'" alt="" class="edit">
          <span class="address-txt" style="-webkit-line-clamp:2;-webkit-box-orient:vertical;">{{address.provinceName+" "+address.cityName+" "+address.countyName+" "+address.exactAddress}}</span>
        </div>
      </div>
    </div>
    <div v-for="item in orderData.orderPayVo.orderList">
      <div class="blank border-bottom-1px border-top-1px"></div>
      <div class="content">
        <div class="shop border-bottom-1px">
          <img :src="!!item.storeLogo?item.storeLogo+ossUrl('webp_120'):imgUrl+'/common/head-default.jpg'" alt="" class="head-img">
          <span>{{item.storeTye|mingCheng}}<i style="font-style: normal" v-if="item.storeTye!=30&&item.storeTye!=20">{{item.sellerName}}</i></span>
          <img v-if="item.storeTye==30" :src="'/static/images/goods/fupinma.png'" alt="">
        </div>
        <div class="goods-list border-bottom-1px" v-for="ite in item.goodsList">
          <div style="overflow: hidden;" :class="{'model':ite.limitArea==1}">
            <img v-lazy="ite.goodsImage+ossUrl('webp_120')" alt="">
            <div class="text">
              <p style="height: 0.8rem;"><span style="margin-right:.06rem;color:#FF1919;font-size: 0.28rem" v-if="ite.tradeMode!=0">预售 |</span>{{ite.goodsName}}</p>
              <span>{{ite.specUnit}}</span>
              <p class="price">
                <span class="s-left">
                  <span v-if="ite.goodsPoints!=0">{{ite.goodsPoints}}积分</span>
                  <span v-if="ite.goodsPoints!=0&&ite.goodsPrice!=0">＋</span>
                  <span v-if="ite.goodsPrice!=0" :index="ite.goodsPrice">{{moneyFormat(ite.goodsPrice)}}元</span>
                </span>
                <span class="s-right">× {{ite.goodsNum}}</span>
              </p>
            </div>
          </div>
          <p class="notice" v-if="ite.isDelay!=0">{{ite.promiseDeliveryAt}}</p>
          <p class="notice" v-if="ite.limitArea==1">本商品不支持配送到当前地址。</p>
        </div>

      </div>
      <div class="list border-bottom-1px border-top-1px">
        <div class="common favourable border-bottom-1px" @click="goUrl(item.storeCouponList,'store')" v-if="item.storeTye!=20">
          <span>店铺优惠</span>
          <span class="s-right">- ¥{{moneyFormat(item.storeCouponList.length!=0&&item.storeCouponList[0].isAutoCheck==2?item.storeCouponList[0].reducePrice:0)}}</span>
        </div>
        <div class="common send-mode border-bottom-1px">
          <span>配送方式</span>
          <span class="s-right">快递 ¥{{moneyFormat(item.logistFee)}}</span>
        </div>
        <div class="common message border-bottom-1px">
          <span>买家留言：</span>
          <input type="text" placeholder="选填" v-model="item.msg" style="width: 5.2rem;">
        </div>
      </div>
      <div class="total border-bottom-1px"> 共{{item.allNum}}件产品 小计：
        <span v-if="item.usedPoints!=0">{{item.usedPoints}}</span>
        <span v-if="item.usedPoints!=0">积分 </span>
        <span v-if="item.usedPoints!=0&&item.subtotal!=0">+</span>
        <span v-if="item.subtotal!=0">{{moneyFormat(item.subtotal)}}</span>
        <span v-if="item.subtotal!=0">元 </span>
      </div>
    </div>
    <div class="blank border-bottom-1px" v-if="orderData.orderPayVo.orderList[0].storeTye!=20"></div>
    <div class="pay border-bottom-1px" v-if="orderData.orderPayVo.orderList[0].storeTye!=20">
      <div class="border-bottom-1px">
        <span>可用扶贫码抵扣</span>
        <span class="red">¥{{moneyFormat(orderData.orderPayVo.allAidCouponFee)}}</span>
        <div class="div-ck">
          <sy-switch v-model="switchCheck" @change="switchFn"></sy-switch>
        </div>
      </div>
      <div class="bg-right" @click="goUrl(orderData.platformCouponList,'platform')">
        <span>平台优惠券</span>
        <span class="red s-right m-right">-¥{{moneyFormat(orderData.platformCouponList.length!=0&&orderData.platformCouponList[0].isAutoCheck==2?orderData.platformCouponList[0].reducePrice:0)}}</span>
      </div>

    </div>
    <div class="footer-div" :class="{'addHeight':addHeight}"></div>
    <div class="footer  iphone10-footer-padding">
      <div class="s-left div-left border-bottom-1px">
        需支付：
        <span class="fontW600" v-if="orderData.orderPayVo.allUsedPoints!=0">{{orderData.orderPayVo.allUsedPoints}}</span>
        <span class="font24" v-if="orderData.orderPayVo.allUsedPoints!=0">积分</span>
        <span class="font26" v-if="orderData.orderPayVo.allUsedPoints!=0&&orderData.orderPayVo.allPayFee!=0">+</span>
        <span class="fontW600" v-if="!(orderData.orderPayVo.orderList[0].storeTye==20&&orderData.orderPayVo.allPayFee==0)">{{moneyFormat(orderData.orderPayVo.allPayFee)}}</span>
        <span class="font24" v-if="!(orderData.orderPayVo.orderList[0].storeTye==20&&orderData.orderPayVo.allPayFee==0)">元</span>
      </div>
      <div class="s-right div-right" @click="submitOrder" :class="{'un-click':state}">
        {{orderData.orderPayVo.orderList[0].storeTye==20?"立即兑换":"立即帮扶"}}
      </div>
    </div>
    <transition name="slide-left">
      <div  v-if="wishList" class="wishList iphone10-paddingTop">
        <div class="top-flex">
          <div style="position: fixed;top: 0;width: 100%;z-index: 9999;background: rgb(249, 249, 249)" class=" iphone10-top">
            <div class="coupon-header" style="background: #f9f9f9;">
              <div class="go-back" @click="wishList=false"></div>
              优惠券
            </div>
            <div class="unUser border-bottom-1px" @click="closedCop"> 不使用优惠券 <p class='choosed' :class="{'choose-cp':!unUser}"></p></div>
            <div class="coupon-tips" style="background: #f9f9f9;">优惠券不能使用多张</div>
          </div>
        </div>

          <div class="coupon-bg" @click="closedCoupon(item,couponList)" v-for="item in couponList" :class="{'haveBg':item.isAutoCheck=='2'}">
            <div class="coupon-title">{{item.couponTitle}}</div>
            <div class="coupon-dec" :class="{'have':item.couponTitle==''}">{{item.couponDesc}}</div>
            <div class="coupon-time">
              <span>{{item.startDate.replace(/-/ig, ".")}}</span>-<span>{{item.endDate.replace(/-/ig, ".")}}</span>
            </div>
            <div class="p-right">
              <div class="coupon-price"><span class="red" style="font-size: 0.36rem">￥</span>{{moneyFormat(item.reducePrice)}}</div>
              <div class="coupon-t">满{{moneyFormat(item.toPrice)}}元可用</div>
            </div>
          </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="juanzen" class="mask" @click="juanzen=false" >
        <div class="model-p" >
          <div class="title">关于平台扶贫捐赠</div>
          <div class="model-content">
            <p class="n">
              平台的使命是：汇聚仁心，服务三农。 为了更好的达成平台使命，平台设立了扶贫捐赠机制。
            </p>
            <p class="t">扶贫捐赠资金从哪里来？</p>
            <p class="n">捐赠资金来源于平台微利经营的收入，以公益伙伴单位实现的帮扶成效按一定比例进行捐赠。您当前代表{{orderData.union}}，捐赠比例为您购买的商品金额的 {{orderData.unionDonate/10+'%'}}。</p>
            <p class="t">扶贫捐赠资金如何使用？</p>
            <p class="n">
              平台与伙伴单位共同成立扶贫专项基金，用于管理扶贫捐赠资金。资金用于公益伙伴单位定点扶贫地区,如：</br>
              • 捐赠给定点扶贫地区的公益项目；</br>
              • 帮助定点扶贫地区的电商环境建设，如运营仓建立等；</br>
              • 为扶贫地区的产业项目进行投资，投资收入用于资助政府兜底贫困人口。
            </p>
          </div>
          <div class="model-btn border-top-1px" @click.stop="juanzen=false">
            我知道了
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import * as type from '../../requests/order'
  import * as typeAddress from '../../requests/address'
  import sySwitch from '../../components/common/switch'
  ///storeLogo
  export default {
    data() {
      return {
        imgLogo:this.imgUrl + '/common/head-default.jpg'+this.ossUrl('webp_120'),
        juanzen:false,
        addHeight:false,
        storeCoupon:'',
        allAidCouponFee:'',
        typeCoupon:'store',
        couponList:'',
        unUser:true,
        wishList:false,
        switchCheck:true,
        address:{
          receiveName:'',
          telephone:'请设置收货地址',
          provinceName:'',
          cityName:'',
          countyName:'',
          exactAddress:''
        },
        postData:{},
        orderData:{
          orderPayVo:{
            orderList:[{storeTye:'20'}]
          },
          platformCouponList:[],
          unionMap:{wealIcon:'132'}
        },
        state:true,
        storeVids:{},
        platformVid:{
          storeId:-1,
          price:0
        },
        priceTotal:0,
        postDataDone:false
      }
    },
    mounted(){
      this.$header.setTitle('确认订单')
      var that =this
      window.orderConfirm=(res)=>{
        that.getAppData('wishList',function (res) {
          that.postData=JSON.parse(res);
          let addressId = window.localStorage.getItem('orderAddress')
          that.getAddress(addressId)
        })
      }
      this.syJsbIosRegisterHandler('orderConfirm')
    },
    created() {
      var that =this
      this.getAppData('wishList',function (res) {
        that.postData=JSON.parse(res);
        let addressId = that.$route.query.addressId
        that.getAddress(addressId)
      })
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
    computed:{
    },
    methods: {
      zanwugongneng(){
        if(this.state)return;
        this.juanzen=!this.juanzen
      },
      moneyFormat(p){
        if(!p&&p!=0) return
        if(p==0)return 0
        p=parseFloat(p)
        p=p/100
        p=p.toString()
        var arr=p.split('.')
        if(!arr[1]){
          arr[1]="00"
        }else if(arr[1].length==1){
          arr[1]=arr[1]+"0"
        }
        return arr[0]+'.'+arr[1]
      },
      priceTotalFn(){
        this.priceTotal=0;
        for(var key in this.storeVids){
          this.priceTotal +=this.storeVids[key].price||0
        }
        this.priceTotal +=this.platformVid.price
      },
      closedCoupon(p,data){
        this.unUser=true
        for(var i=0;i<data.length;i++){
          data[i].isAutoCheck=0
        }
        p.isAutoCheck=2
        this.checkData()
        this.wishList=false;
      },
      checkData(p){
        if(this.typeCoupon=='store'){
          var obj={}
          for(var i=0;i<this.orderData.orderPayVo.orderList.length;i++){
            var storeId=this.orderData.orderPayVo.orderList[i].storeId
            for(var j=0;j<this.orderData.orderPayVo.orderList[i].storeCouponList.length;j++){
              if(this.orderData.orderPayVo.orderList[i].storeCouponList[j].isAutoCheck==2){
                var voucherId=this.orderData.orderPayVo.orderList[i].storeCouponList[j].voucherId
                obj[storeId]=voucherId
                break;
              }else{
                obj[storeId]='no'
              }
            }
          }
          this.storeCoupon=obj
          this.getDataC({
            goodsMap:JSON.stringify(this.postData),
            addressId:this.address.addressId,
            storeVids:JSON.stringify(this.storeCoupon),
            platformVid:this.platformVid.storeId==-1?'':this.platformVid.storeId,
            isAidCoupon:this.switchCheck?'yes':'no'
          })
        }else{
          for(var i=0;i<this.orderData.platformCouponList.length;i++){
            if(this.orderData.platformCouponList[i].isAutoCheck==2){
              this.platformVid.storeId=this.orderData.platformCouponList[i].voucherId
              break;
            }else{
              this.platformVid.storeId='no'
            }
          }
          this.getDataC({
            goodsMap:JSON.stringify(this.postData),
            addressId:this.address.addressId,
            storeVids:!this.storeCoupon?'':JSON.stringify(this.storeCoupon),
            platformVid:this.platformVid.storeId==-1?'':this.platformVid.storeId,
            isAidCoupon:this.switchCheck?'yes':'no'
          })
        }
      },
      closedCop(){
        this.unUser=false
        for(var i=0;i<this.couponList.length;i++){
          this.couponList[i].isAutoCheck=0
        }
        this.checkData()
        this.wishList=false;
      },
      goUrl(p,type){if(p.length<=0){
        this.$toast('您还没可使用的优惠券！')
        return;
      }
        this.typeCoupon=type,
        this.couponList=p
        for(var i=0;i<this.couponList.length;i++){
          if(this.couponList[i].isAutoCheck==2){
            this.unUser=true
            break;
          }else{
            this.unUser=false
          }
        }

//        this.checkData()
        this.wishList=true;
      },
      computerClass(){
        if(!this.state) return false
        for(var i=0;i<this.orderData.orderPayVo.orderList.length;i++){
          for( var j=0;j<this.orderData.orderPayVo.orderList[i].goodsList.length;j++){
            if(this.orderData.orderPayVo.orderList[i].goodsList[j].limitArea!=1){
              this.state=false
            }
          }
        }
      },
      submitOrder(){
        if(this.postDataDone)return;
        this.postDataDone=true
        setTimeout(()=>{
          this.postDataDone=false
        },1000)
        if(this.state)return;
        var obj={}
        for(var i=0;i<this.orderData.orderPayVo.orderList.length;i++){
          var key=this.orderData.orderPayVo.orderList[i].storeId
          for(var j=0;j<this.orderData.orderPayVo.orderList[i].storeCouponList.length;j++){
            if(this.orderData.orderPayVo.orderList[i].storeCouponList[j].isAutoCheck==2){
              obj[key]=this.orderData.orderPayVo.orderList[i].storeCouponList[j].voucherId
              break
            }else{
              obj[key]=''
            }
          }
        }
        var msg={}
        for(var i=0;i<this.orderData.orderPayVo.orderList.length;i++){
          var store_id=this.orderData.orderPayVo.orderList[i].storeId
          msg[store_id]=this.orderData.orderPayVo.orderList[i].msg
        }
        var platformVid=''
        for(var i=0;i<this.orderData.platformCouponList.length;i++){
          if(this.orderData.platformCouponList[i].isAutoCheck==2){
            platformVid=this.orderData.platformCouponList[i].voucherId;
            break
          }else{
            platformVid='';
          }
        }
        var data = {
          goodsMap:JSON.stringify(this.postData),
          addressId:this.address.addressId,
          msgs:JSON.stringify(msg),//留言{ "33333":"快点发", "33332":"快点发2"}
          storeVids:JSON.stringify(obj),//优惠券{ "33333":"111", "33332":"222"}
          platformVid:platformVid,
          isAidCoupon:this.switchCheck?'yes':'no',
          orderSource:'app',
          creatorType:'10',
          shareMid:'',
          preOrderId:'',
          preMemberId:""
        }
        type["postSubmitOrder"](data).then((res)=>{
          if(res.data.code==200){
            if(Math.round(this.orderData.orderPayVo.allPayFee)==0){
              this.appOpen('success_v1',{mainId:res.data.data.mainId,payWay:'biz_pay'})
            }else{
              this.appOpen('payment',{mainId:res.data.data.mainId})
            }
//            this.$router.push({path:'/payment',query:{mainId:res.data.data.mainId}})
          }else{
            this.appNotify({callback:'wishListRefresh'})
            this.$alert(res.data.message,function () {})
            this.state=true
          }
        })
      },
      redirectUrl(name){
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name)>-1) {
          var obj = {}
          var arr = query.split("&");
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
          };
          delete obj[name];
          var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");

          return url
        }else{
          return baseUrl
        }
      },
      goEditAddress(){
        let url = this.redirectUrl("addressId")
        if(/isShare=yes/ig.test(window.location.href)){
          this.appOpen('cd',{order:'order1',callback:encodeURIComponent(url)})
        }else{
          this.appOpen('cd',{order:'order',callback:encodeURIComponent(url)})
        }
//        this.$router.replace({path: '/cd',query:{callback:encodeURIComponent(url)}});
      },
      getAddress(addressId){
        if(!addressId){
          typeAddress['getAddressList']().then((res)=>{
            if(res.data.code==200&&!res.data.content){
              this.goEditAddress()
            }else if(res.data.code==200&&res.data.content.length>0){
              this.address=res.data.content[0]
              this.getData({
                goodsMap:JSON.stringify(this.postData),
                addressId:this.address.addressId,
                storeVids:'',
                platformVid:'',
                isAidCoupon:'yes'
              })
            }else{
              this.$toast(res.data.message)
            }
          })
        }else{
          typeAddress['getAddressInfo'](addressId).then((res)=>{
            if(res.data.code==200){
              this.address=res.data.content
              this.getData({
                goodsMap:JSON.stringify(this.postData),
                addressId:this.address.addressId,
                storeVids:'',
                platformVid:'',
                isAidCoupon:'yes'
              })
            }else{
              this.$toast(res.data.message)
            }
          })
        }
      },
      getData(data){
        type['getPreSubmit'](data).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            for(var i=0;i<res.data.data.orderPayVo.orderList.length;i++){
              res.data.data.orderPayVo.orderList[i]['msg']=""
            }
            this.orderData=res.data.data
            this.computerClass()
          }else{
            this.$toast(res.data.message)
          }
        })
      },
      getDataC(data){
        type['getPreSubmit'](data).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            for(var i=0;i<this.orderData.orderPayVo.orderList.length;i++){
              res.data.data.orderPayVo.orderList[i]['msg']=this.orderData.orderPayVo.orderList[i].msg
            }
            this.orderData=res.data.data
            this.computerClass()
          }else{
            this.$toast(res.data.message)
          }
        })
      },
      switchFn(p){
        if(!p){
          this.allAidCouponFee=this.orderData.orderPayVo.allAidCouponFee
        }else{
          this.allAidCouponFee=0
        }
        this.checkData()
      }
    },
    components: {sySwitch},
  }
</script>

<style lang="scss" scoped>
  .isHeight{
    height: 100% !important;
  }
  .addHeight{
    height: 5rem !important;
    background: #fff;
  }
  .juanzeng-bg{
    width: 6.6rem;
    margin-left: 0.45rem;
    position: absolute;
    top:1rem;
    box-shadow:0px 4px 14px 0px rgba(0,0,0,0.2);
    border-radius:8px;

  }
  .have-bg{
    height: 4.13rem;
    background: url(../../../static/images/biz/order-bg.png) no-repeat center center ;
    background-size: 7.5rem ;
  }
  .height2rem{
    height:2rem !important;
  }
  img{
    display: block;
    border: 0;
  }
  .linetrue{
    line-height:2rem !important;
  }
  .uniond{
    position: absolute;
    top:0;
    width: 100%;
    text-align: center;
    font-size:0.26rem;
    color:rgba(255,255,255,1);
    line-height:1rem;
  }
  .model-btn{
    height:1rem;
    font-size:0.34rem;
    text-align: center;
    color:rgba(0,122,255,1);
    line-height:1rem;
    width: 100%;
  }
  .t{
    height:0.5rem;
    font-size:0.32rem;
    color:rgba(46,46,46,1);
    line-height:0.5rem;
    margin: 0.3rem 0 0.2rem 0;
  }
  .n{
    font-size:0.32rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.5rem;
     }
  .model-content{
    padding:0.3rem;
    height: 5rem;
    overflow-y: scroll;
  }
  .model-p{
    width:6.6rem;
    height:7.80rem;
    background:rgba(255,255,255,1);
    border-radius:0.16rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -3.9rem 0 0 -3.3rem;
    z-index: 9999999;
  }
  .title{
    text-align: center;
    height:1.2rem;
    font-size:0.36rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:1.2rem;
  }
  .top-flex{
    height: 124px;
  }
  .go-back{
    width:0.88rem;
    height:44px;
    background:url(../../../static/images/common/goBack.png) no-repeat center center;
    background-size: 0.56rem;
    position: absolute;
    left: 0.3rem;

  }
  .coupon-t{
    height:0.24rem;
    font-size:0.24rem;
    color:rgba(46,46,46,1);
    line-height:0.24rem;
  }
  .p-right{
    text-align: center;
    position: absolute;
    top:0.64rem;
    right: 0rem;
    width: 2rem;
  }
  .coupon-header{
    text-align: center;
    height:44px;
    font-size:0.36rem;
    color:rgba(46,46,46,1);
    line-height:44px;
    position: relative;
  }
  .coupon-tips{
    height: 36px;
    line-height: 36px;
    font-size:0.24rem;
    color:rgba(148,148,148,1);
    padding-left: 0.72rem;
    background: url(../../../static/images/common/couponTips.png) no-repeat 0.3rem center;
    background-size: 0.32rem;
  }
  .coupon-time{
    position: absolute;
    bottom: 0.3rem;
    left: 0.3rem;
    height:0.24rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.24rem;
  }
  .coupon-price{
    height:0.64rem;
    font-size:0.44rem;
    font-weight: 600;
    color:rgba(255,25,25,1);
    line-height:0.64rem;
  }
  .coupon-dec{
  height:0.36rem;
  font-size:0.26rem;
  font-weight: 300;
  color:rgba(75,75,75,1);
  width: 4.2rem;
  line-height:0.36rem;
    margin-left:0.3rem;
  }
  .have{
    margin: 0.24rem 0 0 0.3rem;
  }
.coupon-title{
  margin: 0.29rem 0 0.16rem 0.3rem;
  height:0.32rem;
  font-size:0.32rem;
  color:rgba(46,46,46,1);
  line-height:0.32rem;

}
  .choose-cp{
    background: url(../../../static/images/common/checked.png) no-repeat center center !important;
    background-size: 0.44rem !important;
  }
  .choosed{
    position: absolute;
    right:0.3rem;
    top:0.22rem;
    width:0.44rem;
    height: 0.44rem;
    background: url(../../../static/images/common/cir.png) no-repeat center center;
    background-size: 0.44rem;
  }
  .unUser{
    position: relative;
    height:44px;
    font-size:0.32rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
    line-height:44px;
    background:rgba(255,255,255,1);
    padding-left: 0.3rem;
  }
  .wishList{
    overflow-y: scroll;
    z-index: 9999;
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background:rgba(249,249,249,1);
    transition: transform 0.3s ease;
  }
  body .haveBg{
    background: url(../../../static/images/common/haveBg.png) no-repeat center center;
    background-size: cover;
  }
  .coupon-bg{
    position: relative;
    height: 2.24rem;
    width: 6.9rem;
    background: url(../../../static/images/common/unBg.png) no-repeat center center;
    background-size: cover;
    overflow: hidden;
    margin: 0 auto 0.2rem;
  }
  .slide-left-enter-active, .slide-left-leave-active {
    /*transition: opacity .5s;*/
    transform: translate(0rem,0px);
  }
  .slide-left-enter, .slide-left-leave-to {
    /*opacity: 0;*/
    transform: translate(7.5rem,0px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
img{
  border: 0;
}
.un-click{
  background: #ddd !important;
}
  .wrapper-top {
    overflow: hidden;
    width: 100%;
    .header {
      overflow: hidden;
      height: auto;
    }
    .blank {
      height: 0.2rem;
      background: #FAFAFA;
    }
    .address-wrapper {
      overflow: hidden;
      .li-wrapper {
        overflow: hidden;
        text-align: left;
        padding-left: 0.8rem;
        height: 1.7rem;
        box-sizing: border-box;
        background: #fff url('../../../static/images/common/local@1.5x.png') no-repeat 0.27rem 0.28rem;
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
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .default {
            border-radius: 0.04rem;
            font-size: 0.24rem;
            color: rgba(255, 25, 25, 1);
            margin-left: 0.3rem;
            border: 1px solid rgba(255, 25, 25, 1);
            padding: 0 0.09rem;
          }
        }

        .address {
          .edit {
            height: 0.27rem;
            float: right;
            margin-top: 0.04rem;
            margin-right: 0.3rem;
          }
          .address-txt {
            font-size: .26rem;
            line-height: .40rem;
            width: 6rem;
            display: inline-block;
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
      .shop {
        height: 0.88rem;
        padding-left: 0.3rem;
        img, span {
          float: left;
        }
        span {
          margin-top: 0.30rem;
          margin-left: 0.1rem;
          font-size: 0.28rem;
          margin-right: 0.07rem;
          line-height: 0.28rem;
          font-weight: 300;
          color: rgba(46, 46, 46, 1);
        }
        .head-img {
          margin-top: 0.19rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }
        img {
          margin-top: 0.26rem;
          height: 0.36rem;
        }
      }
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
            overflow: hidden;
            margin-bottom: 0.23rem;
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
          margin: 0 0 0.33rem 0;
          padding-left: 0.2rem;
        }
      }
      .goods-list:nth-last-of-type(1)::after {
        border-bottom: 0;
      }
    }
    .list {

      .common {

        margin-left: 0.3rem;
        padding-right: 0.3rem;
        span {
          line-height: 0.88rem;
          font-size: 0.3rem;
          color: rgba(75, 75, 75, 1);
        }
        .s-right {
          float: right;
        }
      }
      .common:nth-last-of-type(1)::after {
        border-bottom: 0;
      }
      .favourable {
        height: 0.88rem;
        padding-right: 0.6rem;
        background: url('../../../static/images/common/arrow.png') no-repeat 6.8rem 0.29rem;
        background-size: 0.13rem;
        .s-right {
          color: rgba(255, 25, 25, 1);
        }
      }
      .message {
        font-size: 0.3rem;
        color: rgba(208, 208, 208, 1);
      }
    }
    .total {
      text-align: right;
      font-size: 0.26rem;
      color: rgba(75, 75, 75, 1);
      height: 0.88rem;
      line-height: 0.88rem;
      padding-right: 0.3rem;
      span {
        color: #FF1919;
      }
    }
    .pay {
      overflow: hidden;
      > div {
        margin-left: 0.3rem;
        padding-right: 0.3rem;
        height: 0.88rem;
        span {
          font-size: 0.3rem;
          line-height: 0.88rem;
          color: rgba(75, 75, 75, 1);
        }
        span.red {
          color: #FF1919;
        }
        .div-ck {
          margin-right: -0.3rem;
          float: right;
        }
      }
      > div:nth-last-of-type(1) {
        border-bottom: 0;
      }
    }

  }

  .footer-div {
    height: 0.8+0.98rem;
    background: #fff;
  }
  .m-right {
    margin-right: 0.3rem;
  }

  .bg-right {
    background: url('../../../static/images/common/arrow.png') no-repeat 6.8rem 0.29rem;
    background-size: 0.13rem;
  }

  .s-left {
    float: left;
  }

  .s-right {
    float: right;
  }

  .s-red {
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
    padding-left: 0.3rem;
    font-size:0.3rem;
    color:#2e2e2e;
    width: 4.5rem;
    height:0.98rem;
    background:rgba(248,248,248,1);
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
.model{
  opacity: 0.4;
}
</style>
