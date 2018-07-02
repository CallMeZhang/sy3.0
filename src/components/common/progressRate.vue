<template>
    <div>
      <div class="process-bar">
        <div class="process-bg" :style="{width:rate >= 100?'100%':rate+'%'}"></div>
        <div class="slide-box">
          <div class="inner-slide">
            <div class="process-slide" :style="{left:rate >= 100?'100%':rate+'%'}">{{rate >= 100?'完成':rate+'%'}}</div>
          </div>
        </div>
      </div>


    </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components: {},
    props:{
      rate:{
        default:0
      }
    },
    data(){
      return {

      }
    },
    created(){

    },
    mounted(){

    },
    methods: {

    },


  }
</script>

<style lang="scss" scoped>
  $red:#FF1919;
  .process-bar{
    position: relative;
    margin-top:.2rem;
    height:.14rem;
    box-sizing: border-box;
    border-radius: .08rem;
    background: #FFF8F8;
    border:1px solid $red;
    .process-bg{
      height:100%;
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1))
    }
    .slide-box{
      position: absolute;
      left:-1px;
      top:0;
      width:100%;
      height:100%;
      padding-right:.8rem;
      box-sizing: border-box;
      .inner-slide{
        height:100%;
        position: relative;
        .process-slide{
          position: absolute;
          width:.8rem;
          height:.3rem;
          line-height: .3rem;
          /*left:0;*/
          top:0;
          margin-top:-.12rem;
          border:1px solid $red;
          border-radius: .16rem;
          color:$red;
          background: #fff;
          text-align: center;
        }
      }

    }
  }
</style>
