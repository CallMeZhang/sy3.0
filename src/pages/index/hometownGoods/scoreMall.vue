<template>
    <section v-title="title" class="container">
        <div style="padding-top:0.3rem">
            <focusList :data="a" @fatherGo="go"></focusList>
        </div>
        <spQualityGoods :data="b" :from="'score'" @fatherGo="go"></spQualityGoods>
        <!--<component :is="i" :data="content[i]" v-for="i in content.moduleIdx" @fatherGo="go" :key="i"></component>-->
        <section class="box bot-tip border-top-1px">
            © 17shuanyuan.com
        </section>
    </section>
</template>

<script type="text/ecmascript-6">
    import focusList from './focus.vue'                         //首焦
    import spQualityGoods from './countyYoupin.vue'             //县域优品
    export default{
        data(){
            return {
                title:"积分商城",
                viewType:this.$route.query.viewType,
                unionCode:this.$route.query.unionCode,
                a:[],
                b:{}
            }
        },
        methods:{
            getIndexData(){
                var url = "/layout-center/layoutOpen/syShopIndex";
                this.post(url,{viewType:this.viewType,unionCode:this.unionCode}).then(res=>{
                    this.$loading.show=false
                    if (res && res.code == 200) {
                        this.a = res.content.focusList;
                        this.b = res.content.recommendRealGoods;
                    }else{
                        this.$toast(res.message)
                    }
                })
            },
            go(id,url,type){    //1是商品,2是固定链接
                console.log(arguments);
                if (type == 1) {
                    this.appOpen('goodsDetail',{goodsId:id})
                }else if(type == 2){
                    url = encodeURIComponent(url);
                    this.appOpen('webOutside',{url:url});
                }else{
                    this.$toast('缺乏的跳转类型')
                }
            },
        },
        watch:{},
        computed:{},
        filters:{},
        created(){
            this.getIndexData();
        },
        mounted(){
            setTimeout(()=>{
                this.$header.setTitle(this.title)
            },0);
        },
        components:{
            focusList,
            spQualityGoods,
        },
    }
</script>

<style scoped lang="scss">
    @import "main.scss";
</style>