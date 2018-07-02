<template>
  <div class="container">
    <div v-title="'消息'"></div>
    <!--头部-->
    <!--head start-->
    <div class="fixed bg-f" style="z-index: 100">
      <div class="flex bg-f head">
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='sysMsg'}" @click="select('sysMsg')">
          <p>系统消息 <span class="bor" v-show="!noMsg && count.sysCount > 0"></span></p>
          <!--<p>系统消息</p>-->
          <div class="red-line absolute" v-show="chooseType=='sysMsg'"></div>
        </div>
        <div class="head-com font30 relative" :class="{'read-font':chooseType=='manMadeMsg'}" @click="select('manMadeMsg')">
          <p>活动通知 <span class="bor-num font24" v-show="count.manCount">{{count.manCount}}</span></p>
          <div class="red-line absolute" v-show="chooseType=='manMadeMsg'"></div>
        </div>
      </div>
    </div>
    <div style="height:.9rem;"></div>
    <!--head end-->
    <!--无消息-->
    <div class="none-list" v-show="msgList.length == 0">
      <div class="non-pos absolute">
        <img :src="imgUrl+'/common/error.png'" alt="错误" class="error-img">
        <p class="error-det font32">暂无消息</p>
      </div>
    </div>
    <div class="list">
      <!--活动通知列表-->
      <div v-if="chooseType=='manMadeMsg'" v-for="list in msgList">
        <div class="list-head">
          <span class="list-time">{{list.day != ''? list.day : (list.createdAt | time)}}</span>
        </div>
        <div class="list-det ">
          <div class="bg-f det det-pad" @click="goDetail(list)">
            <p class="det-title">
              <span class="bor" v-show="list.isRead == 0"></span>
              <span>{{list.msgTemBo.title}}</span>
            </p>
            <div class="flex detail">
              <div class="relative">
                <img v-lazy="list.msgTemBo.images[0] + ossUrl('webp_240')" alt="" class="det-img">
                <p class="over" v-show="">已结束</p>
              </div>
              <p class="content">{{list.msgTemBo.conDesc}}</p>

            </div>
          </div>
        </div>
      </div>

      <!--系统消息列表-->
      <div v-if="chooseType =='sysMsg'" v-for="msg in msgList">
        <div class="list-head">
          <span class="list-time">{{msg.day != ''? msg.day : (msg.createdAt | time)}}</span>
        </div>
        <div class="list-det">
          <div class="bg-f det" @click="goDetail(msg)">
            <p class="det-title">
              <!--<span class="bor" v-show="msg.isRead == 0"></span>-->
              <span>{{msg.msgTemBo.title}}</span>
            </p>
            <div class="inform" >
              <p>{{msg.msgTemBo.msgContent && msg.msgTemBo.msgContent.conDTitle}}</p>
              <p>{{msg.msgTemBo.msgContent && msg.msgTemBo.msgContent.conDesc}}</p>
            </div>
            <div class="flex detail">
              <img v-lazy="msg.msgTemBo.images[0] + ossUrl('webp_240')" alt="" class="det-img">
              <div class="mess">
                <p  v-for="m in (msg.msgTemBo.msgContent && msg.msgTemBo.msgContent.conDFields)">{{m}}</p>
              </div>
            </div>
            <p class="rem border-bottom-1px">{{msg.msgTemBo.msgContent && msg.msgTemBo.msgContent.conEndDesc}}</p>
            <p class="look">{{msg.msgTemBo.msgContent && msg.msgTemBo.msgContent.conDText}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="wish-bottom font24" v-show="msgList.length > 0">
      <p>{{bottomDet}}</p>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:'messageDetails',
    components:{},
    data(){
      return {
        chooseType:'',
        pageSize:10,
        curPage:1,
        msgList:[],
        msgListAll:{},
        manMsgList:[],
        count:0,
        hasNext:false,
        isLoading:false,
        token:'',
        bottomDet:'',//底部加载描述
        noMsg:false,
      }
    },
    created(){
      this.chooseType = this.$route.query.type || '';
      if(this.chooseType == 'sysMsg'){
        this.noMsg = true;
      }
      this.getData(this.chooseType);
      this.getCount();
      //获取token
      this.syJsbGetAppInfo((res)=>{
        if (typeof res == 'string') {
          res = JSON.parse(res);
        }
        this.token = res.token;
      })
      //分页
      this.$scroll(() => {
        if(!this.isLoading){
          if(this.hasNext){
            this.getData(this.chooseType)
          }else{
            console.log('骚等，，，，，')
          }
        }
      })
    },
    mounted(){
      this.$header.setTitle('消息');
      window.messageDetailsRefresh=(res)=>{
        this.getCount();
        this.getData(this.chooseType);
      }
      this.syJsbIosRegisterHandler('messageDetailsRefresh')
      if(this.chooseType == 'sysMsg'){
        this.appNotify({callback:'messageListRefresh'})
        this.appNotify({callback:'mineRefresh'})
      }
    },

    methods:{
      //切换键
      select(v){
        if(v == 'sysMsg'){
          this.noMsg = true;
        }
        this.chooseType = v;
        this.curPage = 1;
        // this.$loading.show = true
        this.getData(this.chooseType);
        this.getCount();
      },
      //获取数据
      getData(chooseType){
        this.isLoading = true;
        this.getWithToken('/msg-center/message/messageList',{msgType:chooseType,curPage:this.curPage,pageSize:this.pageSize}).then(res => {
          if(res.code == 200){
            if(this.curPage == 1){
              this.msgList = res.data.messageList;
              if(this.msgList.length >= this.pageSize){
                this.hasNext = true
              }
            }else{
              this.hasNext = res.data.messageList.length > this.pageSize
              this.msgList = this.msgList.concat(res.data.messageList);
            }
            if(this.hasNext){
              this.curPage ++;
            }
          }else{
            this.$toast(res.message)
          }
          if(!this.hasNext){
            this.bottomDet = '© 17shuanyuan.com'
          }else{
            this.bottomDet = '加载中'
          }
          this.isLoading = false;
          this.$loading.show = false
        })
      },
      //获取未读数量
      getCount(){
        this.getWithToken('/msg-center/message/messageCount').then(res => {
          if(res.code == 200){
            this.count = res.data;
          }else{
            this.$toast(res.message)
          }
        })
      },
      //查看详情
      goDetail(u){
        this.getWithToken('/msg-center/message/readMessage',{umId:u.umId}).then(res => {
          if(res.code == 200){
            if(res.data.readFlag){
              this.appNotify({callback:'messageListRefresh'})
              this.appNotify({callback:'messageDetailsRefresh'})
              this.appNotify({callback:'mineRefresh'})
              this.curPage = 1;
              if(this.chooseType == 'sysMsg'){
                this.appOpen(u.msgTemBo.msgContent.conDEnd,null,true)
              }else{
                this.appOpen(u.msgTemBo.toUrl,null,true)
              }
              // this.getData(this.chooseType);
            }else{
              this.$toast(res.message)
            }
          }else{
            this.$toast(res.message)
          }
        })
      },
      //跳转活动通知详情
      // goManDet(msg){
      //   this.appOpen(msg.msgTemBo.toUrl+'&token='+this.token);
      //
      // }
    },
    filters:{
      time(v){
        return v.split(' ')[1].slice(0,5)
      },
    },

  }
