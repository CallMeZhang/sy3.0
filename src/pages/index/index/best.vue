<template>
  <!-- 最优推荐 首焦 -->
  <div class="best" v-if="data.focusList">
    <div class="best-con">
      <div class="slide-con">
        <div class="slide-item relative" v-for="(item,k) in data.focusList" :key="k" @click="open(item)">
          <img v-lazy="item.image + ossUrl('webp_480')" alt="">
          <div class="best-tip font28">{{item.tag}}</div>
          <div class="best-title font30">
            <div class="title-con">{{item.title}}</div>
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
        focusList:[],
      }
    },
    created(){
//      setTimeout(()=>{this.data.focusList[0].title = '测试四大发送到发送到发送到的阿sdfgsdfgsd斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬'},1000)

//      setTimeout(()=>{this.data.focusList = this.data.focusList.concat(this.data.focusList)},1000)
//      this.focusList = this.data.focusList;
//      console.log(this.focusList)
//      console.log(4444)
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
  ::-webkit-scrollbar{
    display: none;
    width:0;
    background: transparent;
  }
  .best{
    padding: 0 0 .2rem;
    .best-con{
      width:100%;
      height:3.2rem;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling:touch;
      white-space: nowrap;
      .slide-con{
        overflow: auto;
        .slide-item{
          width:6.7rem;
          height:3.2rem;
          margin-right:.2rem;
          display: inline-flex;
          .best-tip{
            position: absolute;
            left:.2rem;
            top:0;
            background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
            color:#fff;
            border-radius: 0 0 .1rem .1rem;
            width:1.28rem;
            height:0.5rem;
            text-align: center;
            line-height: .5rem;
          }
          .best-title{
            position: absolute;
            /*bottom:.3rem;*/
            /*left:0.3rem;*/
            color:#fff;
            width:100%;
            bottom:0;
            /*padding-left:.3rem;*/
            /*padding-top:.4rem;*/
            /*padding:.2rem .3rem;*/
            white-space: normal;
            box-sizing: border-box;
            line-height:.44rem;
            min-height:1.6rem;
            /*background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 8%, #000000 90%);*/
            background-image: linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.2),rgba(0,0,0,0.45));
            .title-con{
              position: absolute;
              padding:0 .3rem;
              bottom:0.2rem;
            }
          }
        }
        .slide-item:first-child{
          margin-left:.3rem;
        }
      }
    }
  }
</style>
