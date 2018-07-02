<template>
  <div class="wrapper">
    <img :src="imgUrl+'/common/payfail.png'" alt=""
         class="success-img">
    <h2 class="title">支付异常</h2>
    <p class="money">若您已付款，请勿重新支付，我们正在持续查询支付结果 如有疑问请致电 <a :href="!p?'tel:4006667308':'javascript:void(0)'"><span class="blue" @click="phone">4006667308</span></a></p>
    <div class="btn-two" @click="watchOrder">查看订单</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        p:true,
      }
    },
    created() {
      this.syJsbGetAppInfo(appInfo=>{
        if(appInfo){
          this.p=true
        }else{
          this.p=false
        }

      })
    },
    mounted(){
      this.appUnBack()
      this.$header.hideBack=false;
      this.$loading.show=false
      this.$header.setTitle('支付结果')
    },
    methods: {
      phone(){
        this.jsCallPhone('4006667308')
      },
      watchOrder(){
        this.appOpen('consumRecord',{chooseType :'pay',payment:'payIndex'})
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .success-img{
    border: 0;
    display: block;
    width: 2rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    margin-bottom: 0.23rem;
  }
  .title{
    height:0.5rem;
    font-size:0.36rem;
    text-align: center;
    color:rgba(46,46,46,1);
    line-height:0.5rem;
  }
  .money{
    margin: 0 auto;
    width: 6rem;
    overflow: hidden;
    text-align: center;
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.37rem;
  }
  .blue{
    color: #007AFF;
  }
  .btn-two{
    width: 6.9rem;
    margin: 0 auto;
    margin-bottom: 0.44rem;
    height:0.88rem;
    font-size:0.32rem;
    line-height:0.88rem;
    text-align: center;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
    margin-top: 0.81rem;
    color:rgba(46,46,46,1);
    border: 1px solid #D0D0D0;
    background: #fff;
  }
</style>
