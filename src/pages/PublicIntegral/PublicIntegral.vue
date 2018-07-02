<template>
    <section class='main' v-title="'公益积分'">
        <div style='position:fixed;width: 100%;font-size:0; line-height:0;'>
            <div style=''>
                <div class='tops iphone10-paddingTopBox header-paddingTop'>
                    <span style='display:block;' @click='syJsbCloseAppPage()'><img :src="imgUrl+'/PublicIntegral/Rectangle 2.png'" style='width:0.56rem;height:0.56rem;margin:0.2rem  0 0.2rem 0.2rem;'></span>
                    <span style='font-size:0.36rem;color:#fff;margin-right:.7rem;'>公益积分</span>
                    <span></span>
                </div>
            </div><!--
         --><div>
                <div class='title'>
                    <div class='position' style="height:3.99rem">
                        <div class='parameters'>
                            <p style="font-size:0.28rem;color:#4B4B4B;font-weight:300;height:0.72rem;line-height:0.72rem;">{{ this.cumulative }}</p>
                            <p style="font-size:0.56rem;color:#2E2E2E;font-weight:bold;line-height:1.1rem;">{{ this.integrals.totalPoints }}<span @click='slideShow()'><img :src="imgUrl+'/PublicIntegral/Fill 1 + Fill 2 + Fill 3.png'" style="width:0.35rem;height:0.35rem;margin-left:0.1rem;"></span></p>
                            <p style="display:flex;justify-content:space-between;align-items:center;margin-top:0.7rem;">
                                <span style="font-size:0.28rem;color:#4B4B4B;">已用&nbsp:&nbsp&nbsp{{ this.integrals.usedPoints }}</span>
                                <span style="font-size:0.28rem;color:#4B4B4B;">可用&nbsp:&nbsp&nbsp{{ this.integrals.remainedPoints}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class='IntegralList'>
            <div style='height:4.5rem;'></div>
            <div class='iphone10-paddingTopBox'>
                <ul v-for="item in IntegralLog.result" >
                    <li>
                        <div class='left'>
                            <h2 class='name'style="font-size:0.3rem;color:#4B4B4B;font-weight:bold;">{{ item.desc }}</h2>
                            <p style="font-size:0.24rem;color:#949494;">{{ item.addTime }}</p>
                        </div>
                        <div class='right'>
                            <span :class="item.points <=0 ? 'Reduction':'add'" >{{ item.points }}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div style='height:1rem;'></div>
            <aside class="no_more footer" v-if="!isLoading">没有更多了</aside>
            <aside class="no_more footer" v-else>加载中</aside>
        </div>
        <transition name="fade2">
            <aside class="shadow" v-show="shadowShow" @click="slideHide"></aside>
        </transition>
        <transition name="slideTop">
            <section class="sToTop-box" v-show="shadowShow">
                <div class="sToTop-box-close" @click="slideHide"></div>
                <div class="sToTop-box-title border-bottom-1px">公益积分小贴士</div>
                <div class="sToTop-box-list" @scroll.stop>
                <div>
                    <ul class='tips'>
                        <li>
                            <p class='titles'><img v-lazy="imgUrl+'/PublicIntegral/Path Copy 20.png'">{{ this.titles }}</p>
                            <div class='main'>
                                <p>公益积分是平台对您公益行为的奖励，也是您公益行为的一种记录。</p>
                                <p>1.<b>累计公益积分：</b>是您加入平台以来，所有公益行为获得的积分奖励总和，也是您在公益排行榜中的排行依据。</p>
                                <p>2.<b>可用公益积分：</b>是您可以使用的公益积分，在积分商城可以兑换商品或参与活动抽奖等。</p>
                                <p>3.<b>已用公益积分：</b>是您在平台中消耗的积分总和。</p>
                            </div>
                        </li>
                        <li>
                            <p class='titles'><img v-lazy="imgUrl+'/PublicIntegral/Path Copy 20.png'">{{ this.tit }}</p>
                            <div class='main'>
                                <p>在中益善源平台上，通过以下行为可以获得积分：</p>
                                <p>1.<b>爱心帮扶产品：</b>当您购买爱心产品时，您每支付1元钱，就可以获得10积分的奖励。公益积分将在您确认收货后发放到您的账户中。</p>
                                <p>2.<b>邀请好友注册：</b>若有好友因您分享而注册，您和您的好友都将获得100积分的奖励。每天只有前30次还有邀请可以获得积分哦。</p>
                                <p>3.<b>向好友推荐产品：</b>当您向朋友分享您已经购买过的农产品时，若您的好友进行了爱心购买，帮助提升了农民的销量，您可以获得5%的积分。比如您的好友每支付10元获得100积分后，您将获得5积分的奖励。</p>
                                <p>4.<b>参加公益项目：</b>当您在善源公益版块参与捐款时，您每捐1元钱，将获得10积分的奖励。</p>
                                <p>5.<b>商品评价：</b>当您对已完成订单进行评价，且字数达到10个字以上时，将获得20积分的奖励。</p>
                                <p>6.<b>分享签到：</b>当您完成每日签到时，分享签到心情后，将获得5积分的奖励。</p>
                                <p>7.<b>分享订单：</b>当您购买了爱心产品后，分享此订单后，将获得5积分的奖励。</p>
                            </div>
                        </li>
                        <li>
                            <p class='titles'><img v-lazy="imgUrl+'/PublicIntegral/Path Copy 20.png'">{{ this.tits }}</p>
                            <div class='main'>
                                <p>1.目前在积分商城版块们可以使用积分兑换相应的商品。</p>
                                <p>2.可用公益积分：是您可以使用的公益积分，使用这些积分，在善源商场可以享受现金抵扣。</p>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </section>
        </transition><!--公益积分小贴士-->
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                name:'购买善源商场产品 (积分支付)',
                cumulative:'累计获得的公益积分',
                pageNum:1,               //当前页数
                pageSize:10,             //每页返回记录条数
                hasNext:false,          //下一页
                isLoading:false,        //正在加载中
                titles:'公益积分是什么？',
                tit:'公益积分获取渠道有哪些？',
                tits:'公益积分如何使用？',
                integrals:{},
                IntegralLog:{
                    result:[]
                },
                shadowShow:false,        //蒙版层显示
            }
        },
        methods:{
            Integral(){//积分接口
                var url = "/user-center/points/userDetail";
                    return this.getWithToken(url).then((res)=>{
                    if(res && res.code == 200){
                        // console.log('请求成功',res.content)
                        this.integrals=res.content
                    }
                })
            },
            Integrals(){//积分日志接口
                this.isLoading = true;
                var url = "/user-center/points/list";
                    return this.getWithToken(url,{pageNum:this.pageNum,pageSize:this.pageSize}).then((res)=>{
                    if(res && res.code == 200){
                        // console.log('请求成功2',res.content)
                        this.IntegralLog.result=this.IntegralLog.result.concat(res.content.result)

                        this.hasNext  = res.content.result.length > 0 ? true :false;
                        // console.log(this.hasNext,2222)
                        this.pageNum++
                        this.isLoading = false;
                    }else{
                        this.$toast(res.message)
                        this.isLoading = false;
                    }
                })
            },
            slideHide(){
                this.shadowShow = false;
                //...
            },
            slideShow(){
                this.shadowShow = true;
            }
        },
        watch:{},
        computed:{},
        filters:{},
        created(){
            this.Integral(),
            this.Integrals(),
            this.$scroll(()=>{
                if (this.hasNext) {
                    if (!this.isLoading) {
                        this.Integrals();
                    }else{
                        console.log("请求中..骚等")
                    }
                }else{
                    console.log('没有下一页，不请求')
                }
            })
        },
        mounted(){
            this.appNotify({callback:'mineRefresh'})
            this.$header.setTitle("公益积分")
            this.$loading.show= false;
            this.$header.show = false;
        }
    }
