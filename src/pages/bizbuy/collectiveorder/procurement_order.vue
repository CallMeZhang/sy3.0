<template>
  <div class="procurement-order">
    <div v-title="cTitle"></div>
    <div class="procurement-order-con">
      <!------------------------>
      <div class="order-con" v-for="(item, index) in bizOrderInfo" :key="index">
        <div class="order-con-top border-bottom-1px">
          <div class="top-left">配送地址二</div>
          <div class="top-right"><span class="del">删除</span><span class="edit">编辑</span></div>
        </div>
        <div class="order-show-addr">
          <div class="addr-top"><span class="icon"></span><span class="addr-txt">{{item.shipping.name}}</span><span class="addr-txt">{{item.shipping.phone}}</span></div>
          <div class="addr-con" style="display:-webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">{{item.shipping.address}}</div>
        </div>
        <!--商品列表start-->
        <div class="order-products">
          <div class="products-item" v-for="(list, index) in item.products" :key="index">
            <div class="item-img-con" @click="showPopupsLargeData(list)"><img :src="list.imgUrl" alt=""></div>
            <div class="item-operation-con">
              <span class="sub">-</span>
              <input class="input-con" type="text" value="1">
              <span class="add orange">+</span>
            </div>
            <!--商品弹窗-->
            <transition name="fade">
                <popups-w v-if="showLargeImg" :showPopUp="showLargeImg" @close-x="closePopupsLargeImg" :index="index" :titleStyle="'font-size:0.36rem;color:#000;'">
                  <div class="large-con">
                    <div class="large-img-con"><img :src="showLargeData.imgUrl" alt=""></div>
                    <p class="large-txt" style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp: 2;">{{showLargeData.productName}}</p>
                    <p class="large-price">￥{{showLargeData.price}}</p>
                  </div>
                </popups-w>
            </transition>
          </div>

        </div>
        <!--商品列表end-->
        <div class="line-space"></div>
      </div>

      <!---------------------------->
      <div class="shipping-address-con iphonex-margin-bottom">
        <div class="shipping">
          <span class="font-cross">+</span><span>配送地址</span>
        </div>
      </div>
      <!----------------------->
        <div class="jc-bottom-btn border-top-1px iphonex-bottom-after">
          <div class="jc-bottom-btn-l">
            <p class="btn-l-top">分2处配送</p>
            <p class="btn-l-bottom">共￥25136.80</p>
          </div>
          <div class="jc-bottom-btn-r" @click="next()">下一步</div>
        </div>
    </div>
    <popups-tip v-if="lackTips" :isPopUp="lackTips" :con="lackTipsTxt" @pop-up="lackTips=false;"><span @click="closelackTips">我知道了</span></popups-tip>
    <popups-tip v-if="wrongInfoTips" :isPopUp="wrongInfoTips" :con="wrongInfoTipsTxt" @pop-up="wrongInfoTips=false;"><span  @click="closeWrongTips">我知道了</span></popups-tip>
  </div>
