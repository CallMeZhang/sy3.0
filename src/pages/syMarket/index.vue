<template>
    <div class="syMarket">
      <div class="banner">
        <div class="swiper-container2">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in content">
              <div class="item-slide">
                <img :src="item.unionIcon" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clickList border-bottom-1px">
        <div v-for="item in type" class="click-div">
          <img :src="item.url" alt="" class="click-img">
          <p class="click-p">{{item.name}}</p>
        </div>
      </div>
      <div class="more-list border-bottom-1px">
        <div style="height: 0.67rem;overflow: hidden;padding-bottom: 0.28rem">
          <div class="more">最多优惠</div>
          <div class="go-more">查看更多</div>
        </div>
        <div>
          <div v-for="item in goodsList" class="goods-div">
            <img :src="imgUrl+'/goods/youpin.png'" alt="" class="yp">
            <img :src="item.unionIcon" alt="" class="goods-img">
            <p class="goods-item">{{item.unionName}}</p>
            <p class="goods-price"><span class="number">{{item.point}}</span>积分+ <span class="number">{{item.price.toString().split('.')[0]}}</span><span class="small-number">.{{item.price.toString().split('.')[1]}}</span>元</p>
          </div>
        </div>
      </div>

      <div class="more-list">
        <div style="height: 0.67rem;overflow: hidden;padding-bottom: 0.28rem">
          <div class="more">最新上架</div>
          <div class="go-more">查看更多</div>
        </div>
        <div>
          <div v-for="item in goodsList" class="goods-div">
            <img :src="imgUrl+'/goods/youpin.png'" alt="" class="yp">
            <img :src="item.unionIcon" alt="" class="goods-img">
            <p class="goods-item">{{item.unionName}}</p>
            <p class="goods-price"><span class="number">{{item.point}}</span>积分+ <span class="number">{{item.price.toString().split('.')[0]}}</span><span class="small-number">.{{item.price.toString().split('.')[1]}}</span>元</p>
          </div>
        </div>
      </div>
      <div class="goods-footer">
        最后更新于：10:45 © 17shuanyuan.com
      </div>
    </div>
</template>

<script>
  import swiper from '../../../static/js/swiper-4.2.2.min'
	export default {
		data() {
			return {
        content:[
          {
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'长武红苹果'
          },{
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'长武红苹果'
          },{
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'长武红苹果'
          },{
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'长武红苹果'
          },{
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'长武红苹果'
          },{
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'长武红苹果'
          }

        ],
        type:[
          {
            url:require('../../../static/images/syMarket/jkly.png'),
            name:'粮油副食'
          },{
            url:require('../../../static/images/syMarket/life.png'),
            name:'生活用品'
          },
          {
            url:require('../../../static/images/syMarket/xiuxian.png'),
            name:'休闲食品'
          },
          {
            url:require('../../../static/images/syMarket/drink.png'),
            name:'酒水茶饮'
          },
          {
            url:require('../../../static/images/syMarket/zhubao.png'),
            name:'珠宝首饰'
          },
          {
            url:require('../../../static/images/syMarket/box.png'),
            name:'服鞋箱包'
          },
          {
            url:require('../../../static/images/syMarket/baojian.png'),
            name:'保健护理'
          },
          {
            url:require('../../../static/images/syMarket/muying.png'),
            name:'母婴用品'
          },
          {
            url:require('../../../static/images/syMarket/book.png'),
            name:'书刊杂志'
          },
          {
            url:require('../../../static/images/syMarket/all.png'),
            name:'全部分类'
          }],
        goodsList:[
          {
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'商品名称农家纯天然无公害商品名称农家纯天然无',
            price:25.80,
            point:176
          },
          {
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'商品名称农家纯天然无公害商品名称农家纯天然无',
            price:25.80,
            point:176
          },
          {
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'商品名称农家纯天然无公害商品名称农家纯天然无',
            price:25.80,
            point:176
          },
          {
            unionIcon:'https://pwcn-test.oss-cn-beijing.aliyuncs.com/union/1/0102c649d4e51b24cc4ce95776fb178d2e183ce8.jpeg',
            unionName:'商品名称农家纯天然无公害商品名称农家纯天然无',
            price:25.80,
            point:176
          }
        ]
      }
		},
		created() {
      this.$header.setTitle('善源商场')
		},
    mounted(){
      this.$nextTick(function () {
        var mySwiper2 = new swiper('.swiper-container2',{
                spaceBetween :24,
                slidesPerView : 1.1,
        })
      })
    },
		methods: {},
		components: {}
	}
</script>

<style lang="scss" scoped>
.syMarket{
  overflow: hidden;
  .goods-footer{
    text-align: center;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(227,227,227,1);
    line-height:1.12rem;
    width: 100%;
    height:1.12rem;
    background:rgba(250,250,250,1);
  }
  .yp{
    width: 1.1rem;
    height: 0.47rem;
    position: absolute;
    left: 0;
    top:0;
  }
  .goods-item{
    text-align: justify;
    height:0.8rem;
    font-size:0.26rem;
    padding:0.21rem 0 0.2rem 0;
    color:rgba(75,75,75,1);
    line-height:0.4rem;
  }
  .goods-div:nth-of-type(2n){
    margin-left: 0.3rem;
  }
  .goods-div{
    position: relative;
    float: left;
    width: 3.3rem;
    height: 2.41+1.84rem;
  }
  .goods-img{
    width: 3.3rem;
    height: 2.31rem;
  }
  .small-number{
    height:0.42rem;
    font-size:0.3rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:0.42rem;
  }
  .number{
    height:0.42rem;
    font-size:0.3rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:0.42rem;
  }
  .goods-price{
    height:0.24rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
    line-height:0.24rem;
  }
  .more-list{
    padding:0.48rem 0 0.1rem;
    overflow: hidden;
    margin: 0 0.3rem;
  }
  .go-more{
    float: right;
    padding-right: 0.38rem;
    background: url(../../../static/images/common/arrow2.png) no-repeat right center;
    background-size: contain;
    font-size:0.26rem;
    font-weight: 300;
    height: 0.38rem;
    margin-top:0.145rem;
    color:rgba(148,148,148,1);
    line-height:0.38rem;
  }
  .more{
    float: left;
    height:0.67rem;
    font-size:0.48rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:0.67rem;
  }
  .click-div:nth-of-type(1),
  .click-div:nth-of-type(2),
  .click-div:nth-of-type(3),
  .click-div:nth-of-type(4),
  .click-div:nth-of-type(5){
    margin-bottom:0.49rem;
  }
  .click-div:nth-of-type(5),.click-div:nth-of-type(10){
    margin-right: 0rem;
  }
  .click-div:nth-of-type(1),.click-div:nth-of-type(6){
    margin-left: 0.13rem;
  }
  .click-div{
    float: left;
    /*width: 20%;*/
    margin-right: 0.6rem;
  }
  .click-p{
    text-align: center;
  }
  .click-img{
    display: block;
    margin: 0 auto;
    margin-bottom: 0.15rem;
    width: 0.8rem;
    height: 0.8rem;
  }
  .clickList{
    margin: 0 0.3rem;
    padding-top: 0.4rem;
    overflow: hidden;
    padding-bottom: 0.43rem;
  }
  .banner{
    margin-top: 0.4rem;
    padding-left: 0.3rem;
  }
  .item-slide{

    height: 100%;
    width: 100%;
  }
  .swiper-container2{
    height: 3.2rem;
    img{
      height: 100%;
      width: 100%;
    }
  }
}
</style>
