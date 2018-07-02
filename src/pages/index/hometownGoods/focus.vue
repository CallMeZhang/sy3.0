<template>
    <div class="box focus-box">
        <div class="focus">
            <ul class="group">
                <li :class="{li:true,youpin:true}" v-for="item in data" @click="fatherGo(item.linkId,item.linkUrl,item.linkType)">
                    <aside class="pic">
                        <img :src="item.image + ossUrl('webp_480')" v-img-cover="item.image + ossUrl('webp_480')">
                    </aside>
                    <div class="best-title font30">
                        <div class="title-con">{{item.title}}</div>
                    </div>
                    <!--<h3 class="h3 no-enter">{{item.title}}</h3>-->
                    <span class="tag font28">{{item.tag}}</span>
                </li>
            </ul>
        </div>
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
            go(id,type,url){    //url类型 1商品 2固定链接 3文章
                console.log(id,type,url);
                this.appOpen(url,{},true);
                type == 1 ? this.appOpen("goodsDetail",{goodsId:id}) :
                        type == 2 ? this.appOpen(url,{},true) : "";
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
        }
    }
</script>

<style scoped lang="scss">
    @import "main.scss";
</style>
