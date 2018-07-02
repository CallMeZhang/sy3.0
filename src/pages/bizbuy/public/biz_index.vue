<style lang="scss" scoped>
  .biz-index{
    width: 100%;
    /*padding-top:0.4rem;*/
    background:#fff;
    .biz-index-title{
      padding:0 0.3rem 0.3rem;
      .biz-large-title{
        height:0.68rem;
        font-size:0.48rem;
        color:rgba(46,46,46,1);
        line-height:0.68rem;
      }
      .biz-large-txt{
        height:0.33rem;
        font-size:0.24rem;
        color:rgba(75,75,75,1);
        line-height:0.33rem;
      }
    }
    .biz-index-way{
      margin-bottom:0.4rem;
      padding:0 0.3rem;
      .way-img-con{
        position: relative;
        width: 6.9rem;
        height: 3.2rem;
        img{
          display:block;
          width: 100%;
          height: 100%;
        }
        .way-img-txt{
          position:absolute;
          left:0.3rem;
          bottom: 0.3rem;
          z-index:1;
          /*height:0.37rem;*/
          font-size:0.26rem;
          color:rgba(255,255,255,1);
          line-height:0.37rem;
        }
      }
      .way-item{
        position:relative;
        width: 6.9rem;
        height: 1rem;
        display:flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        background:rgba(255,248,248,1);
        border:1px solid rgba(227,227,227,1);
        box-sizing: border-box;
        .way-item-txt{
          display:inline-block;
          position:absolute;
          top:50%;
          left:0.3rem;
          transform: translateY(-50%);
          font-size: 0.3rem;
          line-height: 0.42rem;
          color:rgba(255,25,25,1);
        }
        .way-item-btn{
          display:inline-block;
          margin-right:0.3rem;
          width: 1.5rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align:center;
          color:rgba(255,255,255,1);
          background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
          border-radius: 0.08rem;
        }
        .way-item-btn-c{
          width: 1.5rem;
          height: 0.6rem;
          font-size:0.26rem;
          box-sizing: border-box;
          border-radius: 0.08rem;
          background:#fff;
          color:#FF1919;
          border:1px solid rgba(255,25,25,1);
        }
      }
    }
    .orders-flow-con{
      margin-bottom:0.4rem;
      padding:0 0.3rem;
    }
    .orders-flow{
      display:flex;
      width: 6.3rem;
      padding:0 0.3rem;
      height: 1.93rem;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items:center;
      background:rgba(255,248,248,1);
      border-radius: 0.04rem;
      .flow-item{
        margin-right:0.14rem;
        width: 1.04rem;
        text-align:center;
      }
      .flow-nums{
        display:inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align:center;
        font-size:0.3rem;
        color:#fff;
        border-radius: 50%;
        background:linear-gradient(180deg,rgba(255,25,25,1),rgba(255,101,51,1));
      }
      .flow-title{
        text-align:center;
        padding-top:0.15rem;
        font-size: 0.28rem;
        color:#FF6533;
      }
      .flow-descr{
        text-align:center;
        font-size: 0.24rem;
        color:#FF6533;
      }
      .r-triangle{
        margin-right:0.13rem;
        display:inline-block;
        width: 0.44rem;
        height: 0.44rem;
        background:url("/static/images/common/arrow.png")no-repeat center;
        background-size:0.20rem;
      }
    }
    .biz-questions-list{
      padding: 0 0.3rem;
      .questions-item{
        width: 6.9rem;
        height: 1.2rem;
        display:flex;
        flex-flow:row nowrap;
        justify-content: flex-start;
      }
      .question-item-left{
        position:relative;
        width: 0.36rem;
        height: 1.2rem;
      }
      .red-points{
        display:inline-block;
        content:'';
        position:absolute;
        left:0;
        top: 0.3rem;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background:linear-gradient(180deg,rgba(255,25,25,1),rgba(255,101,51,1));
        /*background:url("/static/images/common/red_points.png") no-repeat center;
        background-size:100% 100%;*/
      }
      .red-points-two{
        display:inline-block;
        content:'';
        position:absolute;
        left:0;
        top: 0.5rem;
      }
      .question-item-center{
        display:table;
        width: 5.4rem;
        padding:0.18rem 0;
        height: 1.2rem;
        box-sizing:border-box;
        font-size:0.3rem;
        color:rgba(75,75,75,1);
        line-height:0.42rem;
        .con{
          position:relative;
          display:table-cell;
          vertical-align: middle;
        }
      }
      .question-item-right{
        display:flex;
        flex:1;
        justify-content: flex-end;
        align-items: center;
      }
      .r-sj{
        margin-right:0.13rem;
        display:inline-block;
        width: 0.36rem;
        height: 0.36rem;
        background:url("/static/images/common/arrow.png")no-repeat center;
        background-size:0.16rem;
      }
    }
    .biz-index-footer{
      padding:0 0.3rem;
      height: 1.12rem;
      line-height: 1.12rem;
      text-align:center;
      font-size:0.24rem;
      color:rgba(227,227,227,1);
      background:rgba(250,250,250,1);
      box-shadow:0px 1px 0px 0px rgba(227,227,227,1);
    }
    .padd-top8{padding-top:0.08rem;}
  }
