<template>
  <!-- 扶贫先锋 -->
  <div class="person" v-if="data.pioneer">
    <div class="i-title">
      <div class="flex between">
        <div class="w-700 font48 color2e">{{data.pioneer.name}}</div>
      </div>
    </div>
    <div class="person-box">
      <div class="person-con">
        <div class="slide-con">
          <div class="slide-item relative" v-for="item in data.pioneer.content" @click="appOpen(item.linkUrl,{},true)">
            <img v-lazy="item.image  + ossUrl('webp_480')" alt="">
            <!--<div class="absolute person-info">-->
              <!--<div class="font26">王玉龙</div>-->
              <!--<div>长阳县助理人</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="bottom-line">
        <div class="border-bottom-1px"></div>
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
      this.getData()
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
  .person{
    padding-bottom:.28rem;
    .person-box{
      .person-con{
        width:100%;
        /*height:3.2rem;*/
        overflow-scrolling: touch;
        -webkit-overflow-scrolling:touch;
        white-space: nowrap;
        .slide-con{
          overflow: auto;
          .slide-item{
            width:2.2rem;
            height:2.8rem;
            margin-right:.2rem;
            display: inline-flex;
            img{
              height:100%;
              width:100%;
            }
            .person-info{
              width:100%;
              height:.89rem;
              left:0;
              bottom:0;
              background:linear-gradient(-90deg,rgba(0,0,0,0),rgba(0,0,0,1));
              color:#fff;
              box-sizing: border-box;
              padding:.1rem 0 0 .12rem;
            }
          }
          .slide-item:first-child{
            margin-left:.3rem;
          }
        }
      }
      .bottom-line{
        padding:0 .3rem;
        height:.5rem;
        &>div{
          height:.49rem;
        }
      }
    }
  }
</style>
