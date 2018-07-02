<template>
    <div class="evaluate" v-title="title">
        <div class="wrapper">
            <!--顶部-->
            <div class="top plr3">
                <div class="text-center font38" @click="ccc"><span class="font42 w-700">{{good_percent}}%</span>好评</div>
                <div class="overview clearfix color2e font26">
                    <div :class="{item:true,fl:true,active:n.type == queryType}"
                         v-for="(n,i) in tab" @click="queryType = n.type;goods.hasNext = true">
                        {{n.name + n.count}}
                    </div>
                </div>
            </div>
            <div class="border-top-1px border-bottom-1px interval"></div>
            <!--评价内容-->
            <div class="detail">
                <div class="item" v-for="(item,index) in goods.list" :id="'id' + item.geId">
                    <div class="con border-bottom-1px">
                        <div class="clearfix">
                            <div class="left fl">
                                <!--<img :src="item.mHeadImg" class="avatar">-->
                                <img :src="(item.mHeadImg || (imgUrl + '/common/head-default.jpg')) + ossUrl('thumb_120')"
                                     onerror="this.src = 'https://cdnpre-m.17shanyuan.com/static/images/common/head-default.jpg?x-oss-process=style/thumb_120'"
                                     class="avatar">
                            </div>
                            <div class="right">
                                <div class="right-top flex">
                                    <div class="name font28">{{item.mName}}</div>
                                    <div class="star">
                                        <img :src="imgUrl + '/common/star.png'" v-for="i in item.evalLevel">
                                    </div>
                                </div>
                                <div>
                                    <div class="text">{{item.evalDesc || "用户未做出评价"}}</div>
                                    <div class="evaluate-img" v-if="item.evalImgs.length">
                                        <aside v-for="ite in item.evalImgs" class="pic-box">
                                            <img :src="ite + ossUrl('webp_960')"
                                                 v-img-cover="ite + ossUrl('webp_960')"
                                                 preview="0"
                                                 :preview-text="item.evalDesc || '用户未做出评价'"
                                            >
                                        </aside>
                                        <!--<img :src="item + ossUrl('webp_240')" v-for="item in item.evalImgs">-->
                                    </div>
                                    <div class="reply color94" v-if="item.storeReply">
                                        <span class="reply-person color4b">{{item.storeName || '商家'}}回复：</span>
                                        {{item.storeReply}}
                                    </div>
                                </div>
                                <div class="bottom flex space-between spec">
                                    <div>{{item.specUnit}}</div>
                                    <div>{{item.createdAt}}</div>
                                </div>
                                <div class="block border-top-1px" v-if="item.subEvalBo">
                                    <div class="tipC" v-if="item.duringAffirmMillis">收货{{item.duringAffirmMillis | date}}天追评</div>
                                    <div class="text">{{item.subEvalBo.evalDesc || "用户未做出评价"}}</div>
                                    <div class="evaluate-img"><!--v-for="ite in item.subEvalBo.evalImgs"-->
                                        <aside v-for="ite in item.subEvalBo.evalImgs" class="pic-box">
                                            <img :src="ite + ossUrl('webp_960')"
                                                 v-img-cover="ite + ossUrl('webp_960')"
                                                 preview="0"
                                                 :preview-text="item.subEvalBo.evalDesc || '用户未做出评价'"
                                            >
                                        </aside>
                                    </div>
                                    <div class="reply color94" v-if="item.subEvalBo.storeReply">
                                        <span class="reply-person color4b">{{item.subEvalBo.storeName}}回复：</span>
                                        {{item.subEvalBo.storeReply}}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="goods.list.length">
            <!--<aside class="no_more" v-if="!goods.hasNext">@17shanyuan.com</aside>-->
            <aside class="no_more" v-if="isLoading">加载中</aside>
            <aside class="no_more" v-else>@17shanyuan.com</aside>

        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import a from '@/modules/photoPreview/index.js'
    export default {
        components: {},
        data(){
            return {
                geId:this.$route.query.geId,    //当前评价的id
                goodsId:this.$route.query.goodsId,
                title:"帮扶者说",
                active:'1',
                queryType:'all',                // all：所有 best:好评 good：中评 bad:差评 img:有图
                goods:{
                    "hasNext":true,
//                    "allCount":17,
                    "list":[]
                },
                isLoading:false,    //正在加载中
                pageNo:1,           //当前分页
                tab:[
                    {
                        type:'all',
                        name:"全部",
                        count:0,
                    },
                    {
                        type:'best',
                        name:"好评",
                        count:0,
                    },
                    {
                        type:'good',
                        name:"中评",
                        count:0,
                    },
                    {
                        type:'bad',
                        name:"差评",
                        count:0,
                    },
                    {
                        type:'img',
                        name:"晒图",
                        count:0,
                    }
                ]
            }
        },
        updated(){
            this.$nextTick(()=>{
                this.scrollToTarget();
                this.$previewRefresh();//刷新预览图片列表
            })

            setTimeout(()=>{
//                this.$previewClose();
//                options.fullscreenEl = true
//                options.close1()
            },5000)
        },
        mounted(){
            this.$header.setTitle(this.title);
        },
        methods: {
            ccc(){
//                this.scrollToTarget();
//                this.goods.list[1].duringAffirmMillis =  86400000*3
            },
            scrollToTarget(){   //滚动到geId对应的位置(只初始化执行一次)
                if (this.geId) {
                    var ele         = document.querySelector("#id" + this.geId);
                    if (ele) {
                        var headerTop   =  document.querySelector(".header-paddingTop").offsetHeight;
                        var yTop = this.getPositionTop(ele) - headerTop;//header高度
                        window.scrollTo(0,yTop);
                        this.geId = null;
                    }
                }
            },
            getTargetToDocTop(ele){
                var toTop = 0;
                while(ele.parentNode){
                    toTop += ele.offsetTop;
                    ele = ele.parentNode;
                }
                return toTop;
            },
            getPositionTop(node) {  //获取元素距离文档顶部的距离
                var top = node.offsetTop;
                var parent = node.offsetParent;
                while(parent != null) {
                    top += parent.offsetTop;
                    parent = parent.offsetParent;
                }
                return top;
            },
            getData(){
                this.isLoading = true;
                var url = "/order-center/evaluate/goodsEvalList";
                let obj = {
                    goodsId:this.goodsId,
                    queryType:this.queryType,
                    curPage:this.pageNo,
//                    pageSize:6
                }
                this.get(url,obj).then((res)=>{
                  this.$loading.show=false
                    if (res.code == 200) {
//                        console.log('请求成功',res.data);
                        if (this.pageNo == 1) {
                            this.goods.list = res.data.evaluationList;
                        }else{
                            this.goods.list = this.goods.list.concat(res.data.evaluationList);
                        }
                        if (res.data.evaluationList.length == 0) {
                            this.goods.hasNext  = false;
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
            getEvalCount(){
                var url = "/order-center/evaluate/goodsEvalCount";
                this.get(url,{goodsId:this.goodsId}).then(res=>{
                  this.$loading.show=false
                    if (res && res.code == 200) {
//                        console.log(res)
                        this.tab[0].count = res.data.goodsEvalCount.allEval;
                        this.tab[1].count = res.data.goodsEvalCount.bestEval;
                        this.tab[2].count = res.data.goodsEvalCount.goodEval;
                        this.tab[3].count = res.data.goodsEvalCount.badEval;
                        this.tab[4].count = res.data.goodsEvalCount.img;
                    }else{
                        this.$toast(res.message)
                    }
                })
            }
        },
        created(){
            this.getData();
            this.getEvalCount();
            document.body.onscroll = function(){
//                console.log('距离顶部',document.documentElement.scrollTop)
            }
            this.$scroll(()=>{
                if (this.goods.hasNext) {
                    if (!this.isLoading) {
                        this.getData();
                    }else{
                        console.log("请求中..骚等")
                    }
                }else{
                    console.log('没有下一页，不请求')
                }
            })
        },
        watch:{
            queryType(val,oV){
                this.pageNo = 1;
                this.getData();
            }
        },
        filters:{
            count999(val){
                if (parseInt(val) > 999 ) {
                    return "999+"
                }else{
                    return val;
                }
            },
            date(val){
                if (val) {
                    var a = parseInt(val)/(1000*60*60*24);
                    return a < 1 ? "当" : parseInt(a);
                }
            }
        },
        computed:{
            good_percent(){
                var number = ((this.tab[1].count/this.tab[0].count)*100).toFixed(1);
//                console.log(number)
                return (number && number != "NaN") ? number : '0.0';
            },

        }

    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .pic-box{
        height: 1.64rem;
        width: 1.64rem;
        margin-right: .1rem;
        display:inline-block;
    }
    .tipC{
        font:0.28rem/0.34rem $fa;
        padding-bottom:0.18rem;
    }
    .block .text{
        padding-bottom:0.18rem;
    }
    .block{
        padding-top:0.36rem;
        color:#4B4B4B;
    }
    .spec{
        line-height:0.33rem;
        font:300 0.24rem/0.33rem $fa;
        padding-bottom:0.25rem;
    }
    .text{
        text-align:justify;
        padding-bottom:0.21rem;
        font:300 0.28rem/0.44rem $fa;
    }
    .bottom{
        color:#949494;
        font-weight:300;
    }
    .name{
        font:0.28rem/0.34rem $fa;
    }
    .flex{
        /*align-items:center;*/
    }
    .star{
        img{
            margin-left:0.12rem;
        }
    }
    .evaluate{
        color:#2E2E2E;
    .wrapper{
    .top{
        padding-top:.3rem;
        .overview{
            padding:.3rem 0 .1rem;
            .item{
                padding:.12rem .2rem;
                border:1px solid #D0D0D0;
                border-radius:.08rem;
                margin:0 .4rem .3rem 0;
                &.active{
                     border:1px solid #FF1919;
                     color:#FF1919;
                }
            }
        }
    }
    .interval{
        height:.2rem;
        background: #FAFAFA;
    }

    .detail{
        padding-left:.3rem;
        .item{
        .con{
            padding:.4rem 0 .1rem 0;
        .left{
        .avatar{
            height:.7rem;
            width:.7rem;
            border-radius: 50%;
        }
    }
    .right{
        padding-left:1rem;
        padding-right:.3rem;
        .right-top{
            justify-content: space-between;
            padding-bottom:0.18rem;
        .star img{
            width:.28rem;
        }
    }
    .evaluate-img {
        /*padding:.2rem 0 .25rem 0;*/
        padding-bottom:0.25rem;
        font-size:0;
        img{
            height:1.64rem;
            width:1.64rem;
            /*margin-right:.1rem;*/
        }
    }
    .reply{
        background: #F0F0F0;
        padding:.14rem .2rem;
        margin-bottom:0.3rem;
        border-radius: .04rem;
        /*margin-top:.2rem;*/
    .reply-person{
        text-align:justify;
    }
    }
    }
    }
    }
    }
    }
    }

</style>
