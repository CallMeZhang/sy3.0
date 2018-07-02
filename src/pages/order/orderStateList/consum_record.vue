<template>
  <div class="consum-record bg-f">
    <div v-title="'公益消费记录'"></div>
    <!--head start-->
    <div class="fixed bg-f" style="z-index: 100">
      <div class="flex bg-f head">
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='all'}" @click="select('all')">
          <p>全部</p>
          <div class="red-line absolute" v-show="chooseType=='all'"></div>
        </div>
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='pay'}" @click="select('pay')">
          <p>待支付</p>
          <div class="red-line absolute" v-show="chooseType=='pay'"></div>
        </div>
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='receive'}" @click="select('receive')">
          <p>待收货</p>
          <div class="red-line absolute" v-show="chooseType=='receive'"></div>
        </div>
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='appraise'}" @click="select('appraise')">
          <p>待评价</p>
          <div class="red-line absolute" v-show="chooseType=='appraise'"></div>
        </div>
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='complate'}" @click="select('complate')">
          <p>已完成</p>
          <div class="red-line absolute" v-show="chooseType=='complate'"></div>
        </div>
      </div>
    </div>
    <div style="height:.9rem;"></div>
    <!--head end-->
    <!--<div class="bor" v-show="orderUserList.length > 0" ></div>-->
    <!--广告位-->
    <div class="ad" v-show="chooseType=='appraise' && orderUserList.length > 0">
      <img :src="imgUrl+'/coupon/banner.png'" alt="广告位" class="img">
    </div>
    <!-- 全部 start-->
    <div class="order-list" v-for="(all,n1) in orderUserList">
      <!--订单头部-->
      <div class="shop-name border-bottom-1px border-top-1px" @click="goStore(all)">
        <div class="clearfix">
          <div class="fl name font26 no-enter" v-show="all.orderSubStatus == 10 || all.orderSubStatus == 70 || all.orderSubStatus == 80">您的爱心订单</div>
          <div class="fl" v-show="!(all.orderSubStatus == 10 || all.orderSubStatus == 70 || all.orderSubStatus == 80)">
            <div class="clearfix">
              <p class="name no-enter font26 fl">
                <span>{{all.storeType | storeType}}</span><span>{{all | storeName}}</span>
              </p>
              <img :src="imgUrl+'/wishList/go.png'" alt="箭头" class="arrer fl" v-show="all.storeType == 10 || all.storeType == 12">
            </div>
          </div>
          <div class="name-state fr font26">
            <!--<span>已关闭</span>-->
            <span v-show="all.isClosed == 1 || (all.orderSubStatus == 60 && all.refundType == 2)">已关闭</span>
            <span v-show="all.isClosed == 0 && !(all.orderSubStatus == 60 && all.refundType == 2)">{{all.orderSubStatus | orderSubStatus}}</span>
            <span v-show="all.orderThirdStatus || (all.isClosed == 1 || (all.orderSubStatus == 60 && all.refundType == 2))">丨</span>
            <!--<span v-show="all.orderThirdStatus || all.complainStatus">丨</span>-->
            <!--投诉-->
            <!--<span v-show="all.complainStatus">{{all.complainStatus == 10?"投诉中":"投诉结束"}}</span>-->
            <!--退款-->
            <span v-show="all.orderThirdStatus && (all.orderThirdStatus == 14 && all.refundType == 1)">部分货品已退款</span>
            <span v-show="(all.orderThirdStatus && !(all.orderThirdStatus == 14 && all.refundType == 1)) || (all.isClosed == 1 || (all.orderSubStatus == 60 && all.refundType == 2))">{{all.orderThirdStatus | orderThirdStatus}}</span>
          </div>
        </div>
      </div>
      <div class="goods">
        <!--帮扶头像-->
        <div class="report clearfix" v-show="all.orderSubStatus == 10 && all.helpedCount > 0">
          <div class="support fl relative">
            <div class="support-img bg-f absolute" style="left:0;z-index:10;"
                 v-for="(poorImg,index) in all.poorHeadUrl.slice(0,4)"
                 :style="{'z-index':index==0?10:index==1?9:index==2?8:index==3?7:6,left:index==0?0:index==1?'.5rem':index==2?'1rem':'1.5rem'}"
                 v-show="all.poorHeadUrl.slice(0,4).length <= 4">
              <img v-lazy="poorImg + ossUrl('webp_120')"  alt="帮扶头像" class="img">
            </div>
            <div class="support-img supor-red bg-f clearfix absolute" v-show="all.poorHeadUrl.length > 3">
              <div style="padding:.24rem 0 .25rem .13rem;box-sizing: border-box">
                <div class="fl point"></div>
                <div class="fl point"></div>
                <div class="fl point"></div>
              </div>
            </div>
          </div>
          <div class="fr support-num font26 no-enter">
            <span v-show="">本次消费将有</span>
            <span class="support-col support-width">{{all.helpedCount}}</span>
            <span class="support-col" v-show="all.helpedCount > 999">+</span><span>位贫困户将会得到帮扶</span>
          </div>
        </div>
        <!--店铺延迟发货-->
        <!--<div class="reason font24 no-enter" v-show="all.noticeInfo">{{all.noticeInfo}}</div>-->
        <!--商品信息-->
        <!--多件商品-->
        <div class="goods-list clearfix" v-show="all.orderImgUrls.length > 1" @click="goPayDetail(all)">
          <div class="goods-img fl">
            <div class="clearfix">
              <div class="img-bor fl" v-for="(i,k) in all.orderImgUrls.slice(0,3)" :key="k">
                <img v-lazy="i + ossUrl('webp_240')" v-img-cover="i + ossUrl('webp_240')" alt="商品图片" class="img">
              </div>
            </div>
          </div>
          <div class="goods-num fr font26">
            <p class="goods-counrt" v-show="all.goodsCount > 1">共<span>{{all.goodsCount}}</span>件</p>
            <p class="bg-arrer1 bg-w1">查看详情</p>
          </div>
        </div>
        <!--1件商品-->
        <div class="goods-list clearfix single-p" v-show="all.orderImgUrls.length == 1" @click="goPayDetail(all)">
          <div class="goods-img fl">
            <div class="clearfix">
              <div class="img-single fl">
                <img v-lazy="all.orderImgUrls[0] + ossUrl('webp_240')" :key="all.orderId" v-img-cover="all.orderImgUrls[0] + ossUrl('webp_240')" alt="商品图片" class="img">
              </div>
            </div>
          </div>
          <div class="single fl">
            <p class="no-enter font28">
              <span class="single-expect" v-show="all.productType == 1">预售 | </span>
              <span class="single-title">{{all.orderDesc}}</span>
            </p>
            <p class="font24 no-enter single-weight">{{all.orderGoodsSKU}}</p>
          </div>
          <div class="goods-num fr font26">
            <p class="goods-counrt goods-counrt-top">共<span>{{all.goodsCount}}</span>件</p>
            <p class="bg-arrer1 bg-w1">查看详情</p>
          </div>
        </div>
        <!--需付金额-->
        <div class="pay" v-show="all.orderSubStatus == 10">
          <span class="font26">需付：</span>
          <span class="font26" v-show="!all.needPoint">¥</span>
          <span class="font32" v-show="all.needPoint">{{all.needPoint}}</span>
          <span class="font26" v-show="all.needPoint">积分+</span>
          <span class="font32">{{all.orderAmount.split(".")[0]}}</span><span class="font26">.{{all.orderAmount.split(".")[1]}}</span>
          <span class="font26" v-show="all.needPoint">元</span>
        </div>
        <!--按钮-->
        <div class="goods-btn border-bottom-1px border-top-1px">
          <!--全部-->
          <div class="clearfix" v-if="all.orderSubStatus == 80 || all.isClosed == 1">
            <div class="btn-2 font26 fr" :class="all.orderSubStatus == 80?'btn-col':''" @click="bugAgain(all)">
              <span>再次购买</span>
            </div>
            <div class="btn-3 font26 fr" v-show="all.orderSubStatus == 80 && all.isClosed == 0" @click="delOrder(all,n1)">删除订单</div>
          </div>
          <!--待支付-->
          <div class="clearfix" v-if="(all.orderSubStatus == 10 || all.orderSubStatus == 70) && all.isClosed == 0">
            <div class="count-down font24 fl" v-show="all.expireTime > 0">
              <span>{{formatOrder(all)}}</span>
            </div>
            <div class="btn-2 btn-col font26 fr">
              <span v-if="all.orderSubStatus == 10" @click="goPay(all)">立即支付</span>
              <span v-if="all.orderSubStatus == 70" @click="bugAgain(all)">再次购买</span>
            </div>
            <div class="btn-3 font26 fr">
              <span v-if="all.orderSubStatus == 10" @click="cancelOrder(all,n1)">取消订单</span>
              <span v-if="all.orderSubStatus == 70" @click="delOrder(all,n1)">删除订单</span>
            </div>
          </div>
          <!--待收货-->
          <div class="clearfix" v-if="(all.orderSubStatus == 20 || all.orderSubStatus == 30) && all.isClosed == 0 ">
            <div class="btn-2 btn-col font26 fr">
              <span v-if="all.orderSubStatus == 20" @click="bugAgain(all)">再次购买</span>
              <span v-if="all.orderSubStatus == 30" @click="confirmOrder(all)">确认收货</span>
            </div>
            <div class="btn-3 font26 fr" v-show="all.orderSubStatus == 20 && ((all.urgeSendButton && all.urgeNum < 1) || (!all.urgeSendButton && all.urgeNum > 0))">
              <span v-show="all.urgeSendButton && all.urgeNum < 1" @click="remind(all)">提醒发货</span>
              <span  class="font26 font-c" v-show="!all.urgeSendButton && all.urgeNum > 0">已提醒发货</span>
            </div>
            <!--<div class="btn-3 font26 fr" v-show="all.orderSubStatus == 20" @click="remind(all)">{{remindStr}}</div>-->
            <div class="btn-3 font26 fr" v-show="all.orderSubStatus == 30 && all.delayReceivedButton">
              <span @click="delay(all)">延迟收货</span>
            </div>
            <div class="btn-3 font26 fr">
              <span v-if="all.orderSubStatus == 30" @click="seeLogistics(all)">查看物流</span>
              <span v-if="all.orderSubStatus == 20" @click="shareOrder(all)">分享</span>
            </div>
            <div class="btn-3 font26 fr" v-if="all.orderSubStatus == 30 && !all.delayReceivedButton"
                 @click="bugAgain(all)">再次购买</div>
            <div class="btn-3 font26 btn-ma" @click="shareOrder(all)" v-if="all.orderSubStatus == 30 && !all.delayReceivedButton">分享</div>
            <div class="btn-4 font26 fr relative" v-if="all.orderSubStatus == 30 && all.delayReceivedButton"
                 @click="clickMore == all.orderId?clickMore = '':clickMore = all.orderId">
              <div>更多</div>
              <div class="absolute more" v-show="clickMore == all.orderId">
                <div class="triangle"></div>
                <div class="btn-3 font26 triangle-2" @click="bugAgain(all)">再次购买</div>
                <div class="btn-3 font26 triangle-2" @click="shareOrder(all)">分享</div>
              </div>
            </div>

          </div>
          <!--待评价-->
          <div class="clearfix" v-if="all.orderSubStatus == 40 && all.isClosed == 0">
            <div class="btn-2 btn-col font26 fr" @click="evalGift(all)"><span>评价有礼</span></div>
            <div class="btn-3 font26 fr" @click="seeLogistics(all)">查看物流</div>
            <div class="btn-3 font26 fr" @click="bugAgain(all)">再次购买</div>
            <div class="btn-3 font26 fr btn-ma" @click="shareOrder(all)">分享</div>
            <!--<div class="btn-4 font26 fr relative" @click="clickMore == all.mainId?clickMore = '':clickMore = all.mainId">-->
            <!--<div>更多</div>-->
            <!--<div class="absolute more" v-show="clickMore == all.mainId">-->
            <!--<div class="triangle"></div>-->
            <!--<div class="btn-3 font26 triangle-2" @click="shareOrder">分享</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <!--已完成-->
          <div class="clearfix" v-if="(all.orderSubStatus == 50 || all.orderSubStatus == 60)  && all.isClosed == 0">
            <div class="btn-2 btn-col font26 fr" v-show="(all.orderSubStatus == 50 || all.orderSubStatus == 60) && all.evalButton && (all.evalStatus == 10 || all.evalStatus == 12)">
              <span @click="seeEval(all)">追加评价</span>
            </div>
            <div class="btn-3 font26 fr">
              <span v-if="all.orderSubStatus == 50" @click="seeLogistics(all)">查看物流</span>
              <span v-show="all.orderSubStatus == 60" @click="bugAgain(all)">再次购买</span>
            </div>
            <div class="btn-3 font26 fr">
              <span v-show="all.orderSubStatus == 50" @click="bugAgain(all)">再次购买</span>
              <span v-if="all.orderSubStatus == 60" @click="shareOrder(all)">分享</span>
            </div>
            <div class="btn-3 font26 fr btn-ma" @click="shareOrder(all)" v-if="all.orderSubStatus == 50">分享</div>
            <!--<div class="btn-4 font26 fr relative" v-if="all.orderSubStatus == 50" @click="clickMore == all.mainId?clickMore = '':clickMore = all.mainId">-->
            <!--<div>更多</div>-->
            <!--<div class="absolute more" v-show="clickMore == all.
            ">-->
            <!--<div class="triangle"></div>-->
            <!--<div class="btn-3 font26 triangle-2" @click="shareOrder">分享</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>

    </div>
    <!--无列表-->
    <div class="none-list " v-show="orderUserList.length == 0">
      <div class="non-pos absolute">
        <img :src="imgUrl+'/common/error.png'" alt="错误" class="error-img">
        <p class="error-det font32">您还没有相关的订单</p>
      </div>
    </div>
    <!--全部 end-->
    <!--<div class="bottom" v-show="orderUserList.length > 0"></div>-->
    <div class="wish-bottom font24" v-show="orderUserList.length > 0">
      <!--<p>最后更新于：<span>{{updateTime}}</span> © 17shuanyuan.com</p>-->
      <p>{{bottomDet}}</p>
    </div>
    <!---->
    <!--弹框-->
    <!--两行带提示弹框-->
    <div class="del fixed" v-show="delayBtn || confirmBtn || urgeBtn">
      <div class="del-goods bg-f">
        <div class="">
          <p class="font36 title-prompt">提示</p>
          <p class="font32 del-tit" v-show="delayBtn">亲，每笔订单只能延长一次哦，您是否延长收货？</p>
          <p class="font32 del-tit" v-show="confirmBtn">亲，请务必在收到货后，再确认收货，否则您可能钱货两空！</p>
          <p class="font32 del-tit" v-show="urgeBtn">亲，已通知商家为您马上发货，请耐心等待</p>
        </div>
        <div class="clearfix" v-show="delayBtn || confirmBtn">
          <div class="font34 fl del-cancel" @click="cancelToast">取消</div>
          <div class="font34 fr del-confirm" @click="delThings">确定</div>
        </div>
        <div class="font34 know" v-show="urgeBtn" @click="know">知道了</div>
      </div>
    </div>
    <!--一行文字不带提示弹框-->
    <div class="del fixed" v-show="cancelBtn || delBtn">
      <div class="del-goods del-order bg-f">
        <div class="">
          <p class="font32 del-order-t" v-show="cancelBtn">是否确认取消订单？</p>
          <p class="font32 del-order-t" v-show="delBtn">是否确认删除订单？</p>
        </div>
        <div class="clearfix">
          <div class="font34 fl del-cancel" @click="cancelToast">取消</div>
          <div class="font34 fr del-confirm" @click="delThings">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import request_base from '../../../requests/base'
  //import loading from '@/components/'
  const qs = require("qs")

  export default {
    name:'consumRecord',
    components:{},
    data(){
      return {
        chooseType:'',//选择按键,
        clickMore:false,
        orderUserList:[],//商品列表
        memberId:'',
        conOrder:false,//删除订单
        index:'',
        n1:'',//下标
        isLoading:false,//正在加载中
        pageSize:10,//页面数据个数
        selectTab: [
          {
            chooseType:'all',
            pageNo:1,
            type:"getAllOrderList",
            orderList:'allOrderList'
          },
          {
            chooseType:'pay',
            pageNo:1,
            type:"getWaitPayOrderList",
            orderList:'waitPayOrderList'
          },
          {
            chooseType:'receive',
            pageNo:1,
            type:"getWaitReceiveOrderList",
            orderList:'waitReceiveOrderList'
          },
          {
            chooseType:'appraise',
            pageNo:1,
            type:"getWaitEvaOrderList",
            orderList:'waitEvaOrderList'
          },
          {
            chooseType:'complate',
            pageNo:1,
            type:"getFinishedOrderList",
            orderList:'finishedOrderList'
          },

        ],
        delayBtn:false,//延长收货按钮
        confirmBtn:false,//确认收货按钮
        urgeBtn:false,//提醒发货按钮
        delBtn:false,//删除按钮
        cancelBtn:false,//删除按钮,
        storeId:'',
        goodsId:'',
        skuId:'',
        hasNext:false, //是否有下一页
        // remindStr:'',//提醒发货按钮
        clickBtn:false,//按钮是否可以点击
        bottomDet:'',//底部加载描述
      }
    },
    created(){
      var that = this
      this.getAppData('chooseType',function (res) {
        if(res){
          that.chooseType = JSON.parse(res).chooseType;
          setTimeout(()=>{
            that.setAppData({ 'h5Key': 'chooseType' , 'h5Value' :''})
          },0)
        }else{
          that.chooseType = that.$route.query.chooseType || '';
        }
        that.getData(that.chooseType);
      })
      this.$scroll(()=>{
        if(this.hasNext){
          if (!this.isLoading) {
            // this.selectTab[index].pageNo++;
            // this.$toast('数据加载中，请稍等')
            this.getData(this.chooseType);
          }else{
            console.log("请求中..骚等")
          }
        }
      })
    },
    mounted(){
      this.$header.setTitle('公益消费记录')
      this.$header.rightFn({
        type:'img',
        url:require('../../../../static/images/mine/service.png'),
        callback: ()=> {
          this.m7Chat()
        }
      })

      if(this.$route.query.payment=='payIndex'){
        this.appUnBack()
        this.$header.setBackUrl('mine')
      }
      //页面倒计时
      setInterval(()=>{
        this.orderUserList.forEach(v=>{ v.expireTime -= 1000;})
      },1000)
      //注册notify
      window.consumRecordRefresh=(res)=>{
        this.getData(this.chooseType);
      }
      this.syJsbIosRegisterHandler('consumRecordRefresh')
      this.$header.customBehavior(this.goBack)
    },
    computed:{

    },
    methods:{
      //获取数据
      getData(choose){
        this.isLoading = true;
        this.hasNext = false;
        for (var i = 0 ;i < this.selectTab.length ;i++){
          if(choose == this.selectTab[i].chooseType){
            let index = i;
            this.getWithToken("/order-center/orderUser/"+this.selectTab[i].type,{pageSize:this.pageSize,curPage:this.selectTab[index].pageNo}).then(res=>{
              this.$loading.show=false
              if(res.code == 200){
                if (this.selectTab[index].pageNo == 1) {
                  this.orderUserList = res.data[this.selectTab[index].orderList];
                  if(this.orderUserList.length >= this.pageSize){
                    this.hasNext = true
                  }
                }else{
                  this.hasNext = res.data[this.selectTab[index].orderList].length > this.pageSize
                  this.orderUserList = this.orderUserList.concat(res.data[this.selectTab[index].orderList]);
                }
                if(this.hasNext){
                  this.selectTab[index].pageNo++;
                }
              }else {
                this.$toast(res.message)
                this.orderUserList = [];
                this.$loading.show = false
              }
              if(!this.hasNext){
                this.bottomDet = '© 17shuanyuan.com'
              }else{
                this.bottomDet = '加载中'
              }
              this.isLoading = false;
            },err =>{
              this.isLoading = false;
              this.hasNext = false;
              if(!this.hasNext){
                this.bottomDet = '© 17shuanyuan.com'
              }else{
                this.bottomDet = '加载中'
              }
              this.$loading.show = false
            })
          }
        }

      },
      //待支付跳转待支付详情
      goPayDetail(all){
        if(all.orderSubStatus == 10){
          this.appOpen('orderWaitInfo',{mainId:all.mainId})
        }else if(all.orderSubStatus == 70){//已过期
          this.appOpen('orderWaitInfo',{mainId:all.mainId,isWait:'isWait',orderText:'已过期'})
        }else if(all.orderSubStatus == 80){//已取消
          this.appOpen('orderWaitInfo',{mainId:all.mainId,isWait:'isWait',orderText:'已取消'})
        }else{
          this.setAppData({ 'h5Key': 'chooseType' , 'h5Value' :JSON.stringify({chooseType:this.chooseType})})
          this.appOpen('orderInfo',{orderId:all.orderId})
        }

      },
      // 倒计时
      formatOrder(tmp){
        let minute,second;
        minute = parseInt(tmp.expireTime/1000/60)
        second = parseInt(tmp.expireTime/1000)%60;
        return minute + '分' + second + '秒后过期'
      },
      //切换键
      select(v){
        // if(!this.isLoading){
        //   for (var i = 0 ;i < this.selectTab.length ;i++){
        //     this.selectTab[i].pageNo = 1
        //   }
        //   this.chooseType = v;
        //   this.$loading.show = true
        //   this.getData(v)
        // }else{
        window.scrollTo(0,0);
        for (var i = 0 ;i < this.selectTab.length ;i++){
          this.selectTab[i].pageNo = 1
        }
        this.chooseType = v;
        // this.$loading.show = true
        this.getData(v)
        // }

      },
      //提醒发货
      remind(all){
        this.urgeBtn = true;
        this.index = all;
      },
      //延迟收货
      delay (all){
        this.delayBtn = true;
        this.index = all;
      },
      //去支付
      goPay(all){
        this.appOpen("payment",{mainId:all.mainId})
      },
      //去店铺
      goStore(all){
        if(all.storeType == '10'){//助理人
          this.appOpen('assistant',{storeId:all.storeId})
        }else if(all.storeType == '12') {//贫困户
          this.appOpen('poverty', {storeId: all.storeId, poorId: all.poorId})
        }
        // else if(all.storeType == '20'){//善企
        //   this.appOpen('company',{storeId:all.storeId})
        // }else if(all.storeType == '30'){//集采
        //   this.$toast('暂无功能')
        // }
      },
      //再次购买
      bugAgain(all){
        this.postWithToken("/ebgoods/cart",{goodsCartInfo:JSON.stringify(all.addCarVoList)}).then(res=>{
          // request_base.$httpPostWithToken("/ebgoods/cart",{goodsCartInfo:JSON.stringify(all.addCarVoList)}).then(res=>{
          if(res.code == 200){
            this.appOpen("wishList")
          }else {
            this.$toast(res.message)
          }
        })
      },
      //删除订单
      delOrder(all,n1){
        this.delBtn = true;
        this.index = all;
        this.n1 = n1;
      },
      //取消订单
      cancelOrder(all,n1){
        this.cancelBtn = true;
        this.index = all;
        this.n1 = n1;
      },
      //确认收货
      confirmOrder(all){
        if(all.packageCount == 1){  //为1的时候收货弹框，多件的时候收货列表
          this.confirmBtn = true;
          this.index = all;
        }else{
          this.appOpen('receive',{orderId:all.orderId})
        }
      },
      //弹框取消
      cancelToast(){
        this.delayBtn = false;
        this.confirmBtn = false;
        this.cancelBtn = false;
        this.delBtn = false;
        this.clickBtn = false;
      },
      //弹框确认
      delThings(){
        if(this.clickBtn){
          this.$toast('订单处理中，请稍等');
          return
        }
        if(this.confirmBtn && !this.clickBtn){ //确认收货弹框
          this.clickBtn = true;
          this.getWithToken("/order-center/affirmReceived/packageReceived",{orderId:this.index.orderId,packageCount:this.index.packageCount}).then(res=>{
            if(res.code == 200){
              this.$toast(res.message);
              for (var i = 0 ;i < this.selectTab.length ;i++){
                this.selectTab[i].pageNo = 1
              }
              // window.location.reload();
              this.getData(this.chooseType)
            }else{
              this.$toast(res.message);
            }
            this.confirmBtn = false;
            this.clickBtn = false;
          })
        }else if(this.delayBtn && !this.clickBtn){ //延迟收货
          this.clickBtn = true;
          this.getWithToken("/order-center/delay/delayReceived",{orderId:this.index.orderId}).then(res=>{
            if(res.code == 200){
              this.index.delayReceivedButton = false;
            }else{
              this.$toast(res.message)
            }
            this.delayBtn = false;
            this.clickBtn = false;
          })
        }else if(this.cancelBtn && !this.clickBtn) {  //取消订单
          this.clickBtn = true;
          this.getWithToken("/order-center/orderUser/cancelOrder",{mainId:this.index.mainId}).then(res=>{
            if(res.code == 200){
              if(res.data.flag){
                this.appNotify({callback:'mineRefresh'})
                this.orderUserList.splice(this.n1,1)
              }else {
                this.$toast(res.message)
              }
            }else {
              this.$toast(res.message)
            }
            this.cancelBtn = false;
            this.clickBtn = false;
          })
        }else if(this.delBtn && !this.clickBtn) {  //删除订单
          this.clickBtn = true;
          this.getWithToken("/order-center/orderUser/deleteOrder",{mainId:this.index.mainId}).then(res=>{
            if(res.code == 200){
              if(res.data.flag){
                this.orderUserList.splice(this.n1,1)
                this.appNotify({callback:'mineRefresh'})
              }
            }else {
              this.$toast(res.message)
            }
            this.delBtn = false;
            this.clickBtn = false;
          })
        }
      },
      //提醒发货弹框
      know(){
        if(!this.clickBtn){
          this.clickBtn = true;
          this.getWithToken("/order-center/urge/urgeSendPackage",{orderId:this.index.orderId}).then(res=>{
            if(res.code == 200){
              // this.remindStr = '已提醒发货';
              // this.getData(this.chooseType)
              this.index.urgeSendButton = false;
              this.index.urgeNum  = 1;
            }else {
              this.$toast(res.message)
            }
            this.urgeBtn = false;
            this.clickBtn = false;
          })
        }

      },
      //分享
      shareOrder(all){
        let query={mainId:all.mainId,isShare:'yes'}
        let url = window.location.origin + '/orderShare' + (query?'?'+qs.stringify(query):'')
        this.syJsbShare({
          title:'[爱・源于善] 购买这些爱心产品能扶贫，我已下单，你也看看？',
          text:all.orderDesc,
          url :url,
          logo :all.orderImgUrls[0],
          sms:"[签名]爱・源于善，您的好友购买了爱心产品，推荐您也看看：" + url//短信相关
        })
        // this.$toast('即将开通')
      },
      //追加评价
      seeEval(all){
        this.appOpen('evaluationAppend',{orderId:all.orderId,orderCode:''});
      },
      //查看物流
      seeLogistics(all){
        if(all.packageCount == 1){  //为1的时候收货弹框，多件的时候收货列表
          this.appOpen('logistics',{orderId:all.orderId,where:'orderList',img:all.orderImgUrls.join(','),count:all.goodsCount})
        }else{
          this.appOpen('logisticsList',{orderId:all.orderId})
        }
      },
      //评价有礼
      evalGift(all){
        this.appOpen('evaluationPublish',{orderId:all.orderId,orderCode:''})
      },
      //右上角返回按钮
      goBack(){
        this.appUnBack();//禁止物理返回键
        this.appBackTabbarIndex(5,0)//定向到我的首页
        this.setAppData({ 'h5Key': 'chooseType' , 'h5Value' :''})
        this.appNotify({callback:'mineRefresh'})
      },
    },
    filters:{
      //店铺类型过滤器
      storeType(v){
        var str = ''
        switch (v){
          case 10:
            str = '助理人：';
            break;
          case 12:
            str = '贫困户：';
            break;
          case 20:
            str = '积分商城';
            break;
          case 30:
            str = '善源甄选';
            break;
        }
        return str
      },
      //店铺名称
      storeName(v){
        var str = '';
        var n = v;
        switch (v.storeType){
          case 10:
            str = n.sellerName;
            break;
          case 12:
            str = n.sellerName;
            break;
          // case 20:
          //   str = n.storeName;
          //   break;
          // case 30:
          //   str = '';
          //   break;
        }
        return str
      },
      orderSubStatus(v){
        var str = ''
        switch (v-0){
          case 10:
            str = '待支付';
            break;
          case 20:
            str = '待发货';
            break;
          case 30:
            str = '待收货';
            break;
          case 40:
            str = '待评价';
            break;
          case 50:
            str = '已完成';
            break;
          case 60:
            str = '已完成';
            break;
          case 70:
            str = '已过期';
            break;
          case 80:
            str = '已取消';
            break;
        }
        return str
      },
      orderThirdStatus(v){
        var str = ''
        switch (v){
          case 10:
            str = '处理中';
            break;
          case 11:
            str = '退款中';
            break;
          case 12:
            str = '退款被拒绝';
            break;
          case 13:
            str = '已补发';
            break;
          case 14:
            str = '已退款';
            break;
        }
        return str
      },
    },
    watch:{
      chooseType(val,oV){
        for (var i = 0 ;i < this.selectTab.length ;i++){
          if(this.chooseType == this.selectTab[i].chooseType){
            this.selectTab[i].pageNo = 1;
          }
        }

      }
    },
  }
