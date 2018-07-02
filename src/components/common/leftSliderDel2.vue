<template>
  <div class="delete">
    <div class="slider">
      <div class="content"
           @touchstart='touchStart'
           @touchmove='touchMove'
           @touchend='touchEnd'
           :style="deleteSlider">
        <slot></slot>
      </div>
      <div class="remove active" ref='remove' @click="handleClick(index)">
        <div class="btn-con" v-html="conText"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      index: Number,
      conText: {
        type: String,
        default: '删除'
      }
    },
    data() {
      return {
        startX:0,  //触摸位置
        startY:0,
        endX:0,   //结束位置
        endY:0,
        moveX: 0,  //滑动时的位置
        moveY:0,
        disX: 0,  //移动距离
        disY:0,
        deleteSlider: '',//滑动时的效果
        angle:0,//滑动的角度
        isScrolling:0,//判断是垂直滚动还是水平滚动
        startPos:{},
        endPos:{},
      }
    },
    methods:{
      handleClick (index) {
        this.$emit('msg-from-child',index);
        this.deleteSlider = "transform:translateX(0" + "rem)";
      },
      touchStart(ev){
        ev = ev || event;
        let touch = ev.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        this.startPos = {x:touch.clientX,y:touch.clientY,time:+new Date}; //取第一个touch的坐标值
        this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
        if(ev.touches.length == 1){                 //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX;     // 记录开始位置
          this.startY = ev.touches[0].clientY;     // 记录开始位置
        }
      },
      touchMove(ev){
        ev = ev || event;
        //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
          if(ev.targetTouches.length > 1 || ev.scale && ev.scale !== 1) return;
        let touch = ev.targetTouches[0];
        console.log(touch)
        this.endPos = {x:touch.clientX - this.startPos.x,y:touch.clientY - this.startPos.y};
        this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
        let wd=this.$refs.remove.offsetWidth;
        if(ev.touches.length == 1) {
          // 滑动时距离浏览器左侧实时距离
          this.moveX = ev.touches[0].clientX

          //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disX = this.startX - this.moveX;
          console.log("this.isScrolling: " +this.isScrolling)
          // 如果是向右滑动或者不滑动，不改变滑块的位置
          if(this.isScrolling === 0){
//            ev.preventDefault();
            if(this.disX < 0 || this.disX == 0) {
              this.deleteSlider = "transform:translateX(0px)";
              // 大于0，表示左滑了，此时滑块开始滑动
            }else if (this.disX > 0) {
              //具体滑动距离我取的是 手指偏移距离*5。
              this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
              // 最大也只能等于删除按钮宽度
              if (this.disX*5 >=wd) {
                this.deleteSlider = "transform:translateX(-" +wd+ "px)";
              }
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
          if(this.isScrolling === 0){
            if ((this.disX*5) < (wd/2) || this.angle > .8) {               //如果距离小于删除按钮一半,强行回到起点
              this.deleteSlider = "transform:translateX(0px)";
            }else{
              this.deleteSlider = "transform:translateX(-"+wd+ "px)";    //大于一半 滑动到最大值
            }
          }
        }
      }
    }
  }
</script>
<style scoped>
  .slider{
    width: 100%;
    /*min-height:2.55rem;*/
    height:100%;
    position: relative;
    user-select: none;
    touch-action: none;
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
    /*min-height:2.55rem;*/
    height:100%;
    background:#FF1919;
    right: 0;
    top: 0;
    color:#fff;
    text-align: center;
    font-size: 0.26rem;
    line-height: 0.4rem;
  }
  .btn-con{
    width: 100%;
    height: 100%;
    display:flex;
    flex-flow:row nowrap;
    align-items: center;
    justify-content: center;
  }
</style>
