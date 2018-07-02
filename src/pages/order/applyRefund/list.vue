<template>
    <section v-title="title" class="container">
        <ul class="list" v-if="paging.list.length">
            <li class="li border-top-1px border-bottom-1px" v-for="(item,index) in paging.list" @click="go(item.orderId)">
                <section class="title border-bottom-1px">
                    <div class="title-left">退款单号：{{item.refundNo}}</div>
                    <div class="title-status">
                        <span v-if="item.refundStatus == 14">已退款</span>
                        <span v-else>
                        {{item.serviceWay == 0 || item.serviceWay == 2 ? "处理中" : ""}}
                        {{item.serviceWay == 1 ? "退款中" : ""}}
                        {{item.serviceWay == 3 ? "拒绝退款" : ""}}
                        {{item.serviceWay == 4 ? "已补发" : ""}}
                        </span>
                    </div>
                </section>
                <section class="info">
                    <div class="tip" v-show="item.autoRefundAtDay" v-if="(item.serviceWay == 1 && item.refundStatus != 14) || (item.serviceWay == 2 && item.refundStatus != 14)">{{item.autoRefundAtDay}}天后将自动同意退款</div>
                    <div class="info-goods">
                        <ul class="goods-list">
                            <li v-for="(itemC,indexC) in item.refundGoodsVoList" v-if="indexC < 3">
                                <img v-img-cover="itemC.goodsImg + ossUrl('webp_240')" v-lazy="itemC.goodsImg + ossUrl('webp_240')">
                            </li>
                        </ul>
                        <div class="other" v-if="item.refundGoodsVoList.length != 1">
                            <span>共{{item.refundGoodsVoList.length}}件</span>
                            <span>查看详情</span>
                        </div>
                        <div class="goods-info" v-else>
                            <h3 :class="{h3:true,'no-enter':true,yushou:item.refundGoodsVoList[0].tradeModel == 1}">
                                {{item.refundGoodsVoList[0].goodsName}}
                            </h3>
                            <h4 class="h4 no-enter">{{item.refundGoodsVoList[0].specUnit}}</h4>
                        </div>
                    </div>
                </section>
            </li>
            <aside class="no_more" v-if="isLoading">加载中</aside>
            <aside class="no_more" v-else>@17shanyuan.com</aside>
        </ul>
        <div class="non-pos absolute" v-else>
            <img :src="imgUrl + '/common/error.png'" alt="错误" class="error-img">
            <p class="error-det font32">您还没有退款记录</p>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                title:"我的售后记录",
                pageIndex:1,
                isLoading:false,    //正在加载中

                pageNo:1,               //当前分页
                isLoading:false,        //正在加载中
                paging:{                //分页对象
                    "hasNext": true,
                    "allCount": 17,
                    "list": []
                }

            }
        },
        methods:{
            go(id){
                this.appOpen('applyRefundDetails',{orderId:id})
            },
            getList(){
                var url = "/order-center/refund/userRefundOrderList";
                this.isLoading = true;
                this.getWithToken(url,{
                    curPage:this.pageNo,
                }).then((res)=>{
                  this.$loading.show=false
                    if (res.code == 200) {
//                        console.log('请求成功',res.data);
                        if (this.pageNo == 1) {
                            this.paging.list = res.data.orderRefundVos;
                        }else{
                            this.paging.list = this.paging.list.concat(res.data.orderRefundVos);
                        }
                        if (res.data.orderRefundVos.length == 0) {
                            this.paging.hasNext  = false;
                        }
                        this.pageNo++;
                        this.isLoading = false;
                    }else{
                        this.$toast(res.message);
                    }
                },err =>{
                    this.isLoading = false;
                })
            },
            open(){
                this.appBackTabbarIndex('5',0)    //直接返回第五个tab页  第五个页,不刷新
//                this.syJsbCloseAppPage();
            }
        },
        watch:{},
        computed:{},
        filters:{},
        created(){
            this.getList()
            this.$scroll(()=>{
                if (this.paging.hasNext) {
                    if (!this.isLoading) {
                        this.getList();
                    }else{
                        console.log("请求中..骚等")
                    }
                }else{
                    console.log('没有下一页，不请求')
                }
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
            if (this.$route.query.disableReturn == 1) {
                this.appUnBack();                       //禁掉物理返回键
                this.$header.customBehavior(this.open); //左上角返回指引前进
            }
            console.log(window.location.href)

//            this.middleFn({
//                type:text/input
//                callback:function(){}
//            })
            document.body.style.backgroundColor = "#fafafa"
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .non-pos{
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .error-img {
        margin: 0 auto;
        width: 3.1rem;
        height: 3.1rem;
    }
    .error-det{
        color: rgba(208,208,208,1);
        line-height: 0.48rem;
        padding-top: .22rem;
        text-align: center;
    }
    img{
        width:100%;
        height:100%;
    }
    .list{
        background-color:#FAFAFA;
    }
    .li{
        font:300 0.26rem/0.37rem $fa;
        color:$c4B;
        background-color:#fff;
    }
    .li:first-child:before{
        display:none;
    }
    .li + .li{
        margin-top:0.2rem;
    }
    .title{
        padding:0 0.3rem;
        display:flex;
        height:0.88rem;
        align-content:center;
        justify-content:space-between;
    }
    .title-left{
        line-height:0.9rem;
    }
    .title-status{
        line-height:0.9rem;
        color:#FF6533;
        min-width:1.1rem;
        text-align:right;
        white-space:nowrap;
    }
    .info{
        padding:0.3rem;
    }
    .tip{
        background-color:#FFF8F8;
        padding:0.04rem 0.2rem;
        font:0.24rem/0.34rem $fa;
        margin-bottom:0.16rem;
    }
    .info-goods{
        height:1.14rem;
        display:flex;
        justify-content:space-between;

    }
    .info-goods li{
        width:1.63rem;
        height:100%;
        display:flex;
        align-items:center;
        margin-right:0.1rem;

    }
    .other{
        color:$c4B;
        text-align:center;
        font:300 0.26rem/0.37rem $fa;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        /*background-color:red;*/
        width:1.7rem;
        background:url(/static/images/common/arrow.png) right center/0.13rem 0.22rem no-repeat;
    }
    .goods-list{
        display:flex;
        flex:0 0 auto;
    }
    .goods-info{
        width:4.96rem;
        padding-left:0.2rem;
        .h3{
            color:$c4B;
            font:0.28rem/0.4rem $fa;
            margin-bottom:0.07rem;
        }
        .h4{
            color:#949494;
            font:0.24rem/0.33rem $fa;
        }
    }
    .empty_text{
        font:0.28rem/1.5 $fa;
        text-align:center;
        color:#D0D0D0;

    }
    ._empty{
        background-color:#fafafa;
        height:4.18rem;
        padding-top:0.6rem;
        box-sizing:border-box;
    }
    .empty_icon{
        background-image:url(/static/images/common/error.png);
    }
</style>
