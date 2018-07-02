<template>
  <div id="sigin1">
    <div class="top-text">密码登录</div>

    <div class="phone-box">
      <div class="phone">
        <input type="number" placeholder="输入手机号" v-model="loginMsg.phone_num">
        <!--<div class="get-code">获取验证码</div>-->
      </div>
      <div class="password">
        <input :type="passwordShow?'text':'password'" placeholder="填写密码" v-model.trim="loginMsg.password">
        <img :src="imgUrl+(passwordShow?'/common/look.png':'/common/cannot_look.png')" alt="" @click="passwordShow = !passwordShow">
      </div>
    </div>

    <div class="next-btn" :class="checkTrue?'btn-red':''" @click="goLogin">登录</div>

    <div class="way-box flex">
      <div class="way" @click="$router.push('code_login')">验证码登录</div>
      <template v-if="false">
        <div class="border"></div>
        <div class="way" @click="wxLogin">微信登录</div>
      </template>
    </div>

    <div v-if="showVerify">
      <verify @success="verifySuccess"></verify>
    </div>


  </div>
</template>

<script>
  //import loading from '@/components/'
  import verify from './verify.vue'
  import loginAjax from './loginAjax.js'
  export default {
    components:{verify},
    data(){
      return {
        loginMsg:{phone_num:'',password:'',},
//        phone_num:'',
//        password:'',
        passwordShow:false,
        checkTrue:false,
        showVerify:false,
        verifyData:'',
      }
    },
    created(){

    },
    mounted(){
//      this.$header.show=true
      this.$header.setTitle(' ')
      this.$loading.show=false

    },
    methods:{
//      loginApi(){
//        return this.post('/user-center/auth/login',{mobile:this.loginMsg.phone_num,password:this.loginMsg.password,loginType:'pwd_login'}).then(res=>{
//          if(res && res.code == 200){
//            console.log('登录成功')
//          }else{
//            this.$toast(res && res.message);
//          }
//        })
//      },
      goLogin(){
        if(!this.checkPhone(this.loginMsg.phone_num)){
          this.$toast('请输入正确的手机号')
          return;
        }
        if(!this.loginMsg.password){
          this.$toast('请填写密码')
          return;
        }
        // 登录
        if(this.verifyData){
          loginAjax.call(this,this.verifyData)
        }else{
          loginAjax.call(this,{mobile:this.loginMsg.phone_num,password:this.loginMsg.password,loginType:'pwd_login'})
        }
      },
      verifySuccess(data){
        this.showVerify = false;
        this.verifyData = {mobile:this.loginMsg.phone_num,password:this.loginMsg.password,loginType:'pwd_login',sessionId:data.sessionId,stoken:data.stoken,sig:data.sig,scene:data.scene};

//        loginAjax.call(this,{mobile:this.loginMsg.phone_num,password:this.loginMsg.password,loginType:'pwd_login',sessionId:data.sessionId,stoken:data.stoken,sig:data.sig,scene:data.scene})
      },
      wxLogin(){
        const appid = 'wxd28e2eb6ab457d84';
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri=https%3A%2F%2Ft2.17shanyuan.com%2F1.0%2Fuser-center%2FwxApi%2FuserInfo&response_type=code&scope=snsapi_base&state=123#wechat_redirec'
//        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirec'
//        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri='+encodeURI(location.href)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect '
        location.href = url
//        this.get(url).then(res=>{console.log(res)})
      }
    },
    watch:{
      loginMsg:{
        deep:true,
        handler(val){
          this.checkTrue = this.checkPhone(val.phone_num) && val.password;
        }
      }
    }

  }
</script>


<style lang="scss" scoped>
  #sigin1{
    /*touch-action: none;*/
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
      .tip{
        padding:0 0 0.1rem 1.05rem;
        color: #909090;
      }
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
      }

      .pass-tip{
        color: #909090;
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
    .btn-red{
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1)) ;
    }

  }


  .way-box{
    padding:.4rem 2rem;
    justify-content: space-around;
    align-items: center;

    .way{
      color: #FF1919;
      font-size: .28rem;
    }
    .border{
      width:1px;
      height:.36rem;
      background: #CBCBCB;
    }
  }
</style>
