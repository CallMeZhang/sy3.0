<template>
  <div class="container_jc">
    <div v-title="'首页'"></div>
    <!--头部轮播图-->
    <div class="banner">
      <div v-if="bannerList.length ===1" class="swiper-container-wx">
        <div class="swiper-wrapper-wx">
          <div class="swiper-slide-wx">
            <a :href="bannerList[0].url"><img :src="bannerList[0].theme_img" alt="正努力加载…"></a>
          </div>
        </div>
      </div>
      <div v-if="bannerList.length !==1" class="swiper-container swiper-container-wx" ref="wxlunbotu_v3">
        <div class="swiper-wrapper swiper-wrapper-wx">
          <div class="swiper-slide swiper-slide-wx" v-for="item in bannerList">
            <a :href="item.url"><img :src="item.theme_img" alt="正努力加载…"></a>
          </div>
        </div>
        <div class="swiper-pagination xiaochangtiao"></div>
      </div>
    </div>
    <div class="line_jc4"></div>
    <!--logo-->
    <div class="logo_content_v3">
      <div class="logo_v3" style="text-align: center"><img :src="imgUrl + '/common/about1.png'" alt="图片正在加载..."></div>
      <div class="title_jcv3">
        <div class="animations_jc">
          <img class="animation_jc_left" :src="imgUrl + '/fx/logo_b_L.png'">
          <!--<img class="animation_jc_left" src="../../../../static/image/weixin/logo_b_L.png">-->
          <img class="animation_jc_right" :src="imgUrl + '/fx/logo_b_R.png'">
          <!--<img class="animation_jc_right" src="../../../../static/image/weixin/logo_b_R.png">-->
        </div>
      </div>
    </div>
    <div class="line_jc"></div>

    <!--明星产品-->
    <div class="mingxing-content">
      <div class="zi_yuan"><div class="title_yuan">明</div><div class="title_yuan">星</div><div class="title_yuan">产</div><div class="title_yuan">品</div></div>
      <a v-for="item in fine_goods" :href="item.goods_url">
        <div class="mxgoods" ><img :src="item.goods_image_url" alt="图片正在加载..."></div>
      </a>
    </div>
    <div class="line_jc"></div>
    <!--一起公益-->
    <!--<div class="yqgy-content">-->
      <!--<div class="zi_yuan"><div class="title_yuan">一</div><div class="title_yuan">起</div><div class="title_yuan">公</div><div class="title_yuan">益</div></div>-->
      <!--<div class="yqgy_item" v-for="article in article_list">-->
        <!--<a :href="article.url">-->
          <!--<div class="yqgy_left"><img :src="article.article_img" alt="图片正在加载..."></div>-->
          <!--<div class="yqgy_right">-->
            <!--<div class="yqgy_title">{{article.article_title}}</div>-->
            <!--<div class="yqgy_time"></div>-->
            <!--<div class="yqgy_text">{{article.article_intro}}</div>-->
          <!--</div>-->
        <!--</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="line_jc5"></div>
    <div class="footer_empty"></div>
    <wx_footer></wx_footer>
  </div>
