<template>
  <div class="assistant">
    <div v-title="'助理人详情页'"></div>
    <div class="download" id="download">
      <downLoad></downLoad>
    </div>
    <!-- 轮播图 -->
    <div class="banner" ref="aaaa">
      <!--<swiper :options="swiperOption" v-if="true" ref="index_swiper">-->
        <!--<swiper-slide v-for="(item,index) in swiperSlides" :key="item.content" :class="'swiper'+index">-->
          <!--<div>-->
            <!--<img v-lazy="item.content" alt="">-->
          <!--</div>-->
        <!--</swiper-slide>-->
        <!--&lt;!&ndash;<div class="swiper-pagination index-pagination" slot="pagination" style="box-sizing: border-box" ></div>&ndash;&gt;-->
      <!--</swiper>-->
      <div v-if="banner">
        <img v-lazy="banner" alt="">
        <!--<img v-lazy="imgUrl + '/index/store.png'" alt="" v-else>-->
      </div>
    </div>
    <!-- 店铺介绍 -->
    <div class="intro">
      <div class="top relative">

        <div class="flex">
          <div class="avatar">
            <div>
              <img :src="storeInfo.storeLogo?storeInfo.storeLogo+ossUrl('webp_120'):imgUrl + '/store/store_img.jpg'" alt="">
            </div>
          </div>
          <div class="flex-1 color2e relative" style="max-width:4rem;">
            <div class="person title font30">助理人：{{storeInfo.ownerName}}</div>
            <div class="title no-enter" :alt="storeInfo.storeName" @touchstart="touchFn" @touchend="touchendFn"><span style="margin-right:.1rem;">所属企业</span> | <span style="margin-left:.1rem;">{{storeInfo.entName}}</span></div>
            <div class="absolute store-tip" v-show="touchTip">{{storeInfo.entName}}</div>
          </div>
          <div class="ver-line" v-if="false"></div>
          <div class="attent" v-if="false">
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
    <div class="space" ref="cccc"></div>
    <div class="middle">
      <div ref="tab" :class="searchBarFixed ? 'isFixed' :''" :style="{top:searchBarFixed?navHeight+'px':''}">
        <div class="tab flex font30" >
          <div :class="{active:active === 'one'}" @click="active = 'one'">爱心产品</div>
          <div :class="{active:active === 'two'}" @click="active = 'two'">扶贫日记</div>
          <div :class="{active:active === 'three'}" @click="active = 'three'">帮扶带</div>
        </div>
      </div>

    </div>

    <div class="bottom" style="">
      <div style="height:.9rem;" v-show="searchBarFixed"></div>
      <div class="tab-con">
        <div v-show="active === 'one'">
          <div class="left" v-show="pageInfo.one.data.length">
            <div class="box" v-to-top>
              <div class="flex desc">
                <div class="flex-1">
                  <div class="sy-red font28">{{pageInfo.one.allCount}}个</div>
                  <div class="color94">爱心产品</div>
                </div>
                <div class="flex-1">
                  <div class="sy-red font28">{{toFloat(storeInfo.recentSendSpeed)-0}}小时</div>
                  <div class="color94">发货速度</div>
                </div>
                <div class="flex-1">
                  <div class="sy-red font28">{{toFloat(storeInfo.recentRefundRate * 100) - 0 }}%</div>
                  <!--<div class="color94">退款率 <span :class="false?'general':'good'">{{false?ratio:complain}}</span></div>-->
                  <div class="color94">退款率 <span :class="false?'general':'good'"></span></div>
                </div>
                <!--<div class="flex-1">-->
                <!--<div class="sy-red font28">20%</div>-->
                <!--<div class="color94">投诉率 <span :class="false?'general':'good'">{{complain}}</span></div>-->
                <!--</div>-->
              </div>
            </div>
            <div class="list">

              <div class="item" v-for="item in pageInfo.one.data" @click="appOpenMode('goodsDetail',{goodsId:item.goodsId},1)">
                <div class="con border-bottom-1px">
                  <div class="clearfix">
                    <div class="fl item-left">
                      <img v-lazy="item.imgUrl + ossUrl('webp_240')" alt="">
                    </div>
                    <div class="fr item-right">
                      <div class="title font28 color4b">{{item.goodsName}}</div>
                      <div class="middle color94">已获 <span class="sy-red">{{item.helpCount}}</span>次帮扶</div>
                      <div class="bottom font30 color2e">¥{{item.price}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div>{{pageInfo.one.isLoading === true}}</div>-->
              <div class="text-center color94" style="padding-top:.16rem;" v-show="pageInfo.one.data.length >10 && !pageInfo.one.hasNext">没有更多数据了</div>
              <div class="text-center color94" style="padding-top:.16rem;" v-show="pageInfo.one.data.length > 10 && pageInfo.one.isLoading">数据加载中...</div>
            </div>
          </div>
          <div class="text-center no-content" v-if="!pageInfo.one.data.length">
            <img :src="imgUrl+'/common/error.png'" alt="">
            <div class="font28 colord0">暂无爱心产品</div>
          </div>
        </div>
        <div v-show="active === 'two'">
          <div class="center" v-show="pageInfo.two.data.length">
              <div class="center-item" v-for="yearData in pageInfo.two.data">
                <div class="title font28">{{yearData.year}}<span class="w-300 margin-l-3" >共{{yearData.total}}条记录</span></div>
                <div class="month-item" v-for="item in yearData.logList">
                  <div class="title font28">{{item.month}}月<span class="w-300 margin-l-3" >共{{item.total}}条记录</span></div>
                  <div class="item-con" v-for="data in item.logList">
                    <div class="month-top font26">
                      <span class="red-point"></span>
                      <span class="margin-l-3 color94 w-300">{{data.createAt}}</span>
                      <span class="" style="color:#FF6533;margin-left:.2rem;">{{data.logType | logType}}</span>
                    </div>
                    <div class="month-bottom">
                      <div class="cont">
                        <div class="inner" v-show="data.logType != 4">
                          <div class="clearfix" v-if="data.logType == 0" @click="appOpen('poverty',{poorId:data.poorId})">  <!-- 带自营 -->
                            <div class="fl left-m">
                              <img v-lazy="data.avatarUrl +  ossUrl('webp_120')" alt="" v-img-cover="data.avatarUrl">
                            </div>
                            <div class="fl right-m">
                              <div class="title">姓名：{{data.name}} 性别：{{data.sex}} </div>
                              <div class="title">身份证号：{{data.idCardNumber}}</div>
                            </div>
                          </div>
                          <div class="clearfix" v-if="data.logType == 1" @click="appOpenMode('goodsDetail',{goodsId:data.goodsId},1)">  <!-- 发布爱心产品 -->
                            <div class="fl left-m">
                              <img v-lazy="data.goodsImgUrl + ossUrl('webp_240')" alt="" v-img-cover="data.goodsImgUrl + ossUrl('webp_240')">
                            </div>
                            <div class="fl right-m">
                              <div class="title no-enter2">{{data.goodsName}}</div>
                              <!--<div class="title"></div>-->
                            </div>
                          </div>
                          <div class="t-diary" v-if="data.logType == 2">  <!-- 扶贫日志 -->
                            <!--<p class="font28 color4b">{{}}</p>-->
                            <!--<div v-html="data.content"></div>-->
                            <div class="font30 color2e" v-if="data.title">{{data.title}}</div>
                            <div class="guide relative" :style="{height:data.showAll?'auto':'2.8rem'}">
                              <div v-for="v in data.content">
                                <div v-if="v && v.type == 'text'">
                                  <div v-for="text in v.value">
                                    <div v-html="text" style="padding:.1rem 0;"></div>
                                  </div>
                                </div>
                                <div v-if="v && v.type == 'img'">
                                  <div v-for="i in v.value">
                                    <img v-lazy="i + ossUrl('webp_480')" alt="" >
                                  </div>
                                </div>
                              </div>
                              <div v-if="typeof data.content === 'string'">
                                <div v-html="data.content"></div>
                              </div>
                              <!--<div style="height:.5rem;" v-show="true"></div>-->
                              <div class="absolute show-all-mask" :class="{'show-all-content':true}" @click="data.showAll = !data.showAll">
                                <span>{{data.showAll?'收起':'展开'}}</span>
                                <img :src="imgUrl + '/common/arrow_up.png'" alt="" :style="{transform:!data.showAll?'rotate(180deg)':'rotate(0)'}">
                              </div>
                            </div>
                            <!--<div>asdfasdfasddfasdd阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯顿撒地方阿斯达斯蒂芬</div>-->
                            <!--<div class="clearfix diary-img">-->
                            <!--<div class="fl"  v-for="img in 4">-->
                            <!--<img v-lazy="imgUrl+'/test/milk.jpg'" alt="" v-img-cover="imgUrl+'/test/milk.jpg'">-->
                            <!--</div>-->
                            <!--</div>-->
                          </div>
                          <div class="clearfix" v-if="data.logType == 3">  <!-- 帮增收 -->
                            <div class="fl left-m">
                              <img v-lazy="data.avatarUrl" alt="" v-img-cover="data.avatarUrl">
                            </div>
                            <div class="fl right-m">
                              <div class="title">姓名：{{data.name}} 性别：{{item.sex}} </div>
                              <div class="title">身份证号：{{item.idCardNumber}}</div>
                              <div class="title">雇佣类型：{{item.employType | employType}}</div>
                              <div class="title" v-if="item.employDay">雇佣天数：{{item.employDay}}天</div>
                              <div class="title" v-else>雇佣天数：0天</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item-con"></div>
                </div>
              </div>
              <div class="text-center color94" style="padding-top:.16rem;" v-show="pageInfo.two.data.length >5 && !pageInfo.two.hasNext">没有更多数据了</div>
              <div class="text-center color94" style="padding-top:.16rem;" v-show="pageInfo.two.curPage > 2 && pageInfo.two.isLoading">数据加载中...</div>
            </div>


          <div class="text-center no-content" v-if="!pageInfo.two.data.length">
            <img :src="imgUrl+'/common/error.png'" alt="">
            <div class="font28 colord0">暂无扶贫日记信息</div>
          </div>
        </div>
        <div v-show="active === 'three'">
          <div class="right" v-show="poorInfo.length || pageInfo.three.data.length">
            <div class="right-top" v-show="poorInfo.length">
              <div class="title font30 color4b border-bottom-1px">带动贫困户自营</div>
              <div class="caption flex font30 color2e">
                <div class="">贫困户</div>
                <div class="">上架产品数</div>
                <div class="">总营收额</div>
              </div>
              <div class="person-list clearfix font28" v-for="item in poorInfo">
                <div class="people">
                  <img v-lazy="item.avatarUrl" alt="">
                  <span>{{item.name}}</span>
                </div>
                <div class="">{{item.goodsAmount || '0'}}</div>
                <div class="">¥{{item.sales || '0'}}</div>
              </div>
            </div>
            <div class="space border-top-1px border-bottom-1px" v-show="pageInfo.three.data.length"></div>
            <div class="right-bottom" v-show="pageInfo.three.data.length">
              <div class="title font30 color4b border-bottom-1px">帮贫困户增收</div>
              <div class="poverty-list">
                <div class="poverty-item" v-for="k in pageInfo.three.data">
                  <div class="clearfix">
                    <div class="fl img-box">
                      <img v-lazy="k.avatarUrl" alt="" v-img-cover="k.avatarUrl">
                    </div>
                    <div class="fl right-desc font28 color4b">
                      <div class="">姓名：{{k.payInfo[0].name}} <span style="margin-left:.2rem;">性别：{{k.sex}}</span></div>
                      <div class="">身份证号：{{k.idCardNumber}}</div>
                    </div>
                  </div>
                  <div class="particular font26">
                    <div class="border-bottom-1px">
                      <div class="particular-title clearfix">
                        <div class="title-item">增收类型</div>
                        <div class="title-item">增收金额</div>
                        <div class="title-item">时间</div>
                      </div>
                    </div>
                    <div class="particular-content clearfix w-300 " v-for="item in k.payInfo">
                      <div class="con-item color94">{{item.type | employType}}</div>
                      <div class="con-item sy-red">¥{{ item.paymentAmount }}</div>
                      <div class="con-item color94">{{item.createAt.split(' ')[0]}}</div>
                    </div>
                  </div>
                </div>
                <div class="text-center color94" style="padding-top:.16rem;" v-show="pageInfo.three.data.length > 10 && !pageInfo.three.hasNext">没有更多数据了</div>
                <div class="text-center color94" style="padding-top:.16rem;" v-show="pageInfo.three.curPage > 1 && pageInfo.three.isLoading">数据加载中...</div>

              </div>
            </div>
          </div>
          <div class="text-center no-content" v-if="!poorInfo.length && !pageInfo.three.data.length">
            <img :src="imgUrl+'/common/error.png'" alt="">
            <div class="font28 colord0">暂无帮扶信息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
  import share from '@/modules/_share/share'
  import downLoad from "@/components/common/downLoad.vue"
  export default {
    components: {downLoad},
    data(){
      return {
        storeId:this.$route.query.storeId || '',
        storeInfo:{},
        active:'one',
//        banner:this.imgUrl + '/index/store.png',
        banner:'',
        attent:false,
        touchTip:false,
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
//        text:'打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬打四大发送到发送到阿斯顿法师打发斯蒂芬啊司法所打的费阿斯顿发顺丰大飒飒地方阿斯顿发斯蒂芬',
        text:'',
        showMore:false,
        searchBarFixed:false,
        tabOffsetTop:0,
        ratio:'一般',
        complain:'良好',
        pageInfo:{
          one:{
            getDateDone:true,
            curPage:1,
            ajax:'getGoodsList',
            hasNext:true,
            url:'ebgoods/goods/store/goods-list',
            data:[],
            pageSize:20,
            type:'get',
            isLoading:true,
            allCount:'',
          },
          two:{
            getDateDone:true,
            curPage:1,
            ajax:'getDiaryList',
            hasNext:true,
            url:'store-center/help-assist-guide/user/log/list',
            data:[],
            type:'getWithToken',
            isLoading:true,
          },
          three:{
            getDateDone:true,
            curPage:1,
            ajax:'getHelpList',
            hasNext:true,
            url:'store-center/help-assist-guide/user/pay/info',
            data:[],
            type:'getWithToken',
            isLoading:true,
          }
        },
        navHeight:'',
        recommendGoods:[],
        adminId:'',
        poorInfo:[],
        shareData:{},
        isShare:'',
      }
    },
    created(){
      this.isShare = /isShare=yes/ig.test(window.location.href)
      this.getData().then(()=>{
        this.getPoorInfo()
      })
      this.getGoodsList()
//      this.getDiaryList()

//      this.nativeAlert({
//        alertTitle:'标题',
//        alertDesc:'alert描述',
//        alertOk:'确认',
//        alertCancel:'取消',
//        okCallBackJs:'nativeAlertOk',
//        cancelCallBackJs:'nativeAlertCancel'
//      })
    },
    mounted(){
      try{
        if(this.isShare){
          this.$header.show = false;
        }
      }catch(e){
        setTimeout(()=>{
          if(this.isShare){
            this.$header.show = false;
          }
        },0)
      }
      setTimeout(()=>{
//        this.$header.setTitle('店铺页面')
        this.$header.rightFn({
          type:'img',
//        rightText:'分享',
          url:this.imgUrl + '/common/share.png',
          callback:()=>{
            this.syJsbShare(this.shareData)
          }
        })
        if(this.isShare){
          this.$header.show = false;
        }
      },0)



//      this.swiperSlides = [
//        {content:'https://gdp.alicdn.com/imgextra/i1/3580384160/TB2WasHiDlYBeNjSszcXXbwhFXa_!!3580384160.jpg'},
//        {content:'https://gdp.alicdn.com/imgextra/i1/3580384160/TB2WasHiDlYBeNjSszcXXbwhFXa_!!3580384160.jpg'},
//        {content:'https://gdp.alicdn.com/imgextra/i1/3580384160/TB2WasHiDlYBeNjSszcXXbwhFXa_!!3580384160.jpg'},
//        {content:'https://gdp.alicdn.com/imgextra/i1/3580384160/TB2WasHiDlYBeNjSszcXXbwhFXa_!!3580384160.jpg'},
//      ]
//      setTimeout(()=>{this.swiperSlides.push({content:'https://gdp.alicdn.com/imgextra/i1/3580384160/TB2WasHiDlYBeNjSszcXXbwhFXa_!!3580384160.jpg'})},500)
//      this.$nextTick(()=>{
//        [].slice.apply(document.querySelectorAll('.swiper-slide')).forEach((el)=>{
//          el.onclick=()=>{
//            this.appOpen(this.swiperSlides[el.getAttribute('data-swiper-slide-index')].url,null,true)  // orderId:this.storeId,
//          }
//        })
//      })
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
          if(res && res.code == 200){
            if(this.isShare && (res.content.storeInfo.status == 5)){  // 被查封
              this.appOpen('failure',{},false,false,true)
              return;
            }
            this.storeInfo = res.content.storeInfo;
            this.text = res.content.storeInfo.storeDesc || '';
//            this.swiperSlides = [{content:this.storeInfo.storeBanner || this.imgUrl + '/index/store.png'}]
            this.banner  = this.storeInfo.storeBanner ? this.storeInfo.storeBanner + this.ossUrl('webp_480') : this.imgUrl + '/index/store.png'
            this.$header.setTitle(this.storeInfo.storeName)
            let url = window.location.href;
            this.shareData = {
              title:'[爱・源于善] 介绍位来自'+this.storeInfo.province+'扶贫一线的助理人给你认识',
              text:this.text?this.text.length>30?this.text.substr(0,30):this.text:'一起善源 精准扶贫',
              url :this.isShare?url:url + '&isShare=yes',
              logo :this.storeInfo.storeLogo || this.imgUrl + '/common/whitebg.jpg',
              sms:'[一起善源]爱・源于善，您的好友向您推荐来自扶贫一线的助理人，点击查看扶贫特产：' + /isShare=yes/ig.test(window.location.href)?url:url + '&isShare=yes'
            }
            share(this.shareData)
            this.$nextTick(()=>{
              this.navHeight = this.$header.$el.clientHeight
              this.tabOffsetTop = this.$refs.tab.offsetTop;
              this.$handleScroll((scroll,bottom)=>{
                if(scroll > this.tabOffsetTop - this.navHeight){
                  this.searchBarFixed = true
                }else{
                  this.searchBarFixed = false
                }
                if(bottom ==0){
                  this.getType(this.active)
//                  if(this.active != 'one'){
////                    this[this.pageInfo[this.active]['ajax']]()
//                    this.getType(this.active)
//                  }
                }
              })
            })

          }else{
            this.$toast(res?res.message:'获取店铺信息失败')
            if(this.isShare == 'yes'){
              this.appOpen('failure',{},false,false,true)
            }
          }
          this.hideLoading();
          this.$loading.show=false
        })
      },
      getType(type){
        if(!this.pageInfo[type].getDateDone || !this.pageInfo[type].hasNext) return;
        this.pageInfo[type].getDateDone = false;
        this.pageInfo[type].isLoading = true;
         this[this.pageInfo[type].type](this.pageInfo[type].url,{storeId:this.storeId,adminId:this.storeId,pageNo:this.pageInfo[type].curPage,pageSize:this.pageInfo[type].pageSize || 10}).then(res=>{
          this.$nextTick(()=>{
            this.pageInfo[type].getDateDone = true;
            this.pageInfo[type].isLoading = false;
          })
          if(res && res.code == 200){
            this.pageInfo[type].curPage ++;
              let tmp = []
              if(this.active == 'one'){
                tmp = res.data.list
                this.pageInfo[type].allCount = res.data.allCount
              }else {
                tmp = res.data.result
              }
              if(!tmp.length){
                this.pageInfo[type].hasNext = false;
                this.pageInfo[type].isLoading = false;
              }
              if(this.active == 'two'){
                tmp.forEach(item=>{
                  item.logList.forEach(k=>{
                    k.logList.forEach(t=>{
                      t.showAll = false;
                      if(t && t.content && t.logType == 2){
                        try{
                          t.content = typeof t.content === 'string'? JSON.parse(t.content):t.content;
                        }catch (e){

                        }
                      }
                    })
                  })
                })
                if(!this.pageInfo[type].data.length){
                  this.pageInfo[type].data = tmp
                  return
                }
                this.pageInfo[type].data = this.pageInfo[type].data.concat(tmp)
                this.pageInfo[type].data = this.merge(this.pageInfo[type].data, 'year','logList');
                this.pageInfo[type].data.forEach(item=>{
                  item.logList = this.merge(item.logList, 'month','logList');
                })

                tmp = [];
              }
              this.pageInfo[type].data = this.pageInfo[type].data.concat(tmp)

          }else{
            this.$toast(res?res.message:'获取信息失败')
            this.pageInfo[type].hasNext = false;
          }
//          this.pageInfo[type].hasNext = false;

        })

      },
      // 获取爱心产品列表
      getGoodsList(){
//        return this.get('ebgoods/goods/store/goods-list',{storeId:this.storeId}).then(res=>{
//
//          if(res && res.code == 200){
//            this.recommendGoods = res.data.list || []
//          }else{
//            this.$toast(res?res.message:'获取商品列表失败')
//          }
//        })
        this.getType('one')
      },
      getDiaryList(){
        this.getType('two')
      },
      getHelpList(){
        this.getType('three')
      },
      getPoorInfo(){
        return this.getWithToken('store-center/help-assist-guide/user/poor/info',{adminId:this.storeId}).then(res=>{
          if(res && res.code == 200){
            this.poorInfo = res.data.result
          }else{
            this.$toast(res?res.message:'获取贫困户自营信息失败')
          }
        })
      },
      merge(array, key,mergeKey){
        if (!array.length) {
          return []
        }
        var result = [JSON.parse(JSON.stringify(array[0]))];
        for (var i = 1; i < array.length; i++) {
          var item = array[i];
          var repeat = false;
          for (var j = 0; j < result.length; j++) {
            if (item[key] === result[j][key]) {
              repeat = true;
              result[j][mergeKey] = result[j][mergeKey].concat(item[mergeKey])
              break;
            }
          }
          if(!repeat){
            result = result.concat(item)
          }
        }
        return result;
      },

      jsonParse(str){
        return JSON.parse(str)
      }
    },
    watch:{
      active(val){
        if(val !== 'one'){
          this.getType(val)
        }
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
      employType(v){
        let t ={ '0':'其他','1':'雇佣劳动','2':'雇佣技术', '3':'租用土地', '4':'租用房屋'}
        return t[v+'']
      },
      logType(v){
        let t ={ '0':'带动贫困户自营','1':'发布爱心产品','2':':扶贫日志', '3':'帮助贫困户增收', '4':'入驻平台'}
        return t[v+'']
      },
      jsonParse(str){
        return JSON.parse(str)
      }
    },


  }
