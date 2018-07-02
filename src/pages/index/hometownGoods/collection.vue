<template>
    <div class="box collection border-bottom-1px">
        <div class="item" v-for="(item,index) in data"
             :style="'background-image:url(' + item.image + ossUrl('webp_120') + ')'" @click="fatherGo(item.linkId,item.linkUrl,2)">{{item.title}}</div>
        <!--<div class="item item2">单位集中采购</div>-->
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
            go(url){
                this.appOpen(url,{},true);
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