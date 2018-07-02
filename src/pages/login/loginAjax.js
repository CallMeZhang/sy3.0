export default function(param)  {
  this.post('/user-center/auth/login',param).then(res=>{
    if(res && res.code == 200){
      let redirect_url = this.getLsItem('sy_come_from') || '/';
      this.syJsbStoreToken(res.content.userToken)
      // return;
      window.location.replace(redirect_url)
      // setTimeout(()=>{this.appOpen(redirect_url,{},true,true,true)},1000)
    }else if(res && res.code == 430){
      this.$toast(res && res.message)
      setTimeout(()=>{
        this.showVerify = true;
      },700)
    }else if(res && res.code == 500){
      this.$toast(res && res.message)
      setTimeout(()=>{
        this.showVerify = true;
      },700)
    }else{
      this.$toast(res && res.message)
    }
  })
}
