<template>
  <div>
    <div v-title="'我的售后记录'"></div>
    <!--refund-list start-->
    <div class="order-list" v-for="(n,n1) in 5">
      <div class="shop-name clearfix">
        <div class="fl">
          <p class="name font26">
            <span>退款单号：</span>
            <span>619290111250</span>
          </p>
        </div>
        <div class="name-state fr font26">
          <span>已退款</span>
        </div>
      </div>
      <div class="goods">
        <!--商品信息-->
        <div class="goods-list border-bottom-1px" :class="{'single-p':false}">
          <div class="det font24">5天后将自动同意退款</div>
          <div class="clearfix">
            <div class="goods-img fl">
              <div class="clearfix">
                <div class="img-bor fl" v-for="i in 3">
                  <img src="" alt="" class="img">
                </div>
              </div>
            </div>
            <div class="goods-num fr font26">
              <p :class="det ? 'goods-counrt':'goods-counrts'">共<span>4</span>件</p>
              <p class="bg-arrer1 bg-w1">查看详情</p>
            </div>
            <div class="single fl" v-show="">
              <p class="no-enter font28">
                <span class="single-expect">预售 | </span>
                <span class="single-title">[中宁农家鸡]爱心帮扶农家散养鹅就和能否京东方京东方科技的</span>
              </p>
              <p class="font24 single-weight">每箱500g 每箱500g 每箱500g 每箱500g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--测试数据-->
    <div class="order-list">
      <div class="shop-name clearfix">
        <div class="fl">
          <p class="name font26">
            <span>退款单号：</span>
            <span>619290111250</span>
          </p>
        </div>
        <div class="name-state fr font26">
          <span>已退款</span>
          <span v-show="">正在处理</span>
        </div>
      </div>
      <div class="goods">
        <!--商品信息-->
        <div class="goods-list border-bottom-1px single-p">
          <div class="clearfix">
            <div class="goods-img fl">
              <div class="clearfix">
                <div class="img-single fl">
                  <img src="" alt="" class="img">
                </div>
              </div>
            </div>
            <div class="single fl">
              <p class="no-enter font28">
                <span class="single-expect">预售 | </span>
                <span class="single-title">[中宁农家鸡]爱心帮扶农家散养鹅就和能否京东方京东方科技的</span>
              </p>
              <p class="font24 single-weight">每箱500g 每箱500g 每箱500g 每箱500g</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="order-list">
      <div class="shop-name clearfix">
        <div class="fl">
          <p class="name font26">
            <span>退款单号：</span>
            <span>619290111250</span>
          </p>
        </div>
        <div class="name-state fr font26">
          <span>已退款</span>
        </div>
      </div>
      <div class="goods">
        <!--商品信息-->
        <div class="goods-list border-bottom-1px" :class="{'single-p':false}">
          <div class="clearfix">
            <div class="goods-img fl">
              <div class="clearfix">
                <div class="img-bor fl" v-for="i in 3">
                  <img src="" alt="" class="img">
                </div>
              </div>
            </div>
            <div class="goods-num fr font26">
              <p class="goods-counrts">共<span>4</span>件</p>
              <p class="bg-arrer1 bg-w1">查看详情</p>
            </div>
            <div class="single fl" v-show="">
              <p class="no-enter font28">
                <span class="single-expect">预售 | </span>
                <span class="single-title">[中宁农家鸡]爱心帮扶农家散养鹅就和能否京东方京东方科技的</span>
              </p>
              <p class="font24 single-weight">每箱500g 每箱500g 每箱500g 每箱500g</p>
            </div>
          </div>
        </div>
        <!--&lt;!&ndash;按钮&ndash;&gt;-->
        <!--<div class="goods-btn clearfix">-->
        <!--<div class="btn-2 btn-col font26 fr"><span>联系客服</span></div>-->
        <!--<div class="btn-3 font26 fr">联系卖家</div>-->
        <!--</div>-->
      </div>
    </div>
    <!--测试数据-->
    <!--refund-list end-->
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:'orderDetail',
    components:{},
    data(){
      return {
        moreGoods:false,
        det:"dddddd"
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{

    },


  }
</script>

<style scoped>
  .order-list {
    border-bottom:.2rem solid rgba(250,250,250,1);
    box-sizing: border-box;
  }
  .shop-name {
    border-top:1px solid #E3E3E3;
    border-bottom:1px solid #E3E3E3;
    padding:0 .3rem;
  }
  .name {
    color:rgba(75,75,75,1);
    line-height:0.88rem;
    font-weight: 300;
  }
  .bg-arrer {
    width:2.86rem;
    background: url("/static/images/wishList/go.png") no-repeat 100% 50%;
    background-size: .44rem;
  }
  .name-state {
    color:rgba(255,101,51,1);
    line-height:0.88rem;
    font-weight: 300;
  }

  .goods-list {
    padding:.3rem .3rem 0;
  }
  .det {
    margin-bottom: .16rem;
    padding-left:.2rem;
    color:rgba(255,101,51,1);
    line-height:0.33rem;
    font-weight:300;
    background: #FFF8F8;
    height:0.33rem;
  }
  .img-bor {
    width:1.63rem;
    height:1.14rem;
    background:rgba(227,227,227,1);
    margin:0 .1rem .3rem 0;
  }
  .img {
    width:100%;
    height:100%;
  }
  .goods-num {
    color:rgba(75,75,75,1);
    line-height:0.37rem;
    font-weight: 300;
  }
  .goods-counrts {
    padding-top:.22rem;
  }
  .goods-counrt {
    padding-top:.16rem;
  }
  .bg-arrer1 {
    width:1.3rem;
    background: url("/static/images/wishList/go.png") no-repeat 115% 50%;
    background-size: .44rem;
  }
  .img-single {
    width:1.63rem;
    height:1.14rem;
    background:rgba(227,227,227,1);
  }
  .single-p {
    padding:.3rem 0 .3rem .3rem;
  }
  .single {
    padding-left:.3rem;
    width:4.97rem;
  }
  .single-expect {
    color:rgba(255,25,25,1);
    line-height:0.63rem;
  }
  .single-title {
    color:rgba(75,75,75,1);
    line-height:0.63rem;
  }
  .single-weight {
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }
</style>
