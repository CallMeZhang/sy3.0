<template>
    <!--<div id="index" :class="{'iphone10-paddingTop':iphoneX}" class="index-box">-->
    <!--<div id="index" class="index-box">
      &lt;!&ndash; 顶部搜索 &ndash;&gt;
      <div class="index-top header-paddingTop iphone10-paddingTop">
        <div class="flex item-center">
          <div class="logo">
            <img :src="imgUrl+'/common/logo2.png'" alt="">
          </div>
          <div class="flex-1 search font28 relative" @click="appOpen('search',{keyWord:placeholder})">
            <input type="text" :placeholder="placeholder">
            <img :src="imgUrl+'/search/search@2x.png'" alt="" class="absolute search-img">
          </div>
          <div class="sign" @click="$toast('暂无功能')">
            <img :src="imgUrl+'/index/gift.png'" alt="">
          </div>
        </div>
      </div>
      &lt;!&ndash; 联盟 &ndash;&gt;
      <div class="alliance">
        <div :style="{backgroundImage:'url('+topBg+')'}" class="alliance-bg">
          <div class="bg-con">
            <div class="flex item-center alliance-con">
              <div class="person-1">
                <div class="color4b">集结员工人数</div>
                <div class="color2e font30">11,288,888</div>
              </div>
              <div class="line"></div>
              <div class="person-2">
                <div class="color4b">邀请益客人数</div>
                <div class="color2e font30">112,888,888</div>
              </div>
              <div class="line"></div>
              <div class="performance">
                <div class="flex item-center">
                  <div>
                    <div class="color4b">上周扶贫成绩</div>
                    <div class="color2e font30">超越5%的联盟</div>
                  </div>
                  <div class="go-detail" @click="$toast('暂无功能')">
                    <img :src="imgUrl+'/common/arrow2.png'" alt="">
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 最优推荐 &ndash;&gt;
      <div class="best">
        <div class="best-con">
          <div class="slide-con">
            <div class="slide-item" v-for="item in 4">
              <img :src="imgUrl+'/index/top-bg.png'" alt="">
            </div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 导航 &ndash;&gt;
      <div class="nav">
        <div class="flex nav-box">
          <div class="nav-item">
            <img :src="imgUrl+'/index/town.png'" alt="">
            <div class="nav-text color2e">故乡特产</div>
          </div>
          <div class="nav-item">
            <img :src="imgUrl+'/index/poor.png'" alt="">
            <div class="nav-text color2e">贫困户自营</div>
          </div>
          <div class="nav-item">
            <img :src="imgUrl+'/index/code.png'" alt="">
            <div class="nav-text color2e">扶贫码专区</div>
          </div>
          <div class="nav-item">
            <img :src="imgUrl+'/index/collectivity.png'" alt="">
            <div class="nav-text color2e">单位集采</div>
          </div>
          <div class="nav-item">
            <img :src="imgUrl+'/index/shop.png'" alt="">
            <div class="nav-text color2e">善源商场</div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 快报 &ndash;&gt;
      <div class="news">
        <div class="flex news-box">
          <div class="news-left">
            <img :src="imgUrl+'/common/logo2.png'" alt="">
          </div>
          <div class="news-con">

          </div>
          <div class="news-more">
            <img :src="imgUrl+'/common/arrow2.png'" alt="">
          </div>
        </div>
      </div>
      &lt;!&ndash; 精选 &ndash;&gt;
      <div class="choiceness">
        <div class="i-title">
          <div class="flex between">
            <div class="w-700 font48 color2e">劳动节精选</div>
            <div class="i-title-right">
              <div class="flex between" @click="$toast('暂无功能')">
                <div class="font26 color94">查看更多</div>
                <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
              </div>
            </div>

          </div>
        </div>
        <div class="choiceness-box">

          <div class="choiceness-con border-bottom-1px">
            <div class="flex">
              <div class="c-left-img">
                <img :src="imgUrl+'/index/top-bg.png'" alt="">
              </div>
              <div class="c-right-img flex-1">
                <div class="clearfix">
                  <div class="fl c-top-img">
                    <img :src="imgUrl+'/index/top-bg.png'" alt="">
                  </div>
                  <div class="fr c-top-img">
                    <img :src="imgUrl+'/index/top-bg.png'" alt="">
                  </div>
                </div>
                <div class="c-bottom-img">
                  <img :src="imgUrl+'/index/top-bg.png'" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 发现优品 地域优品 &ndash;&gt;
      <div class="area">
        <div class="i-title">
          <div class="flex between">
            <div class="w-700 font48 color2e">发现优品</div>
            <div class="i-title-right">
              <div class="flex between" @click="$toast('暂无功能')">
                <div class="font26 color94">更多县域优品</div>
                <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
              </div>
            </div>
          </div>
        </div>
        <div class="area-box">
          <div class="area-con">
            <div class="slide-con">
              <div class="slide-item" v-for="item in 4">
                <img :src="imgUrl+'/index/top-bg.png'" alt="">
              </div>

            </div>
          </div>
          <div class="goods-box">
            <div class="goods-item border-bottom-1px" v-for="item in 5">
              <div class="clearfix">
                <div class="goods-desc fl">
                  <div class="goods-title no-enter2">
                    <span class="goods-tip">可集采</span>
                    <span class="w-700 font32">我想建一个酒厂，让家乡千亩杨死大法师梅发挥更多价值</span>
                  </div>
                  <div class="goods-text w-300 color4b no-enter2">让茶汤给你asdf飒飒辅导费撒地方最好的反馈，香甜审反馈，香甜反馈，香甜反馈......</div>
                </div>
                <div class="goods-img fr">
                  <img :src="imgUrl+'/index/top-bg.png'" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 扶贫先锋 &ndash;&gt;
      <div class="person">
        <div class="i-title">
          <div class="flex between">
            <div class="w-700 font48 color2e">扶贫先锋</div>
          </div>
        </div>
        <div class="person-box">
          <div class="person-con">
            <div class="slide-con">
              <div class="slide-item" v-for="item in 4">
                <img :src="imgUrl+'/index/top-bg.png'" alt="">
              </div>
            </div>
          </div>
          <div class="bottom-line">
            <div class="border-bottom-1px"></div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 助农推荐榜&ndash;&gt;
      <div class="peasant">
        <div class="peasant-box">
          <div class="i-title">
            <div class="flex between">
              <div class="w-700 font48 color2e">助农推荐榜</div>
              <div class="i-title-right">
                <div class="flex between" @click="$toast('暂无功能')">
                  <div class="font26 color94">更多故乡特产</div>
                  <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
                </div>
              </div>
            </div>
          </div>
          <div class="good-item-box">
            <div class="goods-box">
              <div class="goods-item border-bottom-1px" v-for="item in 5">
                <div class="clearfix">
                  <div class="goods-desc fl">
                    <div class="goods-title no-enter2">
                      <span class="goods-tip">可集采</span>
                      <span class="w-700 font32">我想建一个酒厂，让家乡千亩杨死大法师梅发挥更多价值</span>
                    </div>
                    <div class="goods-text w-300 color4b no-enter2">让茶汤给你asdf飒飒辅导费撒地方最好的反馈，香甜审反馈，香甜反馈，香甜反馈......</div>
                  </div>
                  <div class="goods-img fr">
                    <img :src="imgUrl+'/index/top-bg.png'" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 精选扶贫项目&ndash;&gt;
      <div class="project">
        <div class="project-box">
          <div class="i-title">
            <div class="flex between">
              <div class="w-700 font48 color2e">精选扶贫项目</div>
              <div class="i-title-right">
                <div class="flex between" @click="$toast('暂无功能')">
                  <div class="font26 color94">查看更多</div>
                  <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="goods-box">
              <div class="goods-item border-bottom-1px" v-for="item in 5">
                <div class="clearfix">
                  <div class="goods-desc fl">
                    <div class="goods-title no-enter2">
                      <span class="goods-tip">可集采</span>
                      <span class="w-700 font32">我想建一个酒厂，让家乡千亩杨死大法师梅发挥更多价值</span>
                    </div>
                    <div class="goods-text w-300 color4b no-enter2">让茶汤给你asdf飒飒辅导费撒地方最好的反馈，香甜审反馈，香甜反馈，香甜反馈......</div>
                  </div>
                  <div class="goods-img fr">
                    <img :src="imgUrl+'/index/top-bg.png'" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      &lt;!&ndash; 公益积分回馈 &ndash;&gt;
      <div class="recommend">
        <div>
          <div class="i-title">
            <div class="flex between">
              <div class="w-700 font48 color2e">公益积分回馈</div>
              <div class="i-title-right">
                <div class="flex between" @click="$toast('暂无功能')">
                  <div class="font26 color94">善源商场</div>
                  <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
                </div>
              </div>
            </div>
          </div>
          <recommend></recommend>
        </div>
      </div>

    </div>-->

  <div class="index-box" id="index">
    <!--<div class="index-top header-paddingTop iphone10-paddingTop">-->
      <indexTitleBar type="1" :text="title" :img="unionLogo" @signOnApp="signIn"></indexTitleBar>
      <!--<div class="flex item-center" style="height:100%">-->
        <!--<div class="sign" >-->
          <!--<img :src="imgUrl+'/index/gift.png'" alt="">-->
        <!--</div>-->
        <!--<div class="flex-1 font36 text-center">-->
          <!--&lt;!&ndash;<div class="top-title no-enter">{{title}}</div>&ndash;&gt;-->
          <!--<input type="text" :placeholder="placeholder">-->
          <!--<img :src="imgUrl+'/search/search@2x.png'" alt="" class="absolute search-img">-->
        <!--</div>-->
        <!--<div class="logo">-->
          <!--&lt;!&ndash;<img :src="imgUrl+'/common/logo2.png'" alt="">&ndash;&gt;-->
          <!--<img :src="imgUrl+'/common/gift.png'" alt="" @click="signIn">-->
        <!--</div>-->
        <!--<div class="right-search" @click="appOpen('search',{keyWord:placeholder})">-->
          <!--<img :src="imgUrl+'/common/search1.png'" alt="" class="">-->
        <!--</div>-->

      <!--</div>-->
      <!--<div class="flex item-center" style="height:100%">
        <div class="logo">
          &lt;!&ndash;<img v-lazy="unionLogo + ossUrl('webp_120')" v-img-cover="unionLogo + ossUrl('webp_120')" alt="">&ndash;&gt;
          <img :src="unionLogo" alt="">
        </div>
        <div class="flex-1 search font28 relative" @click="appOpen('search',{keyWord:''})">
          <span  style="background: rgba(240,240,240,1)">{{placeholder}}</span>
          <img :src="imgUrl+'/search/search@2x.png'" alt="" class="absolute search-img">
        </div>
        <div class="sign" @click="signIn">
          <img :src="imgUrl+'/index/gift.png'" alt="">
        </div>
      </div>-->
    <!--</div>-->
    <!--<div class="header-paddingTop iphone10-paddingTop"></div>-->
    <div v-for="item in slot" :is="item" :data="info" v-if="item != 'themeImage'"></div>

    <div class="index-bottom">
      <bottom></bottom>
    </div>
  </div>

