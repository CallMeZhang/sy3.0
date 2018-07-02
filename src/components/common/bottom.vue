<template>
    <div>
      <div class="sy-bottom-bar">
        <span v-show="showTime">最后更新于：{{date}} © 17shuanyuan.com</span>
        <span v-show="!showTime">© 17shanyuan.com</span>
      </div>
    </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components: {},
    props:{
      date:{
        default:new Date().getHours() + ':' + new Date().getMinutes()
      },
      showTime:{
        default:false
      }
    },
    data(){
      return {
//        date:new Date
      }
    },
    created(){

    },
    mounted(){

    },
    methods: {
      fn(){
//        window.location.href = '/static/t.html'
      }
    },


  }
</script>

<style lang="scss" scoped>
.sy-bottom-bar{
  width:100%;
  height:1.12rem;
  line-height: 1.12rem;
  text-align: center;
  color:#E3E3E3;
  background: #FAFAFA;
}
</style>
