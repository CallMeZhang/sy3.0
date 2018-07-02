<template>
    <nav class="box nav">
        <ul class="group">
            <li class="li" v-for="(item,index) in data" @click="fatherGo(item.linkId,item.linkUrl,2)" v-if="index<5">
                <aside class="pic">
                    <!--<img v-lazy="item.image" v-img-cover="item.image">-->
                    <img :src="item.image  + ossUrl('webp_120')">
                </aside>
                <h5 class="h5">{{item.title}}</h5>
            </li>
        </ul>
        <ul class="group">
            <li class="li" v-for="(item,index) in data" @click="fatherGo(item.linkId,item.linkUrl,2)" v-if="index>=5">
                <aside class="pic">
                    <!--<img v-lazy="item.image" v-img-cover="item.image">-->
                    <img :src="item.image + ossUrl('webp_120')">
                </aside>
                <h5 class="h5">{{item.title}}</h5>
            </li>
        </ul>
    </nav>
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