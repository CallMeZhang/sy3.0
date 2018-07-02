<template>
  <div class="jc-will-list">
    <div v-title="cTitle"></div>
    <div class="will-list-goods" v-if="goodsList.length > 0">
      <div class="will-list-top border-bottom-1px">
        <div class="zx">善源甄选</div>
        <div class="coupon">领取优惠券</div>
      </div>
      <div class="will-list-con iphonex-margin-bottom">
        <left-slider-d class="list-item" v-for="(item, index) in goodsList" :key="index" :index="index" :conText="leftSliderTxt"
                       @msg-from-child="deleteItem">
          <div class="list-item-con border-bottom-1px">
            <div class="item-con-l">
              <img :src="pImgUrl" alt="products">
              <i class="p-yp" v-if="item.youpin == 1"></i>
              <span class="invalidation" v-if="item.invalidation == 1">已失效</span>
              <span class="nothing" v-if="item.sellOut == 1">已售罄</span>
            </div>
            <div class="item-con-r">
              <h3 class="item-t" :class="{'not-choose-color':item.choice == 'disabled'}" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.goodsTitle}}</h3>
              <p class="item-sku" :class="{'not-choose-color':item.choice == 'disabled'}">{{item.goodsSku}}</p>
              <div class="item-bottom">
                <p class="item-price" :class="{'not-choose-color':item.choice == 'disabled'}">￥{{item.goodsPrice}}</p>
                <p class="item-descr" :class="{'not-choose-color':item.choice == 'disabled'}">{{item.numbers}}件以上每件¥{{item.preferentialPrice}}元</p>
                <span v-if="item.choice != 'disabled'" class="choose" :class="[item.choice == 'selected'?'s-checked':'']" @click="choose(index)"></span>
                <span v-else class="choose" :class="[item.choice == 'selected'?'s-checked':'s-disabled']"></span>
              </div>
            </div>
          </div>
        </left-slider-d>
      </div>
      <div class="will-list-bottom iphonex-bottom-div">
        <div class="list-bottom-l">已选{{selectedQuantity}}款产品</div>
        <div class="list-bottom-r" @click="promiseBuy()">确认采购</div>
      </div>
      <test-pop-w v-if="popups.showPop" :isPopUp="popups.showPop" :title="popups['title']" :con="popups['con']" @pop-up='cancelPopUp'>
        <div @click="cancelPopUp">我承诺</div>
      </test-pop-w>
    </div>

    <div class="will-list-empty" v-if="goodsList.length <=0">
      <div class="list-empty-con">
        <img class="empty-img" :src="emptyImgSrc" alt="">
        <h3 class="empty-t">您还没有意向产品</h3>
        <p class="empty-go">去挑选>></p>
      </div>
    </div>
  </div>
</template>
<script>
  import jcTitle from '@/components/common/g-header.vue'
  import jcHeader from '@/components/common/v-header.vue'
