<template>
    <section v-title="title" id="a">
            <div class='main'>
                <img src="../../../static/images/mine/upgrade.png" class='logo' alt="">
                <p class='text'>温馨提示,我们已升级为全新的3.0</br>版本,请前往应用商店进行更新</p>
            </div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                title:"全面升级"
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
                this.$header.setTitle("全面升级")
            },0)
        }
    }
</script>

<style scoped lang="scss">
#a{
    height:100%;
    overflow:hidden;
}
.main{
    width:100%;
    text-align:center;
    background:#fff;
    .logo{
        width:3.1rem;
        height:3.1rem;
        margin-top:3.29rem;
    }
    .text{
        height:0.96rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(75,75,75,1);
        line-height:0.48rem;
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