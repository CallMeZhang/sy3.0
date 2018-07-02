<template>
    <div class="company">
      <div v-title="''"></div>
      <!-- 轮播图 -->
      <div class="banner">
        <swiper :options="swiperOption" v-if="true" ref="index_swiper">
          <swiper-slide v-for="(item,index) in swiperSlides" :key="item.content" :class="'swiper'+index">
            <div>
              <img :src="item.content" alt="">
            </div>
          </swiper-slide>
          <div class="swiper-pagination index-pagination" slot="pagination" style="box-sizing: border-box" v-if="swiperSlides.length > 1"></div>
        </swiper>
      </div>
      <!-- 店铺介绍 -->
      <div class="intro">
        <div class="top relative">

          <div class="flex item-center">
            <div class="avatar">
              <img :src="storeInfo.storeLogo" alt="">
            </div>
            <div class="flex-1 color2e relative" style="max-width:4rem;"  @touchstart="touchFn" @touchend="touchendFn">
              <div class="title font30 no-enter2">{{storeInfo.storeName}}</div>
              <div class="absolute store-tip" v-show="touchTip">{{storeInfo.storeName}}</div>
            </div>
            <div class="ver-line"></div>
            <div class="attent">
              <img :src="attent?imgUrl+'/common/heart.png':imgUrl+'/common/empty_heart.png'" alt=""  @click="attent = !attent">
              <div class="color94">12.22万人</div>
            </div>
          </div>
          <div class="text">
            <p class="font26 w-300">
              {{showMore?text:finalText}}
              <span class="more" v-if="text.length > 95 && !showMore" @click="showMore = true"> 查看更多...</span>
              <span class="more" v-if="text.length > 95 && showMore" @click="showMore = false"> 收起</span>
            </p>
          </div>
        </div>
      </div>
      <div class="space border-top-1px"></div>
      <div class="middle">
        <div class="title font30 color4b border-top-1px border-bottom-1px">善企爱心</div>
        <div class="flex middle-con item-center color2e">
          <div class="left flex-1">
            <div><span class="sy-red font32">1.54</span>
              <span> 万人次</span></div>
            <div>回馈爱心人士累计</div>
          </div>
          <div class="ver-line"></div>
          <div class="right flex-1">
            <div><span class="sy-red font32">1.54</span>
              <span> 万人次</span></div>
            <div>商家爱心积分累积</div>
          </div>
        </div>
      </div>
      <div class="space border-top-1px border-bottom-1px"></div>
      <div class="bottom">
        <div class="title font30 color4b">全部商品({{recommendGoods.length}})</div>
        <div class="double_goods" v-show="recommendGoods.length != 0">
          <ul class="lists">
            <li class="double_goods_item" v-for="(item,index) in recommendGoods" @click="appOpenMode('goodsDetail',{goodsId:item.goodsId},1)">
              <aside :class="{double_item_pic:true,youpin:item.isQuality}">
                <img :src="item.imgUrl">
              </aside>
              <section class="double_item_info">
                <h3 class="h3 no-enter2">{{item.goodsName}}</h3>
                <p class="p" v-if="parseInt(item.points)">
                  <span class="large">{{item.points}}</span>积分 +&nbsp;
                  <span class="large">{{item.price | onlyKeepInt}}</span>{{item.price | onlyKeepFloat}}元
                </p>
                <p class="p" v-else>
                  <span class="thin">¥</span>
                  <span class="large">{{item.price | onlyKeepInt}}</span>{{item.price | onlyKeepFloat}}元
                </p>
              </section>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  //import loading from '@/components/'
