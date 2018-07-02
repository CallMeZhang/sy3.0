<template>
    <section>
        <div v-if="Effectives.aidCouponList.length > 0">
            <ul v-for='item in Effectives.aidCouponList'>
                <li>
                    <div class='top'>
                        <p class='face' style='color:#FAFAFA'><span>可用余额</span><span>面值：{{ item.couponValue }}元</span></p>
                        <p style='font-size:0.64rem;color:#fff;margin-left:0.42rem;'>¥{{ item.couponBlance }}</p>
                        <p class='texts'>有效期：{{ item.startDate | start }}―{{ item.endDate | start}}</p>
                        <p class='texts'style='margin-top:0.1rem;'>单位名称：{{ item.couponCreator }}</p>
                        <p style='height:0.22rem;'></p>
                        <span class='switch' v-text='name(item.isUsed)'></span>
                    </div>
                </li>
            </ul>
            <aside class="no_more footer" v-if="!isLoading">没有更多了</aside>
            <aside class="no_more footer" v-else>加载中</aside>
        </div>
        <div class="container_mid is-iphone10" v-else>
            <div class="_empty">
                <aside class="empty_icon"></aside>
                <p class="empty_text">您暂时还没有已失效的扶贫码哦</p>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import Bus  from '../../modules/bus/bus.js';
    export default{
         data(){
            return {
                unit:'中益善源(北京)科技有限公司',
                curPage:1,              //当前页数
                pageSize:5,             //每页显示数
                hasNext:false,          //下一页
                isLoading:false,        //正在加载中
                Effectives:{
                    aidCouponList:[]
                }
            }
        },
        methods:{
            failure(){//失效扶贫码接口
                this.isLoading = true;
                var url = "/coupon-center/aidCouponApp/ineffectiveList";
                this.getWithToken(url,{curPage:this.curPage,pageSize:this.pageSize}).then((res)=>{
                    if(res && res.code == 200){
                        // console.log('请求成功2',res.data)
                        this.Effectives.aidCouponList=this.Effectives.aidCouponList.concat(res.data.aidCouponList);
                        this.hasNext  = res.data.aidCouponList.length > 0;
                        // console.log(this.hasNext,2222)
                        this.curPage++
                        this.isLoading = false;
                    }else{
                        this.$toast(res.message)
                        this.isLoading = false;
                    }
                },err =>{
                    this.isLoading = false;
                })
            },
            name(type){
                if(type==0){
                    return '已过期'
                }else{
                     return '已使用'
                }
            }
        },
        watch:{},
        computed:{},
        filters:{
            start(val){
               var reg=/-/g;
               return val.replace(reg,".")
           }
        },
        created(){
            this.failure()
            this.$scroll(()=>{
                if (this.hasNext) {
                    if (!this.isLoading) {
                        this.failure();
                    }else{
                        console.log("请求中..骚等")
                    }
                }else{
                    console.log('没有下一页，不请求')
                }
            })
        },
        mounted(){
            Bus.$on((res)=>{
                this.failure();
            });
        }
    }
</script>

<style scoped lang="scss">
@import "../../../static/css/g-global.scss";
section{
        margin-top:1.8rem;
        overflow:hidden;
        overflow:auto;
    }
    li{
        margin-top:0.3rem;
    }
    .top{
        position:relative;
        width:6.9rem;
        background-image: url(../../../static/images/povertyCode/bg2.png);
        background-size:6.9rem 2.76rem;
        background-repeat:no-repeat;
        margin: 0 auto;
        .face{
             display:flex;
             justify-content:space-between;
             color:#fff;
             font-size:0.3rem;
             padding:0.4rem 0.4rem 0;
        }
        .switch{
            display:block;
            position:absolute;
            top:1.3rem;
            left:5rem;
            font-size:0.48rem;
            color:#FAFAFA;
            transform: rotate(-30deg);
        }
        .texts{
            font-size:0.24rem;
            color:#fff;
            margin-left:0.42rem;
        }
    }
    .empty_text{
        font:0.28rem/1.5 "";
        text-align:center;
        color:#D0D0D0;
    }
    ._empty{
        background-color:#fff;
        padding-top:0.6rem;
        box-sizing:border-box;
    }
    .empty_icon{
        background-image:url(/static/images/common/error.png);
    }
    .footer{
        text-align: center;
        background: rgba(250, 250, 250, 1);
        width: 100%;
        height: 1.1rem;
        font-size: 0.24rem;
        font-weight: 300;
        color: rgba(227, 227, 227, 1);
    }
</style>