<template>
    <div class="union-info" >
      <div style="height: 100%;overflow: auto;" ref="as">
        <downLoad></downLoad>
      <div class="banner" :style="'position:relative'" id="banner">
        <img  v-lazy="content.unionBanner+ossUrl('webp_960')" alt="" style="width: 100%;height: 100%;position: absolute;z-index: 10">
        <div v-show="isShare" class="iphone10-paddingTop" :style="'height:44px;width: 100%;position: fixed;background-color: rgba(249, 249, 249,'+headerNavOpacity+');z-index:999'">
          <div class="union-header" id="titleBar" :style="">
            <div class="back union-img" @click="syJsbCloseAppPage()" :class="{'imgBgBack':share}" :style="'opacity:'+Math.abs(0.5-headerNavOpacity)*2 "></div>
            <div class="img-share union-img" @click="shareFn" style="right: 0.3rem" :class="{'imgBgShare':share}" :style="'opacity:'+Math.abs(0.5-headerNavOpacity)*2 "></div>
          </div>
        </div>
        <div class="title" v-if="false">{{content.unionName}}</div>
        <div class="info" v-if="false">精准扶贫报告</div>
      </div>
      <div class="bg-light"></div>
      <div class="blank border-top-1px" v-if="unionDesc.length!=0">
        <div class="one-path border-bottom-1px"  v-if="false">
          <div class="header-txt ">运行成果</div>
          <span class="time">更新于 {{content.updateTime|time}}</span>
        </div>
        <div class="parent">
          <div v-if="false" class='flex-able div-one'>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.agentNum|changeNumber}}</span><span class="de"> 位</span></p>
              <p class="type">脱贫助理人</p>
            </div>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.poorNum|changeNumber}}</span><span class="de"> 位</span></p>
              <p class="type">贫困户上线</p>
            </div>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.prodNum|changeNumber}}</span><span class="de"> 件</span></p>
              <p class="type">爱心产品上线</p>
            </div>
          </div>
          <div v-if="false" class='flex-able div-two border-bottom-1px'>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.userNum|changeNumber}}</span><span class="de"> 位</span></p>
              <p class="type">公益人士</p>
            </div>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.unionBuy|changeNumber}}</span><span class="de"> 位</span></p>
              <p class="type">联盟购买</p>
            </div>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.unionSell|changeNumber}}</span><span class="de"> 元</span></p>
              <p class="type">联盟销售</p>
            </div>
          </div>
          <div class="intor" :class="{'height-auto':spread}">
            <div class="union-info2">
              <div v-for="item in unionDesc" >
                <div v-for="ite in item.value"  v-if="item.type=='img'">
                  <img v-lazy="ite" alt="" style="width:100%" >
                </div>
                <div v-for="ite in item.value"  v-if="item.type=='text'" v-html="ite" style="word-wrap: break-word"></div>
              </div>
            </div>
          </div>
          <div class="bg-white" v-if="!spread"></div>
          <div class="zk" @click="takeBack" :class="{'spread-url':spread}">{{!spread?'展开':'收回'}} </div>
        </div>
      </div>
      <div class="bg-light border-top-1px"  v-if="unionDesc.length!=0"></div>
      <div class="blank border-top-1px border-bottom-1px" v-if="content.subs.length!=0">
        <div class="one-path border-bottom-1px ">
          <div class="header-txt ">子联盟</div>
         <span class="time">当前联盟的下属联盟</span>
        </div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in content.subs" @click="goUnion(item)">
              <p class="cir">
                <img v-lazy="item.unionIcon+ossUrl('webp_120')" alt="" style="width: 100%;height:100%;">
              </p>
              <p class="t-c" style="font-size: 0.28rem;color:rgba(46,46,46,1);">{{item.unionName}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light"  v-if="content.subs.length!=0"></div>
      <div class="blank border-top-1px border-bottom-1px" v-if="content.counties.length!=0">
        <div class="one-path border-bottom-1px">
          <div class="header-txt ">伙伴帮扶</div>
          <span class="time">伙伴定点或帮扶的区县</span>
        </div>
        <div class="swiper-container2">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in content.counties" @click="goChildUnion(item)">
              <p class="img-c">
                <img v-lazy="item.banner+ossUrl('webp_120')" alt="">
              </p>
              <p class="t-c" style="font-size: 0.28rem;color:rgba(46,46,46,1);">{{item.countyName}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light" v-if="content.counties.length!=0" ></div>
      <div class="blank border-top-1px border-bottom-1px"  v-if="false">
        <div class="one-path border-bottom-1px">
          <div class="header-txt ">扶贫成果</div>
          <span class="time">更新于{{content.helpRecord.updateTime|time}}</span>
        </div>
        <div class="parent ">
          <div class='flex-able div-one'>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.helpRecord.donate}}</span><span class="de"> 元</span></p>
              <p class="type">公益捐赠</p>
            </div>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.helpRecord.unionHelp}}</span><span class="de"> 元</span></p>
              <p class="type">伙伴帮扶</p>
            </div>
            <div class="fl item">
              <p class="text"><span class="red fontSize32">{{content.helpRecord.helpMoney}}</span><span class="de"> 元</span></p>
              <p class="type">帮扶金</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light" v-if="false"></div>
      <div class="blank border-top-1px border-bottom-1px" v-if="content.populateGoods.length!=0">
        <div class="one-path border-bottom-1px">
          <div class="header-txt ">明星产品</div>
          <span class="time">最受欢迎的产品</span>
        </div>
        <div class="product">
          <div class="fl prod-div" v-for="item in content.populateGoods" @click="goGoodsUrl(item.goodsId)">
            <p class="prod-img">
              <img v-lazy="item.goodsImage+ossUrl('webp_240')" alt="">
            </p>
            <p class="prod-type">{{item.goodsName}}</p>
            <p class="prod-money">
              <span style="font-weight: 300;font-size: 0.24rem">￥</span>
              <span style="font-weight: 600;font-size: 0.30rem">{{parseInt(item.price)}}</span><span style="font-weight: normal;font-size: 0.24rem" v-if="item.price.toString().split('.')[1]">.{{item.price.toString().split(".")[1]}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="bg-light" style="clear: both"  v-if="content.populateGoods.length!=0"></div>
      <div class="blank border-top-1px border-bottom-1px" style="overflow: hidden" v-if="content.registList.length!=0">
        <div class="one-path border-bottom-1px go-more" @click="goUrl({type:'reg',id:'',code:''})">
          <div class="header-txt ">员工累计注册</div>
          <span class="time">员工累计注册人数最多的单位</span>
        </div>
        <div class="rank-parent">
          <div v-for="(item,index) in content.registList" class="rank-item">
            <div style="position: relative">
              <span class='rank' :class="{'org':item.idx<=3}">{{item.idx|number}}</span>
              <span class="address">{{item.name}}</span>
              <span class="prople fr">{{item.value|changeNumber}} <span class="prople-text">{{item.unit}}</span></span>
            </div>
            <div class="rank-div" :style="'width:'+5.12*item.value/content.registList[0].value+'rem'"></div>
          </div>
          <div class="footer-rank">{{content.unionName}}累计注册 <span style="font-weight: normal">{{content.registNum|changeNumber}}</span> 人</div>
        </div>
      </div>
      <div class="bg-light"  v-if="content.registList.length!=0" style="clear: both"></div>
      <div class="blank border-top-1px border-bottom-1px" style="overflow: hidden" v-if="content.buyList.length!=0">
        <div class="one-path border-bottom-1px go-more" @click="goUrl({type:'buy',id:'',code:''})">
          <div class="header-txt ">员工累计消费</div>
          <span class="time">员工累计公益消费最多的单位</span>
        </div>
        <div class="rank-parent">
          <div v-for="(item,index) in content.buyList" class="rank-item">
            <div style="position: relative">
              <span class='rank' :class="{'org':item.idx<=3}">{{item.idx|number}}</span>
              <span class="address">{{item.name}}</span>
              <span class="prople fr">{{item.value|changeNumber}} <span class="prople-text">{{item.unit}}</span></span>
            </div>
            <div class="rank-div" :style="'width:'+5.12*item.value/content.buyList[0].value+'rem'"></div>
          </div>
          <div class="footer-rank">{{content.unionName}}累计消费金额 <span style="font-weight: normal">{{content.buySum|changeNumber}}</span> 元</div>
        </div>
      </div>
      <div class="bg-light"  v-if="content.buyList.length!=0" style="clear: both"></div>
      <div class="blank border-top-1px border-bottom-1px" style="overflow: hidden" v-if="content.avgBuyList.length!=0">
        <div class="one-path border-bottom-1px go-more" @click="goUrl({type:'avg',id:'',code:''})">
          <div class="header-txt ">员工人均消费</div>
          <span class="time">员工累计公益消费最多的单位</span>
        </div>
        <div class="rank-parent">
          <div v-for="(item,index) in content.avgBuyList" class="rank-item">
            <div style="position: relative">
              <span class='rank' :class="{'org':item.idx<=3}">{{item.idx|number}}</span>
              <span class="address">{{item.name}}</span>
              <span class="prople fr">{{item.value|changeNumber}} <span class="prople-text">{{item.unit}}</span></span>
            </div>
            <div class="rank-div" :style="'width:'+5.12*item.value/content.avgBuyList[0].value+'rem'"></div>
          </div>
          <div class="footer-rank">{{content.unionName}}累计人均消费金额 <span style="font-weight: normal">{{content.buyAvg|changeNumber}}</span> 元</div>
        </div>
      </div>
      <div class="bg-light"  v-if="content.avgBuyList.length!=0" style="clear: both"></div>
      </div>
    </div>
</template>

<script>
  Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + ":" + this.getMinutes() + "";
  };
  import * as typeFn from '../../requests/union'
  import '../../../static/css/swiper-4.2.2.min.css'
  import swiper from '../../../static/js/swiper-4.2.2.min'
  import share from '../../modules/_share/share'
  import downLoad from "@/components/common/downLoad.vue"

	export default {
		data() {
			return {
        share:0,
        headerNavOpacity: 0,
        content:{
          helpRecord:{
            donate:'',
            helpMoney:'',
            unionHelp:''
          },
          subs:[],
          counties:[],
          populateGoods:[],
          registList:[],
          buyList:[],
          avgBuyList:[]
        },
        spread:false,
        unionDesc:[],
        isShare:true
      }
		},
		created() {
      var flag = /isShare=yes/ig.test(window.location.href)
      if(flag){
        this.isShare=false
      }
      this.$header.setTitle('联盟详情页')
      this.$header.show=false
      new Promise(function(resolve, reject){
        this.syJsbGetAppInfo(function (appInfo) {
          if (!appInfo) {
            resolve(appInfo)
          }else{
            if(typeof appInfo=='string'){
              appInfo=JSON.parse(appInfo)
            }
            resolve(appInfo)
          }
        })
      }.bind(this)).then(function(res){
        this.appInfo={
          id:this.$route.query.unionId,
          code:this.$route.query.unionCode,
          clientType:res['platform']?res['platform']:'H5',
          appVersion:res['ver']?res['ver']:'3.0',
          appStoreId:'',
        }
        typeFn['getUnionReport'](this.appInfo).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            this.content=res.data.content
            try{
              this.unionDesc=JSON.parse(this.content.unionDesc)
            }catch(err){
              this.unionDesc=[]
            }
            if(!this.unionDesc){
              this.unionDesc=[]
            }
            this.$nextTick(function () {
              var mySwiper = new swiper('.swiper-container',{
                slidesPerView : 4.3,
              })
              var mySwiper2 = new swiper('.swiper-container2',{
                spaceBetween :14,
                slidesPerView : 3.1,
              })
            })
            this.shareSecond();//二次分享注册
          }else{
            if(/isShare=yes/ig.test(window.location.href)){
              this.appOpen('failure',{},false,false,true)
            }
          }
        })
      }.bind(this))
		},
    filters:{
      time(p){
        return new Date(p).toLocaleString()
      },
      number(p){
        return p<10?'0'+p:p
      },
      changeNumber(num){
        if(!num){
          num=0
        }
        var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return c;
      }
    },
    mounted(){
      window.addEventListener('scroll',(e) => {
        var scrollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var el=document.querySelector('#titleBar')
        let headerHeight    = el.offsetHeight;//偏移量 ———— 一个header的高度
        //header的滚动监听
        let headerDoorsill  = document.querySelector('#banner').offsetHeight;
        this.headerNavOpacity=scrollTop/(headerDoorsill-headerHeight-el.scrollHeight)
        if(this.headerNavOpacity>0.5){
          this.share = 1
        }else{
          this.share = 0
        }
      })
    },
		methods: {
      shareSecond(){
        var msg = {
          title:'[爱・源于善] '+this.content.unionName+' 公益有你，公益有我',
          text:'一起善源 精准扶贫',
          url :window.location.href+'&isShare=yes',
          logo :this.content.unionIcon,
        }
        share(msg)
      },
      takeBack(){
        this.spread=!this.spread
        if(!this.spread){
          document.documentElement.scrollTop=0;
          window.pageYOffset=0;
          document.body.scrollTop=0;
        }
      },
      shareFn(){
        var that=this
        this.syJsbShare({
          title:'[爱・源于善] '+this.content.unionName+' 公益有你，公益有我',//[爱・源于善] 公益XX 公益有你，公益有我
          text:'一起善源 精准扶贫',
          url :window.location.href+'&isShare=yes',
          logo :this.content.unionIcon,
          sms:"[签名]爱・源于善，您的好友正在向你普及县域知识，点击查看："+window.location.href+'&isShare=yes',//短信相关
        })
      },
      goUnion(p){
        this.appOpen('union',{unionId:p.unionId,unionCode:p.unionCode})
      },
      goGoodsUrl(p){
        this.appOpen('goodsDetail',{goodsId:p})
      },
      goChildUnion(p){
        this.appOpen('unionDetail',{areaId:p.areaId})
      },
      goUrl(p){
        this.appOpen('unionPartment',{type:p.type,id:this.$route.query.unionId,code:this.$route.query.unionCode,unionName:this.content.unionName})
      },
    },
		components: {
      downLoad
    }
	}
