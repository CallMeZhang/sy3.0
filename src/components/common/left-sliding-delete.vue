
<template>
  <div class="delete">
    <div class="slider">
      <div class="content"
           @touchstart='touchStart'
           @touchmove='touchMove'
           @touchend='touchEnd'
           :style="deleteSlider"
      >
        <!-- 插槽中放具体项目中需要内容         -->
        <slot></slot>
      </div>
      <div class="remove" ref='remove' @click="handleClick(index)"  v-html="conText">
      </div>
    </div>

  </div>
</template>

<script>
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
        startX:0,   //触摸位置
        endX:0,     //结束位置
        moveX: 0,   //滑动时的位置
        disX: 0,    //移动距离
        startY:0,
        endY:0,
        moveY:0,
        disY:0,
        isScrolling:0,//判断是垂直滚动还是水平滚动
        startPos:{},
        endPos:{},
        deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
      }

    },
    methods:{
      handleClick (index) {
        console.log('handleClick')
        this.$emit('msg-from-child',index);
        this.deleteSlider = "transform:translateX(0" + "rem)";
      },
      touchStart(ev){
        ev= ev || event
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        let touch = ev.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        this.startPos = {x:touch.clientX,y:touch.clientY,time:+new Date}; //取第一个touch的坐标值
        this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
        if(ev.touches.length == 1){
          // 记录开始位置
          this.startX = ev.touches[0].clientX;
          this.startY = ev.touches[0].clientY;
          this.isScrolling = 0;
        }
        console.log('touchStart')
      },
      touchMove(ev){
        ev = ev || event;
        //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
        //当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if(ev.targetTouches.length > 1 || ev.scale && ev.scale !== 1) return;
        let touch = ev.targetTouches[0];
        this.endPos = {x:touch.clientX - this.startPos.x,y:touch.clientY - this.startPos.y};
        this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
//        console.log('isScrolling: '+this.isScrolling)
//        console.log(touch)
        let wd=this.$refs.remove.offsetWidth;
          if(ev.touches.length == 1) {
            // 滑动时距离浏览器左侧实时距离
            this.moveX = ev.touches[0].clientX;
            this.moveY = ev.touches[0].clientY;
            //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
            this.disX = this.startX - this.moveX;
            this.disY = this.startY - this.moveY;
            // 如果是向右滑动或者不滑动，不改变滑块的位置
            if(this.isScrolling === 0){
              event.preventDefault();
              if((this.disX < 0 || this.disX == 0)) {
                this.deleteSlider = "transform:translateX(0px)";
                // 大于0，表示左滑了，此时滑块开始滑动
              }else if (this.disX > 10) {
                //具体滑动距离我取的是 手指偏移距离*5。
                this.deleteSlider = "transform:translateX(-" + this.disX*10 + "px)";

                // 最大也只能等于删除按钮宽度
                if (this.disX*10 >=wd) {
                  this.deleteSlider = "transform:translateX(-" +wd+ "px)";

                }
              }
            }
          }
      },
      touchEnd(ev){
//        ev.preventDefault()
        console.log('touchEnd')
        ev = ev || event;
        let wd=this.$refs.remove.offsetWidth;

        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          let endY = ev.changedTouches[0].clientY;
          this.disX = this.startX - endX;
          this.disY = this.startY - endY;
          console.log(this.disX);
          console.log(this.disY);
          if(this.isScrolling === 0){
            if ((this.disX*5) < (wd/2)) {

              this.deleteSlider = "transform:translateX(0px)";
            }else{
              //大于一半 滑动到最大值
              this.deleteSlider = "transform:translateX(-"+wd+ "px)";
            }
          }

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slider{
    width: 100%;
    min-height:2rem;
    height:100%;
    position: relative;
    user-select: none;
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  /*   设置过渡动画*/
  transition: 0.3s;
  background:#fff;
  }
  .remove{
    position: absolute;
    width:1.2rem;
    /*min-height:2rem;*/
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    background:red;
    right: 0;
    top: 0;
    color:#fff;
    text-align: center;
    font-size: 0.26rem;
    line-height:0.4rem;
    }
  }

</style>