</script>

<style lang="scss" scoped>

$e3:#e3e3e3;
$red:#FF1919;
.assistant{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .banner{
    height:2.8rem;
    overflow: hidden;
    img{
      width:100%;
      height:2.8rem;
    }
  }
  .space{
    background: #FAFAFA;
    height:.2rem;
  }
  .colord0{
    color:#D0D0D0;
  }
  .no-content{
    padding-top:.6rem;
    img{
      width:2rem;
      margin-bottom:.3rem;
    }
  }
  .intro{
    /*margin-top:-.1rem;*/
    border-bottom:1px solid $e3;
    .top{
      padding:0 .3rem;

      .avatar{
        position: relative;
        width:1.43rem;
        height:1rem;
        &>div{
          background: #fff;
          padding:3px;
          position: absolute;
          left:0;
          top:-.2rem;
          width:1.2rem;
          height:1.2rem;
          z-index: 90;
          img{
            width:100%;
            height:100%;
          }
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
        box-shadow: 2px 4px 5px #888;
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
      .title{
        padding-top:.1rem;
      }
      .ver-line{
        width:1px;
        height:.62rem;
        background: $e3;
      }
      .attent{
        padding-left:.3rem;
        /*box-sizing: border-box;*/
        text-align: center;
        img{
          height:.44rem;
          width:.44rem;
          display: block;
          margin:0 auto;
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
    .tab{
      box-sizing: border-box;
      border-bottom: 1px solid $e3;
      border-top: 1px solid $e3;
      background: #fff;
      /*padding:0 .3rem;*/
      height:.9rem;
      line-height: .9rem;
      justify-content: space-around;
      align-items: center;
      &>div{
        height:100%;
        padding:0 .3rem;
      }
      &>div.active{
        box-sizing: border-box;
        color:$red;
        border-bottom:2px solid $red;
      }
    }
    .isFixed{
      position:fixed;
      width:100%;
      top:0;
      z-index:999;
    }
  }
  .bottom{
    .left{
      padding:.3rem 0;
      .box{
        padding:0 .3rem;
      }
      .desc{
        background:rgba(255,248,248,1);
        border:1px dashed $red;
        border-radius: .08rem;
        padding:.22rem .3rem;
      }
      .general{
        color:#FF6533
      }
      .good{
        color:#70A460;
      }
      .list{
        padding-left:.3rem;
        .item{
          .con{
            padding:.4rem 0;
            .item-left{
              width:2.5rem;
              height:1.75rem;
              img{
                height:100%;
                width:100%;
              }
            }
            .item-right{
              width:4.1rem;
              padding-right:.3rem;
              .title{
                line-height: .4rem;
              }
              .middle{
                margin-top:.16rem;
              }
              .bottom{
                margin-top:.28rem;
              }
            }
          }
        }
      }
    }
    .center{
      padding:.2rem 0 .2rem .3rem;
      .margin-l-3{
        margin-left:.3rem;
      }
      .colorff6{
        color:#FF6533;
      }
      .center-item{
        padding-top:.3rem;
        .month-item{
          padding-top:.3rem;
          .title{
            padding-left:.1rem;
          }
          .item-con{
            padding-top:.3rem;
            .month-top{
              .red-point{
                margin-left:.2rem;
                display: inline-block;
                height:.2rem;
                width:.2rem;
                background: $red;
                border-radius: 50%;
                box-shadow: 0 0 .14rem 1px $red;
              }
            }
            .month-bottom{
              .cont{
                padding:.18rem 0 .1rem .29rem;
                .inner{
                  padding:.18rem 0;
                  border-left:1px solid $red;
                  .left-m{
                    margin-left:.58rem;
                    width:1.4rem;
                    height:.98rem;
                    img{
                      width:100%;
                      height:100%;
                    }
                  }
                  .right-m{
                    width:4.4rem;
                    margin-left:.2rem;
                  }
                  .t-diary{
                    .guide{
                      height: 2.8rem;
                      padding-bottom:.6rem;
                      overflow: hidden;
                      .show-all-mask{
                        bottom:0;
                        left:0;
                        width:100%;
                        /*padding-top:.06rem;*/
                        text-align: center;
                        height:.5rem;
                        padding-top:.3rem;
                        /*box-sizing: border-box;*/
                        /*background-image: linear-gradient(-180deg,rgba(237, 237, 237, 0),#fff 50%);*/
                        background:linear-gradient(180deg,rgba(238,238,238,0),rgba(255,255,255,1) 50%);
                        &>img{
                          height:.5rem;
                          width:.5rem;
                          transform: rotate(180deg);
                          transition: transform .2s;
                          vertical-align: middle;
                        }
                      }
                    }
                    padding-left:.58rem;
                    padding-right:.3rem;
                    p{

                    }
                    .diary-img{
                      padding:.2rem .3rem .2rem 0;
                      &>div{
                        height:1.64rem;
                        width:1.64rem;
                        margin-right:.1rem;
                        margin-bottom:.1rem;
                      }
                    }
                    img{
                      width:100%;
                      height:100%;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .right{
      padding-bottom:.8rem;
      .right-top{
        padding-left:.3rem;
        padding-bottom:.2rem;
        .title{
          height:.9rem;
          line-height: .9rem;
        }
        .caption{
          justify-content: space-around;
          padding:.3rem 0;
        }
        .person-list{
          padding:.2rem 0;
          &>div{
            float: left;
            width:33.33%;
            text-align: center;
          }
          .people{
            text-align: left;
            img{
              width:.5rem;
              height:.5rem;
              border-radius: 50%;
              vertical-align: middle;
            }
            span{
              margin-left:.1rem;
            }
          }
        }
      }
      .right-bottom{
        padding-left:.3rem;
        .title{
          height:.9rem;
          line-height: .9rem;
        }
        .poverty-list{
          .poverty-item{
            padding-top:.5rem;
            padding-right:.3rem;
            .img-box{
              width:1.4rem;
              height:.98rem;
            }
            .right-desc{
              width:5.2rem;
              margin-left:.2rem;
            }
            .particular{
              margin-top:.3rem;
              padding:.2rem .3rem;
              background: #FFF8F8;
              border: 1px dashed #FF6533;
              border-radius:.08rem;
              .particular-title,.particular-content{
                &>div{
                  width:33.33%;
                  float: left;
                  text-align: center;
                  height:.48rem;
                  line-height: .48rem;
                }
              }
              .particular-content{
                padding-top:.1rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