</template>

<script>
  import indexTitleBar from '@/components/common/indexTitleBar.vue'
  import alliance from './alliance'      // 联盟
  import areaGoods from './area'         // 发现优品 地域优品
  import best from './best'              // 最优推荐
  import choiceness from './choiceness'  // 精选
  import indexNav from './nav'           // 导航
  import news from './news'              // 快报
  import peasant from './peasant'        // 助农推荐榜
  import person from './person'          // 助理人
  import project from './project'        // 精选扶贫项目
  import recommend from './recommend'    // 积分回馈 商品推荐
  import bottom from '@/components/common/bottom'    // 积分回馈 商品推荐
  export default {
    components: {themeImage:alliance,qualityGoods:areaGoods,focusList:best,topic:choiceness,navigation:indexNav,newsList:news,recommendGoods:peasant,pioneer:person,recommendProject:project,feedBack:recommend,bottom,indexTitleBar},
    data(){
      return {
        viewType:this.$route.query.viewType,
        info:{
          "unionId": '',
          "unionCode":'',
          "unionName": '',
          "layoutType": '',
          "themeImage": '',//主题图
          "focusList": [],//首焦
          "navigation": [],
          "newsList": [],
          "topic": {//专题
            "name": "",
            "moreName": "",
            "moreLink": "",
            "content":[]
          },
          "qualityGoods": {//优品
            "name": "",
            "moreName": "",
            "moreLink": "",
            "countyList": [],
            "goodsList": []
          },
          "pioneer": '',
          "recommendGoods": {//助农推荐
            "name": "",
            "moreName": "",
            "moreLink": "",
            "goodsList": []
          },
          "recommendProject": {//推荐项目
            "name": "推荐项目",
            "moreName": '',
            "moreLink": "",
            "projectList": []
          },
          "feedBack": {//积分回馈
            "name": "",
            "moreName": "",
            "moreLink": "",
            "goodsList": []
          }
        },
        isLoading: true,
//        iphoneX:false,
        placeholder:'',
        topBg:'',
        dataBack:true,
        module:['themeImage','best','indexNav','news','choiceness','areaGoods','person','peasant','person','project','recommend'],
//        slot:["themeImage","focusList","navigation","newsList","topic","qualityGoods","pioneer","recommendGoods","recommendProject","feedBack"]
        slot:[],
        title:'',
        unionCode:this.$route.query.unionCode,
        unionLogo:'',
      }
    },
    created(){
//      console.log(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0)
//        this.$toast('测试弹框居中',100000)
//      this.$confirm('ssss')
//      this.topBg = this.imgUrl + '/index/top-bg.png'
//      this.iphoneX = this.isIphoneX()
      this.getData();
      this.getHotWord();
//      setInterval(()=>{
////        this.module = ['indexNav','news','peasant','person','project','recommend','alliance','areaGoods','best','choiceness']
////        this.module.sort(()=> Math.random() > 0.5 ? -1 : 1)
//      },5000)
    },
    mounted(){
      try{
        this.$header.show = false
      }catch (e){
        setTimeout(()=>{this.$header.show = false},0)
      }
      window.refreshIndexPage = ()=>{
        this.getData();
      }
      this.syJsbIosRegisterHandler('refreshIndexPage')
    },
    methods: {
      getData(){
        let url = 'layout-center/layoutOpen/index';
        if(this.viewType === 'preview'){
          url += '?viewType=preview&unionCode='+this.unionCode;
          return this.post(url).then(res=>{
            if(res && res.code == 200){
              this.info = res.content;
              this.dataBack = true;
              this.topBg = this.info.themeImage;
              if(this.info.moduleIdx[0] != 'themeImage'){
                this.info.moduleIdx.unshift("themeImage");
              }
              this.slot = this.info.moduleIdx;
              this.title = this.info.unionName || '一起善源';
              this.unionLogo = this.info.unionLogo || this.imgUrl+'/common/about1.png';
            }else{
              this.$toast(res?res.message:'获取数据失败')
            }
            this.$nextTick(()=>{
              this.$loading.show=false
            })
          })
        }
        return this.postWithToken(url).then(res=>{
          if(res && res.code == 200){
            this.info = res.content;
            this.dataBack = true;
            this.topBg = this.info.themeImage;
            if(this.info.moduleIdx[0] != 'themeImage'){
              this.info.moduleIdx.unshift("themeImage");
            }
            this.slot = this.info.moduleIdx;
            this.title = this.info.unionName || '一起善源';
            this.unionLogo = this.info.unionLogo || this.imgUrl+'/common/about1.png';
          }else{
            this.$toast(res?res.message:'获取数据失败')
          }
          this.$nextTick(()=>{
//            this.hideLoading();
            this.$loading.show=false

            setTimeout(()=>{console.log(this.$loading.show)},1000)
          })
        })
      },
      signIn(){
        return this.postWithToken('/user-center/signIn/doSignIn').then(res=>{
          if(res && res.code == 200){
            this.appNotify({callback:'mineRefresh'})
//            this.$toast('原生应该弹框，签到成功');
            res.content.codeUrl= this.imgUrl +'/common/download.png'
            res.content.useUrl= window.location.origin + '/povertyCode'
            res.content.goToUse= '去使用 >'
            res.content.sms= '[一起善源]爱・源于善，要和我一起将扶贫进行到底码？我已坚持了 ' + res.content.totalCountToast.replace(/[^0-9]/ig,"") + ' 天：' + window.location.href
            this.syJsbSignin(res.content)  // 没有签到 原生弹框
          }else if(res && res.code == 420){  // 当天已经签到
            this.appOpen('signOnApp')
          }else if(res && res.code != 403){
            this.$toast('获取数据失败')
          }
        })
      },
      open(item){
        let type = item.linkType + ''; // url类型 1商品 2固定链接 3:文章
        switch (type){
          case '1':
            this.appOpen('goodsDetail',{goodsId:item.linkId});
            break;
          case '2':
            this.appOpen(item.linkUrl,null,true);
            break;
          case '3':
            this.appOpen('letterDetails',{noticeId:item.linkId,where:'article'})
            break;
        }
      },
      getHotWord(){
        return this.get('/ebgoods/hot-word/list/user').then(res=>{
          if(res && res.code == 200){
            this.placeholder = res.data.default.con;
          }
        })
      },

    },


  }
