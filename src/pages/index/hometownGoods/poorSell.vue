<template>
    <div class="box poorSell" v-if="data">
        <div class="title font-h1">{{data.name}}</div>
        <ul class="group border-bottom-1px">
            <li class="li" v-for="(item,index) in data.content" v-if="index<3" @click="fatherGo(item.linkId,item.linkUrl,2)">
                <aside class="pic">
                    <img v-lazy="item.image + ossUrl('webp_240')" v-img-cover="item.poorvatar + ossUrl('webp_240')">
                </aside>
                <!--<article class="article">-->
                    <!--<h3 class="name no-enter">{{item.poorName}}</h3>-->
                    <!--<p class="p no-enter">{{item.onlineGoodsCount}}件商品在售</p>-->
                <!--</article>-->
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
//                this.$toast('贫困户ID：' + id);
                this.appOpen('poverty',{storeId:id})
//                if(this.orderData.orderType== 10){
//                    // 跳转助理人
//                    this.appOpen('assistant',{storeId:this.orderData.storeId})
//                }else if(this.orderData.orderType== 12){
//                    // 跳转贫困户
//                    this.appOpen('poverty',{storeId:this.orderData.storeId})
//                }else if(this.orderData.orderType== 20){
//                    // 跳转善企
//                    this.appOpen('company',{storeId:this.orderData.storeId})
//                }
            },
            fatherGo(id,url,type){
                this.$emit('fatherGo',id,url,type);
            }
        },
        watch:{},
        computed:{},
        filters:{},
        created(){
        },
        mounted(){
//            console.log(this.data)
        }
    }
</script>

<style scoped lang="scss">
    @import "main.scss";
</style>