</script>

<style lang="scss" scoped>
  .container {
    min-height:100%;
    background: #FAFAFA;
  }
  .head {
    height:.9rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom:1px solid #E3E3E3;
  }
  .head-com {
    width:3.25rem;
    height:.9rem;
    padding:0 .25rem;
    text-align: center;
    line-height:.86rem;
    font-weight: 300;
  }
  .red-line {
    width:2.2rem;
    height:0.04rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    left:.65rem;
    bottom:0;
    z-index:10;
  }
  .read-font {
    color:rgba(255,25,25,1) !important;
    font-weight: 500 !important;
  }
  .bor {
    width:0.14rem;
    height:0.14rem;
    border-radius: 50%;
    display: inline-block;
    background:rgba(255,25,25,1);
    margin-bottom: .05rem;
  }
  .bor-num {
    min-width:.34rem;
    height:.34rem;
    line-height: .36rem;
    display: inline-block;
    border-radius: 50%;
    color:rgba(255,255,255,1);
    background:rgba(255,25,25,1);
    margin-bottom: .03rem;
  }
  /*无列表*/
  .none-list {
  }
  .non-pos {
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .error-img {
    margin:0 auto;
    width:3.1rem;
    height:3.1rem;
  }
  .error-det {
    color:rgba(208,208,208,1);
    line-height:0.48rem;
    padding-top:.22rem;
    text-align: center;
  }
  /*列表*/
  .list {
    padding: .1rem .3rem 0;
  }
  .list-head {
    padding:.24rem .1rem .2rem .4rem;
    background: url('/static/images/mine/time.png') no-repeat left center;
    background-size: .3rem;
  }
  .list-time {
    font-size:0.26rem;
    color:rgba(208,208,208,1);
    line-height:0.37rem;
  }
  .list-det {
    margin-left:.14rem;
    border-left:1px solid #E3E3E3;
    padding-bottom:.24rem;
  }
  .det {
    margin-left: .24rem;
    padding:.3rem .26rem 0;
    box-shadow:.02rem .04rem .02rem rgba(0,0,0,.05);
  }
  .det-pad {
    padding-bottom:.3rem;
  }
  .det-title {
    font-size:0.3rem;
    color:rgba(46,46,46,1);
    line-height:0.42rem;
  }
  .inform {
    font-size:0.26rem;
    color:rgba(75,75,75,1);
    line-height:0.37rem;
    padding-top:.24rem;
  }
  .detail {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-top:.21rem;
  }
  .mess {
    font-size:0.24rem;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
    padding-left:.2rem;
    width:4.38rem;
    /*max-height: 1.11rem;*/
    overflow: hidden;
  }
  .rem {
    font-size:0.26rem;
    color:rgba(75,75,75,1);
    line-height:0.37rem;
    padding: .19rem 0 .3rem;
  }
  .look {
    font-size:0.26rem;
    color:rgba(148,148,148,1);
    line-height:.8rem;
    background: url("/static/images/common/arrow2.png") no-repeat 102% center;
    background-size: .44rem;
  }
  .over {
    position: absolute;
    top:.25rem;
    left:.25rem;
    width:0.9rem;
    height:0.9rem;
    background:rgba(0,0,0,0.6);
    border-radius: 50%;
    font-size:0.24rem;
    color:rgba(255,255,255,1);
    line-height:0.9rem;
    text-align: center;
  }
  .det-img {
    width:1.4rem;
    height:1.4rem;
    background:rgba(240,240,240,1);
  }
  .content {
    width:4.38rem;
    max-height:1.11rem;
    padding-left:.2rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .wish-bottom {
    height:1.12rem;
    background:rgba(250,250,250,1);
    font-weight: 300;
    color:rgba(227,227,227,1);
    line-height:1.12rem;
    text-align: center;
    box-sizing: border-box;
  }
</style>
