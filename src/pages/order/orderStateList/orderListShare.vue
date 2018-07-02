<template>
  <div class="bg-f">
    <div v-title="'一起善源 公益中国'"></div>
    <div class="bg">
      <!--<img :src="imgUrl+'/coupon/bgShare.png'" alt="">-->
      <div class="top-share clearfix">
        <div class="fl">
          <p class="top-1">我在“公益中国”平台上购买了这些商品</p>
          <p class="top-2">都是我精心挑选的好货，邀请您一起来帮扶</p>
        </div>
        <div class="fr top-img">
          <!--v-img-cover="i + ossUrl('webp_240')"-->
          <img :src="imgUrl+'/common/head-default.jpg'"  alt="" class="img">
        </div>
      </div>
    </div>
    <div class="list" v-for="i in 3">
      <div class="border-bottom-1px list-sin relative">
        <div class="clearfix">
          <div class="list-img fl">
            <img :src="imgUrl+'/common/head-default.jpg'" alt="" class="">
          </div>
          <div class="list-r fr">
            <p class="det no-enter2">十年结果核桃树，聋哑老人眼欲穿盼收购</p>
            <p class="det-money">¥25.80</p>
          </div>
        </div>
        <div class="right-now absolute">立即帮扶</div>
      </div>
    </div>


  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {

      }
    },
    created(){
      window.document.title = '一起善源 公益中国'
    },
    mounted(){
      this.$header.show = false;
      this.$loading.show = false;
    },
    methods:{

    },


  }
</script>

<style lang="scss" scoped>
  .bg {
    width:100%;
    height:1.49rem;
    background:url('/static/images/coupon/bgShare.png') no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
  }
  img{
    width:100%;
    height:100%;
  }
  .top-share {
    padding:0 .3rem;
    box-sizing: border-box;
  }
  .top-1 {
    padding-top:.34rem;
    font-size:0.28rem;
    color:rgba(255,255,255,1);
    line-height:0.4rem;
    max-width: 5rem;
  }
  .top-2 {
    padding-top:.08rem;
    font-size:0.24rem;
    color:rgba(255,255,255,1);
    line-height:0.33rem;
    max-width: 5rem;
  }
  .top-img {
    margin-top:.34rem;
    height:.82rem;
    width:.82rem;
    background: #fff;
    border-radius: 50%;
  }
  .img{
    height:.82rem;
    width:.82rem;
    border-radius: 50%;
  }
  .list {
    padding:0 .3rem;
  }
  .list-sin {
    padding:.4rem 0 .3rem;
  }
  .list-img {
    width:2.7rem;
    height:1.89rem;
    background-color: #e3e3e3;
  }
  .det {
    width:3.9rem;
    font-size:0.32rem;
    color:rgba(46,46,46,1);
    line-height:0.45rem;
  }
  .det-money {
    padding-top:.69rem;
    font-size:0.32rem;
    color:rgba(255,25,25,1);
    line-height:0.38rem;
    font-weight: 500;
  }
  .right-now {
    width:1.39rem;
    height:0.66rem;
    background:rgba(255,25,25,1);
    border-radius:0.08rem;
    font-size:0.28rem;
    color:rgba(255,255,255,1);
    line-height:0.66rem;
    text-align: center;
    bottom:.2rem;
    right:0;
  }
</style>
