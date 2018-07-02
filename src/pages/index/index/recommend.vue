<template>
  <!-- 公益积分回馈 -->
  <div class="recommend" v-if="data.feedBack">
    <div>
      <div class="i-title">
        <div class="flex between">
          <div class="w-700 font48 color2e">{{data.feedBack.name}}</div>
          <div class="i-title-right">
            <div class="flex between" @click="appOpen(data.feedBack.moreLink,{},true)">
              <div class="font26 color94">{{data.feedBack.moreName}}</div>
              <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <recommend-goods :recommendGoods="data.feedBack.goodsList"></recommend-goods>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
  import recommendGoods from '@/components/common/recommendGoodsNoTitle'
  export default {
    props:['data'],
    components: {recommendGoods},
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
      getData(){

      }
    },


  }
</script>

<style lang="scss" scoped>
  @import './css';
</style>
