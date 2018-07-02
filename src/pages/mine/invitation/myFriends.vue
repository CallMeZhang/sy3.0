<template>
  <div class="friend" :class="{'fir-f':result.length == 0}">
    <div v-title="'我的益客圈'"></div>
    <div class="relative">
      <img :src="imgUrl+'/mine/friends.png'" alt="" class="top-img">
      <div class="succ">
        <p>成功邀请益客</p>
        <p> 您和好友均可获得<span class="font48"> 100 </span>公益积分</p>
      </div>
    </div>
    <!--暂无好友-->
    <div class="none-list" v-show="result.length == 0">
      <div class="non-pos absolute">
        <img :src="imgUrl+'/mine/empty.png'" alt="错误" class="error-img">
        <p class="error-det font28">哎哟，一个好友都还没有哦， 去邀请一个吧！</p>
      </div>
    </div>
    <!--好友列表-->
    <div class="list bg-f " :class="{'border-bottom-1px':result.length >= pageSize}"  v-show="result">
      <div class="list-con " :class="{'border-top-1px':k != 0}"  v-for="(i,k) in result">
        <div class="clearfix">
          <div class="fl">
            <!--<img v-lazy="i.avatar ? i.avatar + ossUrl('webp_120') :  imgUrl+'/mine/avatar.png'" alt="" class="fl-img fl">-->
            <img v-lazy="i.avatar ? i. avatar + ossUrl('webp_120') :  imgUrl+'/mine/avatar.png'" alt="" class="fl-img fl">
            <div class="info">
              <p class="name">
                <span v-show="i.remarks">{{i.remarks}}</span>
                <span v-show="!i.remarks">{{i.dispName}}</span>
                <span class="det" v-show="i.remarks">({{i.dispName}})</span>
              </p>
              <p class="num">公益积分<span>{{i.points}}</span></p>
            </div>
          </div>
          <div class="fr remark" @click="modify(i)">修改备注</div>
        </div>
      </div>
    </div>
    <div class="wish-bottom border-top-1px font24" v-show="result.length > 0">
      <p>{{bottomDet}}</p>
    </div>
    <div :class="{'line':result.length >= pageSize}"></div>
    <!--按钮-->
    <div class="fixed btn-pos iphone10-footer-padding" @click="invite">
      <div class=" btn font32">邀请益客</div>
    </div>
    <!--弹框修改姓名-->
    <div v-show="showName">
      <div class="modify-name fixed" @click="showName = false;isClick = false"></div>
      <div class="bg-f mod-bor pos-no fixed" :class="isClick ? 'pos-yes' : 'pos-no'">
        <p class="bor-tit">备注</p>
        <div class="name-input">
          <!--<input type="text" maxlength="6" placeholder="最多输入6个汉字" v-model="userName" ref="input" @click="isClick = true">-->
          <input type="text" maxlength="6" placeholder="最多输入6个汉字" v-model="userName" ref="input" @click="keyCome">
        </div>
        <div class="bor-btn" @click="confirm">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        showName:false,
        pageSize:8,
        pageNum:1,
        isLoading:false,
        result:[],
        hasNext:false,
        userName:'',
        v:'',
        mineData:{},
        qrCodeUrl:'',
        inviteCode:'',
        isClick:false,
        bottomDet:'',//底部加载描述
      }
    },
    created(){
      this.getFriendData();
      this.$scroll(() => {
        if(this.hasNext){
          if (!this.isLoading) {
            this.getFriendData();
          }else{
            console.log("请求中..骚等")
          }
        }
      })
    },
    mounted(){
      this.$header.setTitle('我的益客圈')
      this.getData();
      this.getCode();
    },
    methods:{
      getFriendData(){
        this.isLoading = true;
        this.getWithToken('/user-center/usr/inviteList',{pageSize:this.pageSize,pageNum:this.pageNum}).then(res=>{
          if(res.code == 200){
            if(this.pageNo == 1){
              this.result = res.content.result;
              this.hasNext = (res.content.totalPage > this.pageNum);
            }else {
              this.result = this.result.concat(res.content.result);
              this.hasNext = (res.content.totalPage > this.pageNum);
            }
            if(this.hasNext){
              this.pageNum ++;
            }
            if(!this.hasNext){
              this.bottomDet = '© 17shuanyuan.com'
            }else{
              this.bottomDet = '加载中'
            }
            this.isLoading = false;
          }else{
            this.$toast(res.message)
            this.isLoading = false;

          }
          this.$loading.show = false
        })
      },
      //确认修改备注
      modify(v){
        this.showName = true;
        this.v = v;
      },
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur() // ios隐藏键盘
        this.$refs.input.blur() // android隐藏键盘
      },
      //键盘弹起
      keyCome(){
        if(this.isAndroid()){
          this.isClick = true;
        }
      },
      confirm(){
        this.hideKeyboard();
        this.isClick = false
        if(this.userName){
          this.showName = false;
          this.postWithToken('/user-center/usr/setInviteRemarks',{inviteLogId:this.v.inviteLogId,remarks:this.userName}).then(res=>{
            if(res.code == 200){
              if(res.content){
                if(this.v.remarks){
                  this.$toast('修改成功');
                }else{
                  //没有备注的时候
                  this.$toast('设置成功');
                }
                this.v.remarks = this.userName
              }else{
                this.$toast('修改失败');
              }
            }else{
              this.$toast(res.message)
            }
            this.userName = ''
          })
        }else{
          this.$toast('请输入备注')
        }

      },
      //获取邀请码和二维码
      getCode(){
        this.getWithToken('/user-center/usr/getInviteCode').then(res=>{
          if(res.code == 200){
            this.inviteCode = res.content.inviteCode;
            this.qrCodeUrl = res.content.qrCodeUrl;
          }else{
            this.$toast(res.message)
          }
        })
      },
      getData(){
        this.getWithToken('/user-center/usr/home').then(res => {
          if(res.code == 200){
            this.mineData = res.content;
          }else {
            this.$toast(res.message)

          }
        })
      },
      //邀请益客
      invite(){
        let shareUrl = window.location.origin+'/weChartJoin?inviteCode='+this.inviteCode
        let params = {
          text:'和我一起来品味扶贫特产，精准帮扶贫困地区',
          url:shareUrl,
          title:'[爱・源于善] 一封益客邀请函',
          logo:this.imgUrl + '/common/about.png',
          inviteCode:this.inviteCode,
          qrCodeUrl:this.qrCodeUrl,
          sms:'[一起善源]爱・源于善，您的好友向您推荐一个精准扶贫平台，点击查看:' + shareUrl
        };
        this.syJsbInviteShare(params);
      },

    },

  }
