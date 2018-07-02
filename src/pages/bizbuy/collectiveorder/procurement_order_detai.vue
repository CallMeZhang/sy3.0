<template>
  <div class="p-order-detai">
    <div v-title="jcTitle"></div>
    <div class="p-order-detai-con">
      <header class="detail-top">
          <p class="top-tips"><span class="clock"></span><span class="tips-txt">等待合同</span></p>
      </header>

      <section class="order-detail-info-list">
        <!--订单列表 start-->
        <div class="order-detail-info">
          <div class="p-order-show-addr border-bottom-1px">
            <div class="addr-top"><span class="icon"></span><span class="addr-txt">张妹妹</span><span class="addr-txt">18306141266</span>
            </div>
            <div class="addr-con" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1</div>
          </div>
          <div class="p-products-con">
            <!--商品list start-->
            <div class="products-item">
              <div class="item-left">img</div>
              <div class="item-right">
                <h3 class="right-title" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">[中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料;是的你没有看错，我们采用放养模式，未投放饲料</h3>
                <p class="right-sku">每箱500g 每箱500g 每箱500g 每箱500g</p>
                <p class="right-price"><span>￥50</span><span>&times;2</span></p>
              </div>
            </div>
            <div class="products-item">
              <div class="item-left">img</div>
              <div class="item-right">
                <h3 class="right-title" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">[中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料</h3>
                <p class="right-sku">每箱500g 每箱500g 每箱500g 每箱500g</p>
                <p class="right-price"><span>￥50</span><span>&times;2</span></p>
              </div>
            </div>
            <!--商品list end-->
          </div>
          <div class="line-spacing"></div>
        </div>
        <div class="order-detail-info">
          <div class="p-order-show-addr border-bottom-1px">
            <div class="addr-top"><span class="icon"></span><span class="addr-txt">张妹妹</span><span class="addr-txt">18306141266</span>
            </div>
            <div class="addr-con" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1望京soho塔1</div>
          </div>
          <div class="p-products-con">
            <!--商品list start-->
            <div class="products-item">
              <div class="item-left">img</div>
              <div class="item-right">
                <h3 class="right-title" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">[中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料</h3>
                <p class="right-sku">每箱500g 每箱500g 每箱500g 每箱500g</p>
                <p class="right-price"><span>￥50</span><span>&times;2</span></p>
              </div>
            </div>
            <div class="products-item">
              <div class="item-left">img</div>
              <div class="item-right">
                <h3 class="right-title" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">[中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料,</h3>
                <p class="right-sku">每箱500g 每箱500g 每箱500g 每箱500g</p>
                <p class="right-price"><span>￥50</span><span>&times;2</span></p>
              </div>
            </div>
            <!--商品list end-->
          </div>
          <div class="line-spacing"></div>
        </div>
        <!--订单列表 end-->

        <div class="p-info-aggregation">
          <p class="line">
            <span class="left">商品总价</span>
            <span class="right">600积分+999,999.99元</span>
          </p>
          <p class="line">
            <span>有效期</span>
            <span>1个月</span>
          </p>
        </div>
        <div class="line-spacing"></div>
        <div class="detail-con-bottom">
          <h3 class="order-numbers">订单编号:182920300405060</h3>
          <p class="place-order"><span class="point"></span>生成订单 2015-09-01 15:32</p>
          <div class="f-copy">复制</div>
        </div>
        <div class="iphonex-white-blank"></div>
      </section>
      <footer class="detail-bottom iphonex-bottom-div">
        <div class="look-contract">查看合同</div>
      </footer>
    </div>
  </div>
</template>
<script>
  export default{
    data (){
      return{
        jcTitle:'订单详情'
      }
    },
    created (){},
    beforeMount(){
      this.$loading.show = false;
    },
    mounted (){},
    methods: {

    },
  }
