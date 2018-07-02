<template>
  <div class="delete" >
    <div class="slider container" :class="{'slider-height':isControl()}">
      <div class="content"
           @touchstart='touchStart'
           @touchmove='touchMove'
           @touchend='touchEnd'
           :style="deleteSlider">
        <slot></slot>
      </div>
      <div class="remove active" :class="{'slider-height':isControl()}" ref='remove' @click="handleClick">
        <!--.88rem-->
        <div style="padding-top:.88rem" :class="{'remove-top':isControl()}">移出</div>
        <div style="padding-top:.02rem">心愿单</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['controlNum','index','deleteSlider'],
    data() {
      return {
        startX:0,  //开始触摸位置
        startY:0,
        moveX: 0,  //滑动时的位置
        moveY:0,
        disX: 0,  //移动距离
        disY:0,
        // deleteSlider: '',//滑动时的效果
        angle:0,//滑动的角度
        cartId:''
      }
    },
    computed:{

    },
    created(){
      // console.log(this.controlNum,1111111111111)
      // console.log(this.index,22222222)
    },
    methods:{
      //是否显示限购
      isControl(){
        if(this.controlNum.buyLimitCount > 0 && !this.showNone(this.controlNum.goodsStatus)){
          return true
        }else{
          return false
        }
      },
      //显示没商品
      showNone(v){
        if(v == 1 || v == 2 || v == 4 || v == 5 || v == 6 || v == 7 || v == 0){
          return true;
        }else {
          return false;
        }
      },
      handleClick (v) {
        this.$emit('msg-from-child')
      },
      touchStart(ev){
        this.cartId = this.index;
        ev = ev || event
        if(ev.touches.length == 1){                 //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX;     // 记录开始位置
          this.startY = ev.touches[0].clientY;     // 记录开始位置
        }
      },
      touchMove(ev){
        ev = ev || event;
        let wd=this.$refs.remove.offsetWidth;     //获取删除按钮的宽度，此宽度为滑块左滑的最大距离

        if(ev.touches.length == 1) {
          this.moveX = ev.touches[0].clientX;      // 滑动时距离浏览器左侧实时距离
          this.moveY = ev.touches[0].clientY;      // 滑动时距离浏览器左侧实时距离
          this.disX = this.startX - this.moveX;    //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disY = this.startY - this.moveY;    //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          let angle = Math.abs(this.disY) / Math.abs(this.disX)
          if (angle < .58) {
            if((this.startX > this.moveY && this.startY > this.moveY) || (this.startX > this.moveY && this.moveY > this.startY )){ //左滑
              ev.preventDefault();
              this.deleteSlider = "transform:translateX(-"+ wd + "px)";
            }else if((this.startX <= this.moveY && this.startY >= this.moveY) || (this.startX <= this.moveY && this.moveY >= this.startY )){ //右滑
              this.deleteSlider = "transform:translateX(0px)";
            }
          }
        }
      },
      touchEnd(ev){
        ev = ev || event;
        let wd=this.$refs.remove.offsetWidth;
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          let endY = ev.changedTouches[0].clientY;
          this.disX = this.startX - endX;
          this.disY = this.startY - endY;
          this.angle = Math.abs(this.disY) / Math.abs(this.disX)
          if (this.angle < .58) {
            if((this.startX > endX && this.startY > endY) || (this.startX > endX && endY > this.startY )){ //左滑
              ev.preventDefault();
              this.deleteSlider = "transform:translateX(-"+ wd + "px)";
            }else if((this.startX <= endX && this.startY >= endY) || (this.startX <= endX && endY >= this.startY )){ //右滑
              this.deleteSlider = "transform:translateX(0px)";
            }
          }
        }
      },

    }
  }
</script>
<style scoped>
  .slider{
    width: 100%;
    /*3.22*/
    height:2.6rem;
    position: relative;
    user-select: none;
    /*touch-action: none;*/
  }
  .slider-height {
    height:3.22rem !important;
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background:#fff;
    z-index: 20;
      /*设置过渡动画*/
    transition: 0.3s;

  }
  .remove{
    position: absolute;
    width:1.2rem;
    height:2.6rem;
    background:#FF1919;
    right: 0;
    top: 0;
    color:#fff;
    text-align: center;
    font-size: 0.26rem;
    line-height: 0.4rem;
  }
  .remove-top{
    padding-top:1.3rem !important;
  }
</style>