</style>
<template>
  <div class="biz-index">
    <index-title-bar :type="3" :text="'单位采购新方式'"></index-title-bar>
    <!--<div class="biz-index-title">
      <h2 class="biz-large-title">单位采购新方式</h2>
      <p class="biz-large-txt">员工福利、企业日常采购、营销佳礼</p>
    </div>-->
    <div class="biz-index-way" v-for="(item, index) in bizWay" :key="index">
      <div class="way-img-con"><img :src="item.imgUrl" alt="itemImg"><p class="way-img-txt">{{item.imgDescr}}</p></div>
      <div class="way-item">
        <span class="way-item-txt">{{item.bizWayTxt}}</span>
        <button class="way-item-btn" v-if="item.callUp == 0" @click="clickGetData(item.btnOneJumpUrl)" :disabled="isDisabled">{{item.bizWayBtnOne}}</button>
        <span class="way-item-btn" v-if="item.callUp == 1" @click="callPhone(item.phone)">{{item.bizWayBtnOne}}</span>
      </div>
    </div>
    <div class="biz-index-title padd-top8">
      <h2 class="biz-large-title">采购流程</h2>
    </div>
    <div class="orders-flow-con">
      <div class="orders-flow">
        <div class="flow-item">
          <span class="flow-nums">1</span>
          <p class="flow-title">下单</p>
          <p class="flow-descr">采购意向</p>
        </div>
        <div class="r-triangle"></div>
        <div class="flow-item">
          <span class="flow-nums">2</span>
          <p class="flow-title">签约</p>
          <p class="flow-descr">采购协议</p>
        </div>
        <div class="r-triangle"></div>
        <div class="flow-item">
          <span class="flow-nums">3</span>
          <p class="flow-title">收货</p>
          <p class="flow-descr">物流配送</p>
        </div>
        <div class="r-triangle"></div>
        <div class="flow-item">
          <span class="flow-nums">4</span>
          <p class="flow-title">结算</p>
          <p class="flow-descr">开票转账</p>
        </div>
      </div>
    </div>
    <div class="biz-index-title padd-top8">
      <h2 class="biz-large-title">常见问题</h2>
    </div>
    <div class="biz-questions-list padd-top8">
      <div class="questions-item border-bottom-1px" v-for="(qs, index) in questions" :key="index" @click="appOpen(qs.articleUrl,{},true)">
        <div class="question-item-left"><span class="red-points" :class="{'red-points-two':qs.pointsColor == 1}"></span></div>
        <div class="question-item-center"><span class="con">{{qs.conTxt}}</span></div>
        <div class="question-item-right"><div class="r-sj"></div></div>
      </div>
    </div>
    <div class="biz-index-footer">&copy;&nbsp;17shanyuan.com</div>
  </div>
