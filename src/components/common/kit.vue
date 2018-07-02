
<template>
  <div class="page">

    <div class="sy-space"></div>

    <!-- 按钮 -->
    <!-- 普通红色按钮 类名sy-btn  红色边框文字 类名 btn-red  白色背景灰色文字 类名 btn-f -->
    <div class="sy-btn-box">
      <div class="sy-btn btn-red">按钮文字</div>
    </div>

    <!--  单选按钮 -->
    <div class="sy-radio">
      <div class="radio-left">选中文字</div>
      <div class="radio-img" @click="isShow = !isShow" :style="{borderColor:isShow?'transparent':''}">
        <transition name="fade2">
          <img :src="imgUrl+'/common/checked.png'" alt="" v-show="isShow">
        </transition>
      </div>
    </div>

    <div class="sy-space"></div>

    <!-- switch 组件 -->
    <sy-switch v-model="switchCheck" @change="switchFn"></sy-switch>

    <div class="sy-space"></div>

    <!-- 表单元素 -->
    <div style="padding-left:.3rem;border-top:1px solid #E3E3E3">
      <!-- 列表 -->
      <div class="sy-list">
        <div class="left">左侧文字</div>
        <div class="right">右侧文字</div>
        <img :src="imgUrl+'/common/arrow.png'" alt="">
      </div>

      <!-- 文本框 -->
      <div class="sy-input">
        <div class="sy-input-text">这是左侧文字</div>
        <input type="text" placeholder="占位符提示">
      </div>

      <!--<div class="sy-space"></div>-->

      <!-- 正确提示 -->
      <div class="sy-input">
        <div class="sy-input-text">这是左侧文字</div>
        <input type="text" placeholder="占位符提示">
        <img :src="imgUrl+'/common/ok.png'" alt="" class="ok-img">
      </div>

      <!-- 右侧提  示 -->
      <div class="sy-input">
        <div class="sy-input-text">这是左侧文字</div>
        <input type="text" placeholder="占位符提示">
        <div>元</div>
      </div>

      <!-- 手机号 -->
      <div class="sy-input">
        <div class="sy-input-text">手机号</div>
        <input type="text" placeholder="占位符提示">
        <div class="get-code">获取验证码</div>
      </div>
    </div>

    <div class="sy-space"></div>

    <!--<div class="sy-switch">-->
      <!--<div class="text">左侧文字</div>-->
      <!--<div class="right-icon" @click="switchCheck = !switchCheck">-->
        <!--<div class="icon-bg" :class="switchCheck?'check':''"></div>-->
        <!--<div class="icon-ball" :class="switchCheck?'check':''"></div>-->
      <!--</div>-->
    <!--</div>-->

    <div class="sy-space"></div>

    <!-- 文本域 -->
    <div class="sy-textarea">
      <div class="text">表单标题</div>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>

    <div class="sy-space"></div>

    <!-- 图片上传 -->
    <div class="sy-img-upload">
      <div class="title">图片上传</div>
      <div class="cont">
        <div class="img-cont" v-for="(item,index) in imgList">
          <img src="/mine/about_us/about_us_2.png" alt="">
          <img :src="imgUrl+'/common/close3.png'" alt="删除" class="del-img" @click="delImg(index)">
        </div>
        <div class="add-img">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="text">添加照片</div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import sySwitch from './switch'
  export default {

    data(){
      return {
        isShow:false,
        switchCheck:false,
        test: [],
        imgList:[
          "../../../static/images/index/payment/succ_2.png",
          "../../../static/images/index/payment/succ_2.png",
          "../../../static/images/index/payment/succ_2.png",
          "../../../static/images/index/payment/succ_2.png",
          "../../../static/images/index/payment/succ_2.png",
          "../../../static/images/index/payment/succ_2.png",
        ],
      }
    },
    created(){
//      this.$toast('23423423')


    },
    mounted(){
      this.$loading.show = false;
    },
    methods:{
      switchFn(v){
        console.log(v)
        console.log(this.switchCheck)
      }

    },
    components:{sySwitch}

  }
</script>

