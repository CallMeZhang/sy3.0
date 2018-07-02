<template>
  <div v-title="cTitle">
    <div class="procurement-goods-list">
      <span>采购记录</span>
      <span @click="myAlert()">意向清单</span>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        cTitle:'集采清单',
      }
    },
    created() {
      console.log('集采商品清单')
    },
    mounted() {
      this.$nextTick(()=>{
        this.$loading.show = false;
      })
    },
    methods: {
      myAlert(){
        this.$confirm("弹窗");
      }
    },
  }
</script>
<style lang="scss" scoped>
  $red:red;
  .procurement-goods-list{color:$red;text-align:center;}
</style>