//  import leftSliderD from '@/components/common/leftSliderDel2.vue'
  import leftSliderD from '@/components/common/left-sliding-delete.vue'
  import popW from '../commons/popups.vue'
  export default{
    data(){
      return {
        cTitle:'集采意向清单',
        pImgUrl:'/static/images/common/about.png',
        ypImgUrl:'yp.png',
        loseE:true,//失效
        sellOut:false,//
        selectedQuantity:0,//选中的商品数量
        goodsList:[
          {
            goodsTitle:'中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料',
            goodsSku:'每箱500g 每箱500g 每箱500g 每箱500g',
            goodsPrice:'100.00',
            preferentialPrice:'80.99',
            numbers:'10',
            choice:'',
            invalidation:'0',
            sellOut:'0',
            youpin:'0',
          },
          {
            goodsTitle:'中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料',
            goodsSku:'每箱500g 每箱500g 每箱500g 每箱500g',
            goodsPrice:'100.00',
            preferentialPrice:'80.99',
            numbers:'10',
            choice:'',
            invalidation:'0',
            sellOut:'0',
            youpin:'1',
          },
          {
            goodsTitle:'中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料',
            goodsSku:'每箱500g 每箱500g 每箱500g 每箱500g',
            goodsPrice:'100.00',
            preferentialPrice:'80.99',
            numbers:'10',
            choice:'disabled',
            invalidation:'1',
            sellOut:'0',
            youpin:'1',
          },
          {
            goodsTitle:'中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料',
            goodsSku:'每箱500g 每箱500g 每箱500g 每箱500g',
            goodsPrice:'100.00',
            preferentialPrice:'80.99',
            numbers:'10',
            choice:'disabled',
            invalidation:'0',
            sellOut:'1',
            youpin:'0',
          },
          {
            goodsTitle:'中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料',
            goodsSku:'每箱500g 每箱500g 每箱500g 每箱500g',
            goodsPrice:'100.00',
            preferentialPrice:'80.99',
            numbers:'10',
            choice:'disabled',
            invalidation:'1',
            sellOut:'0',
            youpin:'1',
          },
          {
            goodsTitle:'中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料',
            goodsSku:'每箱500g 每箱500g 每箱500g 每箱500g',
            goodsPrice:'100.00',
            preferentialPrice:'80.99',
            numbers:'10',
            choice:'disabled',
            invalidation:'1',
            sellOut:'0',
            youpin:'1',
          },
        ],
        haveGoods:false,//是否有商品
        emptyImgSrc:this.imgUrl + '/common/error.png',
//        showPop:false,
        popups:{
          showPop:false,
          title:'采购人承诺书',
          con:'采购发起人承诺提供的采购、企业信息真实有效，本人的信息真实有效，否则造成的经济损失由采购发起人承担。',
        },
        leftSliderTxt:'移除<br/>心愿单',
      }
    },
    created() {
      this.$header.setTitle('集采意向清单')

    },
    watch:{
      selectedQuantity: function(val, oldVal){
        console.log(val,oldVal)
      },
    },
    mounted() {
      this.$nextTick(()=>{
        this.$loading.show = false;
      })
    },
    methods: {
      myAlert(){
        this.$confirm("弹窗");
      },
      cancelPopUp(){
        this.popups.showPop = !this.popups.showPop;
      },
      choose(index){
        console.log(this.goodsList[index]);
        if(this.goodsList[index].choice == ''){
          this.goodsList[index].choice = 'selected';
        }else if(this.goodsList[index].choice == 'selected'){
          this.goodsList[index].choice = '';
        }
        let arr = this.goodsList.filter((item, index, arr)=>{
          return item.choice == 'selected';
        });
        this.selectedQuantity = arr.length;
      },
      promiseBuy(){
//        this.$toast("haha")
//        this.$alert('集采订单');
        console.log('promiseByuy')
        console.log(this.popups.showPop)
        this.popups.showPop = true;
      },
      deleteItem(index){
        console.log(this.goodsList.length)
        this.goodsList.splice(index,1)
        console.log(this.goodsList)
      },

    },
    components:{
      "jc-title":jcTitle,
      "jc-header":jcHeader,
//      "left-slider-d":leftSliderD,
      "left-slider-d":leftSliderD,
      "test-pop-w":popW,
    },
  }
