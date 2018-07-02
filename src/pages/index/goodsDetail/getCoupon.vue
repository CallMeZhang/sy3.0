<template>
  <div class="box">
    <div class="coupon-list bg-f clearfix relative" v-for="(item,index) in coupon.canGetList">
      <div class="left fl">
        <div class="left-con">
          <div class="con-top">
            <p class="font32 no-enter con-1 left-con-big" v-if="item.couponTitle">{{item.couponTitle}}</p>
            <p class="font26 no-enter2 con-2">{{item.couponDesc}}</p>
          </div>
          <p class="font24 con-time">{{item.startDate | getCoupons(item.endDate,item.validityDay,item.validityType)}}</p>
        </div>
      </div>
      <div class="top absolute"></div>
      <div class="bottom absolute"></div>
      <div class="right fr">
        <!--左上角张数-->
        <div class="num absolute" data-type="1" v-if="item.oneLimitType != 3 && (item.oneLimitAmount > 1)"><!--只有一张不显示-->
          <div class="num-top font24" v-if="item.oneLimitAmount!=0">共{{item.oneLimitAmount}}张</div>
          <div class="r-triangle">
            <div></div>
          </div>
          <div class="num-bottom"></div>
        </div>
        <div class="right-con">
          <p class="con-3">
            <span class="con-mon font36">¥</span>
            <span class="con-num">{{item.reducePrice}}</span>
          </p>
          <p class="con-4 font24">满{{item.toPrice}}元可用</p>
          <div class="con-5 font24" @click="getCoupon(item.tid,item.oneLimitType)">立即领取</div>
        </div>
      </div>
      <div class="absolute bor-line ">
        <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
      </div>
    </div>

    <div class="coupon-list bg-f clearfix relative" v-for="(item,index) in coupon.haveGetList">
      <div class="left fl">
        <div class="left-con">
          <div class="con-top">
            <p class="font32 no-enter con-1 left-con-big use-color" v-if="item.couponTitle">{{item.couponTitle}}</p>
            <p class="font26 no-enter2 con-2 use-color">{{item.couponDesc}}</p>
          </div>
            <!--<p class="font24 con-time use-color">{{item.startDate | date}}-{{item.endDate | date}}</p>-->
            <p class="font24 con-time use-color">{{item.startDate | unGetCoupons(item.endDate,item.validityDay,item.validityType)}}</p>
        </div>
      </div>
      <div class="top absolute"></div>
      <div class="bottom absolute"></div>
      <div class="right fr" ></div>
      <div class="absolute bor-line ">
        <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
      </div>
      <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
        <p class="con-3">
          <span class="con-mon font36 use-color">¥</span>
          <span class="con-num use-color">{{item.reducePrice}}</span>
        </p>
        <p class="con-4 font24 use-color">满{{item.toPrice}}元可用</p>
        <div class="con-5 font24 use-color">已经领取</div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
    function date(v){
        if(v){
            return v.replace(/-/g,'.');
        }
    };
    export default {
        name:"getCoupon",
        props:['coupon','goodsId'], //coupon优惠券数组，由父级页面提供
        data(){
            return {
                bigTitle:"",
                bigTitle1:"五一钜惠好礼券",
                getColor:false,//领取过后的颜色判断
            }
        },
        created () {
//            this._f = function (id) {
//                return this.$options.filters[id].bind(this._self)
//            }
        },
        mounted(){

        },
        methods:{
            getCoupon(tid,type){      //领取剩余的优惠券   oneLimitType 限领类型 1、当前活动总共限领；2、每日 3无限制
                var o = {};
                o.tid = tid;
                if(type == 3){      //无限制的不进行一键领取
                    var url = '/coupon-center/couponApp/receiveCoupon';
                    this.getWithToken(url,o).then(res =>{
                        if(res && res.code == 200){
                            setTimeout(()=>{
                                this.$emit("refresh");  //刷新列表？还是自己操作数组？目前可能会引起dom闪动
                            },200)
                            this.appNotify({callback:'mineRefresh'})   //刷新tab第五个页面
                            this.$toast(res.message);
                        }else if(res.code != 403){
                            this.$toast(res.message);
                        }
                    })
                }else{              //一键领取
                    var url = '/coupon-center/couponApp/receiveAllCoupon';
                    this.getWithToken(url,o).then(res =>{
                        if(res && res.code == 200){
                            setTimeout(()=>{
                                this.$emit("refresh");
                            },200)
                            this.appNotify({callback:'mineRefresh'})
                            this.$toast(res.message);
                        }else if(res.code != 403){
                            this.$toast(res.message);
                        }
                    })
                }
            },

        },
        filters:{
            getCoupons(startDate,endDate,validityDay,validityType){ //开始时间（领取时间），结束时间，可使用天数，使用类型
                if (validityType == 1) {        //给了可使用天数
                    return "领取后" + validityDay + "天内可使用";
                }else{
                    return date(startDate) + "-" + date(endDate);
                }
            },
            unGetCoupons(startDate,endDate,validityDay,validityType){
                return date(startDate) + "-" + date(endDate);
            }
        }
    }
