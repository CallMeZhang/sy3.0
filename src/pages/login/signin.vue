<template>
  <div id="sigin">
    <div class="top-text">注册</div>
    <div class="phone-box">
      <div class="phone">
        <input type="number" placeholder="输入手机号" v-model="number">
      </div>
    </div>
    <div class="next-btn" @click="goNext" :class="checkTrue?'btn-red':''">下一步</div>

    <div class="wx-signin" v-show="weixin">微信注册</div>

    <div class="mask" v-show="isHasSignShow">
      <div class="cen has-sign">
        <div class="tit">手机号码已经注册</div>
        <div class="con">是否使用手机号{{number}}去登录？</div>
        <div class="btn-box">
          <div class="cancel" @click="cancel">重输手机号</div>
          <div class="sure" @click="sure">登录</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        number:'',
        checkTrue:false,
        isHasSignShow:false,
        weixin:false
      }
    },
    created(){

      this.weixin = false //this.inWeixin()
    },
    mounted(){
      this.$loading.show=false
//      this.$header.show=true
      this.$header.setTitle(' ')
    },
    methods:{
      goNext(){
        if(this.checkTrue){
          this.get('/user-center/usr/checkReg',{mobile:this.number}).then(res=>{
            if(res.code==200&&res.content){
              this.isHasSignShow = true;
            }else if(res.code!=200){
              this.$toast(res.message)
            }else if(res.code==200&&!res.content){
              this.appOpen('sign_next',{mobile:this.number})
            }
          })
        }else{
          this.$toast('请输入正确手机号')
        }
      },
      cancel(){
        this.isHasSignShow = false;
        this.number = '';
      },
      sure(){this.appOpen('code_login_next',{mobile:this.number})},
    },
    watch:{
      number(val){
        this.checkTrue = this.checkPhone(val)
      }
    }

  }
</script>

<style lang="scss" scoped>
  #sigin{
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
        width:5.4rem;
        margin:0 auto;
        padding-bottom:.1rem;
        border-bottom:1px solid #E3E3E3;

        input{
          font-size: .36rem;
          font-weight: 300;
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
    .btn-red{
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    }

    .wx-signin{
      padding-top:.32rem;
      color: #F13E52;
      font-size: .28rem;
      text-align: center;
      text-decoration: underline;
    }

    .has-sign{
      width:5.4rem;
      text-align: center;
      background:rgba(248,248,248,0.82);
      border-radius: 0.28rem ;
      color:#2e2e2e;
      .tit{
        padding:.37rem 0 .34rem 0;
        font-size: .34rem;

      }
      .con{
        padding-bottom:.38rem;
        font-size: .26rem;
      }
      .btn-box{
        border-top:1px solid #D0D0D0;
        &>div{
          display: inline-block;
          padding:.17rem 0 .23rem;
          width:50%;
          float: left;
          box-sizing: border-box;
          color:#007AFF;
          font-size: .34rem;
        }
        .sure{
          border-left:1px solid #D0D0D0;
        }
      }
    }

  }

</style>
