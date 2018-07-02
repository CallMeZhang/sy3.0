<template>
    <section v-title="title" class="container g-order">
        <section class="top">
            <div class="top_title">
                <span class="top_title_icon success" v-if="orderRefundVo.refundStatus == 14 || orderRefundVo.serviceWay == 4"></span>
                <span class="top_title_icon error" v-else-if="orderRefundVo.serviceWay == 3"></span>
                <span class="top_title_icon wait" v-else></span>

                <span v-if="orderRefundVo.refundStatus == 14">已退款</span>
                <span v-else>
                    {{orderRefundVo.serviceWay == 0 || orderRefundVo.serviceWay == 1 || orderRefundVo.serviceWay == 2 ? "处理中" : ""}}
                    {{orderRefundVo.serviceWay == 3 ? "拒绝退款" : ""}}
                    {{orderRefundVo.serviceWay == 4 ? "已补发" : ""}}
                </span>
              </div>
            <div class="top_con">
                <div>
                    订单编号：{{orderRefundVo.orderCode}}
                    <br>
                    退款单号：{{orderRefundVo.refundNo}}
                </div>
                <div class="btn" @click="appOpenMode('orderInfo',{orderId:orderRefundVo.orderId})">查看订单</div>
            </div>
        </section>
        <section class="mid">
            <div class="mid_title border-bottom-1px">
                <span>退款详情</span>
                <span :class="{to_bot:true,to_top:!show}" @click="show = !show"></span>
            </div>
            <transition name="fade2">
                <div v-if="show">
                    <div class="list_box border-bottom-1px" v-for="(item,index) in orderRefundVo.refundGoodsVoList">
                        <ul class="list_group border-bottom-1px">
                            <li class="list_one">
                                <aside class="list_one_pic">
                                    <img v-img-cover="item.goodsImg + ossUrl('webp_240')" :src="item.goodsImg + ossUrl('webp_240')">
                                </aside>
                                <section class="list_one_info">
                                    <h3 class="h3 no-enter2">{{item.goodsName}}</h3>
                                    <h4 class="h4">{{item.specUnit}}</h4>
                                    <aside class="list_one_bot">
                                        <span class="amount">数量： × {{item.goodsNum}}</span>
                                    </aside>
                                </section>
                            </li>
                        </ul>
                        <div class="info">
                            <div class="info_item">
                                <span class="info_item_t">原因：</span>
                                <div class="info_item_r">{{item.refundReason}}</div>
                            </div>
                            <div class="info_item">
                                <span class="info_item_t">描述：</span>
                                <div class="info_item_r">{{item.refundDesc}}</div>
                            </div>
                            <div class="info_item" v-if="item.evidenceImg.length">
                                <span class="info_item_t">照片：</span>
                                <ul class="info_item_r info_item_pics">
                                    <li class="li" v-for="(itemP,indexP) in item.evidenceImg" v-if="indexP < 9">
                                        <img :src="itemP.imgUrl + ossUrl('webp_960')"
                                             v-img-cover="itemP.imgUrl + ossUrl('webp_960')"
                                             preview="0"
                                             :preview-text="''"
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <!--/**-->
            <!--* 申请退款-->
            <!--*/-->
            <!--String APPLY_REFUND = "apply_refund";-->
            <!--/**-->
            <!--* 卖家同意退款-->
            <!--*/-->
            <!--String AGREE_REFUND  = "agree_refund";-->
            <!--/**-->
            <!--* 自动退款-->
            <!--*/-->
            <!--String AUTO_REFUND = "auto_refund";-->

            <!--/**-->
            <!--* 订单关闭-->
            <!--*/-->
            <!--String ORDER_CLOSED = "order_closed";-->


            <!--/**-->
            <!--* 卖家拒绝退款-->
            <!--*/-->
            <!--String REFUSED_REFUND = "refused_refund";-->

            <!--/**-->
            <!--* 退款补发-->
            <!--*/-->
            <!--String REISSUE_REFUND = "reissue_refund";-->


            <!--/**-->
            <!--*  客服申请了补发货品-->
            <!--*/-->
            <!--String SERVICE_APPLY_REISSUE_REFUND = "service_apply_reissue_refund";-->

            <!--/**-->
            <!--*  卖家补发了货品-->
            <!--*/-->
            <!--String STORE_REISSUE_REFUND = "store_reissue_refund";-->

            <div class="mid_title border-top-1px" style="margin-top:0.2rem">
                <span>退款进度</span>
            </div>
            <div class="progress-lists border-top-1px">
                <ul>
                    <li class="progress-lists-li" v-for="(item,index) in refundLogBos">
                        <div class="progress-lists-left">
                            <span style="white-space:nowrap">{{ item.createAt | cutOne}}</span><br><span>{{ item.createAt  | cutTwo}}</span>
                        </div>
                        <div class="progress-lists-mid"></div>

                        <div class="progress-lists-right" v-if="item.type == 'apply_refund'">
                            <h3 class="progress-lists-h3">提交了退款</h3>
                            <div class="progress-lists-p" v-if="orderRefundVo.isAtOnceRefund == 1">正在处理您的退款申请，预计30分钟内处理完成</div>
                            <div class="progress-lists-p" v-else>等待客服处理，若客服无响应，将在5天后自动为您退款</div>
                        </div>

                        <div class="progress-lists-right" v-else-if="item.type == 'agree_refund'">
                            <h3 class="progress-lists-h3">客服同意了退款</h3>
                            <div class="progress-lists-p">
                                <p>
                                    <span>客服同意为您退回</span><!--
                                 --><span v-if="parseFloat(orderRefundVo.refundAmountStr)">支付金额：¥{{orderRefundVo.refundAmountStr}}&nbsp;，&nbsp;</span>
                                    <span v-if="parseFloat(orderRefundVo.refundAidCouponStr)">电子扶贫码金额：¥{{orderRefundVo.refundAidCouponStr}}&nbsp;，&nbsp;</span>
                                    <span v-if="orderRefundVo.refundPoint">公益积分：{{orderRefundVo.refundPoint}}&nbsp;，&nbsp;</span>退款将按原支付方式返回，预计需要1～5个工作日到账。
                                </p>
                                <p>虽然帮扶没有成功，但感谢您为扶贫事业做出的尝试，您的公益积分将仍为您保留。</p>
                                <p v-if="orderRefundVo.serviceLeaveWord">客服留言：{{orderRefundVo.serviceLeaveWord}}</p>
                                <p v-if="orderRefundVo.couponId">您已获得了1张{{couponValue}}元电子扶贫码，购买善源甄选所有商品均可抵扣现金 <span class="coupon border-bottom-1px" @click="appOpen('povertyCode')">立即查看</span></p>
                            </div>
                        </div>
                        <div class="progress-lists-right" v-else-if="item.type == 'refused_refund'">
                            <h3 class="progress-lists-h3">客服拒绝了退款</h3>
                            <div class="progress-lists-p">
                                <p v-if="orderRefundVo.serviceDealMsg">拒绝理由：{{orderRefundVo.serviceDealMsg}}</p>
                                <p v-if="orderRefundVo.serviceLeaveWord">客服留言：{{orderRefundVo.serviceLeaveWord}}</p>
                                <p v-if="orderRefundVo.couponId">您已获得了1张{{couponValue}}元电子扶贫码，购买善源甄选所有商品均可抵扣现金 <span class="coupon border-bottom-1px" @click="appOpen('povertyCode')">立即查看</span></p>
                            </div>
                        </div>
                        <div class="progress-lists-right" v-else-if="item.type == 'auto_refund'">
                            <h3 class="progress-lists-h3">已为您自动退款</h3>
                            <div class="progress-lists-p">
                                <p>
                                    <span>已为您退回</span><!--
                                 --><span v-if="parseFloat(orderRefundVo.refundAmountStr)">支付金额：¥{{orderRefundVo.refundAmountStr}}&nbsp;，&nbsp;</span>
                                    <span v-if="parseFloat(orderRefundVo.refundAidCouponStr)">电子扶贫码金额：¥{{orderRefundVo.refundAidCouponStr}}&nbsp;，&nbsp;</span>
                                    <span v-if="orderRefundVo.refundPoint">公益积分：{{orderRefundVo.refundPoint}}&nbsp;，&nbsp;</span>退款将按原支付方式返回，预计需要1～5个工作日到账。
                                </p>
                                <p>虽然帮扶没有成功，但感谢您为扶贫事业做出的尝试，您的公益积分将仍为您保留。</p>
                            </div>
                        </div>
                        <div class="progress-lists-right" v-else-if="item.type == 'success_refund'">
                            <h3 class="progress-lists-h3">退款成功</h3>
                            <div class="progress-lists-p">
                                <span>退回</span><!--
                                --><span v-if="parseFloat(orderRefundVo.refundAmountStr)">支付金额：¥{{orderRefundVo.refundAmountStr}}</span>
                                <span v-if="parseFloat(orderRefundVo.refundAidCouponStr)">&nbsp;电子扶贫码金额：¥{{orderRefundVo.refundAidCouponStr}}</span>
                                <span v-if="orderRefundVo.refundPoint">&nbsp;公益积分：{{orderRefundVo.refundPoint}}</span>
                            </div>
                        </div>
                        <div class="progress-lists-right" v-else-if="item.type == 'except_refund'">
                            <h3 class="progress-lists-h3">退款异常</h3>
                            <div class="progress-lists-p">按原支付方式退款遇到异常，工作人员可能会在3个工作日内通过其它渠道为您转款，您也可以联系客服：400-666-7308</div>
                        </div>
                        <div class="progress-lists-right" v-else-if="item.type == 'service_apply_reissue_refund'">
                            <h3 class="progress-lists-h3">客服为你申请了补发货品</h3>
                            <div class="progress-lists-p">
                                <p v-if="orderRefundVo.serviceLeaveWord">客服留言：{{orderRefundVo.serviceLeaveWord}}</p>
                                <p v-if="orderRefundVo.couponId">您已获得了1张{{couponValue}}元电子扶贫码，购买善源甄选所有商品均可抵扣现金 <span class="coupon border-bottom-1px" @click="appOpen('povertyCode')">立即查看</span></p>
                            </div>
                        </div>
                        <div class="progress-lists-right" v-else-if="item.type == 'reissue_refund'">
                            <h3 class="progress-lists-h3">卖家补发了货品</h3>
                            <div class="progress-lists-p">
                                <p>{{orderRefundVo.storeLeaveWord ? '卖家留言：' + orderRefundVo.storeLeaveWord + ',': ""}}
                                    {{orderRefundVo.expressName}}：{{orderRefundVo.expressCode}} 请您注意查收</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <section class="btn-all-bot iphone10-footer-padding g-fff"
                     v-if="(orderRefundVo.serviceWay == 1 && orderRefundVo.refundStatus == 14) || orderRefundVo.serviceWay == 2 ||  orderRefundVo.serviceWay == 3">
                <section class="btn-all-bot-inner iphone10-footer-padding g-gray border-top-1px">
                    <div class="support">
                        <div class="btn2" @click="support(3)" v-if="orderRefundVo.refundEval == 3 || orderRefundVo.refundEval == 0">
                            <div :class="{pic:true,pic2:true,active:orderRefundVo.refundEval == 3}"></div>
                            <p class="p2">满意</p>
                        </div>
                        <div class="btn2" @click="support(1)" v-if="orderRefundVo.refundEval == 1 || orderRefundVo.refundEval == 0">
                            <div :class="{pic:true,active:orderRefundVo.refundEval == 1}"></div>
                            <p class="p2">不满意</p>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    </section>
