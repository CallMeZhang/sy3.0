<template>
    <section v-title="title">
        <header-search :key-word="keyWord"></header-search>
        <nav class="container_nav">
            <ul class="border-bottom-1px iphone10-paddingTop">
                <li :class="{active:sortType == 0}" @click.prevent.stop="changeChooseType(0)">最新发布</li>
                <li :class="{active:sortType == 3}" @click.prevent.stop="changeChooseType(3)">最多浏览</li>
                <li :class="{active:sortType == 1}" @click.prevent.stop="changeChooseType(1)">最多收藏</li>
                <li :class="{active:sortType == 50 || sortType == 51}" @click.prevent.stop="changeChooseType(50)">
                    <span>最多分享</span>
                    <span :class="{sort_price:true,up:sortType == '50',down:sortType == '51'}"></span>
                </li>
            </ul>
        </nav>
        <div>
            <div class="list" v-for="i in 3">
                <div class="border-bottom-1px det">
                    <div class="clearfix">
                        <div class="fl " :class="{'det-fl':true}">
                            <p class="title font32 " :class="{'no-enter2':true}">10亩茶山2300棵茶树只得3斤好茶,让茶汤给你最好的反馈。</p>
                            <p class="introduce font26" :class="{'no-enter':true}">中央企业全面深化改革委员会第一次会议，审议通过了一大批文件！</p>
                        </div>
                        <div class="fr fr-img" v-show="true">
                            <img :src="imgUrl+'/common/pays.png'" alt="img">
                        </div>
                    </div>
                    <div class="clearfix bottom">
                        <p class="time fl font24">2018.08.08</p>
                        <p class="fr font24">
                            <span class="num">345</span>
                            <span class="look">浏览</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="list" v-for="i in 3">
                <div class="border-bottom-1px det">
                    <div class="clearfix">
                        <div class="fl " :class="{'det-fl':false}">
                            <p class="title font32 " :class="{'no-enter2':false}">10亩茶山2300棵茶树只得3斤好茶,让茶汤给你最好的反馈。</p>
                            <p class="introduce font26" :class="{'no-enter':false}">中央企业全面深化改革委员会第一次会议，审议通过了一大批文件！</p>
                        </div>
                        <div class="fr fr-img" v-show="false">
                            <img :src="imgUrl+'/common/pays.png'" alt="img">
                        </div>
                    </div>
                    <div class="clearfix bottom">
                        <p class="time fl font24">2018.08.08</p>
                        <p class="fr font24">
                            <span class="num">345</span>
                            <span class="look">浏览</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import headerSearch from "@/components/common/header_search.vue"
    export default{
        data(){
            return {
                title:"在店铺中搜索",
                keyWord:this.$route.query.storeId || 'ba55137d10674409a671d5efb56142fe',
                sortType:0,             //????
                pageNo:1,               //当前分页
                isLoading:false,        //正在加载中
                paging:{                //分页对象
                    "hasNext": true,
                    "allCount": 17,
                    "list": [
                        {
                            "name":"助理人姓名",
                            "goodsNum":2,
                            "countyId":111111,
                            "countyName":"旬邑县",
                            "promotePoorNum":100,
                            "saleAmount":"11123.98"
                        },
                        {
                            "name":"助理人姓名",
                            "goodsNum":2,
                            "countyId":111111,
                            "countyName":"旬邑县",
                            "promotePoorNum":100,
                            "saleAmount":"11123.98"
                        },
                        {
                            "name":"助理人姓名",
                            "goodsNum":2,
                            "countyId":111111,
                            "countyName":"旬邑县",
                            "promotePoorNum":100,
                            "saleAmount":"11123.98"
                        }
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
                console.log(333)
                this.isLoading = true;
                let url = "/store-center/storeOpen/storeStatsList";
                let obj = {
                    token:"token",
                    query:this.keyWord,
                    sortType:this.sortType,
                    catalogId:this.catalogId,
                    pageNo:this.pageNo,
                }
                this.post(url,{page:111}).then((res)=>{
                    if (res && res.code == 200) {
                        console.log('请求成功',res.content);
                        // if (this.pageNo == 1) {
                        //     this.paging.list = res.data.list;
                        // }else{
                        //     this.paging.list = this.paging.list.concat(res.data.list);
                        // }
                        // this.paging.hasNext  = res.data.hasNext;
                        // this.pageNo++;
                        // this.isLoading = false;
                    }else{
                        this.$toast(res.message)
                    }
                },err =>{
                    this.isLoading = false;
                })
            }
        },
        watch:{
            sortType(val,oV){
                this.pageNo = 1;
                window.scrollTo(0,0);
            //    this.getGoodsList();
            }
        },
        computed:{},
        created(){
            console.log(111111)
           this.getGoodsList();
           console.log(222)
//            this.$scroll(()=>{
//                if (this.goods.hasNext) {
//                    if (!this.isLoading) {
//                        this.getGoodsList();
//                    }else{
//                        console.log("请求中..骚等")
//                    }
//                }else{
//                    console.log('没有下一页，不请求')
//                }
//            })
        },
        mounted(){
            setTimeout(()=>{
                this.$header.show = false;
            },0)
        },
        filters:{
            count999(val){
                if (parseInt(val) > 999 ) {
                    return "999+"
                }else{
                    return val;
                }
            }
        },
        components:{
            "header-search":headerSearch
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../static/css/g-global.scss";
    img{
        width:100%;
        height:100%;
    }
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
    .more{
        width: 0.44rem;
        height: 0.44rem;
        flex:0 0 auto;
        background: url(/static/images/goods/toRight@2x.png) center center/cover no-repeat;
    }

    /*list样式*/
    /*列表*/
    .list {
        padding:0 .3rem;
    }
    .det {
        padding:.35rem 0;
    }
    .det-fl {
        width:4rem;
    }
    .fr-img {
        width:2.7rem;
        height:1.89rem;
        background: #e3e3e3;
    }
    img {
        width:100%;
        height:100%;
    }
    .title {
        color:rgba(46,46,46,1);
        line-height:0.45rem;
        font-weight: 700;
    }
    .introduce {
        color:rgba(75,75,75,1);
        line-height:0.38rem;
        padding-top:.13rem;
    }
    .bottom {
        padding-top:.26rem;
    }
    .time {
        color:rgba(148,148,148,1);
        line-height:0.33rem;
        background: url('/static/images/common/warn.png') left center/ .26rem .26rem no-repeat;
        padding-left:.3rem;
    }
    .num, .look{
        color:rgba(148,148,148,1);
        line-height:0.33rem;
    }
    .num {
        font-weight: 500;
    }
    .look {
        font-weight: 300;
    }

</style>
