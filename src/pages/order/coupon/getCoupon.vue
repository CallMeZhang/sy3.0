<template>
  <div>
    <div v-title="'优惠券'"></div>
    <!--顶部灰色-->
    <div class="coupon-top fixed"></div>

    <div class="coupon fixed">
      <!--头部-->
      <div class="coupon-title font32 fixed relative">
        <p>优惠券</p>
        <img :src="imgUrl+'/common/x.png'" alt="叉号" class="title-img absolute">
      </div>
      <!--优惠券列表-->
      <div class="fixed fixed-pos">
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
        <div class="left fl">
          <div class="left-con ">
            <div class="con-top">
              <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
              <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
            </div>
            <div class="font24 con-time" :class="{'use-color':getColor}">
              <p>2018.03.26-2018.06.25</p>
            </div>
          </div>
        </div>
        <div class="top absolute"></div>
        <div class="bottom absolute"></div>
        <div class="right fl">
          <div class="relative">

          </div>
          <!--右侧内容-->
          <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
            <p class="con-3">
              <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
              <span class="con-num" :class="{'use-color':getColor}">35</span>
            </p>
            <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
            <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
            <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
          </div>
        </div>
        <div class="absolute bor-line ">
          <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
        </div>
        <!--左上角张数-->
        <div class="num absolute">
          <div class="num-top font24">共5张</div>
          <div class="r-triangle">
            <div></div>
          </div>
          <div class="num-bottom"></div>
        </div>
      </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
        <div class="coupon-list bg-f clearfix relative">
          <div class="left fl">
            <div class="left-con ">
              <div class="con-top">
                <p class="font32 no-enter con-1 left-con-big" :class="{'use-color':getColor}" v-show="bigTitle">{{bigTitle}}</p>
                <p class="font26 no-enter2 con-2" :class="{'con-2-top':!bigTitle,'use-color':getColor}">可用于购买江苏省苏盐生活家居有限公司的商品</p>
              </div>
              <div class="font24 con-time" :class="{'use-color':getColor}">
                <p>2018.03.26-2018.06.25</p>
              </div>
            </div>
          </div>
          <div class="top absolute"></div>
          <div class="bottom absolute"></div>
          <div class="right fl">
            <div class="relative">

            </div>
            <!--右侧内容-->
            <div class="right-con absolute" :class="{'right-use':!bigTitle1}">
              <p class="con-3">
                <span class="con-mon font36" :class="{'use-color':getColor}">¥</span>
                <span class="con-num" :class="{'use-color':getColor}">35</span>
              </p>
              <p class="con-4 font24" :class="{'use-color':getColor}">满199元可用</p>
              <div class="con-5 font24" v-show="!getColor" @click="getCoupon">立即领取</div>
              <div class="con-5 font24 use-color" v-show="getColor">已经领取</div>
            </div>
          </div>
          <div class="absolute bor-line ">
            <img :src="imgUrl+'/coupon/line.png'" alt="线" class="line-img">
          </div>
          <!--左上角张数-->
          <div class="num absolute">
            <div class="num-top font24">共5张</div>
            <div class="r-triangle">
              <div></div>
            </div>
            <div class="num-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:"getCoupon",
    components:{},
    data(){
      return {
        bigTitle:"",
        bigTitle1:"五一钜惠好礼券",
        getColor:false,//领取过后的颜色判断
      }
    },
    created(){

    },
    mounted(){
      // this.$header.setTitle('优惠券')
    },
    methods:{
      //获取优惠券
      getCoupon(){
        this.$toast('领取成功')
        this.getColor = true;
      },
    },


  }
</script>

