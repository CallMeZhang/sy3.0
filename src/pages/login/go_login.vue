<template>
  <div id="go_login">
    <div class="top">
      <div class="visitor" @click="appOpen('/')">访客进入</div>
    </div>
    <div class="logo">
      <img :src="imgUrl+'/common/logo.png'" alt="">
    </div>

    <div class="login-con">
      <div class="btn">
        <div class="sy-btn-box">
          <div class="sy-btn" @click="appOpen('signin')">政府/企业员工注册</div>
        </div>
        <div class="sy-btn-box login">
          <div class="sy-btn btn-f" @click="appOpen('code_login')">登录</div>
        </div>
      </div>

      <div class="bottom">登录即代表已阅读并同意<span class="red">用户协议</span>及<span class="red">用户隐私保护协议</span></div>


    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
//quit
  export default {
    components:{},
    data(){
      return {

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
      getData(){
        this.get('/user-center/usr/checkReg',{mobile:15711056294}).then(res=>{

        })
      },
      fn(){
        this.post('/user-center/auth/register',{mobile:'15711056195',password:'234234234',mcode:'230434',wxType:'wx_pub'}).then(res=>{
          if(res && res.code == 200){
            this.$router.push('login_success')
          }else{
            this.$toast(res && res.message)
          }
        })
      }
    },


  }
</script>

<style lang="scss" scoped>
  #go_login{
    height:100%;
    width:100%;
    position: relative;
    background: url('/static/images/login/login_bg.jpg') no-repeat 0 0;
    background-size: cover;

    .top{
      padding-top:.6rem;
      padding-left:5.76rem;
      .visitor{
        width:1.24rem;
        height:.44rem;
        line-height: .44rem;
        text-align: center;
        color:#FF1919;
        border:1px solid #FF1919;
        border-radius:.22rem;
      }
    }

    .logo{
      text-align: center;
      margin-top:1.98rem;
      img{
        width:3.53rem;

      }
    }
    .login-con{
      position: absolute;
      width:100%;
      left:0;
      bottom: .6rem;




      .btn{
        .login{
          margin-top:.4rem;
        }
      }
      .bottom{
        margin-top:.7rem;
        text-align: center;
        color:#CBCBCB;
        font-size:0.24rem;
        .red{
          color: #FF1919;
        }
      }
    }

  }

</style>
