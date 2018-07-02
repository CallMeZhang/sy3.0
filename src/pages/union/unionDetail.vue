<template>
    <div class="union-info">
    <section v-show="isShare == 'yes'" class="download" id="download">
        <downLoad></downLoad>
    </section>
    <div style="position:relative">
      <div class="banner-p" id="swiper" >
        
        <div :style="'background-image:url(' +( countrys.banner ? countrys.banner :banners)+ossUrl('thumb_480') + ')'" class="banner">
            <aside v-if="isShare != 'yes'" :class="{__header:true,'__header-b':headerB,'iphone10-paddingTop':true,'border-bottom-1px':headerNavOpacity == 1}"
                :style=" 'background-color: rgba(249, 249, 249,' + headerNavOpacity + ');' +
                'background-image: linear-gradient(to bottom,rgba(0, 0, 0, ' + linearGradient + ') 0%, transparent 100%)' " id="__header">
              <div class="back iphone10-paddingTop" :style=" 'opacity:'+ headerBtnOpacity " @click="syJsbCloseAppPage()"></div>
              <div class="share" :style=" 'opacity:'+ headerBtnOpacity " @click="share"></div>
          </aside>
          <div style='width:100%;height:1.2rem;position:absolute;bottom:0;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.8));'></div>
          <div class="p-d">{{ countrys.province }} · {{ countrys.city }}</div>
          <div class="d-c">{{ countrys.county }} <span class="pr-c" v-text='name(countrys.type)'></span> <img class="img-span" src="../../../static/images/common/rectangl.png" v-show='false'/></div>
        </div>
      </div>
      <div style="overflow:hidden;position: absolute;top: 3.9rem;padding-bottom:0.8rem">
        <div class="bg-light border-bottom-1px border-top-1px" style="clear: both; width:100%;height:0.2rem; position:absolute;bottom: 0;left:-0.2;"  v-show='countrys.locals.length'></div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in countrys.locals"  @click='active(item.id)'>
              <p class="cir" style='position:relative'>
                <img :src="item.img + ossUrl('webp_240')" alt="" style="width: 100%;height:100%;background-color:#eee;">
                <div style='position:absolute;top:0.94rem;left:0.7rem; background: -webkit-linear-gradient(left, #FF1919 , #FF6533);width:0.8rem;height:0.36rem;text-align:center;color:#fff;font-size:0.24rem;' v-show="goodsDeta.goodsStatus=='3'">购买</div>
              </p>
              <p class="t-c" >{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll" :style="countrys.locals.length==0 ? 'position: relative;margin-top:.5rem':'position: relative;margin-top: 4rem;'">
          <div class="header-txt unions" style='padding:0.1rem 0'>帮扶中的伙伴</div>
          <div>
              <div class='Poverty' style="overflow-x: scroll;overflow-y: hidden;white-space: nowrap;-webkit-overflow-scrolling:touch;">
                <dl class='division'style="margin-left:0.4rem;" v-for=" item in countrys.unions " @click='untive(item.code)'>
                    <dt class='imgs'>
                      <img :src="item.icon + ossUrl('webp_120')" alt="" style="width: 100%;background-color:#eee;">
                    </dt>
                    <dd>
                      <p class='Cause'><b>{{ item.name }}</b></p>
                    </dd>
                </dl>
            </div>
          </div>
      </div>
      <div class="bg-light border-bottom-1px border-top-1px" style="clear: both" v-show='countrys.pcs.length'></div>
      <div class="blank" style="overflow: hidden" v-show='countrys.pcs.length'>
        <div class="one-path" style="overflow:hidden;">
          <div class="header-txt p-div">最受欢迎特产</div>
          <div class="fr rank-unit">单位:单</div>
        </div>
        <div class="rank-parent">
          <div v-for="(item,index) in countrys.pcs" class="rank-item" style="clear: both;height: 0.52rem">
            <div class="fl rank-name">{{item.name}}</div>
            <div style='width:4.3rem;float:left'>
              <div class="fl rank-div" :style="'width:' + (random(item.num,mum2) =='100' ? '100%' : random(item.num,mum2) + '%')"></div>
            </div>
            <div class="fr rank-value">{{parseInt(item.num)}}</div>
          </div>
        </div>
      </div>
      <div class="bg-light border-top-1px border-bottom-1px" style="clear: both"></div>
      <div class='pr-rank border-bottom-1px' v-show='countrys.topUsers.length'>
        <h2 class='h2-title'>扶贫光荣榜</h2>
        <div>
          <div style="position: relative" class="help-p">
            上月最佳帮扶人 <span class="fr help-more" @click='actives'>查看更多</span>
          </div>
          <div class="flex-able flex-top" style="height: 2.44rem">
            <div v-for="(item,index) in countrys.topUsers"  :class="index === 1 ? 'ggg' : 'item'">
              <img v-lazy="(item.headImg ? item.headImg :imgss)+ossUrl('thumb_240')" alt="" class="second-img">
              <p class="name-rank">{{ item.name }}</p>
              <p class="rank-point">＋{{ item.points }}<span style="font-weight: 300">公益积分</span></p>
            </div>
            <div class='oneMarkTow'><img :src="imgUrl+'/support/Shape.png'"></div>
            <div class='markTow'><img :src="imgUrl+'/support/Group 4.png'"></div>
            <div class='markThree'><img :src="imgUrl+'/support/three.png'"></div>
          </div>
          <div class="pr-num">
            共<span class="org">{{ countrys.helpNums }}</span>位爱心人士为<span>{{ countrys.county }}</span>脱贫贡献爱心
          </div>
        </div>
      </div>
      </div>
    </div>
</template>
<script>

//  import '../../../static/css/swiper-4.2.2.min.css'
  import swiper from '../../../static/js/swiper-4.2.2.min'
  import * as type from '../../requests/union'
  import share from '../../modules/_share/share'
  import downLoad from "@/components/common/downLoad.vue"
	export default {
		data() {
			return {
        isShare:this.$route.query.isShare,  //分享环境打开页面
			  num:'124563.36',
        banners:'../../../static/images/union/bj.jpg',
        imgs:{},
        imgss:"../../../static/images/common/head-default.jpg",
        avgBuyList:[
          { name:'驴肉',
            value:500
          },
          { name:'驴肉',
            value:500
          },
          { name:'驴肉',
            value:500
          },
          { name:'驴肉',
            value:500
          },
          { name:'驴肉',
            value:500
          },
          { name:'驴肉',
            value:500
          },
          { name:'驴肉',
            value:500
          }

        ],
        pcs: [
               {
                  "name": "驴肉",
                  "idx": "1",
                  "num": "1000",
                  num2:700,
                },
                {
                  "name": "苹果",
                  "idx": "1",
                  "num": "900",
                  num2:500,

                },
                {
                  "name": "黄小米",
                  "idx": "1",
                  "num": "800",
                  num2:300,
                },
                {
                  "name": "百合",
                  "idx": "1",
                  "num": "800",
                  num2:300,

                },
                {
                  "name": "擀面皮",
                  "idx": "1",
                  "num": "600",
                  num2:200,

                },
                {
                  "name": "槐花蜜",
                  "idx": "1",
                  "num": "500",
                  num2:100,

                }
            ],
        topUsers: [
              {
                "name": "李艳",
                "headImg": "http://p1.qzone.la/upload/7/sophi7yi.jpg",
                "id": "1212121212121",
                "points": "9395",
                "topDesc": "up",
                "topAdd": "2",
                "index": "1"
              },
              {
                "name": "张波",
                "headImg": "http://up.qqjia.com/z/24/tu29267_15.jpg",
                "id": "1asasd212121212121",
                "points": "2395",
                "topDesc": "equal",
                "topAdd": "0",
                "index": "2"
              },
              {
                "name": "刘晓梅",
                "headImg": "http://p1.qzone.la/upload/3/bet0u2nb.jpg",
                "id": "3sasd3",
                "points": "1395",
                "topDesc": "none",
                "topAdd": "3",
                "index": "3"
              }
            ],
            headerNavOpacity:0,     //header中间导航的透明度初始为0
            headerBtnOpacity:1,     //header两侧按钮的透明度初始为1
            linearGradient:0.3,     //header渐变色初始值为0.3
            headerB:false,          //header黑按钮模式（一级导航）
            navFixed:false,         //nav悬浮（二级导航）
            HeaderBtnActive:0,      //0 商品， 1 详情 ， 2 推荐
            NavBtnActive:0,         //0 图文详情 ，1 帮扶小贴士
            navAbsolute:false,      //滑动到nav尾部
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
        unionDesc:null,
        mum2:0,
        areaId:this.$route.query.areaId || '120110000000',
        countrys:{
          banner:"",
          pcs:[
            
          ],
          topUsers:[],
          locals:[]
        },
        goodsDeta:{}

        
      }
		},
		created() {
		  this.getUnionInfo()
      this.$header.show=false
      this.county();  //县域详情相关接口
		},
    filters:{
      changeNumber(num){
        if(!num){
          num=0
        }
        var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return c;
      }
    },
    mounted(){
      if(this.isShare != 'yes'){
            window.addEventListener("scroll", (e) =>{
                let scrollTop       = this.scrollTop();
                let headerHeight    = document.querySelector('#__header').offsetHeight;//偏移量 ———— 一个header的高度
                //header的滚动监听
                let headerDoorsill  = document.querySelector('#swiper').offsetHeight - headerHeight;
                //header动态变化所根据的阈值（轮播图减掉header本身的高度：像素）
                if (scrollTop < headerDoorsill) {     //顶部导航状态的监听
                    var nPersent        = Math.abs(headerDoorsill - scrollTop)/headerDoorsill;//随着下滑不断减小 1 => 0 => 1 => 更大
                    //此阈值计算出来的百分比（小数）
                    var nPersentX       = nPersent < 1 ? nPersent : 1 ;
                    //加个判断，不能大于1
                    var halfNPersent    = Math.abs(headerDoorsill/2 - scrollTop)/(headerDoorsill/2);//减小速度是上一个百分比的2倍
                    //半阈值百分比（小数）
                    var halfNPersentX   = halfNPersent < 1 ? halfNPersent : 1;
                    //加个判断，不能大于1
                    this.headerNavOpacity = 1 - nPersentX;
                    this.headerBtnOpacity = halfNPersentX;
                    if (scrollTop < headerDoorsill/2) {
                        this.headerB = false;
                        this.linearGradient = halfNPersentX*0.3
                    }else{
                        this.linearGradient = 0;
                        this.headerB = true;
                    }
                }else{
                    this.linearGradient = 0;
                    this.headerB = true;
                    this.headerNavOpacity = 1;
                    this.headerBtnOpacity = 1;
                }
                //header的滚动监听end
            })

      }
      this.$header.setTitle('县域详情页');
      this.$header.show = false;
    },
		methods: {
      name(type){
        if(type==='normal'){
            return '(贫困县)'
        }else{
            return '(国家级贫困县)'
        }
      },
      random(num2,num){
        var a =  num2/num*100;
        
        
        return a;
      },
      county(){//县域详情相关接口
        var url = "/union-center/county/index";
        return this.get(url,{areaId:this.areaId,clientType:'H5'}).then((res)=>{
          if(res && res.code == 200){
             this.countrys=res.content
            if(this.countrys.topUsers.length){
                this.countrys.topUsers=res.content.topUsers.splice(0,3)
                var a=this.countrys.topUsers[0]
                var b=this.countrys.topUsers[1]
                this.countrys.topUsers[1]=a
                this.countrys.topUsers[0]=b
            }
            if(this.countrys.pcs.length){
                  this.mum2=res.content.pcs[0].num
            }
            for(var i=0;i<res.content.locals.length;i++){
              var img=res.content.locals[i].img
              res.content.locals[i].img=!!img?JSON.parse(img)['img']:'123'
              // console.log(this.countrys.banner)
            }
             this.shareSecond();//二次分享注册
             this.goodsDetails() //商品店铺接口
             
          }else{
            console.log('内容已失效')
            this.failure()
          }
        },err =>{
            this.isLoading = false;
        })
      },
      goodsDetails(){
          var goodsId
          for(var i=0;i<this.countrys.locals.length;i++){
              goodsId =this.countrys.locals[i].id
          }
          var url = "/ebgoods/goods/" + goodsId;
          return this.getWithToken(url).then((res)=>{
          if(res && res.code == 200){
             this.goodsDeta=res.data.goods
            //  console.log('请求成功2',this.goodsDeta)
          }
        })
      },
      failure(){
          this.appOpen("failure",{},false,false,true)//分享失效
      },
      actives(){
         this.appOpen("support",{areaId:this.areaId});//跳转排行榜
      },
      active(ind){
          this.appOpen("goodsDetail",{goodsId:ind});//商品id

      },
      untive(code){
         this.appOpen("union",{unionCode:code});//联盟页
      },
      changeHeaderActive(n){
          this.HeaderBtnActive = n;
          let dom = n == 0 ? "#goods" :
                  n == 1 ? "#navigationBox" : "#recommend";
          let domScrollTop = this.getTargetToDocTop(document.querySelector(dom));
          let headerHeight = document.querySelector("#__header").offsetHeight;
          this.scrollTop(domScrollTop - headerHeight + 1); //触发滚动
      },
      changeNavActive(n){
          this.NavBtnActive = n;
          let dom = n == 0 ? "#goodsDetail" : "#prompt";
          let domScrollTop = this.getTargetToDocTop(document.querySelector(dom));
          let headerHeight = document.querySelector("#__header").offsetHeight;
          let navHeight    = document.querySelector("#navigation").offsetHeight;
          this.scrollTop(domScrollTop - navHeight - headerHeight + 1); //触发滚动
      },
      share(){//一次分享
        this.syJsbShare({
          title:"[爱・源于善] 你知道在中国还有这样一个"+ (this.countrys.type =='country'? '国家级贫困县' : '贫困县')+"吗？",
          text:'我们或许不能改变世界，但可以伸出援助之手，哪怕只能帮助一个人也好。',
          url :window.location.origin + '/unionDetail?areaId=' + this.areaId + "&isShare=yes",
          logo :this.countrys.banner || 'https://cdnpre-m.17shanyuan.com/static/images/union/bj.jpg',
          sms:"[签名]爱・源于善，您的好友正在向你普及县域知识，点击查看：" + window.location.origin + '/unionDetail?areaId=' + this.areaId + "&isShare=yes"//短信相关
        })
      },
      shareSecond(){//二次分享
          share({
              title:"[爱・源于善] 你知道在中国还有这样一个"+ (this.countrys.type =='country'? '国家级贫困县' : '贫困县')+"吗？",
              text:'我们或许不能改变世界，但可以伸出援助之手，哪怕只能帮助一个人也好。',
              url :window.location.origin + '/unionDetail?areaId=' + this.areaId + "&isShare=yes",
              logo:this.countrys.banner || 'https://cdnpre-m.17shanyuan.com/static/images/union/bj.jpg'
          })
      },
      scrollTop(n) {    //获取滚动条距顶部距离(不填参数)，填参数为滚动到某个位置
          if (n || n == 0) {
//                    this.startMove(n);
              window.scrollTo(0,n)
              return;
          }else{
              return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          }
      },
      getUnionInfo(){
        type['getUnionInfo'](this.$route.query.unionId).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
//            this.content=res.data.content
//            this.unionDesc=JSON.parse(this.content.unionDesc)
//            console.log(this.unionDesc)
            this.$nextTick(function () {
              var mySwiper = new swiper('.swiper-container',{
                spaceBetween :20,
                slidesPerView : 3.1,
              })
              var mySwiper2 = new swiper('.swiper-container2',{
                direction:"vertical",
                speed:1000,
                autoplay:true,
                loop:true
              })

//              var mySwiper2 = new swiper('.swiper-container2',{
//                spaceBetween :14,
//                slidesPerView : 3.1,
//              })
            })
          }

        })
      }
    },
    components:{
        downLoad
    },
	}
