<template>
  <div>
    <div v-title="'修改支付密码'"></div>
    <p class="pay-det font32">请输入您的支付密码，以验证身份</p>
    <inputCode :number="6" :placeholder="'|'" @input = 'valueStr' :clear="cle"></inputCode>
    <!--按钮-->
    <div class="btn font32" :class="{'btn-color':userInput.length < 6}" @click="next">下一步</div>
    <p class="forget font30" @click="appOpen('forgetPayPassword',{phone:phone})">忘记支付密码？</p>
  </div>
</template>

<script>
  //import loading from '@/components/'
  import inputCode from '@/components/common/inputCode'
  export default {
    components:{inputCode},
    data(){
      return {
        userInput:'',
        redColor:false,
        value: '',
        nextClick:false,
        phone:'',
        cle:false
      }
    },
    created(){
      this.phone = this.$route.query.phone || '';
      this.cle = false;
    },
    mounted(){
      this.$header.setTitle('修改支付密码');
      this.$loading.show=false
    },
    methods:{
      //获取用户输入的信息
      valueStr(v){
        this.userInput = v;
      },
      next(){
        var reg = /^\d{6}$/;
        if(!reg.test(this.userInput)){
          this.$toast('密码错误');
          this.cle = true;
          setTimeout(()=>{
            this.cle = false;
          },50)
          return;
        }
        this.postWithToken("/user-center/wallet/checkPwd",{walletPwd:this.userInput}).then(res => {
          if(res.code == 200){
            if(res.content == true){
              this.$toast(res.message);
              setTimeout(()=>{
                this.appOpen("modifyPayPassword",{oldWalletPwd:this.userInput,where:'modify'})
              },1500)
            }else{
              this.$toast(res.message);
              this.cle = true;
              setTimeout(()=>{
                this.cle = false;
              },50)
            }
          }else {
            this.$toast(res.message);
            this.cle = true;
            setTimeout(()=>{
              this.cle = false;
            },50)
          }
        })


      }
    },


  }
</script>

<style lang="scss" scoped>
  .pay-det {
    color:rgba(148,148,148,1);
    line-height:0.45rem;
    text-align: center;
    padding:.95rem 0 .6rem;
  }
  .code-bor {
    height:.9rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding:0 .5rem 0 .34rem;
  }
  .input {
    width:0.8rem;
    height:1.2rem;
    border-radius: 0.08rem ;
    border:1px solid #D0D0D0;
    margin-left:.31rem;
    color:rgba(46,46,46,1);
    line-height:1.2rem;
    text-align: center;
    box-sizing: border-box;
    font-size:.7rem;
  }
  .input-color {
    border-color: #FF1919;
  }
  .btn {
    width:6.9rem;
    height:0.88rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
    margin:1.6rem .3rem 0;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    text-align: center;
  }
  .btn-color {
    background:linear-gradient(90deg,rgba(255,181,181,1),rgba(255,169,141,1)) !important;
  }
  .forget {
    color:rgba(255,25,25,1);
    line-height:0.28rem;
    padding-top:.42rem;
    text-align: center;
  }
</style>
