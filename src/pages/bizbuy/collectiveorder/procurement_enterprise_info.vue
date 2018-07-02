<template>
  <div class="jc-purchasing iphonex-margin-bottom">
    <div v-title="cTitle"></div>
    <!-- 文本框 -->
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">采购单位</div>
      <input type="text" placeholder="请填写公司名称（发票和合同使用）" v-model="enterpriseObj.purchaserName" @blur="checkIsEmpty(enterpriseObj.purchaserName, '公司名称');setLocalData();">
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">税号&ensp;&ensp;&ensp;&ensp;</div>
      <input type="text" placeholder="15-20位" v-model="enterpriseObj.identifyNo" @blur="checkIsEmpty(enterpriseObj.identifyNo, '税号');setLocalData();">
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">单位地址</div>
      <input type="text" placeholder="与营业执照上一致" v-model="enterpriseObj.companyAddress" @blur="checkIsEmpty(enterpriseObj.companyAddress);setLocalData();">
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">电话号码</div>
      <input type="text" placeholder="与营业执照上一致" v-model="enterpriseObj.companyTel" @blur="checkIsEmpty(enterpriseObj.companyTel, '电话号码');setLocalData();">
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">开户银行</div>
      <input type="text" placeholder="请输入开户行银行名称" v-model="enterpriseObj.bankName" @blur="checkIsEmpty(enterpriseObj.companyTel, '开户银行');setLocalData();">
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">银行账户</div>
      <input type="text" placeholder="请输入银行卡号" v-model="enterpriseObj.bankAccount" @blur="checkIsEmpty(enterpriseObj.bankAccount, '银行账户');setLocalData();">
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">发票类型</div>
      <input type="text" placeholder="请选择" disabled v-model="enterpriseObj.showInvoiceTxt">
      <div class="r-img-con" @click="poupsMark('invoice')"><span class="r-j-img"></span></div>
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">开票要求</div>
      <input type="text" placeholder="请选择" disabled v-model="enterpriseObj.showSpecialTxt">
      <div class="r-img-con" @click="poupsMark('ask')"><span class="r-j-img"></span></div>
    </div>
    <div class="jc-area border-bottom-1px" v-if="enterpriseObj.isSpecial == 1">
      <div class="jc-area-con">
        <div class="jc-area-text">有特殊要求</div>
        <textarea class="jc-textarea" name="" id="" placeholder="填写特殊要求请填写特殊要求"
                  maxlength="200" cols="30" rows="10" v-model="enterpriseObj.specialInfo" @input="descInput()" @blur="checkIsEmpty(enterpriseObj.specialInfo);setLocalData();"></textarea>
      </div>
      <p class="jc-area-bottom">{{remnant}}/200</p>
    </div>
    <div class="jc-input border-bottom-1px"@click="goEditAddress()">
      <div class="jc-input-text">寄送地址</div>
      <input type="text" placeholder="请选择发票与合同寄送地址" disabled v-model="showShippingAddr">
      <div class="r-img-con"><span class="r-j-img"></span></div>
    </div>
    <div class="jc-input border-bottom-1px">
      <div class="jc-input-text">电子邮箱</div>
      <input type="text" placeholder="合同模板及扶贫码发送邮箱" v-model="enterpriseObj.email">
    </div>
    <div class="jc-input border-bottom-1px" @click="departmentShow = true;selectDepartment()">
      <div class="jc-input-text">采购部门</div>
      <input type="text" class="other-font" disabled placeholder="请选择积分归属部门" v-model="enterpriseObj.department">
      <div class="r-img-con"><span class="r-j-img"></span></div>
    </div>
    <div class="jc-bottom-btn iphonex-bottom-after">
      <div class="jc-bottom-btn-l">已选{{selectedQuantity}}款产品</div>
      <div class="jc-bottom-btn-r" @click="next()">下一步</div>
    </div>
    <!--bottom-popups-->
    <!--发票类型-->
    <div class="global-w">
      <transition name="fade-layer"><div v-show="invoiceIo" class="jc-bottom-layer" @click="invoiceIo=false;"></div></transition>
      <transition name="slide-up">
        <div v-show="invoiceIo" class="jc-bottom-layer-con iphonex-margin-bottom">
          <div class="jc-layer-top">
            <p class="border-b1" @click="invoiceConfirm('增值税普通发票')">增值税普通发票</p>
            <p class="" @click="invoiceConfirm('增值税专用发票')">增值税专用发票</p>
          </div>
          <div class="jc-layer-bottom" @click="invoiceIo=false;">取消</div>
        </div>
      </transition>
    </div>
    <!--特殊要求-->
    <div class="global-w">
      <transition name="fade-layer"><div v-show="askFor" class="jc-bottom-layer" @click="askFor=false;"></div></transition>
      <transition name="slide-up">
        <div v-show="askFor" class="jc-bottom-layer-con iphonex-margin-bottom">
          <div class="jc-layer-top">
            <div class="specil-txt">发票一经开出不予退票，发票内容只能开具购物明细</div>
            <p class="border-b1" @click="reqConfirm('无特殊要求')">无特殊要求</p>
            <p class="" @click="reqConfirm('有特殊要求')">有特殊要求</p>
          </div>
          <div class="jc-layer-bottom" @click="askFor=false;">取消</div>
        </div>
      </transition>
    </div>
    <!-- 部门选择-->
    <div class="global-w">
      <transition name="fade2">
        <div class="mask" v-show="departmentShow" @click="departmentShow=false;"></div>
      </transition>
      <transition name="slide-up2">
        <div class="department-con" v-show="departmentShow">
          <div class="d-title border-bottom-1px">
            <div class="fl s-btn" :class="{colore3:!hasPre}" @click="goPre">上一级</div>
            <div class="fl s-btn" :class="{colore3:!hasNext}" @click="hasNext && goNext()">下一级</div>
            <div class="fr s-sure" :class="{colore3:false}" @click="departmentShow=false;org=tmpOrg;enterpriseObj.department=org.orgName">确定</div>
          </div>
          <div class="d-con">
            <div class="d-item" v-for="item in orgList" :class="{'sy-red':item.orgId == tmpOrg.orgId}" @click="tmpOrg = tmpOrgHid = item">{{item.orgName}}</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import {getBizProductsOrderInfo} from '@/requests/bizProductsOrder'
  import * as typeAddress from '../../../requests/bizAddress'
  import  checkBrowser from '../../../modules/_ua/browserUa'
  export default{
    data(){
      return {
        cTitle: "单位集采",
        selectedQuantity:0,
        askFor:false,
        invoiceIo:false,
        specialReq:false,
        showShippingAddr:'',//寄送地址
        enterpriseObj:{
          creatorType:10,
          orderSource:'app',
          purchaserName:'公益国电',
          identifyNo:'132456798',
          companyAddress:'北京东城区',
          companyTel:'010666888',
          bankName:'开户行',
          bankAccount:'6222600260001072444',
          invoiceType: 0,//'发票类型（0普通,1增值税',
          showInvoiceTxt: '',
          isSpecial:0,//是否有特殊要求0没有1有
          showSpecialTxt:'',//
          specialInfo: '',
          invoiceReciverName: '收发票人姓名',
          invoiceReciverTel:'15901236193',
          invoiceContactAddress:'发票地址（包括省市区 拼接）',
          invoiceExactAddress: '发票地址（详细地址',
          purchaserUnoinId:'123',
          purchaserUnoinName:'中益善源',
          goodsNum:0,
          email: '',
          department:'',
        },
        remnant:0,
        departmentShow:false,
        orgList:[],
        org:{
          orgId:'',  // 当前orgId
          orgName:'',
        },
        tmpOrg:{
          orgId:'',
          orgName:'',
          parentOrgId:'',
        },
        tmpOrgHid:{},
        hasNext:false,
        hasPre:false,
        isUnionShow:true,
        getDataBack:true,
      }
    },
    created() {
      this.testingPlatform();
      let addressId = this.$route.query.addressId
      if(addressId){
        if(this.getLsItem('enterpriseObj') != null){
          console.log('addressid')
          this.enterpriseObj = this.getLsItem('enterpriseObj')
        }
        this.getAddress(addressId);
      }else{
        this.getBizShowData();
      }
    },
    mounted() {
      this.$loading.show = false
      this.$nextTick((res)=>{
        this.$header.middleFn({
          type:'img',
          url:require('../../../../static/images/common/step_1.png'),
          callback:function () {
          }
        })
      })
    },
    watch:{
      tmpOrg(tmp){
        this.hasNext = !(tmp.isLeaf-0)
      }
    },
    methods: {
      getOrgId(){
        return this.getWithToken('/user-center/usr/memberByToken')
      },
      getUnionList(){
        if(!this.getDataBack) return;
        this.getDataBack = false;
        return this.get('/union-center/union/list').then(res=>{
          if(res && res.code ==200){
            this.hasPre = false;
            let arr = res.content;
            arr.forEach(item=>{item.orgId = item.code;item.orgName = item.name;item.isLeaf = 0});

            this.orgList =  arr;
          }else{
            this.$toast(res?res.message:'获取联盟信息失败')
          }
          this.getDataBack = true;
        })
      },
      getOrgList(orgId,type='orgId'){
        if(!this.getDataBack) return;
        this.getDataBack = false;
        let send = {};
        send[type] = orgId;
        if(!orgId){
          this.hasPre = false;
          this.getDataBack = true;
          return this.getUnionList()
        }
        return this.get('/union-center/org/list',send).then(res=>{
          if(res && res.code ==200){
            this.hasPre = true;
            this.orgList = res.content;
            this.tmpOrgHid = res.content.length?res.content[0]:{};
          }else{
            this.$toast(res?res.message:'获取部门失败')
          }
          this.getDataBack = true;
        })
      },
      selectDepartment(){
        this.getUnionList()
      },
      goPre(){
        if(this.tmpOrgHid.orgIdPath){
          let arr = this.tmpOrgHid.orgIdPath.split(',');
          if(arr.length == 1){
            this.getOrgList(this.tmpOrgHid.unionCode,'unionCode')
          }else{
            this.getOrgList(arr[arr.length-2])
          }
        }else{
          this.getOrgList()
        }
      },
      goNext(){
        if(this.hasPre){
          this.getOrgList(this.tmpOrg.orgId)
        }else{
          this.getOrgList(this.tmpOrg.code,'unionCode')
        }
      },
      getBizShowData(){
        getBizProductsOrderInfo().then((res)=>{
          console.log(res)
        })
      },
      goEditAddress(){
        let url = this.redirectUrl("addressId")
        this.$router.push({path: '/bizAddrCd',query:{bizCallback:encodeURIComponent(url)}});
      },
      getAddress(addressId){
        let addr = '';
        let addrDetail = '';
        if(!addressId){
          typeAddress['getAddressList']().then((res)=>{
            if(res.data.code==200&&!res.data.content){
              this.goEditAddress()
            }else if(res.data.code==200&&res.data.content.length>0){
              this.address=res.data.content[0]
              addr = this.address.provinceName + " " +this.address.cityName + " " + this.address.countyName + " ";
              addrDetail = this.address.exactAddress;
              this.showShippingAddr = addr + addrDetail;
              this.enterpriseObj.invoiceContactAddress = addr;
              this.enterpriseObj.invoiceExactAddress = addrDetail;
              this.enterpriseObj.invoiceReciverName = this.address.receiveName;
              this.enterpriseObj.invoiceReciverTel = this.address.telephone;
              this.setLsItem('enterpriseObj',this.enterpriseObj);
            }else{
              this.$toast(res.data.message)
            }
          })
        }else{
          typeAddress['getAddressInfo'](addressId).then((res)=>{
            if(res.data.code==200){
              this.address=res.data.content
              addr = this.address.provinceName + " " +this.address.cityName + " " + this.address.countyName + " ";
              addrDetail = this.address.exactAddress;
              this.showShippingAddr = addr + addrDetail;
              console.log(this.showShippingAddr)
              this.enterpriseObj.invoiceContactAddress = addr;
              this.enterpriseObj.invoiceExactAddress = addrDetail;
              this.enterpriseObj.invoiceReciverName = this.address.receiveName;
              this.enterpriseObj.invoiceReciverTel = this.address.telephone;
              this.setLsItem('enterpriseObj',this.enterpriseObj);
              console.log(this.enterpriseObj.invoiceContactAddress)
            }else{
              this.$toast(res.data.message)
            }
          })
        }
      },
      redirectUrl(name){
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name)>-1) {
          var obj = {}
          var arr = query.split("&");
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
          };
          delete obj[name];
          var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");

          return url
        }else{
          return baseUrl
        }
      },
      testingPlatform(){
        let that = this;
        this.syJsbGetAppInfo((info)=>{
          if(info){
            that.platform = 'app';
            return false;
          }
        });
        let pt = checkBrowser();
        if(pt.isWx){
          that.platform = 'wechar'
        }
      },
      next(){
        let order = this.enterpriseObj;
        order.orderSource = this.platform == ''? this.platform='app' : this.platform;
        this.setLsItem('enterpriseObj',this.enterpriseObj);
        if(order.purchaserName == '' || order.purchaserName == null){
          this.$toast("请填写公司名称")
        }else if(order.identifyNo == '' || order.identifyNo == null){
          this.$toast("请填写税号")
        }else if(order.companyAddress == '' || order.companyAddress == null){
          this.$toast("请填写单位地址")
        }else if(order.companyTel == '' || order.companyAddress == null){
          this.$toast("请填写电话号码")
        }else if(order.bankName == '' || order.bankName == null){
          this.$toast("请填写开户银行")
        }else if(order.bankAccount == '' || order.bankAccount == null){
          this.$toast("请填写银行卡号")
        }else if(order.showInvoiceTxt == '' || order.showInvoiceTxt == null){
          this.$toast("请选择发票类型")
        }else if(order.showSpecialTxt == ''){
          this.$toast("请选择开票要求")
        }else if(order.isSpecial == 1 && order.specialInfo == ''){
          this.$toast("请填写特殊要求");
        }else if(order.invoiceContactAddress == '' || order.invoiceContactAddress == null || order.invoiceContactAddress == 'undefined'){
          this.$toast("请填写寄送地址")
        }else if(order.invoiceExactAddress == '' || order.invoiceExactAddress == null){
          this.$toast("请填写寄送详细地址")
        }else if(order.invoiceReciverName == '' || order.invoiceReciverName == null){
          this.$toast("请填写收票人姓名")
        }else if(order.invoiceReciverTel == '' || order.invoiceReciverTel == null){
          this.$toast("请填写收票人电话")
        }else if(order.email == '' || order.email == null){
          this.$toast("请填写电子邮箱")
        }else if(order.pointsUnoinName == '' || order.pointsUnoinName == null){
          this.$toast("请填写积分归属部门")
        }else if(order.email && !this.isEmail(order.email)){
          this.$toast("请检查邮箱格式是否正确")
        }else{
          console.log('下一步');
          console.log(order)
        }
      },
      descInput(){
        this.remnant = this.enterpriseObj.specialInfo.length;
        console.log(this.remnant);
      },
      setLocalData(){
        this.setLsItem('enterpriseObj',this.enterpriseObj);
      },
      checkIsEmpty(val, str){
        if(val == ''){
          this.$toast('请填写'+str)
        }
      },
      isEmail(mail){
        let a = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/;
        let b = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if(a.test(mail) && b.test(mail)){
          return true;
        }else{
          return false;
        }
      },
      invoiceConfirm(str){
        if(str == '增值税普通发票'){
          this.enterpriseObj.invoiceType = 0;
          this.enterpriseObj.showInvoiceTxt = str;
          this.setLsItem('enterpriseObj',this.enterpriseObj)
        }else{
          this.enterpriseObj.invoiceType = 1;
          this.enterpriseObj.showInvoiceTxt = str;
          this.setLsItem('enterpriseObj',this.enterpriseObj)
        }
        this.invoiceIo= false
      },
      poupsMark(param){
        console.log(param);
        if(param == 'ask'){
          this.askFor= !this.askFor;
        }else if(param == 'invoice'){
          this.invoiceIo = !this.invoiceIo;
        }
      },
      reqConfirm(str){
        if(str == '无特殊要求'){
          this.enterpriseObj.isSpecial = 0;
          this.enterpriseObj.showSpecialTxt = str;
          this.enterpriseObj.specialInfo= '';
          this.setLsItem('enterpriseObj',this.enterpriseObj)
        }else{
          this.enterpriseObj.isSpecial = 1;
          this.enterpriseObj.showSpecialTxt = str;
          this.setLsItem('enterpriseObj',this.enterpriseObj)
        }
        this.askFor= false
      },

    },
  }