</script>

<style lang="scss" scoped>

.__header{
        padding-top:20px;
        position:fixed;
        top:0;
        /*top:0.4rem;*/
        user-select:none;
        left:0;
        display:flex;
        justify-content:space-between;
        width:100%;
        height:0.88rem;
        background-color:rgba(255,255,255,0.5);
        z-index:20;
        .back{
            width:0.88rem;
            background:url(/static/images/goods/back_w@2x.png) center center/0.44rem 0.44rem no-repeat;
        }
        .share{
            width:0.88rem;
            height:0.88rem;
            margin-right:0.04rem;
            background:url(/static/images/goods/share_w@2x.png) center center/0.52rem 0.52rem no-repeat;
        }

}
.__header-b{
    .back{
        background:url(/static/images/goods/back_b@2x.png) center center/0.44rem 0.44rem no-repeat;
    }
    .share{
        width:0.88rem;
        height:0.88rem;
        margin-right:0.04rem;
        background:url(/static/images/goods/share_b@2x.png) center center/0.52rem 0.52rem no-repeat;
    }
    .first_menu_group{
        opacity:1;
    }
}
.union-info{
  width: 7.5rem;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0 auto;
  .pr-rank{
    margin-left: 0.3rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .pr-num{
    margin: 0 0 0.39rem 0rem;
    width:6.9rem;
    height:0.4rem;
    background:rgba(255,248,248,1);
    text-align: center;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(255,101,51,1);
    line-height:0.4rem;
  }
  .org{
    color: #FF6533;
    font-weight: normal;
  }
  .name-rank,.rank-point{
    text-align: center;
  }
  .flex-top{
    margin-top: 0.43rem;
    align-items: flex-start !important;
  }
  .rank-point{
    height:0.26rem;
    font-size:0.24rem;
    color:rgba(148,148,148,1);
    line-height:0.26rem;
  }
  .name-rank{
    margin: 0.19rem 0 0.1rem;
    height:0.28rem;
    font-size:0.28rem;
    color:rgba(46,46,46,1);
    line-height:0.28rem;
  }
  .first-img,.second-img{
    border-radius: 50%;
    margin: 0 auto;
    display: block;
  }
  .first-img{
    width:1.2rem;
    height:1.2rem;
  }
  .second-img{
    width:1rem;
    height:1rem;
    margin-top: 0.2rem;
  }
  .help-more{
    margin-right: 0.3rem;
    padding-right: 0.3rem;
    background: url(../../../static/images/common/arrow2.png) no-repeat right center;
    background-size: contain;
    height:0.37rem;
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.37rem;
  }
  .help-p{

    height:0.45rem;
    font-size:0.32rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:0.45rem;
  }
  .h2-title{
    height:0.56rem;
    font-size:0.4rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:0.56rem;
    margin: 0.42rem 0 0.33rem;
  }
  .rank-unit{
    margin-top: 0.25rem;
    height:0.37rem;
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.37rem;
  }
  .p-div{
    float: left;
padding: 0.25rem 0 0 0;
  }
  .rank-name{
    width:1.2rem;
    height:0.3rem;
    font-size:0.28rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.3rem;
  }
  .rank-value{
    height:0.3rem;
    font-size:0.28rem;
    color:rgba(75,75,75,1);
    line-height:0.3rem;
  }
  .rank-div{
    position:relative;
    margin-top: 0.11rem;
    height:0.1rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.68rem ;
  }
  .rank-parent{
    padding: 0rem 0.3rem 0 0.32rem;
    box-sizing: border-box;
    width: 100%;
  }
  .blank{
    padding-bottom: 0.43rem;
  }
  .unit{
    height:0.33rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }
  .type{
    height:0.4rem;
    font-size:0.28rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.4rem;
  }
  .text{
    height:0.4rem;
    font-size:0.28rem;
    color:rgba(46,46,46,1);
    line-height:0.4rem;
  }
  .fontSize24{
    font-size: 0.24rem;
  }
  .fontSize32{
    font-size: 0.32rem;
  }
  .flex-able{
    position:relative;
    flex-direction: row;
    position: relative;
    clear: both;
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    align-items: center;
    .oneMarkTow{
        width:0.88rem;
        height:0.8rem;
        position:absolute;
        top:-0.3rem;
        left:2.8rem;
    }
    .markTow{
        width:0.7rem;
        height:0.63rem;
        position:absolute;
        top:-0.05rem;
        left:0.7rem; 
    }
    .markThree{
        width:0.7rem;
        height:0.63rem;
        position:absolute;
        top:-0.05rem;
        left:5.2rem; 
    }
  }
  .ggg{
     .second-img{
       width:1.2rem;
       height:1.2rem;
       margin-top:0.01rem;
     }
  }
  .item {
    flex: 1;
  }
  .parent{
    position: relative;
    padding-left: 0.3rem;
  }
  .time{
    height:0.24rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.24rem;
  }
  .header-txt{
    height:0.36rem;
    font-size:0.36rem;
    font-weight: 600;
    color:rgba(46,46,46,1);
    line-height:0.36rem;
  }
  .one-path{
    box-sizing: border-box;
    padding: 0 0.3rem;
    padding-top: 0.24rem;
    padding-bottom: 0.24rem;
  }
  .go-url{
    width: 0.16rem;
    float: right;
    margin-top: 0.24rem;
    padding:0 0.3rem;
  }
  .bg-opcity{
    width:5.51rem;
    height:0.32rem;
    background:linear-gradient(180deg,rgba(255,255,255,1),rgba(255,255,255,0));
    position: absolute;
    top: -1px;
    left: 1.2rem;
    z-index: 1;
  }
  .swiper-p{
    height: 0.7rem;
    font-size:0.28rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.7rem;

  }
  .swiper-container2{
    width: 5rem;
    height: 0.7rem;
  }
  .scroll-border{
    display: inline-block;
    width:0.02rem;
    height:0.7rem;
    background:rgba(255,101,51,1);
    margin: 0 0.24rem;
  }
  .scroll{
    margin-left: 0.3rem;
    overflow: hidden;
    .Poverty{
      margin-top:0.4rem;
      display:flex;
      .division{
        flex-shrink: 0;
        margin-left:.55rem;
        text-align:center;
      .Cause{
          height:0.86rem;
          line-height:0.86rem;
          font-size:0.28rem;
          color:rgba(46,46,46,1);
        }
      .imgs{
          width:1.22rem;
          height:1.22rem;
          overflow:hidden;
          display:inline-block;
          background-color:#eee;
        }
      }
    }
  }
  .banner-p{
    width: 100%;
    height: 4rem;
  }
  .banner{
    background: url('../../../static/images/union/bj.jpg') center center/cover no-repeat;
    position: relative;
    overflow: hidden;
    height: 4rem;
  }
  .title{
    float: right;
    font-size:0.34rem;
    margin-top: 0.27rem;
    color:rgba(255,255,255,1);
    margin-right: 0.3rem;
  }
  .info{
    height:0.45rem;
    font-size:0.32rem;
    font-weight: 300;
    text-align: center;
    color:rgba(255,255,255,1);
    line-height:0.45rem;
  }
  /* .back{
    float: left;
    width: 1rem;
    margin-left: 0.3rem;
    margin-top: 0.265rem;
    height:0.35rem;
    background: url(../../../static/images/goods/back_w@2x.png) no-repeat left center;
    background-size: contain;
  }*/
  .bg-light{
    height: 0.2rem;
    background: #FAFAFA;
  }
  .p-d{
    height:0.26rem;
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(255,255,255,1);
    line-height:0.26rem;
    margin-top: 2.5rem;
    margin-left: 0.3rem;
    z-index:2;
    position: relative;
  }
  .d-c{
    height:0.6rem;
    font-size:0.6rem;
    font-weight: 600;
    color:rgba(255,255,255,1);
    line-height:0.6rem;
    margin-top: 0.13rem;
    overflow: hidden;
    margin-left: 0.3rem;
    z-index:2;
    position: relative;
  }
  .pr-c{
    height:0.36rem;
    font-size:0.36rem;
    color:rgba(255,255,255,1);
    line-height:0.36rem;
  }
  .img-span{
    vertical-align:sub;
    width: 0.44rem;
  }

  .swiper-container {
    width: 7.5rem;
    box-sizing: border-box;
    padding: 0.39rem 0.3rem 0;
    overflow: hidden;
  }

  .cir{
    width:2.16rem;
    height:1.5rem;
    background:rgba(255,248,248,1);
    margin: 0 auto;
    margin-bottom: 0.15rem;
    overflow: hidden;
  }
  .t-c{
    text-align: center;
    height:0.42rem;
    font-size:0.3rem;
    color:rgba(75,75,75,1);
    line-height:0.42rem;
  }
  .t-c-l{
    text-align: center;
    height:0.33rem;
    font-size:0.24rem;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }
  .download{
    height: 1rem;

  }
  .download:empty{
      display:none;
  }
}


</style>
