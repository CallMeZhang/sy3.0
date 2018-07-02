<template>
  <div class="poverty">
    <div v-title="''"></div>
    <div class="download" id="download">
      <downLoad></downLoad>
    </div>
    <div v-show="false">
      <img :src="item + ossUrl('webp_480')" alt="" v-for="item in swiperSlides">
    </div>
    <div class="banner relative" :style="{height:swiperSlides.length?'':'auto'}">
      <swiper :options="swiperOption" ref="index_swiper" v-if="swiperSlides.length">
        <swiper-slide v-for="(item,index) in swiperSlides" :key="item" :class="'swiper'+index" >
          <div class="img-box">
            <img :src="item + ossUrl('webp_480')" alt="" v-img-contain="item + ossUrl('webp_480')" @error="imgError($event)">
          </div>
        </swiper-slide>
        <div class="swiper-pagination index-pagination" slot="pagination" style="box-sizing: border-box" v-show="swiperOption.length > 1"></div>
      </swiper>
      <div v-if="!swiperSlides.length">
        <img v-lazy="imgUrl + '/index/store.png'" alt="">
      </div>
      <div class="absolute reason">{{info.povertyReason}}</div>
    </div>

    <div class="intro">
      <div class="p-top">
        <div class="flex item-center" style="justify-content:space-between">
          <div class="avatar">
            <img :src="info.personPhoto?info.personPhoto + ossUrl('webp_120'):imgUrl + '/store/store_img.jpg'" alt="" v-img-cover="info.personPhoto + ossUrl('webp_120')" style="border-radius: 50%">
          </div>
          <!--<div class="flex-1 p-intro" style="max-width:4rem;">-->
          <div class="flex-1 p-intro" style="max-width:5rem;">
            <div class="p-name color2e font30">{{info.poorName}}</div>
            <div class="p-address no-enter color90">{{info.pAddr1}}・{{info.pAddr2}}・{{info.pAddr3}}</div>
          </div>
          <div class="p-info" @click="isPersonInfoShow = true" style="padding-right:0">
            <img :src="imgUrl+'/common/person.png'" alt="">
            <div class="color90">个人资料</div>
          </div>
          <div class="ver-line" v-if="false"></div>
          <div class="attent" v-if="false">
            <img :src="attent?imgUrl+'/common/heart.png':imgUrl+'/common/empty_heart.png'" alt=""
                 @click="attent = !attent;$toast('即将开通')">
            <div class="color94">{{info.supporterCount}}人</div>
          </div>
        </div>
        <div class="clearfix color90 p-top2" v-if="info.supportedAmount">
          <div class="fl"><span>已获得帮扶</span><span class="sy-red">¥{{(info.supportedAmount/100)}}</span></div>
          <div class="fr">
            <span class="">公益配额</span>
            <span
              class="color4b">¥{{info.isSoldiersFamily == 1 ? 6000 * (info.familyMemberNum || 1) : 3000 * (info.familyMemberNum || 1)}}</span>
          </div>
        </div>
        <!--<div>{{ parseInt(info.supportedAmount / (info.isSoldiersFamily == 1? 6000 * (info.familyMemberNum || 1):3000 * (info.familyMemberNum || 1))) }}</div>-->
        <div class="rate-box" v-if="info.supportedAmount">
          <process-rate
            :rate="parseInt(info.supportedAmount / (info.isSoldiersFamily == 1? 6000 * (info.familyMemberNum || 1):3000 * (info.familyMemberNum || 1)))"></process-rate>
        </div>
        <div class="p-bottom color4b w-300" v-if="info.supportedAmount">
          公益配额=3000元/人·年*人口数（军烈属6000元/人·年)
        </div>
      </div>

    </div>
    <div class="p-content">
      <div class="space border-top-1px border-bottom-1px" v-if="info.content"></div>
      <!--<div class="media">-->
      <!--<div class="p-img"></div>-->
      <!--<div class="m-text font28 color4b">-->
      <!--运营后台编辑，无信息不显示，运营后台编辑，无信息不显示，运营后台编辑，无信息不显示，运营后台编辑，无信息不显示，运营后台编辑，无信息不显示。-->
      <!--</div>-->
      <!--<div class="img-bot">-->
      <!--<img src="" alt="">-->
      <!--</div>-->
      <!--</div>-->
      <div class="media" v-if="info.content">
        <!--<div v-html="info.content"></div>-->
        <div v-for="v in info.content">
          <div v-if="v && v.type == 'text'">
            <div v-for="text in v.value">
              <div v-html="text"></div>
            </div>
          </div>
          <div v-if="v && v.type == 'img'">
            <div v-for="i in v.value">
              <img v-lazy="i + ossUrl('webp_480')" alt="">
            </div>
          </div>
        </div>
        <div v-if="typeof info.content === 'string'">
          <!--<div v-html="info.content"></div>-->
        </div>
      </div>
      <div class="space border-top-1px border-bottom-1px" v-if="info.content"></div>
      <div class="p-goods" v-if="recommendGoods.length">
        <div class="p-title border-bottom-1px font30 color2e">爱心产品</div>
        <div class="goods-list">
          <div class="goods-item" v-for="item in recommendGoods">
            <div class="good-con border-bottom-1px">
              <div class="clearfix">
                <div class="fl goods-img">
                  <img v-lazy="item.imgUrl +  ossUrl('webp_240')" alt="" v-img-cover="item.imgUrl + ossUrl('webp_240')">
                </div>
                <div class="fr goods-intro">
                  <div class="goods-name font28 color4b">
                    {{item.goodsName}}
                  </div>
                  <div class="p-sku color94">已获 <span class="sy-red">{{item.helpCount}}</span>次帮扶</div>
                  <div class="buy-box">
                    <div class="clearfix">
                      <div class="fl font30">¥{{item.price}}</div>
                      <div class="fr font24 buy " @click="appOpenMode('goodsDetail',{goodsId:item.goodsId},1)">立即帮扶</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-evaluate" v-if="goodsEvalList.length">
        <div class="p-title border-bottom-1px font30 color2e">最新评价</div>
        <div class="detail">
          <div class="item" v-for="item in goodsEvalList">
            <div class="con border-bottom-1px">
              <div class="clearfix">
                <div class="left fl">
                  <img v-lazy="item.mHeadImg?item.mHeadImg + ossUrl('webp_120'):imgUrl + '/store/store_img.jpg'" alt="头像" class="avatar">
                </div>
                <div class="right ">
                  <div class="right-top flex">
                    <div class="name">{{item.mName}}</div>
                    <div class="star">
                      <img :src="imgUrl + '/common/star.png'" alt="" v-for="item in item.evalLevel">
                    </div>
                  </div>
                  <div>{{item.evalDesc}}</div>
                  <div class="evaluate-img">
                    <img v-lazy="v + ossUrl('webp_240')" alt="" v-for="v in item.evalImgs">
                  </div>
                  <div class="bottom flex space-between">
                    <div class="color94 flex-1 no-enter">购买了’<span style="color:#FF6533">{{item.goodsName}}</span>‘
                    </div>
                    <div style="padding-left:.2rem;">{{item.createdAt}}</div>
                  </div>
                  <div class="reply color94" v-if="item.isRecommend">
                    <span class="reply-person color4b">{{info.poorName}}回复：</span>{{item.storeReply}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center no-content" v-if="!recommendGoods.length && !goodsEvalList.length">
      <img :src="imgUrl+'/common/error.png'" alt="">
      <div class="font28 colord0">暂无帮扶信息</div>
    </div>


    <transition name="fade2">
      <div class="mask" style="z-index: 100" v-show="isPersonInfoShow" @click="isPersonInfoShow= false"></div>
    </transition>
    <transition name="slide-up">
      <div class="slide-p-intro" v-show="isPersonInfoShow">
        <div class="p-close" @click.stop="isPersonInfoShow= false">
          <img :src="imgUrl+'/common/x.png'" alt="">
        </div>
        <div class="s-title font32 color4b border-bottom-1px text-center">贫困户资料</div>
        <div class="p-box" @touchmove.stop>
          <div class="p-tip">以下数据由当地政府扶贫办提供</div>
          <div class="info-item font26 color4b no-enter">
            <span>{{info.poorName}}</span>
            <span>{{info.memberSex}}</span>
            <span>{{info.memberAge}}</span>
          </div>
          <div class="info-item font26 color4b no-enter">
            <span>身份证号</span>
            <span>{{info.idCode}}</span>
          </div>
          <div class="info-item font26 color4b no-enter">
            <span>联系电话</span>
            <span>{{info.phoneNum}}</span>
          </div>
          <div class="info-item font26 color4b no-enter">
            <span>家庭住址</span>
            <span>{{info.pAddr1}}</span>
            <span>{{info.pAddr2}}</span>
            <span>{{info.pAddr3}}</span>
            <span>{{info.pAddr4}}</span>
            <span>{{info.pAddr5}}</span>
            <span>{{info.pAddr6}}</span>
          </div>
          <div class="info-item font26 color4b no-enter">
            <span>家庭人数</span>
            <span>{{info.familyMemberNum || '1'}}</span>
          </div>
          <div class="info-item font26 color4b no-enter">
            <span>人均年收入</span>
            <span>{{info.incomeYearPerPerson / 100}}元/年</span>
          </div>
          <div class="p-detail color4b" v-show="info.poorIntro || info.poorWish || info.overcomePovertyPlan">
            <div class="d-con border-top-1px">
              <p v-if="info.poorIntro">家庭情况：{{info.poorIntro}}</p>
              <p v-if="info.poorWish">心愿诉求：{{info.poorWish}}</p>
              <p v-if="info.overcomePovertyPlan">脱贫计划：{{info.overcomePovertyPlan}}</p>
            </div>
            <!--<div class="d-con border-top-1px">-->
              <!--<p>{{info.poorIntro}}</p>-->
              <!--<p>{{info.poorWish}}</p>-->
              <!--<p>{{info.overcomePovertyPlan}}</p>-->
              <!--<div v-html="info.content"></div>-->
              <!--<div v-for="v in info.content">-->
              <!--<div v-if="v && v.type == 'text'">-->
              <!--<div v-for="text in v.value">-->
              <!--<div v-html="text"></div>-->
              <!--</div>-->
              <!--</div>-->
              <!--<div v-if="v && v.type == 'img'">-->
              <!--<div v-for="i in v.value">-->
              <!--<img v-lazy="i" alt="" >-->
              <!--</div>-->
              <!--</div>-->
              <!--</div>-->
              <!--<div v-if="typeof info.content === 'string'">-->
              <!--&lt;!&ndash;<div v-html="info.content"></div>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->

          </div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
  import processRate from '@/components/common/progressRate'
  //  import webPay from '@/modules/webPay/webPay'
  import share from '@/modules/_share/share'
  import downLoad from "@/components/common/downLoad.vue"
  export default {
    components: {processRate,downLoad},
    data(){
      return {
          poorId: this.$route.query.poorId || '',
        storeId: this.$route.query.storeId || '',
        attent: false,
        isPersonInfoShow: false,
        info: {},
        recommendGoods: [],
        swiperOption: {
          initialSlide: 0,
          loop: true,
          speed: 400,
          notNextTick: false,
//          autoplay: true,
          autoplay: {
            disableOnInteraction: false,
          },
//          autoplayDisableOnInteraction: false,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: [],
        a: {name: [{aa: 53453}]},
        goodsEvalList: [],
        shareData: {},
      }
    },
    created(){
//      this.hideHeader();
//      this.hideLoading();
//      console.log(this.poorId + '====' + this.storeId)
      if(!this.poorId){
        this.getPoorId().then(()=>{
          this.init();
        })
      }else if(!this.storeId){
        this.getStoreId().then(()=>{
          this.init();
        })
      }else{
        this.init()
      }

    },
    mounted(){
      try {
        if (this.$route.query.isShare == 'yes') {
          this.$header.show = false;
        }
      } catch (e) {
        setTimeout(()=>{
          this.$header.show = false;
        },0)
      }
//      location.href = 'http://192.168.1.43:8080/assistant'
//       setTimeout(() => {
// //        this.$header.setTitle('店铺页面')
//         let data = this.shareData
//         this.$header.rightFn({
//           type: 'img',
// //        rightText:'分享',
//           url: this.imgUrl + '/common/share.png',
//           callback: () => {
//             this.syJsbShare(data)
//           }
//         })
//
//         if (this.$route.query.isShare == 'yes') {
//           this.$header.show = false;
//         }
//       }, 0)

//      var d =  [
//        "https://cdnres.17shanyuan.com/data/upload/syrs/poor/05246834758361264.jpeg",
//        "https://cdnres.17shanyuan.com/data/upload/syrs/poor/05246834819753078.jpeg",
//        "https://cdnres.17shanyuan.com/data/upload/syrs/poor/05246834842787532.jpeg"
//      ]
//      setTimeout(()=>{
//        this.swiperSlides = d
//      },1000)

        this.$nextTick(()=>{
          if (this.$route.query.isShare == 'yes') {
            this.$header.show = false;
          }
          this.imgCat();
        })
      window.onload = ()=>{
        this.imgCat();
      }
//      this.imgCat();

    },
    methods: {
      init(){
        this.getData();
        this.getGoodsList();
        this.getGoodsEvalList();
      },
      imgCat(){
        let rep = () => {
          try{
            let dom0 = document.querySelectorAll('.swiper0');
            dom0[1].innerHTML = dom0[0].innerHTML;
            let dom1 = document.querySelectorAll('.swiper' + (this.swiperSlides.length-1));
            dom1[0].innerHTML = dom1[1].innerHTML;
          }catch(e){}
        }
        rep();
        setTimeout(()=>{rep()},2000);
        setTimeout(()=>{rep()},4000);
      },
      imgError(e){
//        console.log(e)
        e.target.setAttribute('lazy','error')
      },
      getPoorId(){
        return this.post('store-center/storeOpen/storeInfo',{storeId:this.storeId}).then(res=>{
          if(res && res.code == 200){
            this.poorId = res.content.storeInfo.poorId
          }else{
//            this.$toast(res?res.message:'获取贫困户id失败')
          }
        })
      },
      getStoreId(){
        return this.post('store-center/storeOpen/storeInfo',{poorId:this.poorId}).then(res=>{
          if(res && res.code == 200){
            this.storeId = res.content.storeInfo.storeId
          }else{
//            this.$toast(res?res.message:'获取店铺id失败')
          }
        })
      },
      getData(){
        return this.get('/union-center/poor/info', {poorId: this.poorId, clientType: 'H5'}).then(res => {
          if (res && res.code == 200) {
            this.info = res.content;
            try {
              this.info.content = JSON.parse(this.info.content)
            } catch (e) {

            }
//            console.log(this.info.content)
            this.swiperSlides = this.info.boardImages;


//            if (!this.swiperSlides || !this.swiperSlides.length) {
//              this.swiperSlides = [this.imgUrl + '/index/store.png']
//            }
            this.$header.setTitle('贫困户' + this.info.poorName)

          } else {
            if(this.isShare == 'yes'){
              this.appOpen('failure',{},false,false,true)
            }
            this.$toast(res ? res.message : '获取贫困户失败，请刷新')
          }
          this.$loading.show = false

        })
      },
      // 获取爱心产品列表
      getGoodsList(){
        return this.get('ebgoods/goods/store/goods-list', {
          storeId: this.storeId,
          pageNo: 1,
          pageSize: 100
        }).then(res => {

          if (res && res.code == 200) {
            this.recommendGoods = res.data.list || []
          } else {
//            this.$toast(res ? res.message : '获取商品列表失败')

          }
          setTimeout(() => {
            if (this.recommendGoods.length) {
              this.shareData = {
                title: '[爱・源于善] 自营增收努力脱贫，为这位来自'+this.info.pAddr3+'的贫困户点个赞',
                text: '老乡正在努力销售'+this.recommendGoods.length+'件产品，一起来添一份力吧',
                url: window.location.href + '&isShare=yes',
                logo: this.recommendGoods[0].imgUrl,
                sms: '[一起善源]爱・源于善，您的好友向您推荐了来自国家级贫困县' + this.info.pAddr3 + '的贫困户，点击查看：' + window.location.href + '&isShare=yes'
              }
            } else {
              this.shareData = {
                title: '[爱・源于善] 了解贫困户，了解偏远乡村现状，分享也是爱',
                text: '我们或许不能改变世界，但可以伸出援助之手，哪怕只能帮助一个人也好',
                url: window.location.href + '&isShare=yes',
                logo: this.info.personPhoto || this.imgUrl + '/common/whitebg.jpg',
                sms: '[一起善源]爱・源于善，您的好友向您推荐了来自国家级贫困县' + this.info.pAddr3 + '的贫困户，点击查看：' + window.location.href + '&isShare=yes'
              }
            }
              this.$header.rightFn({
                type: 'img',
                url: this.imgUrl + '/common/share.png',
                callback: () => {
                  this.syJsbShare(this.shareData)
                }
              })

            share(this.shareData)
          }, 200)
        })
      },
      // 获取评价列表
      getGoodsEvalList(){
        return this.get('order-center/evaluate/goodsEvalList', {
          storeId: this.storeId,
          curPage: 1,
          pageSize: 5,
          queryType: 'best'
        }).then(res => {
          if (res && res.code == 200) {
            this.goodsEvalList = res.data.evaluationList
          } else {
//            this.$toast(res ? res.message : '获取评价信息失败')
          }
        })
      },
    },


  }
</script>

<style lang="scss" scoped>
  $e3: #e3e3e3;
  $red: #FF1919;
  .poverty {
    height: 100%;
    .p-top4 {
      padding-top: .4rem;
    }
    .p-top3 {
      padding-top: .3rem;
    }
    .p-top2 {
      padding-top: .2rem;
    }
    .p-title {
      height: .88rem;
      line-height: .88rem;
      padding-left: .3rem;
    }
    .colord0 {
      color: #D0D0D0;
    }
    .space {
      background: #FAFAFA;
      height: .2rem;
    }
    .banner {
      height: 3.97rem;
      overflow: hidden;
      .img-box {
        height: 3.97rem;

        img {
          height: 3.97rem;
          width: 100%;
        }
      }
      .reason {
        right: .2rem;
        bottom: .28rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.04rem;
        height: .4rem;
        line-height: .4rem;
        padding: 0 .24rem;
        color: #fff;
        z-index: 90
      }
    }
    .intro {
      padding: .3rem;
      .p-top {
        .avatar {
          width: 1.2rem;
          height: 1.2rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .p-intro {
          padding-left: .2rem;
        }
        .p-info {
          text-align: center;
          padding-right: .24rem;
          img {
            width: .44rem;
          }
        }
        .ver-line {
          width: 1px;
          height: .62rem;
          background: $e3;
        }
        .attent {
          padding-left: .3rem;
          text-align: center;
          img {
            height: .44rem;
          }
        }
        .rate-box {
          padding: .2rem 0;
        }
      }
    }
    .media {
      max-height:1000px;
      overflow-y: scroll;
      padding: .3rem;
      .p-img {
        height: 3.4rem;
        background: pink;
      }
      .m-text {
        padding: .3rem 0;
      }
      .img-bot {
        height: 1.64rem;
        background: pink;
      }
    }
    .goods-list {
      .goods-item {
        padding-left: .3rem;
        .good-con {
          padding: .3rem .3rem .3rem 0;
          .goods-img {
            width: 1.4rem;
            height: .98rem;
          }
          .goods-intro {
            width: 5.3rem;
            margin-left: .2rem;
            .buy-box {
              padding-top: .3rem;
              .buy {
                padding: 0.03rem .17rem;
                color: $red;
                border: 1px solid $red;
                box-sizing: border-box;
                border-radius: .08rem;
              }
            }

          }
        }

      }
    }
    .p-evaluate {
      .detail {
        padding-left: .3rem;
        .item {
          .con {
            padding: .4rem 0 .33rem 0;
            .left {
              .avatar {
                height: .7rem;
                width: .7rem;
                border-radius: 50%;
              }
            }
            .right {
              padding-left: 1rem;
              padding-right: .3rem;
              .right-top {
                justify-content: space-between;
                .star img {
                  width: .28rem;
                }
              }
              .evaluate-img {
                padding: .2rem 0 .25rem 0;
                img {
                  height: 1.64rem;
                  margin-right: .1rem;
                }
              }
              .reply {
                background: #F0F0F0;
                padding: .14rem .2rem;
                border-radius: .04rem;
                margin-top: .2rem;
                .reply-person {

                }
              }
            }
          }
        }
      }
    }
    .slide-up-enter-active, .slide-up-leave-active {
      transition: all .5s
    }
    .slide-up-enter, .slide-up-leave-to {
      transform: translate(0, 100%);
    }
    .no-content {
      padding-top: .6rem;
      img {
        width: 2rem;
        margin-bottom: .3rem;
      }
    }

    .slide-p-intro {
      height: 7.9rem;
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: #fff;
      z-index: 100;
      .p-close {
        position: absolute;
        right: .12rem;
        top: .12rem;
        z-index: 102;
        img {
          width: .44rem;
          height: .44rem;
        }
      }
      .s-title {
        /*position: absolute;*/
        height: 1.28rem;
        /*width:100%;*/
        line-height: 1.28rem;
      }
      .p-box {
        height: 6.6rem;
        overflow-y: scroll;
      }
      .p-tip {
        padding: .24rem .3rem .24rem .5rem;
        color: #FF6533;
      }
      .info-item {
        padding-left: .5rem;
        line-height: .44rem;
      }
      .p-detail {
        padding-left: .3rem;
        .d-con {
          padding: .3rem .2rem;

        }
      }
    }

  }
</style>
