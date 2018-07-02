<template>
  <div class="bg">
    <div v-title="'益客邀请函'"></div>
    <div class="con">
      <img v-lazy="mineData.avatar == '' ? imgUrl+'/mine/avatar.png' : mineData.avatar + ossUrl('webp_120')" alt="" class="avatar">
      <div class="det">
        <p>我是{{mineData.dispName}}</p>
        <!--<p v-show="mineData.orgName">我代表{{mineData.orgName}}</p>-->
        <p>{{msg1}}</p>
        <p>{{msg2}}</p>
        <p>接受邀请您将获得100公益积分奖励</p>
      </div>
      <img v-lazy="imgUrl+'/mine/bg-cen.png' + ossUrl('webp_480')" alt="" class="cen-img" :style="{marginBottom:isBack?'.4rem':'.99rem'}">
      <p class="wite no-enter">更有公益项目和志愿活动等你来参与…</p>
      <div class="btn" @click="joinIn">立即加入</div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
  import wx from  '@/modules/webPay/wxAuthorize'
  import share from '../../../modules/_share/share'
  export default {
    components:{},
    data(){
      return {
        wxOpenId:'',
        wxUnionId:'',
        mineData:{},
        inviteCode:'',
        code:'',
        nickname:'',
        sex:'',
        headimgurl:'',
        isBack:false,
        msg1:'',
        msg2:'',
        isShare:''
      }
    },
    created(){
      document.title = '益客邀请函';
      this.inviteCode = this.$route.query.inviteCode || '';
      this.isShare = this.$route.query.isShare || '';
      this.getData();
      share({
        url:window.location.origin+'/weChartJoin?inviteCode='+this.inviteCode + '&isShare=yes',
        title:'[爱・源于善] 一封益客邀请函',
        text:'和我一起来品味扶贫特产，精准帮扶贫困地区',
        logo:this.imgUrl + '/common/about.png'
      })
    },
    mounted(){
      this.$header.show = false;
      this.code = this.$route.query.code
      if(this.inWeixin()){
        if(this.code){
          this.isBack = true
          this.wxUserInfo()
        }
      }

    },
    methods:{
      //验证是否注册过
      wxRegister(){
        this.get('/user-center/usr/checkWxReg',{wxOpenId:this.wxOpenId,wxType:'wx_pub',wxUnionId:this.wxUnionId}).then(res=>{
          if(res.code == 200){
            if(res.content){
              //跳转打开应用页面
             this.appOpen('downLoad',{where:'alerdyRegister'})
            }else{
              let params = {
                inviteCode:this.inviteCode,
                wxOpenId:this.wxOpenId,
                wxUnionId:this.wxUnionId,
                nickname:this.nickname,
                sex:this.sex,
                headimgurl:this.headimgurl,
              }
             this.appOpen('weChartLogin',params)

            }
          }
        })
      },
      //用户信息
      getData(){
        this.get('/user-center/usr/memberByInviteCode',{inviteCode:this.inviteCode}).then(res => {
          if(res.code == 200){
            this.mineData = res.content;
            this.msg1 = res.content.shareToast.split('，')[0]
            this.msg2 = res.content.shareToast.split('，')[1]
            if(this.msg2 == ''){
              this.msg1 = res.content.shareToast.split(',')[0]
              this.msg2 = res.content.shareToast.split(',')[1]
            }
          }else {
            this.$toast(res.message)
            if(this.isShare == 'yes'){
              this.appOpen('failure',{},false,false,true)
            }
          }
          this.$loading.show = false
        })
      },
      //获取微信数据
      wxUserInfo(){
        this.get('/user-center/wxApi/userInfo',{code:this.code}).then(r=>{
          if(r && r.code == 200){
            this.wxOpenId = r.content.openid
            this.wxUnionId = r.content.unionid
            this.nickname = r.content.nickname
            this.sex = r.content.sex
            this.headimgurl = r.content.headimgurl
            this.wxRegister();
          }else{
            this.$toast(r?r.message:'获取微信数据失败')
          }
        })
      },
      //立即加入
      joinIn(){
        if(this.inWeixin()){
          wx();
        }else{
          let params = {
            inviteCode:this.inviteCode,
            wxOpenId:this.wxOpenId,
            wxUnionId:this.wxUnionId,
            nickname:this.nickname,
            sex:this.sex,
            headimgurl:this.headimgurl,
          }
          this.appOpen('weChartLogin',params)
        }
        // wx().then(res=>{})

      },
    },
  }
</script>

<style lang="scss" scoped>
  .bg {
    background: url('/static/images/mine/bg.png') no-repeat;
    background-size: cover;
    /*background-size: 100%;*/
    width:100%;
    height:100%;
  }
  .con {
    padding-top:.4rem;
  }
  .avatar {
    display: block;
    width:1.2rem;
    height:1.2rem;
    background: #e3e3e3;
    border-radius: 50%;
    margin:0 auto;
  }
  .det {
    padding-top:.2rem;
    font-size:0.3rem;
    color:rgba(255,101,51,1);
    line-height:0.5rem;
    text-align: center;
    max-width: 6.9rem;
    margin: 0 auto;
  }
  .cen-img {
    display: block;
    width:6.14rem;
    height:4.46rem;
    margin: .52rem auto .99rem;
  }
  .wite {
    width:4.42rem;
    font-size:0.26rem;
    color:rgba(148,148,148,1);
    line-height:0.6rem;
    margin: 0 auto;
  }
  .btn {
    width:5.6rem;
    height:0.88rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
    font-size:0.32rem;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    font-weight: 500;
    text-align: center;
    margin: .1rem auto 0;
  }
</style>