</template>
<script>
  import popUpW from '../commons/pop-up-w.vue'
  import popupsTip from '../commons/popups.vue'
  export default{
    data(){
      return {
        cTitle:'单位集采订单',
        selectedQuantity:0,
        showLargeImg:false,//显示商品弹窗
        showLargeData:{},//展示商品信息
        popupsTip:false,//控制 提示弹窗
        lackTips:false,
        lackTipsTxt:'集采服务主要为解决企业大宗采购需求，金额低于1000元请按普通爱心订单方式进行线上支付购买，发货速度和体验更好。',//采购金额低于1000元提示
        wrongInfoTips:false,
        wrongInfoTipsTxt:'配送地址分配商品有错误，请您检查。<br/>•您可能没有给某个配送地址添加商品<br/>•或者没有给某个商品分配配送地址', //信息有误提示
        bizOrderInfo: [
          {
            shipping:{
              name: '张乎乎',
              phone: '18306431478',
              address: '北京朝阳区望京SOHO塔110层1012北京朝阳区望京SOHO塔110层1012北京朝阳区望京SOHO塔望京SOHO塔1 10层1012内'
            },
            products: [{
              imgUrl: '/static/images/common/pays.png',
              quantity: 1,
              jumpLink: 'https://www.baidu.com',
              productName: '山西特产【烘烤什锦枣】八宝枣500g包邮',
              price: '32.9',
            },{
              imgUrl: '/static/images/common/pays.png',
              quantity: 1,
              jumpLink: 'https://www.baidu.com',
              productName: '【陕西特产】擀面皮',
              price: '68.88',
            }],
          },{
            shipping:{
              name: '虎虎',
              phone: '18306431478',
              address: '北京西城区西郊明巷17号北京朝阳区望京SOHO塔110层1012北京朝阳区望京SOHO塔1 10层1012室内'
            },
            products: [{
              imgUrl: '/static/images/common/pays.png',
              quantity: 1,
              jumpLink: 'https://www.baidu.com',
              productName: '苹果酒水苹果酒水苹果酒水苹果酒水苹果酒水苹果酒水苹果酒水苹果酒水苹果酒水苹果酒水苹果酒水',
              price: '68.88',
            },{
              imgUrl: '/static/images/common/pays.png',
              quantity: 1,
              jumpLink: 'https://www.',
              productName: '马栏山苹果苹果酒水苹果酒水苹果酒水',
              price: '68.88',
            }],
          }
        ],
        collectionInfo: {
          totalPrice: '2688.80',
          placeNums: '',
        }
      }
    },
    created() {

    },
    mounted() {
      this.$nextTick((res)=>{
        this.$loading.show =false;
        this.$header.middleFn({
          type:'img',
          url:require('../../../../static/images/common/step_2.png'),
          callback:function () {
          }
        })
      })
    },
    methods: {
      next(){
//        this.$alert('提示');
        this.lackTips = true;
        this.wrongInfoTips = true;
      },
      showPopupsLargeData(item){
        this.showLargeData = item;
        this.$nextTick(function(){
          this.showLargeImg = true;
        });
      },
      closePopupsLargeImg() {
        this.showLargeImg = !this.showLargeImg;
      },
      closelackTips(){
        console.log("lackTips: " +this.lackTips)
        if(this.lackTips){
          this.$nextTick(function(){
            this.lackTips=false;
          })
        }
      },
      closeWrongTips(){
        console.log("wrongInfoTips: " +this.lackTips)
        if(this.wrongInfoTips){
          this.$nextTick(function(){
            this.wrongInfoTips=false;
          })
        }
      },
    },
    components:{
      "popups-w":popUpW,
      "popups-tip":popupsTip,
    },
  }
