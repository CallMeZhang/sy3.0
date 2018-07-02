<template>
  <div class="account">
    <div v-title="'修改手机号'"></div>
    <div class="real bg-f border-bottom-1px">
      <div class="name border-bottom-1px">
        <span class="text font30">手机号</span>
        <input type="text" class="use-input font30"  v-model.trim="phone" v-show="!phone">
        <span class="use-input font30" v-show="phone">{{phone}}</span>
      </div>
      <div class="name relative">
        <span class="text font30">验证码</span>
        <input type="text" class="use-code font30" placeholder="请输入验证码" v-model.trim="userCode">
        <p class="red-code font30 absolute" :class="{'red-color':codeTime}" @click="getCode() && isClick">{{codeStr}}</p>
      </div>
    </div>
    <!--按钮-->
    <div class="btn font32" @click="next">下一步</div>
    <p class="det font24 absolute" >
      <span>有任何疑问，请咨询客服</span>
      <span class="det-num"> 400 666 7308</span>
    </p>

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
      this.$header.setTitle('修改手机号')
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
      next(){
        var regNum = /^[0-9]{6,16}$/;
        if(this.userCode.length < 5 || regNum.test(this.userCode)){
          this.$toast('请输入正确的验证码');
          this.userCode = ''
          return;
        }
          // this.isNext = true;
        this.getWithToken('/user-center/auth/tokenCheckMcode',{mcode:this.userCode}).then(res => {
          if(res.code == 200){
            if(res.content){
              // this.$toast(res.message)
              this.appOpen("modifyPhone2",{type:'modify',oldMcode:this.userCode})
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
  .use-input ,.use-code{
    margin-left: 1.2rem;
    color:rgba(148,148,148,1);
    line-height:0.88rem;
  }
  .use-code {
    width:2.6rem;
    border-right:1px solid rgba(227,227,227,1);
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
    padding-left:.2rem;
    color:#FF1919;
  }
</style>
