<template>
  <div class="coupon">
    <div v-title="'优惠券'"></div>
    <div>
      <!--顶部tab键切换-->
      <div class="flex head bg-f" v-show="whereCoupon == 'userCenter'">
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='unused'}" @click="select('unused')">
          <p class="">未使用</p>
          <div class="red-line absolute" v-show="chooseType=='unused'"></div>
        </div>
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='used'}" @click="select('used')">
          <p>使用记录</p>
          <div class="red-line absolute" v-show="chooseType=='used'"></div>
        </div>
      </div>
      <!--是否使用红包-->
      <div v-show="whereCoupon == 'order'">
        <div class="use-coupon border-bottom-1px font32 bg-f" @click="unUsedPacket">
          <div class="clearfix">
            <p class="fl">不使用优惠券</p>
            <img class="choose-bor fr" :src="useImg?imgUrl+'/common/checked.png':imgUrl+'/common/cir.png'" alt="选择框">
          </div>
        </div>
        <div class="use-num clearfix">
          <img :src="imgUrl+'/common/warn.png'" alt="提示" class="coupon-img fl">
          <p class="coupon-det font24 fl">优惠券不能使用多张</p>
        </div>
      </div>
      <!--无优惠券 -->
      <div class="none-list" v-show="couponList.length == 0">
        <img :src="chooseType=='unused'?imgUrl+'/common/error.png':imgUrl+'/common/error1.png'" alt="暂无列表" class="none-img" >
        <p class="none-det font32">
          <span v-show="chooseType=='unused'">您暂无可用优惠券</span>
          <span v-show="chooseType=='used'">您还没有使用记录</span>
        </p>
      </div>
      <!--优惠券列表-->
      <div class="coupon-list bg-f clearfix relative" v-for="coupons in couponList" @click="checkCoupon(coupons)">
        <div class="left fl" :class="{'border-red':redBor == coupons.voucherId}">
          <div class="left-con "  >
            <div class="con-top">
              <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':chooseType=='used' || coupons.leftDay <= 0}" v-show="coupons.couponTitle">{{coupons.couponTitle}}</p>
              <p class="font26 no-enter2 con-2" :class="{'con-2-top':!coupons.couponTitle,'use-color':chooseType=='used' || coupons.leftDay <= 0}">{{coupons.couponDesc}}</p>
            </div>
            <div class="font24 con-time">
              <p :class="{'use-color':chooseType=='used' || coupons.leftDay <= 0}" v-show="(coupons.leftDay > 3 || coupons.leftDay <= 0 && chooseType == 'unused') || chooseType == 'used'">{{coupons.startDate | date}}-{{coupons.endDate | date}}</p>
              <p :class="{'use-color':chooseType=='used' || coupons.leftDay <= 0}" v-show="coupons.leftDay <= 3 && coupons.leftDay > 0 && chooseType == 'unused'">还有<span class="border-red">{{coupons.leftDay}}</span>天过期</p>
            </div>
          </div>
        </div>
        <div class="top absolute" :class="{'border-red':redBor == coupons.voucherId}"></div>
        <div class="bottom absolute" :class="{'border-red':redBor == coupons.voucherId}"></div>
        <div class="right fl" :class="{'border-red':redBor == coupons.voucherId}">
          <!--右侧内容-->
          <div class="right-con" :class="{'right-use':(chooseType=='used' || coupons.leftDay <= 0) || whereCoupon == 'order'}">
            <p class="con-3">
              <span class="con-mon font36" :class="{'use-color':chooseType=='used' || coupons.leftDay <= 0}">¥</span>
              <span class="con-num" :class="{'use-color':chooseType=='used' || coupons.leftDay <= 0}">{{coupons.reducePrice}}</span>
            </p>
            <p class="con-4 font24" :class="{'use-color':chooseType=='used' || coupons.leftDay <= 0}">满{{coupons.toPrice}}元可用</p>
            <div class="con-5 font24" :class="{'use-color':chooseType=='used' || coupons.leftDay <= 0}"
                 v-show="chooseType=='unused' && whereCoupon == 'userCenter' && coupons.leftDay > 0"
                 @click="goUse(coupons)">去使用</div>
          </div>
        </div>
        <div class="absolute bor-line ">
          <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
        </div>
        <div class="use absolute" v-show="chooseType=='used'">
          <img :src="imgUrl+'/coupon/use.png'" alt="已使用" class="use-img">
        </div>
        <div class="use absolute" v-show="chooseType=='unused' && coupons.leftDay <= 0">
          <img :src="imgUrl+'/coupon/expired.png'" alt="已过期" class="use-img">
        </div>
      </div>
      <div :class="{'line-empty':whereCoupon == 'order'}"></div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:"coupon",
    components:{},
    data(){
      return {
        chooseType:'unused',//tab键切换
        useImg:false,
        checkImg:"/common/checked.png",
        redBor:false,//选中优惠券
        whereCoupon:'',
        pageSize:10,//每页显示数量
        curPage:1,//当前页
        couponList:[],
        hasNextPage:false,//是否有下一页
        isLoading:false,//正在加载中,
        setName:''
      }
    },
    created(){
      this.whereCoupon = this.$route.query.whereCoupon || ''
      if(this.whereCoupon == 'order'){
        var that = this
        this.getAppData('coupon',function (res) {
          that.couponList = JSON.parse(res).coupon;
          that.setName = JSON.parse(res).name;
          for (var i = 0; i < that.couponList.length; i++){
            if(that.couponList[i].isAutoCheck == 1){
              that.redBor = that.couponList[i].voucherId
            }
          }
          this.$loading.show=false
        })
      }else if(this.whereCoupon == 'userCenter'){
        this.getUnUseData()
      }
      this.$scroll(()=>{
        if(this.hasNextPage){
          if (!this.isLoading) {
            this.getUnUseData();
          }else{
            console.log("请求中..骚等")
          }
        }
      })
    },
    mounted(){
      this.$header.setTitle('优惠券');
    },
    filters:{
      date(v){
        if(v){
          return v.replace(/-/g,'.');
        }

      },
    },
    methods:{
      //获取数据
      type(){
        return this.chooseType === 'unused'?'memberUnUsedCouponList':'memberUsedCouponList'
      },
      getUnUseData(){
        this.isLoading = true;
        this.getWithToken('/coupon-center/couponApp/' + this.type(),
          {pageSize:this.pageSize,curPage:this.curPage})
          .then(res => {
            this.$loading.show=false
          if(res.code == 200){
            this.hasNextPage = res.data.couponList.hasNext;
            if(!this.hasNextPage){
              this.couponList = res.data.couponList;
            }else{
              this.couponList = this.couponList.concat(res.data.couponList);
            }
            this.isLoading = false;
          }else{
            this.$toast(res.message);
            this.$loading.show=false
          }},err =>{
            this.isLoading = false;
        })
      },
      //去使用
      goUse(v){
       if(v.creatorType == 0 && v.jumpType == 1){
         //跳转助理人列表
         this.appOpen('assistant',{storeId:v.jumpId})
       }else if(v.creatorType == 0 && v.jumpType == 2){
         //跳转商品详情
         this.appOpen('goodsDetail',{goodsId:v.jumpId})
       }else if(v.creatorType == 1){
         //平台优惠券跳转链接
         this.appOpen(v.jumpUrl,null,true)
       }
      },
      //切换键
      select(v){
        this.couponList = []
        switch (v) {
          case "unused":
            this.chooseType = "unused";
            this.getUnUseData()
            break;
          case "used":
            this.chooseType = "used";
            this.getUnUseData()
            break;
        }
      },
      //选中优惠券
      checkCoupon(v){
        // if(this.chooseType == "unused"){
        //   this.redBor == v.voucherId?this.redBor = '':this.redBor = v.voucherId;
        // }else
        if(this.whereCoupon == "order"){
          this.redBor = v.voucherId;
          setTimeout(()=>{
            this.setAppData({ 'h5Key': this.setName , 'h5Value' :JSON.stringify({reducePrice:v.reducePrice,voucherId:v.voucherId})})
            this.syJsbCloseAppPage(1,0)
          },1000)
        }

      },
      //不使用红包
      unUsedPacket(){
        this.useImg = !this.useImg;
        if(this.useImg){
          setTimeout(()=>{
            this.setAppData({ 'h5Key': this.setName , 'h5Value' :JSON.stringify({reducePrice:'',voucherId:''})})
            this.syJsbCloseAppPage(1,0)
          },1000)
        }
      },
    },


  }
