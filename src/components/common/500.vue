<template>
  <div class="container">
    <span>
      我们的服务器好像出问题了。。。。
      <br/>
      程序员小哥正在努力修复，请稍后
    </span>
  </div>
</template>

<script>
  export default {
    mounted(){
      this.$header.customBehavior(()=>{
        this.syJsbCloseAppPage(0,1)
      })
      setTimeout(()=>{
        this.$loading.show=false
      },0)
    },

  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .container span {
    margin: auto;
  }
</style>
