<template>
  <div id="sigin1">
    <div class="top-text">验证码登录</div>
    <div class="phone-box">
      <div class="phone relative">
        <div class="tip11" v-show="sendTip">验证码已发送至{{phone_num.replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')}}</div>
        <input type="number" placeholder="输入验证码" v-model="loginMsg.mcode" oninput="if(value.length>5)value=value.slice(0,6)">
        <div class="get-code" @click="getCode" v-show="!timeShow">{{timeText}}</div>
        <div class="get-code" v-show="timeShow">({{time}}s)</div>
      </div>
    </div>
    <div class="next-btn" @click="signIn" :class="checkTrue?'btn-red':''">登录</div>
    <verify v-if="imgCodeShow" @success="verifySuccess"></verify>
  </div>
</template>

<script>
  import verify from '@/pages/login/verify';

  export default {
    components:{verify},
    data(){
      return {
        phone_num:'',
        passwordShow:false,
        imgCodeShow:false,
        imgCode:'',  // 图片验证码url base64
        timeText:'获取验证码',
        time:60,
        timeShow:false,
        timer:'',
        sendTip:false,
        loginMsg:{mcode:''},
        checkTrue:false,
      }
    },
    created(){
      this.phone_num = this.$route.query.mobile || '';
    },
    mounted(){
//      this.$header.show=true
      this.$header.setTitle(' ')
      this.$loading.show=false
    },
    methods:{
      getCookie(c_name) {
        if (document.cookie.length > 0) {
          let c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
          }
        }
        return "";
      },
      getCode(){
        this.imgCodeShow = true;
      },
      signIn(){
        if(!this.checkTrue)return;

        if(this.loginMsg.mcode == ''){
          this.$toast('请输入验证码')
        }
        let callback = decodeURIComponent(this.$route.query.callback)
        let exParam=/exParam=1/ig.test(callback)
        this.post('/user-center/auth/login',{
          mobile:this.phone_num,
          mcode:this.loginMsg.mcode,
          loginType:'code_login',
          platform:'H5',
          exParam:exParam?'1':''
        }).then(res=>{
          if(res.code == 200){
            this.syJsbStoreToken(res.content.userToken, 0)
            var token = res.content.userToken//this.getCookie('token');
            if (callback === "undefined") {
              callback = 'https://www.17shanyuan.com/boc/index.php'
            }
            if (/\?/.test(callback)) {
              callback += '&token=' + token
            }else{
              callback += '?token=' + token
            }
            window.location.href = callback
          }else{
            this.$toast(res.message)
          }
        })
      },
      verifySuccess(data){
        let param = data;
        param.mobile = this.phone_num;
        return this.get('/user-center/auth/slideGetMcode',param).then(res=>{
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
      }
    },
    watch:{
      loginMsg:{
        deep:true,
        handler(val){
          this.checkTrue = val.mcode.length > 0
//          this.loginMsg.mcode = this.loginMsg.mcode.slice(0, 6);
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  #sigin1{
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
        .tip11{
          position: absolute;
          left:0;
          top:-.4rem;
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
    .scale2{
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

    ._nc .stage3 .title {
      font-size: 20px;
      color: #777;
      width: 100%;
    }
    /* 图标 */
    /*._nc .icon {
      width: 32px;
      height: 32px;
      background-image: url("//g.alicdn.com/sd/nch5/icons.png?v=2");
    }
    ._nc .stage3 .menu.refresh .icon {
      background-position: -128px 0;
    }
    ._nc .stage3 .menu.feedback .icon {
      background-position: -160px 0;
    }
    !* 刷新链接 *!
    ._nc .stage3 .menu.refresh {
      border-right: 2px solid #ccc;
    }*/

  }

</style>
