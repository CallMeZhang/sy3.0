<template>
  <div class="iphone10-footer-padding">
    <div class="wish-list relative" >
      <div v-title="'心愿单'"></div>
      <!--购物车商家列表-->
      <div :class="{conta:g != 0}" v-show="wishList" v-for="(good,g) in wishList">
        <div style="border-bottom: 1px solid #e3e3e3">
          <!--店铺头部-->
          <!--<div class="store border-bottom-1px" v-show="good.goodsList">-->
          <div class="store border-bottom-1px " :class="{'border-top-1px':g != 0}" v-show="good.goodsList.length">
            <div class="store-iner clearfix" >
              <div class="fl" @click="goStore(good)">
                <div class="store-avatar fl">
                  <img v-lazy="good.storeLOGO? good.storeLOGO + ossUrl('webp_120') : imgUrl+'/mine/avatar.png'" alt="商家头像" class="store-img">
                </div>
                <div class="store-name font28 fl">
                  <p><span>{{good.storeName}}</span></p>
                </div>
                <div class="store-way fl">
                  <div class="store-code" v-show="good.isCanUseCode == 1"><p class="code">扶贫码可用</p></div>
                  <img :src="imgUrl+'/wishList/go.png'" alt="箭头" class="arrer" v-show="good.isCanUseCode == 0">
                </div>
              </div>
              <div class="store-sale font26 fr" v-show="good.haveCoupon == 1" @click="showCoupon(good)">
                <p>领取优惠券</p>
              </div>
            </div>
          </div>
          <!--店铺商品列表-->
          <div class="goods-list" v-for="(item,i) in good.goodsList">
            <div>
              <leftSliderDel @msg-from-child="getMsgFromChild(item,g,i)" :key="item.id" :index="item.cartId" :controlNum="item" @touchstart.native = "cartIndex = item.cartId" :deleteSlider="cartIndex == item.cartId?'':'transform:translateX(0px)'">
                <div class="goods " :class="{'border-top-1px':i != 0}" @click="appOpen('goodsDetail',{goodsId:item.goodsId})">
                  <div class=" clearfix">
                    <div class="goods-img relative fl">
                      <img v-lazy="item.imgUrl + ossUrl('webp_240')" alt="商品图片" class="img-goods absolute">
                      <div class="goods-none absolute" v-if="showNone(item.goodsStatus)">
                        <p  class="goods-font font24 colorff">{{item.goodsStatus | filterState}}</p>
                      </div>
                      <div class="goods-style colorff absolute" v-show="item.isQuality == 1">优品</div>
                    </div>
                    <div class="fl goods-det">
                      <div class="goods-title  font28 no-enter2">
                        <span class="goods-title-color" v-if="item.mode == 1" :class="{noneColor:showNone(item.goodsStatus)}">预售 | </span>
                        <span :class="{noneColor:showNone(item.goodsStatus)}">{{item.goodsName}}</span>
                      </div>
                      <p class="goods-weight font24 no-enter" :class="{noneColor:showNone(item.goodsStatus)}">{{item.spec}}</p>
                      <div class="clearfix goods-count">
                        <p class="fl count-money  font30" :class="{noneColor:showNone(item.goodsStatus)}">
                          <span v-if="item.points == 0">￥ </span>
                          <span v-if="item.points > 0">{{item.points}}积分<span v-show="!parseFloat(item.price) == 0">＋</span></span><span v-show="!parseFloat(item.price) == 0">{{item.price | front}}<span>.{{item.price | end}}</span></span><span v-if="item.points > 0 && !parseFloat(item.price) == 0">元</span>
                        </p>
                        <!--<div class="absolute" style="right:.3rem;bottom:0; height:1rem;">-->
                        <!--<img :src="imgUrl+'/wishList/sub.png'" alt="删除商品" class="count-sub" v-show="item.goodsCount > 0 && !showNone(item.goodsStatus)" @click.stop="del(item)">-->
                        <!--<span class="count font26"  v-show="item.goodsCount > 0">{{item.goodsCount}}</span>-->
                        <!--<img :src="imgUrl+'/wishList/add.png'" alt="添加商品" class="count-add" v-show="item.goodsCount <= 999 && !showNone(item.goodsStatus)" @click.stop="add(item)">-->
                        <!--<img :src="imgUrl+'/wishList/add_1.png'" alt="不可添加商品" class="count-add" v-show="item.goodsCount > 999 || showNone(item.goodsStatus)">-->
                        <!--</div>-->
                      </div>
                    </div>
                  </div>
                  <div class="control-num" v-if="item.buyLimitCount > 0 && !showNone(item.goodsStatus)">每个ID限购{{item.buyLimitCount}}件</div>
                </div>
                <div class="absolute" style="right:0;bottom:.08rem; height:1.3rem;width: 2.3rem;" :class="{'add-bottom':item.buyLimitCount > 0 && !showNone(item.goodsStatus)}">
                  <div class="absolute" style="right:.3rem;bottom:0; height:1rem;width: 2rem;text-align: right;">
                    <img :src="imgUrl+'/wishList/sub.png'" alt="删除商品" class="count-sub" v-show="item.goodsCount > 0 && !showNone(item.goodsStatus)" @click.stop="del(item)">
                    <span class="count font26"  v-show="item.goodsCount > 0">{{item.goodsCount}}</span>
                    <img :src="imgUrl+'/wishList/add.png'" alt="添加商品" class="count-add"  v-show="item.goodsCount <= 999 && !showNone(item.goodsStatus) " @click.stop="add(item)">
                    <img :src="imgUrl+'/wishList/add_1.png'" alt="不可添加商品" class="count-add" v-show="item.goodsCount > 999 || showNone(item.goodsStatus)">
                  </div>
                </div>

              </leftSliderDel>
            </div>
          </div>
          <!--<div class="lin border-top-1px border-bottom-1px"></div>-->
        </div>
      </div>
      <!--异常处理-->
      <div class="error" v-show="noList">
        <div  class="error-class">
          <img :src="imgUrl+'/common/error.png'" alt="暂无列表">
        </div>
        <div class="error-p font28">心愿单还是空的哦</div>
      </div>

      <!--商品推荐-->
      <div class="recommend border-bottom-1px bg-f" v-show="recommendList.length > 0">
        <p class="rec-find font30">您可能还在找：</p>
        <div class="recommend-list flex">
          <div class="recommend-det" v-for="recommend in recommendList" @click="appOpen('goodsDetail',{goodsId:recommend.goodsId})">
            <div class="recommend-goods bg-f relative">
              <div class="recommend-best font28 colorff absolute" v-show="recommend.isQuality">优品</div>
              <img v-lazy="recommend.imgUrl + ossUrl('webp_240')" v-img-cover="recommend.imgUrl + ossUrl('webp_240')" alt="商品图片" class="recommend-goods-img absolute">
            </div>
            <p class="recommend-title font26 no-enter2">
              <span class="goods-title-color " v-if="recommend.isPresell">预售 | </span><span>{{recommend.goodsName}}</span>
            </p>
            <p class="recommend-money">
              <span class="font-1 font24" v-show="recommend.points <= 0">¥</span>
              <span class="font-3 font30" v-show="recommend.points > 0">{{recommend.points}}</span>
              <span class="font-1 font24" v-show="recommend.points > 0">积分<span class="font-1 font24" v-show="recommend.price > 0"> ＋</span></span>
              <span class="font-3 font30" v-show="recommend.price > 0">{{recommend.price | money1}}</span><span class="font-2 font24" v-show="recommend.price > 0">.{{recommend.price | money2}}</span>
              <span class="font-1 font24" v-show="recommend.points > 0 && recommend.price > 0">元</span>
            </p>
          </div>
        </div>
      </div>

      <div class="wish-bottom font24">
        <!--<p>最后更新于：<span>{{updateTime}}</span> © 17shuanyuan.com</p>-->
        <p>{{bottomDet}}</p>
      </div>
      <div class="line" v-show="wishList.length > 0"></div>
    </div>
    <!--底部按钮-->
      <div  class="fixed fixed-pos clearfix iphone10-footer-padding" v-show="wishList.length > 0">
      <div class="border-top-1px">
        <div class="btn-bot fl">
          <p class="btn-total">
            <span class="font-2 font30">价格：</span>
            <span class="font-1 font24" v-show="!totalMoney.point">¥</span>
            <span class="font-3 font30" v-show="totalMoney.point">{{totalMoney.point}} 积分<span class="font-1 font24" v-show="totalMoney.price"> ＋</span></span>
            <span class="font-3 font30" v-show="totalMoney.price">{{totalMoney.price | front}}</span><span class="font-2 font24" v-show="totalMoney.price > 0">.{{totalMoney.price | end}}</span>
            <span class="font-1 font24" v-show="totalMoney.point && totalMoney">元</span>
          </p>
          <p class="btn-det font24">未计运费和优惠</p>
        </div>
        <div class="btn-com fl">
          <p class="font30" @click="goPay">立即帮扶</p>
        </div>
      </div>

    </div>
    <!--弹框-->
    <!--<div class="del fixed" v-show="delGoods">-->
      <!--<div class="del-goods bg-f cen">-->
        <!--<div class="font34 del-tit">确定要<span v-show="delGood">删除该</span><span v-show="emptyCart">清空全部</span>商品吗？</div>-->
        <!--<div class="clearfix">-->
          <!--<div class="font34 fl del-cancel" @click="cancelAlert">取消</div>-->
          <!--<div class="font34 fr del-confirm" @click="delThings">确定</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--选择自提或者配送-->
    <div class="send-way fixed" v-show="">
      <div class="send-bor relative bg-f"></div>
    </div>
    <transition name="fade2">
      <aside class="shadow shadow-position" v-show="shadowShow" @click="slideHide"></aside>
    </transition>
    <transition name="slideTop">
      <section class="sToTop-box coupon-position" v-show="couponShow">
        <div class="sToTop-box-close" @click="slideHide"></div>
        <div class="sToTop-box-title border-bottom-1px">优惠券</div>
        <div class="sToTop-box-list padding-empty" @scroll.stop>
          <coupon :coupon="coupon" :goodsId="storeId" @refresh="refreshCouponList"></coupon>
        </div>
      </section>
    </transition>       <!--优惠券-->
  </div>