</template>
<script>
  import sy from '../../../../config/sy3.0'
  let host_domain = process.env.NODE_ENV === 'production'?sy.host_production:sy.host_dev;
  import {getFpmOrderInfo} from "@/requests/fpmOrder"
  import indexTitleBar from '@/components/common/indexTitleBar.vue'
  export default{
    data(){
      return {
        isDisabled:false,
        bizWay:[
          {
            imgUrl:this.imgUrl + '/biz/jc_products_2x.jpg',
            imgDescr:'面值自定义，员工福利更随心',
            bizWayTxt:'电子扶贫码',
            bizWayBtnOne:'在线下单',
            btnOneJumpUrl:'fpmPurchasingInfo',
            btnStyle:0,
            btnNumber:1,
            callUp:0,
          },{
            imgUrl:this.imgUrl + '/biz/fpm_2x.jpg',
            imgDescr:'营销物料、食堂原材、日常办公、生产原料，批量采购价更优',
            bizWayTxt:'集中购买',
            bizWayBtnOne:'电话下单',
            bizWayBtnTwo:'目录列表',
            btnOneJumpUrl:window.location.origin + '/catalogLists?catalogId=ef5cf770cd9d41a2ad9539eb0fa04ffa',
            btnTwoJumpUrl:window.location.origin + '/catalogLists?catalogId=ef5cf770cd9d41a2ad9539eb0fa04ffa',
            callUp:1,
            phone:'+8613001175257',
            btnStyle:1,
            btnNumber:2,
          }
        ],
        questions:[
          {
            conTxt:'企业使用这两种采购方式，可以进行消费扶贫吗？',
            articleUrl:window.location.origin + '/letterDetails?where=article&noticeId=e4cec3f4647044929b2dc901738af911',
            pointsColor:0
          },{
            conTxt:'企业采购利器：电子扶贫码全攻略',
            articleUrl:window.location.origin + '/letterDetails?where=article&noticeId=b27dd734e327418aa2a29f00930894aa',
            pointsColor:1
          },{
            conTxt:'如何进行集中采购，集中采购适用于什么场景？',
            articleUrl:window.location.origin + '/letterDetails?where=article&noticeId=7d19bd7156dc4fd3b8ab87bab49d3596',
            pointsColor:0
          },{
            conTxt:'这两种采购方式在发票和付款方面有什么区别？',
            articleUrl:window.location.origin + '/letterDetails?where=article&noticeId=83e3a1e6fa6649dd904e491113994875',
            pointsColor:0
          },{
            conTxt:'这两种采购方式采购的产品质量保障和售后服务如何？',
            articleUrl:window.location.origin + '/letterDetails?where=article&noticeId=6f9635a434124b5fa0d93bcef61f6782',
            pointsColor:0
          }
        ]
      }
    },
    created(){
//      this.clickGetData();
    },
    mounted(){
      //notify刷新页面
      window.bizIndexRefresh=(res)=>{
        console.log('biz_index.vue refresh');
        console.log(res)
      }
      setTimeout(()=>{
        this.syJsbIosRegisterHandler('bizIndexRefresh')
      },0)
      setTimeout(()=>{
        this.$loading.show = false;
        try{
          this.$header.show = false
        }catch (e){
          setTimeout(()=>{this.$header.show = false},0)
        }
      })
    },
    methods:{
      kfzx(){
//        console.log('客服咨询')
        /*this.m7Chat({
          head_image:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1526977453&di=13558af107950fc42cb1879448393132&src=http://img4.duitang.com/uploads/item/201508/16/20150816155055_5RWSA.jpeg',
          member_truename:'dd'
        })*/
        this.jsCallPhone('4006667308')
      },
      callPhone(phone){
        //4006667308 电话
        this.jsCallPhone(phone)
      },
      clickGetData(url){
        let that = this;
        that.isDisabled = true;
        this.removeLsItem('fpmCompanyInfo');
        setTimeout(function(){
          that.isDisabled = false;
        },1000);
        getFpmOrderInfo().then((res)=>{
          if(res && res.data.code == 200){
            that.appOpen(url);
          }
        },(error)=>{
          console.log(error);
        })
      },
      saveImg(srcUrl){
        console.log(srcUrl)
        this.syJsbClickImage(srcUrl);
      },
      longpress(id, func) {
        var timeOutEvent;
        document.querySelector('#' + id).addEventListener('touchstart', function (e) {
          // 开启定时器前先清除定时器，防止重复触发
          clearTimeout(timeOutEvent);
          // 开启延时定时器
          timeOutEvent = setTimeout(function () {
            // 调用长按之后的逻辑函数func
            func();
          }, 300);  // 长按时间为300ms，可以自己设置
        });
        document.querySelector('#' + id).addEventListener('touchmove', function (e) {
          // 长按过程中，手指是不能移动的，若移动则清除定时器，中断长按逻辑
          clearTimeout(timeOutEvent);
          /* e.preventDefault() --> 若阻止默认事件，则在长按元素上滑动时，页面是不滚动的，按需求设置吧 */
        });
        document.querySelector('#' + id).addEventListener('touchend', function (e) {
          // 若手指离开屏幕时，时间小于我们设置的长按时间，则为点击事件，清除定时器，结束长按逻辑
          clearTimeout(timeOutEvent);
        });
      }

    },
    components:{
      'index-title-bar':indexTitleBar,
    }
  }
</script>
