<template>
    <div class="container g-goods" v-title="title">
        <header-search :key-word="''" needDefault="1"></header-search>
        <nav class="container_nav">
            <ul class="border-bottom-1px iphone10-paddingTop">
                <li :class="{active:sortType == 0}" @click.prevent.stop="changeChooseType(0)">最佳口碑</li>
                <li :class="{active:sortType == 3}" @click.prevent.stop="changeChooseType(3)">最多销量</li>
                <li :class="{active:sortType == 1}" @click.prevent.stop="changeChooseType(1)">新品优选</li>
                <li :class="{active:sortType == 50 || sortType == 51}" @click.prevent.stop="changeChooseType(50)">
                    <span>产品价格</span>
                    <span :class="{sort_price:true,up:sortType == '50',down:sortType == '51'}"></span>
                </li>
            </ul>
        </nav>
        <section class="container_mid" v-if="goods.list.length != 0">
            <aside class="ad_img" v-if="goods.list[0].adImgUrl">
                <a :href="goods.list[0].adActionUrl">
                    <img v-lazy="goods.list[0].adImgUrl + ossUrl('webp_240')">
                </a>
            </aside>
            <section class="goods_lists border-bottom-1px">
                <ul>
                    <li class="list_item border-bottom-1px"
                        v-for="(item,index) in goods.list"
                        :key="item.goodsId"
                        @click="appOpenMode('goodsDetail',{goodsId:item.goodsId},1)">
                        <section class="item_top">
                            <aside :class="{le_box:true,youpin:item.isQuality}">
                                <img v-lazy="item.imgUrl + ossUrl('webp_240')" :alt="item.goodsName">
                            </aside>
                            <article class="ri_box">
                                <h3 :class="{h3:true,'no-enter2':true,yushou:item.isPresell}">
                                    <!--{{item.goodsName | cutTwoLine}}-->
                                    {{item.goodsName}}
                                </h3>
                                <h5 class="h5">
                                    {{item.isMallGoods      ? "善源甄选&nbsp;" : ""}}
                                    {{item.isPoorSelfGoods  ? "贫困户自营" : ""}}
                                </h5>
                                <div :class="{p:true,fupinma:item.isCanUseCode}" v-if="!parseInt(item.points)">
                                    <span class="red">￥{{item.price}}</span>
                                </div>
                                <div :class="{p:true,fupinma:item.isCanUseCode}" v-else>
                                    <span class="red">{{item.points}}</span>
                                    <span>积分</span>
                                    <span v-if="parseFloat(item.price)">
                                        <span>&nbsp;+</span>
                                        <span class="red">&nbsp;{{item.price}}</span>
                                        <span>元</span>
                                    </span>
                                </div>
                            </article>
                        </section>
                        <aside class="item_bot" v-if="item.isFromMall">
                            <div>来自积分商城</div>
                            <div>
                                <span>{{item.helpCount | count999}} 人帮扶</span><!--
                             --><span v-if="parseInt(item.applauseRate)">丨{{item.applauseRate}} 好评</span>
                            </div>
                        </aside>
                        <aside class="item_bot" v-else>
                            <div v-if="item.isPoorCounty">贫困县 丨</div>
                            <div :class="{local:true,visHide:!item.countyStr}">
                                <span class="text">{{item.countyStr}}</span>
                            </div>
                            <div>
                                <span>{{item.helpCount | count999}} 人帮扶</span><!--
                             --><span v-if="parseFloat(item.applauseRate)">丨{{item.applauseRate}} 好评</span>
                            </div>
                        </aside>
                    </li>
                </ul>
            </section>
            <aside class="no_more" v-if="!goods.hasNext">没有更多产品了</aside>
            <aside class="no_more" v-if="isLoading">加载中</aside>
        </section>
        <section class="container_mid" v-else>
            <div class="fixmid">
                <aside class="empty_icon"></aside>
                <p class="empty_text">没有找到符合条件的产品 <br> 请更换筛选条件</p>
                <!--<p class="empty_text">服务器失联</p>-->
                <!--<div class="reload">点此重试</div>-->
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import headerSearch from "@/components/common/header_search.vue"
    export default{
        data(){
            return{
                title:"商品列表-活动",
                catalogId:this.$route.query.catalogId,      //目录ID
                keyWord:this.$route.query.keyWord,          //关键词
                sortType:0,     //排序方式  0:"综合排序",1:"新品优先",2:"最多评价",3:"最多销量",50:"价格升序",51:"价格降序"
                pageNo:1,       //当前分页


                isLoading:false,    //正在加载中

                goods:{
                    "hasNext": true,
                    "allCount": 17,
                    "list": [
//                        {
//                            "imgUrl": "https://gdp.alicdn.com/imgextra/i1/3580384160/TB2WasHiDlYBeNjSszcXXbwhFXa_!!3580384160.jpg",
//                            "goodsName": "苹果富士康",
//                            "points": null,
//                            "price": "40.00",
//                            "spec": "袋",
//                            "isQuality": false,
//                            "countyStr": "山西 咸阳 淳化11",
//                            "isPoorCounty": true,
//                            "isCanUseCode": true,
//                            "isPoorSelfGoods": false,
//                            "isMallGoods": true,
//                            "goodsType": 3,
//                            "applauseRate": "0%",
//                            "helpCount": "0",
//                            "goodsId": "22221AAG",
//                            "isPresell": true,
//                            "isFromMall": false,
//                            "adImgUrl": null,
//                            "adActionUrl": null
//                        }
                    ]
                }

            }
        },
        methods:{
            changeChooseType(type){
                this.sortType = type == 50 ?
                        this.sortType == 50 ?  51 : 50
                        : type;
            },
            getGoodsList(){
                this.isLoading = true;
                let url = "/ebgoods/search/catalogs/list";
                let obj = {
                    query:this.keyWord,
                    sortType:this.sortType,
                    catalogId:this.catalogId,
                    pageNo:this.pageNo,
                }
                this.getWithToken(url,obj).then((res)=>{
                  this.$loading.show=false
                    if (res.code == 200) {
                        console.log('请求成功',res.data);
                        if (this.pageNo == 1) {
                            this.goods.list = res.data.list;
                        }else{
                            this.goods.list = this.goods.list.concat(res.data.list);
                        }
                        this.goods.hasNext  = res.data.hasNext;
                        this.pageNo++;
                        this.isLoading = false;
                    }else{
                        this.$toast(res.message)
                    }
                },err =>{
                    this.isLoading = false;
                })
            }
        },
        mounted(){
            this.$header.show = false;
        },
        created(){
            this.getGoodsList();
            this.$scroll(()=>{
                if (this.goods.hasNext) {
                    if (!this.isLoading) {
                        this.getGoodsList();
                    }else{
                        console.log("请求中..骚等")
                    }
                }else{
                    console.log('没有下一页，不请求')
                }
            })
        },
        watch:{
            sortType(val,oV){
                this.pageNo = 1;
                window.scrollTo(0,0);
                this.getGoodsList();
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
            cutTwoLine(str){
                var len = 0;
                for (var i=0; i<str.length; i++) {
                    if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
                        len += 2;
                    } else {
                        len++;
                    }
                }
                var str1 = str;
                if ( len > 44 ) {
                    console.log(len);;
                    str1 = str.substring(0,22) + "…";
                }
                return str1;
            }
        },
        components:{
            "header-search":headerSearch
        }
    }
