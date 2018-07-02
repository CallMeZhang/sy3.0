<template>
  <div class="friend">
    <div v-title="'邀请益客'"></div>
    <img :src="imgUrl+'/mine/allDo.png'" alt="" class="top-img">
    <div class="det">
      <p>成功邀请益客</p>
      <p>您和好友均可获得</p>
      <p>100公益积分</p>
      <p>❖</p>
    </div>
    <div class="code">
      <div class="creat-code"></div>
      <p class="scan-code">扫描上方二维码面对面邀请</p>
    </div>
    <div class="cut-line">
      <span class="line"></span>
      <span class="or">or</span>
      <span class="line"></span>
    </div>
    <p class="invite-code">您的专属邀请码<span class="copy">复制</span></p>
    <p class="code-num">533427</p>
    <!--按钮-->
    <div class="fixed btn-pos iphone10-footer-padding">
      <div class=" btn font32">马上邀请</div>
    </div>

  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        showName:false,
      }
    },
    created(){

    },
    mounted(){
      this.$header.setTitle('邀请益客')
    },
    methods:{

    },

  }
</script>

<style lang="scss" scoped>
  .friend {
    height:100%;
    background: #fff;
  }
  /*头图*/
  .top-img {
    width:100%;
    height:3.6rem;
    vertical-align: top;
  }
  /*描述*/
  .det {
    padding-top:.04rem;
    font-size:0.26rem;
    color:rgba(75,75,75,1);
    line-height:0.4rem;
    font-weight: 300;
    text-align: center;
  }
  .code {
    padding:.3rem 0 .23rem;
    text-align: center;
  }
  .creat-code {
    width:2.2rem;
    height:2.2rem;
    background: #e3e3e3;
    margin-left: 2.65rem;
  }
  .scan-code {
    padding-top:.16rem;
    font-size:0.26rem;
    color:rgba(46,46,46,1);
    line-height:0.37rem;
    font-weight: 300;
  }
  .cut-line {
    padding:0 .6rem;
  }
  .line {
    display: inline-block;
    border-top:1px solid #E3E3E3;
    width:2.8rem;
  }
  .or {
    display: inline-block;
    font-size:0.3rem;
    color:rgba(148,148,148,1);
    line-height:0.42rem;
    font-weight: 300;
    width: .5rem;
    text-align: center;
    vertical-align: top;
  }
  .invite-code {
    padding:.26rem 0;
    font-size:0.3rem;
    color:rgba(46,46,46,1);
    line-height:0.42rem;
    font-weight: 300;
    text-align: center;
  }
  .copy {
    font-size:0.26rem;
    color:rgba(0,122,255,1);
    padding-left: .21rem;
  }
  .code-num {
    font-size:0.48rem;
    color:rgba(46,46,46,1);
    line-height:0.67rem;
    text-align: center;
  }
  /*按钮*/
  .btn {
    height:.98rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    color:rgba(255,255,255,1);
    line-height:0.98rem;
    text-align: center;
  }
  .btn-pos {
    width:100%;
    bottom:0;
    left:0;
  }
</style>

