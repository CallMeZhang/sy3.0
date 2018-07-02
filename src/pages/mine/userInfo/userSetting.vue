<template>
  <div>
    <div v-title="'账户设置'"></div>
    <div>
    <!--<div class="iphone10-footer-paddingb20">-->
      <!--1-->
      <div class="info bg-f border-bottom-1px">
        <!--头像-->
        <div class="avatar font30 border-bottom-1px" @click="upload">
          <div class="clearfix">
            <span>头像</span>
            <!--<img :src="userInfo.avatar == ''? imgUrl+'/mine/avatar.png' :userInfo.avatar + ossUrl('webp_120')" alt="" class="avatar-img rin-con fr">-->
            <img :src="userInfo.avatar == ''? imgUrl+'/mine/avatar.png' :userInfo.avatar + ossUrl('webp_120')" alt="" class="avatar-img rin-con fr">
          </div>
        </div>
        <!--姓名-->
        <div class="avatar font30 border-bottom-1px" @click="modeifyN">
          <div class="clearfix">
            <span>姓名</span>
            <p class="fr rin-con">{{name()}}</p>
          </div>
        </div>
        <p class="avatar font30" @click="appOpen('completeInfo')">更多</p>
      </div>
      <!--2-->
      <div class="info bg-f border-top-1px border-bottom-1px">
        <!--部门-->
        <div class="avatar font30" :class="{'border-bottom-1px':userInfo.unionCode != ''}"
             @click="union">
          <div class="clearfix">
            <span>所属部门</span>
            <p class="fr rin-con">{{org()}}</p>
          </div>
        </div>
        <div class="avatar font30" v-show="userInfo.unionCode != ''" @click="appOpen('modifyName',{where:'num'})">
          <div class="clearfix">
            <span>员工号</span>
            <p class="fr rin-con">{{userInfo.staffCode}}</p>
          </div>
        </div>
      </div>
      <!--3-->
      <div class="info bg-f border-top-1px border-bottom-1px" @click="appOpen('cd')">
        <p class="avatar font30">地址管理</p>
      </div>
      <!--4-->
      <div class="info bg-f border-top-1px border-bottom-1px">
        <!--实名认证-->
        <div class="avatar font30 border-bottom-1px" @click="appOpen('realName',{name:userInfo.trueName,idNum:userInfo.idValue})">
          <div class="clearfix">
            <span>实名认证</span>
            <p class="fr rin-con" :class="{'font-col':userInfo.hasRealName == 'N'}">{{userInfo.hasRealName | isRealName}}</p>
          </div>
        </div>
        <p class="avatar font30 border-bottom-1px" @click="goAcc">账号与安全</p>
        <p class="avatar font30" v-show="userInfo.hasWallet == 'Y'" @click="appOpen('iPayment',{phone:userInfo.mobile,hasWallet:userInfo.hasWallet})">支付管理</p>
      </div>
      <!--5-->
      <div class="info bg-f border-top-1px border-bottom-1px" @click="appOpen('about')">
        <p class="avatar font30">关于</p>
      </div>
      <!--5-->
      <div class="info bg-f inf-bor border-top-1px border-bottom-1px" @click="logOut">
        <p class="logout font30">退出登录</p>
      </div>
    </div>
    <!--按钮-->
    <!--<div class="fixed btn-pos iphone10-footer-padding">-->
      <!--<div class=" btn font32 " @click="logOut">退出登录</div>-->
    <!--</div>-->
    <!--<div class="fixed btn font32" @click="logOut = true">退出登录</div>-->
    <!--&lt;!&ndash;弹框&ndash;&gt;-->
    <!--<div class="del fixed" v-show="logOut">-->
      <!--<div class="del-goods bg-f cen">-->
        <!--<div class="">-->
          <!--<p class="font36 title-prompt">退出确认</p>-->
          <!--<p class="font32 del-tit">确定要退出当前账户吗？</p>-->
        <!--</div>-->
        <!--<div class="clearfix">-->
          <!--<div class="font34 fl del-cancel" @click="logOut = false">取消</div>-->
          <!--<div class="font34 fr del-confirm" @click="logOff">确定退出</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  //import loading from '@/components/'
  export default {
    name:'userSetting',
    components:{},
    data(){
      return {
        // logOut:false,
        userInfo:'',//用户信息
        token:'',
        uploadType:'',//头像上传目录
        uploadJson:{},
        orgName:'',//部门名称,
        oldName:'',
        oldOrgName:'',
        url:''
      }
    },
    created(){
      this.getData();
      //获取token
      this.syJsbGetAppInfo((res)=>{
        if (typeof res == 'string') {
          res = JSON.parse(res);
        }
        this.token = res.token;
      })
      //上传头像
      window.setImageByUrl = json_data => {
        var data = eval('(' + json_data + ')');
        this.postWithToken('/user-center/usr/modifyAvatar',{avatar:data.images[0]}).then(res => {
          if(res.code == 200){
            this.$toast(res.message)
            this.userInfo.avatar = data.images[0];
            this.appNotify({callback:'mineRefresh'})
          }
        })
      }

    },
    mounted(){
      this.$header.setTitle('账户设置')
      window.userSettingRefresh=(res)=>{
        this.getData();
      }
      this.syJsbIosRegisterHandler('userSettingRefresh')
    },
    filters:{
      //是否实名认证
      isRealName(v){
        var str = '';
        switch (v){
          case 'Y':
            str = '已认证';
            break;
          case 'N':
            str = '未认证';
            break;
        }
        return str;
      },
    },
    methods:{
      //获取数据
      getData(){
        // this.oldOrgName = this.getLsItem('orgName') || '';
        // this.oldName = this.getLsItem('dispName') || '';
        this.getWithToken("/user-center/usr/memberByToken").then(res => {
          if(res.code == 200){
            this.userInfo = res.content;
            // this.userInfo.hasWallet = 'Y'
            // console.log(this.oldName,1,this.userInfo.dispName,2)
            // if((this.oldName != '' && this.oldName != this.userInfo.dispName) || ((this.oldOrgName != '') && this.oldOrgName != this.org())){
            //   this.appNotify({callback:'mineRefresh'})
              // this.removeLsItem('orgName')
              // this.removeLsItem('dispName')
            // }
          }else {
            this.$toast(res.message)
          }
          this.$loading.show = false
        })
      },
      //所属部门
      org(){
        if(this.userInfo.orgName && this.userInfo.orgName.length > 8){
          return '...'+' '+this.userInfo.orgName.substr(this.userInfo.orgName.length-8)
        }else {
          return this.userInfo.orgName;
        }
      },
      //名字
      name(){
        if(this.userInfo.dispName && this.userInfo.dispName.length > 8){
          return '...'+' '+this.userInfo.dispName.substr(this.userInfo.dispName.length-8)
        }else {
          return this.userInfo.dispName;
        }
      },
      //上传头像
      upload(){
        //获取文件上传目录
        this.uploadJson = {'folderType':'head','memberId':this.userInfo.memberId}
        this.postWithToken('/order-center/oss/buildOSSFolder',{folderType:'head',buildFolderData:JSON.stringify(this.uploadJson)}).then(res => {
          if(res.code == 200){
            this.uploadType = res.data.folder;
            this.syJsbUploadFile(JSON.stringify({
              id:"pic",
              rateX:1,
              rateY:1,
              token:this.token,
              uploadType:this.uploadType,
              pNum:1
            }))
          }
        })
      },
      //修改姓名
      modeifyN(){
        this.appOpen('modifyName',{where:'name'});
        // this.setLsItem('dispName',this.userInfo.dispName);
      },
      //跳转部门
      union(){
        this.appOpen('unionChoose',{where:'userCeter',unionId:this.userInfo.unionId});
        // this.setLsItem('orgName',this.org());
      },
      //退出登录
      logOut(){
        this.appLogout()
      },
      //跳转账号与安全
      goAcc(){
        this.appOpen('accountSecurity')
      },
    },
    watch:{

    },


  }
