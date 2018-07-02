<template>
    <section v-title="title" id="a">
            <section v-show="isShare == 'yes'" class="download" id="download">
                <downLoad></downLoad>
            </section>
            <div class='main'>
                <img src="../../../static/images/common/failureLogo.png" class='logo' alt="">
                <p class='text'>{{text}}</p>
                <img src="../../../static/images/mine/bg-cen.png" class='bj' alt="">
            </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import downLoad from "@/components/common/downLoad.vue"
    export default{
        data(){
            return {
                isShare:this.$route.query.isShare,  //分享环境打开页面
                title:this.$route.query.title || '一起善源 公益中国',
                text:this.$route.query.text||'啊哦,内容已经失效了',

            }
        },
        methods:{},
        watch:{},
        computed:{},
        filters:{},
        created(){

        },
        mounted(){
            setTimeout(()=>{
                this.$loading.show = false
                this.$header.show = true
                if(this.isShare == 'yes'){
                    this.$header.show = false
                }
                this.$header.setTitle(this.title)

                // document.querySelector("#m-box").style.height = "calc(100% - 44px)" autoTrigger="true"
            },0)
        },
        components:{
            downLoad
        },
    }
</script>

<style scoped lang="scss">
#a{
    height:100%;
    overflow:hidden;
}
.main{
    width:100%;
    height:100%;
    text-align:center;
    background: url('../../../static/images/mine/bg.png') center center/cover no-repeat;
    padding-bottom:1.5rem;
    overflow-y:hidden;
    .logo{
        width:1.74rem;
        height:2.6rem;
        margin-top:1.5rem;
    }
    .text{
        height:0.45rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(255,101,51,1);
        line-height:0.45rem;
        margin-top:0.3rem;
    }
    .bj{
        width:6.14rem;
        height:4.46rem;
        margin-top:1rem;
    }
    .download{
        height: 1rem;
    }
    .download:empty{
        display:none;
    }
}
</style>