<style scoped>
  .coupon {
    width:100%;
    height:7.9rem;
    /*top:5.44rem;*/
    left:0;
    bottom:0;
    background: rgba(250,250,250,1);
    overflow: auto;
    z-index:10;
  }
  .coupon-top {
    background: #000;
    opacity: .4;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:1;
  }
  .coupon-title {
    width:7.5rem;
    height:1.28rem;
    text-align: center;
    line-height: 1.28rem;
    background: rgba(250,250,250,1);
    /*top:5.44rem;*/
    left:0;
    bottom:6.62rem;
  }
  .title-img {
    width:.44rem;
    height:.44rem;
    top:.14rem;
    right:.1rem;
  }
  /*优惠券列表*/
  .coupon-list {
    /*width:100%;*/
    margin: .2rem .3rem 0;
  }
  .fixed-pos{
    height:6.62rem;
    /*top:6.72rem;*/
    bottom: 0;
    left:0;
    overflow:auto;
  }
  /*优惠券边框*/
  .left,.right{
    height:2.24rem;
    border:1px solid #E3E3E3;

  }
  .left {
    width:4.78rem;
    border-right: none;
    border-radius:.08rem 0 0 .08rem;
  }
  .left-con {
    padding:0 .33rem .27rem .3rem;
  }
  .left-con-big{
    padding-top:.29rem;
  }
  .con-top {
    height:1.73rem;
    box-sizing: border-box;
  }
  .con-1 {
    color:rgba(46,46,46,1);
    line-height:0.32rem;
    padding-bottom:.16rem;
  }
  .con-2 {
    color:rgba(75,75,75,1);
    line-height:0.36rem;
    font-weight: 300;
  }
  .con-2-top{
    padding-top:.25rem;
  }
  .con-time {
    color:rgba(75,75,75,1);
    line-height:0.24rem;
    font-weight: 300;
  }
  .right {
    /*width:1.84rem;*/
    border-left: none;
    border-radius:0 .08rem .08rem 0;
    padding-left:2.05rem;
  }
  .right-con {
    text-align: center;
    padding-top:.26rem;
    right:.3rem;
    top:0;
    z-index:5;
  }
  .right-use {
    padding-top:.64rem !important;
  }
  .con-3 {
    padding-bottom: .09rem;
  }
  .con-mon {
    color:rgba(255,25,25,1);
    line-height:0.36rem;
    z-index: 10;
  }
  .con-num {
    font-size: .64rem;
    color:rgba(255,25,25,1);
    line-height:0.64rem;
    font-weight: 700;
    z-index: 10;
  }
  .con-4 {
    color:rgba(46,46,46,1);
    line-height:0.24rem;
    padding-bottom:.16rem;
    z-index: 10;
  }
  .con-5 {
    width:1.2rem;
    height:0.56rem;
    border:1px solid #FF1919;
    border-radius: 0.04rem ;
    line-height: .56rem;
    margin: 0 auto;
    color:rgba(255,25,25,1);
    z-index: 10;
  }
  .top{
    width:.22rem;
    height:.1rem;
    border:1px solid #E3E3E3;
    border-top:none;
    border-radius:0 0 .12rem .12rem;
    left:4.78rem;
    top:0;
    background:rgba(250,250,250,1) ;
  }
  .bottom{
    width:.22rem;
    height:.1rem;
    border:1px solid #E3E3E3;
    border-bottom:none;
    border-radius:.12rem .12rem 0 0;
    left:4.78rem;
    bottom:0;
    background:rgba(250,250,250,1) ;
  }
  .bor-line {
    height:1.9rem;
    top:.17rem;
    left:4.89rem;
  }
  .line-img {
    width:100%;
    height:100%;
  }
  /*优惠券数量*/
  .num {
    width:.89rem;
    height:.5rem;
    top:-.1rem;
    left:-.14rem;
  }
  .num-top {
    height:.34rem;
    background:rgba(255,101,51,1);
    color:#fff;
    line-height:0.36rem;
    padding-left:.1rem;
    /*text-align: center;*/
  }
  .num-bottom {
    width:0;
    height:0;
    border-color: transparent rgba(255,25,25,1);
    border-width:0 .14rem .14rem 0;
    border-style:solid;
  }
  .r-triangle {
    position: relative;
    width: .1rem;
  }
  .r-triangle > div{
    position: absolute;
    top:-.34rem;
    left:.88rem;
    border-style: solid;
    border-width: .17rem .1rem .17rem 0;
  }
  .r-triangle > div:after {
    position: absolute;
    left: -250px;
  }
  .r-triangle > div:first-child{
    border-color: rgba(255,101,51,1) transparent rgba(255,101,51,1) transparent;
  }
  .use-color {
    border-color:rgba(208,208,208,1) !important ;
    color:rgba(208,208,208,1) !important;
  }
  .border-red {
    border-color:#FF1919 !important;
    color:#FF1919 !important;
  }
  .use {
    width:1.13rem;
    height:.99rem;
    bottom:1px;
    right:1px;
    z-index: 0;
  }
  .use-img {
    width:100%;
    height:100%;
  }
</style>
