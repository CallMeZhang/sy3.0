<template>
  <div>
    <verify @success="verifySuccess" @error="verifyError" :isNative="isNative"></verify>
  </div>
</template>

<script>
  import verify from '@/pages/login/verify';

  export default {
    components: {verify},
    data(){
      return {
        isNative:this.$route.query.isIos === 'yes',
//        isLoading: true,
      }
    },
    created(){

    },
    mounted(){
      this.$loading.show = false;
      try{
        this.$loading.show = false;
        this.$header.show = false
      }catch (e){
        setTimeout(()=>{this.$header.show = false;this.$loading.show = false;},0)
      }
    },
    methods: {
      verifySuccess(param){
        let data = {
          status:true,
          data:param
        }
        this.verifyLogin(data)
      },
      verifyError(e){
        let data = {
          status:false,
          data:e
        }
        this.verifyLogin(data)
      }
    },


  }
</script>

<style lang="scss" scoped>
  //@import "/bocm/platformjs/static/css/common.css";
</style>
