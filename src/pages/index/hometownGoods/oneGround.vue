<template>
    <div class="box oneGround">
        <div class="title font-h1">{{data.name}}</div>
        <ul class="f-group border-bottom-1px">
            <li class="f-li" v-for="(item,index) in data.areaGoodsList"> <!--v-if="item.goodsList.length"-->
                <div class="area">
                    <div class="shengxian">
                        <span class="sub-area">
                            <span>{{item.province}}</span><!--
                            <span v-if="item.city">&nbsp;·&nbsp;{{item.city}}</span>
                         --><span v-if="item.county">&nbsp;·&nbsp;{{item.county}}</span>
                        </span>
                        <span class="area-tip" v-if="item.poorCountyType">（贫困县）</span>
                    </div>
                    <span class="more" @click="appOpen('unionDetail',{areaId:item.countyId})"></span>
                </div>
                <ul class="s-group">
                    <li class="one" v-for="(ite,ind) in item.goodsList" @click="appOpen('goodsDetail',{goodsId:ite.goodsId})" v-if="ind<3">
                        <aside class="pic"><!--buhuozhong goumai v-lazy="ite.goodsImage" v-img-cover="ite.goodsImage" -->
                            <img v-lazy="ite.goodsImage + ossUrl('webp_240')" v-img-cover="ite.goodsImage + ossUrl('webp_240')">
                        </aside>
                        <div class="info">
                            <h3 class="h3 no-enter">{{ite.goodsName}}</h3>
                            <!--<p class="p">已售????斤</p>-->
                        </div>
                    </li>
                </ul>
                <input type="text" placeholder="">
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:['data'],
        data(){
            return {
                title:""
            }
        },
        methods:{
            go(id){
                this.$toast('贫困户ID：' + id);
            }
        },
        watch:{},
        computed:{},
        filters:{},
        created(){
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
    @import "main.scss";
</style>