</template>
<script>
  import leftSliderDel from '../../../components/common/leftSliderDel.vue'
  import coupon from "@/pages/index/goodsDetail/getCoupon.vue"
  import "../../../../static/css/g-global.scss";
  export default {
    name:'wishList',
    data(){
      return {
        index:'',//商品的下标
        delGoods:false,//删除商品
        count:0,//数量
        wishList:[],//购物车列表
        noList:false,
        recommendList:[],//推荐商品列表
        moneyTotal:{},//所有商品总价格
        updateTime:'',//数据更新时间
        cartId:'',//购物车id
        emptyCart:false,//清空购物车
        delGood:false,//显示删除
        isLoading:false,//正在加载中
        pageNo:1,//当前页面
        pageSize:20,//页面数据个数
        couponShow:false,//优惠券弹窗
        coupon:{
          canGetList:[],
          haveGetList:[]
        },          //优惠券信息
        storeId:'',
        shadowShow:false,
        hasNext:false, //是否有下一页
        timer:0,
        remainedPoints:'',//剩余总积分
        cantClick:false,
        isClick:false,
        usePoints:0,
        rest:0,
        clearImg:"'../../../../static/images/mine/clear.png'",
        delLength:'',
        controlNum:false,
        cartIndex:'',
        g:'',
        i:'',
        payStatusDet:'',//立即帮扶商品失效
        payStocksDet:'',//立即帮扶超出库存
        payBuyLimitDet:'',//立即帮扶超出限购
        payDet:'',
        bottomDet:'',//底部加载描述
      }
    },
    created(){
      this.getData();
      //alert
      window.nativeAlertOk = (v) => {
        if(this.delGood){
          this.delThing();
        }else {
          this.clearGoods();
          // window.location.reload()
        }

      };
      window.nativeAlertCancel = (v) => {
      };
      //分页
      this.$scroll(()=>{
        if(this.hasNext){
          if (!this.isLoading) {
            // this.$toast('数据加载中，请稍等')
            this.getData();
          }else{
            console.log("请求中..骚等")
          }
        }
      })
    },
    mounted(){
      this.getAllPoint();
      // this.$header.show = false;
      this.$header.setTitle('心愿单');
      window.wishListRefresh=(res)=>{
        this.pageNo = 1;
        this.getData();
      }
      this.syJsbIosRegisterHandler('wishListRefresh')
    },
    filters:{
      //商品失效
      filterState(value){
        let noneStr = "";
        if(value == 7 || value == 6 || value == 4 || value == 2 || value == 1 || value == 0){
          noneStr = "已失效";
        } else if (value == 5){
          noneStr = "已售罄";
        }
        return noneStr;
      },
      //金額拆分元
      front(v){
        if(v){
          return v.slice(0,v.length-2) > 0 ? v.slice(0,v.length-2) : '0'
        }
      },
      //金額拆分角分
      end(v){
        if(v){
          if(v.length >= 2){
            return v.slice(v.length-2)
          }else{
            return '0' + v.slice(v.length-2)
          }
        }
      },
      //金额拆分小数点
      money1(v){
        return isNaN(parseInt(v)) ? "" : parseInt(v);

      },
      money2(v){
        var n = parseFloat(v).toFixed(2).toString().split(".")[1];
        return n;
      },
    },
    methods:{
      //获取数据
      getData(){
        this.isLoading = true;
        //购物车列表
        this.getWithToken("/ebgoods/cart/list",{pageNo:this.pageNo,pageSize:this.pageSize}).then(res=>{
        // this.getWithToken("http://192.168.1.145:2080/cart/list",{pageNo:this.pageNo,pageSize:this.pageSize}).then(res=>{
          if(res.code == 200){
            this.updateTime = res.data.lastUpdateAt;
            if (this.pageNo == 1) {
              res.data.goodsCartList.forEach(k=>{k.goodsList.forEach(v=>{v.goodsCount = 0;v.totalPrice=0;v.totalPoints=0;})});
              this.wishList = res.data.goodsCartList;
              this.hasNext = res.data.hasNext;
            }else{
              this.hasNext = res.data.hasNext;
              res.data.goodsCartList.forEach(k=>{k.goodsList.forEach(v=>{v.goodsCount = 0;v.totalPrice=0;v.totalPoints=0;})});
              this.wishList = this.wishList.concat(res.data.goodsCartList);

            }
            this.pageNo++;
            this.isLoading = false;
          }else {
            this.$toast(res.message)
          }
          this.$loading.show = false
          this.noList = this.wishList.length == 0
          if(this.noList || !this.hasNext){
            this.getRecommend();
          }
          if(!this.hasNext){
            this.bottomDet = '© 17shuanyuan.com'
          }else{
            this.bottomDet = '加载中'
          }
          this.clear();
        },err =>{
          this.isLoading = false;
          this.noList = true;
          if(this.noList){
            this.getRecommend();
          }
          // this.getRecommend();
          this.clear();
        })

      },
      //推荐商品
      getRecommend(){
        this.get("/ebgoods/recommend/all").then(res=>{
          if(res.code == 200){
            this.recommendList = res.data.goodsList;
          }
        })
      },
      //获取个人总积分
      getAllPoint(){
        this.getWithToken('/user-center/points/userDetail').then(res=>{
          if(res.code == 200){
            this.remainedPoints =  res.content.remainedPoints;
          }else{
            this.$toast(res.message)
          }
        })
      },
      //右侧垃圾桶
      clear(){
        var that=this
        if(this.noList){
          this.$header.rightFn({
            type:'img',
            url:require('../../../../static/images/mine/clear2.png'),
            callback: ()=> {
              that.$toast("您的购物车还是空的哦！")
            }
          })
        }else{
          that.$header.rightFn({
            type:'img',
            url:require('../../../../static/images/mine/clear.png'),
            callback: ()=> {
              that.nativeAlert({
                alertTitle:'',
                alertDesc:'确定要清空全部商品吗？',
                alertOk:'确定',
                alertCancel:'取消',
                okCallBackJs:'nativeAlertOk',
                cancelCallBackJs:'nativeAlertCancel'
              })
            }
          })
        }
      },
      //侧滑
      getMsgFromChild(v,g,i) {
        this.delGood = true;
        this.g = g;
        this.i = i;
        this.index = v;
        this.cartId = v.cartId;
        this.nativeAlert({
          alertTitle:'',
          alertDesc:'确定要删除该商品吗？',
          alertOk:'确定',
          alertCancel:'取消',
          okCallBackJs:'nativeAlertOk',
          cancelCallBackJs:'nativeAlertCancel'
        })
      },
      //弹框删除商品
      delThing(){
        this.deleteWithToken("/ebgoods/cart/"+this.cartId).then(res=>{
          if(res.code == 200){
            this.wishList[this.g].goodsList.splice(this.i, 1);
            this.delLength = this.wishList[this.g].goodsList.length;
            if(this.delLength == 0){
              this.wishList.splice([this.g],1)
            }
            this.delGood = false;
          }else{
            this.$toast(res.message)
          }
          this.noList = this.wishList.length == 0;
          // if(this.delLength == 0){
            // window.location.reload()
            // this.appNotify({callback:'wishListRefresh'})
          // }
        })
      },


      delThings(){
        //   删除
          this.deleteWithToken("/ebgoods/cart/"+this.cartId).then(res=>{
            if(res.code == 200){
              for (var i = 0; i < this.wishList.length; i++) {
                for(var k = 0;k<this.wishList[i].goodsList.length;k++){
                  var id = this.wishList[i].goodsList[k].cartId;
                  if (id == this.cartId){
                    this.wishList[i].goodsList.splice(k, 1);
                    this.delLength = this.wishList[i].goodsList.length;
                  }
                }
              }

              this.delGood = false;
            }else{
              this.$toast(res.message)
            }
            if(this.delLength == 0){
              // window.location.reload()
              this.appNotify({callback:'wishListRefresh'})
            }
          })
      },
      //弹框清空
      clearGoods(){
        this.deleteWithToken("/ebgoods/cart/all").then(res=>{
          if(res.code == 200){
            this.wishList = [];
            this.emptyCart =false;
            this.delGoods = false;
          }else{
            this.$toast(res.message)
          }
          this.noList = this.wishList.length == 0;
          this.clear();
        })
      },
      //加号按钮添加
      addData(item){
        if(!item.isClick){
          item.isClick = true;
          this.postWithToken("/ebgoods/cart/fee",{skuId:item.skuId,amount:item.goodsCount+1}).then(res=>{
          // this.postWithToken("http://192.168.1.145:2080/cart/fee",{skuId:item.skuId,amount:item.goodsCount+1}).then(res=>{
            if(res.code == 200){
              if(item.goodsCount<1000){
                for (var i = 0; i < this.wishList.length; i++) {
                  for(var k = 0;k<this.wishList[i].goodsList.length;k++){
                    if(this.wishList[i].goodsList[k].skuId == item.skuId){
                      this.wishList[i].goodsList[k].totalPrice = res.data.price
                      this.wishList[i].goodsList[k].totalPoints = res.data.points;
                      this.wishList[i].goodsList[k].goodsCount+=1

                    }
                  }
                }
              }
              this.isClick = true;
            }else{
              this.$toast(res.message);
            }
            item.isClick = false;
          })
        }else {
        }

      },
      add(item){
        if(item.points > 0){
          if(item.buyLimitCount && item.goodsCount+1 > item.buyLimitCount){
            this.$toast('每个ID限购'+item.buyLimitCount+'件')
            return
          }else {
            this.usePoints += parseInt(item.points)
            this.rest = this.remainedPoints - this.usePoints;
            if(this.rest >= 0){
              this.addData(item);
            }else {
              this.$toast('您的积分不足');
              this.usePoints = this.usePoints - parseInt(item.points);
              this.rest = this.remainedPoints - this.usePoints;
            }
          }
        }else {
          if(item.buyLimitCount && item.goodsCount+1 > item.buyLimitCount){
            this.$toast('每个ID限购'+item.buyLimitCount+'件')
            return
          }else{
            this.addData(item);

          }

        }
      },
      //减号按钮减少
      delData(item){
        if(!item.isClick1) {
          item.isClick1 = true;
          this.postWithToken("/ebgoods/cart/fee", {skuId: item.skuId, amount: item.goodsCount - 1}).then(res => {
          // this.postWithToken("http://192.168.1.145:2080/cart/fee", {skuId: item.skuId, amount: item.goodsCount - 1}).then(res => {
            if (res.code == 200) {
              for (var i = 0; i < this.wishList.length; i++) {
                for (var k = 0; k < this.wishList[i].goodsList.length; k++) {
                  if (this.wishList[i].goodsList[k].skuId == item.skuId) {
                    this.wishList[i].goodsList[k].goodsCount -= 1;
                    this.wishList[i].goodsList[k].totalPrice = res.data.price
                    this.wishList[i].goodsList[k].totalPoints = res.data.points;
                  }
                }
              }
              this.isClick = true;
            } else {
              this.$toast(res.message);
            }
            item.isClick1 = false;
          })
        }
      },
      del(item){
        if(item.points > 0){
          this.usePoints -= parseInt(item.points)
          this.rest = this.remainedPoints - this.usePoints;
          if(this.rest >= 0){
            this.delData(item);
          }else {
            this.$toast('您的积分不足');
          }
        }else {
          this.delData(item);
        }

      },
      //显示没商品
      showNone(v){
        if(v == 1 || v == 2 || v == 4 || v == 5 || v == 6 || v == 7 || v == 0){
          return true;
        }else {
          return false;
        }
      },
      //去帮扶
      goPay(){


        let obj = {};
        let num =0
        let buyLimitCount = 0;
        for (var i = 0; i < this.wishList.length; i++) {
          for(var k = 0;k<this.wishList[i].goodsList.length;k++){
            if(this.wishList[i].goodsList[k].goodsCount > 0){
              buyLimitCount = this.wishList[i].goodsList[k].buyLimitCount
              let skuId = this.wishList[i].goodsList[k].skuId;
              let count = this.wishList[i].goodsList[k].goodsCount;
              obj[skuId] = count;
              num ++;
            }
          }
        }

        //校验失效，库存，限购

        //1、点击立即帮扶时，校验商品信息是否有变动（是否下架\删除、库存数量、限购）。
        // 如有变动，
        // 下架或删除提示：XX爱心产品（最多显示三个商品名称，多余的显示...）已失效；
        // 库存不足提示：XX爱心产品（最多显示三个商品名称，多余的显示...）库存不足；
        // 限购提示：XX爱心产品（最多显示三个商品名称，多余的显示...）已超出限购数量
        // 。（校验顺序：失效、库存不足、限购）
        // 2、限购商品 商品底部增加限购提示，点击加号时，到达限购数量，
        // 提示：每个ID限购N件
        //payStatusDet:'',//立即帮扶商品失效
        // payStocksDet:'',//立即帮扶超出库存
        //payBuyLimitDet:'',//立即帮扶超出限购
        this.postWithToken('/ebgoods/cart/help-check',{skuIds:JSON.stringify(obj)}).then(res=>{
          if(res.code == 200){
            // res.data = {
            //   "result": {
            //     "goodsStatus": [
            //       "休闲零食，南瓜子",
            //       "蒲江黄心猕猴桃"
            //     ],
            //     "stocks": [
            //       "蒲江黄心猕猴桃"
            //     ],
            //     "buyLimit": [
            //       "蒲江黄心猕猴桃"
            //     ]
            //   }
            // }

            this.payDet = res.data.result
            if(JSON.stringify(this.payDet) == "{}"){
              if(num > 0){
                if(this.isClick){
                  //存数据，预提交页面使用
                  this.setAppData({ 'h5Key': 'wishList' , 'h5Value' :JSON.stringify(obj)})
                  //获取地址
                  this.getWithToken('/user-center/receiveAddr/userList').then(res=>{
                    if(res.code == 200){
                      if(res.content.length == 0){
                        this.appOpen('ed',{from:'wishList'})
                      }else{
                        this.appOpen("orderConfirm");
                      }
                    }else{
                      this.$toast(res.message)
                    }
                  })
                }else {
                  this.$toast('您的积分不足')
                }
              }else {
                this.$toast("您还没有选择帮扶商品");
              }
            }else{
              if(this.payDet.goodsStatus != '' && this.payDet.goodsStatus){
                this.payStatusDet = this.payDet.goodsStatus.toString().slice(0,30)
                if(this.payStatusDet.length <= 30){
                  this.$toast(this.payStatusDet+'爱心产品已失效')
                  this.pageNo = 1;
                  this.getData();
                  return
                }else{
                  this.$toast(this.payStatusDet+'...'+'爱心产品已失效')
                  this.pageNo = 1;
                  this.getData();
                  return

                }
              }else if(this.payDet.stocks != '' && this.payDet.stocks){
                this.payStatusDet = this.payDet.stocks.toString().slice(0,30)
                if(this.payStatusDet.length <= 30){
                  this.$toast(this.payStatusDet+'爱心产品库存不足')
                  this.pageNo = 1;
                  this.getData();
                  return
                }else{
                  this.$toast(this.payStatusDet+'...'+'爱心产品库存不足')
                  this.pageNo = 1;
                  this.getData();
                  return
                }
              }else if(this.payDet.buyLimit != '' && this.payDet.buyLimit){
                this.payStatusDet = this.payDet.buyLimit.toString().slice(0,30)
                if(this.payStatusDet.length <= 30){
                  this.$toast(this.payStatusDet+'爱心产品爱心产品已超出限购数量')
                  this.pageNo = 1;
                  this.getData();
                  return
                }else{
                  this.$toast(this.payStatusDet+'...'+'爱心产品已超出限购数量')
                  this.pageNo = 1;
                  this.getData();
                  return
                }
              }
            }

          }else{
            this.$toast(res.message)
          }
        })
      },
      //跳转店铺
      goStore(good){
        if(good.storeType == 'agent'){
          //跳转助理人店铺详情
          this.appOpen('assistant',{storeId:good.storeId})
        }else if(good.storeType == 'poor'){
          //跳转贫困户店铺详情
          this.appOpen('poverty',{storeId:good.storeId,poorId:good.poorId})
        }
        // else if(good.storeType == 'biz'){
        //   //跳转集采店铺详情
        //   this.$toast('暂无功能')
        //   // this.appOpen('assistant',{storeId:good.storeId})
        // }else if(good.storeType == 'syshop'){
        //   //跳转善企店铺详情
        //   this.appOpen('company',{storeId:good.storeId})
        // }
      },
      //优惠券
      showCoupon(good){
        this.shadowShow = true;
        this.couponShow = true;
        this.storeId = good.storeId;
        this.getCoupon();
      },
      getCoupon(){
        this.getWithToken("/coupon-center/couponApp/storeCouponList",{storeId:this.storeId}).then(res => {
          if(res && res.code == 200){
            this.coupon = res.data;
          }else{
            this.$toast(res.message)
          }
        })
      },
      refreshCouponList(){
        // console.log("刷新优惠券列表");
        this.getCoupon();
      },
      slideHide(){
        this.shadowShow = false;
        this.couponShow = false;
      },

    },
    components:{
      leftSliderDel,coupon
    },
    computed:{

      //计算总价格
      totalMoney(){
        let price = 0;
        // let price2 = 0;
        // let price3 = 0;
        let point = 0;
        for(var i=0;i<this.wishList.length;i++){
          for(var k = 0;k<this.wishList[i].goodsList.length;k++){
              if(!!this.wishList[i].goodsList[k].totalPrice){
                // if(!this.isClick){
                  price += this.wishList[i].goodsList[k].totalPrice - 0;
                // }
              }
              if(!!this.wishList[i].goodsList[k].totalPoints){
                // if(!this.isClick) {
                  point += parseInt(this.wishList[i].goodsList[k].totalPoints);
                // }
              }
          }
        }
        price = price.toString() || '0'
        // price = price.toFixed(2)
        // price2 =price.toString().split('.')[0];
        // price3 =price.toString().split('.')[1] || '0';
        // return {price,price2,price3,point}
        return {price,point}
      },
    },
    watch:{
      wishList(v,ov){
        if(v.length == 0){
          this.noList = true;
          this.clear();
        }
      }
    }
  }
