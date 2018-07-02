<template>
  <div class="account">
    <div v-title="'关于'"></div>
    <div class="logo">
      <img :src="imgUrl+'/common/about1.png'" alt="logo" class="logo-img">
      <p class="ver font30">一起善源 Ver.{{version}}</p>
    </div>
    <div class="info bg-f border-top-1px border-bottom-1px">
      <div class="avatar border-bottom-1px font30" v-if="isIos()" @click="getNewVersion()">为一起善源评分</div>
      <div class="avatar font30" @click="goDet">关于一起善源</div>
    </div>
    <div class="bottom absolute" @click="appOpen('serviceAgreement')">
      <p class="det font26">《软件许可服务协议》</p>
      <p class="about font24">Coryright © 2017-2022，shanyuan.com.All rights reserved</p>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        version:''
      }
    },
    created(){
      //获取
      this.syJsbGetAppInfo((res)=>{
        if (typeof res == 'string') {
          res = JSON.parse(res);
        }
        this.version = res.ver;
        this.$loading.show=false
      })
    },
    computed:{

    },
    mounted(){
      this.$header.setTitle('关于')
    },
    methods:{
      goDet(){
        this.appOpen('letterDetails',{where:'article',noticeId:'9a29c8259e594dc293fe4b95eb313155'})
      },
    },


  }
</script>

<style lang="scss" scoped>
  .account {
    width:100%;
    height:100%;
    background:rgba(250,250,250,1);
  }
  .logo {
    height:3.62rem;
  }
  .logo-img {
    width:1.42rem;
    height:1.42rem;
    display: block;
    padding:.59rem 0 .29rem;
    margin:0 auto;
  }
  .ver {
    color:rgba(75,75,75,1);
    line-height:0.42rem;
    text-align:center;
  }
  .info {
    padding-left: .3rem;
    border-bottom:.2rem solid #FAFAFA;
  }
  .avatar {
    background: url("/static/images/common/arrow.png") no-repeat 96% 50%;
    background-size:.13rem .22rem ;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
  }
  .bottom {
    width:100%;
    left:0;
    bottom:.6rem;
  }
  .det {
    color:rgba(255,25,25,1);
    line-height:0.24rem;
    text-align: center;
    margin-bottom:.2rem;
  }
  .about {
    color:rgba(208,208,208,1);
    line-height:0.24rem;
    text-align: center;
  }
</style>