</script>

<style lang="scss" scoped>
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
    border-radius: 50%;
  }
  .rin-con {
    margin-right:.62rem;
  }
  .logout {
    padding-right:.3rem;
    text-align: center;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
  }
  /*.btn {*/
    /*height:.98rem;*/
    /*background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));*/
    /*color:rgba(255,255,255,1);*/
    /*line-height:0.98rem;*/
    /*text-align: center;*/
  /*}*/
  /*.btn-pos {*/
    /*width:100%;*/
    /*bottom:0;*/
    /*left:0;*/
  /*}*/
  .font-col {
    color:rgba(208,208,208,1) !important;
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
  .del-order {
    /*height:2.3rem !important;*/
  }
  .del-goods {
    width:5.6rem;
    height:2.99rem;
    background:rgba(255,255,255,1);
    border-radius: 0.16rem ;
  }
  .del-tit {
    color:rgba(46,46,46,1);
    line-height:0.5rem;
    border-bottom:1px solid #D0D0D0;
    text-align: center;
    padding:.11rem .3rem .37rem;
  }
  .del-order-t {
    line-height:1.29rem;
    color:rgba(46,46,46,1);
    border-bottom:1px solid #D0D0D0;
    text-align: center;
  }
  .title-prompt {
    color:rgba(46,46,46,1);
    line-height:1rem;
    text-align: center;
  }
  .del-cancel,.del-confirm{
    color:rgba(0,122,255,1);
    line-height:1rem;
    width:2.79rem;
    text-align: center;
  }
  .del-cancel {
    border-right:1px solid #D0D0D0;
  }
  .del-confirm {

  }

</style>