//  import recommendGoods from "@/components/common/recommendGoods.vue"
  import share from '@/modules/_share/share'
  export default {
//    components: {recommendGoods},
    data(){
      return {
          storeId:this.$route.query.storeId || '3f28acd8b41a4dc98cc739d688a94bbc',
        storeInfo:{},
        active:'three',
        attent:false,
        text:'打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬',
//        text:'23423423423423asdfasdfasdfasd'
        showMore:false,
        swiperOption: {
          initialSlide :0,
          loop: true,
          speed: 400,
          notNextTick:false,
//          autoplay: true,
          autoplay: {
            disableOnInteraction: false,
          },
//          autoplayDisableOnInteraction: false,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: [],
        recommendGoods:[

        ],
        pageNo:1,
        dataDown:true,
        hasNext:true,
        touchTip:false,
        shareData:{},
      }
    },
    created(){
      this.getData()
      this.getGoodsList()
    },
    mounted(){
      try{
        if(this.$route.query.isShare == 'yes'){
          this.$header.show = false;
        }
      }catch(e){

      }
      setTimeout(()=>{
        this.$header.setTitle('店铺页面')
        let data = this.shareData;
        this.$header.rightFn({
          type:'img',
//        rightText:'分享',
          url:this.imgUrl + '/common/share.png',
          callback:()=>{
            this.syJsbShare(this.shareData)
          }
        })
        if(this.$route.query.isShare == 'yes'){
          this.$header.show = false;
        }
      },0)
      this.$scroll(()=>{
        if(!this.dataDown && !this.hasNext) return;
        this.dataDown = false
        this.getGoodsList().then(()=>{
          this.dataDown = true
        })
      })
    },
    methods: {
      touchFn(){
        this.touchTip = true;
      },
      touchendFn(){
        this.touchTip = false;
      },
      getData(){
        return this.post('store-center/storeOpen/storeInfo',{storeId:this.storeId}).then(res=>{
          /*var res = {
            "code": "200",
            "content": {
              "storeInfo": {
                "storeId": "ef93c03da8e24174a3e7cc3537e898ce",//店铺id
                "storeName": "123",//店铺名称
                "ownerName": "123",//店主名称(贫困户姓名|助理人姓名|善企负责人)
                "storeBanner": "http://pwcn-test.oss-cn-beijing.aliyuncs.com/seller_backend/lic/b20dca4a4a958f7ff1be48c95b3752f46c38e044.jpeg",//店铺banner
                "brandLogo": "http://pwcn-test.oss-cn-beijing.aliyuncs.com/seller_backend/lic/5728f9ccdba80aba57df487b28afba2aa6a9f059.jpeg",//品牌logo
                "storeDesc": "12312",//店铺描述
                "storeType": 1,//1助理人,2贫困户,3集采自营,4善企
                "province": "天津市",
                "county": "南开区",
                "storeLogo": null,//店铺logo
                "entName": "12312",//企业名称
                "promotePoorNum": 10,//带动贫困户数(仅助理人返回字段)
                "employPoorNum": 20,//雇佣贫困户数(仅助理人返回字段)
                "diary": 50//日记数(仅助理人返回字段)
              }
            },
            "message": "Request Success",
            "timestamp": "1526463401"
          }*/

          if(res && res.code == 200){
            this.storeInfo = res.content.storeInfo;
            this.text = res.content.storeInfo.storeDesc || '';
            this.swiperSlides = [{content:this.storeInfo.storeBanner || this.imgUrl + '/index/store.png'}]
            this.shareData = {
              title:this.storeInfo.storeName,
              text:this.text.length>20?this.text.substr(0,20):this.text,
              url :window.location.href + '&isShare=yes',
              logo :this.storeInfo.storeLogo || this.imgUrl + '/common/whitebg.jpg',
              sms:''
            }
            this.syJsbShare(this.shareData)
            share(this.shareData)
          }else{
            this.$toast(res?res.message:'获取店铺信息失败')
          }
          this.$loading.show=false
        })
      },
      getGoodsList(){
        return this.get('ebgoods/goods/store/goods-list',{storeId:this.storeId,pageNo:this.pageNo,pageSize:10}).then(res=>{

          if(res && res.code == 200){
            this.recommendGoods = this.recommendGoods.concat(res.data.list)
            if(!res.data.list.length){
              this.hasNext = false
            }
          }else{
            this.$toast(res?res.message:'获取商品列表失败')
          }
          this.pageNo ++
        })
      },
    },
    computed:{
      finalText(){
        if(this.text.length>95){
          return this.text.substr(0,95)
        }else{
          return this.text
        }
      }
    },
    filters:{
      onlyKeepInt(val){
        return parseInt(val);
      },
      onlyKeepFloat(val){
        var n = parseFloat(val).toString().split(".")[1];
        return ( n ? "." + n : "");
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/g-global.scss";
  $e3:#e3e3e3;
  $red:#FF1919;
.company{
  .banner{
    height:2.8rem;
    overflow: hidden;
  }
  .space{
    background: #FAFAFA;
    height:.2rem;
  }
  .intro{
    .top{
      padding:0 .3rem;

      .avatar{
        position: relative;
        width:1.43rem;
        height:1rem;
        img{
          position: absolute;
          left:0;
          top:-.2rem;
          width:1.2rem;
          height:1.2rem;
          z-index:10000;
        }
      }
      .store-tip{
        top:-.3rem;
        left:0;
        /*background: rgba(0,0,0,.7);*/
        background: #fff;
        width:4rem;
        /*color:#fff;*/
        color:#4b4b3b;
        padding: .2rem .2rem;
        border-radius: .1rem;
        font-size: .26rem;
        z-index: 10;
        transform: translate(0,-100%);
        /*box-shadow: ;*/
        box-shadow: 2px 4px 5px rgba(0,0,0,.4);
      }
      .store-tip::after{
        display: block;
        content:'';
        position: absolute;
        left:1.4rem;
        bottom:-.1rem;
        width:.4rem;
        height:.4rem;
        transform: rotate(45deg);
        background: #fff;
        z-index: -2;
        /*height:.2rem;*/
        /*width:.3rem;*/
      }
      .ver-line{
        width:1px;
        height:.62rem;
        background: $e3;
      }
      .attent{
        padding-left:.3rem;
        text-align: center;
        img{
          height:.44rem;
        }
      }

      .text{
        padding-top:.3rem;
        padding-bottom:.4rem;
        p{
          line-height: .44rem;
        }
        .more{
          color:#FF6533;
          font-size: .26rem;
        }
      }
    }
  }
  .middle{
    .title{
      height:.9rem;
      line-height: .9rem;
      padding-left:.3rem;
    }
    .middle-con{
      padding:.3rem;
      .ver-line{
        width:1px;
        height:.44rem;
        background: $e3;
      }
      .right{
        padding-left:.7rem;
      }
    }
  }
  .bottom{
    .title{
      padding:.4rem 0 .4rem .3rem;
    }
  }
}
</style>
