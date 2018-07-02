<template>
    <div class="logisticsList">
      <div class="ls-top font26 color94 border-bottom-1px">
        该订单已有{{packageList.length}}个包裹发出
      </div>
      <div class="ls-list-box">
        <div class="ls-list border-bottom-1px" v-for="item in packageList" @click="appOpen('logistics',{packageNo:item.packageNo,orderId:orderId,img:item.packageImg,count:item.goodsNum})">
          <div class="ls-l-title">
            {{item.eName}}：{{item.packageNo}}
          </div>
          <div class="ls-l-con">
            <div class="clearfix">
              <div class="fl img-goods relative">
                <img :src="item.packageImg" alt="" v-img-cover="item.packageImg">
                <div class="l-img-tip" v-show="item.goodsNum>1">共{{item.goodsNum}}件商品</div>
              </div>
              <div class="fl ls-goods">
                <div class="ls-good-title font28 color4b no-enter">{{item.goodsName}}</div>
                <div class="ls-goods-status">{{item.packageStatus | flowSta}}</div>
              </div>
            </div>
          </div>
        </div>

      </div>



    </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components: {},
    data(){
      return {
        lookImg:false,
        orderId:this.$route.query.orderId || '201804280203172783286300001',
        packageList:[],
      }
    },
    created(){
      this.getData()
    },
    mounted(){
      setTimeout(()=>{
        this.$header.setTitle('查看物流')
      },0)
    },
    methods: {
      getData(){
        return this.getWithToken('order-center/logistics/logisticPackageList',{orderId:this.orderId}).then(res=>{
          if(res && res.code == 200){
            this.packageList = res.data.packageList
          }else{
            this.$toast(res?res.message:'获取包裹列表失败')
          }
          this.$loading.show=false
        })
      }
    },
    filters:{
      flowSta(s){
//        let obj = { '1': '揽件','2':'运输中','3':'派送中','4':'已签收','5':'揽收失败','6':'签收失败','7':'退件','8':'问题件','9':'滞留'}
        let obj = {'0':'默认','30':'已发货','40':'确认收货'}
        return obj[s+'']
      }
    }

  }
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar{
    display: none;
    width:0;
    background: transparent;
  }
.logisticsList{
  position: relative;
  height:100%;
  .ls-top{
    padding-left:.3rem;
    height:.72rem;
    line-height: .72rem;
    background: #FAFAFA;
  }
  .ls-list-box{
    padding-left:.3rem;
    .ls-list{
      padding-bottom:.4rem;
      .ls-l-title{
        padding:.34rem .3rem .2rem 0;
      }
      .ls-l-con{
        .img-goods{
          width:1.8rem;
          height:1.26rem;
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
        .ls-goods{
          width:4.9rem;
          margin-left:.2rem;
          .ls-good-title{

          }
          .ls-goods-status{
            margin-top:.5rem;
            color:#FF6533;
          }
        }
      }
    }
  }

  .browse-img{
    position: absolute;
    left:0;
    bottom:0;
    z-index: 10002;
    width:100%;
    height:3.14rem;
    background: #fff;
    .b-title{
      height:1.28rem;
      line-height: 1.28rem;
      text-align: center;
    }
    .img-box{
      width:100%;
      height:3.2rem;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling:touch;
      white-space: nowrap;
      .slide-con{
        overflow: auto;
        .slide-item{
          width:1.8rem;
          height:1.26rem;
          margin-right:.2rem;
          display: inline-flex;
        }
        .slide-item:first-child{
          margin-left:.3rem;
        }
      }
    }
  }

}
</style>
