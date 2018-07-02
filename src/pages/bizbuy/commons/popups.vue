<template>
  <div class="test-pop" v-show="isPopUp">
    <!--弹窗测试-->
    <div class="bg-mask" @click.stop="shut"></div>
    <div class="popup-con">
      <div class="con-descr">
        <h2 class="popUp-w-title">{{title}}</h2>
        <p class="popUp-w-txt" v-html="con"></p>
        <div class="popUp-w-btn border-top-1px">
          <slot>自定义内容</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'popup',
    props:{
      isPopUp:{//弹窗
        type:Boolean,
        default:false
      },
      title:{
        type:String,
        default:'温馨提示'
      },
      con:{
        type:String,
        default:'内容'
      },
      btnTxt:{
        type:String,
        default:'按钮内容'
      }
    },
    data () {
      return {
        closeX:this.isPopUp,
      }
    },
    methods: {
      shut(){
        this.closeX  = !this.closeX;
        this.$emit('pop-up',this.closeX);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .test-pop{
    position:relative;
    width:7.5rem;
    height:100%;
  }
  .bg-mask{
    position:fixed;
    left:0;
    top:0;
    z-index:999;
    background:rgba(0,0,0,0.4);
    width:100%;
    height:100%;
  }
  .popup-con{
    position:fixed;
    left:50%;
    top:50%;
    z-index:1000;
    transform: translate(-50%,-50%);
    width:6.6rem;
    text-align:left;
    .con-top{text-align:right;}
    .con-top img{
      width:0.6rem;
      height:0.6rem;
      margin-bottom:0.3rem;
    }
    .con-descr{
      background:#fff;
      border-radius:0.16rem;
      .popUp-w-title{
        padding:0 0.3rem;
        height:1.2rem;
        text-align: center;
        font-size:0.36rem;
        color:rgba(46,46,46,1);
        line-height:1.2rem;
      }
      .popUp-w-txt{
        padding:0 0.3rem 0.2rem;
        text-align: justify;
        min-height:1.5rem;
        font-size:0.32rem;
        color:rgba(46,46,46,1);
        line-height:0.5rem;
      }
      .popUp-w-btn{
        height: 1rem;
        padding:0 0.3rem;
        font-size:0.34rem;
        color:rgba(0,122,255,1);
        line-height:1rem;
        text-align:center;
      }

    }
  }
</style>
