<template>
    <div class="container contentbox bg">
        <!--<div v-title="memberInfo.unionName"></div>-->
        <div class="index-box" style="padding-bottom:.26rem;">
            <ul class="me-top-box">
                <li class="me-top-box-L avatar fl">
                  <img  :src="memberInfo.avatar?memberInfo.avatar+ossUrl('webp_120') : imgUrl + '/mine/avatar.png'" alt="">
                </li>
                <li class="me-top-box-C fl" style="padding-left:.2rem;">
                    <div class="new-name">{{memberInfo.dispName}}</div>
                    <div class="new-person-lable">{{memberInfo.orgName}}</div>
                    <div class="new-person-tit">感谢您参与{{memberInfo.unionName}}公益精准扶贫{{memberInfo.regdays}}天。<br>担当社会责任，我们一起行动。</div>
                </li>
            </ul>
        </div>


        <div class="v2-zizhu bg" style="padding-left:.3rem;">
          <div class="sy-list border-bottom-1px">
            <div class="left">中益钱包</div>
            <div class="right">{{memberInfo.points}}积分</div>
            <!--<img :src="imgUrl+'/common/arrow.png'" alt="">-->
          </div>

          <div class="sy-list border-bottom-1px"  @click="appOpen('consumRecord',{chooseType:'all'})">
            <div class="left">全部订单</div>
            <img :src="imgUrl+'/common/arrow.png'" alt="">
          </div>

          <div class="sy-list border-bottom-1px" @click="appOpen('consumRecord',{chooseType:'pay'})">
            <div class="left">待付款</div>
            <img :src="imgUrl+'/common/arrow.png'" alt="">
          </div>

          <div class="sy-list border-bottom-1px" @click="appOpen('consumRecord',{chooseType:'receive'})">
            <div class="left">待收货</div>
            <img :src="imgUrl+'/common/arrow.png'" alt="">
          </div>

          <div class="sy-list border-bottom-1px" @click="appOpen('consumRecord',{chooseType:'appraise'})">
            <div class="left">待评价</div>
            <img :src="imgUrl+'/common/arrow.png'" alt="">
          </div>

          <div class="sy-list border-bottom-1px" @click="appOpen('consumRecord',{chooseType:'complate'})">
            <div class="left">已完成</div>
            <img :src="imgUrl+'/common/arrow.png'" alt="">
          </div>
            <!--<a >-->
            <!--<div class="v2-zizhu-list active">-->
                <!--<div class="v2-zizhu-list-L">中益钱包</div>-->
                <!--<div class="v2-zizhu-list-R"></div>-->
                <!--<div class="v2-zizhu-list-C">{{memberInfo.points}}积分</div>-->
            <!--</div>-->
            <!--</a>-->
            <!--<div class="line"></div>-->
            <!--<a>-->
            <!--<div class="v2-zizhu-list active">-->
                <!--<div class="v2-zizhu-list-L">全部订单</div>-->
                <!--<div class="v2-zizhu-list-R"></div>-->
                <!--<div class="v2-zizhu-list-C"></div>-->
            <!--</div>-->
            <!--</a>-->
            <!--<div class="line"></div>-->
            <!--<a>-->
            <!--<div class="v2-zizhu-list active">-->
                <!--<div class="v2-zizhu-list-L">待付款</div>-->
                <!--<div class="v2-zizhu-list-R"></div>-->
                <!--<div class="v2-zizhu-list-C"></div>-->
            <!--</div>-->
            <!--</a>-->
            <!--<div class="line"></div>-->
            <!--<a>-->
            <!--<div class="v2-zizhu-list active">-->
                <!--<div class="v2-zizhu-list-L">待发货</div>-->
                <!--<div class="v2-zizhu-list-R"></div>-->
                <!--<div class="v2-zizhu-list-C"></div>-->
            <!--</div>-->
            <!--</a>-->
            <!--<div class="line"></div>-->
            <!--<a>-->
                <!--<div class="v2-zizhu-list active">-->
                    <!--<div class="v2-zizhu-list-L">待收货</div>-->
                    <!--<div class="v2-zizhu-list-R"></div>-->
                    <!--<div class="v2-zizhu-list-C"></div>-->
                <!--</div>-->
            <!--</a>-->
            <!--<div class="line"></div>-->
            <!--<a>-->
                <!--<div class="v2-zizhu-list active">-->
                    <!--<div class="v2-zizhu-list-L">已完成</div>-->
                    <!--<div class="v2-zizhu-list-R"></div>-->
                    <!--<div class="v2-zizhu-list-C"></div>-->
                <!--</div>-->
            <!--</a>-->
            <!--<div class="line"></div>-->
        </div>
        <div class="cloudlogo bg">
            <div class="cloudlogo-L"><img v-lazy="imgUrl + '/fx/fx.png'" alt="正努力加载…"></div>
            <div class="cloudlogo-R">您的数据与“公益中国”APP实时同步 <br>售后&客服等更多功能可在APP中受理</div>
        </div>
        <wx_footer></wx_footer>
    </div>
</template>
<script>
    import footer from './wx_footer_v3.vue'
    export default {
        data () {
            return {
                agentName: '',
                supportName: '',
                roleName:'',
                memberInfo: {},
            }
        },
        created() {
            this.setdata()
        },
        mounted(){
          setTimeout(()=>{
            this.$loading.show = false;
            this.$header.show = false;
          },0)
        },
        components: {
            'wx_footer': footer
        },
        methods: {
            setdata () {
             this.getWithToken('/user-center/usr/home').then(res=>{
               if(res && res.code == 200){
                 console.log(res)
                 this.memberInfo = res.content;
//                 this.$header.title=this.memberInfo.unionName
               }else{
                 this.$toast(res?res.message:'获取个人信息失败')
               }
             })
            }

        }

    }
</script>
<style scoped>
   .avatar{
     width:1.2rem;
     height:1.2rem;
     border-radius: 50%;
   }
   .avatar img{
     width:1.2rem;
     height:1.2rem;
     border-radius: 50%;
   }
    .contentbox{position: relative;margin-bottom: 0.98rem;}
    .v2-zizhu-list-L{color: #000}
    .index-box{ background:url(/static/images/fx/me_top_bg2.jpg) no-repeat; background-size:100% auto; overflow:hidden; padding-top:0.6rem; position:relative;}
    .me-top-box-L{ margin-left:0.2rem;margin-top: 0.04rem}
    .me-top-box-C{ width:5.22rem;text-align: left;margin-top: 0.04rem}
    .new-person-lable{ line-height:0.3rem; font-size:0.22rem; margin-bottom:0.14rem;}
    .new-person-tit{ line-height:0.34rem;}
    .new-name{height:0.3rem;line-height:0.3rem;font-size:0.28rem;}
    .index-box div{color:#fff!important}
    .cloudlogo{width:100%;padding: 1.94rem 0 1.54rem;position: relative}
    .cloudlogo-L{width:1.38rem;height:0.62rem;position: absolute;left: 0.4rem;bottom: 0.58rem;}
    .cloudlogo-L img{width: 100%;height: 100%}
    .cloudlogo-R{position: absolute;left: 2rem;bottom: 0.58rem;font-family: PingFangSC-Regular; font-size: 0.26rem;  color: #727272;}
</style>