</script>
<style scoped>
  img {
    border: 0;
  }
  .fix-t {
    position: fixed;
    overflow: auto;
    top: 44px;
    left: 0;
    height: 100%;
  }
  .wish-list {
    width:100%;
  }
  .lin {
    /*height:.2rem;*/
    /*background: #FAFAFA;*/
  }
  .conta {
    border-top:.2rem solid #FAFAFA;
  }
  .store {
    box-sizing: border-box;
  }
  .store-iner {
    padding:0 .3rem;
  }
  .store-avatar {
    width:.5rem;
    height:.5rem;
    border-radius: 25px;
    overflow: hidden;
    background:rgba(216,216,216,1);
    margin:.19rem 0;
  }
  .store-img {
    width:100%;
    height:100%;
  }
  .store-name {
    font-weight:300;
    color:rgba(46,46,46,1);
    line-height:0.4rem;
    padding:.24rem 0 .24rem .1rem;
  }
  .store-code {
    padding:.25rem 0;
    margin-left:.08rem;
  }
  .code {
    font-size: 0.22rem;
    padding: 0 0.1rem;
    font-weight: 300;
    border: 1px solid rgba(255, 25, 25, 1);
    color: rgba(255, 25, 25, 1);
    line-height: 0.36rem;
    height: 0.34rem;
    border-radius: 1.03rem 0.02rem 1.03rem 1.03rem;
  }
  .arrer {
    padding:.22rem 0;
    width:.44rem;
    height:.44rem;
    display: block;
  }
  .store-sale {
    color:rgba(255,25,25,1);
    line-height:0.37rem;
    padding:.26rem 0;
  }
  .goods-list {
    padding-left:.3rem;
    box-sizing: border-box;
  }
  .goods {
    padding:.3rem 0 .3rem 0;
    box-sizing: border-box;
    min-height:2.55rem;
    overflow: hidden;
  }
  .goods-img {
    width:1.4rem;
    height:0.98rem;
    background:rgba(216,216,216,1);
    z-index:1;
  }
  .goods-none {
    left:25%;
    top:0;
    width:0.76rem;
    height:0.76rem;
    background:rgba(0,0,0,0.6);
    border-radius: 38px;
    margin:.11rem auto;
    z-index:2;
  }
  .goods-font {
    line-height:0.75rem;
  }
  .img-goods {
    width:100%;
    height:100%;
  }
  .goods-style {
    width:0.56rem;
    height:0.3rem;
    background:rgba(255,25,25,1);
    font-size:0.22rem;
    line-height:0.37rem;
    bottom:-.15rem;
    left:0;
    text-align: center;
  }
  .goods-det {
    padding-left:.2rem;
    max-width:5.3rem;
  }
  .noneColor {
    color:#D0D0D0 !important;
  }
  .goods-title {
    width:5.3rem;
    color:rgba(75,75,75,1);
    line-height:0.4rem;
    height:.8rem;
  }
  .goods-title-color {
    color:#FF1919;
  }
  .goods-weight {
    width:5.3rem;
    font-weight:300;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
    padding-top:.07rem;
    box-sizing: border-box;
  }
  .count-money {
    color:rgba(46,46,46,1);
    line-height:0.5rem;
    max-width: 3.5rem;
    padding-top:.05rem;
  }
  .goods-count {
    margin-top:.25rem;
  }
  .count {
    width:.63rem;
    display:inline-block;
    text-align: center;
    color:rgba(46,46,46,1);
    position: relative;
    top:-15%;
    /*transform:translateY(-50%);*/
    /*line-height: 1.3rem;*/
  }
  .add-bottom {
    bottom:.7rem !important;
  }
  .add-none {
    width: 1rem;
    text-align: right;
  }
  .count-sub,.count-add {
    width:.5rem;
    height:.5rem;
    margin-top:.24rem;
  }


  /*商品推荐*/
  .recommend {
    padding:0 .15rem;
  }
  .rec-find {
    font-weight: 700;
    color:rgba(46,46,46,1);
    line-height:0.42rem;
    padding:.33rem 0 .33rem .15rem;
  }
  .recommend-list {
    width:100%;
    flex-wrap:wrap;
    justify-content:space-between;
  }
  .recommend-det {
    padding-bottom:.36rem;
  }
  .recommend-best {
    width:1.1rem;
    height:0.47rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0 0 0.07rem 0.07rem ;
    line-height:0.47rem;
    text-align: center;
    z-index:3;
  }
  .recommend-goods {
    margin:0 .15rem;
    width:3.3rem;
    height:2.31rem;
    border:1px solid #E3E3E3;
    box-sizing: border-box;
  }
  .recommend-goods-img {
    width:100%;
    height:100%;
    z-index:1;
  }
  .recommend-title {
    width:3.3rem;
    color:rgba(75,75,75,1);
    line-height:0.4rem;
    padding:.21rem 0 0 .15rem;
    text-align: justify;
  }
  .recommend-money {
    padding:.17rem 0 0 .15rem;
  }
  .font-1 {
    font-weight: 300;
    line-height:0.3rem;
    color:rgba(46,46,46,1);
  }
  .font-2 {
    line-height:0.3rem;
    color:rgba(46,46,46,1);
  }
  .font-3 {
    font-weight: 700;
    line-height:0.3rem;
    color:rgba(46,46,46,1);
  }
  .wish-bottom {
    height:1.12rem;
    background:rgba(250,250,250,1);
    font-weight: 300;
    color:rgba(227,227,227,1);
    line-height:1.12rem;
    text-align: center;
    box-sizing: border-box;
  }
  .line {
    height:.98rem;
  }
  .fixed-pos {
    left:0;
    bottom:0;
    z-index:100;
  }
  .btn-bot {
    bottom:0;
    left:0;
    height:0.98rem;
    background:rgba(248,248,248,1);
    padding-left:.3rem;
    box-sizing: border-box;
    width: 4.5rem;
  }
  .btn-total {
    padding-top:.15rem;
  }
  .btn-det {
    padding-top:.05rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.33rem;
  }
  .btn-com {
    width:3rem;
    height:0.98rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    bottom:0;
    right:0;
  }
  .btn-com p {
    color:rgba(255,255,255,1);
    line-height:0.98rem;
    text-align: center;
  }
  .control-num{
    background:rgba(255,248,248,1);
    font-size:0.24rem;
    color:rgba(255,101,51,1);
    line-height:0.4rem;
    margin:.22rem .3rem 0 0;
    padding-left:.2rem;
  }
  /*弹框*/
  .del,.send-way{
    width:100%;
    height:100%;
    top:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,.4);
    /*opacity:.4;*/
    z-index: 100;
  }
  .del-goods {
    width:5.4rem;
    height:2.1rem;
    background:rgb(248,248,248);
    border-radius: 0.28rem ;
  }
  .del-tit {
    color:rgba(46,46,46,1);
    line-height:1.23rem;
    border-bottom:1px solid #D0D0D0;
    height:1.23rem;
    text-align: center;
  }

  .del-cancel,.del-confirm{
    color:rgba(0,122,255,1);
    line-height:0.86rem;
    height:.86rem;
    width:2.6rem;
    text-align: center;
  }
  .del-cancel {
    border-right:1px solid #D0D0D0;
  }
  .del-confirm {

  }
  .error {
    padding:.6rem 0;
    text-align: center;
    height:3.78rem;
    background:rgba(250,250,250,1);
    box-sizing: border-box;
  }
  .error-class {
    width:2rem;
    height:2rem;
    margin:0 auto;
  }
  .error-class img {
    width:100%;
    height:100%;
  }
  .error-p {
    margin-top:.3rem;
    color:rgba(208,208,208,1);
    line-height:0.28rem;
  }
  /*选择配送方式*/
  .send-bor {
    width:6.6rem;
    height:5.3rem;
    border-radius: 0.16rem ;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
  }

  /*优惠券*/
  .slideTop-enter-active, .slideTop-leave-active {
    transition:all 0.5s ease-in-out;
    transform:translate(0,0);
    opacity:1;
  }
  .slideTop-enter, .slideTop-leave-to{
    opacity:0.5;
    transform:translate(0,7.9rem);
  }
  .padding-empty{
    padding:0 !important;
  }
  .coupon-position {
    z-index: 100 !important;
  }
  .shadow-position {
    z-index: 99 !important;
  }
</style>
