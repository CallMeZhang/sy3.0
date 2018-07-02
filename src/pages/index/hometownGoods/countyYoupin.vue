<template>
    <div class="box countyYoupin">
        <div class="title">
            <span class="font-h1" @click="ccc">{{data.name}}</span>
            <div class="link-more" @click="fatherGo('',data.moreLink,2)" v-if="!from">
                <span>{{data.moreName}}</span>
                <span class="more"></span>
            </div>
        </div>
        <ul class="list border-bottom-1px">
            <li class="double_goods_item" v-for="(item,index) in data.goodsList" @click="appOpen('goodsDetail',{goodsId:item.goodsId})">
                <aside :class="{double_item_pic:true,youpin:item.isQuality}">
                    <img v-lazy="item.goodsImage + ossUrl('webp_240')" v-img-cover="item.goodsImage + ossUrl('webp_240')">
                </aside>
                <section class="double_item_info">
                    <h3 class="h3 no-enter2">{{item.goodsName}}</h3>
                    <h4 class="local-text" :style="'opacity:' + (item.areaMap ? 1 : 0)" v-if="!from">
                        <span class="local"></span>
                        <span class="no-enter" v-if="item.areaMap">
                            {{item.poorCountyType ? "贫困县 | " : ""}}
                            <!--<span>{{item.province}}</span>&lt;!&ndash;-->
                         <!--&ndash;&gt;<span v-if="item.city">&nbsp;·&nbsp;{{item.city}}</span>&lt;!&ndash;-->
                         <!--&ndash;&gt;<span v-if="item.county">&nbsp;·&nbsp;{{item.county}}</span>-->
                            <span v-for="(i,ind) in item.areaMap" class="local-area-text">{{i.areaName}}</span>
                            <!--<span v-for="(i,ind) in item.areaMap" class="local-area-text" v-if="ind != 0 ">{{i.areaName}}</span>-->
                        </span>
                    </h4>
                    <p class="p" v-if="parseInt(item.points)">
                        <span class="large">{{item.points}}</span>
                        <span>积分</span>
                        <span v-if="parseFloat(item.goodsPrice)">
                            <span class="large">&nbsp;+&nbsp;{{item.goodsPrice | onlyKeepInt}}</span>{{item.goodsPrice | onlyKeepFloat}}元
                        </span>
                    </p>
                    <p class="p" v-else>
                        <span class="thin">¥</span>
                        <span class="large">{{item.goodsPrice | onlyKeepInt}}</span>{{item.goodsPrice | onlyKeepFloat}}
                    </p>
                </section>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:['data','from'],
        data(){
            return {
                title:""
            }
        },
        methods:{
            fatherGo(id,url,type){
                this.$emit('fatherGo',id,url,type);
            },
            ccc(){
//                this.data.goodsList[0].goodsPrice = 1.23;
//                console.log(123)
            }
        },
        watch:{},
        computed:{},
        filters:{
            onlyKeepInt(val){
                return isNaN(parseInt(val)) ? "" : parseInt(val);
            },
            onlyKeepFloat(val){
                var n = '.' + parseFloat(val).toFixed(2).toString().split(".")[1];
                return n;
            }
        },
        created(){
//            console.log(this.data)
        },
        mounted(){
        }
    }
</script>

<style scoped lang="scss">
    @import "main.scss";
    .local-area-text + .local-area-text:before{
        content:'・';
    }
</style>
