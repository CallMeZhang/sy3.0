<template>
    <section v-title="title">
        <section class="result-box">
            <aside class="result-pic">
                <img src="/static/images/common/pays.png">
            </aside>
            <p class="h3">评价成功</p>
            <p class="p" v-if="isAddPoints == 'true'">棒棒哒！双手为您奉上20积分请笑纳</p>
        </section>
        <section class="sy-btn-box">
            <div class="sy-btn" @click="appOpen('consumRecord',{payment:'payIndex',chooseType:'all'})">返回订单列表</div>
            <div class="sy-btn btn-f" @click="appBackTabbarIndex(1,0)">返回首页</div>
        </section>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                title:"评价结果",
                isAddPoints:this.$route.query.isAddPoints
            }
        },
        methods:{

        },
        watch:{

        },
        computed:{

        },
        filters:{

        },
        created(){
            console.log(this.isAddPoints);
        },
        mounted(){
          this.$header.setTitle(this.title);
          this.$header.hideBack=false
          this.appUnBack()
          this.$loading.show=false
//          this.$header.rightFn({
//            type:'img',
//            rightText:'',
//            imgUrl:'/static/images/common/x-black.png',
//            callback:()=>{
//                this.appOpen('consumRecord')//返回订单列表
//            }
//          })

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .result-box{
        padding:0.6rem 0.3rem 1.17rem;
        text-align:center;
    }
    .result-pic{
        display:inline-block;
        width:2rem;
        height:2rem;
        padding-bottom:0.23rem;
    }
    .h3{
        color:$c2E;
        font:0.36rem/0.5rem $fa;
    }
    .p{
        color:$c2E;
        font:300 0.26rem/0.37rem $fa;
    }
    .sy-btn + .sy-btn{
        margin-top:0.44rem;
    }
    .sy-btn{
        width:6.9rem;
    }
</style>
