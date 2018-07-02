﻿﻿<template>
  <div class="begin">
    <!--fpmPurchasingInfo  bizPurchaseRecord-->
    <div class="sy-btn-box to">
      <div class="sy-btn" @click="appOpen('fpmPurchasingInfo')">扶贫码采购</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn" @click="appOpen('bizPurchaseRecord')">查看扶贫码订单记录</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn" @click="appOpenMode('catalogLists',{catalogId:'dae0eecd61a64e81b74409e895a3f40c'},'1')">真实故乡特产目录</div>
    </div>
    <div class="sy-btn-box to" v-for="item in list">
      <div class="sy-btn" @click="appOpenMode('catalogLists',{catalogId:item.catalogId},'1')">{{item.name}}</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="appOpenMode('search',{},'1')">去搜索</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="appOpenMode('unionInfo',{},'1')">联盟扶贫工作介绍</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="appOpenMode('union',{},'1')">联盟详情页</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="appOpen('index')">首页</div>
    </div>
    <br>
    <div> jsBridge</div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="appLogoutFn">退出登录/appLogout</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="wxLogin">绑定微信/wxLogin</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="leadEvalueFn('pay')">leadEvalue/pay</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="leadEvalueFn('goodDetail')">leadEvalue/goodDetail</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="syJsbUploadFileFn">上传2张图片/syJsbUploadFile</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="nativeAlertFn({
      alertTitle:'标题',
      alertDesc:'alert描述',
      alertOk:'确认',
      alertCancel:'取消',
      okCallBackJs:'nativeAlertOk',
      cancelCallBackJs:'nativeAlertCancel'
      })">nativeAlert</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="goUrl">分享</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="getNewVersionFn">ios去评价/getNewVersion</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="setDataFn">ios存数据</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="getDataFn">ios取数据</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="jsCallPhoneFn">打电话</div>
    </div>

    <!-- 签到 -->
    <div class="sy-btn-box to">
      <div class="sy-btn " @click='signin'>签到</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="kfzx">客服咨询</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="goBackUnReturnFn">ios下级页面禁用返回</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="cookieFn">ios cookie</div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="goGY">公益</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="tableBar">测试定制返回tableBar 下标5刷新</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="appBack">测试 点击禁止侧滑/物理返回</div>
    </div>

    <div class="sy-btn-box to">
      <div class="sy-btn " @click="refreshFn">ios 刷新我的页面 </div>
    </div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="notify">notify </div>
    </div>

    <div> jsBridge</div>
    <div class="sy-btn-box to">
      <div class="sy-btn " @click="doSomeThing">doSomeThing</div>
    </div>
    <!--<img src="../../static/images/sy.webp" alt="">-->
    <!--<img src="../../static/images/d.webp" alt="">-->
    <!--<img :src="img" alt="">-->
    <img :src="img2" alt="" v-if="imgShow">
    <br>
  </div>
</template>

<script>
  import wxShare from  '../modules/wxShare/commonWxShare'