</script>
<style lang="scss" scoped>
  ::-webkit-scrollbar{
    display: none;
    width:0;
    background: transparent;
  }
  $d0: #D0D0D0;
  $red: #FF1919;
  .between{
    justify-content: space-between;
    align-items: center;
  }
  .arrow{
    width:.5rem;
    height:.5rem;
  }
  .i-title{
    padding:0.2rem .3rem .28rem .3rem;
  }
  .goods-box{
    padding:0 .3rem;
    margin-top:-.48rem;
    .goods-item{
      padding:.49rem 0;
      .goods-desc{
        width:4rem;
        .goods-title{
          .goods-tip{
            display: inline-block;
            width:.9rem;
            height:.38rem;
            line-height: .38rem;
            box-sizing: border-box;
            color:$red;
            border:1px solid $red;
            text-align: center;
            border-radius: .04rem;
          }
        }
        .goods-text{
          margin-top:.16rem;
          line-height: .38rem;
        }
      }
      .goods-img{
        width:2.7rem;
        height:1.89rem;
        img{

        }
      }
    }

  }
.index-box{
  /*padding-top:.4rem;*/

  .index-top{
    padding:0 .2rem;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    background: rgba(249,249,249,1);
    z-index: 100;
    .top-title{
      max-width: 4rem;
      margin:0 auto;
    }
    .logo{
      width:1.77rem;
      height:.56rem;
      img{
        width:100%;
        height:100%;
      }
    }
    .right-search{
      height:.56rem;
      width:.56rem;
      img{
        width:100%;
        height:100%;
      }
    }
    .search{
      padding: 0 .14rem;
      height:.64rem;
      span{
        display: inline-block;
        height:100%;
        width:100%;
        line-height: .64rem;
        color:#d0d0d0;
        border-radius: .32rem;
        padding-left:.88rem;
        box-sizing: border-box;
        background:rgba(240,240,240,1)
      }
      .search-img{
        width:.28rem;
        height:.28rem;
        left:.46rem;
        top:50%;
        z-index: 20;
        margin-top:-.14rem;
      }

    }
    .sign{
      width:.5rem;
      height:.5rem;
      img{
        width:100%;
        height:100%;
      }
    }
  }


/*  .alliance{
    .alliance-bg{
      background-size: cover;
      .bg-con{
        padding-top:.95rem;
        padding-bottom:.2rem;
        !*background:linear-gradient(transparent,#fff);*!
        background: #fff;
      }
      .alliance-con{
        justify-content: space-between;
        padding:0 .3rem;
        .line{
          width:1px;
          height:.5rem;
          background:$d0;
        }
        .go-detail{
          width:.44rem;
          height:.44rem;

        }
      }



    }

  }
  .best{
    padding: .2rem 0;
    .best-con{
      width:100%;
      height:3.2rem;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling:touch;
      white-space: nowrap;
      .slide-con{
        overflow: auto;
        .slide-item{
          width:6.7rem;
          height:3.2rem;
          margin-right:.2rem;
          display: inline-flex;
        }
        .slide-item:first-child{
          margin-left:.3rem;
        }
      }
    }
  }
  .nav{
    .nav-box{
      padding:.2rem .3rem;
      justify-content: space-between;
      align-items: center;
      .nav-item{
        text-align: center;
        img{
          width:.8rem;
          height:.8rem;
        }
      }
    }


  }
  .news{
    padding:.2rem .3rem;
    .news-box{
      align-items: center;
      justify-content: space-between;
      padding:.2rem 0;
      background: #FFF8F8;
      .news-left{
        width:1.13rem;
      }
      .news-con{

      }
      .news-more{
        width:.5rem;
        height:.5rem;
      }
    }
  }
  .choiceness{
    padding-bottom:.28rem;
    img{
      display: block;
    }
    .choiceness-box{
      padding:0 .3rem;
    }
    .choiceness-con{
      padding-bottom:.49rem;
      height:100%;
      .c-left-img{
        width:2.3rem;
        img{
          height:3.8rem;
          width:2.3rem;
        }
      }
      .c-right-img{
        padding-left:.1rem;

        .c-top-img{
          width:2.2rem;
          height:2rem;
          img{
            width:2.2rem;
            height:2rem;
          }
        }
        .c-bottom-img{
          margin-top:.1rem;
          img{
            width:100%;
            height:1.7rem;
          }
        }
      }
    }
  }
  .area{
    padding-bottom:.28rem;
    .area-box{
      .area-con{
        width:100%;
        overflow-scrolling: touch;
        -webkit-overflow-scrolling:touch;
        white-space: nowrap;
        .slide-con{
          overflow: auto;
          .slide-item{
            width:3.4rem;
            height:1.3rem;
            margin-right:.1rem;
            display: inline-flex;
          }
          .slide-item:first-child{
            margin-left:.3rem;
          }
        }
      }


    }
  }
  .person{
    padding-bottom:.28rem;
    .person-box{
      .person-con{
        width:100%;
        !*height:3.2rem;*!
        overflow-scrolling: touch;
        -webkit-overflow-scrolling:touch;
        white-space: nowrap;
        .slide-con{
          overflow: auto;
          .slide-item{
            width:2.2rem;
            height:2.8rem;
            margin-right:.2rem;
            display: inline-flex;
            img{
              height:100%;
              width:100%;
            }
          }
          .slide-item:first-child{
            margin-left:.3rem;
          }
        }
      }
      .bottom-line{
        padding:0 .3rem;
        height:.5rem;
        &>div{
          height:.49rem;
        }
      }
    }
  }
  .peasant{
    padding-bottom:.28rem;
  }
  .project{
    padding-bottom:.28rem;
  }*/
}
  .index-bottom{
    /*margin-top:-.2rem;*/
  }
</style>
