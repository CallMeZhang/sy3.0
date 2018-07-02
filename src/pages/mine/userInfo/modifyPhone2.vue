<template>
  <div class="account">
    <div v-title="'修改手机号'"></div>
    <div class="real bg-f border-bottom-1px">
      <div class="name border-bottom-1px">
        <span class="text font30">手机号</span>
        <input type="text" class="use-input font30" placeholder="请输入新的手机号" v-model.trim="phone">
      </div>
      <div class="name relative">
        <span class="text font30">验证码</span>
        <input type="text" class="use-code font30" placeholder="请输入验证码" v-model.trim="userCode">
        <p class="red-code font30 absolute" :class="{'red-color':codeTime}" @click="getCode() && isClick">{{codeStr}}</p>
      </div>
    </div>
    <!--按钮-->
    <div class="btn font32" @click="confirm">确定</div>
    <p class="det font24 absolute" >
      <span>有任何疑问，请咨询客服</span>
      <span class="det-num"> 400 666 7308</span>
    </p>
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
        phone:'',
        userCode:'',
        codeStr:'获取验证码',
        codeTime:false,
        type:'',
        num:59,
        interval:'',
        imgCodeShow:false,//滑块验证
        isClick:true,//是否可点
        oldMcode:''
      }
    },
    created(){
      this.type = this.$route.query.type || '';
      this.oldMcode = this.$route.query.oldMcode || '';
    },
    mounted(){
      this.$header.setTitle(this.titleStr)
      this.$loading.show=false
    },
    computed:{
      titleStr(){
        let v = this.type;
        let str = '';
        switch (v){
          case 'modify':
            str = '修改手机号';
          case 'setting':
            str = '绑定手机号';
        }
        return str;
      }
    },
    methods:{
      //获取验证码
      getCode (){
        if(this.checkPhone(this.phone)){
          this.imgCodeShow = true;
        }else {
          this.$toast('请输入正确的的手机号')
        }
      },
      verifySuccess (data){
        this.get('/user-center/usr/checkReg',{mobile:this.phone}).then(res=>{
          if(res.code == 200){
            if(res.content){
              this.imgCodeShow = false;
              this.$toast(res.message)
            }else{
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
                      this.imgCodeShow = true;
                      clearInterval(this.interval)
                      this.num = 59
                      this.codeStr = '再次获取';
                    }
                  },1000)
                }
              })

            }
          }else{
            this.$toast(res.message)
          }
        })
      },
      //确定
      confirm(){
        var regNum = /^[0-9]{6,16}$/;
        // var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
        if(!this.checkPhone(this.phone)){
          this.$toast('请输入正确的手机号')
          this.phone = ''
          return;
        }
        if(this.userCode.length < 5 || regNum.test(this.userCode)){
          this.$toast('请输入正确的验证码')
          this.userCode = '';
          return;
        }
        this.postWithToken('/user-center/usr/modifyMobile',{oldMcode:this.oldMcode,newMobile:this.phone,newMcode:this.userCode}).then(res => {
          if(res.code == 200){
            if(res.content){
              this.appNotify({callback:'accountSecurityRefresh'})
              this.$toast(res.message)
              setTimeout(()=>{
                this.syJsbCloseAppPage(0,2);
              },1500)
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
  .use-input {
    min-width:4.5rem;
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