</template>
<style scoped>
  .container_jc{width: 100%; box-sizing: border-box; margin: 0 auto;background:#fff;}
  .line_jc4{width: 100%;height: 0.4rem;background: #f9f9f9}
  .title_yuan{width: 0.48rem;height: 0.48rem;border-radius: 50%;background: #606060;display: inline-block;margin-right: 0.12rem;font-size: 0.28rem;color: #fff;line-height: 0.48rem;}
  .mingxing-content{width: 100%;background: #fff}
  .zi_yuan{width: 100%;height: 0.5rem;margin:0 auto 0.46rem;padding-top:0.52rem;font-family: PingFangSC-Medium; font-size: 18px; text-align:center;color: #666666; letter-spacing: 0;font-weight: bold;}
  .mxgoods{width: 6.8rem;height: 3.4rem;border-radius:0.2rem;margin:0 auto 0.41rem;box-shadow: 0 0.08rem 0.16rem 0 rgba(0,0,0,0.12)}
  .mxgoods img{width:6.8rem;height: 3.4rem;border-radius:0.2rem; }
  .line_jc{width: 7.5rem;height: 0.2rem;background: #f9f9f9}
  .logo_content_v3 {
    width: 100%;
    height: 1.79rem;
    background: #fff;
  }
  .logo_v3 img {
    width: 0.96rem;
    height: 1rem;
    margin-top: -0.18rem;

  }
  .title_jcv3{
    width: 4rem;
    height: 0.72rem;
    margin: 0rem auto 0;
  }
  .animations_jc{
    width: 4rem;
    height: 0.72rem;
    position: relative;
  }
  .animation_jc_left{
    display: inline-block;
    width: 50%;
    height: 0.72rem;
    position: absolute;
    top:0;
    left: 0;
    animation: myfirst 3s linear;
    -moz-animation: myfirst 3s linear ;	/* Firefox */
    -webkit-animation: myfirst 3s linear ;	/* Safari 和 Chrome */
    -o-animation: myfirst 3s linear ;
  }
  .animation_jc_right{
    display: inline-block;
    width: 50%;
    height: 0.72rem;
    position: absolute;
    top:0;
    right: 0;
    animation: mysecond_jc 3s linear ;
    -moz-animation: mysecond_jc 3s linear ;	/* Firefox */
    -webkit-animation: mysecond_jc 3s linear ;	/* Safari 和 Chrome */
    -o-animation: mysecond_jc 3s linear ;
  }
  @keyframes myfirst
  {
    0%  {transform:translateX(-4rem);}
    100%{transform:translateX(0);}
  }
  @keyframes mysecond_jc
  {
    0%  {transform:translateX(4rem);}
    100%{transform:translateX(0);}
  }
  /*一起公益*/
  .yqgy-content{width: 7.5rem;background: #fff;}
  .yqgy_item{width: 7.5rem;height:2.1rem;padding:0 0.2rem 0.3rem ;box-sizing: border-box;vertical-align: top;}
  .yqgy_left{width: 2.4rem;height: 1.6rem;margin-right: 0.19rem;display: inline-block;vertical-align: top;float: left;}
  .yqgy_left img{width: 100%;height: 100%;border-radius: 0.08rem;border: 0.02rem solid #eee;vertical-align: middle}
  .yqgy_right{width: 4.44rem;height: 1.8rem;display: inline-block;}
  .yqgy_title{width: 4.44rem;height: 0.42rem;line-height: 0.42rem;text-align: left;font-family: PingFangSC-Regular;font-size: 0.3rem;color: #606060;
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .yqgy_time{width: 4.44rem;height: 0.2rem;line-height: 0.4rem;text-align: left;font-family: PingFangSC-Regular;font-size: 0.28rem;color: #808080;margin-bottom: 0.2rem; }
  .yqgy_text{width: 4.44rem;height: 0.66rem;line-height: 0.34rem;font-family: PingFangSC-Regular;font-size: 0.24rem;color: #606060;text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .line_jc5{width: 7.5rem;height: 0.5rem;background: #f9f9f9;}
  .footer_empty{width: 7.5rem;height: 0.96rem;background: #f9f9f9}
</style>
<script>
  import footer from './wx_footer_v3.vue'
  import Swiper from '../../../static/js/swiper-4.2.2.min'
  export default{
    data () {
      return {
        bannerList: [],
        fine_goods:[],
        article_list:[],
      }
    },
    created: function () {
      this.getData()
    },
    updated: function () {
      this.$nextTick(() => {
        this.lunbo ()
      })
    },
    methods: {
      getData () {
        this.$loading.show = false;
        this.get('https://www.17shanyuan.com/api/index.php?act=bocfx&op=wechat_index_v1').then(res => {
          console.log(res)
          this.bannerList = res.content.banner_list;
          this.fine_goods = res.content.fine_goods;
          this.article_list = res.content.article_list
        })
      },
      lunbo () {
        var mySwiper = new Swiper(this.$refs.wxlunbotu_v3, {
          initialSlide: 0,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 2000,
          autoplayDisableOnInteraction: false,
          observer: true,
          observeParents: true,
          loop: true,
          /* paginationBulletRender: function (mySwiper, index, className) {
           return '<span class="' + className + '"><li>' + "</li></span>";
           },*/
        })
      },
    },
    components: {
      'wx_footer': footer
    }

  }
</script>

