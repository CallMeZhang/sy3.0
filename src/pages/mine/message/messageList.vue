<template>
  <div class="container">
    <div v-title="'消息'"></div>
    <div class="list bg-f border-bottom-1px">
      <div class="row system border-bottom-1px" @click="sysMsg">
        <span class="font30 row-mess">系统消息</span>
        <div class="point-bg" v-show="msg.sysCount > 0"></div>
      </div>
      <div class="row active"  @click="goDet">
        <span class="font30 row-mess">活动通知</span>
        <div class="num" :class="{'num-left':msg.manCount > 99}" v-show="msg.manCount">
          <p class="num-det num-wid2 font24" :class="{'num-wid3':msg.manCount > 99}">
            <span :class="{'num-p':msg.manCount > 10}">{{msg.manCount > 99 ? 99 : msg.manCount}}<span v-show="msg.manCount > 99">＋</span></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:'messageList',
    components:{},
    data(){
      return {
        msg:{}
      }
    },
    created(){
      this.appNotify({callback:'mineRefresh'})
      this.getData();
    },
    mounted(){
      this.$header.setTitle('消息');
      this.$loading.show = false
      window.messageListRefresh=(res)=>{
        this.getData();
      }
      this.syJsbIosRegisterHandler('messageListRefresh')
    },
    methods:{
      getData(){
        this.getWithToken('/msg-center/message/messageCount').then(res => {
          if(res.code == 200){
            this.msg = res.data;
          }else{
            this.$toast(res.message)
          }

        })
      },
      goDet(){
        // this.appNotify({callback:'messageListRefresh'})
        // this.appNotify({callback:'mineRefresh'})
        this.appOpen('messageDetails',{type:'manMadeMsg'});
      },
      sysMsg(){
        // this.appNotify({callback:'messageListRefresh'})
        // this.appNotify({callback:'mineRefresh'})
        this.appOpen('messageDetails',{type:'sysMsg'})
      },

    },


  }
</script>

<style lang="scss" scoped>
  .container {
    height:100%;
    background: #FAFAFA;
  }
  .list {
    padding-left:.3rem;
  }
  .row {
    padding:.25rem 0;
    position: relative;
  }
  .system {
    background: url(/static/images/mine/systemMessage.png) left center/50% 50% no-repeat;
    background-size: .7rem;
  }
  .active {
    background: url(/static/images/mine/activeMessage.png) left center/50% 50% no-repeat;
    background-size: .7rem;
  }
  .row-mess {
    color:rgba(46,46,46,1);
    line-height:0.7rem;
    padding-left:1rem;
  }
  .point-bg {
    width:9px;
    height:9px;
    background: #FF1919;
    border:1.5px solid #FFF;
    border-radius: 50%;
    position: absolute;
    top:.25rem;
    left:.5rem;
  }
  .point {
    width:.18rem;
    height:.18rem;
    border-radius: 50% 50%;
    background: #FF1919;
  }
  .point-pos {
    top:.26rem;
    left:.58rem;
  }
  .num {
    position: absolute;
    min-width:.26rem;
    min-height: .26rem;
    border-radius: .8rem;
    border: 1.5px solid #fff;
    top:.2rem;
    left:.52rem;
    text-align: center;
  }
  .num-p {
    padding-left:.05rem;
  }
  .num-left {
    left:.35rem;
  }
  .num-det {
    min-width:.26rem;
    min-height: .26rem;
    background: #FF1919;
    border-radius: .8rem;
    color:rgba(255,255,255,1);
    line-height:0.28rem;
  }
  .num-wid2 {
    width:.34rem;
    height:.34rem;
    line-height: .36rem !important;
  }
  .num-wid3 {
    width:.6rem;
    height:0.34rem;
    line-height: .36rem !important;
  }
</style>
