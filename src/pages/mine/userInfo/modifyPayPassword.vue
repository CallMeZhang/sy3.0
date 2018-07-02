<template>
  <div>
    <div v-title="'设置支付密码'"></div>
    <p class="pay-det font32">请设置新的支付密码，用于支付验证</p>
    <inputCode :number="6" :placeholder="'|'" @input = 'valueStr' :clear="cle"></inputCode>
    <!--按钮-->
    <div class="btn font32" :class="{'btn-color':userInput.length < 6}" @click="next">下一步</div>
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
        oldWalletPwd:'',//旧密码,
        where:'',//入口
        mcode:'',//忘记验证码
        cle:false
      }
    },
    created(){
      this.where = this.$route.query.where || '';
      this.mcode = this.$route.query.mcode || '';
      this.oldWalletPwd = this.$route.query.oldWalletPwd || '';
    },
    mounted(){
      this.$header.setTitle('设置支付密码')
      this.$loading.show=false
    },
    computed:{

    },
    methods: {
      //获取用户输入的信息
      valueStr(v) {
        this.userInput = v;
      },
      next() {
        var reg = /^\d{6}$/;
        if (!reg.test(this.userInput)) {
          this.$toast('密码错误');
          this.cle = true;
          setTimeout(()=>{
            this.cle = false;
          },50)
          return;
        }
        if(this.where == 'modify'){
          if (this.oldWalletPwd == this.userInput) {
            this.$toast("您设置的新密码与老密码相同，请重新输入");
            this.cle = true;
            setTimeout(()=>{
              this.cle = false;
            },50)
            return;
          }
          this.appOpen("modifyPayPassword2", {oldWalletPwd: this.oldWalletPwd, walletPwd: this.userInput,where:'modify'})
        }else if(this.where == 'forget'){
          this.appOpen("modifyPayPassword2", {walletPwd: this.userInput,mcode:this.mcode,where:'forget'})
        }


      },

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
</style>
