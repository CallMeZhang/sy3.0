<template>
  <div class="real-name">
    <div v-title="'实名认证'"></div>
    <div class="real bg-f border-bottom-1px">
      <div class="name border-bottom-1px">
        <span class="text font30">真实姓名</span>
        <input type="text" class="use-input font30" placeholder="请输入真实姓名" v-model.trim="inputName" v-show="!userInput">
        <span class="use-input font30" v-show="userInput">{{userInput}}</span>
      </div>
      <div class="name">
        <span class="text font30">身份证号</span>
        <input type="text" class="use-input font30" placeholder="请输入身份证号" v-model.trim="inputNum"  v-show="!userNum">
        <span class="use-input font30" v-show="userNum">{{userNum}}</span>
      </div>
    </div>
    <!--按钮-->
    <div class="btn font32" :class="{'real-btn':userNum}" @click="confirm() && !userNum">{{confirmStr}}</div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        confirmStr:'确定',
        inputName:'',
        inputNum:'',
        idNum:'',
        userInput:'',
        userNum:''
      }
    },
    created(){
      this.userNum = this.$route.query.idNum || '';
      if(this.userNum){
        this.userInput = this.$route.query.name;
        this.confirmStr = '已认证'
      }else {
        this.inputName = '';
      }
    },
    mounted(){
      this.$header.setTitle('实名认证')
      this.$loading.show=false
    },
    methods:{
      confirm(){
        if(this.userNum){
          return;
        }
        let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(this.inputName.length == 0){
          this.$toast('真实姓名不能为空');
          return;
        }else if(this.inputNum.length == 0){
          this.$toast('身份证号不能为空');
          return;
        }else if(!reg.test(this.inputNum)){
          this.$toast('请输入正确的身份证号');
          return;
        }else {
          this.postWithToken("/user-center/usr/realname",{truename:this.inputName,idValue:this.inputNum}).then(res => {
            if(res.code == 200){
              this.appNotify({callback:'userSettingRefresh'})
              this.$toast(res.message);
              setTimeout(()=>{
                this.syJsbCloseAppPage(0,1);
              },1500)
            }else {
              this.$toast(res.message);
            }
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>


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
    width:1.2rem;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
  }
  .use-input {
    margin-left: .9rem;
    color:rgba(148,148,148,1);
    line-height:0.88rem;
    min-width:4.5rem;
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
  .real-btn {
    background:linear-gradient(90deg,rgba(203,203,203,1),rgba(223,223,223,1)) !important;
  }
</style>
