<template>
    <div>
      <!-- 导航 -->
      <div class="nav" v-if="data.navigation">
        <!--<div class="flex nav-box">-->
          <!--<div class="nav-item">-->
            <!--<img :src="imgUrl+'/index/town.png'" alt="">-->
            <!--<div class="nav-text color2e">故乡特产</div>-->
          <!--</div>-->
          <!--<div class="nav-item">-->
            <!--<img :src="imgUrl+'/index/poor.png'" alt="">-->
            <!--<div class="nav-text color2e">贫困户自营</div>-->
          <!--</div>-->
          <!--<div class="nav-item">-->
            <!--<img :src="imgUrl+'/index/code.png'" alt="">-->
            <!--<div class="nav-text color2e">扶贫码专区</div>-->
          <!--</div>-->
          <!--<div class="nav-item">-->
            <!--<img :src="imgUrl+'/index/collectivity.png'" alt="">-->
            <!--<div class="nav-text color2e">单位集采</div>-->
          <!--</div>-->
          <!--<div class="nav-item">-->
            <!--<img :src="imgUrl+'/index/shop.png'" alt="">-->
            <!--<div class="nav-text color2e">善源商场</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="flex nav-box">
          <div class="nav-item" v-for="(item,index) in data.navigation" @click="goNewPage(item,index)">
            <img :src="item.image" alt="">
            <div class="nav-text color2e no-enter">{{item.title}}</div>
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
      goNewPage(item,index){
         this.appOpen(item.linkUrl,null,true)
//       if(index == 2 || index == 3){
//         this.$toast('即将开通')
//       }else{
//         this.appOpen(item.linkUrl,null,true)
//       }
      }
    },


  }
</script>

<style lang="scss" scoped>
  .nav{
    padding:0 .2rem;
    .nav-box{
      /*padding:.2rem .3rem;*/
      padding:.2rem 0;
      overflow: hidden;
      /*justify-content: space-between;*/
      justify-content: space-around;
      align-items: center;
      .nav-item{
        text-align: center;
        img{
          width:.8rem;
          height:.8rem;
        }
      }
    }


  }
</style>
