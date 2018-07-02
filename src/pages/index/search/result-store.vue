<template>
    <section v-title="title">
        <header-search :key-word="keyWord" closePage=true></header-search>
        <div v-if="paging.list.length > 0">
            <nav class="container_nav">
                <ul class="border-bottom-1px iphone10-paddingTop">
                    <li :class="{active:sortType == 'best'}" @click.prevent.stop="changeChooseType('best')">最佳口碑</li>
                    <li :class="{active:sortType == 'help'}" @click.prevent.stop="changeChooseType('help')">最需帮扶</li>
                    <li :class="{active:sortType == 'newGoods'}" @click.prevent.stop="changeChooseType('newGoods')">新品优选</li>
                    <li :class="{active:sortType == 'sale' || sortType == 'saleB'}" @click.prevent.stop="changeChooseType('sale')">
                        <span>产品销量</span>
                    </li>
                </ul>
            </nav>
            <div class="greatAssistant">
                <ul class="group">
                    <li class="li" v-for="(item,index) in paging.list" v-show="(name(item.storeType) != '善企') && (name(item.storeType) != '自营')" @click='goStore(item)'>
                        <div class="people-info">
                            <div class="header-pic">
                                <img :src="(item.storeLogo ?  item.storeLogo : imgs)+ ossUrl('thumb_240')" alt="">
                            </div>
                            <div class="text">
                                <h3 class="h3">
                                    <span class="name no-enter" v-text='name(item.storeType)'></span>
                                    <span class="name no-enter">：{{item.storeOwnerName}}</span>
                                    <span class="score" v-show='item.storeScore > 0'>{{ item.storeScore }}</span>
                                </h3>
                                <p class="p no-enter">{{item.entName}}</p>
                            </div>
                            <div class="more" @click.stop="goStore(item)"></div>   <!--？？？-->
                        </div>
                        <div class="storeInfo">
                            <div class="box">
                                <span class="a1">{{item.goodsNum}}件</span>
                                <span class="a2">{{item.storeType | boxName}}</span>
                            </div>
                            <div class="box">
                                <span class="a1">{{item.promotePoorNum}}{{ item.storeType | households}}</span>
                                <span class="a2">{{item.storeType | boxName2}}</span>
                            </div>
                            <div class="box">
                                <span class="a1">{{item.increasePoorNum}}{{ item.storeType | times}}</span>
                                <span class="a2">{{item.storeType | boxName3}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="footer" v-if="!this.hasNext">没有更多店铺了</div>
            </div>
        </div>
        <div class="container_mid is-iphone10" v-else>
            <div class="_empty border-bottom-1px">
                <aside class="empty_icon"></aside>
                <p class="empty_text">没有搜索到,换个词试试</p>
            </div>
            <recommend-goods type="search"></recommend-goods>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import headerSearch from "@/components/common/header_search.vue"
    import recommendGoods from '@/components/common/recommendGoods.vue'
    export default{
        data(){
            return {
                title:"在店铺中搜索",
                keyWord:this.$route.query.keyWord,
                imgs:"../../../../static/images/common/head-default.jpg",
                pageNo:1,               //当前分页
                pageSize:5,             //每页返回记录条数
                sortType:'',
                hasNext:false,          //下一页
                isLoading:false,        //正在加载中
                paging:{                //分页对象
                    "list": []
                }
            }
        },
        methods:{
            name(type){
                if(type==='agent'){
                    return '助理人'
                }else if(type==='poor'){
                    return '贫困户'
                }else if(type==='syshop'){
                    return '善企'
                }else{
                    return '自营'
                }
            },
            goStore(item){
              let type = item.storeType
              if(type==='agent'){
                this.appOpen('assistant',{storeId:item.storeId})
              }else if(type==='poor'){
                this.appOpen('poverty',{storeId:item.storeId})
              }else if(type==='syshop'){
                this.appOpen('company',{storeId:item.storeId})
              }else{
//                return '自营'
              }
            },
            //
            go(){
              // todo
              
            },
            changeChooseType(type){
                this.sortType = type == 'sale' ?
                        this.sortType == 'sale' ?  'saleB' : 'sale'
                        : type;
                this.pageNo = 1;
                this.getGoodsList(this.sortType);
            },
            getGoodsList(sortType){
                this.isLoading = true;
                let url = "/store-center/storeOpen/storeStatsList";
                this.post(url,{page:this.pageNo,pageSize:this.pageSize,sortType:sortType,condition:JSON.stringify({keyword:this.keyWord})}).then((res)=>{
                    if (res.code == 200) {
                        // console.log('请求成功',res.content.list);
                        if (this.pageNo == 1) {
                            this.paging.list = res.content.list;
                        }else{
                            this.paging.list = this.paging.list.concat(res.content.list);
                        }
                        this.hasNext  = res.content.list.length > 0;
                        // console.log(this.hasNext,11111)
                        this.pageNo++;
                        this.isLoading = false;
                    }else{
                        this.$toast(res.message)
                    }
                },err =>{
                    this.isLoading = false;
                })
            },
          getData(){
            this.isLoading = true;
            let url = "/ebgoods/search/catalogs/list";
            let obj = {
            }
            this.get(url,obj).then((res)=>{
              this.$loading.show=false
              if (res.code == 200) {
                // console.log('请求成功',res.data);
                if (this.pageNo == 1) {
                  this.paging.list = res.data.list;
                }else{
                  this.paging.list = this.paging.list.concat(res.data.list);
                }
                this.paging.hasNext  = res.data.hasNext;
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
        watch:{
            sortType(val,oV){
                this.pageNo = 1;
                window.scrollTo(0,0);
            }
        },
        created(){
            // console.log(typeof JSON.stringify({ket:'wwerwer'}))
                this.sortType = 'best'
                this.getGoodsList(this.sortType);
                this.$scroll(()=>{
                    if (this.hasNext) {
                        if (!this.isLoading) {
                            this.getGoodsList(this.sortType);
                        }else{
                            console.log("请求中..骚等")
                        }
                    }else{
                        console.log('没有下一页，不请求')
                    }
                })
        },
        mounted(){
          setTimeout(()=>{
              this.$header.show = false;
          },0)
        },
        filters:{
            households(type){
                var str = type == "agent" ? "户" : "元";
                return str;
            },
            times(types){
                var time = types == "agent" ? "户" : "次";
                return time;
            },
            count999(val){
                if (parseInt(val) > 999 ) {
                    return "999+"
                }else{
                    return val;
                }
            },
        boxName(v){
            return '产品数量';
        },
        boxName2(v){
            switch(v){
                case 'agent':
                return '带动贫困户';
                break;
                case 'poor':
                return '自营增收额';
                break;
                case 'syshop':
                return '回馈爱心';
                break;
                default:
            }
        },
        boxName3(v){
            switch(v){
                case 'agent':
                return '雇佣贫困户';
                break;
                case 'poor':
                return '受帮扶数';
                break;
                case 'syshop':
                return '爱心积分';
                break;
                default:
            }
        },
        },
        components:{
            "header-search":headerSearch,
            "recommendGoods":recommendGoods
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
    .greatAssistant{
        padding:0.48rem 0.3rem 0;
        .title{
            padding-bottom: 0.28rem;
        }
        .li{
            padding-bottom:0.6rem;
        }
        .li:last-child{
            padding-bottom:0.4rem;
        }
        .people-info{
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-bottom:0.28rem;
            width:100%;
            .header-pic{
                width:0.9rem;
                height:0.9rem;
                border-radius:50%;
                overflow:hidden;
                flex-shrink:0;
                background:#e3e3e3;
            }
            .text{
                width:5.56rem;
                padding-left:0.2rem;
            .h3{
                color:$c4B;
                font:bold 0.26rem/0.38rem $fa;
                padding-bottom:0.08rem;
                white-space:nowrap;
            .name{
                max-width:4.5rem;
                display:inline-block;
            }
            span{
                vertical-align:middle;
            }
        }
            .score{
                height:0.3rem;
                vertical-align:middle;
                display:inline-block;
                font:0.24rem/0.3rem $fa;
                color:#FF6533;
                border:1px solid #FF6533;
                text-align:center;
                border-radius:0.06rem;
            }
        }
    }
            .storeInfo{
                background-color:#FFF8F8;
                height:1rem;
                display:flex;
                .box{
                    flex:0 0 auto;
                    height:100%;
                    width:33.3%;

                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-direction:column;
                .a1{
                    font:300 0.26rem/0.4rem $fa;
                    color:$c4B;
                }
                .a2{
                    font:300 0.24rem/0.4rem $fa;
                    color:$c94;
                }
            }
        }
    }
.empty_text{
    font:0.28rem/1.5 "";
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
.footer{
    text-align: center;
    background: rgba(250, 250, 250, 1);
    width: 100%;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.24rem;
    font-weight: 300;
    color: rgba(227, 227, 227, 1);
}
</style>
