<template>
  <!-- 发现优品 地域优品 -->
  <div class="area" v-if="data.qualityGoods">
    <div class="i-title">
      <div class="flex between">
        <div class="w-700 font48 color2e">{{data.qualityGoods.name}}</div>
        <div class="i-title-right">
          <div class="flex between" @click="appOpen(data.qualityGoods.moreLink,{},true)">
            <div class="font26 color94">{{data.qualityGoods.moreName}}</div>
            <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <div class="area-box">
      <div class="area-con">
        <div class="slide-con">
          <div class="slide-item" v-for="item in data.qualityGoods.countyList" @click="appOpen(item.linkUrl,{},true)">
            <img v-lazy="item.image + ossUrl('webp_240')" alt="" v-img-cover="item.image + ossUrl('webp_240')">
          </div>

        </div>
      </div>
      <div class="goods-box">
        <div class="goods-item border-bottom-1px" v-for="item in data.qualityGoods.goodsList" @click="open(item)">
          <div class="clearfix">
            <div class="goods-desc fl">
              <div class="goods-title no-enter2">
                <span class="goods-tip"  style="margin-right:.16rem;" v-if="item.contentTag">{{item.contentTag}}</span>
                <span class="w-700 font32">{{item.title}}</span>
              </div>
              <div class="goods-text w-300 color4b no-enter2">{{item.desc}}</div>
            </div>
            <div class="goods-img fr">
              <img v-lazy="item.image + ossUrl('webp_240')" alt="" v-img-cover="item.image + ossUrl('webp_240')">
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
    props:['data'],
    components: {},
    data(){
      return {
        isLoading: true
      }
    },
    created(){
    },
    mounted(){

    },
    methods: {
      open(item){
        this.$parent.open(item);
      }
    },


  }
</script>

<style lang="scss" scoped>

  @import './css';
  .area{
  padding-bottom:.28rem;
  .area-box{
    .area-con{
      padding-bottom:.2rem;
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

</style>