</script>

<style scoped>
  .fix-t {
    position: fixed;
    overflow: auto;
    top: 44px;
    left: 0;
    height: 100%;
  }
  .consum-record {
    width:100%;
  }
  .head {
    height:.9rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom:1px solid #E3E3E3;
  }
  .bor {
    border-top:.2rem solid rgba(250,250,250,1);
  }
  .ad {
    height:1.5rem;
    /*background: #f00;*/
  }
  .head-com {
    width:1rem;
    height:.9rem;
    padding:0 .25rem;
    text-align: center;
    line-height:.86rem;
    font-weight: 300;
  }
  .red-line {
    width:1rem;
    height:0.04rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    left:.25rem;
    bottom:0;
    z-index:10;
  }
  .read-font {
    color:rgba(255,25,25,1) !important;
    font-weight: 400 !important;
  }
  .order-list {
    border-top:.2rem solid rgba(250,250,250,1);
    box-sizing: border-box;
  }
  .shop-name {
    padding:0 .3rem;
  }
  .name {
    max-width:2.35rem;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
    font-weight: 300;
  }
  .arrer {
    width:.44rem;
    height:.44rem;
    display: block;
    margin-top:.22rem;
  }
  .bg-arrer {
    width:2.86rem;
    background: url("/static/images/wishList/go.png") no-repeat 100% 50%;
    background-size: .44rem;
  }
  .name-state {
    color:rgba(255,101,51,1);
    line-height:0.88rem;
    font-weight: 300;
  }
  /*帮扶*/
  .report {
    width:6.9rem;
    height:0.81rem;
    background-color:rgba(255,248,248,1);
    margin:.3rem auto 0;
    box-sizing: border-box;

  }
  .support {
    margin:.1rem 0 .1rem .2rem;
  }
  .support-img {
    width:.6rem;
    height:.6rem;
    background: rgba(227,227,227,1);
    border:1px solid #E3E3E3;
    border-radius: 60%;
    overflow: hidden;
    display: inline-block;
    top:0;
    box-sizing: border-box;
  }
  .supor-red {
    border:1px dashed #FF1919 !important;
    left:2rem;
    z-index:1;
    background: #fff !important;
  }
  .support-num {
    width:3.5rem;
    line-height:0.81rem;
    background: url("/static/images/wishList/go.png") no-repeat 100% 50%;
    background-size: .44rem;
    color:#4B4B4B;
  }
  .support-col {
    color:rgba(255,25,25,1) !important;
  }
  .support-width {
    width:.4rem;
    display: inline-block;
    text-align: right;
  }
  .point {
    width:.06rem;
    height:.06rem;
    background:rgba(255,25,25,1);
    border-radius: 50%;
    margin-right:.06rem;
  }
  /*延迟发货*/
  .reason {
    width:6.9rem;
    height:0.4rem;
    background:rgba(255,248,248,1);
    margin:.33rem auto 0;
    color:rgba(255,101,51,1);
    line-height:0.4rem;
    font-weight: 300;
    word-break: break-all;
  }
  .goods-list {
    padding:0 .3rem;
  }
  .goods-img {

  }
  .img-bor {
    width:1.63rem;
    height:1.14rem;
    background:rgba(227,227,227,1);
    margin:.3rem .1rem .3rem 0;
  }
  .img {
    width:100%;
    height:100%;
  }
  .goods-num {
    color:rgba(75,75,75,1);
    line-height:0.37rem;
    font-weight: 300;
  }
  .goods-counrt {
    padding-top:.52rem;
    padding-right:.15rem;
    text-align: center;
  }
  .goods-counrt-top {
    padding-top:.22rem !important;
  }
  .bg-arrer1 {
    width:1.28rem;
    background: url("/static/images/wishList/go.png") no-repeat 120% 50%;
    background-size: .44rem;
  }
  .img-single {
    width:1.63rem;
    height:1.14rem;
    background:rgba(227,227,227,1);
  }
  .single-p {
    margin:.2rem 0;
  }
  .single {
    padding-left:.3rem;
    width:3.3rem;
  }
  .single-expect {
    color:rgba(255,25,25,1);
    line-height:0.63rem;
  }
  .single-title {
    color:rgba(75,75,75,1);
    line-height:0.63rem;
  }
  .single-weight {
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }
  .pay {
    padding:0 .3rem;
    text-align: right;
    padding-bottom:.12rem;
  }
  .goods-btn {
    padding:.2rem .3rem;
  }
  .count-down {
    color:rgba(255,101,51,1);
    line-height:.65rem;
  }
  .btn-2,.btn-3 {
    box-sizing: border-box;
    width:1.5rem;
    height:0.61rem;
    border:1px solid #D0D0D0;
    border-radius:.08rem;
    line-height:.61rem;
    text-align: center;
    margin-left:.3rem;
  }
  .btn-ma {
    margin-left:0 !important;
  }
  .btn-col {
    color:rgba(255,25,25,1);
    border-color: #FF1919 !important;
  }
  .btn-4 {
    padding-right: .49rem;
    line-height: .65rem;
  }
  .font-c {
    color:rgba(208,208,208,1) !important;
  }
  .triangle {
    width: 0;
    height: 0;
    border-bottom: .16rem solid rgba(46,46,46,0.7);
    border-left: .15rem solid transparent;
    border-right: .15rem solid transparent;
    margin-left:.9rem;
  }
  .triangle-2 {
    border:none;
    width:1.5rem;
    height:.61rem;
    background:rgba(46,46,46,0.7);
    border-bottom:1px solid #fff;
    color:rgba(255,255,255,1);
    border-radius: 0 !important;
  }
  .more {
    top:.5rem;
    left:-.8rem;
    z-index:1;
  }
  .bottom {
    height:0.76rem;
    background:rgba(250,250,250,1);
  }
  /*弹框*/
  .del {
    width:100%;
    height:100%;
    top:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,.5);
    /*opacity:.4;*/
    z-index:999;
  }
  .del-order {
    /*height:2.3rem !important;*/
  }
  .del-goods {
    width:5.6rem;
    /*height:3.5rem;*/
    background:rgba(255,255,255,1);
    border-radius: 0.16rem ;
    position: absolute;
    left:50%;
    top:50%;
    margin-left: -2.8rem;
    margin-top: -1.8rem;
  }
  .del-tit {
    color:rgba(46,46,46,1);
    line-height:0.5rem;
    border-bottom:1px solid #D0D0D0;
    text-align: center;
    padding:.1rem .3rem .38rem;
  }
  .del-order-t {
    line-height:1.29rem;
    color:rgba(46,46,46,1);
    border-bottom:1px solid #D0D0D0;
    text-align: center;
  }
  .title-prompt {
    color:rgba(46,46,46,1);
    line-height:1rem;
    text-align: center;
  }
  .del-cancel,.del-confirm{
    color:rgba(0,122,255,1);
    line-height:1rem;
    width:2.78rem;
    text-align: center;
  }
  .del-cancel {
    border-right:1px solid #D0D0D0;
  }
  .del-confirm {

  }
  .know {
    color:rgba(0,122,255,1);
    line-height:1rem;
    text-align: center;
  }
  /*无列表*/
  .none-list {
  }
  .non-pos {
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .error-img {
    margin:0 auto;
    width:3.1rem;
    height:3.1rem;
  }
  .error-det {
    color:rgba(208,208,208,1);
    line-height:0.48rem;
    padding-top:.22rem;
    text-align: center;
  }
  /*底部*/
  .wish-bottom {
    height:1.12rem;
    background:rgba(250,250,250,1);
    font-weight: 300;
    color:rgba(227,227,227,1);
    line-height:1.12rem;
    text-align: center;
    box-sizing: border-box;
  }
</style>
