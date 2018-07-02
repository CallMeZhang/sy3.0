<template>
  <div class="account">
    <div v-title="'账户与安全'"></div>
    <div class="info bg-f border-bottom-1px">
      <!--部门-->
      <div class="avatar font30 border-bottom-1px" @click="modifyNum">
        <div class="clearfix">
          <span>手机号</span>
          <p class="fr rin-con" :class="{'fr-color':!phone}">{{phone ? phone : "未设置"}}</p>
        </div>
      </div>
      <div class="avatar font30" @click="weChart">
        <div class="clearfix">
          <span>微信号</span>
          <p class="fr rin-con" :class="{'fr-color':wechatNum == 'N'}">{{wechatNum =='Y' ? wxName : "未绑定"}}</p>
        </div>
      </div>
    </div>
    <div class="info bg-f border-top-1px border-bottom-1px">
      <div class="avatar font30" @click="aboutPassword">
        <div class="clearfix">
          <span>密码</span>
          <p class="fr rin-con" :class="{'fr-color':password == 'N'}">{{password == 'Y' ? "已设置" : "未设置"}}</p>
        </div>
      </div>
    </div>
    <!--&lt;!&ndash;弹框&ndash;&gt;-->
    <!--<div class="del fixed" v-show="showAlert">-->
      <!--<div class="del-goods bg-f cen">-->
        <!--<div class="">-->
          <!--<p class="font32 del-order-t">确定要解绑微信号？</p>-->
        <!--</div>-->
        <!--<div class="clearfix">-->
          <!--<div class="font34 fl del-cancel" @click="showAlert = false">取消</div>-->
          <!--<div class="font34 fr del-confirm" @click="">确定</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        phone:'',
        wechatNum:'',
        password:'',
        alertStr:'',//弹框文案
        showAlert:false,
        wxName:'',
      }
    },
    created(){
      this.password = this.$route.query.password || '';
      this.getData();

      window.wxLoginState = (v)=>{
        v = v.toString()
        if(v == '1'){
          this.getData();
          this.$toast('绑定成功');
        }else {
          this.$toast(v)
        }

      }
      var that=this
      window.nativeAlertOk = (v) => {
        that.relieveWeChart();
      };
      window.nativeAlertCancel = (v) => {
      };
    },
    computed:{

    },
    mounted(){
      this.$header.setTitle('账户与安全')
      window.accountSecurityRefresh=(res)=>{
        this.getData();
      }
      setTimeout(()=>{
        this.syJsbIosRegisterHandler('accountSecurityRefresh')
      },0)
    },
    methods:{
      //获取数据
      getData (){
        this.getWithToken('/user-center/usr/memberByToken').then(res => {
          if(res.code == 200){
            this.phone = res.content.mobile;
            this.wxName = res.content.wxName;
            this.wechatNum = res.content.hasBindWx;
            this.password = res.content.hasPassword;
          }
          this.$loading.show=false
        })
      },
      //解绑微信接口
      relieveWeChart (){
        this.postWithToken("/user-center/usr/unBindWx").then(res => {
          if(res.code == 200){
            this.$toast('解绑成功');
            this.getData ();
          }else {
            this.$toast(res.message)
          }
        })
      },
      //微信解绑
      weChart(){
        if(this.wechatNum == 'Y'){
          this.nativeAlert({
            alertTitle:'',
            alertDesc:'确定要解绑微信号？',
            alertOk:'确定',
            alertCancel:'取消',
            okCallBackJs:'nativeAlertOk',
            cancelCallBackJs:'nativeAlertCancel'
          })
        }else{
          this.wxLogin();
        }
      },
      //手机号
      modifyNum(){
        if(!this.phone){
          this.appOpen('modifyPhone2',{type:'setting'})
        }else{
          this.appOpen('modifyPhone',{phone:this.phone})
        }
      },
      //密码
      aboutPassword (){
        if(this.password == 'N'){
          //设置密码
          this.appOpen("setPassword",{phone:this.phone,where:'set'});
        }else{
          //修改密码
          this.appOpen('modifyPassword',{phone:this.phone})
        }
      }

    },


  }
</script>

<style lang="scss" scoped>
  .account {
    width:100%;
    height:100%;
    background:rgba(250,250,250,1);
  }
  .info {
    padding-left: .3rem;
    border-bottom:.2rem solid #FAFAFA;
  }
  .inf-bor {
    border:none;
  }
  .avatar {
    background: url("/static/images/common/arrow.png") no-repeat 96% 50%;
    background-size:.13rem .22rem ;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
  }
  .avatar-img {
    width:.6rem;
    height:.6rem;
    margin-top:.14rem;
  }
  .rin-con {
    margin-right:.62rem;
  }
  .fr-color {
    color:rgba(208,208,208,1);
  }

  /*弹框*/
  .del {
    width:100%;
    height:100%;
    top:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,.4);
    /*opacity:.4;*/
    z-index:999;
  }
  .del-goods {
    width:5.6rem;
    /*height:3.5rem;*/
    background:rgba(255,255,255,1);
    border-radius: 0.16rem ;
  }
  .del-tit {
    color:rgba(46,46,46,1);
    line-height:0.5rem;
    border-bottom:1px solid #D0D0D0;
    text-align: center;
    padding:.1rem .3rem .38rem;
  }
  .del-order-t {
    line-height:1.29rem;
    color:rgba(46,46,46,1);
    border-bottom:1px solid #D0D0D0;
    text-align: center;
  }
  .del-cancel,.del-confirm{
    color:rgba(0,122,255,1);
    line-height:1rem;
    width:2.78rem;
    text-align: center;
  }
  .del-cancel {
    border-right:1px solid #D0D0D0;
  }
</style>