</script>

<style scoped>
  .coupon {
    background: rgba(250,250,250,1);
    height:100%;
  }
  /*顶部tab键切换*/
  .head {
    height:.9rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom:1px solid #E3E3E3;
  }
  .head-com {
    width:1.6rem;
    height:.9rem;
    padding:0 .25rem;
    text-align: center;
    line-height:.86rem;
    font-weight: 300;
    margin: 0 auto;
  }
  .read-font {
    font-weight: 500 !important;
    color:rgba(255,25,25,1);
  }
  .red-line {
    width:1.6rem;
    height:0.04rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    left:.25rem;
    bottom:0;
    z-index:10;
  }
  /*是否使用优惠券*/
  .use-coupon {
    color:rgba(46,46,46,1);
    line-height:0.88rem;
    padding:0 .3rem;
    box-sizing: border-box;
  }
  .choose-bor {
    margin-top:.22rem;
    width:.44rem;
    height:.44rem;
  }
  .use-num {
    height:.52rem;
    box-sizing: border-box;
    padding:0 .3rem;
    vertical-align: middle;
  }
  .coupon-img {
    width:.32rem;
    height:.32rem;
    margin: .2rem .1rem 0 0;
  }
  .coupon-det {
    line-height: .72rem;
    color:rgba(148,148,148,1);
    display: inline-block;
  }
  /*暂无列表*/
  .none-list {
    padding-top: 2.4rem;
  }
  .none-img {
    display: block;
    margin: 0 auto;
    width:3.1rem;
    height:3.1rem;
  }
  .none-det {
    color:rgba(208,208,208,1);
    line-height:0.32rem;
    padding-top:.3rem;
    text-align: center;
  }
  /*优惠券列表*/
  .coupon-list {
    margin: .2rem .3rem 0;
  }
  /*优惠券边框*/
  .left,.right{
    height:2.24rem;
    margin-left:1px;
    border:1px solid #E3E3E3;

  }
  .left {
    width:69%;
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
    padding-bottom:.16rem;
  }
  .con-2 {
    color:rgba(75,75,75,1);
    line-height:0.36rem;
    font-weight: 300;
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
    width:26.4%;
    padding-left:.22rem;
    border-left: none;
    border-radius:0 .08rem .08rem 0;
  }
  .right-con {
    text-align: center;
    padding-top:.26rem;
    right:.32rem;
    top:0;
    z-index:99;
  }
  .right-use {
    padding-top:.64rem !important;
  }
  .con-3 {
    padding-bottom: .09rem;
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
    width:3%;
    height:.1rem;
    border:1px solid #E3E3E3;
    border-top:none;
    border-radius:0 0 .12rem .12rem;
    left:69%;
    top:0;
    background:rgba(250,250,250,1) ;
  }
  .bottom{
    width:3%;
    height:.1rem;
    border:1px solid #E3E3E3;
    border-bottom:none;
    border-radius:.12rem .12rem 0 0;
    left:69%;
    bottom:0;
    background:rgba(250,250,250,1) ;
  }
  .bor-line {
    height:1.9rem;
    top:.17rem;
    left:70.5%;
  }
  .line-img {
    width:100%;
    height:100%;
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
    right:.05rem;
    z-index: 0;
  }
  .use-img {
    width:100%;
    height:100%;
  }
  .line-empty {
    height:5rem;
  }
</style>