</script>
<style lang="scss" scoped>
  .jc-purchasing{
    position:relative;
    width: 100%;
    padding-bottom:0.98rem;
    .jc-input{
      height:.88rem;
      /*border-bottom:1px solid #E3E3E3;*/
      box-sizing: border-box;
      margin: 0 .3rem;
      /*padding-right:.3rem;*/
      font-size: .32rem;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .jc-input-text{
        padding-right:.3rem;
        /*min-width:1.2rem;*/
      }
      .other-font{color:rgba(148,148,148,1);}
      input{
        flex:1;
        font-size: .32rem;
        overflow: hidden;
        background:#fff;
        color:rgba(148,148,148,1);
      }
      .r-img{
        width:.16rem;
        height:.32rem;
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
      .get-code{
        /*width:2rem;*/
        line-height: .88rem;
        color:#FF1919;
        height:100%;
        padding-left:.2rem;
        border-left:1px solid #E3E3E3;
      }
    }
    .jc-input:nth-last-of-type(2){border-bottom:none;}
    .jc-area{
      padding:0 0.3rem;
      .jc-area-con{
        display:flex;
      }
      .jc-area-text{
        padding-right:0.12rem;
        height:0.88rem;
        font-size:0.32rem;
        line-height: 0.88rem;
      }
      .jc-textarea{
        display:flex;
        flex:1;
        padding-top:0.21rem;
        height:2rem;
        font-size:0.32rem;
        color:rgba(148,148,148,1);
        line-height:0.46rem;
      }
      .jc-area-bottom{
        text-align:right;
        font-size:0.26rem;
        color:rgba(208,208,208,1);
        line-height:0.37rem;
      }
    }
    .jc-bottom-btn{
      width: 7.5rem;
      position:fixed;
      bottom:0;
      z-index:22;
      /*display:flex;*/
      height:0.98rem;
      background:rgba(248,248,248,0.82);
      .jc-bottom-btn-l{
        float:left;
        padding-left:0.3rem;
        width:4.5rem;
        height:0.98rem;
        line-height:0.98rem;
        box-sizing: border-box;
        font-size:0.3rem;
        color:rgba(46,46,46,1);
      }
      .jc-bottom-btn-r{
        float:right;
        width:3rem;
        height:0.98rem;
        font-size:0.3rem;
        color:rgba(255,255,255,1);
        line-height:0.98rem;
        text-align:center;
        background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
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
  }
  .fade-layer2-enter-active,.fade-layer2-leave-active{
    transition: opactiy 0.5s ease-in-out;
  }
  .fade-layer2-enter, .fade-layer2-leave-to{
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
  .department-con{
    height:7.86rem;
    width:100%;
    background: #fff;
    z-index:10001;
    position: fixed;
    bottom:0;
    left:0;
    font-size: .3rem;
    color:#2e2e2e;
    .colore3{
      color:#e3e3e3;
    }
    .d-title{
      height:1rem;
      line-height: 1rem;
      .s-btn{
        margin-left:.5rem;
        margin-right:.6rem;
      }
      .s-sure{
        margin-right:.5rem;
      }
    }
    .d-con{
      text-align: center;
      height:100%;
      overflow-y: auto;
      .d-item{
        height:.92rem;
        line-height: .92rem;
      }
    }
  }
  .slide-up2-enter-active, .slide-up2-leave-active {
    transition: all .4s
  }
  .slide-up2-enter, .slide-up2-leave-to {
    transform: translate(0, 100%);
  }
</style>
