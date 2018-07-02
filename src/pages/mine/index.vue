<template>
  <div class="mine">
    <div v-title="'个人中心'"></div>
    <!--title bar-->
    <div class="title-bar title-bar-pad header-paddingTop iphone10-paddingTop iphone10-footer relative"
         :class="{'border-bottom-1px':headerNavOpacity == 1}"
         :style="'background-color: rgba(255, 255, 255,' + headerNavOpacity + ');' +
               'background-image: linear-gradient(to bottom,rgba(0, 0, 0, ' + linearGradient + ') 0%, transparent 100%)'" id="titleBar">
      <p class="title font36" :style=" 'opacity:'+ headerNavOpacity ">我的</p>
      <div class="title-right-m" :class="{'title-bg':shartBtn}" :style=" 'opacity:'+ headerBtnOpacity"
           @click="appOpen('messageList')">
        <p class="num num-pos top-num bg-f num-double font24 absolute"
           :class="{'title-num':headerB,'bor-f':headerB}" v-show="mineData.messages > 0">{{mineData.messages < 100 ? mineData.messages : 99}}<span v-show="mineData.messages > 99" style="margin-left:-.04rem;padding-right:0;">＋</span></p>
      </div>
    </div>
    <!--头部用户信息-->
    <div class="mine-top relative" >
      <img :src="mineData.unionBackground ? mineData.unionBackground + ossUrl('webp_480') : imgUrl+'/mine/background.png'" alt="联盟背景" class="bg-img" id="alliance">
      <!--<div class="top-right absolute"  @click="$toast('暂无功能')">-->
      <!--<img :src="imgUrl+'/mine/message2.png'" alt="消息" class="title-message">-->
      <!--<p class="num num-pos top-num bg-f num-double font24 absolute">99<span style="margin-left:-.04rem ">＋</span></p>-->
      <!--</div>-->
      <div class="bg-user absolute" @click="goUnionInfo" v-if="mineData.orgName != '益客'">
        <p class="see-other font24">看看{{mineData.unionName}}怎样精准扶贫？</p>
      </div>
      <div class="user-info bg-f absolute">
        <div @click="appOpen('userSetting')">
          <!--头像-->
          <div class="relative bg-c">
            <!--<img :src="mineData.avatar == '' ? imgUrl+'/mine/avatar.png' : mineData.avatar + ossUrl('webp_120')" alt="" class="avatar absolute">-->
            <img :src="mineData.avatar == '' ? imgUrl+'/mine/avatar.png' : mineData.avatar + ossUrl('webp_120')" alt="" class="avatar absolute">
          </div>
          <!--员工信息-->
          <div class="user-det">
            <p class="font30 name">{{name()}}</p>
            <p class="font26 dep no-enter">{{mineData.orgName}}</p>
          </div>
        </div>
        <!--券-->
        <div class="flex ticket tick-height">
          <div class="money relative" @click="$toast('即将开通')">
            <p class="money-num">
              <span class="font30">{{money}}</span><span class="font24" v-show="money2 > 0">.{{money2}}</span>
            </p>
            <p class="font26 money-det">钱包余额</p>
            <p class="line absolute"></p>
          </div>
          <div class="money relative" @click="appOpen('publicIntegral')">
            <p class="money-num font30">{{mineData.points}}</p>
            <p class="font26 money-det">公益积分</p>
            <p class="line absolute"></p>
          </div>
          <div class="money relative"  @click="appOpen('povertyCode')">
            <p class="money-num">
              <span class="font30">{{code}}</span><span class="font24" v-show="code2 > 0">.{{code2}}</span>
            </p>
            <p class="font26 money-det">扶贫码</p>
            <p class="line absolute"></p>
          </div>
          <div class="money relative"  @click="appOpen('coupon',{whereCoupon:'userCenter'})">
            <p class="money-num font30">{{mineData.totalCoupon}}</p>
            <p class="font26 money-det">优惠券</p>
          </div>
        </div>
        <!--过期提醒-->
        <div class="remind-coupon absolute" v-show="mineData.expireCoupon > 0">
          <div class="relative">
            <p class="back ">有{{mineData.expireCoupon}}张将过期</p>
            <img :src="imgUrl+'/mine/triangle.png'" alt="三角" class="triangle absolute">
          </div>
        </div>
        <div class="remind-code absolute" v-show="mineData.expireAidCoupon > 0">
          <div class="relative">
            <p class="back " >有{{mineData.expireAidCoupon}}张将过期</p>
            <img :src="imgUrl+'/mine/triangle.png'" alt="三角" class="triangle absolute">
          </div>
        </div>
      </div>
    </div>
    <!--邀请/签到-->
    <div class="ticket bg-f invite-height flex border-bottom-1px border-top-1px relative" :class="{'he':mineData.orgName == '益客'}">
      <div class="invite clearfix" @click="invite">
        <img :src="imgUrl+'/mine/invite.png'" alt="邀请好友" class="invite-img fl">
        <div class="det fl">
          <p class="invite-tit font28">邀请有礼</p>
          <p class="invite-det font24">邀请好友得积分一起来帮扶</p>
        </div>
        <div class="invite-bor absolute"></div>
      </div>
      <div class="invite clearfix" @click="sign(mineData)">
        <img :src="imgUrl+'/mine/signIn.png'" alt="立即签到" class="invite-img fl">
        <div class="det fl">
          <p class="invite-tit font28">
            <span v-show="mineData.hasSign == 'N'">立即签到</span>
            <span v-show="mineData.hasSign == 'Y'">今日已签</span></p>
          <div class="invite-det font24">
            <p>连续签到{{mineData.conSign}}天</p>
            <p>累计{{mineData.totalSign}}天</p>
          </div>
        </div>
      </div>
    </div>
    <!--我的爱心购买-->
    <div class="hart bg-f border-bottom-1px border-top-1px">
      <div class="hart-tit hart-go clearfix" @click="appOpen('consumRecord',{chooseType:'all'})">
        <span class="font36 tit">我的爱心购买</span>
        <p class="font26 see-all fr">查看全部</p>
      </div>
      <div class="ticket bg-f hart-height flex">
        <div class="order-list" @click="appOpen('wishList')">
          <img :src="imgUrl+'/mine/wish.png'" alt="心愿单" class="wish-img">
          <p class="wish font26">心愿单</p>
        </div>
        <div class="order-list relative" @click="appOpen('consumRecord',{chooseType:'pay'})">
          <img :src="imgUrl+'/mine/pay.png'" alt="待支付" class="wish-img">
          <p class="wish font26">待支付</p>
          <div class="wish-num num-double font24 absolute" v-show="mineData.toBePaid > 0">
            <p class="wish-color">
              <span style="padding:0 1px;">{{mineData.toBePaid < 100 ? mineData.toBePaid : 99}}<span v-show="mineData.toBePaid > 99" style="margin-left:-.04rem;padding-right:0;">＋</span></span>

            </p>
          </div>
        </div>
        <div class="order-list relative" @click="appOpen('consumRecord',{chooseType:'receive'})">
          <img :src="imgUrl+'/mine/receive.png'" alt="待收货" class="wish-img">
          <p class="wish font26">待收货</p>
          <div class="wish-num num-double font24 absolute" v-show="mineData.toBeReceive > 0">
            <div class="wish-color font24">{{mineData.toBeReceive < 100 ? mineData.toBeReceive : 99}}<span v-show="mineData.toBeReceive > 99" style="margin-left:-.04rem;padding-right:0;">＋</span>
            </div>
          </div>
        </div>
        <div class="order-list relative" @click="appOpen('consumRecord',{chooseType:'appraise'})">
          <img :src="imgUrl+'/mine/appraise.png'" alt="待评价" class="wish-img">
          <p class="wish font26">待评价</p>
          <div class="wish-num num-double font24 absolute" v-show="mineData.toBeEvaluated > 0">
            <div class="wish-color">{{mineData.toBeEvaluated < 100 ? mineData.toBeEvaluated : 99}}<span v-show="mineData.toBeEvaluated > 99" style="margin-left:-.04rem;padding-right:0;">＋</span>
            </div>
          </div>
        </div>
        <div class="order-list relative" @click="appOpen('applyRefundList')">
          <img :src="imgUrl+'/mine/afterSale.png'" alt="售后订单" class="wish-img">
          <p class="wish font26">售后订单</p>
          <div class="wish-num num-double font24 absolute" v-show="mineData.afterSale > 0">
            <p class="wish-color">
              <span style="padding:0 1px;">{{mineData.afterSale < 100 ? mineData.afterSale : 99}}<span v-show="mineData.afterSale > 99" style="margin-left:-.04rem;padding-right:0;">＋</span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--我的公益档案-->
    <div class="hart bg-f border-bottom-1px border-top-1px">
      <div class="hart-tit font36 tit clearfix">我的公益档案</div>
      <div class="ticket bg-f hart-height flex">
        <!--<div class="order-list" @click="$toast('即将开通')">-->
        <!--<div class="order-list" @click="$toast('即将开通')">-->
          <!--<img :src="imgUrl+'/mine/giveAway2.png'" alt="捐款记录" class="wish-img">-->
          <!--<p class="wish font26" style="color:#949494 !important;">捐款记录</p>-->
        <!--</div>-->
        <!--<div class="order-list" @click="$toast('即将开通')">-->
        <!--<div class="order-list" @click="volunteer">-->
          <!--<img :src="imgUrl+'/mine/volunteer2.png'" alt="志愿队记录" class="wish-img">-->
          <!--<p class="wish font26" style="color:#949494 !important;">志愿服务</p>-->
        <!--</div>-->
        <div class="order-list" @click="donate">
          <img :src="imgUrl+'/mine/giveAway.png'" alt="捐款记录" class="wish-img">
          <p class="wish font26">捐款记录</p>
        </div>
        <div class="order-list" @click="volunteer">
          <img :src="imgUrl+'/mine/volunteer.png'" alt="志愿队记录" class="wish-img">
          <p class="wish font26">志愿服务</p>
        </div>
        <div class="order-list" @click="appOpen('myFriends')">
          <img :src="imgUrl+'/mine/friend.png'" alt="公益勋章" class="wish-img">
          <p class="wish font26">公益好友</p>
        </div>
        <div class="order-list" @click="$toast('即将开通')">
          <img :src="imgUrl+'/mine/medal2.png'" alt="公益勋章" class="wish-img">
          <p class="wish font26"  style="color:#949494 !important;">公益勋章</p>
        </div>
        <div class="order-list"></div>
      </div>
    </div>
    <!--我的公益助手-->
    <div class="hart line-bottom bg-f border-bottom-1px border-top-1px">
      <div class="hart-tit font36 tit clearfix">我的公益助手</div>
      <div class="ticket bg-f hart-height flex">
        <div class="order-list" @click="appOpen('/bizAssistant')">
          <img :src="imgUrl+'/mine/groupBuy.png'" alt="集采助手" class="wish-img">
          <p class="wish font26">集采助手</p>
        </div>
        <div class="order-list" @click="appOpen('userSetting')" >
          <img :src="imgUrl+'/mine/setting.png'" alt="设置" class="wish-img">
          <p class="wish font26">设置</p>
        </div>
        <div class="order-list" @click="appOpen('guessQuestion',{headUrl:mineData.avatar,name:mineData.dispName})">
          <img :src="imgUrl+'/mine/help.png'" alt="帮助中心" class="wish-img">
          <p class="wish font26">帮助中心</p>
        </div>
        <!--<div class="order-list" @click="appOpen('feedback',{memberId:mineData.memberId})">-->
        <div class="order-list" @click="$toast('即将开通')">
          <!--<img :src="imgUrl+'/mine/feedback2.png'" alt="在线反馈" class="wish-img">-->
          <!--<p class="wish font26"  style="color:#949494 !important;">在线反馈</p>-->
        </div>
        <div class="order-list"></div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
  import sy from '../../../config/sy3.0'
  let api_volunteer = process.env.NODE_ENV === 'production'?sy.volunteer_production:sy.volunteer_dev;
  let api_donate = process.env.NODE_ENV === 'production'?sy.donate_production:sy.donate_dev;
  export default {
    components:{},
    data(){
      return {
        headerNavOpacity: 0,     //header中间导航的透明度初始为0
        headerBtnOpacity: 1,     //header两侧按钮的透明度初始为1
        linearGradient: 0.3,     //header渐变色初始值为0.3
        headerB: false,
        shartBtn:false,
        mineData:{},
        money:0,
        money2:0,
        code:'',
        code2:'',
        qrCodeUrl:'',
        inviteCode:'',
        share:false

      }
    },
    created(){
      this.getData();
    },
    filters:{
      //看看大家怎么扶贫
      // unionName(v){
      //   if(v.unionCode == ''){
      //     return '大家'
      //   }else {
      //     return v.unionName;
      //   }
      // },
    },
    mounted(){
      //不显示导航
      this.$header.show = false;
      window.addEventListener('scroll',(e) => {
        let scrollTop       = this.scrollTop();
        let headerHeight    = document.querySelector('#titleBar').offsetHeight;//偏移量 ———— 一个header的高度
        //header的滚动监听
        let headerDoorsill  = document.querySelector('#alliance').offsetHeight - headerHeight;
        //header动态变化所根据的阈值（轮播图减掉header本身的高度：像素）
        if (scrollTop < headerDoorsill) {     //顶部导航状态的监听
          var nPersent        = Math.abs(headerDoorsill - scrollTop)/headerDoorsill;//随着下滑不断减小 1 => 0 => 1 => 更大
          //此阈值计算出来的百分比（小数）
          var nPersentX       = nPersent < 1 ? nPersent : 1 ;
          //加个判断，不能大于1
          var halfNPersent    = Math.abs(headerDoorsill/2 - scrollTop)/(headerDoorsill/2);//减小速度是上一个百分比的2倍
          //半阈值百分比（小数）
          var halfNPersentX   = halfNPersent < 1 ? halfNPersent : 1;
          //加个判断，不能大于1
          this.headerNavOpacity = 1 - nPersentX;
          this.headerBtnOpacity = halfNPersentX;
          if (scrollTop < headerDoorsill/2) {
            this.headerB = false;
            this.shartBtn = false
            this.linearGradient = halfNPersentX*0.3
          }else{
            this.linearGradient = 0;
            this.headerB = true;
            this.shartBtn = true
          }
        }else{
          this.linearGradient = 0;
          this.headerB = true;
          this.shartBtn = true
          this.headerNavOpacity = 1;
          this.headerBtnOpacity = 1;
        }
      });
      this.getCode();
      //notify刷新页面
      window.mineRefresh=(res)=>{
        this.getCode();
        this.getData();
      }
      setTimeout(()=>{
        this.syJsbIosRegisterHandler('mineRefresh')
      },0)
    },
    methods:{
      //获取数据
      getData(){
        this.getWithToken('/user-center/usr/home').then(res => {
          if(res.code == 200){
            this.mineData = res.content;
            this.money = this.mineData.walletRemain.split(".")[0];
            this.money2 = this.mineData.walletRemain.split(".")[1];
            this.code = this.mineData.totalAidCoupon.split(".")[0];
            this.code2 = this.mineData.totalAidCoupon.split(".")[1];
            // this.mineData.toBeReceive = 1
            // this.mineData.toBeEvaluated = 10
            // this.mineData.toBePaid = 99
            // this.mineData.messages = 28
            this.syJsbMsgNum(this.mineData.messages);
          }else {
            this.$toast(res.message)
          }
          this.$loading.show=false
        })
      },
      //获取邀请码和二维码
      getCode(){
        this.getWithToken('/user-center/usr/getInviteCode').then(res=>{
          if(res.code == 200){
            this.inviteCode = res.content.inviteCode;
            this.qrCodeUrl = res.content.qrCodeUrl;
          }else{
            this.$toast(res.message)
          }
        })
      },
      //签到
      signIn(){
        let shareUrl = window.location.origin
        return this.postWithToken('/user-center/signIn/doSignIn').then(res=>{
          if(res && res.code == 200){
//            this.$toast('原生应该弹框，签到成功');
            res.content.codeUrl= this.imgUrl +'/common/download.png'
            res.content.useUrl= window.location.origin + '/povertyCode'
            res.content.goToUse= '去使用 >'
            res.content.sms= '[一起善源]爱・源于善，要和我一起将扶贫进行到底码？我已坚持了 ' + this.mineData.totalSign + ' 天：' + shareUrl
            this.syJsbSignin(res.content)  // 没有签到 原生弹框
          }else if(res && res.code == 420){  // 当天已经签到
            this.appOpen('signOnApp')
          }else{
            this.$toast('获取数据失败')
          }
          this.getData();

        })
      },
      sign(mineData){
        if(mineData.hasSign == 'N'){
          //弹窗
          this.signIn();
        }else if(mineData.hasSign == 'Y'){
          //跳转页面
          this.appOpen('signOnApp')
        }

      },
      //捐赠记录
      donate(){
        this.appOpen(api_donate + '/syweal/record',null,true)
      },
      //志愿服务
      volunteer(){
        this.appOpen(api_volunteer + '/volunteer/my_volunteer',null,true)
      },
      //滚动监听
      scrollTop(n) {    //获取滚动条距顶部距离(不填参数)，填参数为滚动到某个位置
        if (n || n == 0) {
          window.scrollTo(0,n)
          return;
        }else{
          return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        }
      },
      invite(){
        let shareUrl = window.location.origin+'/weChartJoin?inviteCode='+this.inviteCode
        let params = {
          text:'和我一起来品味扶贫特产，精准帮扶贫困地区',
          url:shareUrl,
          title:'[爱・源于善] 一封益客邀请函',
          logo:this.imgUrl + '/common/about.png',
          inviteCode:this.inviteCode,
          qrCodeUrl:this.qrCodeUrl,
          sms:'[一起善源]爱・源于善，您的好友向您推荐一个精准扶贫平台，点击查看:' + shareUrl
        };
        this.syJsbInviteShare(params);
      },
      //跳转查看联盟
      goUnionInfo(){
        if(this.mineData.unionCode == ''){
          this.appOpen('unionInfo',{unionCode:'boc',p:'web'})
        }else{
          this.appOpen('unionInfo',{unionCode:this.mineData.unionCode,p:'web'})
        }
      },
      //名字
      name(){
        if(this.mineData.dispName && this.mineData.dispName.length > 12){
          return this.mineData.dispName.substr(0,12)+' '+'...'
        }else {
          return this.mineData.dispName;
        }
      },
    },

  }