</script>

<style scoped>
  .box{
    padding-bottom:0.2rem;
  }
  .coupon {
    width:100%;
    height:6.62rem;
    top:6.72rem;
    left:0;
    background: rgba(250,250,250,1);
    overflow: auto;
  }
  .coupon-top {
    height:5.44rem;
    background: #000;
    opacity: .4;
  }
  .coupon-title {
    width:7.5rem;
    height:1.28rem;
    text-align: center;
    line-height: 1.28rem;
    background: #FFFFFF;
  }
  .title-img {
    width:.44rem;
    height:.44rem;
    top:.14rem;
    right:.1rem;
  }
  /*优惠券列表*/
  .coupon-list {
    margin: .2rem .3rem 0;
  }
  /*优惠券边框*/
  .left,.right{
    height:2.24rem;
    border:1px solid #E3E3E3;

  }
  .left {
    width:4.78rem;
    border-right: none;
    border-radius:.08rem 0 0 .08rem;
  }
  .left-con {
    padding:0 .33rem .27rem .3rem;
  }
  .left-con-big{
    padding-top:.29rem;
  }
  .con-top {
    height:1.73rem;
    box-sizing: border-box;
  }
  .con-1 {
    color:rgba(46,46,46,1);
    line-height:0.32rem;
    /*padding-bottom:.16rem;*/
  }
  .con-2 {
    padding-top:0.29rem;
    color:rgba(75,75,75,1);
    line-height:0.36rem;
    font-weight: 300;
  }
  .con-1 + .con-2{
    padding-top:0.16rem;
  }
  .con-2-top{
    padding-top:.25rem;
  }
  .con-time {
    color:rgba(75,75,75,1);
    line-height:0.24rem;
    font-weight: 300;
  }
  .right {
    width:1.84rem;
    border-left: none;
    border-radius:0 .08rem .08rem 0;
  }
  .right-con {
    text-align: center;
    padding-top:.26rem;
    right:.32rem;
    top:0;
    z-index:5;
  }
  .right-use {
    padding-top:.64rem !important;
  }
  .con-3 {
    padding-bottom: .09rem;
    white-space:nowrap;
  }
  .con-mon {
    color:rgba(255,25,25,1);
    line-height:0.36rem;
    z-index: 10;
  }
  .con-num {
    font-size: .64rem;
    color:rgba(255,25,25,1);
    line-height:0.64rem;
    font-weight: 700;
    z-index: 10;
  }
  .con-4 {
    color:rgba(46,46,46,1);
    line-height:0.24rem;
    padding-bottom:.16rem;
    z-index: 10;
  }
  .con-5 {
    width:1.2rem;
    height:0.56rem;
    border:1px solid #FF1919;
    border-radius: 0.04rem ;
    line-height: .56rem;
    margin: 0 auto;
    color:rgba(255,25,25,1);
    z-index: 10;
  }
  .top{
    width:.22rem;
    height:.1rem;
    border:1px solid #E3E3E3;
    border-top:none;
    border-radius:0 0 .12rem .12rem;
    left:4.78rem;
    top:0;
    background: #FFFFFF;
  }
  .bottom{
    width:.22rem;
    height:.1rem;
    border:1px solid #E3E3E3;
    border-bottom:none;
    border-radius:.12rem .12rem 0 0;
    left:4.78rem;
    bottom:0;
    background: #FFFFFF;
  }
  .bor-line {
    height:1.9rem;
    top:.17rem;
    left:4.89rem;
  }
  .line-img {
    width:100%;
    height:100%;
  }
  /*优惠券数量*/
  .num {
    width:.89rem;
    height:.5rem;
    top:-.1rem;
    left:-.14rem;
  }
  .num-top {
    height:.34rem;
    background:rgba(255,101,51,1);
    color:#fff;
    line-height:0.36rem;
    padding-left:.1rem;
    /*text-align: center;*/
  }
  .num-bottom {
    width:0;
    height:0;
    border-color: transparent rgba(255,25,25,1);
    border-width:0 .14rem .14rem 0;
    border-style:solid;
  }
  .r-triangle {
    position: relative;
    width: .1rem;
  }
  .r-triangle > div{
    position: absolute;
    top:-.34rem;
    left:.88rem;
    border-style: solid;
    border-width: .17rem .1rem .17rem 0;
  }
  .r-triangle > div:after {
    position: absolute;
    left: -250px;
  }
  .r-triangle > div:first-child{
    border-color: rgba(255,101,51,1) transparent rgba(255,101,51,1) transparent;
  }
  .use-color {
    border-color:rgba(208,208,208,1) !important ;
    color:rgba(208,208,208,1) !important;
  }
  .border-red {
    border-color:#FF1919 !important;
    color:#FF1919 !important;
  }
  .use {
    width:1.13rem;
    height:.99rem;
    bottom:1px;
    right:1px;
    z-index: 0;
  }
  .use-img {
    width:100%;
    height:100%;
  }
</style>