export default {
  name: 'index',
  data () {
    return {
      imgShow:false,
      img:'',
      img2:'',
      msg: 'Welcome to 3.0',
      appInfo:'',
      list:[],
      mallId:'',
      townId:'',
      token:'456'
    }
  },
  created(){
    document.cookie = "test1=1"
    document.cookie = "test2=2"
    document.cookie = "test3=3"
    window.nativeAlertOk=(res)=>{
      // console.log('nativeAlertOk is ok!')
      // console.log(res)
      // console.log('nativeAlertOk is ok')
    }
    window.nativeAlertCancel=(res)=>{
      // console.log('nativeAlertCancel is ok!')
      // console.log(res)
      // console.log('nativeAlertCancel is ok')
    }
    this.img=require('../../static/images/sy.webp');
    this.img2=require('../../static/images/d.webp');

    setTimeout(()=>{
      this.getList();
    },0)

    window.netState=(p)=>{
      var p =p==0?'网络断开':'网络连接'
      // console.log(p)
    }
    var that=this
    window.appNotifyFn=(res)=>{
      console.log(res)
      that.imgShow=true
      console.log('appNotifyFn is ok')

    }
    this.syJsbIosRegisterHandler('appNotifyFn')

    this.netStateFn()
  },
  mounted(){
    setTimeout(()=>{
     // wxShare('text','https://pwcn-test.oss-cn-beijing.aliyuncs.com/goods/b1f0acb778ff46b49f2b6e0ca9d8ffe6/4596b8ae8f9f84b600d3427bd7ab9c6586f62d10.jpeg?x-oss-process=style/webp_240','https://v3m.17shanyuan.com/index')
      //后退先弹出窗口再返回 参考支付返回弹框
      // 影藏导航返回按钮  this.$header.hideBack=false
      this.$header.close=true
      this.$header.isHistory=true
      this.$header.setTitle('测试导航')
      this.$header.setBackUrl('mine',{p:'123'})
      this.$header.rightTextStyle='color:#00f'
      this.$header.headerStyle='background:#ededed'
      this.$header.middleFn({
        type:'img',
        url:require('../../static/images/mine/service.png'),
        callback:function () {
        }
      })
      this.$header.rightFn({
        type:'img',
        url:require('../../static/images/mine/service.png'),
        callback:function () {
        }
      })
      this.$header.rightFn({
        type:'text',
        text:'1234',
        callback:function () {
        }
      })
    },0)

  },
  methods:{
    notify(){
      this.appOpen('wxTestPage')
    },
    refreshFn(){
      this.appRefreshTabbarIndex(5,1)
    },
    appBack(){
      this.appUnBack()
    },
    tableBar(){
      this.appBackTabbarIndex(5,1)
    },
    goGY(){
      this.appOpen('https://mgyt.17shanyuan.com/syweal/index',{},1)
    },
    cookieFn(){
      document.cookie = "goodsList=goodsList"
      this.appOpen('goodsList')
    },
    goBackUnReturnFn(){
      this.appOpenUnSlide('/success',{text:'123'},1)
    },
    kfzx(){
      this.m7Chat({
        head_image:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1526977453&di=13558af107950fc42cb1879448393132&src=http://img4.duitang.com/uploads/item/201508/16/20150816155055_5RWSA.jpeg',
        member_truename:'Dora'
      })
    },
    jsCallPhoneFn(){
      this.jsCallPhone('4006667308')
    },
    setDataFn(){
      this.setAppData({ 'h5Key': 'orderWishList' , 'h5Value' :'456798'})
    },
    getDataFn(){
      this.getAppData('orderWishList',function (res) {
        // console.log(res)
      })
    },
    appLogoutFn(){
      this.appLogout()
    },
    leadEvalueFn(p){
      this.leadEvalue(p)
    },
    goUrl(){
      this.syJsbShare({
        title:'分享的标题',
        text:'分享文字',
        url :'https://v3m.17shanyuan.com/unionInfo?channelId=48',
        logo :'https://t2.17shanyuan.com/bocm/platformjs/static/image/detail/Group2_2x.png',
        sms:"短信相关 www.baidu.com"//短信相关
      })
    },
    getNewVersionFn(){
      this.getNewVersion()
    },
    syJsbUploadFileFn(){
      this.syJsbUploadFile(JSON.stringify({
        id:"pic",
        rateX:1,
        rateY:1,
        token:'token',
        uploadType:"feedback",
        pNum:3
      }))
    },
    nativeAlertFn(p){
      this.nativeAlert(p)
    },
    doSomeThing(){
      this.$confirm('提13123示',()=>{
        // console.log(123)
      },{})
    },
    fn(){
      this.$header.customBehavior(()=>{
        this.syJsbCloseAppPage(1,1)
      })
    },
    getList(){
      this.$loading.show=false
      this.getWithToken('/ebgoods/catalog/user/root/list',{pageNo:'1',pageSize:10}).then(res=>{
        if(res && res.code == 200){

          setTimeout(()=>{
//            this.$loading.show=true
          },1000)
          this.list = res.data.listCatalog;
//          this.list.forEach(v=>{
//            switch (v.name){
//              case '善源商场':
//                this.mallId = v.catalogId;
//                break;
//              case '故乡特产':
//                this.townId = v.catalogId;
//                break;
//            }
//          })
        }
      })
    },
    signin(){
      let _this = this;
      this.syJsbSignin({
        codeUrl:_this.imgUrl +'/common/download.png',
        useUrl: window.location.origin + '/test',
        "imageUrl": "http://pwcn-test.oss-cn-beijing.aliyuncs.com/seller_backend/lic/b9122906a43ff9299034fc229aeb7b7943215078.jpeg",
        "totalCountToast": "公益扶贫这件事儿，我已经坚持了3天~来一起将扶贫进行到底",
        "successToast": "温馨提示：3元扶贫码已送入您的钱包中",
        "isReceivePrize": 1
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .begin {
    width: 100%;
    height: 100%;
    padding-top:2rem;
    box-sizing: border-box;
  }
  .to{
    margin-top:.6rem;
  }

</style>