</script>

<style lang="scss" scoped>
  .mine {
    width:100%;
    height:100%;
    background: #FAFAFA;
  }
  /*title bar*/
  .title-bar {
    height:.88rem;
    user-select:none;
    top:0;
    left:0;
    width: 100%;
    z-index: 100;
    position: fixed;
    /*padding-top:20px;*/
    box-sizing: border-box;
  }
  .title-bg {
    z-index: 100;
    background: url(/static/images/mine/message.png) center center/50% 50% no-repeat !important;
  }
  .title {
    width: 100%;
    text-align: center;
    color:rgba(46,46,46,1);
    line-height:0.88rem;
  }
  .title-bar-pad{
    /*padding-top:.2rem;*/
  }
  .title-right-m {
    /*bottom:.05rem;*/
    /*right:.44rem;*/
    position: absolute;
    width: 44px;
    height: 44px;
    right: 0;
    bottom: 0;
    background: url(/static/images/mine/message2.png) center center/50% 50% no-repeat;
    margin-right:.3rem;
  }
  .num {
    min-width:0.28rem;
    height:0.33rem;
    border-radius: 0.9rem ;
    line-height:0.37rem;
    text-align: center;
  }
  .bor-f {
    border:1.5px solid #FFF;
  }
  .num-pos {
    top:.05rem;
    right:.1rem;
  }
  .title-num {
    background:rgba(255,25,25,1) !important;
    color:rgba(255,255,255,1) !important;
  }
  .num-double {
    padding:0 .03rem;
  }
  .title-message {
    height:.48rem;
    width:.48rem;
  }
  .add {
    /*display: inline-block;*/
    /*font-size:.3rem !important;*/
  }
  /*头部用户信息*/
  .mine-top {
    background:rgba(250,250,250,1);
    /*height:100%;*/
    width:100%;
  }
  .bg-img {
    width:100%;
    height:3.43rem;
  }
  .top-right {
    top:.2rem;
    right:.44rem;
  }
  .top-num {
    color:rgba(255,25,25,1);
  }
  .user-info {
    width:6.9rem;
    height:2.76rem;
    border-radius: 0.16rem ;
    top:1.58rem;
    left:.3rem;
  }
  .bg-user {
    width:6.9rem;
    height:2.76rem;
    background:rgba(255,248,248,1);
    border-radius: 0.16rem;
    top:2.23rem;
    left:.3rem;
    box-shadow:.02rem .04rem .02rem rgba(0,0,0,.05);
  }
  .see-other {
    padding-top:2.11rem;
    color:rgba(255,101,51,1);
    line-height:0.65rem;
    text-align: center;
  }
  .avatar {
    display: block;
    width:1.4rem;
    height:1.4rem;
    border-radius: 50%;
    top:-.3rem;
    left:.3rem;
  }
  .bg-c {
    background-color:rgba(246,246,246,1);
  }
  .user-det {
    padding:0 0 .57rem 1.9rem;
    min-height:1.05rem;
  }
  .name {
    color:rgba(46,46,46,1);
    line-height:0.69rem;
    font-weight: 500;
  }
  .dep {
    height:.37rem;
    color:rgba(75,75,75,1);
    line-height:0.37rem;
    font-weight: 300;
    max-width: 4.7rem;
  }
  /*券*/
  .ticket {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .tick-height {
    height:.8rem;
  }
  .money {
    width:1.72rem;
    height:.8rem;
    text-align: center;
    line-height:.86rem;
  }
  .money-num {
    color:rgba(75,75,75,1);
    line-height:0.42rem;
    min-height:.42rem;
  }
  .money-det {
    color:rgba(46,46,46,1);
    line-height:0.37rem;
    font-weight: 300;
  }
  .line {
    height:.3rem;
    border-left:1px solid #E3E3E3;
    top:.25rem;
    right:0;
  }
  /*过期提醒*/
  .remind-coupon {
    top:1.16rem;
    right:.24rem;
  }
  .remind-code {
    top:1.16rem;
    right:1.97rem;
  }
  .back {
    min-width:1.35rem;
    height:0.36rem;
    background:rgba(255,101,51,1);
    border-radius: 0.04rem ;
    color:rgba(255,255,255,1);
    line-height:0.36rem;
    font-weight: 300;
    text-align: center;
    padding:0 .07rem;
  }
  .triangle {
    width:.24rem;
    height:.09rem;
    left:0.65rem;
  }
  /*邀请签到*/
  .invite-height {
    height:1.6rem;
    margin-top:1.96rem;
  }
  .he {
    margin-top:1.31rem;
  }
  .invite {
    width:3.74rem;
    height:1.6rem;
  }
  .invite-bor {
    height:.3rem;
    border-left:1px solid #E3E3E3;
    top:.65rem;
    left:3.74rem;
  }
  .invite-img {
    width:1.16rem;
    height:1.16rem;
    display: block;
    padding:.22rem .2rem .22rem .3rem;
  }
  .invite-tit {
    color:rgba(46,46,46,1);
    line-height:0.4rem;
    font-weight: 700;
  }
  .invite-det {
    max-width:1.68rem;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
    font-weight: 300;
  }
  .det {
    padding-top:.27rem;
  }
  /*爱心购买*/
  .hart {
    margin-top:.2rem;
  }
  .hart-height {
    height:2rem;
  }
  .hart-tit {
    padding:.33rem .3rem 0;
  }
  .hart-go {
    background: url("/static/images/mine/arrow.png") no-repeat 98% 90%;
    background-size: .44rem;
  }
  .see-all {
    color:rgba(148,148,148,1);
    line-height:0.37rem;
    font-weight: 300;
    padding:.08rem .2rem 0 0;
  }
  .tit {
    color:rgba(46,46,46,1);
    line-height:0.5rem;
    font-weight:700;
  }
  .order-list {
    width:1.46rem;
    height:1.27rem;
  }
  .wish-img {
    width:.8rem;
    height:.8rem;
    padding-left:.33rem;
  }
  .wish-color {
    min-width:.26rem;
    min-height:.25rem;
    color:#FF1919;
    border:1px solid #FF1919;
    border-radius:.8rem;
    /*padding-left: 1px;*/
    line-height: .27rem;
  }
  .wish-num {
    /*min-width:.26rem;*/
    /*height:0.26rem;*/
    background:rgba(255,255,255,1);
    border-radius:.9rem;
    /*line-height:0.28rem;*/
    text-align: center;
    top:.02rem;
    left:.8rem;
    border: 1px solid #fff;
  }
  .wish {
    padding-top:.1rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
    line-height:0.37rem;
    text-align: center;
  }
  /*line*/
  .line-bottom {
    margin-bottom:.4rem;
  }
</style>
