<template>
  <div id="app">
    <v-header text="一起善缘" ref="h" v-on:changeTitle="changeTitle" v-if="showHeader"></v-header>
    <div :class="{'iphoneTop-box':titleHiden}" style="height: 100%" id='m-box'>
      <router-view @hideHeader="fn"></router-view>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  Vue.prototype.hideLoading = function(){};
  export default {
  name: 'App',
  data() {
    return {
      titleHiden:true,
      showHeader:true,
      showLoading:true,
    }
  },
  mounted(){
    Vue.prototype.$header=this.$refs.h
  },
  methods:{
    changeTitle(f){
      this.titleHiden=f
    },
    fn(){
      this.showHeader = false;
    },
  }
}
</script>

<style lang="scss">
@import '../static/css/base';
.header{
  height: 44px;
}
</style>
