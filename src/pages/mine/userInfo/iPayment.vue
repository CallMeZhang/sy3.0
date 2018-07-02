<template>
  <div class="account iphoneTop-box">
    <div v-title="'支付管理'"></div>
    <div class="info bg-f border-bottom-1px">
      <div class="avatar font30" @click="goPayPassword">
        <div class="clearfix">
          <span>公益钱包密码管理</span>
          <p class="fr rin-con fr-color">已设置</p>
        </div>
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
        phone:'',
        hasWallet:''
      }
    },
    created(){
      this.phone = this.$route.query.phone || '';
      this.hasWallet = this.$route.query.hasWallet || '';
    },
    computed:{

    },
    mounted(){
      this.$header.setTitle('支付管理')
      this.$loading.show=false
    },
    methods:{
      goPayPassword (){
        this.appOpen("setPayPassword",{phone:this.phone})
      }

    },


  }
</script>

<style lang="scss" scoped>
  .account {
    width:100%;
    height:100%;
    background:rgba(250,250,250,1);
  }
  .info {
    padding-left: .3rem;
    border-bottom:.2rem solid #FAFAFA;
  }
  .inf-bor {
    border:none;
  }
  .avatar {
    background: url("/static/images/common/arrow.png") no-repeat 96% 50%;
    background-size:.13rem .22rem ;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
  }
  .avatar-img {
    width:.6rem;
    height:.6rem;
    margin-top:.14rem;
  }
  .rin-con {
    margin-right:.62rem;
  }
  .fr-color {
    color:rgba(208,208,208,1);
  }
</style>
