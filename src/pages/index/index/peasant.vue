<template>
  <!-- 助农推荐榜-->
  <div class="peasant" v-if="data.recommendGoods">
    <div class="peasant-box">
      <div class="i-title">
        <div class="flex between">
          <div class="w-700 font48 color2e">{{data.recommendGoods.name}}</div>
          <div class="i-title-right">
            <div class="flex between" @click="appOpen(data.recommendGoods.moreLink,{},true)">
              <div class="font26 color94">{{data.recommendGoods.moreName}}</div>
              <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <div class="good-item-box">
        <div class="goods-box">
          <div class="goods-item border-bottom-1px" v-for="item in data.recommendGoods.goodsList" @click="open(item)">
            <div class="clearfix">
              <div class="goods-desc fl">
                <div class="goods-title no-enter2">
                  <span class="goods-tip"  style="margin-right:.16rem;" v-if="item.contentTag">{{item.contentTag}}</span>
                  <span class="w-700 font32">{{item.title}}</span>
                </div>
                <div class="goods-text w-300 color4b no-enter2">{{item.desc}}</div>
              </div>
              <div class="goods-img fr">
                <img v-lazy="item.image  + ossUrl('webp_480')" alt="">
              </div>
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
        this.$parent.open(item)
      }
    },


  }
</script>

<style lang="scss" scoped>
  @import './css';
  .peasant{
    padding-bottom:.28rem;
  }
</style>
