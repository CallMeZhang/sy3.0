<template>
  <!--使用：父组件 传参 showPopUp 控制是否显示 pTitle：头部文案，子组件修改父组件事件close-x 子组件可定制父组件内容-->
  <div v-show="showPopUp" @touchmove.prevent>
    <div class="p-w-mark" @click="closeX"></div>
    <div class="p-w-con">
      <div class="p-content">
        <div class="p-x-con"><span class="p-x" @click="closeX"></span></div>

        <div class="con">
          <div class="title" :style="titleStyle">{{pTitle}}</div>
          <slot>自定义内容</slot>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'pop-up-w',
    props: {
      showPopUp: {
        type: Boolean,
        default: false
      },
      pTitle:{
        type: String,
        default:'商品详情'
      },
      titleStyle:{
        type:String,
      }
    },
    data(){
      return {
        showPop: this.showPopUp
      }
    },
    watch: {
      showPop(val){
        this.$emit("close-x", val)
      }
    },
    methods: {
      closeX(){
        this.showPop = !this.showPop;
      }
    }
  }
</script>
<style lang="scss" scoped>

  .p-w-mark {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.1);
  }
  .p-w-con {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    width: 6.6rem;
    font-size: 0.24rem;
    border-radius: 0.08rem;
    .p-content {
      position: relative;
    }
    .p-x-con {
      position: relative;
      height: 0.6rem;
      margin-bottom:0.3rem;
    }
    .p-x {
      position: absolute;
      right: 0;
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background: none;
      transform: rotate(-45deg);
      border:1px solid #fff;
    }
    .p-x:before {
      display: inline-block;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.38rem;
      height: 0.02rem;
      background: #fff;
    }
    .p-x:after {
      display: inline-block;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.02rem;
      height: 0.38rem;
      background: #fff;
    }
    .con{
      width: 100%;
      min-height: 5rem;
      border-radius: 0.08rem;
      background: #fff;
      .title {
        margin-top: 0.1rem;
        height: 0.89rem;
        line-height: 0.89rem;
        text-align: center;
        font-size: 0.34rem;
        font-weight: 300;
        color:rgba(46,46,46,1);
        /*border-bottom: 1px solid rgba(218, 222, 228, 0.60);*/
        padding: 0 0.3rem;
      }
    }


  }
</style>