</script>
<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    /*.container{*/
        /*width:100%;*/
        /*height:100%;*/
        /*font-family: $fa;*/
        /*overflow:hidden;*/
        /*display:-webkit-flex;*/
        /*display:flex;*/
        /*-webkit-flex-direction:column;*/
        /*flex-direction:column;*/
        /*color:#4b4b4b;*/
    /*}*/
    /*.container_mid{*/
        /*-webkit-flex-grow:2;*/
        /*flex-grow:2;*/
        /*overflow:auto;*/
        /*-webkit-overflow-scrolling: touch;*/
        /*!*display:-webkit-flex;*!*/
        /*!*display:flex;*!*/
    /*}*/
    .container_nav{
        height:0.9rem;
        min-height:0.9rem;
    }
    .container_nav ul{
        position:fixed;
        top:43px;
        left:0;
        z-index:98;
        width:6.9rem;
        /*box-sizing:border-box;*/
        height:0.9rem;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:0 0.3rem 0;
        background-color:#fff;
        /*border-bottom: 1px solid #E3E3E3;*/
    }
    .container_nav ul li{
        font:300 0.3rem/0.9rem $fa;
        color:#2E2E2E;
        display:flex;
        align-items:center;
    }
    .container_nav ul li.active{
        color:#FF1919;
        font:0.3rem/0.9rem $fa;
    }
    .sort_price{
        width:0.14rem;
        height:0.2rem;
        background:url(/static/images/goods/price_sort_group@2x.png) 0 0/0.5rem 0.2rem no-repeat;
        margin-left:0.1rem;
    }
    .active .sort_price{
        background-position:-0.185rem 0;
    }
    .sort_price.down{
        background-position:-0.37rem 0;
    }
    .ad_img{
        width:6.9rem;
        height:2rem;
        margin:0.3rem auto 0;
    }
    .ad_img img{
        width:100%;
        height:100%;
    }

    /*无信息和错误样式*/
    .fixmid{
        position:absolute;
        left:50%;
        top:45%;
        transform:translate(-50%,-40%);
        text-align:center;
    }
    .reload{
        color:#FF1919;
        display:inline-block;
        font:0.28rem/0.3rem $fa;
        border-bottom:1px solid #FF1919;
        padding-top:0.2rem;
    }
    /*.empty_icon{*/
        /*background:violet;*/
        /*width:4.24rem;*/
        /*height:3.02rem;*/
        /*margin-bottom:0.33rem;*/
    /*}*/
    .empty_text{
        font:0.28rem/1.5 $fa;
        text-align:center;
        color:#909090;
    }
    .visHide{
        visibility:hidden;
    }
    /*.yushou:before{*/
        /*content:"预售丨";*/
        /*color:#FF1919;*/
    /*}*/

</style>
