<template>
  <!-- 快报 -->
  <div class="news" v-if="data.newsList">
    <div class="flex news-box item-cneter">
      <div class="news-left">
        <span class="new-line"></span>
        <img :src="imgUrl+'/index/news.png'" alt="">
      </div>
      <div class="news-con flex-1">
        <div :class="{'scroll-div':isScroll}" :style="{ marginTop }">
          <div class="color2e font28 no-enter scroll-item" v-for="item in data.newsList" @click="open(item)">{{item.content}}</div>
        </div>
      </div>
      <!--<div class="news-more" @click="appOpen('letterList')">-->
        <!--<img :src="imgUrl+'/common/arrow2.png'" alt="">-->
      <!--</div>-->
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
        isScroll:true,
        scrollIndex:0,
//        news:['1萨芬撒打发死大法师','2斯蒂芬广东省刚发送地方敢死队','3阿三发送到发送到阿斯蒂芬','4dddddasdfsddf']
      }
    },
    created(){

    },
    mounted(){
      this.amimate()
    },

    methods: {
      open(item){
        this.$parent.open(item)
      },
      amimate(){
        this.$nextTick(()=>{
          this.data.newsList = this.data.newsList.concat(this.data.newsList[0]);
          let timer1,timer2;
          let scroll = ()=>{
            if(this.scrollIndex < this.data.newsList.length){
              this.scrollIndex ++;
              this.isScroll = true
              if(this.scrollIndex === this.data.newsList.length){
                this.isScroll = false;
                this.scrollIndex = 0;
                clearInterval(timer1)
                clearInterval(timer2)
                timer2 = setTimeout(()=>{
                  scroll()
                },50)
                timer1 = setInterval(()=>{
                  scroll()
                },3000)
              }
            }
          }
          timer1 = setInterval( () => {
            scroll()
          },3000)


        })
      }
    },
    computed:{
      marginTop () {
        return -this.scrollIndex * 0.4 + 'rem'
      },
    },
    watch:{
      data(){
        this.amimate()
      }
    }

  }
</script>

<style lang="scss" scoped>
  .news{
  padding:.2rem .3rem;
  .news-box{
    align-items: center;
    justify-content: space-between;
    padding:.2rem 0;
    background: #FFF8F8;
    .news-left{
      min-width:1.13rem;
      height:.32rem;
      .new-line{
        display: inline-block;
        width:.1rem;
        height:.32rem;
        background: #FF6533;
      }
      img{
        margin-left:.1rem;
        width:.73rem;
        height:.32rem;
      }
    }
    .news-con{
      padding-left:.2rem;
      height:.4rem;
      overflow: hidden;
      .scroll-div{
        transition: margin-top 1s;
        .scroll-item{
          height:.4rem;
          line-height: .4rem;
        }
      }
    }
    .news-more{
      width:.5rem;
      height:.5rem;
    }
  }
}
</style>
