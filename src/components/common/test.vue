<template>
  <div class="test_page"> 
    <!-- 一像素边框border-top-1px 上下一像素border-bottom-1px 默认颜色 #e3e3e3 -->
    <div style="height:40px;margin-top:20px;" class="border-top-1px border-bottom-1px"></div>

    <!-- 一像素边框border-1px 可变颜色 再定义一个类名 引入border.scss文件 使用在style中查看 -->
    <div style="height:40px;margin-top:20px;" class="border-1px ccc"></div>


    <div class="relative imgaa">
      <img data-v-19ee2845="" alt="" class="act-banner" src="https://cdnt.17shanyuan.com/topic/59/oss_fba95f36e5a2e86a1dd8244920693dcf.jpeg" lazy="loaded"><img data-v-19ee2845="" alt="" class="act-banner" src="https://cdnt.17shanyuan.com/topic/59/oss_5eb068be3c04cc588a50b9e9aa277a7f.jpeg" lazy="loaded"><img data-v-19ee2845="" alt="" class="act-banner" src="https://cdnt.17shanyuan.com/topic/59/oss_e1cb2ffd353043554cf02854f1e12f08.jpeg" lazy="loaded">
    </div>



  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components: {},
    data(){
      return {}
    },
    created(){
    },
    mounted(){

    },
    methods: {},


  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/border.scss";

  .test_page {
    .ccc {
      @include border-bottom(#ccc);
      @include border-top(red)
    }
  }
  .imgaa{
    img{
      display: block;
      border:none;
      margin-top:-1px;
    }
  }
</style>