</script>
<style lang="scss" scoped>
  .p-order-detai{
    width: 100%;
    .p-order-detai-con{
      height:100%;
      margin:0 auto;
      /*background:#fafafa;*/
    }
    .order-detail-info-list{
      padding-bottom:1rem;
    }
    .detail-top{
      width: 7.5rem;
      height:2rem;
      background: url("/static/images/goods/goods-bg.png")no-repeat center;
      background-size: cover;
      .top-tips{
        padding:0.6rem 0.3rem 0;
        display:flex;
        height:0.4rem;
        align-items: center;
        font-size:0.32rem;
        color:rgba(255,255,255,1);
        line-height:0.32rem;
      }
      .clock{
        display:inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background:url("/static/images/common/clock.png")no-repeat center;
        background-size:cover;
      }
      .tips-txt{
        display:inline-block;
        padding-left:0.1rem;
      }
    }
    .p-order-show-addr{
      padding:0.22rem 0.3rem 0.22rem;
      height:1.28rem;
      background:#fff;
      .addr-top{
        height:0.42rem;
        font-size:0.3rem;
        color:rgba(75,75,75,1);
        line-height:0.42rem;
        .icon{
          display:inline-block;
          float:left;
          width:0.3rem;
          height: 0.36rem;
          background:url('/static/images/common/local@1.5x.png')no-repeat;
          background-size:cover;
        }
        .addr-txt{
          padding-left:0.2rem;
        }
      }
      .addr-con{
        margin-top:0.05rem;
        padding-left:0.5rem;
        height:0.8rem;
        text-align: justify;
        font-size:0.26rem;
        color:rgba(75,75,75,1);
        line-height:0.4rem;
        text-overflow:ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow:hidden;
      }
    }
    .p-products-con{
      padding: 0 0.3rem;
      background:#fff;
      /*box-sizing: border-box;*/
      .products-item{
        display:flex;
        /*height: 2.43rem;*/
        padding-top:0.25rem;
        border-bottom:1px solid #e3e3e3;
        .item-left{
          width:1.4rem;
          height:0.98rem;
          background:rgba(227,227,227,1);
        }
        .item-right{
          flex:1;
          padding-left: 0.2rem;
          width:5.3rem;
        }
        .right-title{
          height:0.8rem;
          margin-bottom:0.07rem;
          box-sizing: border-box;
          font-size:0.28rem;
          color:rgba(75,75,75,1);
          line-height:0.4rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .right-sku{
          width:5.3rem;
          height:0.64rem;
          font-size:0.24rem;
          color:rgba(148,148,148,1);
          line-height:0.33rem;
          white-space: nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
        }
        .right-price{
          display:flex;
          justify-content: space-between;
          height:0.42rem;
          padding-bottom:0.25rem;
          font-size:0.3rem;
          color:rgba(46,46,46,1);
          line-height:0.42rem;
        }
      }
      .products-item:last-of-type{border-bottom:none;}
    }
    .line-spacing{
      width: 100%;
      height:0.2rem;
      background:rgba(248,248,248,1);
    }
    .detail-con-bottom{
      position:relative;
      padding:0.2rem 0.3rem 0;
      height: 1.45rem;
      background:#fff;
      .order-numbers{
        height:0.44rem;
        font-size:0.26rem;
        color:rgba(148,148,148,1);
        line-height:0.44rem;
      }
      .place-order{
        position:relative;
        font-size:0.26rem;
        color:rgba(148,148,148,1);
        line-height:0.5rem;
        padding-left:0.37rem;
        .point{
          position:absolute;
          left:0;
          top:50%;
          margin-top:-0.07rem;
          display:inline-block;
          width:0.14rem;
          height:0.14rem;
          background:rgba(255,25,25,1);
          border-radius: 50%;
          box-shadow: 0 0 2px #FF1919;
        }
      }
      .f-copy{
        position:absolute;
        top:0.2rem;
        right:0.3rem;
        display:inline-block;
        width:1rem;
        height:0.44rem;
        line-height: 0.44rem;
        text-align:center;
        border-radius: 0.08rem;
        font-size:0.22rem;
        color:rgba(46,46,46,1);
        border:1px solid #D0D0D0;
      }
    }
    .p-info-aggregation{
      padding:0.2rem 0.3rem 0.2rem;
      height: 0.88rem;
      background:#fff;
      .line{
        display:flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        font-size:0.26rem;
        color:rgba(148,148,148,1);
        line-height:0.44rem;
        .left{
          width: 3.05rem;
          text-align:left;
        }
        .right{
          flex:1;
          text-align:right;
        }
      }
    }
    .detail-bottom{
      position:fixed;
      bottom:0;
      height:1rem;
      width: 100%;
      text-align:right;
      background:rgba(248,248,248,1);
      .look-contract{
        margin-top:0.14rem;
        margin-right:0.3rem;
        display:inline-block;
        width:1.6rem;
        height:0.66rem;
        line-height: 0.66rem;
        text-align:center;
        border-radius: 0.08rem;
        border:1px solid #D0D0D0;
      }
    }
  }
</style>
