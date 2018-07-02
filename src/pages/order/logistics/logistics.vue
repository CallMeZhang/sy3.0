<template>
    <div class="logistics">
      <div class="l-tip clearfix" v-show="false">
        <div class="fl">
          <img :src="imgUrl+'/common/tip.png'" alt="" class="delay-img">
        </div>
        <div class="fl delay-text">
          当地物流不及发达城市，产品到您的手中可能需要5-10天，请多多理解。
        </div>
      </div>
      <div class="l-top">
        <div class="flex item-center">
          <div class="goods-img relative"  @click="">
            <img v-lazy="img" alt="" v-img-cover="img">
            <div class="l-img-tip" v-show="count>1">共{{count}}件商品</div>
          </div>
          <div class="flex-1 l-message">
            <div class="font26">
              <span class="color94">物流状态</span><span class="color4b m-right">{{ logisticsInfo.endStatus| flowSta}}</span>
            </div>
            <div class="font26">
              <span class="color94">物流公司</span><span class="color4b m-right">{{logisticsInfo.eName}}</span>
            </div>
            <div class="font26">
              <span class="color94">物流单号</span><span class="color4b m-right">{{logisticsInfo.packageNo}}</span>
            </div>
            <div class="font26">
              <span class="color94">官方电话</span><span class="color4b l-phone m-right" @click="call(logisticsInfo.eTel)">{{logisticsInfo.eTel}}</span>
            </div>
          </div>
        </div>

      </div>
      <div class="space border-top-1px border-bottom-1px"></div>
      <div class="l-middle">
        <div class="clearfix">
          <div class="fl address-img">
            <img :src="imgUrl+'/common/local@1.5x.png'" alt="">
          </div>
          <div class="fl address-text">
            <div class="font28 color4b"><span>[收货地址]</span>
              <span style="margin-left:.1rem;">{{logisticsInfo.areaInfo}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="l-bottom">
        <div class="l-bot-con border-top-1px">
          <div class="l-box">
            <div class="l-item" v-for="(item,index) in logisticsInfo.logisticsDesc">
              <div class="clearfix">
                <div class="item-left fl color94">
                  <div>{{item.acceptAt | getDay}}</div>
                  <div>{{item.acceptAt | getMin}}</div>
                </div>
                <div class="item-center fl">
                  <div class="s-img">
                    <img :src="index == 0?imgUrl+'/common/checked3.png':imgUrl+'/applyRefund/stup-ago.png'" alt="">
                  </div>
                  <div class="v-line-box">
                    <div class="v-line" v-show="index != logisticsInfo.logisticsDesc.length - 1"></div>
                  </div>
                </div>
                <div class="item-right fl" :class="index == 0?'sy-red':'color94'">
                  <div class="status font28" v-if="true">{{item.flowStatus | flowSta}}</div>
                  <div class="sub-status w-300">{{item.descInfo}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="l-bot-tip" v-show="false">
        <div class="bot-tip-con">您的爱心包裹已发货，助理人冯小林地处偏远山区，使用当地物流公司发货，目前暂不能提供物流信息查询，敬请谅解，如有任何疑问可联系助理人冯小林 <span class="bot-tip-phone" @click="call('23423423')">234234234</span></div>
      </div>

      <transition name="fade2" >
        <div class="mask" v-show="lookImg" @click="lookImg = false"></div>
      </transition>
      <transition name="slide-bottom">
        <div class="browse-img" v-show="lookImg">
          <div class="b-title font32">
            商品明细
          </div>
          <div class="img-box">
            <div class="slide-con">
              <div class="slide-item" v-for="item in 4">
                <img src="" alt="">
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components: {},
    data(){
      return {
        packageNo: this.$route.query.packageNo || '9774414262004',
        orderId:this.$route.query.orderId,
        where:this.$route.query.where,
        img:(this.$route.query.img || '').split(',')[0],
        count:this.$route.query.count || 1,
        lookImg:false,
        logisticsInfo:{},
      }
    },
    created(){
      this.getInfo()
//      console.log(this.$route.query)
//      console.log(this.img)
    },
    mounted(){
      this.$header.setTitle('查看物流')
    },
    methods: {
      getData(){
        if(this.$route.query.isFromAdmin === 'admin'){
          return this.get('order-center/logistics/getLogisticsInfoAdmin',{packageNo:this.packageNo,orderId:this.orderId}).then(res=>{
            if(res && res.code == 200){
              this.logisticsInfo = res.data.logisticsInfo;
              let obj = {
                acceptAt:this.logisticsInfo.storeSendAt,
                descInfo:'卖家已发货',
                flowStatus:'0',
              }
              if(!this.logisticsInfo.logisticsDesc || this.logisticsInfo.logisticsDesc.length === 0){
                this.logisticsInfo.logisticsDesc = [obj]
              }else{

                this.logisticsInfo.logisticsDesc.push(obj)
              }
            }else{
              this.$toast(res?res.message:'获取包裹列表失败')
            }
            this.$loading.show=false
          })
        }else{
          return this.getWithToken('order-center/logistics/getLogisticsInfo',{packageNo:this.packageNo,orderId:this.orderId}).then(res=>{
            if(res && res.code == 200){
              this.logisticsInfo = res.data.logisticsInfo
              let obj = {
                acceptAt:this.logisticsInfo.storeSendAt,
                descInfo:'卖家已发货',
                flowStatus:'0',
              }
              if(!this.logisticsInfo.logisticsDesc || this.logisticsInfo.logisticsDesc.length === 0){
                this.logisticsInfo.logisticsDesc = [obj]
              }else{
                this.logisticsInfo.logisticsDesc.push(obj)
              }
            }else{
              this.$toast(res?res.message:'获取包裹列表失败')
            }
            this.$loading.show=false
          })
        }
      },
      getInfo(){
        if(this.where === 'orderList'){
          this.getWithToken('order-center/logistics/logisticPackageList',{orderId:this.orderId}).then(res=>{
            if(res && res.code == 200){
              this.packageNo = res.data.packageList.length?res.data.packageList[0]['packageNo']:''
              this.getData()
            }else{
              this.$toast(res?res.message:'获取包裹信息失败')
            }
          })
        }else{
          this.getData();
        }
      },
      call(num){
        window.location.href = "tel:"+(num+'')
      },


    },
    filters:{
      flowSta(s){
        let obj = {'0':'已发货', '1': '已揽件','2':'运输中','3':'派送中','4':'已签收','5':'揽收失败','6':'签收失败','7':'退件','8':'问题件','9':'滞留'}
        return obj[s+'']
      },
      getDay(time){
//        var data = new Date(time);
//        function addZero(val){
//          return val < 10?"0" +val:val
//        }
//        var month  =  addZero(data.getMonth() + 1);
//        var day    =  addZero(data.getDate());
//        return month + '-' + day
        let day = time.split('-')
        return day[1] + '-' + day[2].split(' ')[0]

      },
      getMin(time){
//        function addZero(val){
//          return val < 10?"0" +val:val
//        }
//        var data = new Date(time);
//        var hour   =  addZero(data.getHours());
//        var minute =  addZero(data.getMinutes());
//        return hour + ':' + minute
        let t = time.split(' ')
        let t1 = t[1].split(':')
        return t1[0]+':'+t1[1]
      }
    }

  }
</script>

<style lang="scss" scoped>
.logistics{
  .space{
    background: #FAFAFA;
    height:.2rem;
  }
  .l-tip{
    padding:.14rem .2rem;
    background:rgba(255,248,248,1);
    .delay-img{
      width:.26rem;
      height:.26rem;
      vertical-align: middle;
    }
    .delay-text{
      width:6.7rem;
      margin-left:.14rem;
      color:#ff6533;
    }
  }
  .l-bot-tip{
    padding:0 .3rem;
    margin-top:-.1rem;
    .bot-tip-con{
      background:rgba(255,248,248,1);
      color:#ff6533;
      line-height: .36rem;
      padding:.24rem .3rem;
      .bot-tip-phone{
        color:#007AFF;
        margin-left:.06rem;
      }
    }

  }
  .l-top{
    padding:.4rem .3rem;
    .goods-img{
      width:2.4rem;
      height:1.68rem;
      .l-img-tip{
        position: absolute;
        left:0;
        bottom:0;
        width:100%;
        height:.36rem;
        line-height: .36rem;
        text-align: center;
        color:#fff;
        font-size: .2rem;
        background:rgba(0,0,0,0.4);
      }
    }
    .l-message{
      padding-left:.3rem;
      line-height: .42rem;
      .l-phone{
        color:#007AFF;
      }
      .m-right{
        margin-left:.2rem;
      }
    }
  }
  .l-middle{
    padding:.4rem .3rem .3rem;
    .address-img{
      img{
        width:.3rem;
      }

    }
    .address-text{
      width:6.4rem;
      margin-left:.2rem;
    }
  }
  .l-bottom{
    padding-left:.3rem;
    .l-bot-con{
      /*padding-right:.3rem;*/
      .l-box{
        padding-top:.39rem;
        .l-item{
          height:1.58rem;
          .item-left{
            width:1rem;
            margin-top:-.08rem;
          }
          .item-center{
            width:.3rem;
            .s-img{
              width:.3rem;
              height:.3rem;
              img{
                display: block;
                width:100%;
                height:100%;
                border:none;
              }
            }
            .v-line-box{
              height:1.28rem;
              width:.3rem;
              position: relative;
              .v-line{
                position: absolute;
                left:50%;
                top:0;
                width:1px;
                box-sizing: border-box;
                height:100%;
                background: #E3E3E3;
                transform: translateX(-50%);
              }
            }
          }
          .item-right{
            width:5.29rem;
            margin-left:.3rem;
            margin-top:-.06rem;
            .sub-status{

            }
          }
        }
      }
    }
  }
  .slide-bottom-enter,.slide-bottom-leave-to{
    transform: translateY(100%);
  }
  .slide-bottom-enter-active,.slide-bottom-leave-active{
    transition: all .3s;
  }
}
</style>
