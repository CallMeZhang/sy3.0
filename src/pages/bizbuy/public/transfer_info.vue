<template>
  <div class="transfer-info">
    <div v-title="cTitle"></div>
    <div class="transfer-info-con">
      <div class="transfer-top"><span class="tip-l"></span><span class="top-txt">请在转账完成后，在此登记转账信息</span></div>
      <div class="transfer-input border-bottom-1px">
        <div class="sy-input-text">转账金额</div>
        <input type="number" placeholder="请填写转账金额" v-model.trim="transferObj.transferAmount" @blur="checkMoney(transferObj.transferAmount);transferNum(transferObj.transferAmount)">
      </div>
      <div class="transfer-input border-bottom-1px">
        <div class="sy-input-text">转账单号</div>
        <input type="text" placeholder="请填写转账凭证的单号" v-model.trim="transferObj.transferNo" @blur="checkEmpty(transferObj.transferNo)">
      </div>
      <!--<div class="transfer-input border-bottom-1px" @click="transferWayFn">
        <div class="sy-input-text">转账方式</div>
        <input type="text" placeholder="请选择转账方式" readonly v-model="transferObj.transferModeTxt">
        <div class="r-img-con"><span class="r-j-img"></span></div>
      </div>-->
      <div class="transfer-upload-p border-bottom-1px">
        <div class="upload-p-top"><span class="p-top-l">上传凭证</span><span class="p-top-r">（最多三张，必填）</span></div>
        <div class="upload-p-con">
          <div class="upload-p" v-for="(item,index) in imgList">
            <div class="img-con">
              <img :src="item" alt="">
            </div>
            <div class="close-x" @click.stop="deleteImg(index)"></div>
            <!--<span class="img-con-bott">点击预览</span>-->
          </div>
          <div class="img-con-add" @click="upload" v-show="imgList.length < 3">
            <p class="sign1"></p>
            <p class="sign2"></p>
            <p class="sign-txt">添加照片</p>
          </div>
          <!--<div class="img-con-add">-->
            <!--<p class="sign1"></p>-->
            <!--<p class="sign2"></p>-->
            <!--<p class="sign-txt">添加照片</p>-->
          <!--</div>-->
        </div>
      </div>
      <div class="bank-info">
        <p class="bank-info-con">收款户名：中益善源（北京）科技有限公司</p>
        <p class="bank-info-con">收款银行：中国银行北京使馆区支行</p>
        <p class="bank-info-con">收款账号：324667039648</p>
      </div>
      <div v-if="returnHaveData == 0" class="transfer-btn"@click="postTransferData()">确定</div>
      <div v-if="returnHaveData == 1" class="transfer-btn-gray">已提交</div>
      <!--浮层-->
      <div class="global-w">
        <transition name="fade-layer"><div v-show="transferWay" class="jc-bottom-layer" @click="transferWay=false;"></div></transition>
        <transition name="slide-up">
          <div v-show="transferWay" class="jc-bottom-layer-con iphonex-margin-bottom">
            <div class="jc-layer-top">
              <p class="border-b1" @click="popupsMark('网银转账')">网银转账</p>
              <p class="" @click="popupsMark('ATM转账')">ATM转账</p>
            </div>
            <div class="jc-layer-bottom" @click="transferWayFn('transferWay')">取消</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import {look_transferInfo, registerTransferInfo} from "@/requests/fpmOrder.js"
  export default{
    data(){
      return {
        cTitle:'登记转账信息',
        main_id:'',
        token:'',
        transferWay:false,
        returnHaveData:0,//0 返回无数据可提交，1有数据不可再提交
        transferObj:{
          imgList:[],
          mainId:'',
          transferAmount:'',//转账金额
          transferMode:'',//转账方式
          transferModeTxt:'',
          transferNo:'',//转账单号
          bankAccount:'中国银行北京使馆区支行',//收款银行账号
          bankName:'324667039648',//收款银行名称
          images:'',//凭证照片
        },
        maxNum:3,
//        imgList:[this.imgUrl+'/common/arrow.png',this.imgUrl+'/common/logo.png'],
        imgList:[],
        uploadType:'',
        uploadJson:{},
      }
    },
    watch:{
      transferObj:function(val,oldVal){},
    },
    created() {
      if(this.$route.query.mainId){
        this.transferObj.mainId = this.$route.query.mainId
      }
      //获取token
      this.syJsbGetAppInfo((res)=>{
        if (typeof res == 'string') {
          res = JSON.parse(res);
        }
        this.token = res.token;
      })
      this.getTransferInfo();

      //上传头像
      window.setImageByUrl = json_data => {
        var data = eval('(' + json_data + ')');
        this.imgList = this.imgList.concat(data.images)
//        this.postWithToken('/user-center/usr/modifyAvatar',{avatar:data.images[0]}).then(res => {
//          if(res.code == 200){
////            this.$toast(res.message)
//            this.imgList = this.imgList.concat(data.images)
////            this.userInfo.avatar = data.images[0];
////            this.$header.setBack({isReload:1,times:1});
//          }
//        })
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.$header.setTitle("登记转账信息")
      })
    },
    methods: {
      //上传图片
      upload(){
        //获取文件上传目录
        this.uploadJson = {'folderType': 'biz-evidence'}
        this.postWithToken('/order-center/oss/buildOSSFolder', {
          folderType: 'biz-evidence',
          buildFolderData: JSON.stringify(this.uploadJson)
        }).then(res => {
          if (res.code == 200) {
            this.uploadType = res.data.folder;
            this.syJsbUploadFile(JSON.stringify({
              id: "pic",
              rateX: 1,
              rateY: 1,
              token: this.token,
              uploadType: this.uploadType,
              pNum: this.maxNum - this.imgList.length
            }))
          }
        })
      },
      deleteImg(index){
        this.imgList.splice(index, 1)
      },
      myAlert(){
        this.$confirm("弹窗", function () {
        }, "登记转账信息");
      },
      getTransferInfo(){
        //查看转账信息（返显）
        let _that = this;
        look_transferInfo(this.transferObj.mainId).then((res) => {
          this.$loading.show = false;
          if (res && res.data.code == 200) {
            let content = res.data.data.transferInfo
            if (content == '' || content == 'undefined' || content == null) {
              this.returnHaveData = 0;
            } else {
              this.returnHaveData = 1;
              this.haveData = false;
              this.transferObj = content;
              let money = this.returnFloat(content.transferAmount)
              this.transferObj.transferAmount = money;
              this.imgList = this.transferObj.images.split(',')
            }
          } else {
            this.$toast(res.data.message)
//            console.log(res.data.message);
          }
        })
      },
      transferWayFn(){
        this.transferWay = !this.transferWay;
      },
      popupsMark(param){
        this.transferObj.transferModeTxt = param;
        param == '网银转账' ? this.transferObj.transferMode = 0 : this.transferObj.transferMode = 1;
        this.transferWay = false;
      },
      postTransferData(){
        //提交转账信息
        this.transferObj.images = this.imgList.join(',');
        if (this.checkMoney(this.transferObj.transferAmount)) {

        } else if (this.transferObj.transferNo == '') {
          this.$toast('请填写转账单号');
          return false;
        } else if (this.transferObj.images.length <= 0) {
          this.$toast('请上传凭证照片');
          return false;
        } else {
          registerTransferInfo(this.transferObj).then((res) => {
            if (res && res.data && res.data.code == 200) {
              this.$toast(res.data.message)
              setTimeout(() => {
                this.syJsbCloseAppPage()
              }, 1000)
            } else {
              this.$toast(res.data.message ? res.data.message : '提交信息失败')
            }
          }, (error) => {
            console.log(error)
          })
        }
      },
      checkMoney(value){
        let test_value = value;
        let patrn = /^([1-9]\d*|0)(\.\d*[0-9])?$/;
        if (value == '') {
          this.$toast("请填写转账金额");
          return false;
        } else if (!patrn.exec(test_value)) {
          this.$toast("请填写正确的金额");
          return false;
        }
      },
      checkEmpty(val){
        if (val == '') {
          this.$toast("请填写转账凭证的单号");
        }
      },
      transferNum(val){
        val = val.toString().replace(/^[0]+[0-9]*$/gi, '');
        this.transferObj.transferAmount = parseFloat(this.toFloat(val));
      },
      formatNum(num, n){
        //参数说明：num 要格式化的数字 n 保留小数位
        num = parseFloat(num)
        num = String(num.toFixed(n));
        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) {
          num = num.replace(re, "$1,$2");
        }
        return num;
      },
      returnFloat(value){
        var value=Math.round(parseFloat(value)*100)/100;
        var s=value.toString().split(".");
        if(s.length==1){
          value=value.toString()+".00";
          return value;
        }
        if(s.length>1){
          if(s[1].length<2){
            value=value.toString()+"0";
          }
          return value;
        }
      }

    }
  }