</template>
<script type="text/ecmascript-6">
    import a from '@/modules/photoPreview/index.js'
    export default{
        data(){
            return{
//                orId:this.$route.query.orId,//退款单id
                orderId:this.$route.query.orderId,  //订单id
                title:"退款详情",
                show:true,
                orderRefundVo:{},
                refundLogBos:[],
                couponValue:'',
            }
        },
        methods:{
            support(b){
//                console.log(b)
                if (this.orderRefundVo.refundEval == 0) {
                    var url = "/order-center/refund/evalRefund";
                    this.getWithToken(url,{orId:this.orderRefundVo.orId,evalValue:b}).then(res=>{
                        if (res && res.code == 200) {
//                            this.$toast('感谢您对这次服务做出评价！');
                            this.$alert("感谢您对这次服务做出评价",()=>{},'知道了');
                            this.orderRefundVo.refundEval = b;
                        }else{
                            this.$toast(res.message)
                        }
                    })
                }else{
                    console.log('您已经评价完成')
                }
            },
            getDetail(){
                var url = "/order-center/refund/refundOrderDetail";
                this.getWithToken(url,{orderId:this.orderId}).then(res=>{
                  this.$loading.show=false
                  if (res && res.code == 200) {
                      this.orderRefundVo = res.data.orderRefundVo;
                      res.data.orderRefundVo.couponId ? this.getcouponDetail(res.data.orderRefundVo.couponId) : "";

                  }else{
                      this.$toast(res.message)
                  }
                })
            },
            getcouponDetail(couponId){ //获得扶贫码详情（获取钱数）
                var url = "/coupon-center/aidCouponApp/couponDetail";
                this.getWithToken(url,{couponId:couponId}).then(res=>{
                    if (res && res.code == 200) {
//                        console.log(res)
                        this.couponValue = res.data.aidCoupon.couponValue;
                    }else{
                        this.$toast(res.message)
                    }
                })
            },
            getProgressLog(){   //退款进度
                var url = "/order-center/refund/getRefundStatusLog";
                this.getWithToken(url,{orderId:this.orderId}).then(res=>{
                  this.$loading.show=false
                    if (res && res.code == 200) {
                        this.refundLogBos = res.data.refundLogBos;
//                        console.log(this.refundLogBos)
                    }else{
                        this.$toast(res.message)
                    }
                })
            },
            open(){
                this.appOpen('applyRefundList',{disableReturn:1});
            }
        },
        updated(){
            this.$nextTick(()=>{
                this.$previewRefresh();//刷新预览图片列表
            })
        },
        mounted(){


            this.$header.setTitle(this.title);
          var that =this
          this.$header.rightFn({
            type:'img',
            url:require('../../../../static/images/mine/service.png'),
            callback:function () {
              that.m7Chat()
            }
          })
            this.getDetail();
            this.getProgressLog();

            if (this.$route.query.disableReturn == 1) {
                this.appUnBack();                       //禁掉物理返回键
                this.$header.customBehavior(this.open); //左上角返回指引前进
            }
//            this.appUnBack();                       //禁掉物理返回键

//            this.$header.setBack({isReload:0,times:4})
        },
        filters:{
            cutOne(a){
//                console.log(a.split(" ")[0].split("-")[1] + "-" + a.split(" ")[0].split("-")[2])
                return a.split(" ")[0].split("-")[1] + "-" + a.split(" ")[0].split("-")[2]
            },
            cutTwo(a){
                return a.split(" ")[1].split(":")[0] + ":" + a.split(" ")[1].split(":")[1];
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .btn-all-bot-inner,.btn-all-bot{
        height:1.6rem;
    }
    .support{
        height:1.6rem;
        background-color:#fff;
        text-align:center;
        .btn2{
            font:300 0.26rem/0.37rem $fa;
            display:inline-block;
            margin-top:0.2rem;
            width:0.8rem;
            .pic{
                width:0.8rem;
                height:0.8rem;
                background:url(/static/images/common/unsupport.png) center center/cover no-repeat;
            }
            .pic2{
                background-image:url(/static/images/common/support.png);
            }
            .pic.active{
                background-image:url(/static/images/applyRefund/unsupport-active.png)!important;
            }
            .pic2.active{
                background-image:url(/static/images/applyRefund/support-active.png)!important;
            }
            .p2{
                color:$c4B!important;
            }
        }
        .btn2 + .btn2{
            margin-left:1.1rem;
        }
    }
    .coupon{
        color:#007AFF;
        margin-left:0.1rem;
        font:0.26rem/0.39rem $fa;
    }
    .coupon:after{
        border-color:#007AFF;
    }
    .top{
        height:2rem;
        /*background-color:#FF1919;*/
        background:url(/static/images/applyRefund/details_bg.png) left top/cover no-repeat;
        font:0.24rem/0.36rem $fa;
        color:#fff;
    }
    .top_title{
        font:400 0.32rem/0.4rem $fa;
        display:flex;
        align-items:center;
        padding:0.35rem 0 0 0.3rem;
    }
    .top_title_icon{
        width:0.4rem;
        height:0.4rem;
        background:url(/static/images/applyRefund/details-wait.png) center center/cover no-repeat;
        margin-right:0.1rem;
    }
    .top_title_icon.wait{
        background-image:url(/static/images/applyRefund/details-wait.png)
    }
    .top_title_icon.success{
        background-image:url(/static/images/applyRefund/details-success.png)
    }
    .top_title_icon.error{
        background-image:url(/static/images/applyRefund/details-error.png)
    }
    .top_con{
        display:flex;
        padding:0.22rem 0 0 0.8rem;
        font-weight:300;
    }
    .btn{
        width:1.1rem;
        font:0.22rem/0.4rem $fa;
        height:0.38rem;
        border:1px solid #fff;
        border-radius:0.04rem;
        text-align:center;
        margin-left:0.2rem;
        margin-top: -0.05rem;
    }
    .mid{
        background-color:#fafafa;
        color:#2E2E2E;
        font:0.26rem/1.5 $fa;
    }
    .mid_title{
        background-color:#fff;
        font:0.28rem/1.5 $fa;
        padding-left:0.3rem;
        display:flex;
        align-items:center;
        justify-content:space-between;
        height:0.88rem;
    }
    .to_bot{
        width:0.88rem;
        height:0.88rem;
        background:url(/static/images/applyRefund/toBot.png) center center/0.44rem 0.44rem no-repeat;
        transition:all 0.3s;
        transform:rotate(-180deg);

    }
    .to_top{
        transform:rotate(0deg);
    }
    .info{
        background-color:#fff;
        padding-top:0.31rem;
    }
    .info_item{
        padding:0 0.3rem 0.24rem;
        color:#949494;
        font:300 0.26rem/1.5 $fa;
        display:flex;
        align-items:flex-start;
    }
    .info_item_t{
        width:0.84rem;
        flex:0 0 auto;
    }
    .info_item_pics{
        width:6rem;
        font-size:0;
        display:flex;
        flex-wrap:wrap;
        .li{
            width:1.64rem;
            height:1.64rem;
            margin: 0 0.1rem 0.1rem 0;
            overflow: hidden;
            position: relative;
        }
    }
    /*退款进度*/
    .progress-lists{
        padding:0.34rem 0.3rem 0.4rem;
        background-color:#fff;
        /*border-top:1px solid #e3e3e3;*/
    }
    .progress-lists-li{
        display:flex;
        color:#949494;
    }
    .progress-lists-left{
        font:0.24rem/1.5 $fa;
        text-align:right;
        width:0.71rem;
        margin-top:-0.2rem;
        /*background-color:red;*/
    }
    .progress-lists-mid{
        width:0.3rem;
        min-width:0.3rem;
        flex:0 0 auto;
        margin:0 0.3rem;
        position:relative;
        /*background-color:red;*/
    }
    .progress-lists-mid:after{
        content:'';
        display:inline-block;
        width:0.3rem;
        min-width:0.3rem;
        height:0.3rem;
        background:url(/static/images/applyRefund/stup-ago.png) left top/0.3rem 0.3rem no-repeat;
        position:relative;
        transform:rotate(180deg);
    }
    .progress-lists-mid:before{
        content:'';
        position:absolute;
        width:0;
        height:100%;
        border-left:0.02rem solid #E3E3E3;
        left:0.14rem;
        top:0;
    }
    .progress-lists-right{
        flex:1 0 0%;
        padding-bottom:0.56rem;
        width:5.29rem;
        word-break:break-all;
    }
    .progress-lists-h3{
        font:0.3rem/1 $fa;
        margin-bottom:0.12rem;
    }
    .progress-lists-p{
        font:300 0.26rem/0.39rem  $fa;
        text-align:justify;
        p + p{
            padding-top:0.1rem;
        }
    }
    .progress-lists-li:first-child .progress-lists-left{
        margin-top:-0.08rem;
    }
    .progress-lists-li:last-child .progress-lists-h3{
        color:#FF1919;
    }
    .progress-lists-li:last-child .progress-lists-mid:before{
        border:none;
    }
    .progress-lists-li:last-child .progress-lists-right{
        padding-bottom:0;
    }
    .progress-lists-li:last-child .progress-lists-mid:after{
        transform:rotate(0deg);
        background-image:url(/static/images/applyRefund/stup-now.png);
    }
    /*退款进度 end*/

    /*列表微调*/
    .g-order .list_group{
        background-color:#fafafa;
        border:none;
    }
    .g-order .list_box{
        /*border-top:1px solid #E3E3E3;*/
        /*border-bottom:1px solid #E3E3E3;*/
    }
    .g-order .list_box + .list_box{
        border-top:none;
    }
    /*列表微调end*/
    .info_item_r{
        flex-grow:1;
    }
</style>
