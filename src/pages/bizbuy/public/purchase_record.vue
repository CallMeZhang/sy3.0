<template>
  <div class="procurement-goods-list" @click="topRightBtn=false;">
    <div v-title="cTitle"></div>
    <div class="procurement-list-con">
      <!--集采商品start-->
      <!--<div class="p-order-form">
        <div class="order-form-title border-bottom-1px">
          <h3 class="title-left">订单总额：￥123,456.99</h3>
          <h3 class="title-right">等待合同</h3>
        </div>
        <p class="order-form-tip">未发合同文案：合同正在准备中，稍后发送到您指定的邮箱</p>
        <div class="order-form-products border-bottom-1px">
          <div class="products-item"><img src="/static/images/common/pays.png" alt="products"></div>
          <div class="products-item"></div>
          <div class="products-item"></div>
          <div class="products-item-last">
            <p class="last-con">共77件</p>
            <p class="last-con">查看详情<span class="r-j"></span></p>
          </div>
        </div>
        <div class="order-form-btn">
          <span>取消订单</span>
        </div>
        <div class="form-line-space"></div>
      </div>
      <div class="p-order-form">
        <div class="order-form-title border-bottom-1px">
          <h3 class="title-left">订单总额：￥123,456.99</h3>
          <h3 class="title-right">已取消</h3>
        </div>
        <div class="order-single-products border-bottom-1px">
          <div class="single-p-left"></div>
          <div class="single-p-right">
            <h2 class="single-title">[中宁农家鸡]爱心帮扶农家散养鹅就和哈哈</h2>
            <p class="single-descr">每箱500g 每箱500g 每箱500g</p>
          </div>
        </div>
        <div class="order-form-btn">
          <span>删除订单</span>
        </div>
        <div class="form-line-space"></div>
      </div>-->
      <!--集采商品end-->
      <popups v-if="showCancelOrderTip" :isPopUp="showCancelOrderTip" :con="lackTipsTxt" @pop-up="showCancelOrderTip=false;"><span @click="closelackTips">我知道了</span></popups>
      <!--扶贫码-->
      <div class="m-order-form" v-for="(fpm, index) in fpmRecordList" :key="index" v-if="fpmRecordList.length>0">
        <div class="order-form-title border-bottom-1px">
          <h3 class="title-left">订单总额：￥{{fpm.totalPrice}}</h3>
          <h3 class="title-right">
            <span v-if="fpm.orderStatus == 10">等待合同</span>
            <span v-if="fpm.orderStatus == 11">等待确认订单</span>
            <span v-if="fpm.orderStatus == 20">已发码</span>
            <span v-if="fpm.orderStatus == 50">已完成</span>
            <span v-if="fpm.orderStatus == 80">已取消</span>
          </h3>
        </div>
        <p class="order-form-tip" v-if="fpm.orderStatus == 10 && fpm.sendContract == 0">合同正在准备中，稍后会发送到您指定的邮箱！</p>
        <p class="order-form-tip" v-if="fpm.orderStatus == 10 && fpm.sendContract == 1">合同已发送到您指定的邮箱，请查收！</p>
        <p class="order-form-tip" v-if="fpm.orderStatus == 20">已为您生成电子扶贫码，点击“提取码”查看下载链接!</p>
        <div class="order-form-products border-bottom-1px">
          <div class="fpm-code-left"><img :src="imgUrl + '/index/code.png'" alt=""></div>
          <div class="fpm-code-center">
            <h3 class="code-center-title">电子扶贫码</h3>
            <p class="code-center-descr">¥{{fpm.goodsPrice}}面值 &times; {{fpm.goodsNum}}张</p>
          </div>
          <div class="fpm-code-right" @click="goDetailPage(fpm.mainId)">
            <p class="code-right-con">查看详情<span class="gt"></span></p>
          </div>
        </div>
        <div class="order-form-btn">
          <!--<p class="ask-for-invoice" v-if="fpm.orderStatus == 20" @click="askForInvoice()"><i class="question"></i>如何索要发票</p>-->
          <span class="btn-span" v-if="fpm.orderStatus == 20"  @click="registerTInfo(fpm.mainId)">登记转账信息</span>
          <span class="btn-span" v-if="fpm.orderStatus == 20" @click="fetchCode(fpm.mainId)">提取码</span>
          <span class="btn-span" v-if="fpm.orderStatus == 10 || fpm.orderStatus == 11"  @click="cancelFpmPopups(fpm.mainId, index)">取消订单</span>
          <span class="btn-span" v-if="fpm.orderStatus == 11" @click="notarizeFpmPopups(fpm.mainId, index)">确认订单</span>
          <span class="btn-span" v-if="fpm.orderStatus == 80" @click="delFpmOrderPopups(fpm.mainId,index)">删除订单</span>
        </div>
        <div class="form-line-space"></div>
      </div>
      <!--无记录时显示-->
      <div class="m-order-no-con" v-if="fpmRecordList.length<=0">
        <div class="list-empty-con">
          <img class="empty-img" :src="imgUrl + '/common/error.png'" alt="">
          <h3 class="empty-t">您还没有采购记录</h3>
        </div>
      </div>
      <!--top-right-btn-->
      <div class="top-right-btn android-jc-top ipone-top iphoneX-top" :class="{'and-top':andRoid,'iph-top':iphone,'iph10-top':iphonex}" v-show="topRightBtn" @click="topRightBtn=false;">
        <div class="top-right-btn-con">
          <div class="top-right-one"><span class="r-img r-img1"></span><span @click="appOpen('bizAddrCd')">地址管理</span></div>
          <div class="top-right-two"><span class="r-img r-img2"></span><span @click="appOpen('/bizInvoiceManage')">发票管理</span></div>
          <div class="jiao"></div>
        </div>

      </div>
      <!--popups-->
      <div class="popups-layer" v-if="fpmLayer" @click="fpmLayer=false;" @touchmove.prevent></div>
      <div class="popups-layer-con" v-if="fpmLayer" @touchmove.prevent>
        <h2 class="record-popups-title">提取扶贫码</h2>
        <div class="record-popups-con border-bottom-1px">
          扶贫码下载链接：<br/><span :data-clipboard-text="fetchCodeUrl">{{fetchCodeUrl}}</span><br/>
          1个小时内有效,过期请点击“提取码”获取
        </div>
        <div class="popups-btn tag-read" :data-clipboard-text="fetchCodeUrl" @click="copyUrl();fpmLayer=false;">复制链接</div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as req  from "@/requests/fpmOrder.js"
  import popups from '../commons/popups.vue'
  import Clipboard from 'clipboard'
  export default{
    data(){
      return {
        cTitle: '集采采购记录',
        pageSize:13,//显示的条数
        curPage:1,//当前页
        fpmRecordList:[],//扶贫码订单
        cancel_f_Order:0,//
        topRightBtn:false,
        showCancelOrderTip:false,
        hasNext:true,
        dataBack:true,
        getDataDone:true,
        fetchCodeUrl:'',//扶贫码下载链接
        fpmLayer:false,
        emptyImgSrc:this.imgUrl + '/common/error.png',
        andRoid:false,
        iphone:false,
        iphonex:false,
      }
    },
    watch:{
      hasNext:function(val,oldVal){/*console.log(val + " : " + oldVal)*/},
    },
    created() {
      window.localStorage.setItem('bizCallback', '');
      setTimeout(()=>{
        this.$header.setTitle("集采采购记录")
        this.$header.rightFn({
          type:'img',
          url:require('../../../../static/images/mine/service.png'),
          callback:this.kfzx
        })
        this.$header.rightFn({
          type:'text',
          text:'',
          callback:this.showTitleTipBtn
        })
        this.$header.rightTextStyle='display:inline-block;margin-top:8px;margin-left:10px;width:28px;height:28px;background:url("../../../../static/images/common/three_points2x.png")no-repeat center;background-size:cover;'

      },0)
      this.checkPlatform();
    },
    mounted() {
      this.getRecordData();
      this.$nextTick(() => {
        if(!this.$route.query.entrance){
          this.appUnBack();
          this.$header.customBehavior( ()=>{
            this.appBackTabbarIndex(3,0);
//          this.appOpen('/bizAssistant',{},null,true)
          })
        }else{
          console.log(this.$route.query.entrance)
        }

      })
      this.$scroll(()=>{
        if(this.dataBack && this.hasNext){
          this.getRecordData()
        }
      })
    },
    methods: {
      myAlert(){
        this.$confirm("弹窗", function () {
        }, "集采采购记录");
      },
      getRecordData(){
        this.dataBack = false;
        req.getOrderRecord(this.pageSize,this.curPage).then((res)=>{
          this.$loading.show = false;
//          this.hideLoading();
          if(res && res.data.code === 200){
            this.hasNext = res.data.data.hasNext;
            this.fpmRecordList = this.fpmRecordList.concat(res.data.data.orderMainList);
            this.curPage ++;
            if(this.hasNext){
              this.getDataDone = true;
            }
          }else{
            this.hasNext = false;
//            console.log(res.data.message);
          }
          this.dataBack = true
        },(error)=>{
          console.log(error);
        })
      },
      goDetailPage(main_id){
        this.appOpen('fpmOrderDetail',{mainId:main_id});
      },
      cancelFpmOrder(main_id,val){
        //取消扶贫码订单
        let _that = this;
          req.cancelFpmOrder(main_id).then((res)=>{
            if(res && res.data.code == 200){
              _that.fpmRecordList[val].orderStatus = 80;
            }else{
              this.$toast(res.data.message)
            }
          },(error)=>{
            console.log(error)
          })
      },
      cancelFpmPopups(main_id, val){
        let that = this;
          that.$confirm('您确认要取消订单么',function(){
            that.cancelFpmOrder(main_id, val)
          })
      },
      notarizeFpmOrder(main_id,vIndex){
//        console.log('订单变更接口')
        req.alterationFpmOrder(main_id).then((res)=>{
          if(res && res.data.code == 200){
            window.location.reload();
          }else{
            this.$toast('确认订单后取消！')
          }
        },(error)=>{
          console.log(error);
        })
      },
      notarizeFpmPopups(main_id,vIndex){
        let that = this;
        that.$confirm('您是否确认接受订单的变更？',function(){
          that.notarizeFpmOrder(main_id,vIndex)
        })
      },
      closelackTips(){
        this.showCancelOrderTip = !this.showCancelOrderTip;
      },
      delFpmOrder(main_id,item){
        //删除扶贫码订单
        let that = this;
        req.delFpmOrder(main_id).then((res)=>{
          if(res && res.data.code == 200){
            that.fpmRecordList.splice(item,1);
          }else{
//            console.log(res.data.message);
          }
        },(error)=>{
          console.log(error);
        })
      },
      delFpmOrderPopups(main_id, item){
        let that = this;
        that.$confirm('您确认要删除订单么',function(){
          that.delFpmOrder(main_id,item);
        })
      },
      registerTInfo(mId){
        //登记转账信息
        this.appOpen('bizTransferInfo',{mainId:mId})
      },
      fetchCode(main_id){
        let that = this;
        req.createFpmCode(main_id).then((res)=>{
          if(res && res.data.code == 200){
            that.fetchCodeUrl = res.data.data.url;
            that.fpmLayer = true;
          }else{
//            console.log(res.data.message)
          }
        },(error)=>{console.log(error);})

      },
      askForInvoice(){
        this.$alertTips('提示','索要发票缺文案','知道了')
      },
      kfzx(){
//        console.log('客服咨询')
        this.m7Chat({
          head_image:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1526977453&di=13558af107950fc42cb1879448393132&src=http://img4.duitang.com/uploads/item/201508/16/20150816155055_5RWSA.jpeg',
          member_truename:'dd'
        })
      },
      showTitleTipBtn(){
        this.topRightBtn = !this.topRightBtn;
      },
      inputGoUp(){
        let isAndroid = this._appjs.isAndroid()
        if (isAndroid) {
          var windowHeight = document.documentElement.clientHeight;
          document.body.style.height = windowHeight + 'px';
          this.spacingH = true
        }
      },
      // 复制文字
      copyUrl() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$toast('已复制剪切板',800)
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$toast('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      checkPlatform(){
        let that = this;
        this.syJsbGetAppInfo(function(appInfo){
          if(!appInfo){
            that.andRoid = false;
            that.iphone=false;
            that.iphonex=false;
          }else{
            if(typeof appInfo =='string'){
              appInfo = JSON.parse(appInfo)
            }
            if(appInfo['platform']=='android'){
              that.andRoid = true;
              that.iphone=false;
              that.iphonex=false;
            }else if(appInfo['platform']=='ios'){
              that.andRoid = false;
              that.iphone=true;
              that.iphonex=false;
            }else if(appInfo['platform']=='iphoneX'){
              that.andRoid = false;
              that.iphone=false;
              that.iphonex=true;
            }
          }
        })
      },

    },
    components: {
      popups,
    },
  }
