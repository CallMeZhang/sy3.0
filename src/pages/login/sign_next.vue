<template>
  <div id="sigin_next">
    <div class="top-text">注册</div>

    <div class="phone-box">
      <div class="phone relative">
        <div class="tip" v-show="sendTip">验证码已发送至{{phone_num}}</div>
        <input type="number" placeholder="输入验证码" v-model="loginMsg.mcode">
        <div class="get-code" @click="getCode" v-show="!timeShow">{{timeText}}</div>
        <div class="get-code" v-show="timeShow">({{time}}s)</div>
      </div>
      <div class="password relative">
        <input :type="passwordShow?'text':'password'" placeholder="设置登录密码" v-model="loginMsg.password">
        <img :src="passwordShow?imgUrl+'/common/cannot_look.png':imgUrl+'/common/look.png'" alt="" @click="passwordShow = !passwordShow">
        <div class="pass-tip">密码由6~16位英文字母、数字或符号组成</div>
      </div>
    </div>

    <div class="next-btn" @click="signIn" :class="checkTrue?'btn-red':''">注册并登录</div>
    <verify v-if="imgCodeShow" @success="sendMessage" ></verify>

  </div>
</template>

<script>
  import verify from '@/pages/login/verify'
  export default {
    components:{verify},
    data(){
      return {
        phone_num:'',
        passwordShow:false,
        imgCodeShow:false,
        timeText:'获取验证码',
        time:60,
        timeShow:false,
        timer:'',

        sendTip:false,
//        password:'',
        loginMsg:{mcode:'',password:''},
        checkTrue:false,
      }
    },
    created(){

      this.phone_num = this.$route.query.mobile || '';
      this.getData()
    },
    mounted(){
      this.$loading.show=false
//      this.$header.show=true
      this.$header.setTitle(' ')
    },
    methods:{
      getData(){

      },
      getCode(){
        this.imgCodeShow = true;
      },
      // 发送短信
      sendMessage(data){
        let param = data;
        param.mobile = this.phone_num;

        return this.get('/rs-auth/slidegetmcode',param).then(res=>{
          this.imgCodeShow = false;
          if(res && res.code == 200){
            this.time = 60;
            this.timeShow = true;
            this.sendTip = true;

            this.timer = setInterval(()=>{
              this.time --;
              if(!this.time){
                clearInterval(this.timer);
                this.timeText = '再次获取';
                this.timeShow = false;
                this.sendTip = false;
              }
            },1000)
          }else{
            this.$toast(res.message);
            this.sendTip = false;
          }
        })
      },
      // 注册并登录
      signIn(){
        if(!this.checkTrue)return
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)(?![!@#$%^&_]+$)[0-9A-Za-z!@#$%^&_]{6,16}$/.test(this.loginMsg.password)){
          this.$toast('密码由6~16位英文字母、数字或符号组成');
          return;
        }
        if(this.loginMsg.mcode == ''){
          this.$toast('请输入验证码')
        }
        this.post('/user-center/auth/register',{
          mobile:this.phone_num,
          password:this.loginMsg.password,
          mcode:this.loginMsg.mcode,
          platform:"H5",
          wxType:'wx_pub',
        }).then(res=>{
          if(res.code == 200){
            this.appOpen('signin_success')
          }else{
            this.$toast(res.message)
          }
        })
      }
    },
    watch:{
      loginMsg:{
        deep:true,
        handler(val){
          this.checkTrue = val.mcode.length > 0 && val.password.length > 5 && val.password.length < 17
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  #sigin_next{
    ::-webkit-input-placeholder{
      color:#CBCBCB;
    }
    input{
      background: transparent;
    }
    .top-text{
      padding:.34rem 1.05rem;
      font-size: .48rem;
      color: #2E2E2E;
    }

    .phone-box{
      padding-top:1.58rem;
      .phone{
        display: flex;
        justify-content: center;
        align-items: center;
        width:5.4rem;
        margin:0 auto;
        padding-bottom:.1rem;
        border-bottom:1px solid #E3E3E3;
        input{
          font-size: .36rem;
          flex:1;
          overflow: hidden;
        }
        .get-code{
          color:#FF1919;
          font-size: .32rem;
        }
        .tip{
          position: absolute;
          left:0;
          top:-.4rem;
          color: #909090;
        }
      }

      .password{
        display: flex;
        width:5.4rem;
        margin:.66rem auto .1rem auto;
        padding-bottom:.1rem;
        border-bottom:1px solid #E3E3E3;
        input{
          font-size: .36rem;
          flex:1;
          overflow: hidden;
        }
        img{
          height:.44rem;
          width:.44rem;
        }
        .pass-tip{
          position: absolute;
          left:0;
          bottom:-.5rem;
          color: #909090;
        }
      }


    }

    .next-btn{
      width:5.4rem;
      margin:.81rem auto;
      margin-bottom:0;
      height:.88rem;
      line-height: .88rem;
      text-align: center;
      font-size: .32rem;
      color:#fff;
      background:linear-gradient(90deg,rgba(255,181,181,1),rgba(255,169,141,1));
      border-radius: 0.16rem ;
    }

    .code{
      height:4.8rem;
      width:6.4rem;
      margin-left:-3.2rem;
      margin-top:-2.4rem;
      padding: 0 .5rem;
      box-sizing: border-box;
      background: #fff;
      border-radius: .16rem;
      text-align: center;
      transition: .3s;
      transform: scale(0);
      .title{
        margin-top:.54rem;
        font-size: .36rem;
      }
      .code-con{
        margin-top:.6rem;
        display: flex;
        align-items: center;

        .code-text{
          background: #D8D8D8;
          color:#fff;
          height:.88rem;
          /*min-width:auto;*/
          line-height: .88rem;
          /*padding:0 .1rem;*/
          font-size: .36rem;
          margin-right:.2rem;
          border-radius:.06rem;
        }

        input{
          flex:1;
          box-sizing: border-box;
          height:.8rem;
          border:1px solid #FF1919;
          border-radius:.06rem;
          font-size: .36rem;
          overflow: hidden;
          padding-left:.2rem;
        }
      }
      .sy-btn-box{
        margin-top:.7rem;
      }
    }
    .code.scale2{
      transform: scale(1);
    }

    .scale2-enter,.scale2-leave-to{
      transform: scale(0);
    }
    .scale2-enter-active,.scale2-leave-active{
      transition: transform .2s;
    }
    .btn-red{
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    }

  }

</style>
