<template>
  <div class="account iphoneTop-box">
    <div v-title="'忘记支付密码'"></div>
    <div class="real bg-f border-bottom-1px">
      <div class="name relative">
        <input type="text" class="use-code font30" placeholder="请输入验证码" v-model="userCode">
        <p class="red-code font30 absolute" :class="{'red-color':codeTime}" @click="getCode">{{codeStr}}</p>
      </div>
    </div>
    <p class="det-num">您绑定的手机号码是{{phone}}，请点击“获取验证码”</p>
    <!--按钮-->
    <div class="btn font32" @click="confirm">确定</div>

  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        phone:'',
        userCode:'',
        isClick:true,
        codeStr:'获取验证码',
        codeTime:false,
        num:59,
        interval:'',
      }
    },
    created(){
      this.phone = this.$route.query.phone || '';
    },
    mounted(){
      this.$header.setTitle('忘记支付密码')
      this.$loading.show=false
    },
    methods:{
      //获取验证码
      getCode (){
        this.getWithToken('/user-center/auth/getMcode').then(res =>{
          if(res.code == 200){
            if(res.content){
              this.isClick = false;
              this.codeTime = true;
              this.codeStr = '('+this.num+'s)';
              this.interval = setInterval(()=>{
                if(this.num > 1){
                  this.num --;
                  this.codeStr = '('+this.num+'s)';
                }else{
                  this.isClick = true;
                  clearInterval(this.interval)
                  this.num = 59
                  this.codeStr = '再次获取';
                }
              },1000)
            }else{
              this.$toast(res.message)
            }

          }else{
            this.$toast(res.message)
          }
        })
      },
      //点击下一步
      confirm(){
        if(!this.userCode){
          this.$toast("请输入正确的验证码");
          return;
        }
        this.getWithToken('/user-center/auth/tokenCheckMcode',{mcode:this.userCode}).then(res => {
          if(res.code == 200){
            if(res.content){
              this.appOpen('modifyPayPassword',{where:'forget',mcode:this.userCode})
            }else{
              this.$toast(res.message)
            }
          }else{
            this.$toast(res.message)
          }
        })
      },

    },


  }
</script>

<style lang="scss" scoped>
  .account {
    width:100%;
    height:100%;
    background:rgba(250,250,250,1);
  }
  ::-webkit-input-placeholder {/*Chrome/Safari*/
    color:#D0D0D0;
    font-size: .3rem;
  }
  ::-moz-placeholder {/*Firefox*/
    color:#D0D0D0;
    font-size: .3rem;
  }
  :-ms-input-placeholder {/*IE*/
    color:#D0D0D0;
    font-size: .3rem;
  }
  input[disabled] {
    background: #fff;
  }
  .real-name {
    background:rgba(250,250,250,1);
    width: 100%;
    height: 100%;
  }
  .real {
    padding-left:.3rem;
  }
  .text {
    color:rgba(148,148,148,1);
    line-height:0.88rem;
  }
  .use-code{
    color:rgba(148,148,148,1);
    line-height:0.88rem;
  }
  .use-code {
    width:4.79rem;
    border-right:1px solid rgba(227,227,227,1);
  }
  .btn {
    width:6.9rem;
    height:0.88rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
    margin:1.55rem .3rem 0;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    text-align: center;
  }
  .red-code {
    color:rgba(255,25,25,1);
    line-height:0.88rem;
    width:1.8rem;
    text-align: center;
    right:.3rem;
    top:0;
  }
  .red-color {
    color:rgba(208,208,208,1) !important;
  }
  .real-btn {
    background:linear-gradient(90deg,rgba(203,203,203,1),rgba(223,223,223,1)) !important;
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
  .det {
    color:rgba(208,208,208,1);
    line-height:0.24rem;
    bottom:.6rem;
    left:1.52rem;
  }
  .det-num {
    padding-top:.14rem;
    padding-left:.3rem;
    color:rgba(255,101,51,1);
    line-height:0.33rem;
  }
</style>
