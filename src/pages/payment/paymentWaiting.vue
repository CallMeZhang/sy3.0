<template>
    <div class="pay-waiting">
      <!--<div class="sy-btn-box">-->
        <!--<div class="sy-btn">-->
          <!--支付等待中-->
        <!--</div>-->
      <!--</div>-->
      <div class="sy-btn-box" @click="back">
        <div class="sy-btn">
          返回上一页
        </div>
      </div>

    </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components: {},
    data(){
      return {
        isLoading: true,
        mainId:this.$route.query.outTradeNo || '',
        money:this.$route.query.money || '',
        startTime:'',
      }
    },
    created(){
      let payInfo = this.getLsItem('payInfo')
      if(payInfo){
        if(!this.mainId){
          this.mainId = payInfo.outTradeNo
        }
        this.money = payInfo.money
//        this.removeLsItem('payInfo')
      }
      this.startTime = new Date().getTime();
      this.getData(this.startTime)
    },
    mounted(){
      setTimeout(()=>{
        this.$header.setTitle('支付等待中')
      },0)
    },
    methods: {
      getData(){
        if(new Date().getTime() - this.startTime > 2000) {
          this.appOpen('fail',{money:this.money},false,true,true)
          return;
        }
//        return this.postWithToken('/payment-center/payment/affirmPayResult',{outTradeNo:this.mainId,payWay:'wx_public'})

        return this.postWithToken('/payment-center/payment/affirmPayResult',{outTradeNo:this.mainId,payWay:'ali_h5'}).then(res=>{
          if(res && res.code == 200){
            this.appOpen('success_v1',{money:this.money,mainId:this.mainId,payWay:'ali_h5'},false,true,true)
          }else{
            this.getData()
//            this.appOpen('fail',{},false,true,true)
          }
        })
      },
//      queryOrder(){
//        let t = new Date().getTime()
//        this.getData().then(res=>{
//          if(res && res.code == 200){
//            this.appOpen('success',{money:this.money},false,true,true)
//          }else{
//
//          }
//        })
//      },
      back(){

//        window.history.back()
      }
    },


  }
</script>

<style lang="scss" scoped>
  .pay-waiting{
    padding-top:3rem;
  }
</style>
