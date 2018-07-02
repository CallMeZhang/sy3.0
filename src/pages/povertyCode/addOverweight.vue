<template>
    <section v-title="title">
            <div class='bounced'>
                <input type="text" placeholder='请输入8位电子扶贫码' class='text' ref="phoneNum" @input='activa()' maxlength="8">
                <p><button class='btn' v-if='length != 8 && length < 8' style='background:linear-gradient(90deg,rgba(204,204,204,1),rgba(221,221,221,1));color:RGBA(255, 255, 255, 1)'>确定</button></p>
                <p><button class='btn' v-if='length >= 8' @click='shadowShow1()'>确定</button></p>
            </div>
            <div v-if="shadowShow" @click="slideHide" style='position:relative'>
                <Verify @success="aaa"></Verify>
                <span style='width:100%;text-align:center;position:fixed;bottom:5.2rem;color:#fff;font-size:0.26rem;z-index:100000'>滑动验证成功，就可以添加扶贫码啦</span>
            </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import Verify  from '../login/verify.vue';
    import Bus  from '../../modules/bus/bus.js';
    export default{
        data(){
            return {
                title:"扶贫码",
                inputValue:'',
                length:0,
                shadowShow:false,        //蒙版层显示
                information:[],          //验证信息
                slider:{}

            }
        },
        methods:{
            activa(){
                this.inputValue = this.$refs.phoneNum.value;
                this.length = this.$refs.phoneNum.value.length;
                // console.log(this.length)
            },
            shadowShow1(){
                this.shadowShow=true;
            },
            aaa(){
                this.information=arguments[0]
                this.validation()
                this.shadowShow=false
                this.$refs.phoneNum.value=''
                this.length = 0;
            },
            slideHide(){
                this.shadowShow = false;
            },
            validation(){
                let url = "/coupon-center/aidCouponApp/activeCoupon";
                let obj={
                    sessionId:this.information.sessionId,
                    scene:this.information.scene,
                    sig:this.information.sig,
                    stoken:this.information.stoken,
                    couponCode:this.inputValue
                }
                // console.log(obj)
                this.getWithToken(url,obj).then((res)=>{
                    if(res && res.code == 200){
                        // console.log('请求成功2',res.data)
                        this.$toast('添加扶贫码成功')
                        this.appNotify({callback:'mineRefresh'});
                        Bus.$emit("aaa",1);
                        this.appOpen("povertyCode",{disableReturn:1});
                        this.$header.setBack({isReload:1,times:1})
                    }else{
                        this.$toast(res.message)
                    }
                })
            }
        },
        watch:{},
        computed:{
            
        },
        filters:{},
        created(){
            
        },
        mounted(){
            this.$header.customBehavior(()=>{
                this.syJsbCloseAppPage(1,1)
            })
            this.$header.setTitle("添加电子扶贫码")
            this.$loading.show=false
        },
        components:{
            Verify
        },
    }
</script>

<style scoped lang="scss">

.bounced{
        width:100%;
        background:#fff;
        border-radius:0.2rem;
        text-align:center;
        z-index: 100;
        h1{
            font-size:0.36rem;
            color:#2E2E2E;
            line-height:1.56rem;
            font-Weight:bold;
        }
        .text{
            width:7.2rem;
            height:0.88rem;
            border-bottom:1px solid #E3E3E3;
            font-size:0.3rem;
            padding:0 0 0 0.3rem;
            overflow:hidden;
            display:block;
        }
        .btn{
            width:5.4rem;
            height:0.88rem;
            font-size:0.32rem;
            background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
            border-radius:0.16rem;
            color:#fff;
            margin-top:2.02rem;
        }
    }
    .mask{
        position:fixed;
        top:5rem;
        left:0;
    }
</style>