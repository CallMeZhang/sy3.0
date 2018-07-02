<template>
  <div class="container">
    <div v-title="'快报列表'"></div>
    <header-search :key-word="keyWord"></header-search>
    <nav class="container_nav">
      <ul class="border-bottom-1px iphone10-paddingTop">
        <li :class="{active:chooseType=='show'}" @click.prevent.stop="select('show')">最新发布</li>
        <li :class="{active:chooseType=='look'}" @click.prevent.stop="select('look')">最新浏览</li>
        <li :class="{active:chooseType=='share'}" @click.prevent.stop="select('share')">最多分享</li>
      </ul>
    </nav>
    <div class="list" v-for="i in 3" @click="appOpen('letterDetails')">
      <div class="border-bottom-1px det">
        <div class="clearfix">
          <div class="fl " :class="{'det-fl':true}">
            <p class="title font32 " :class="{'no-enter2':true}">10亩茶山2300棵茶树只得3斤好茶,让茶汤给你最好的反馈。</p>
            <p class="introduce font26" :class="{'no-enter':true}">中央企业全面深化改革委员会第一次会议，审议通过了一大批文件！</p>
          </div>
          <div class="fr fr-img" v-show="true">
            <img :src="imgUrl+'/common/pays.png'" alt="img">
          </div>
        </div>
        <div class="clearfix bottom">
          <p class="time fl font24">2018.08.08</p>
          <p class="fr font24">
            <span class="num">345</span>
            <span class="look">浏览</span>
          </p>
        </div>
      </div>
    </div>
    <div class="list" v-for="i in 3" @click="appOpen('letterDetails')">
      <div class="border-bottom-1px det">
        <div class="clearfix">
          <div class="fl " :class="{'det-fl':false}">
            <p class="title font32 " :class="{'no-enter2':false}">10亩茶山2300棵茶树只得3斤好茶,让茶汤给你最好的反馈。</p>
            <p class="introduce font26" :class="{'no-enter':false}">中央企业全面深化改革委员会第一次会议，审议通过了一大批文件！</p>
          </div>
          <div class="fr fr-img" v-show="false">
            <img :src="imgUrl+'/common/pays.png'" alt="img">
          </div>
        </div>
        <div class="clearfix bottom">
          <p class="time fl font24">2018.08.08</p>
          <p class="fr font24">
            <span class="num">345</span>
            <span class="look">浏览</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
  import headerSearch from "@/components/common/header_search.vue"
  export default {
    components:{headerSearch},
    data(){
      return {
        keyWord:'四川粑粑柑',
        chooseType:'show'
      }
    },
    created(){

    },
    mounted(){
      this.$header.show = false;
    },
    methods:{
      //tab键切换
      select(v){
        this.chooseType = v;
      },
    },


  }
</script>

<style lang="scss" scoped>
  .container_nav{
    height:0.9rem;
    min-height:0.9rem;
  }
  .container_nav ul{
    position:fixed;
    top:43px;
    left:0;
    z-index:98;
    width:6.3rem;
    height:0.9rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 0.6rem 0;
    background-color:#fff;
  }
  .container_nav ul li{
    font-size:0.3rem;
    color:#2E2E2E;
    display:flex;
    align-items:center;
    font-weight: 300;
  }
  .container_nav ul li.active{
    color:#FF1919;
    font-size:0.3rem;
    font-weight:500;
  }
  /*列表*/
  .list {
    padding:0 .3rem;
  }
  .det {
    padding:.35rem 0;
  }
  .det-fl {
    width:4rem;
  }
  .fr-img {
    width:2.7rem;
    height:1.89rem;
    background: #e3e3e3;
  }
  img {
    width:100%;
    height:100%;
  }
  .title {
    color:rgba(46,46,46,1);
    line-height:0.45rem;
    font-weight: 700;
  }
  .introduce {
    color:rgba(75,75,75,1);
    line-height:0.38rem;
    padding-top:.13rem;
  }
  .bottom {
    padding-top:.26rem;
  }
  .time {
    color:rgba(148,148,148,1);
    line-height:0.33rem;
    background: url('/static/images/common/warn.png') no-repeat 0 50%;
    background-size: .26rem;
    padding-left:.3rem;
  }
  .num, .look{
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }
  .num {
    font-weight: 500;
  }
  .look {
    font-weight: 300;
  }
</style>
