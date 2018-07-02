<template>
    <section>
        <div v-if="Effectives.aidCouponList.length > 0">
            <ul v-for='item in Effectives.aidCouponList'style='padding-bottom: .1rem;'>
                <li>
                    <div class='top'>
                        <p class='face'><span>可用余额</span><span style='color:#FBDCD2'>面值：{{ item.couponValue }}元</span></p>
                        <p style='font-size:0.64rem;color:#fff;margin-left:0.42rem;'>¥{{ item.couponBlance }}</p>
                        <p class='texts'>有效期：{{ item.startDate | start}}―{{ item.endDate | start }}<span class='not' v-if='item.startTime > item.nowTime'>暂未生效</span></p>
                        <p class='texts'style='margin-top:0.1rem;'>单位名称：{{ item.couponCreator }}</p>
                        <p style='height:0.14rem;'></p>
                    </div>
                    <div class='bottom'>
                        <span class='use' style='color:RGBA(255, 25, 25, 1);border:1px solid RGBA(255, 25, 25, 1);' v-if='item.startTime!=item.nowTime && item.endTime > item.nowTime' @click='uses'>去使用</span>
                        <span class='use'  v-if='item.startTime!=item.nowTime && item.endTime < item.nowTime' style='color:RGBA(208, 208, 208, 1)'>去使用</span>
                        <span class='examples' v-show='false'>去转赠</span>
                    </div>
                </li>
            </ul>
            <aside class="no_more footer" v-if="!isLoading">没有更多了</aside>
            <aside class="no_more footer" v-else>加载中</aside>
        </div>
        <div class="container_mid is-iphone10" v-else>
            <div class="_empty">
                <aside class="empty_icon"></aside>
                <p class="empty_text">您暂时还没有可用扶贫码哦</p>
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
                unbind:false,           //点击使用
                shadowShow:false,        //蒙版层显示
                Effectives:{
                    aidCouponList:[]
                }
            }
        },
        methods:{
            Effective(){//有效扶贫码接口
                this.isLoading = true;
                var url = "/coupon-center/aidCouponApp/effectiveList";
                this.getWithToken(url,{curPage:this.curPage,pageSize:this.pageSize}).then((res)=>{
                    if(res && res.code == 200){
                        // console.log('请求成功',res.data)
                        this.$header.setBack({isReload:1,times:1})
                        this.Effectives.aidCouponList=this.Effectives.aidCouponList.concat(res.data.aidCouponList);
                        // res.data.aidCouponList.startDate.replace("-", ".");
                        // console.log(res.data.aidCouponList[0].startDate);

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
            slideHide(){
                this.shadowShow = false;
            },
            slideShow(){
                this.shadowShow = true;
            },
            uses(){
                // this.appOpen("catalogLists",{catalogId:'ef5cf770cd9d41a2ad9539eb0fa04ffa'});//测试目录
//                this.appOpen("catalogLists",{catalogId:'d041560b002c436b9611826f80f970a7',target:'19a45445abb747a1a322aa99d01a3a97'});//测试目录
                  this.appOpen("catalogLists",{catalogId:'ef5cf770cd9d41a2ad9539eb0fa04ffa',target:''});//正式目录 
            }
        },
        watch:{},
        computed:{
            
        },
        filters:{
           start(val){
               var reg=/-/g;
               return val.replace(reg,".")
           }
        },
        created(){
            this.Effective()
            this.$scroll(()=>{
                if (this.hasNext) {
                    if (!this.isLoading) {
                        this.Effective();
                    }else{
                        console.log("请求中..骚等")
                    }
                }else{
                    console.log('没有下一页，不请求')
                }
            })
        },
        mounted(){
            this.$header.rightFn({
                type:'img',
                url:require('../../../static/images/povertyCode/add.png'),
                callback:()=> {
                    this.appOpen("addOverweight")
                }
            }),
            Bus.$on((res)=>{
                this.Effective();
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
        width:6.9rem;
        background-image: url(../../../static/images/povertyCode/bg.png);
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
        .not{
            display:inline-block;
            width:1.1rem;
            height:0.32rem;
            border-radius:1rem;
            background:rgba(223, 102, 63, 1);
            color:rgba(255,134,95,1);
            line-height:0.32rem;
            text-align:center;
            margin-left:0.1rem;
        }
        .texts{
            font-size:0.24rem;
            color:#fff;
            margin-left:0.42rem;
        }
    }
    .bottom{
        width:6.9rem;
        height:0.88rem;
        border-radius:0 0 0.1rem 0.1rem;
        background:#fff;
        margin: 0 auto;
        box-shadow: 0.03rem 0.03rem 0.03rem 0.03rem #eee;
    }
    .bottom>span{
        display:inline-block;
        float:right;
        width:1.3rem;
        height:0.5rem;
        line-height:0.56rem;
        text-align:center;
        border: 0.01rem solid #ccc;
        margin-right:0.3rem;
        margin-top:0.165rem;
    }
    .shut{
        width:0.6rem;
        height:0.6rem;
        position:fixed;
        top:3.37rem;
        left:6.25rem;
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