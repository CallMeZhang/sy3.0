<template>
  <div class="modify">
    <div v-title="WhereCome"></div>
    <div class="name bg-f font30 border-bottom-1px">
      <div class="clearfix">
        <input type="text" class="user-input" :maxlength="where == 'email'?'40':'20'" minlength="2" :placeholder="where | placeholderStr" v-model.trim="userInput" autofocus>
        <img :src="imgUrl+'/common/close.png'" alt="清空" class="close fr" @click="clear">
      </div>
    </div>
    <p class="det font24" v-show="where === 'name'">2-20字，可由中英文、数字、“_“、"-"组成</p>
    <!--按钮-->
    <div class="btn font32" :class="{'det-height':where !== 'name'}" @click="confirm">确定</div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:'modifyName',
    components:{},
    data(){
      return {
        userInput:'',//用户输入信息
        where:'',//title名字
      }
    },
    created(){
      this.where = this.$route.query.where || 'name';
    },
    mounted(){
      this.$header.setTitle(this.WhereCome)
      this.$loading.show=false
    },
    computed:{
      //title显示
      WhereCome(){
        let w = this.where
        let str = '';
        switch (w){
          case 'name':
            str = '修改姓名';
            break;
          case 'email':
            str = '邮箱';
            break;
          case 'num':
            str = '员工号';
            break;
        }
        return str;
      }

    },
    filters:{
      //占位符文字
      placeholderStr(p){
        let str = '';
        switch (p){
          case 'name':
            str = '请输入姓名';
            break;
          case 'email':
            str = '请输入邮箱';
            break;
          case 'num':
            str = '请输入员工号';
            break;
        }
        return str;
      }
    },
    methods:{
      confirm(){
        if(this.where === 'name'){
          let reg = /^[a-zA-Z0-9\u4e00-\u9fa5_-]{2,20}$/;
          if(this.userInput.length > 20 || this.userInput.length < 2){
            this.$toast("请输入2-20字作为姓名");
            this.userInput = '';
            return;
          }else if(!reg.test(this.userInput)){
            this.$toast("姓名格式有误");
            this.userInput = '';
            return;
          } else {
            this.postWithToken("/user-center/usr/modifyDispName",{dispName:this.userInput}).then(res => {
              if(res.code == 200){
                this.appNotify({callback:'userSettingRefresh'})
                this.appNotify({callback:'mineRefresh'})
                this.$toast(res.message);
                setTimeout(()=>{
                  this.syJsbCloseAppPage(0,1);
                },1500)
              }else {
                this.$toast(res.message);
                this.userInput = '';
              }
            })
          }
        }else if(this.where === 'num'){
          if(this.userInput == ''){
            this.$toast('请输入员工号');
            return;
          }
          this.postWithToken("/user-center/usr/staffCode",{staffCode:this.userInput}).then(res => {
            if(res.code == 200){
              this.appNotify({callback:'userSettingRefresh'})
              this.$toast(res.message);
              setTimeout(()=>{
                this.syJsbCloseAppPage(0,1);
              },1500)
            }else {
              this.$toast(res.message);
              this.userInput = '';
            }
          })
        }else if(this.where === 'email'){
          // if(!this.checkMail(this.userInput)){
          //   this.$toast("邮箱格式有误");
          //   this.userInput = '';
          //   return;
          // }
          if(this.userInput == ''){
            this.$toast('请输入邮箱');
            return;
          }
          this.postWithToken("/user-center/usr/modifyEmail",{email:this.userInput}).then(res => {
            if(res.code == 200){
              this.appNotify({callback:'completeInfoRefresh'})
              this.$toast(res.message);
              setTimeout(()=>{
                this.syJsbCloseAppPage(0,1);
              },1500)
            }else {
              this.$toast(res.message);
              this.userInput = '';
            }
          })

        }
      },
      //清空输入信息
      clear (){
        this.userInput = '';
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
  .modify {
    background: #FAFAFA;
    width: 100%;
    height: 100%;
  }
  .name {
    color:rgba(148,148,148,1);
    line-height:0.88rem;
    padding:0 .3rem;
  }
  .user-input {
    height:.88rem;
    max-width:6.48rem;
    min-width:6rem;
  }
  .close{
    margin-top: .22rem;
    width:.44rem;
    height:.44rem;
  }
  .det {
    padding-left:.3rem;
    color:rgba(255,101,51,1);
    line-height:0.48rem;
  }
  .det-height {
    margin-top:2.03rem !important;
  }
  .btn {
    width:6.9rem;
    height:0.88rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
    margin:1.55rem .3rem 0;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    text-align: center;
  }
  .no-btn {
    background:linear-gradient(90deg,rgba(203,203,203,1),rgba(223,223,223,1));
  }
</style>
