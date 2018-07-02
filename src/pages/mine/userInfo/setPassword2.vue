<template>
  <div class="account">
    <div v-title="'设置密码'"></div>
    <div class="real bg-f border-bottom-1px">
      <div class="name">
        <p class="border-bottom-1px relative">
          <input :type="showPassword?'text':'password'" class="use-code font30" placeholder="请输入新密码" v-model.trim="pass">
          <img :src="imgUrl+(showPassword ? '/common/look.png':'/common/cannot_look.png')" alt="password" class="eye absolute" @click="showPassword = !showPassword">
        </p>
        <p class="relative">
          <input :type="showPassword1?'text':'password'" class="use-code font30" placeholder="请确认新密码" v-model.trim="confirmPass">
          <img :src="imgUrl+(showPassword1 ? '/common/look.png':'/common/cannot_look.png')" alt="password" class="eye absolute" @click="showPassword1 = !showPassword1">
        </p>
      </div>
    </div>
    <p class="det-num">密码可设置6-16位，不能为纯数字或英文字母</p>
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
        pass:'',
        confirmPass:'',//确认密码
        showPassword1:true,
        showPassword:true,
        where:'',
      }
    },
    created(){
      this.where = this.$route.query.where || '';
    },
    mounted(){
      this.$header.setTitle('设置密码')
      this.$loading.show=false
    },
    methods:{
      //点击下一步
      confirm(){
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![!@#$%^&_]+$)[0-9A-Za-z!@#$%^&_]{6,16}$/;
        var regNum = /^[0-9]{6,16}$/;
        var regLetter = /^[a-zA-Z]{6,16}$/;
        if(!this.pass){
          this.$toast("请输入新密码")
          return;
        }
        if(!this.confirmPass){
          this.$toast("请输入确认密码")
          return;
        }
        if(this.pass != this.confirmPass){
          this.$toast("密码不一致")
          this.pass = ''
          this.confirmPass = ''
          return;
        }
        if(regNum.test(this.confirmPass) || regLetter.test(this.confirmPass)){
          this.$toast("不能为纯数字或英文字母")
          this.pass = ''
          this.confirmPass = ''
          return;
        }
        if(!reg.test(this.pass) || !reg.test(this.confirmPass)){
          this.$toast("密码格式错误")
          this.pass = ''
          this.confirmPass = ''
          return;
        }
        this.postWithToken('/user-center/usr/setPwd',{password:this.pass}).then(res => {
          if(res.code == 200){
            if(res.content == true){
              this.appNotify({callback:'accountSecurityRefresh'})
              this.$toast(res.message);
              setTimeout(()=>{
                if(this.where == 'set'){
                  this.syJsbCloseAppPage(0,2);
                }else if(this.where == 'forget'){
                  this.syJsbCloseAppPage(0,3);
                }
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
  .use-code{
    color:rgba(148,148,148,1);
    line-height:0.88rem;
    min-width:6rem;
  }
  .eye {
    width:.44rem;
    height:.44rem;
    top:.23rem;
    right:.3rem;
  }
  .real-btn {
    color:rgba(208,208,208,1) !important;
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
  .det-num {
    padding-top:.14rem;
    padding-left:.3rem;
    color:rgba(255,101,51,1);
    line-height:0.33rem;
  }
</style>
