<template>
    <div class="container" v-title="title">
        <header-search :key-word="searchCon"></header-search>
        <section class="container_mid">
            <div class="_empty border-bottom-1px">
                <aside class="empty_icon"></aside>
                <p class="empty_text">没有找到符合条件的产品 <br>请更换筛选条件{{searchCon}}</p>
            </div>
            <recommend-goods></recommend-goods>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import headerSearch from "@/components/common/header_search.vue"
    import recommendGoods from "@/components/common/recommendGoods.vue"

    export default{
        data(){
            return{
                title:"无结果",
                searchCon:"",
            }
        },

        created(){
            this.searchCon = this.$route.query.keyWord;
//            console.log(this.$route.query);
        },
        components:{
            headerSearch,
            recommendGoods
        },

    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
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
</style>