</script>
<style lang="scss" scoped>
  i{font-style: normal;}
  img{margin:0;padding:0;display:block;}

  .jc-will-list{
    width: 100%;
    overflow-y: scroll;
    .biz-popUp-w{
      width:100%;
      height: 100%;
      .popUp-w-mark{
        position:fixed;
        top:0;
        left:0;
        z-index:99;
        width:100%;
        height: 100%;
        background:rgba(0,0,0,0.4);
      }
      .popUp-w-con{
        position:fixed;
        top:50%;
        left:50%;
        z-index:100;
        width:6.6rem;
        min-height:3.91rem;
        transform: translate(-50%, -50%);
        background:rgba(255,255,255,1);
        border-radius: 0.16rem ;
      }
      .popUp-w-title{
        padding:0 0.3rem;
        height:1.2rem;
        text-align: center;
        font-size:0.36rem;
        color:rgba(46,46,46,1);
        line-height:1.2rem;
      }
      .popUp-w-txt{
        padding:0 0.3rem 0.2rem;
        text-align: justify;
        min-height:1.5rem;
        font-size:0.32rem;
        color:rgba(46,46,46,1);
        line-height:0.5rem;
      }
      .popUp-w-btn{
        height: 1rem;
        padding:0 0.3rem;
        font-size:0.34rem;
        color:rgba(0,122,255,1);
        line-height:1rem;
        text-align:center;
      }

    }


    /*overflow:hidden;*/
    .will-list-goods{
      width: 100%;
      /*overflow:hidden;*/
      .will-list-top{
        padding:0 0.3rem;
        width: 6.9rem;
        height: 0.88rem;
        display:flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .zx:before{
          content: '';
          display: inline-block;
          position: absolute;
          top:50%;
          left:0;
          width: 0.5rem;
          height: 0.5rem;
          transform: translateY(-50%);
          border-radius: 50%;
          background:rgba(216,216,216,1);
        }
        .zx{
          position: relative;
          padding-left: 0.6rem;
          width:2.5rem;
          height:0.4rem;
          font-size:0.28rem;
          color:rgba(46,46,46,1);
          line-height:0.4rem;
        }
        .zx:after{
          position:absolute;
          top: 50%;
          right:0;
          transform: translateY(-50%);
          display: inline-block;
          content: "";
          width: 1.3rem;
          height: 0.34rem;

          background: url('/static/images/common/use_fpm.png') no-repeat center;
          background-size: cover;
        }
        .coupon{
          height:0.37rem;
          font-size:0.26rem;
          color:rgba(255,25,25,1);
          line-height:0.37rem;
        }

      }
      .will-list-con{
        padding-bottom:0.98rem;
        overflow-y: scroll;
      }
      .list-item{
        box-sizing:border-box;
        padding-top:0.26rem;
        height: 2.84rem;
      }
      .list-item-con{
        margin:0 0.3rem;
        display:flex;
        background:none;
        padding-bottom:0.24rem;
      }
      .item-con-l{
        position:relative;
        width:1.4rem;
        height:0.98rem;
        background:#f1f1f1;
        img{
          width: 100%;
          height: 100%;
        }
        .p-yp{
          position:absolute;
          bottom:-0.15rem;
          left:0;
          display:inline-block;
          width:0.52rem;
          height: 0.3rem;
          background:url("/static/images/common/yp.png")center;
          background-size:cover;
        }
        span{
          position:absolute;
          top:50%;
          left:50%;
          z-index:2;
          transform:translate(-50%,-50%);
          display:inline-block;
          width:0.76rem;
          height:0.76rem;
          font-size:0.24rem;
          line-height: 0.76rem;
          text-align:center;
          color:#fff;
          border-radius:50%;
          background:rgba(0,0,0,0.6);
        }
      }
      .item-con-r{
        flex:1;
        padding-left:0.2rem;
        .item-t{
          height:0.8rem;
          font-size:0.28rem;
          color:rgba(75,75,75,1);
          line-height:0.4rem;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 2; /** 显示的行数 **/
          overflow: hidden;  /** 隐藏超出的内容 **/
        }
        .item-sku{
          height:0.33rem;
          font-size:0.24rem;
          color:rgba(148,148,148,1);
          line-height:0.33rem;
        }
        .item-bottom{
          position:relative;
          margin-top:0.3rem;
          height: 0.84rem;
        }
        .item-price{
          height:0.42rem;
          font-size:0.3rem;
          color:rgba(46,46,46,1);
          line-height:0.42rem;
        }
        .item-descr{
          height:0.37rem;
          font-size:0.26rem;
          color:rgba(255,101,51,1);
          line-height:0.37rem;
        }
        .choose{
          position:absolute;
          top:0.17rem;
          right: 0.3rem;
          display:inline-block;
          width: 0.5rem;
          height: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 50%;
        }
        .s-checked{
          border:none;
          background:url('/static/images/common/checked.png');
          background-size:cover;
        }
        .s-disabled{
          border:none;
          background:url('/static/images/common/disbaled_check.png');
          background-size:cover;
        }
        .not-choose-color{
          color:rgba(208,208,208,1);
        }
      }
      .will-list-bottom{
        width: 7.5rem;
        position:fixed;
        bottom:0;
        z-index:22;
        /*display:flex;*/
        height:0.98rem;
        background:rgba(248,248,248,0.82);
        .list-bottom-l{
          float:left;
          padding-left:0.3rem;
          width:4.5rem;
          height:0.98rem;
          line-height:0.98rem;
          box-sizing: border-box;
          font-size:0.3rem;
          color:rgba(46,46,46,1);
        }
        .list-bottom-r{
          float:left;
          width:3rem;
          height:0.98rem;
          font-size:0.3rem;
          color:rgba(255,255,255,1);
          line-height:0.98rem;
          text-align:center;
          background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
        }
      }
    }
    .will-list-empty{
      position:relative;
      width: 100%;
      height: 100%;
      .list-empty-con{
        margin:3rem auto 0;
        width: 3rem;
        text-align:center;
        .empty-img{
          width:3rem;
          height:3rem;
        }
        .empty-t{
          width:3rem;
          margin:0.22rem 0 0.14rem;
          height:0.48rem;
          font-size:0.32rem;
          color:rgba(208,208,208,1);
          line-height:0.48rem;
        }
        .empty-go{
          font-size:0.28rem;
          color:rgba(255,25,25,1);
          line-height:0.4rem;
          text-decoration:underline;
        }
      }
    }
  }

</style>
