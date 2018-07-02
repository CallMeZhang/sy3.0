<template>
  <div class="sy-switch">
    <div class="text">{{text}}</div>
    <div class="right-icon" @click="switchCheck = !switchCheck;fn()">
      <div class="icon-bg" :class="switchCheck?'check':''"></div>
      <div class="icon-ball" :class="switchCheck?'check':''"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      value:{
        type:Boolean,
        default:false,
      },
      text:''
    },
    data(){
      return {
        switchCheck:this.value,
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{
      fn(){
        this.$emit('input',this.switchCheck);
        this.$emit('change',this.switchCheck)
      }
    },


  }
</script>

<style lang="scss" scoped>
  .sy-switch{
    height:.88rem;
    display: flex;
    align-items: center;
    font-size: .32rem;
    padding:0 .3rem;
    .text{
      flex:1;
    }


    .right-icon{
      display: inline-block;
      position: relative;
      width:52px;
      height:32px;
      border: 1px solid #E3E3E3;
      border-radius: 16px;
      box-sizing: border-box;
      background: #FF1919;
      .icon-bg,.icon-ball {
        content: " ";
        position: absolute;
        left:0;
        top:0;
        transition:transform .3s;
        border-radius: 15px;
      }

      .icon-ball {
        width: 30px;
        height:30px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
      }

      .icon-bg {
        width: 50px;
        height:30px;
        background-color: #fdfdfd;
      }
      .icon-bg.check {
        transform: scale(0);
      }

      .icon-ball.check {
        -webkit-transform: translate(20px, 0px);
        transform: translate(20px,0px);
      }

    }


  }
</style>
