<template>
  <div style="height: 100%;">
    <div class="header-paddingTop" style="height: 44px">
      <section class="container_top border-bottom-1px iphone10-paddingTop">
        <aside class="go-back" @click="syJsbCloseAppPage"></aside>
        <div class="search"  slot="middle">
          <div class="wrapper">
            <p class="input" type="text" v-model="keyWord"   @click="focus"></p>
            <span class="search_con" v-if='keyWord!=""' @click="appOpenMode('search',{keyWord:''},1)">{{keyWord}}</span>
            <span class="two" ></span>
          </div>
        </div>
      </section>
    </div>
    <div style="height: 45px;position: relative;">
      <div class="search-list border-bottom-1px" >
        <div class="item" :class="{'item-acrivity':chooseType=='praise'}" @click="chooseSelect('praise')">{{showText}} <span class='item-span1' :class="className1"></span></div>
        <div class="item" :class="{'item-acrivity':chooseType=='help'}" @click="chooseSelect('help')">最需帮扶</div>
        <div class="item" :class="{'item-acrivity':chooseType=='price'}"  @click="chooseSelect('price')">产品价格   <span class='item-span' :class="className"></span></div>
        <div class="item" :class="{'item-acrivity':selectComputed}" @click="shaixuan">筛选 <span class="select" :class="{'select-activity':selectComputed}" style="display:inline-block;width: 0.44rem;position: absolute;top: 0.02rem;right:0.2rem"></span></div>
      </div>
    </div>
    <div style="position: fixed;z-index: 99;width: 100%;height: 100%" v-if="showGood">
      <transition name="fade">
        <div v-if="showGood" class="slider-div-pos" @touchmove.prevent @click="searchGoods">
          <div style="background: #fff;padding-right:0.3rem" @click.stop>
            <div v-for="item in listData" @click="type=item.type;firsttable=item.type;showText=item.text;searchGoods()" class="text-item" :class="{'activity-item':firsttable==item.type}">{{item.text}}</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="top-content" id="content" >
      <div v-if="false"class="advertisement" style="width:6.9rem;height:2rem;background:rgba(218,222,228,1);margin: 0.3rem auto 0.4rem">
        <img v-lazy="" alt="" style="width: 100%;height:100%;">
      </div>

      <ul class="goods-list">
        <li v-for="(item,ind) in goodsListData" class="border-bottom-1px" @click="appOpenMode('goodsDetail',{goodsId:item.goodsId},'1')">
          <div class="li-div">
            <img class="li-img" v-lazy="item.imgUrl+ossUrl('webp_240')" alt="" :key="ind">
            <img v-if="item.isQuality" :src="imgUrl+'/goods/youpin.png'" alt="" style="position: absolute;top: 0;left: 0;width: 0.94rem;">
            <div class="div-right">
              <p class="title" style="-webkit-line-clamp:2;-webkit-box-orient:vertical;"><span style="font-size:0.32rem;color:rgba(255,25,25,1);" v-if="item.isPresell">预售丨</span>{{item.goodsName}}</p>
              <p class="type" >{{item.goodsType==3?'善源甄选':item.goodsType==2?'贫困户自营':''}}</p>
              <p class="money">
                <span class="pay">{{'￥'+item.price}}</span>
                <span class="code" v-if="item.isCanUseCode">扶贫码可用</span>
              </p>
            </div>
          </div>
          <div class="li-footer">
            <span class="poor" v-if="item.isPoorCounty">贫困县 <span v-if="item.countyStr">丨</span></span>
            <span class="address">{{item.countyStr}}</span>
            <span class="apprise"><span class="number">{{item.helpCount>=999?999:item.helpCount}}</span> <span v-if="item.helpCount>=999">+</span> 人帮扶 <span class="number" v-if="!(item.applauseRate=='0%'||item.applauseRate=='0.0%')"><span style="font-weight: normal;">丨</span> {{item.applauseRate}}</span><span v-if="!(item.applauseRate=='0%'||item.applauseRate=='0.0%')">好评</span></span>
          </div>
        </li>
      </ul>

      <div class="footer" v-if="hasNext&&goodsListData.length!=0&&dataLoading">加载中</div>
      <div class="footer" v-if="!hasNext&&goodsListData.length!=0">没有更多产品了</div>
      <div v-if="goodsListData.length==0">
        <div class="_empty" style="height: 100%">
          <aside class="empty_icon"></aside>
          <p class="empty_text">没有找到符合条件的产品<br>请更换筛选条件</p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="show" class="slider-div" @touchmove.prevent @click="show=false"></div>
    </transition>
    <transition name="slider-right">
      <div v-show="show" class="slider-content iphone10-paddingTopBox iphone10-footer-padding34">
        <div class="choose-parent" >
          <!--<div class="choose" v-show="keyWord && catalogVOList.length">-->
            <!--<p class="choose-title">分类</p>-->
            <!--<div class="choose-list">-->
            <!--<span class="list-item" :class="{'list-activity':ite.statue}"-->
                  <!--v-for="ite in catalogVOList " @click="selectTp(item,ite.code)">{{ite.tp}}</span>-->
            <!--</div>-->
          <!--</div>-->
          <div class="choose" v-for="item in selectType ">
            <div class="choose-title"> {{item.ower}}
              <div class="fr"  v-if="item.ownerid == 1" @click="item.showAllList = !item.showAllList">
                <span class="fr all-list-arrow" :class="{'all-list-down':item.showAllList}" ></span>
                <span class="fr font26 color90 all-list-btn" >全部分类</span>
              </div>
            </div>
            <div class="choose-list relative" :style="{height:item.ownerid == 1 && !item.showAllList ? '1rem':'auto'}">
              <span class="list-item" :class="{'list-activity':ite.statue}"
                  v-for="ite in item.items" @click="selectTp(item,ite.code)">{{ite.tp}}</span>
              <div class="absolute show-all-mask" :class="{'show-all-content':item.ownerid == 1 && !item.showAllList}" @click="item.showAllList = !item.showAllList">
              展开<img :src="imgUrl + '/common/arrow_up.png'" alt="">
            </div>
            </div>
          </div>
        </div>
        <div class="choose-footer border-top-1px">
          <button class="choose-item gay ripple" @click="del">清空</button>
          <button class="choose-item red ripple" @click="show=false;searchGoods()">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import * as type from '../../../requests/goodsList'
  export default {
    data() {
      return {
        dataLoading:true,
        firsttable:'',
        defaultCon:'',
        showText:'最佳口碑',
        listData:[{text:'最佳口碑',type:0},{text:'新品优先',type:1},{text:'最多评价',type:2},{text:'最多销量',type:3}],
        keyWord: "",
        show: false,
        showGood:false,
        chooseType: 'praise',
        selectType: [
          {
            ower: "经营者",
            ownerid:'2',
            items: [
//              {
//              tp: "贫困户",
//              code: '2',
//              statue: false
//            },
              {
              tp: "助理人企业",
              code: '1',
              statue: false
            }, {
              tp: "平台自营",
              code: '3',
              statue: false
            },
            ]
          },
          {
            ower: "产地",
            ownerid:'3',
            items: [
              {
              tp: "贫困县",
              code: '1',
              statue: false
            },
              {
              tp: "非贫困地区",
              code: '0',
              statue: false
            }
            ]
          },
          {
            ower: "配送",
            ownerid:'4',
            items: [{
              tp: "全国可发货",
              code: 'all',
              statue: false
            }, {
              tp: "新疆西藏可发货",
              code: 'xinZang',
              statue: false
            }, {
              tp: "宁夏青海可发货",
              code: 'ningQing',
              statue: false
            }, {
              tp: "内蒙古甘肃可发货",
              code: 'mengGan',
              statue: false
            },
            ]
          },
          {
            ower: "特色",
            ownerid:'5',
            items: [{
              tp: "扶贫码可用",
              code: 'canUseCode',
              statue: false
            }, {
              tp: "县域优品",
              code: 'quality',
              statue: false
            },
//            {
//              tp: "善源优品",
//              code: 'pick',
//              statue: false
//            },
              {
              tp: "可供企业集采",
              code: 'groupBuy',
              statue: false
            }
            ]
          },
        ],
        goodsListData:[],
        type:'0',
        isHistory:0,
        isRecommend:0,
        curPage:1,
        getDataDone:true,
        catalogId:"",
        query:this.$route.query.query,
        hasNext:true,
        catalogVOList:{},
      }
    },
    created() {
      if(this.$route.query.keyWord){
        this.keyWord = this.$route.query.keyWord
        this.isHistory = this.$route.query.isHistory
        this.isRecommend = this.$route.query.isRecommend
      }
      this.catalogId = this.$route.query.catalogId||''
      this.catalogIdRoot = this.$route.query.catalogIdRoot||''
//      console.log(this.catalogId)
      this.getHomesList()
      if(this.keyWord){
        this.getCatalog(this.syHomeTownId) // 故乡特产目录id
      }
      type['getListUser']().then(res=>{
        if(res && res.data.code == 200){
          this.defaultCon=res.data.data.default.con;
        }
      })
    },
    computed: {
      selectComputed() {
        for (var i = 0; i < this.selectType.length; i++) {
          for (var j = 0; j < this.selectType[i].items.length; j++) {
            if (this.selectType[i].items[j].statue) {
              return true;
            }
          }
        }
        return false
      },
      className(){
        if(this.type==50){
          return " up-price";
        }else if(this.type==51){
          return " down-price";
        }
      },
      className1(){
        if(this.showGood){
          return " up";
        }else if(this.chooseType=='praise'){
          return " down";
        }
      }
    },
    mounted() {
      this.$header.show=false
      document.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      toTop(){
        document.documentElement.scrollTop=0;
        window.pageYOffset=0;
        document.body.scrollTop=0;
      },
      shaixuan(){
        this.show=!this.show;
        this.showGood=false
      },
      clearKeyword(){
        window.localStorage.setItem("search",'')
        this.syJsbCloseAppPage(1,1)
      },
      fn(){
      },
      handleScroll() {
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        if (offsetHeight - clientHeight - scrollTop <= 5 && this.getDataDone) {
          if(this.hasNext) this.getHomesList()
        }
      },
      initData(){
        this.hasNext=true
        this.getDataDone=true
        this.curPage=1
      },
      focus(){
//        window.localStorage.setItem("search",this.keyWord)
////        this.syJsbCloseAppPage(1,1)
//        this.appOpenMode('search',{keyWord:this.keyWord},1)
        this.appOpenMode('search',{keyWord:this.keyWord},1)
      },
      searchGoods(){
        this.toTop()
        this.showGood=false
        this.initData()
        this.getHomesList()
      },
      getHomesList(){
        if(!this.getDataDone)return;
        this.getDataDone=false;
        let goodsTypeFilter,filterCatalogIds,filterDeliveryTypes,filterSpeciesTypes,isPoorCounty;
        if(this.selectComputed){
          let tmp = this.selectType.find(item=>item.ownerid === '1')
          filterCatalogIds = tmp && tmp.items.filter(item=>item.statue).map(item=>item.code).join(',');
          goodsTypeFilter = this.selectType.find(item=>item.ownerid === '2').items.filter(item=>item.statue).map(item=>item.code).join(',');
          isPoorCounty = this.selectType.find(item=>item.ownerid === '3').items.filter(item=>item.statue).map(item=>item.code).join(',');
          filterDeliveryTypes = this.selectType.find(item=>item.ownerid === '4').items.filter(item=>item.statue).map(item=>item.code).join(',');
          filterSpeciesTypes = this.selectType.find(item=>item.ownerid === '5').items.filter(item=>item.statue).map(item=>item.code).join(',');
        }
        var data = {
          query:this.query || this.keyWord,
          sortType:this.type,
          catalogId:this.catalogId,
          pageNo:this.curPage,
          pageSize:20,
          isHistory:this.isHistory,
          isRecommend:this.isRecommend,
          goodsTypeFilter,
          isPoorCounty,
          filterDeliveryTypes,
          filterSpeciesTypes,
          filterCatalogIds,
        }
//        return ;
//        console.log( type['getHomesList'](data))
//        type['getHomesList'](data).then((res)=>{
//          console.log(res)
//          if(res.data.code==200){
//            this.goodsListData=this.goodsListData.concat(res.data.data.list);
//            this.curPage++
//            this.getDataDone=true
//            this.hasNext = res.data.data.hasNext;
//          }
//          console.log(this.goodsListData)
//        })
        this.getWithToken('/ebgoods/search/homes/list',data).then(res=>{
          this.$loading.show=false
          if(res.code==200){
            if(this.curPage==1){
              this.goodsListData=[]
            }
            this.goodsListData=this.goodsListData.concat(res.data.list);
            this.curPage++
            this.getDataDone=true
            this.hasNext = res.data.hasNext;
          }else{
            this.$toast('获取商品列表失败')
          }
        })
      },
      getCatalog(id){//
        var url = "/ebgoods/catalog/manage/childCatalog";
        this.get(url,{catalogId:id}).then(res=>{
          if(res && res.code == 200){
//            this.catalogVOList = res.data.catalogVO.catalogVOList;
            let data = res.data.catalogVO
            data.ownerid = '1';
            data.ower = '分类';
            data.showAllList = false;
            data.items = data.catalogVOList;
            data.items.forEach(item=>{
              item.tp = item.name
              item.code = item.catalogId
              item.statue = false
            })
            if(this.$route.query.come_form !== 'catalogList'){
              this.selectType.unshift(data)
            }

          }
        })
      },
      del() {
        for (var i = 0; i < this.selectType.length; i++) {
          for (var j = 0; j < this.selectType[i].items.length; j++) {
            this.selectType[i].items[j].statue = false;
          }
        }
      },
      // 筛选确定
      sure(){

      },
      chooseSelect(p) {
        switch (p) {
          case "praise":
            this.chooseType = "praise";
            this.showGood=true
//            this.type=0
            break;
          case "help":
            this.chooseType = "help";
            this.type=4
            this.searchGoods()
            break;
          case "price":
            this.chooseType = "price";
            this.type==50?this.type=51:this.type=50
            this.searchGoods()
            break;
        }
      },
      selectTp(p, c) {
        for (var i = 0; i < this.selectType.length; i++) {
          if (this.selectType[i].ower === p.ower) {
            for (var j = 0; j < this.selectType[i].items.length; j++) {
              if (this.selectType[i].items[j].code === c) {
                this.selectType[i].items[j].statue = !this.selectType[i].items[j].statue
                return;
              }
            }
          }
        }
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss">
  input::-webkit-search-decoration,input::-webkit-search-cancel-button {
    display: none;
  }
  ::-webkit-input-placeholder{
    color:#d0d0d0;
  }
  ::-moz-placeholder,:-ms-input-placeholder,:-moz-placeholder{
    color:#d0d0d0;
  }
  .empty_text{
    font:0.28rem/1.5 "";
    text-align:center;
    color:#D0D0D0;
  }
  ._empty{
    padding-top:2.4rem;
    box-sizing:border-box;
  }
  .empty_icon{
    width: 3.1rem;
    height: 3.1rem;
    margin: 0 auto 0.33rem;
    background: url(/static/images/common/error.png) left top/cover no-repeat;
  }
  .container_top{
    min-height:44px;
    height:44px;
    display:-webkit-flex;
    display:flex;
    -webkit-align-items:center;
    align-items:center;
    background-color:rgba(249,249,249,1);
    position:fixed;
    z-index: 97;
    width: 100%;
  }
  .go-back{
    width:0.88rem;
    height:100%;
    background:url(/static/images/search/goback.png) center center/0.21rem 0.37rem no-repeat;
    flex: 0 1 auto;
  }
  .search_con{
    position: absolute;
    left: 0.88rem;
    top: 0.20rem;
    height: 0.44rem;
    font:0.28rem/0.4rem "";
    color:#fff;
    background-color:#949494;
    border-radius:0.04rem;
    padding-left:0.08rem;
    display:-webkit-flex;
    -webkit-align-items:center;
    align-items:center;
    padding-top:0.02rem;
    line-height: 0.44rem;
  }
  .search_con:after{
    display: inline-block;
    content:"";
    color:#fff;
    background:url("/static/images/search/secrch_dele.png") center center/cover no-repeat;
    width:0.13rem;
    height:0.13rem;
    margin: -0.04rem 0.11rem 0 0.1rem;
    vertical-align: middle;
  }
  .select{
    background: url(../../../../static/images/common/select-black.png) no-repeat right center;
    background-size: 0.44rem;
  }
  .select-activity{
     background: url(../../../../static/images/common/select.png) no-repeat right center;
     background-size: 0.44rem;
   }
  .text-item{
    font-size:0.32rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    background: #fff;
    margin-bottom:0.35rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }
  .item-span1{
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url(../../../../static/images/common/rectangle.png) no-repeat;
    background-position: -3.96rem -0.23rem;
    background-size: 5rem 5rem;
    position: absolute;
    right: 0.01rem;
    top: 30%;
   }
  .item-span{
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url(../../../../static/images/common/rectangle.png) no-repeat;
    background-position: -2.32rem -0.23rem;
    background-size: 5rem 5rem;
  }
  .up{
    background: url(../../../../static/images/common/rectangle.png) no-repeat;
    background-position: -4.49rem -0.23rem;
    background-size: 5rem 5rem;
  }
  .down{
    background: url(../../../../static/images/common/rectangle.png) no-repeat;
    background-position: -0.18rem -0.76rem;
    background-size: 5rem 5rem;
  }
  .up-price{
   background: url(../../../../static/images/common/rectangle.png) no-repeat;
    background-position: -2.87rem -0.23rem;
    background-size: 5rem 5rem;
  }
  .down-price{
    background: url(../../../../static/images/common/rectangle.png) no-repeat;
    background-position: -3.40rem -0.23rem;
    background-size: 5rem 5rem;
     }
  .text-item:nth-of-type(1){
    padding-top: 0.1rem;
  }
  .text-item:nth-of-type(4){
    padding-bottom: 0.33rem;
  }
  .activity-item{
    color: #FF1919;
    background: #fff url(../../../../static/images/common/checked2.png)no-repeat right center;
    background-size: 0.44rem;

  }
  .activity-position{
    position: absolute;
    z-index: 99;
    background: #fff;
  }
  .slider-div-pos{
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 40;
    z-index: 99;
    height: 100%;
  }
  .top-content {
    -webkit-overflow-scrolling: touch;
    /*overflow: hidden;*/
    overflow-y: scroll;
  }

  .search {
    overflow: hidden;
    height: 0.88rem;
    background: rgba(249, 249, 249, 1);
  }

  .wrapper {
    height: 100%;
    position: relative;
  }

  .wrapper > span, .wrapper > p.input {
    float: left;
    display: inline-block;
  }

  p.input {
    margin-top: 0.12rem;
    width: 6.3rem;
    height: 0.64rem;
    background: rgba(240, 240, 240, 1);
    border-radius: 0.32rem;
    box-sizing: border-box;
    padding-left: 0.9rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    color: rgba(203, 203, 203, 1);
    line-height: 0.44rem;
  }

  span {
    height: 100%;
  }

  span.one {
    background: url(../../../../static/images/search/goback.png) no-repeat center center;
    background-size: 0.21rem;
    width: 1rem;
  }

  span.two {
    position: absolute;
    left: 0.14rem;
    width: 0.84rem;
    background: url(../../../../static/images/search/search@2x.png) no-repeat center center;
    background-size: 0.3rem;
  }

  .search-list {
    width: 7.5rem;
    height: 0.9rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background: #fff;
    position: fixed;
    z-index: 97;
  }

  .item {
    position: relative;
    text-align: center;
    flex: 1;
    order: 1;
    font-size: 0.3rem;
    font-weight: 300;
    color: rgba(46, 46, 46, 1);
    line-height: 0.42rem;

  }

  .item-acrivity {
    font-weight: normal;
    color: rgba(255, 25, 25, 1);
  }

  .img-content {
    width: 6.9rem;
    height: 2rem;
    background: rgba(218, 222, 228, 1);
    margin: 0.31rem auto 0;
  }

  .goods-list {
    overflow: hidden;
    padding: 0 0.3rem;
    box-sizing: border-box;
    width: 100%;
  }

  .goods-list > li {
    padding-top: 0.4rem;
    overflow: hidden;
    height: 3.22rem;
    box-sizing: border-box;
  }

  .goods-list > li:nth-last-of-type(1) {
    border: 0;
  }

  .li-div {
    overflow: hidden;
    position: relative;
  }

  .li-img, .div-right {
    float: left;
  }

  .div-right {
    float: left;
    width: 3.9rem;
  }

  .li-div .title {
    font-size: 0.32rem;
    color: rgba(46, 46, 46, 1);
    line-height: 0.45rem;
    width: 3.9rem;
    height: 0.9rem;
    overflow : hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
  }

  .li-div .type {
    margin-top: 0.07rem;
    font-size: 0.24rem;
    font-weight: 300;
    color: rgba(144, 144, 144, 1);
    line-height: 0.33rem;
  }

  .li-img {
    width: 2.7rem;
    height: 1.89rem;
    margin-right: 0.3rem;
  }

  .money {
    position: absolute;
    top: 1.1rem;
    margin-top: 0.26rem;
    overflow: hidden;
    padding: .06rem 0;
  }

  .pay {
    font-size: 0.32rem;
    font-weight: 600;
    color: rgba(255, 25, 25, 1);
    line-height: 0.38rem;
  }

  .code {
    margin-left: 0.2rem;
    font-size: 0.22rem;
    padding: 0 0.1rem;
    font-weight: 300;
    border: 1px solid rgba(255, 25, 25, 1);
    color: rgba(255, 25, 25, 1);
    line-height: 0.36rem;
    height: 0.34rem;
    border-radius: 1.03rem 0.02rem 1.03rem 1.03rem;
    display: inline-block;
    vertical-align: text-bottom;
  }

  .li-footer {
    overflow: hidden;
    width: 100%;
    margin-top: 0.26rem;
    line-height: 0.33rem;
    font-size: 0.24rem;
    color: rgba(144, 144, 144, 1);
  }

  .poor {
    font-weight: 300;
    float: left;
    display: inline-block;
  }

  .address {
    font-weight: 300;
    float: left;
    width: 2.32rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 0.4rem;
    box-sizing: border-box;
    background: url(../../../../static/images/common/local@1.5x.png) no-repeat 0.1rem center;
    background-size: 0.2rem;
  }
.number{
  font-weight: 600;
}
  .apprise {
    font-weight: 300;
    float: right;
  }

  .footer {
    text-align: center;
    background: rgba(250, 250, 250, 1);
    width: 7.5rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.24rem;
    font-weight: 300;
    color: rgba(227, 227, 227, 1);
  }

  .slider-div {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 40;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 98;
  }

  .slider-content {
    width: 5.8rem;
    background: #fff;
    z-index: 99;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
  }

  .choose-parent {
    padding-top:.2rem;
    z-index: 99;
    height: calc(100% - 0.98rem);
    overflow: hidden;
    overflow-y: scroll;
  }

  .choose {
    -webkit-overflow-scrolling: touch;
    padding-left: 0.4rem;
    overflow: hidden;
  }

  .blank {
    height: 0.98rem;
  }

  .choose-title {
    font-size: 0.32rem;
    font-weight: normal;
    color: rgba(46, 46, 46, 1);
    line-height: 0.45rem;
    margin-bottom: 0.33rem;
    margin-top: 0.12rem;

    .all-list-btn{
      line-height: .46rem;
    }
    .all-list-arrow{
      width:.44rem;
      height:.44rem;
      margin-right:.3rem;
      background: url('/static/images/common/arrow_up.png') no-repeat right center;
      background-size: .44rem .44rem;
      transition:transform .2s;
    }
    .all-list-arrow.all-list-down{
      transform: rotate(180deg);
    }
  }

  .choose-list {
    overflow: hidden;
  }
  .show-all-mask{
    bottom:0;
    width:100%;
    height:0;
  }
  .show-all-content{
    text-align: center;
    height:.4rem;
    padding-top:.2rem;
    background-image: linear-gradient(-180deg,rgba(237, 237, 237, 0),#fff 50%);
    &>img{
      /*margin-top:.2rem;*/
      vertical-align: middle;
      /*margin-left:2.25rem;*/
      height:.5rem;
      width:.5rem;
      transform: rotate(-180deg);

    }
  }

  .list-item {
    width: 2.3rem;
    text-align: center;
    display: inline-block;
    line-height: 0.61rem;
    height: 0.6rem;
    border-radius: 0.08rem;
    border: 1px solid #d0d0d0;
    font-size: 0.26rem;
    color: rgba(46, 46, 46, 1);
    margin: 0 0.3rem 0.3rem 0;
  }

  .list-activity {
    border-color: #FF1919;
    color: #FF1919;
  }

  .choose-footer {
    bottom: 0;
    width: 5.8rem;
    height: 0.98rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }

  .choose-item {
    height: 100%;
    text-align: center;
    flex: 1;
    order: 1;
    font-size: 0.3rem;
    color: rgba(255, 255, 255, 1);
    line-height: 0.98rem;
  }

  .gay {
    color: #2E2E2E;
    background: rgba(248, 248, 248, 1);
  }

  .red {
    background: linear-gradient(90deg, rgba(255, 25, 25, 1), rgba(255, 101, 51, 1));
    color: #fff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .slider-right-enter-active, .slider-right-leave-active {
    transition: all .8s;
    /*right: 0;*/
  }

  .slider-right-enter, .slider-right-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    right: -5.8rem;
  }
  .border-bottom-1px:nth-last-of-type(1):after{
    border: 0;

  }
</style>
<style>
  .ripple {
    position: relative;
    overflow: hidden;
  }

  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
  }

  .ripple:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
</style>
