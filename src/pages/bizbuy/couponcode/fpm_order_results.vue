<template>
  <div class="fpm-order-r">
    <div v-title="fTitle"></div>
    <div v-if="orderS" class="order-s">
      <div class="r-img" :style="'background:url('+sImgUrl+')no-repeat center;background-size:cover;border:1px dotted #ccc;'"></div>
      <h2 class="order-t">订单提交成功</h2>
      <p class="order-descr">请在邮箱&ensp;{{showOrderInfo.email}}中查收合同，下载打印并盖章后，寄送至：北京西城区西交民巷17号&ensp;&ensp;您可能会收到订单核实电话，请注意接听&ensp;公益中国13001175257</p>
      <div class="s-order-btn" @click="successfulJump()">查看订单</div>
    </div>
    <div v-if="!orderS" class="order-f">
      <div class="f-img"></div>
      <h2 class="order-t">订单提交失败</h2>
      <p class="order-descr txt-center">哎呀，可能遇到了网络错误</p>
      <div class="f-order-btn" @click="failureToJump()">重新提交</div>
    </div>
  </div>
</template>
<script>
  import {getOrderDetail} from "@/requests/fpmOrder.js"
  export default{
    data(){
      return {
        fTitle:'提交订单',
        sImgUrl:this.imgUrl + '/common/pays.png',
        order_id:'',//订单id
        order_result:'',
        orderS:Boolean,
        showOrderInfo:{},
      }
    },
    created() {
      if(this.$route.query.result !== 'undefined'){
        this.order_result = this.$route.query.result;
        this.order_result === 'true' ? this.orderS= true : this.orderS= false;
      }
      if(this.$route.query.orderId){
        this.order_id = this.$route.query.orderId;
      }
      this.getSuccessData();//
    },
    mounted() {
      this.appUnBack();
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.$header.hideBack=false;
          this.$loading.show = false;
          this.$header.setTitle('提交订单')
        },0)
      })
    },
    methods: {
      getSuccessData(){
        getOrderDetail(this.order_id).then((res)=>{
          if(res && res.data.code == 200){
            this.showOrderInfo = res.data.data.orderMainVo;
          }else{
//            console.log(res.data.message)
          }
        },(error)=>{
          console.log(error)
        })
      },
      successfulJump(){
        this.appOpen('/bizPurchaseRecord')
      },
      failureToJump(){
        this.appOpen('fpmPurchasingInfo',{},null,null,true)
      },
    },
  }
</script>
<style lang="scss" scoped>
  $red:red;
  h1{color:$red;text-align:center;}
  .fpm-order-r{
    width: 100%;
    overflow:hidden;
    /*height: 100%;*/
    .order-s,.order-f{
      padding:0 0.3rem;
    }
    .r-img{
      width: 2rem;
      height: 2rem;
      margin:0.6rem auto 0.23rem;
    }
    .order-f .f-img{
      width: 2rem;
      height: 2rem;
      margin:0.6rem auto 0.23rem;
      background:url("/static/images/common/payfail.png")no-repeat center;
      background-size:cover;
      border:1px dotted #ccc;
    }
    .order-t{
      width:5.65rem;
      margin: 0 auto;
      text-align: center;
      font-size:0.36rem;
      color:rgba(46,46,46,1);
      line-height:0.5rem;
    }
    .order-descr{
      width:5.65rem;
      min-height: 1.08rem;
      margin: 0 auto;
      text-align: justify;
      font-size:0.24rem;
      color:rgba(148,148,148,1);
      line-height:0.36rem;
    }
    .txt-center{text-align:center;}
    .s-order-btn{
      margin-top:0.46rem;
      width:6.9rem;
      height:0.88rem;
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.32rem;
      color:rgba(46,46,46,1);
      border-radius: 0.16rem;
      border: 1px solid #d0d0d0;
    }
    .f-order-btn{
      margin-top:0.46rem;
      width:6.9rem;
      height:0.88rem;
      line-height: 0.88rem;
      font-size: 0.32rem;
      color:rgba(255,255,255,1);
      text-align: center;
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
      border-radius: 0.16rem ;
    }
  }
</style>