<style lang="scss" scoped>

  .page{
    /*padding:.3rem;*/
    /*padding-left:.3rem;*/
    background: #fff;
  }
  .sy-space{
    height:.3rem;
    background: #eee;
  }
  .sy-btn-box{
    font-size:.32rem;
    color:#FFFFFF;
    text-align: center;
    .sy-btn{
      height:.88rem;
      width:5.4rem;
      box-sizing: border-box;
      margin:0 auto;
      line-height: .88rem;
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
      border-radius: 0.16rem ;
    }
    .sy-btn:active{
      background:linear-gradient(90deg,rgba(204,20,20,1),rgba(204,80,40,1));;
    }
    .sy-btn.disabled{
      background:linear-gradient(90deg,rgba(203,203,203,1),rgba(223,223,223,1));
    }
    .sy-btn.btn-f{
      background: #fff;
      color:#2E2E2E;
      border:1px solid #D0D0D0;
    }
    .sy-btn.btn-f:active{
      background: #FAFAFA;
    }
    .sy-btn.btn-f.disabled{
      opacity: .5;
    }
    .sy-btn.btn-red{
      background: #fff;
      color:#FF1919;
      border:1px solid #FF1919;
    }
    .sy-btn.btn-red:active{
      background: #FAFAFA;
    }
    .sy-btn.btn-red.disabled{
      opacity: .5;
    }
  }

  .sy-switch{
    height:.88rem;
    display: flex;
    align-items: center;
    font-size: .32rem;
    padding:0 .3rem;
    .text{
      flex:1;
    }


    .right-icon{
      display: inline-block;
      position: relative;
      width:52px;
      height:32px;
      border: 1px solid #E3E3E3;
      border-radius: 16px;
      box-sizing: border-box;
      background: #FF1919;
      .icon-bg,.icon-ball {
        content: " ";
        position: absolute;
        left:0;
        top:0;
        transition:transform .3s;
        border-radius: 15px;
      }

      .icon-ball {
        width: 30px;
        height:30px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
      }

      .icon-bg {
        width: 50px;
        height:30px;
        background-color: #fdfdfd;
      }
      .icon-bg.check {
        transform: scale(0);
      }

      .icon-ball.check {
        transform: translateX(20px);
      }

    }


  }
  .sy-list{
    height:.88rem;
    /*padding:0 .3rem;*/
    padding-right:.3rem;
    font-size: .32rem;
    /*line-height: .88rem;*/
    align-items: center;
    display: flex;
    .left{
      flex: 1;
      color:#2E2E2E;
    }
    .right{
      padding-right:.14rem;
      color:#949494;
    }
    img{
      width:.14rem;
      height:.26rem;
      line-height: 0;
    }
  }
  .sy-img-upload{
    padding:0 .3rem;
    height:.72rem;
    line-height: .72rem;
    font-size: .26rem;
    background: #FAFAFA;
    color:#949494;

    .title{

    }
    .cont{
      padding:.3rem 0;
      display: flex;
      flex-wrap: wrap;
      &>div{
        position: relative;
        width:1.5rem;
        height:1.5rem;
        margin:.1rem;
      }
      .img-cont{
        .del-img{
          position: absolute;
          top:-0.15rem;
          right:-0.15rem;
          height:.4rem;
          width:.4rem;
        }
      }
      .add-img{
        width:1.5rem;
        height:1.5rem;
        text-align: center;
        border:1px dashed #E3E3E3;
        border-radius: .1rem;
        .line1,.line2{
          position: absolute;
        }
        .line1{
          width:.6rem;
          height:.02rem;
          background: #D0D0D0;
          left:50%;
          top:.6rem;
          margin-left:-.3rem;
        }
        .line2{
          height:.6rem;
          width:.02rem;
          background: #D0D0D0;
          left:50%;
          top:.3rem;
          margin-left:-.01rem;
        }
        .text{
          padding-top:.8rem;
        }
      }
    }
  }
  .sy-input{
    height:.88rem;
    border-top:1px solid #E3E3E3;
    box-sizing: border-box;
    /*padding: 0 .3rem;*/
    padding-right:.3rem;
    font-size: .32rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .sy-input-text{
      padding-right:.3rem;
      /*min-width:1.2rem;*/
    }
    input{
      flex:1;
      font-size: .32rem;
      overflow: hidden;
    }
    .ok-img{
      width:.32rem;
      height:.32rem;
    }
    .get-code{
      /*width:2rem;*/
      line-height: .88rem;
      color:#FF1919;
      height:100%;
      padding-left:.2rem;
      border-left:1px solid #E3E3E3;
    }
  }
  .sy-radio{
    padding: 0 .3rem;
    height:.88rem;
    box-sizing: border-box;
    font-size: .32rem;
    display: flex;
    align-items: center;
    .radio-left{
      flex:1;
    }
    .radio-img{
      height:.44rem;
      width:.44rem;
      box-sizing: border-box;
      border:1px solid #D0D0D0;
      border-radius: 50%;


      img{
        height:100%;

      }
    }
  }
  .sy-textarea{
    display: flex;
    font-size: .32rem;
    padding-top:.2rem;
    padding-left:.3rem;
    background: #fff;
    .text{

    }
    textarea{
      flex: 1;
      font-size: .3rem;
      padding-left:.2rem;
      padding-right:.2rem;
    }
  }
  .fade2-enter,.fade2-leave-to{
    opacity: 0;
  }
  .fade2-enter-active,.fade2-leave-active{
    transition: opacity .2s;
  }



</style>
