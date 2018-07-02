<template>
  <div class="bg-f">
    <div v-title="'登录/注册'"></div>
    <div>
      <img :src="imgUrl+'/common/about1.png'" alt="" class="logo">
      <img :src="imgUrl+'/mine/17.png'" alt="" class="logo-det">
    </div>
    <div>
      <div class="user">
        <div class="phone border-bottom-1px">
          <input type="text" placeholder="输入手机号" class="user-phone" v-model.trim="phone">
          <span class="get-code" @click="getCode() && isClick">{{codeStr}}</span>
        </div>
        <div class="phone border-bottom-1px" >
          <input type="text" placeholder="输入验证码" class="user-phone" v-model.trim="userCode">
        </div>
      </div>
      <div class="btn" :class="{'btn-col':phone.length > 10 && userCode.length > 5}" @click="confirm">确定</div>
    </div>
    <verify v-if="imgCodeShow" @success="verifySuccess"></verify>
  </div>
</template>

<script>
  //import loading from '@/components/'
  import verify from '@/pages/login/verify';

  export default {
    components:{verify},
    data(){
      return {
        imgCodeShow:false,//滑块验证
        codeStr:'获取验证码',
        isClick:true,//是否可点
        num:59,
        phone:'',
        userCode:'',
        wxOpenId:'',
        wxUnionId:'',
        inviteCode:'',
        appId:'wxd28e2eb6ab457d84',//wxd28e2eb6ab457d84
        nickname:'',
        sex:'',
        headimgurl:'',
      }
    },
    created(){
      document.title = '登录/注册';
      this.inviteCode = this.$route.query.inviteCode || '';
      this.wxOpenId = this.$route.query.wxOpenId || '';
      this.wxUnionId = this.$route.query.wxUnionId || '';
      this.nickname = this.$route.query.nickname || '';
      this.sex = this.$route.query.sex || '';
      this.headimgurl = this.$route.query.headimgurl || '';
    },
    mounted(){
      this.$header.show = false;
      this.$loading.show=false
    },
    methods:{
      verifySuccess (data){
        let param = data;
        param.mobile = this.phone;
        this.get('/user-center/auth/slideGetMcode',param).then(res=>{
          this.imgCodeShow = false;
          if(res.code == 200){
            this.isClick = false;
            this.codeTime = true;
            this.codeStr = '('+this.num+'s)';
            this.interval = setInterval(()=>{
              if(this.num > 1){
                this.num --;
                this.codeStr = '('+this.num+'s)';
              }else{
                this.imgCodeShow = false;
                clearInterval(this.interval)
                this.num = 59
                this.codeStr = '再次获取';
              }
            },1000)
          }else {
            this.$toast('网络连接失败');
          }
        })
      },
      //获取验证码
      getCode (){
        if(this.checkPhone(this.phone)){
          this.imgCodeShow = true;
        }else {
          this.$toast('请输入正确的的手机号')
        }
      },
      //确定
      confirm(){
        if(this.userCode.length < 5){
          this.$toast('验证码错误');
          this.userCode = '';
          return;
        }
        //调登录接口
        let data = {
          mobile:this.phone,
          mcode:this.userCode,
          wxOpenId:this.wxOpenId,
          wxUnionId:this.wxUnionId,
          wxType:'wx_pub',
          appId:this.appId,
          loginType:'invite_login',
          inviteCode:this.inviteCode,
          platform:'H5',
          nickname:this.nickname,
          gender:this.sex,
          avatar:this.headimgurl,

        }
        this.post('/user-center/auth/login',data).then(res =>{
          if(res.code == 200){
            if(res.content.register){
              this.appOpen('downLoad',{where:'register'})
            }else{
              this.appOpen('downLoad',{where:'alerdyRegister'})
            }

          }
        })
      },

    },
  }
</script>

<style lang="scss" scoped>
  ::-webkit-input-placeholder {/*Chrome/Safari*/
    font-size:0.36rem;
    color:rgba(203,203,203,1);
    line-height:0.6rem;
    font-weight: 300;
  }
  ::-moz-placeholder {/*Firefox*/
    font-size:0.36rem;
    color:rgba(203,203,203,1);
    line-height:0.6rem;
    font-weight: 300;
  }
  :-ms-input-placeholder {/*IE*/
    font-size:0.36rem;
    color:rgba(203,203,203,1);
    line-height:0.6rem;
    font-weight: 300;
  }
  .logo {
    width:1.2rem;
    height:1.2rem;
    display: block;
    margin: .7rem auto .2rem;
  }
  .logo-det {
    width:1.63rem;
    height:.4rem;
    display: block;
    margin: 0 auto;
  }
  .user {
    padding:.75rem 1.05rem 0;
  }
  .phone {
    height:1.22rem;
    padding-top:.6rem;
    box-sizing: border-box;
  }
  .user-phone {
    height:.62rem;
    width:3.5rem;
    font-size:0.36rem;
    color:rgba(46,46,46,1);
    line-height:0.6rem;

  }
  .get-code {
    display: inline-block;
    font-size:0.32rem;
    color:rgba(255,25,25,1);
    line-height:.54rem;
    text-align: right;
    width:1.8rem;
  }
  .btn {
    width:5.4rem;
    height:0.88rem;
    background:linear-gradient(90deg,rgba(255,181,181,1),rgba(255,169,141,1));
    border-radius: 0.16rem ;
    margin: 1.26rem auto 0;
    font-size:0.32rem;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    text-align: center;
  }
  .btn-col {
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1)) !important;
  }
</style>