</script>

<style lang="scss" scoped>
  ::-webkit-input-placeholder {/*Chrome/Safari*/
    font-size:0.36rem;
    color:rgba(227,227,227,1);
    line-height:0.88rem;
    font-weight: 300;
  }
  ::-moz-placeholder {/*Firefox*/
    font-size:0.36rem;
    color:rgba(227,227,227,1);
    line-height:0.88rem;
    font-weight: 300;
  }
  :-ms-input-placeholder {/*IE*/
    font-size:0.36rem;
    color:rgba(227,227,227,1);
    line-height:0.88rem;
    font-weight: 300;
  }
  .friend {
    height:100%;
    background: #FAFAFA;
  }
  .fir-f {
    background: #fff !important;
  }
  .top-img {
    width:100%;
    height:3.2rem;
    vertical-align: top;
  }
  .succ {
    font-size:0.3rem;
    color:rgba(255,255,255,1);
    line-height:0.48rem;
    text-align: center;
    position: absolute;
    top:.9rem;
    left:1.5rem;
  }
  .non-pos {
    top:55%;
    left:50%;
    /*transform: translate(-50%,-50%);*/
    margin-left: -1.8rem;
    margin-top: -2.4rem;
  }
  .error-img {
    margin-left:.35rem;
    width:2.8rem;
    height:2.8rem;
  }
  .error-det {
    color:rgba(208,208,208,1);
    line-height:0.48rem;
    padding-top:.22rem;
    text-align: center;
    max-width:3.64rem;
  }
  .btn {
    height:.98rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    color:rgba(255,255,255,1);
    line-height:0.98rem;
    text-align: center;
  }
  .btn-pos {
    width:100%;
    bottom:0;
    left:0;
  }
  /*列表*/
  .list{
    padding-left:.3rem;
  }
  .list-bot {
    padding-bottom:1.34rem;
  }
  .line{
    height:1.34rem;
  }
  .fl-img {
    display: block;
    width:0.76rem;
    height:0.76rem;
    background: #e3e3e3;
    border-radius: 50%;
  }
  img {
    width:100%;
    height:100%;
  }
  .info {
    display: inline-block;
    padding-left:.2rem;
    font-weight: 300;
  }
  .list-con {
    padding:.22rem .3rem .22rem 0;
  }
  .name {
    font-size:0.3rem;
    color:rgba(46,46,46,1);
    line-height:0.42rem;
  }
  .det {
    font-size:0.24rem;
    color:rgba(148,148,148,1);
  }
  .num {
    font-size:0.24rem;
    color:rgba(75,75,75,1);
    line-height:0.33rem;
  }
  .remark {
    width:1.3rem;
    height:0.4rem;
    border-radius: 0.2rem ;
    border: 1px solid #FF6533;
    font-size:0.26rem;
    color:rgba(255,101,51,1);
    line-height:0.4rem;
    font-weight: 300;
    text-align: center;
    margin-top: .18rem;
  }
  /*遮罩层修改名字*/
  .modify-name {
    width:100%;
    height:100%;
    background:rgba(0,0,0,1);
    opacity:.4;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:100;
  }

  .mod-bor {
    width:6.4rem;
    height:4.8rem;
    background:rgba(255,255,255,1);
    border-radius: 0.16rem ;
    z-index: 101;
    /*top:3.8rem;*/
    /*left:.55rem;*/
  }
  .pos-no {
    top:50%;
    left:50%;
    /*transform: translateY(-50%);*/
    margin-left: -3.2rem;
    margin-top: -2.4rem;
  }
  .pos-yes {
    top:35%;
  }
  .bor-tit {
    font-size:0.36rem;
    color:rgba(46,46,46,1);
    line-height:1.64rem;
    text-align: center;
  }
  .bor-btn {
    width:5.4rem;
    height:0.88rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
    text-align: center;
    font-size:0.32rem;
    color:rgba(255,255,255,1);
    line-height:.88rem;
    margin-left: .5rem;
  }
  .name-input {
    width:5.4rem;
    height:0.88rem;
    border-radius: 0.04rem ;
    border: 1px solid #e3e3e3;
    margin:0 .5rem .7rem;
    font-size:0.36rem;
    color:rgba(46,46,46,1);
    /*line-height:0.88rem;*/
    font-weight: 300;
    padding-left:.3rem;
    box-sizing: border-box;
  }
  input {
    width:100%;
    height:100%;
    line-height:.88rem;
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

