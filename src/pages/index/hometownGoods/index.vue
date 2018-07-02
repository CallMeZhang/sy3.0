<template>
    <div v-title="title" class="container">
        <indexTitleBar type="2" text="故乡特产"></indexTitleBar>
        <!--<header class="header iphone10-paddingTop">-->
        <!--<section class="container_top border-bottom-1px iphone10-paddingTop">-->
        <!--<div class="search" @click="appOpen('search',{keyWord:''})">-->
        <!--<span class="search_icon"></span>-->
        <!--<input type="search" class="search_input" :placeholder="defaultCon" readonly>-->
        <!--</div>-->
        <!--</section>-->
        <!--</header>-->

        <component :is="i" :data="content[i]" v-for="i in content.moduleIdx" @fatherGo="go" :key="i"></component>


        <!--首焦-->
        <!--<Focus :data="content.focusList" @fatherGo="go"></Focus>-->
        <!--&lt;!&ndash;导航&ndash;&gt;-->
        <!--<Nav :data="content.navigation" @fatherGo="go"></Nav>-->
        <!--&lt;!&ndash;集采入口Collection&ndash;&gt;-->
        <!--<Collection :data="content.bizNav" @fatherGo="go"></Collection>-->
        <!--&lt;!&ndash;县域优品&ndash;&gt;-->
        <!--<CountyYoupin :data="content.spQualityGoods" @fatherGo="go"></CountyYoupin>-->
        <!--&lt;!&ndash;贫困户自营&ndash;&gt;-->
        <!--<PoorSell :data="content.poorSelfSale" @fatherGo="go"></PoorSell>-->
        <!--&lt;!&ndash;一地一味&ndash;&gt;-->
        <!--<OneGround :data="content.areaGoodsModule" @fatherGo="go"></OneGround>-->
        <!--&lt;!&ndash;优秀助理人&ndash;&gt;-->
        <!--&lt;!&ndash;<GreatAssistant :data="content.recommendAgent"></GreatAssistant>&ndash;&gt;-->
        <!--<component :is="'GreatAssistant'" :data="content.recommendAgent"></component>-->

        <section class="box bot-tip border-top-1px">
            © 17shuanyuan.com
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import focusList from './focus.vue'                         //首焦
    import navigation from './nav.vue'                          //导航
    import bizNav from './collection.vue'                       //集采入口
    import spQualityGoods from './countyYoupin.vue'             //县域优品
    import poorSelfSale from './poorSell.vue'                   //贫困户自营
    import areaGoodsModule from './oneGround.vue'               //一味一地
    import recommendAgent from './greatAssistant.vue'           //优秀助理人

    import indexTitleBar from '@/components/common/indexTitleBar.vue'           //顶栏

    //    import focus from 'focus.vue'
    export default{
        data(){
            return {
                title:"故乡特产",
                defaultCon:"",
                goodsList:[],
                content:{
                    focusList:[],//首焦
                    navigation:[],
                    bizNav:[],
                    spQualityGoods:{},
                    poorSelfSale:{},
                    areaGoodsModule:{},
                    recommendAgent:{},
                    moduleIdx:[]
                },
                viewType:this.$route.query.viewType,
                unionCode:this.$route.query.unionCode,

            }
        },
        components:{
            focusList,
            navigation,
            bizNav,
            spQualityGoods,
            poorSelfSale,
            areaGoodsModule,
            recommendAgent,
            indexTitleBar
        },
        methods:{
            getIndexData(){
                var url = "/layout-center/layoutOpen/specialtyIndex";
                this.postWithToken(url,{viewType:this.viewType,unionCode:this.unionCode}).then(res=>{
                    this.$loading.show=false
                    if (res && res.code == 200) {
                        this.content = res.content;
                    }else{
                        this.$toast(res.message)
                    }
                })
            },
            go(id,url,type){    //1是商品,2是固定链接 3文章
//                console.log(arguments);
                if (type == 1) {
                    this.appOpen('goodsDetail',{goodsId:id})
                }else if(type == 2){
                    url = encodeURIComponent(url);
                    this.appOpen('webOutside',{url:url});
                }else if(type == 3){
                    this.appOpen('letterDetails',{noticeId:id,where:'article'});
                }else{
                    this.$toast('缺乏的跳转类型')
                }
            },
            getDefaultWord(){   //取一次搜索页的默认搜索词
                var url = "/ebgoods/hot-word/list/user";
                this.getWithToken(url,{}).then(res=>{
                    this.$loading.show=false
                    if (res && res.code == 200) {
                        this.defaultCon = res.data.default.con;
                    }else{
                        this.$toast(res.message)
                    }
                })
            }
        },
        created(){
            this.getIndexData();
            this.getDefaultWord();
        },
        mounted(){
            setTimeout(()=>{
                this.$header.show = false;
            },0);
            window.refreshIndexPage=(res)=>{
                console.log("abcd")
                this.getIndexData();
            }
//            this.appNotify({callback:'completeInfoRefresh'})
            this.syJsbIosRegisterHandler('refreshIndexPage')
        },
        filters:{
            onlyKeepInt(val){
                return parseInt(val);
            },
            onlyKeepFloat(val){
                var n = '.' + parseFloat(val).toFixed(2).toString().split(".")[1];
                return n;
            }
        },
        watch:{},
        computed:{},
    }
</script>
<style scoped lang="scss">
    @import "main.scss";
</style>