</script>
<style lang="scss" scoped>
  $white-bg:#fff;
  .procurement-order{
    width: 100%;
  }
  .procurement-order-con{
    width: 100%;
    .jc-bottom-btn{
      width: 7.5rem;
      position:fixed;
      bottom:0;
      z-index:22;
      height:0.98rem;
      .jc-bottom-btn-l{
        float:left;
        display:flex;
        flex-flow: column wrap;
        justify-content: center;
        padding-left:0.3rem;
        width:4.5rem;
        height:0.98rem;
        background:rgba(248,248,248,0.82);
        box-sizing: border-box;
      }
      .btn-l-top{
        width:100%;
        height:0.33rem;
        font-size:0.24rem;
        color:rgba(75,75,75,1);
        line-height:0.33rem;
      }
      .btn-l-bottom{
        width:100%;
        height:0.42rem;
        font-size:0.3rem;
        color:rgba(46,46,46,1);
        line-height:0.42rem;
      }
      .jc-bottom-btn-r{
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
  .order-con{
    .order-con-top{
      display:flex;
      height: 0.88rem;
      padding:0 0.3rem;
      line-height: 0.88rem;
      justify-content: space-between;
      align-items: center;
    }
    .top-left{
      height:0.88rem;
      font-size:0.3rem;
      color:rgba(46,46,46,1);
      line-height:0.88rem;
    }
      .top-right{
      height:0.88rem;
      font-size:0.28rem;
      line-height:0.88rem;
      .del{
        padding-right:0.38rem;
        border-right:1px solid #DADEE4;
        color:rgba(255,25,25,1);
      }
      .edit{
        padding-left:0.38rem;
        color:#007AFF;
      }
    }
    .order-show-addr{
      padding:0.25rem 0.3rem 0;
      height:1.28rem;
      .addr-top{
        height:0.42rem;
        font-size:0.3rem;
        color:rgba(75,75,75,1);
        line-height:0.42rem;
        .icon{
          display:inline-block;
          float:left;
          width:0.3rem;
          height: 0.36rem;
          background:url('/static/images/common/local@1.5x.png')no-repeat;
          background-size:cover;
        }
        .addr-txt{
          padding-left:0.2rem;
        }
      }
      .addr-con{
        margin-top:0.05rem;
        padding-left:0.5rem;
        height:0.8rem;
        text-align: justify;
        font-size:0.26rem;
        color:rgba(75,75,75,1);
        line-height:0.4rem;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
      }
    }
    .order-products{
      display:flex;
      flex-flow:row wrap;
      margin-top:0.3rem;
      padding:0 0.3rem;
      .products-item{
        margin-right:0.45rem;
        width: 2rem;
        padding-bottom: 0.3rem;
        .item-img-con{
          width: 2rem;
          height: 1.4rem;
          margin-bottom:0.2rem;
          background:rgba(250,250,250,1);
          img{
            width: 100%;
            height:100%;
          }
        }
        .item-operation-con{
          display:flex;
          width: 2rem;
          height:0.5rem;
          .input-con{
            display:inline-block;
            width: 1rem;
            height: 0.5rem;
            text-align:center;
            font-size:0.26rem;
            color:rgba(46,46,46,1);
          }
          span{
            display:block;
            width: 0.5rem;
            height: 0.5rem;
            font-size:0.52rem;
            line-height: 0.5rem;
            text-align:center;
            border:1px solid #ccc;
            color:#ccc;
            border-radius: 50%;
          }
          .orange{
            color:#fff;
            border:none;
            background: linear-gradient(90deg, #ff1919, #ff6533);
          }
        }
      }
      .products-item:nth-of-type(3n+0){
        margin-right:0;
      }
    }
    .line-space{
      height:0.2rem;
      background:rgba(250,250,250,1);
      box-shadow: 0px -1px 0px 0px rgba(227,227,227,1), 0px 1px 0px 0px rgba(227,227,227,1)
    }
  }
  .shipping-address-con{
    width: 100%;
    height:1.48rem;
    padding-bottom:0.98rem;
    .shipping{
      margin: 0.3rem auto 0;
      width:6.9rem;
      display:flex;
      justify-content: center;
      align-items: center;
      height:0.88rem;
      font-size:0.32rem;
      color:rgba(255,25,25,1);
      background:rgba(255,255,255,1);
      border:1px solid #FF1919;
      border-radius: 0.08rem;
      .font-cross{
        padding-right:0.2rem;
        font-size:0.48rem;
        font-weight:300;
      }
    }
  }
  .large-con{
    .large-img-con{
      width: 4.2rem;
      height: 2.94rem;
      img{display:block;width:100%;height:100%;}
      margin:0.3rem auto 0;
    }
    .large-txt{
      width: 5.6rem;
      height: 1rem;
      text-align: justify;
      font-size:0.32rem;
      color:rgba(46,46,46,1);
      line-height:0.5rem;
      margin:0 auto;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow : hidden;
    }
    .large-price{
      margin: 0 auto;
      width: 5.6rem;
      height: 0.5rem;
      text-align:center;
      font-size: 0.34rem;
      color:rgba(0,122,255,1);
      padding-bottom: 0.37rem;
    }
  }

</style>