</script>
<style lang="scss" scoped>
  i{font-style: normal;display: inline-block;}
  .procurement-goods-list {
    /*width: 100%;*/
    height:100%;
    /*overflow:hidden;*/
  }
  .procurement-goods-list .right-item{display:flex;justify-content: center;align-items: center;}
  .procurement-list-con {
    position:relative;
    width: 7.5rem;
    margin:0 auto;
    padding-bottom: 0.68rem;
    overflow:hidden;
    .p-order-form {
      width: 100%;
      background: rgba(255, 255, 255, 1);
    }
    .m-order-form{
      width: 100%;
      background: rgba(255, 255, 255, 1);
    }
    .m-order-no-con{
      width: 100%;
      .list-empty-con{
        margin:3rem auto 0;
        width: 3rem;
        text-align:center;
        .empty-img{
          width:3rem;
          height:3rem;
        }
        .empty-t{
          width:3rem;
          margin:0.22rem 0 0.14rem;
          height:0.48rem;
          font-size:0.32rem;
          color:rgba(208,208,208,1);
          line-height:0.48rem;
        }
        .empty-go{
          font-size:0.28rem;
          color:rgba(255,25,25,1);
          line-height:0.4rem;
          text-decoration:underline;
        }
      }
    }
    .order-form-title {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 6.9rem;
      height: 0.88rem;
      padding: 0 0.3rem;
      /*box-sizing: border-box;*/
      .title-left {
        flex:1;
        font-size: 0.26rem;
        color: rgba(75, 75, 75, 1);
        line-height: 0.88rem;
        height: 0.88rem;
      }
      .title-right {
        width: 1.6rem;
        height: 0.88rem;
        font-size: 0.26rem;
        color: rgba(255, 101, 51, 1);
        line-height: 0.88rem;
        text-align:right;
      }
    }
    .order-form-tip {
      width: 6.9rem;
      margin:0.3rem 0.3rem 0;
      /*height: 0.33rem;*/
      font-size: 0.24rem;
      color:#FF6533;
      line-height: 0.33rem;
      background: rgba(255, 248, 248, 1);

    }
    .order-form-products {
      display: flex;
      width: 6.9rem;
      padding: 0.3rem 0.3rem 0.3rem;
      .products-item {
        margin-right: 0.1rem;
        width: 1.63rem;
        height: 1.14rem;
        background: rgba(227, 227, 227, 1);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .products-item-last {
        flex: 1;
        padding-top: 0.22rem;
        .last-con {
          position: relative;
          /*padding-right:0.13rem;*/
          height: 0.37rem;
          text-align: center;
          font-size: 0.26rem;
          color: rgba(75, 75, 75, 1);
          line-height: 0.37rem;
        }
        .r-j {
          position: absolute;
          top: 50%;
          right: 0.13rem;
          margin-top: - 0.11rem;
          display: inline-block;
          width: 0.13rem;
          height: 0.22rem;
          background: url("/static/images/common/arrow.png") center;
          background-size: cover;
        }
      }
      /*扶贫码*/
      .fpm-code-left{
        width:1.14rem;
        height:1.14rem;
        background:rgba(255,255,255,1);
        img{
          display: block;
          width: 100%;
          height:100%;
        }
      }
      .fpm-code-center{
        box-sizing:border-box;
        width: 3.52rem;
        height: 1.14rem;
        padding-left: 0.3rem;
      }
      .code-center-title{
        box-sizing: border-box;
        padding: 0.14rem 0 0.07rem;
        width: 3.52rem;
        font-size:0.28rem;
        color:rgba(75,75,75,1);
        line-height:0.4rem;
      }
      .code-center-descr{
        width: 3.52rem;
        font-size:0.24rem;
        color:rgba(148,148,148,1);
        line-height:0.33rem;
      }
      .fpm-code-right{
        flex: 1;
        height: 1.14rem;
      }
      .code-right-con{
        position:relative;
        display:flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        height: 1.14rem;
        font-size:0.26rem;
        color:rgba(75,75,75,1);
        line-height:1.14rem;
        .gt{
          position: absolute;
          top: 50%;
          right: 0.13rem;
          margin-top: - 0.11rem;
          display: inline-block;
          width: 0.13rem;
          height: 0.22rem;
          background: url("/static/images/common/arrow.png") center;
          background-size: cover;
        }
      }
    }
    .order-single-products{
      display:flex;
      padding:0.3rem 0.3rem 0.3rem;
      .single-p-left{
        width:1.63rem;
        height:1.14rem;
        background:rgba(227,227,227,1);
      }
      .single-p-right{
        flex:1;
        padding-left:0.3rem;
      }
      .single-title{
        width:4.97rem;
        height:0.4rem;
        font-size:0.28rem;
        color:rgba(75,75,75,1);
        line-height:0.4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .single-descr{
        width:4.97rem;
        height:0.33rem;
        font-size:0.24rem;
        color:rgba(148,148,148,1);
        line-height:0.33rem;
      }
    }
    .order-form-btn {
      width:6.9rem;
      padding:0 0.3rem;
      position:relative;
      height: 1rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      span {
        display: inline-block;
        margin-right: 0.3rem;
        width: 1.5rem;
        height: 0.6rem;
        padding: 0 0.12rem;
        text-align: center;
        line-height: 0.6rem;
        border-radius: 0.08rem;
        border: 1px solid #D0D0D0;
      }
      .btn-span:last-of-type{
        margin-right:0;
      }
      .red-s{
        color:#FF1919;
        border: 1px solid #FF1919;
      }
      .ask-for-invoice{
        position:absolute;
        left:0.3rem;
        top:50%;
        transform:translateY(-50%);
        height:0.36rem;
        display:flex;
        align-items: center;
        font-size:0.24rem;
        color:rgba(0,122,255,1);
        line-height:0.36rem;
        .question{
          display:inline-block;
          width: 0.3rem;
          height: 0.3rem;
          margin-right:0.1rem;
          background:url("/static/images/common/q.png")no-repeat center;
          background-size: cover;
        }
      }
    }
    .form-line-space {
      width: 7.5rem;
      height: 0.2rem;
      background: #fafafa;
    }
    .top-right-btn{
      position:fixed;
      top:0.94rem;
      right:18px;
      z-index: 100;
      width:1.96rem;
      padding:0 0.3rem;
      height:1.9rem;
      text-align:center;
      background:rgba(0,0,0,0.7);
      font-size:0.28rem;
      color:rgba(255,255,255,1);
      border-radius: 0.04rem;
    }
    .and-top{top:44px;}
    .iph-top{top:64px;}
    .iph10-top{top:88px;}
    .top-right-btn-con{
      width: 1.96rem;
      position: relative;
      .jiao{
        position:absolute;
        top:-15px;
        right: -9px;
        border:0.15rem solid transparent;
        border-bottom:0.15rem solid rgba(0,0,0,0.7);
      }
    }
    .top-right-one {
      position: relative;
      display: flex;
      align-items: center;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      border-bottom: 1px solid rgba(148, 148, 148, 1);
    }
    .top-right-two{
      position:relative;
      display:flex;
      align-items: center;
      height:0.95rem;
      line-height: 0.95rem;
      text-align:center;
    }
    .r-img{
      display:inline-block;
      height:0.38rem;
      width:0.38rem;
      margin-right:0.25rem;
    }
    .r-img1{
      background:url("/static/images/common/addr.jpg");
      background-size: 100% 100%;
    }
    .r-img2{
      background:url("/static/images/common/money.jpg");
      background-size: 100% 100%;
    }

  }
  .popups-layer{
    /*display:none;*/
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .popups-layer-con{
    position: fixed;
    left: 50%;
    top: 23%;
    z-index:1000;
    /*transform:translate(-50%,-50%);*/
    width: 5.6rem;
    margin-left:-2.8rem;
    background: #fff;
    border-radius: .2rem;
    text-align: center;
    .record-popups-title{
      width: 5rem;
      padding:0 0.3rem;
      height: 1rem;
      font-size: 0.36rem;
      color: rgba(46,46,46,1);
      line-height: 1rem;
      text-align: center;
    }
    .record-popups-con{
      width: 5rem;
      padding:0 0.3rem 0.2rem;
      color: #999;
      font-size: .3rem;
      line-height: 0.5rem;
      text-align: left;
      word-break: break-all;
    }
    .popups-btn{
      font-size:0.36rem;
      text-align: center;
      box-sizing: border-box;
      padding: .3rem 0;
      color: #4A90E2;
    }
  }

</style>
