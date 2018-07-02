<template>
    <div>
      <verify @success="verifySuccess" :isNative="isNative" v-show="show"></verify>
    </div>
</template>

<script>
  import verify from '@/pages/login/verify';

  export default {
    components: {verify},
    data(){
      return {
        isLoading: true,
        isNative:this.$route.query.isIos === 'yes',
        phone_num:this.$route.query.mobile,
        show:true,
      }
    },
    created(){
//      window.location.href = '/static/t.html'
    },
    mounted(){
      this.$loading.show = false;
      try{
        this.$header.show = false
        this.$loading.show = false;
      }catch (e){
        setTimeout(()=>{this.$header.show = false;this.$loading.show = false;},0)
      }
    },
    methods: {
      verifySuccess(param){
        param.mobile = this.phone_num;
        return this.get('/user-center/auth/slideGetMcode',param).then(res=>{
          if(res && res.code == 200){
            this.aliVerify(res)
          }else{
            this.show = false;
            this.$toast(res?res.message:'发送短信失败')
          }
        })

      },
    },


  }
</script>

<style lang="scss" scoped>
    //@import "/bocm/platformjs/static/css/common.css";
</style>
