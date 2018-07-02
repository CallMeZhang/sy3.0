<template>
    <section class="indexTitle iphone10-paddingTop">
        <div class="top" id="indexTitleBarTop">
            <aside :class="{'top-img':true,marginreser3:isAndroid}" v-if="img">
                <img :src="img">
            </aside>
            <div class="top-p">{{text}}</div>
        </div>
        <div class="hei">
            <div :class="{bot:true,'iphone10-paddingTop':fixed,fixed:fixed,'marginreser3-1':isAndroid}">
                <ul class="bot-lis" v-if="type == 1">
                    <li class="item sign" @click="sign">签到送礼</li>
                    <li class="item honor" @click="appOpen('unionRank')">扶贫光荣榜</li>
                    <li class="item search" @click="appOpen('search')">搜索特产</li>
                </ul>

                <!--测试-->
                <!--<ul class="bot-lis" v-else-if="type == 2">-->
                    <!--<li class="item buy" @click="appOpen('letterDetails',{where:'article',noticeId:'893b548b01904d4bb00f9f4440177086'})">公益购买</li>-->
                    <!--<li class="item help" @click="appOpen('letterDetails',{where:'article',noticeId:'2244189c068a4728a9e21a4dfbf263a9'})">帮扶无忧</li>-->
                    <!--<li class="item search" @click="appOpen('search')">搜索特产</li>-->
                <!--</ul>-->
                <!--<ul class="bot-lis" v-else-if="type == 3">-->
                    <!--<li class="item call" @click="jsCallPhone('4006667308')">电话咨询</li>-->
                    <!--<li class="item catalog" @click="appOpen('catalogLists',{catalogId:'ef5cf770cd9d41a2ad9539eb0fa04ffa'})">产品目录</li>-->
                <!--</ul>-->
                <!--测试end-->

                <!--仿真-->
                <ul class="bot-lis" v-else-if="type == 2">
                    <li class="item buy" @click="appOpen('letterDetails',{where:'article',noticeId:'6f53ec303bb04025a6b0f4f67feec1ee'})">公益购买</li>
                    <li class="item help" @click="appOpen('letterDetails',{where:'article',noticeId:'2244189c068a4728a9e21a4dfbf263a9'})">帮扶无忧</li>
                    <li class="item search" @click="appOpen('search')">搜索特产</li>
                </ul>
                <ul class="bot-lis" v-else-if="type == 3">
                    <li class="item call" @click="jsCallPhone('4006667308')">电话咨询</li>
                    <li class="item catalog" @click="appOpen('catalogLists',{catalogId:'ef5cf770cd9d41a2ad9539eb0fa04ffa'})">产品目录</li>
                </ul>
                <!--仿真end-->


            </div>

        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import ua from '@/modules/_ua/browserUa';
    function scrollTop(n) {                //获取滚动条距顶部距离(不填参数)，填参数为滚动到某个位置
        if (n || n == 0) {
            window.scrollTo(0,n)
            return;
        }else{
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        }
    };
    function getTargetToDocTop(node){     //获取元素距离文档顶部的距离
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while(parent != null) {
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return top;
    };
    export default{
        props:['type','text','img'],
        data(){
            return {
                fixed:false
            }
        },
        methods:{
            sign(){
                this.$emit("signOnApp");
            },
            openNativePage(){

            },

        },
        watch:{},
        computed:{
            isAndroid(){
                return ua().isAndroid;
            }
        },
        filters:{},
        created(){

        },
        mounted(){
            window.addEventListener("scroll",(e)=>{
//                console.log(234)
//                this.fixed = true;
                var windowScrollTop = scrollTop();
                var titleBarHeight = document.querySelector('#indexTitleBarTop').offsetHeight;
//                console.log(windowScrollTop,titleBarHeight)
                if ( windowScrollTop > titleBarHeight ) {
                    this.fixed = true;
                }else{
                    this.fixed = false;
                }
            })
        },
    }
</script>

<style scoped lang="scss">
    $fa:PingFang SC, SF-UI Display, Source Han Sans, Roboto;
    .indexTitle{
        min-height:2rem;
        font-family:$fa;
    }
    .top{
        display:flex;
        align-items:center;
        font:bold 0.48rem/0.68rem $fa;
        color:#2E2E2E;
        padding:0.72rem 0.3rem 0;
        position:relative;
        z-index:9;
    }
    .top-p{
    }
    .top-img{
        width:0.6rem;
        height:0.6rem;
        img{
            width:100%;
            height:100%;
        }
    }
    .top-img + .top-p{
        padding-left:0.2rem;
    }
    .bot{
        height:1.04rem;
        padding:0 0.3rem;
        width:6.9rem;
        background-color:#fff;
        z-index:10;
    }
    .bot-fixed{
        position: fixed;
        left: 0;
        /* top: 0.88rem; */
        /*padding-top: 20px;*/
        top: 0.88rem;
        z-index: 19;
        box-shadow: 0 0.06rem 0.06rem rgba(0, 0, 0, 0.1);
    }
    .item{
        font:700 0.3rem/1.04rem $fa;
        color:#4B4B4B;
        height:100%;
        display:flex;
        align-items:center;
        flex:0 0 auto;
    }
    .item + .item{
        margin-left:0.3rem;
    }
    .item:before{
        content:"";
        width:0.44rem;
        margin-right:0.06rem;
        height:0.44rem;
        flex:0 0 auto;
        /*background-color:red;*/
        background:transparent url(/static/images/index/sign.png?1233) center center/contain no-repeat;
    }
    .marginreser3{
        margin-top:-3px;
    }
    .marginreser3-1 .item:before{
        margin-top:-3px;
    }
    .bot-lis{
        display:flex;
        align-items:center;
        height:100%;
    }
    .sign:before{
        background-image:url(/static/images/index/sign.png?1233);
    }
    .honor:before{
        background-image:url(/static/images/index/honor.png?1233);
    }
    .search:before{
        background-image:url(/static/images/index/search.png?1233);
    }
    .buy:before{
        background-image:url(/static/images/index/buy.png?1233);
    }
    .help:before{
        background-image:url(/static/images/index/help.png?1233);
    }
    .call:before{
        background-image:url(/static/images/index/call.png?1233);
    }
    .catalog:before{
        background-image:url(/static/images/index/catalog.png?1233);
    }
    .fixed{
        left:0;
        top:0;
        box-shadow: 0 0.06rem 0.06rem rgba(0,0,0,.2);
    }
    .hei{
        height: 1.04rem;
    }
</style>