</script>

<style scoped lang="scss">
@import "../../../static/css/g-global.scss";
.main{
    position:relative;
}
.tops{
    width:100%;
    height:0.88rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    overflow:hidden;
    background-image: url(../../../static/images/PublicIntegral/Group3.png);
    background-size:7.5rem 100%;
    background-repeat:no-repeat;
    
}
.title{
    width:100%;
    height:3.38rem;
    background-image: url(../../../static/images/PublicIntegral/Group.png);
    background-size:7.5rem 100%;
    background-repeat:no-repeat;
}
.position{
    width:100%;
    background-image: url(../../../static/images/PublicIntegral/mask.png);
    background-size:7.5rem 100%;
    background-repeat:no-repeat;
    .parameters{
        width:4.77rem;
        text-align:center;
        margin:0 auto;
        padding-top:0.5rem;


    }
}
.IntegralList{
    overflow-y:auto;
    ul{
        li{
            hieght:1.67rem;
            overflow:hidden;
            padding:0 0.3rem;
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:0.85rem;
        }
    }
}
.slideTop-enter-active, .slideTop-leave-active {
    transition:all 0.5s ease-in-out;
    transform:translate(0,0);
    opacity:1;
}
.slideTop-enter, .slideTop-leave-to{
    opacity:0.2;
    transform:translate(0,7.9rem);
}
.tips{
    width:100%;
    li{
        .titles{
            font-size:0.28rem;
            line-height:1rem;
            img{
                width:0.22rem;
                height:0.2rem;
                margin-right:0.14rem;
            }
        }
        .main{
            padding:0 0.3rem;
            overflow:hidden;
            p{
                margin-top:0.2rem;
            }
        }
    }
}
.Reduction{
    font-size:0.3rem;
    color:#FF6533;
}
.add{
    font-size:0.3rem;
    color:#4B4B4B;
}
.sToTop-box-close{
    position: absolute;
    right: 0.14rem;
    top: 0.15rem;
    width: 0.54rem;
    height: 0.54rem;
    padding:0.2rem;
    background: url(/static/images/applyRefund/close.png) center center/0.44rem 0.44rem no-repeat;
    z-index: 3;
}
.footer{
    text-align: center;
    background: rgba(250, 250, 250, 1);
    width: 100%;
    height: 1.1rem;
    font-size: 0.24rem;
    font-weight: 300;
    color: rgba(227, 227, 227, 1);
}
</style>