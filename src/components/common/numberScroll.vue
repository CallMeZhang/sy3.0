<template>
    <div class="num">
      <div :style="'transform: translate(0rem,'+-(number*0.6)+'rem);height: 6rem;transition: transform '+time+'ms ease;'" class="num-p">
        <p v-for="n in 10">{{n-1}}</p>
      </div>
    </div>
</template>

<script>
  export default {
    props:['num','time'],
    data(){
      return {
        number:0
      }
    },
    created(){

    },
    mounted(){
      setTimeout(()=>{
        this.number=parseInt(this.num)
      },1000)
    },
    methods: {
    },
    watch:{
    }
  }
</script>

<style lang="scss" scoped>
  .num{
    overflow: hidden;
    width:0.4rem;
    height:0.6rem;
    background:linear-gradient(180deg,rgba(239,239,239,1),rgba(253,253,253,1));
    border-radius:0.04rem;
    border:0.01rem solid rgba(208,208,208,1);
    text-align: center;
    p{
      font-size:0.28rem;
      color:rgba(255,101,51,1);
      line-height:0.6rem;
      text-align: center;
      height: 0.6rem;
    }
  }
  .num-p{

  }
  .slide-left-enter-active, .slide-left-leave-active {
    transform: translate(0rem,4rem);
  }
  .slide-left-enter, .slide-left-leave-to {
    transform: translate(0rem,0rem);
  }
</style>