</script>
<style lang="scss" scoped>
  img{display:block;border:none;}
  .transfer-info{
    position:relative;
    width: 100%;
    height: 100%;
    background:#fafafa;
  }
  .transfer-info-con{
    width: 7.5rem;
    margin: 0 auto;
    color:#4b4b4b;
    .transfer-top{
      display:flex;
      align-items: center;
      margin:0 0.3rem;
      height: 0.6rem;
      background:rgba(255,248,248,1);
      font-size:0.24rem;
      color:rgba(255,101,51,1);
      line-height:0.34rem;
      .tip-l{
        margin-right: 0.14rem;
        display:inline-block;
        width:0.26rem;
        height:0.26rem;
        background:url("/static/images/common/tip.png") center;
        background-size: cover;
      }
    }
    .transfer-input{
      padding:0 0.3rem;
      height:.88rem;
      /*box-sizing: border-box;*/
      font-size: .32rem;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .sy-input-text{
        padding-right:.3rem;
        min-width:2.1rem;
      }
      input{
        flex:1;
        font-size: .32rem;
        overflow: hidden;
        color:#949494;
      }
      .r-img-con{
        position:relative;
        width:0.32rem;
        height: 0.88rem;
        .r-j-img{
          position: absolute;
          left:50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: inline-block;
          width: .16rem;
          height: .32rem;
          background: url(/static/images/common/arrow.png) no-repeat center;
          background-size: cover;
        }
      }
    }
    .transfer-upload-p{
      width: 100%;
      background:#fff;
      .upload-p-top{
        display:flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 0.88rem;
        padding: 0 0.3rem;
        font-size:0.3rem;
      }
      .p-top-l{
        margin-right: 0.3rem;
        color:#4b4b4b;
      }
      .p-top-r{
        color:rgba(208,208,208,1);
      }
      .upload-p-con{
        display:flex;
        flex-flow:row nowrap;
        padding: 0.15rem 0.3rem 0.3rem;
      }
      .upload-p{
        position:relative;
        .img-con{
          width:1.5rem;
          height:1.5rem;
          margin-right: 0.5rem;
          background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,1));
          border-radius: 0.08rem;
          img{
            display:block;
            width: 100%;
            height: 100%;
          }
        }
        .close-x{
          position:absolute;
          top:-0.2rem;
          right:0.44rem;
          display:inline-block;
          width: 0.44rem;
          height: 0.44rem;
          background:url("/static/images/common/close.png") no-repeat center;
          background-size: cover;
        }
        .img-con-bott{
          position:absolute;
          left:0.27rem;
          bottom:0;
          color:rgba(255,255,255,1);
          font-size:0.24rem;
          line-height:0.33rem;
        }
      }
      .img-con-add{
        position:relative;
        margin-right: 0.5rem;
        width:1.5rem;
        height:1.5rem;
        border: 1px dotted #D0D0D0;
        border-radius: 0.08rem;
      }
      .sign1{
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width:0.6rem;
        height:0.02rem;
        background:rgba(208,208,208,1);
        border-radius: 0.02rem ;
      }
      .sign2{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width:0.02rem;
        height:0.6rem;
        background:rgba(208,208,208,1);
        border-radius: 0.02rem ;
      }
      .sign-txt{
        padding-top: 1.12rem;
        font-size:0.24rem;
        color:rgba(208,208,208,1);
        line-height:0.33rem;
        text-align:center;
      }
    }
    .bank-info{
      padding:0.14rem 0.3rem 0;
      .bank-info-con{
        font-size:0.26rem;
        color:rgba(144,144,144,1);
        line-height:0.4rem;
      }
    }
    .transfer-btn{
      position:absolute;
      left: 50%;
      top: 10rem;
      margin-left:-3.45rem;
      width:6.9rem;
      height:0.88rem;
      font-size:0.32rem;
      color:rgba(255,255,255,1);
      line-height:0.88rem;
      text-align: center;
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
      border-radius: 0.16rem ;
    }
    .transfer-btn-gray{
      position:absolute;
      left: 50%;
      top: 10rem;
      margin-left:-3.45rem;
      width:6.9rem;
      height:0.88rem;
      font-size:0.32rem;
      color:rgba(255,255,255,1);
      line-height:0.88rem;
      text-align: center;
      background:#cecece;
      border-radius: 0.16rem ;
    }
  }
  .slide-up-enter-active{
    transition:all 0.5s ease;
    opacity:1;
    transform:translate3d(0,0,0);
  }
  .slide-up-leave-active{
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-up-enter,.slide-up-leave-to{
    opacity:0;
    transform:translate3d(0,4.45rem,0);
  }
  .fade-layer-enter-active,.fade-layer-leave-active{
    transition: opactiy 0.5s ease-in-out;
  }
  .fade-layer-enter, .fade-layer-leave-to{
    opacity: 0;
  }
  .jc-bottom-layer{
    position:fixed;
    left:0;
    top:0;
    z-index:99;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.4);
  }
  .jc-bottom-layer-con{
    position:fixed;
    left:50%;
    margin-left:-3.65rem;
    bottom:0.22rem;
    z-index:100;
    width:7.3rem;
    .jc-layer-top{
      margin-bottom:0.14rem;
      width:7.3rem;
      /*height:2.28rem;*/
      background:rgba(248,248,248,0.82);
      border-radius: 0.28rem ;
      .specil-txt{
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size:0.26rem;
        color:rgba(148,148,148,1);
      }
      p{
        margin:0;padding:0;
        height: 1.03rem;
        line-height: 1.03rem;
        text-align:center;
        font-size:0.4rem;
        color:rgba(0,122,255,1);
      }
      .border-b1{
        border-bottom:0.5px solid rgba(208,208,208,1);
      }
    }
    .jc-layer-bottom{
      height:1.12rem;
      line-height: 1.12rem;
      text-align:center;
      font-size:0.4rem;
      color:rgba(0,122,255,1);
      background:rgba(255,255,255,1);
      border-radius: 0.28rem ;
    }
  }
</style>
