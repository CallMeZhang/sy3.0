<template>
  <div class="fpm-order-detail">
    <div v-title="fTitle"></div>
    <div class="f-order-detail">
      <div class="detail-top">
        <p class="top-tips">
          <span class="clock" :class="{'err-bg':statusBgF, 'finished-bg':statusBgT }"></span>
          <span class="tips-txt" v-if="fpmObj.orderStatus == 10">等待合同</span>
          <span class="tips-txt" v-if="fpmObj.orderStatus == 11">等待确认订单</span>
          <span class="tips-txt" v-if="fpmObj.orderStatus == 20">已发码</span>
          <span class="tips-txt" v-if="fpmObj.orderStatus == 50">已完成</span>
          <span class="tips-txt" v-if="fpmObj.orderStatus == 80">已取消</span>
        </p>
      </div>
      <div class="detail-con">
        <div class="detail-con-top">
          <div class="left-img-con"></div>
          <div class="right-con">
            <h4 class="right-con-title">电子扶贫码</h4>
            <p class="right-con-txt">￥{{fpmObj.goodsPrice}}面值 &times; {{fpmObj.goodsNum}}张，共￥{{fpmObj.totalPrice}}</p>
          </div>
        </div>
        <div class="line-spacing"></div>
        <div class="detail-con-middle">
          <p class="line">
            <span class="left">商品总价</span>
            <span class="right">{{fpmObj.totalPrice}}元</span>
          </p>
          <p class="line">
            <span>有效期</span>
            <span>1个月</span>
          </p>
        </div>
        <div class="line-spacing"></div>
        <div class="detail-con-bottom iphonex-margin-bottom">
          <h3 class="order-numbers">订单编号：<span :data-clipboard-text="fpmObj.mainCode">{{fpmObj.mainCode}}</span></h3>
          <p class="place-order"><span class="point"></span>生成订单 {{fpmObj.createdAt}}</p>
          <div class="f-copy tag-read" :data-clipboard-text="fpmObj.mainCode" @click="copyOrderId">复制</div>
        </div>
      </div>
      <div class="detail-bottom iphonex-bottom-div">
        <div class="look-contract" @click="goUrl()">查看合同</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getOrderDetail} from "@/requests/fpmOrder.js"
  import Clipboard from 'clipboard'
  export default{
    data(){
      return {
        fTitle:'订单详情',
        fpmOrderId:'',
        fpmObj:{},
        statusBgT:false,
        statusBgF:false,
      }
    },
    created() {
      if(this.$route.query.mainId){
        this.fpmOrderId = this.$route.query.mainId;
      }
      setTimeout(()=>{
        this.$header.setTitle("订单详情");
        this.$header.rightFn({
          type:'img',
          url:require('../../../../static/images/mine/service.png'),
          callback:this.kfzx
        })
      })

      this.getDetailData();
    },
    mounted() {},
    methods: {
      getDetailData(){
        getOrderDetail(this.fpmOrderId).then((res)=>{
          this.$loading.show = false;
          if(res && res.data.code == 200){
            if(res.data.data.orderMainVo){
              this.fpmObj = res.data.data.orderMainVo;
              switch (this.fpmObj.orderStatus){
                case 20:
                  this.statusBgT = true;
                  this.statusBgF = false;
                  break;
                case 50:
                  this.statusBgT = true;
                  this.statusBgF = false;
                  break;
                case 80:
                  this.statusBgF = true;
                  this.statusBgT = false;
                  break;
                default:
                  this.statusBgF = false;
                  this.statusBgT = false;
              }

            }
//            console.log(this.fpmObj)
          }else{
//            console.log(res.data.message)
          }
        })
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
      kfzx(){
//        console.log('客服咨询')
        this.m7Chat({
          head_image:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1526977453&di=13558af107950fc42cb1879448393132&src=http://img4.duitang.com/uploads/item/201508/16/20150816155055_5RWSA.jpeg',
          member_truename:'dd'
        })
      },
      goUrl(){
        this.appOpen('fpmOrderContract',{mainId:this.fpmOrderId})
      },
    },
  }
</script>
<style lang="scss" scoped>
  .fpm-order-detail{
    width: 100%;
    height:100%;
    background:#fafafa;
  }
  .f-order-detail{
    margin:0 auto;
    .detail-top{
      width: 7.5rem;
      height:2rem;
      background: url("/static/images/goods/goods-bg.png")no-repeat center;
      background-size: cover;
      .top-tips{
        padding:0.6rem 0.3rem 0;
        display:flex;
        height:0.4rem;
        align-items: center;
        font-size:0.32rem;
        color:rgba(255,255,255,1);
        line-height:0.32rem;
      }
      .clock{
        display:inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background:url("/static/images/common/clock.png")no-repeat center;
        background-size:cover;
      }
      .err-bg{
        display:inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background:url("../../../../static/images/applyRefund/details-error.png")no-repeat center;
        background-size:cover;
      }
      .finished-bg{
        display:inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background:url("../../../../static/images/applyRefund/details-success.png")no-repeat center;
        background-size:cover;
      }
      .tips-txt{
        display:inline-block;
        padding-left:0.1rem;
      }
    }
    .detail-con{

    }
    .detail-con-top{
      padding:0.3rem 0.3rem 0;
      height:1.74rem;
      display:flex;
      background:#fff;
      .left-img-con{
        width: 1.14rem;
        height: 1.14rem;
        display:flex;
        background:url("/static/images/index/code.png")no-repeat center;
        background-size: cover;
      }
      .right-con{
        flex:1;
        padding-top:0.2rem;
        padding-left: 0.3rem;
      }
      .right-con-title{
        height:0.4rem;
        padding-bottom: 0.07rem;
        font-size:0.28rem;
        color:rgba(75,75,75,1);
        line-height:0.4rem;
      }
      .right-con-txt{
        height:0.33rem;
        font-size:0.24rem;
        color:rgba(148,148,148,1);
        line-height:0.33rem;
      }
    }
    .detail-con-middle{
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 0.3rem;
      height: 1.28rem;
      background: #fff;
      .line{
        display:flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        font-size:0.26rem;
        color:rgba(148,148,148,1);
        line-height:0.44rem;
        .left{
          width: 3.05rem;
          text-align:left;
        }
        .right{
          flex:1;
          text-align:right;
        }
      }
    }
    .line-spacing{
      width: 100%;
      height:0.2rem;

    }
    .detail-con-bottom{
      position:relative;
      padding:0.2rem 0.3rem 0;
      height: 1.65rem;
      background:#fff;
      .order-numbers{
        height:0.44rem;
        font-size:0.26rem;
        color:rgba(148,148,148,1);
        line-height:0.44rem;
      }
      .place-order{
        position:relative;
        font-size:0.26rem;
        color:rgba(148,148,148,1);
        line-height:0.5rem;
        padding-left:0.37rem;
        .point{
          position:absolute;
          left:0;
          top:50%;
          margin-top:-0.07rem;
          display:inline-block;
          width:0.14rem;
          height:0.14rem;
          background:rgba(255,25,25,1);
          border-radius: 50%;
          box-shadow: 0 0 2px #FF1919;
        }
      }
      .f-copy{
        position:absolute;
        top:0.2rem;
        right:0.3rem;
        display:inline-block;
        width:1rem;
        height:0.44rem;
        line-height: 0.44rem;
        text-align:center;
        border-radius: 0.08rem;
        font-size:0.22rem;
        color:rgba(46,46,46,1);
        border:1px solid #D0D0D0;
      }
    }
    .detail-bottom{
      position:fixed;
      bottom:0;
      height:1rem;
      width: 100%;
      text-align:right;
      .look-contract{
        margin-top:0.14rem;
        margin-right:0.3rem;
        display:inline-block;
        width:1.6rem;
        height:0.66rem;
        line-height: 0.66rem;
        text-align:center;
        border-radius: 0.08rem;
        border:1px solid #D0D0D0;
      }
    }
  }
</style>
