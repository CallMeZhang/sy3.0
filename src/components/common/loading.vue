<template>
  <div style="">
    <transition name="fade">
      <div v-show="show" class="loading-p" @touchmove.prevent>
        <img :src="imgUrl+'/common/loading.gif'" alt="" class="loading">
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
        show:true
      }
		},
		created() {
//      var routerName=to.path
//      if(routerName=='/index'||routerName=='index'||routerName=='index'||routerName=='/mine'){
//        this.show=false
//      }
      setTimeout(()=>{
        this.show=false
      },6000)
		},
		methods: {},
		components: {}
	}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .loading-p{
    position: fixed;
    background: #fff;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 9999;
  }
.loading{
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top:50%;
  left: 50%;
  margin: -0.3rem 0 0 -0.3rem;
}
</style>
