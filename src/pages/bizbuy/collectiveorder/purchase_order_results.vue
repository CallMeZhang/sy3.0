<template>
  <div class="biz-order-result">
    <div v-title="bizTitle"></div>
    <div v-if="orderS" class="order-s">
      <div class="r-img" :style="'background:url('+sImgUrl+')no-repeat center;background-size:cover;border:1px dotted #ccc;'"></div>
      <h2 class="order-t">订单提交成功</h2>
      <p class="order-descr">请在邮箱a@b.com中查收合同，下载打印并盖章后，寄送至XXXXXXXXX您可能会收到订单核实电话，请注意接听</p>
      <div class="s-order-btn">查看订单</div>
    </div>
    <div v-if="!orderS" class="order-f">
      <div class="f-img"></div>
      <h2 class="order-t">订单提交失败</h2>
      <p class="order-descr txt-center">哎呀，可能遇到了网络错误</p>
      <div class="f-order-btn">重新提交</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        bizTitle:'提交订单',
        orderS:false,//下单结果
        sImgUrl:'/static/images/common/pays.png',
      }
    },
    created() {},
    beforeMount(){
      this.$header.setTitle('提交订单')
    },
    mounted() {
      this.$nextTick(()=>{
        this.$header.hideBack=false;
        this.$loading.show = false;
      })
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .biz-order-result{
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
