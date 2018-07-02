<template>
  <div class="bg">
    <div v-title="'益客邀请函'"></div>
    <div class="con">
      <img v-lazy="imgUrl+'/mine/100code.png' + ossUrl('webp_480')" alt="" class="top-img">
      <div class="det">
        <p>
          <span v-show="where == 'register'">您已注册成功</span>
          <span v-show="where == 'alerdyRegister'">您已经是注册用户</span>
        </p>
        <p>
          <span v-show="where == 'register'">100公益积分已发放到您的账户中</span>
          <span v-show="where == 'alerdyRegister'">立即登录app邀请好友也可以获得100积分</span>
        </p>
        <p v-show="where == 'register'">赶快下载app参与更多公益活动</p>
      </div>
      <div class="btn" @click="openDown">
        <span v-show="where == 'register'">下载应用</span>
        <span v-show="where == 'alerdyRegister'">打开应用</span>
      </div>
    </div>
  </div>
</template>
<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        where:''
      }
    },
    created(){
      document.title = '益客邀请函'
      this.where = this.$route.query.where || '';
    },
    mounted(){
      this.$header.show = false;
      this.$loading.show = false
    },
    methods:{
      openDown(){
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn'
      },

    },
  }
</script>

<style lang="scss" scoped>
  .bg {
    background: url('/static/images/mine/bg.png') no-repeat;
    background-size: cover;
    width:100%;
    height:100%;
  }
  .con {
    padding-top:.78rem;
  }
  .top-img {
    width:4.49rem;
    height:4.51rem;
    display: block;
    margin:0 auto .59rem;
  }
  .det {
    font-size:0.32rem;
    color:rgba(75,75,75,1);
    line-height:0.46rem;
    text-align: center;
  }
  .btn {
    width:5.4rem;
    height:0.88rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
    font-size:0.32rem;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    text-align: center;
    margin:1.32rem auto 0;
  }
</style>
