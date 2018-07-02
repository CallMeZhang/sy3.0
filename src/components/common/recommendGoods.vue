<template>
    <div class="double_goods" v-show="recommendGoods.length != 0">
            <div class="double_goods_title">您可能还在找：</div>
            <ul class="lists">
                <li class="double_goods_item" v-for="(item,index) in recommendGoods"
                    @click="appOpenMode('goodsDetail',{goodsId:item.goodsId},1)">
                    <aside :class="{double_item_pic:true,youpin:item.isQuality}">
                        <img :src="item.imgUrl + ossUrl('webp_240')" v-img-cover="item.imgUrl + ossUrl('webp_240')">
                    </aside>
                    <section class="double_item_info">
                        <h3 class="h3 no-enter2">{{item.goodsName}}</h3>
                        <!--<p class="p" v-if="parseInt(item.points)">-->
                            <!--<span class="large">{{item.points}}</span>积分 +&nbsp;-->
                            <!--<span class="large">{{item.price | onlyKeepInt}}</span>{{item.price | onlyKeepFloat}}元-->
                        <!--</p>-->
                        <p class="p" v-if="parseInt(item.points)">
                            <span class="large">{{item.points}}</span>
                            <span>积分</span>
                            <span v-if="parseFloat(item.goodsPrice)">
                                <span class="large">&nbsp;+&nbsp;{{item.price | onlyKeepInt}}</span>{{item.price | onlyKeepFloat}}元
                            </span>
                        </p>
                        <p class="p" v-else>
                            <span class="thin">¥</span>
                            <span class="large">{{item.price | onlyKeepInt}}</span>{{item.price | onlyKeepFloat}}
                        </p>
                    </section>
                </li>
            </ul>
        </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:['type','isShare',"speciesId"],
        data(){
            return {
                recommendGoods:[]
            }
        },
        methods:{
//            getRcommendGoods(){ //获取推荐商品列表 {type} 路径参数-->search:搜索无结果,cart:购物车,detail:详情
//                var goodsType = this.goodsType == 4 ? "?goodsType=4" : "";
//                let url = "/ebgoods/goods/" + (this.type || 'detail') + "/recommend" + goodsType;
//
//                this.get(url).then((res)=>{
////                    console.log("推荐商品返回:",res)
//                    if (res.code == 200) {
//                        this.recommendGoods = res.data.list
//                    }
//                },err=>{
//                    console.log(err)
//                })
//            }
            getRcommendGoods(){ //获取推荐商品列表 {type} 路径参数-->search:搜索无结果,cart:购物车,detail:详情
                let url = "";
                if (this.type == "detail") {
                    url = "/ebgoods/recommend/species?speciesId=" + this.speciesId;
                    if (!this.speciesId) {
                        return;
                    }
                }else if(this.type == "search"){
                    url = "/ebgoods/recommend/all";
                }
                if (this.type) {
                    this.get(url,{}).then((res)=>{
//                        console.log("推荐商品返回:",res)
                        if (res.code == 200) {
                            this.recommendGoods = res.data.goodsList
                        }
                    },err=>{
                        console.log(err)
                    })
                }
            }
        },
        created(){
            this.getRcommendGoods();
//            setInterval(()=>{
//                console.log('goodsType',this.goodsType)
//            },1000)
        },
        filters:{
            onlyKeepInt(val){
                return isNaN(parseInt(val)) ? "" : parseInt(val);
            },
            onlyKeepFloat(val){
//                var n = parseFloat(val).toString().split(".")[1];
//                return ( n ? "." + n : "");
                var n = '.' + parseFloat(val).toFixed(2).toString().split(".")[1];
                return n;
            }
        },
        watch:{
            speciesId(){
                this.getRcommendGoods();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../static/css/g-global.scss";

</style>