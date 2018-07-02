<template>
  <div class="con">
    <div v-title="'软件许可及服务协议'"></div>
    <div class="info bg-f border-bottom-1px">
      <!--实名认证-->
      <p class="avatar font30 border-bottom-1px" @click="appOpen('aboutApp',{title:'用户协议',type:1})">用户协议</p>
      <p class="avatar font30" @click="appOpen('aboutApp',{title:'用户隐私保护协议',type:2})">用户隐私保护协议</p>
      <!--<p class="avatar font30">更多……</p>-->
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {

      }
    },
    created(){

    },
    mounted(){
      this.$header.setTitle("软件许可及服务协议")
      this.$loading.show=false
    },
    methods:{

    },


  }
</script>
<style lang="scss" scoped>
  .con {
    width: 100%;
    height: 100%;
    background: #FAFAFA;
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
</style>