</script>

<style lang="scss" scoped>
.union-info{
  width: 100%;
  .union-header{
    position: relative;
    padding-top: 10px;
    width: 100%;
    height: 0.58rem;
    z-index: 999;
  }
  .union-img{
  }
  .height-auto{
    height: auto !important;
    padding-bottom: 1rem !important;
  }
  .banner{
    overflow: hidden;
    height: 3.76rem;
  }
  .title{
    margin-top: 1.38rem;
    text-align: center;
    height:0.67rem;
    font-size:0.48rem;
    font-weight: 600;
    color:rgba(255,255,255,1);
    line-height:0.67rem;
  }
  .info{
    height:0.45rem;
    font-size:0.32rem;
    font-weight: 300;
    text-align: center;
    color:rgba(255,255,255,1);
    line-height:0.45rem;
  }
  .back{
    position: absolute;
    left: 0.3rem;
    bottom: 0.06rem;
    width: 0.56rem;
    height: 0.56rem;
    background: url(../../../static/images/goods/back_w@2x.png) no-repeat left center;
    background-size: contain;
  }
  .img-share{
    position: absolute;
    bottom: 0.06rem;
    width: 0.56rem;
    height: 0.56rem;
    right: 0.3rem;
    background: url(../../../static/images/goods/share_w@2x.png) no-repeat left center;
    background-size: contain;
  }
  .imgBgBack{
    background: url(../../../static/images/goods/back_b@2x.png) no-repeat left center;
    background-size: contain;
  }
  .imgBgShare{
    background: url(../../../static/images/goods/share_b@2x.png) no-repeat left center;
    background-size: contain;
  }
  .bg-light{
    height: 0.2rem;
    background: #FAFAFA;
  }
  .time{
    height:0.24rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.24rem;
  }
  .blank{
  }
  .header-txt{

    padding-bottom: 0.12rem;
    height:0.36rem;
    font-size:0.36rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:0.36rem;
  }
  .go-more{
    background: url(../../../static/images/applyRefund/toRight.png) no-repeat right center;
    background-size: 0.5rem;
    margin-right: 0.2rem;
  }
  .one-path{
    box-sizing: border-box;
    height: 1.4rem;
    padding: 0 0.3rem;
    padding-top: 0.39rem;
  }
  .dataInfo{

  }
  .div-one{
    padding: 0.29rem 0.3rem 0.23rem;
  }
  .div-two{
    padding:0 0.3rem 0.23rem 0;
    margin: 0 0 0 0.3rem;
  }
  .fontSize32{

  font-size:0.32rem;
}

  .cir{
    width:1.2rem;
    height:1.2rem;
    background:rgba(255,248,248,1);
    border-radius: 50%;
    border: 0px;
    text-align: center;
    line-height: 1.2rem;
    margin: 0 auto;
    margin-bottom: 0.3rem;
    overflow: hidden;
  }
  .t-c{
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .red{
    color:#FF1919
  }
  .de{
    height:0.33rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }
  .type{
    height:0.37rem;
    font-size:0.26rem;
    color:rgba(75,75,75,1);
    line-height:0.37rem;
  }
  .fl{
    float: left;
  }
  .flex-able{
    flex-direction: row;
    position: relative;
    clear: both;
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    align-items: center
  }
  .item {
    flex: 1;
  }
  .intor{
    overflow: hidden;
    height: 2.21rem;
    box-sizing: border-box;
    padding:0.29rem 0.3rem 0;
    text-align: justify;
    font-size:0.28rem;
    font-weight: 300;
    color:#000;
    line-height:0.48rem;
  }
  .parent{
    position: relative;
  }
  .bg-white{
    width:7.5rem;
    height:0.82rem;
    background:linear-gradient(180deg,rgba(238,238,238,0),rgba(255,255,255,1));
position: absolute;
    bottom: 0.5rem;
    z-index: 25;
  }
  .zk{
    z-index: 26;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    background: #fff url(../../../static/images/applyRefund/toBot.png) no-repeat 4rem center;
    background-size: 0.44rem;
  }
  .spread-url{
    background: #fff url(../../../static/images/applyRefund/toTop.png) no-repeat 4rem center;
    background-size: 0.44rem;
  }
  .swiper-container {
    width: 7.5rem;
    height: 2.55rem;
    box-sizing: border-box;
    padding: 0.39rem 0.3rem 0;
    overflow: hidden;
  }

  .swiper-container2{
    width: 7.5rem;
    height: 2.77rem;
    box-sizing: border-box;
    padding: 0.39rem 0.3rem 0;
    overflow: hidden;
  }

  .img-c{
    width:2.16rem;
    height:1.5rem;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 0.13rem;
    img{
      width: 100%;
      height: 100%;
      float: left;
      border: 0;
    }
  }
  .product{
    padding-top: 0.39rem;
    overflow: hidden;
  }
  .prod-div{
    width:3.3rem;
    height:4.15rem;
    background:rgba(255,255,255,1);
  }
  .prod-div:nth-of-type(2n+1){
    margin: 0 0.3rem;
  }
  .prod-img{
    width:3.3rem;
    height:2.31rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .prod-type{
    margin: 0.23rem 0;
    height:0.72rem;
    font-size:0.24rem;
    color:rgba(46,46,46,1);
    line-height:0.36rem;
  }
  .prod-money{

  }
  .rank{
    height:0.37rem;
    font-size:0.26rem;
    font-weight: 600;
    color:rgba(75,75,75,1);
    line-height:0.37rem;
    padding-right: 0.23rem;
  }
  .org{
  color: #FF6533;
  }
  .rank-parent{
    padding: 0.35rem 0.3rem 0 0.32rem;
    box-sizing: border-box;
    width: 100%;
  }
  .rank-item{
    height: 0.87rem;
  }
  .address{
    height:0.33rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.33rem;
  }
  .prople{
    font-size:0.26rem;
    color:rgba(255,25,25,1);
    line-height:0.37rem;
  }
  .fr{
    float: right;
  }
  .prople-text{
    height:0.3rem;
    font-size:0.22rem;
    font-weight: 300;
    color:rgba(129,140,158,1);
    line-height:0.3rem;
  }
  .rank-div{
    margin-top: 0.14rem;
    margin-left: 0.5rem;
    width:5.2rem;
    height:0.1rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.68rem ;
  }
  .footer-rank{
    text-align: center;

    width:6.9rem;
    height:0.4rem;
    background:rgba(255,248,248,1);
    margin: 0 auto;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(255,101,51,1);
    line-height:0.4rem;
    margin-top: 0.14rem;
    margin-bottom: 0.43rem;
  }
  .union-info2{
    box-sizing: border-box;
    overflow: hidden;
    padding:0rem 0 0;
  }
}
</style>
