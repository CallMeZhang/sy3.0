<template>
    <section v-title="title">
        <div class="radio-wrap" style='overflow:hidden'>
            <div>
                <div style='width:100%;height:1.7rem;position:fixed; background:#fff;z-index:10'>
                    <div class='mains'>
                        <div class="radio-group" v-model="tabView">
                        <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}" @click="iscur=index,tabChange('select' + (index + 1))">{{tab.name}}</span>  
                    </div>
                    <div class='title'>
                        <p class='nav'>适用于带有&nbsp<span class='logo'>&nbsp扶贫码可用</span>&nbsp标识的商品&nbsp&nbsp<span @click='slideShow()' style='color:#007AFF;text-decoration:underline'>了解详情</span></p>
                    </div>
                </div>
            </div>
             </div>
            <keep-alive>
                <component v-bind:is="tabView"></component>
            </keep-alive>
        </div>
        <transition name="fade2">
            <aside class="shadow" v-show="shadowShow" @click="slideHide">
            </aside>
        </transition>
        <transition>
                <section v-show="shadowShow">
                    <div class='bounced'>
                        <h1>扶贫码使用说明</h1>
                        <div style='padding:0.3rem;height:5rem;overflow:auto' @scroll.stop.prevent>
                            <p class='tit'style='margin-top:-0.2rem;'>一、如何绑定扶贫码？</p>
                            <p><span class='secs'>您可以点击“我的-扶贫码（在顶部）-加号（在右上角）”来进行绑定，输入扶贫码时不区分大小写。</span></p>
                            <p class='tit'>二、如何使用扶贫码？</p>
                            <p><span class='secs'>点击已绑定扶贫码下方的“去使用”进入商品列表，该列表下所有商品都支持扶贫码支付，消费多少扣减多少，剩余部分可继续使用，金额不足可微信、支付宝支付差额。 <a v-show='false'class="call" style='color:RGBA(0, 122, 255, 1)' @click="jsCallPhoneFn">400-5576892</a> </span></p>
                            <p class='tit'>三、扶贫码如何退款？</p>
                            <p><span class='secs'>扶贫码订单退款与其他订单相同，退款申请受理通过后，扶贫码实时到账，退款更加方便快捷。</span></p>
                        </div>
                        <p class='bottom'  @click="slideHide"><span class='know'>我知道了</span></p>
                        <p class='gradient'></p>
                    </div>
                </section>
        </transition>
    </section>
</template>

<script type="text/ecmascript-6">
    import select1  from './select1.vue';
    import select2  from './select2.vue';
    export default{
        data(){
            return {
                title:"扶贫码",
                tabView: 'select1',
                tabs: [{name: "已激活"}, {name: "已失效"}],
                iscur: 0,
                shadowShow:false,        //蒙版层显示
            }
        },
        methods:{
            tabChange:function(tab){
                this.tabView = tab;
            },
            slideHide(){
                this.shadowShow = false;
                document.querySelector("#app").style= ""
            },
            slideShow(){
                this.shadowShow = true;
                document.querySelector("#app").style= "overflow-y:hidden;"
            },
            jsCallPhoneFn(){
                this.jsCallPhone('400-5576892')
            },
            open(){
                this.appBackTabbarIndex('5',0);
            }
        },
        watch:{},
        computed:{},
        filters:{},
        created(){

        },
        components:{
            select1,
            select2
        },
        mounted(){
            this.$header.setTitle("扶贫码")
            this.$loading.show=false
            if (this.$route.query.disableReturn == 1) {
                this.appUnBack();                       //禁掉物理返回键
                this.$header.customBehavior(this.open); //左上角返回指引前进
            }
        }
    }
</script>

<style scoped lang="scss">
@import "../../../static/css/g-global.scss";
    .radio-group{
        width:100%;
        height:0.9rem;
        line-height:0.9rem;
        font-size:0.3rem;
        color:#2E2E2E;
        border-bottom:0.005rem solid #ccc;
        background:rgba(255,255,255,1);
        display:flex;
        justify-content:space-around;
    }  
    .radio-group>span{
        cursor:pointer;
        display:inline-block;
        font-size:0.3rem;
        text-align:center;
        width:1.6rem;
        }  
    .cur{
        color:#FF1919;
        border-bottom: .05rem solid #FF1919;
        }
    .title{
        width:100%;
        .nav{
            height:0.6rem;
            margin-left:0.4rem;
            margin-top:0.18rem;
            color:#949494;
            .logo{
                display:inline-block;
                color:#FF1919;
                padding:0.01rem;
                border:1px solid #FF1919;
                border-radius:0.3rem 0 0.3rem 0.3rem;
            }
        }
    }
    .bounced{
        position:fixed;
        transform:translate(-50%,-50%);
        left:50%;
        top:50%;
        z-index: 100;
        width:6.6rem;
        height:7.81rem;
        background:#fff;
        border-radius:0.2rem;
        /*top:2.41rem;*/
        /*left:0.45rem;*/

        h1{
            font-size:0.36rem;
            color:#2E2E2E;
            line-height:1.2rem;
            font-Weight:bold;
            text-align:center;
        }
        .tit{
            font-size:0.32rem;
            font-Weight:600;
        }
        .secs{
            font-size:0.32rem;
            color:#4B4B4B;
        }
        p{
            margin-top:0.2rem;
        }
        .text{
            width:5.4rem;
            height:0.88rem;
            border:1px solid #E3E3E3;
            font-size:0.36rem;
        }
        .btn{
            width:5.4rem;
            height:0.88rem;
            background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
            border-radius:0.16rem;
            color:#fff;
            margin-top:0.7rem;
        }
        .bottom{
            width:100%;
            height:0.99rem;
            text-align:center;
            line-height:0.99rem;
            border-top:0.01rem solid #ccc;
            position:absolute;
            bottom:0;
            background:#fff;
            border-radius:0 0 0.2rem 0.2rem;
            .know{
                width:100%;
                height:0.5rem;
                font-size:0.34rem;
                font-family:PingFangSC-Regular;
                color:rgba(0,122,255,1);
                line-height:0.5rem;
            }
        }
    }
    .gradient{
        position:absolute;
        bottom:1rem;
        width:100%;
        height:0.9rem;
        background: linear-gradient(to top,rgba(255,255,255,1),rgba(255,255,255,0));
    }
</style>