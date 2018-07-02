<template>
  <div class="fpm-purchasing">
    <div v-title="infoTitle"></div>
    <!-- 文本框 -->
    <div class="fpm-input">
      <div class="fpm-input-text">采购单位</div>
      <input style="padding-right:0" type="text" placeholder="请填写公司名称（发票和合同使用）" v-model.trim="fpmCompanyInfo.purchaserName" @blur="checkIsEmpty(fpmCompanyInfo.purchaserName, '公司名称');setLocalData(fpmCompanyInfo.purchaserName)">
    </div>
    <div class="fpm-input">
      <div class="fpm-input-text">税号&ensp;&ensp;&ensp;&ensp;</div>
      <input type="text" placeholder="请填写税号" v-model.trim="fpmCompanyInfo.identifyNo" @blur="checkIsEmpty(fpmCompanyInfo.identifyNo,'税号');setLocalData()">
    </div>
    <div class="fpm-input">
      <div class="fpm-input-text">单位地址</div>
      <input type="text" placeholder="与营业执照上一致" v-model.trim="fpmCompanyInfo.companyAddress"  @blur="checkIsEmpty(fpmCompanyInfo.companyAddress,'单位地址');setLocalData();">
    </div>
    <div class="fpm-input">
      <div class="fpm-input-text">电话号码</div>
      <input type="number" placeholder="与营业执照上一致" v-model.trim="fpmCompanyInfo.companyTel" @blur="checkPhone(fpmCompanyInfo.companyTel);setLocalData();">
    </div>
    <div class="fpm-input">
      <div class="fpm-input-text">开户银行</div>
      <input type="text" placeholder="请输入开户行银行名称" v-model.trim="fpmCompanyInfo.bankName" @blur="checkIsEmpty(fpmCompanyInfo.bankName,'开户银行');setLocalData();">
    </div>
    <div class="fpm-input">
      <div class="fpm-input-text">银行账号</div>
      <input type="number" placeholder="请输入银行账号" v-model.trim="fpmCompanyInfo.bankAccount" @blur="checkIsEmpty(fpmCompanyInfo.bankAccount,'银行账号');setLocalData();">
    </div>
    <div class="fpm-input" @click="poupsMark('invoice')">
      <div class="fpm-input-text">发票类型</div>
      <input type="text" placeholder="请选择" readonly v-model="fpmCompanyInfo.showInvoiceTxt">
      <div class="r-img-con" ><span class="r-j-img"></span></div>
    </div>
    <div class="fpm-input" @click="poupsMark('ask')">
      <div class="fpm-input-text">开票要求</div>
      <input type="text" placeholder="请选择" readonly v-model="fpmCompanyInfo.showSpecialTxt">
      <div class="r-img-con" ><span class="r-j-img"></span></div>
    </div>
    <div class="jc-area border-bottom-1px" v-if="fpmCompanyInfo.isSpecial == 1">
      <div class="jc-area-con">
        <div class="jc-area-text">有特殊要求</div>
        <textarea class="jc-textarea" name="" id="" placeholder="填写特殊要求"
                  maxlength="200" cols="30" rows="10" v-model="fpmCompanyInfo.specialInfo" @focus="inputGoUp()" @input="descInput()" @blur="checkIsEmpty(fpmCompanyInfo.specialInfo,'填写特殊要求');setLocalData();"></textarea>
      </div>
      <p class="jc-area-bottom">{{remnant}}/200</p>
    </div>
    <div class="fpm-input" @click="goEditAddress()">
      <div class="fpm-input-text">寄送地址</div>
      <input type="text" class="addr-input" placeholder="请选择发票与合同寄送地址" readonly v-model="showInvoiceAddr">
      <div class="r-img-con" ><span class="r-j-img"></span></div>
    </div>
    <div class="fpm-input">
      <div class="fpm-input-text">电子邮箱</div>
      <input type="text" placeholder="合同模板发送邮箱" @focus="inputGoUp()" v-model.trim="fpmCompanyInfo.email" @blur="checkIsEmpty(fpmCompanyInfo.email, '发送邮箱');setLocalData();">
    </div>
    <div class="fpm-input"  @click="departmentShow = true;selectDepartment()">
      <div class="fpm-input-text">采购部门</div>
      <input type="text" class="other-font addr-input" placeholder="请选择积分归属部门" readonly v-model="fpmCompanyInfo.pointsUnoinName">
      <div class="r-img-con"><span class="r-j-img"></span></div>
    </div>
    <div class="fpm-introduction iphonex-margin-bottom">• 扶贫码消费后产生的公益积分归属消费个人</div>
    <div :class="{'spacing-h':spacingH}"></div>
    <button class="fpm-bottom-btn iphonex-bottom-after" @click.prevent="next()" :disabled="isInterrupt">下一步</button>
    <!--bottom-popups-->
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
    <!--发票类型-->
    <div class="global-w">
      <transition name="fade-layer"><div v-show="invoiceIo" class="jc-bottom-layer" @click="invoiceIo=false;"></div></transition>
      <transition name="slide-up">
        <div v-show="invoiceIo" class="jc-bottom-layer-con iphonex-margin-bottom">
          <div class="jc-layer-top">
            <p class="border-b1" @click="invoiceConfirm('增值税普通发票')">增值税普通发票</p>
            <p class="" @click="invoiceConfirm('增值税专用发票')">增值税专用发票</p>
          </div>
          <div class="jc-layer-bottom" @click="invoiceIo= false;">取消</div>
        </div>
      </transition>
    </div>
    <!-- 部门选择-->
    <div class="global-w">
      <transition name="fade2">
        <div class="mask" v-show="departmentShow" @click="departmentShow=false;"></div>
      </transition>
      <transition name="slide-up2">
        <div class="department-con iphonex-padding-bottom" v-show="departmentShow">
          <div class="d-title border-bottom-1px">
            <div class="fl s-btn" :class="{colore3:!hasPre}" @click="goPre">上一级</div>
            <div class="fl s-btn" :class="{colore3:!hasNext}" @click="hasNext && goNext()">下一级</div>
            <div class="fr s-sure" :class="{colore3:tmpOrg.isLeaf !=1}" @click="sureOrg">确定</div>
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
  import fHeader from '@/components/common/v-header.vue'
  import fpmLs from '@/modules/storage/storage'
  import * as typeAddress from '../../../requests/bizAddress'
  import  checkBrowser from '../../../modules/_ua/browserUa'
  import {getFpmOrderInfo, getShowFpmOrderInfo, postFpmOrderInfoFirst} from "@/requests/fpmOrder"
  export default{
    data (){
      return{
        infoTitle:'扶贫码采购',
        inputRightUrl:'/static/images',
        askFor:false,
        invoiceIo:false,
        platform:'',//平台
        showInvoiceAddr:'',
        addressFlag:0,
        spacingH:false,//底部高度
        isInterrupt:false,//控制按钮点击
        postOrderId:'',
        fpmCompanyInfo:{
          creatorType:10,
          orderSource:'',
          purchaserName:'',
          identifyNo:'',
          companyAddress:'',
          companyTel:'',
          bankName:'',
          bankAccount:'',
          invoiceType: 0,//'发票类型（0普通,1增值税',
          showInvoiceTxt: '',
          isSpecial:0,//是否有特殊要求0没有1有
          showSpecialTxt:'',//
          specialInfo: '',
          invoiceReciverName: '',
          invoiceReciverTel:'',
          invoiceContactAddress:'',
          invoiceExactAddress: '',
          pointsUnoinId:'',
          pointsUnoinName:'',
          signatusre:'',
          goodsPirce:0,
          goodsNum:0,
          email: '',
          department:'',
        },
        address:{
          receiveName:'',
          telephone:'请设置收货地址',
          provinceName:'',
          cityName:'',
          countyName:'',
          exactAddress:''
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
    /*filters: {
      trim: function(value) {
        return value.trim();
      }
    },*/
    watch:{
      fpmCompanyInfo:{
        deep:true,
        handler(val){
          this.setLsItem('fpmCompanyInfo',val)
        }
      },
      tmpOrg(tmp){
        this.hasNext = !(tmp.isLeaf-0)
      },
//      remnant:function(val,oldV){console.log(val, oldV);},
    },
    created (){
      this.testingPlatform();
      let addressId = this.$route.query.addressId;
      let that = this;
      window.appNotifyClosePrePage = ()=>{
//        console.log('appNotifyClosePrePage android 执行')
        that.syJsbCloseAppPage(0);
      }
      /*window.appNotifyCloseCurPage=()=>{
        let curUrl = window.location.href;
        setTimeout(()=>{
          that.syJsbCloseAppPage(0);
        },0);
        that.appOpen(curUrl,{},true,null,true);
        let that= this;
        that.$header.customBehavior( ()=>{
          that.appBackTabbarIndex(3,0);
        })
      }
      setTimeout(()=>{
       this.syJsbIosRegisterHandler('appNotifyCloseCurPage')
       },0);*/
      if(this.getLsItem('fpmCompanyInfo') == null){
//        console.log('null')
        this.setLsItem('fpmCompanyInfo',this.fpmCompanyInfo);
      }
      if(addressId){
        if(this.getLsItem('fpmCompanyInfo') != null){
//          console.log('addressid')
          this.fpmCompanyInfo = this.getLsItem('fpmCompanyInfo')
          this.fpmCompanyInfo.specialInfo = (this.fpmCompanyInfo.specialInfo == null) ? '' : this.fpmCompanyInfo.specialInfo;
//          console.log(this.fpmCompanyInfo.specialInfo)
          if(this.fpmCompanyInfo.specialInfo){
            this.remnant = this.fpmCompanyInfo.specialInfo.length;
          }

        }
        this.getAddress(addressId);
      }else{
        this.getOnLine();
      }

    },
    mounted (){
      this.$nextTick(()=>{
        this.$loading.show = false;
        if(this.isIos() && window.location.search){
          this.appUnBack();
          this.$header.customBehavior( ()=>{
            this.appBackTabbarIndex(3);
          })
        }else{
//          console.log('fpm_purchasing_info android back')
        }

      })
      this.$header.middleFn({
        type:'img',
        url:require('../../../../static/images/common/step_1.png'),
        callback:function () {
        }
      })
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
            arr.forEach(item=>{item.orgId = item.code;item.orgName = item.name;item.isLeaf = 0,item.isUnion=true});
//            arr = arr.concat(arr[0])
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
          if(this.tmpOrg.isUnion){
            this.getOrgList(this.tmpOrg.code,'unionCode')
          }else{
            this.getOrgList(this.tmpOrg.orgId)
          }
        }else{
          this.getOrgList(this.tmpOrg.code,'unionCode')
        }
      },
      sureOrg(){
        if(this.tmpOrg.isLeaf ==1){
          this.departmentShow=false;this.org=this.tmpOrg;this.fpmCompanyInfo.pointsUnoinName=this.org.orgName;this.fpmCompanyInfo.pointsUnoinId=this.org.orgId
        }
      },
      getOnLine(){
        getFpmOrderInfo().then((res) => {
          this.$loading.show = false;
          if (res && res.data.code == 200) {
            let onLIneData = res.data.data.orderExtendVo;
            if (JSON.stringify(onLIneData) == '{}' || onLIneData == '' || onLIneData == null) {
              /*console.log('onLineData if')
              console.log(onLIneData)*/
            } else {
              this.fpmCompanyInfo = res.data.data.orderExtendVo;
              this.fpmCompanyInfo.showInvoiceTxt = this.fpmCompanyInfo.invoiceType == 0 ? '增值税普通发票' : '增值税专用发票';
              this.fpmCompanyInfo.showSpecialTxt = this.fpmCompanyInfo.isSpecial == 0 ? '无特殊要求' : '有特殊要求';
              this.showInvoiceAddr = this.fpmCompanyInfo.invoiceContactAddress + ' ' + this.fpmCompanyInfo.invoiceExactAddress
              if(this.fpmCompanyInfo.specialInfo){
                this.remnant = this.fpmCompanyInfo.specialInfo.length;
              }
            }
          }
        }, (error) => {
          console.log(error)
        })
      },
      setLocalData(){
        fpmLs.setLsItem('fpmCompanyInfo',this.fpmCompanyInfo);
      },
      inputGoUp(){
        let isAndroid = this.isAndroid()
        if (isAndroid) {
          var windowHeight = document.documentElement.clientHeight;
          document.body.style.height = windowHeight + 'px';
          this.spacingH = true
        }
      },
      next (){
        let fpm = this.fpmCompanyInfo;
        fpm.orderSource = this.platform == ''? this.platform='app' : this.platform;
        fpmLs.setLsItem('fpmCompanyInfo',fpm);
        if(fpm.purchaserName == '' || fpm.purchaserName == null){
          this.$toast("请填写公司名称")
        }else if(fpm.identifyNo == '' || fpm.identifyNo == null){
          this.$toast("请填写税号")
        }else if(fpm.companyAddress == '' || fpm.companyAddress == null){
          this.$toast("请填写单位地址")
        }else if(fpm.companyTel == '' || fpm.companyAddress == null){
          this.$toast("请填写电话号码")
        }else if(fpm.bankName == '' || fpm.bankName == null){
          this.$toast("请填写开户银行")
        }else if(fpm.bankAccount == '' || fpm.bankAccount == null){
          this.$toast("请填写银行账号")
        }else if(fpm.showInvoiceTxt == '' || fpm.showInvoiceTxt == null){
          this.$toast("请选择发票类型")
        }else if(fpm.showSpecialTxt == ''){
          this.$toast("请选择开票要求")
        }else if(fpm.isSpecial == 1 && fpm.specialInfo == ''){
          this.$toast("请填写特殊要求");
        }else if(fpm.invoiceContactAddress == '' || fpm.invoiceContactAddress == null || fpm.invoiceContactAddress == 'undefined'){
          this.$toast("请填写寄送地址")
        }else if(fpm.invoiceExactAddress == '' || fpm.invoiceExactAddress == null){
          this.$toast("请填写寄送详细地址")
        }else if(fpm.invoiceReciverName == '' || fpm.invoiceReciverName == null){
          this.$toast("请填写收票人姓名")
        }else if(fpm.invoiceReciverTel == '' || fpm.invoiceReciverTel == null){
          this.$toast("请填写收票人电话")
        }else if(fpm.email == '' || fpm.email == null){
          this.$toast("请填写电子邮箱")
        }else if(fpm.pointsUnoinName == '' || fpm.pointsUnoinName == null){
          this.$toast("请填写积分归属部门")
        }else if(fpm.email && !this.isEmail(fpm.email)){
          this.$toast("请检查邮箱格式是否正确")
        }else {
          this.fpmCompanyInfo = this.getLsItem('fpmCompanyInfo')
          this.removeLsItem('fpmCompanyInfo');
          this.isInterrupt = true;
          if(this.fpmCompanyInfo.isSpecial == 0){
            this.fpmCompanyInfo.specialInfo='';
          }
          let timer = setTimeout(()=>{
          this.isInterrupt = false;
              /*console.log(this.getLsItem('fpmCompanyInfo'))
             console.log(this.fpmCompanyInfo)*/
            postFpmOrderInfoFirst(this.fpmCompanyInfo).then((res) => {
              if (res && res.data.code == 200) {
                this.removeLsItem('fpmCompanyInfo');
                this.postOrderId = res.data.data.bizId;
                this.setLsItem('postOrderFirstId',res.data.data.bizId);
                this.appOpen('/fpmOrderInfo')
              }else{
                console.log(res.data.message);
                this.$toast(res.data.message);
              }
            }, (error) => {
              console.log(error)
            })
          },800);
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
      checkIsEmpty(val,str){
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
      checkCardNo(val){
        let account = this.checkCorporateCard(val);
        if(val == ""){
          this.$toast("请填写银行卡号");
          return false;
        }else if(isNaN(Number(val))){
          this.$toast("银行卡号必须全为数字");
          return false;
        }else if(typeof account== "string"){
          this.$toast(account);
          return false;
        }
        return true;
      },
      checkPhone(val){
        if(val == ""){
          this.$toast("请填写电话号码");
          return;
        }
        if(isNaN(Number(val))){
          this.$toast("所填项必须是数字");
        }
      },
      reqConfirm(str){
        if(str == '无特殊要求'){
          this.fpmCompanyInfo.isSpecial = 0;
          this.fpmCompanyInfo.showSpecialTxt = str;
          this.fpmCompanyInfo.specialInfo= '';
        }else{
          this.fpmCompanyInfo.isSpecial = 1;
          this.fpmCompanyInfo.showSpecialTxt = str;
        }
        this.askFor= false
      },
      descInput(){
        this.remnant = this.fpmCompanyInfo.specialInfo.length;
      },
      invoiceConfirm(str){
        if(str == '增值税普通发票'){
          this.fpmCompanyInfo.invoiceType = 0;
          this.fpmCompanyInfo.showInvoiceTxt = str;
        }else{
          this.fpmCompanyInfo.invoiceType = 1;
          this.fpmCompanyInfo.showInvoiceTxt = str;
        }
        this.invoiceIo= false
      },
      poupsMark(param){
        if(param == 'ask'){
          this.askFor= !this.askFor;
        }else if(param == 'invoice'){
          this.invoiceIo = !this.invoiceIo;
        }
      },
      goEditAddress(){
        let url = this.redirectUrl("addressId")
//        this.$router.push({path: '/bizAddrCd',query:{bizCallback:encodeURIComponent(url)}});
        let that = this;
        this.appOpen('bizAddrCd',{bizCallback:encodeURIComponent(url)})
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
              this.showInvoiceAddr = addr + addrDetail;
              this.fpmCompanyInfo.invoiceContactAddress = addr;
              this.fpmCompanyInfo.invoiceExactAddress = addrDetail;
              this.fpmCompanyInfo.invoiceReciverName = this.address.receiveName;
              this.fpmCompanyInfo.invoiceReciverTel = this.address.telephone;
              fpmLs.setLsItem('fpmCompanyInfo',this.fpmCompanyInfo);
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
              this.showInvoiceAddr = addr + addrDetail;
              this.fpmCompanyInfo.invoiceContactAddress = addr;
              this.fpmCompanyInfo.invoiceExactAddress = addrDetail;
              this.fpmCompanyInfo.invoiceReciverName = this.address.receiveName;
              this.fpmCompanyInfo.invoiceReciverTel = this.address.telephone;
              fpmLs.setLsItem('fpmCompanyInfo',this.fpmCompanyInfo);
//              console.log(this.fpmCompanyInfo.invoiceContactAddress)
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
    },
    components:{
      "f-header":fHeader,
    },
  }
</script>
<style lang="scss" scoped>
  $red:red;
  h1{color:$red;text-align:center;}
  .fpm-purchasing{
    position:relative;
    width: 100%;
    overflow:scroll;
    .fpm-input{
      height:.88rem;
      border-bottom:1px solid #E3E3E3;
      box-sizing: border-box;
      margin: 0 .3rem;
      /*padding-right:.3rem;*/
      font-size: .32rem;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .fpm-input-text{
        padding-right:.3rem;
        /*min-width:1.2rem;*/
      }
      .other-font{color:rgba(148,148,148,1);}
      input{
        flex:1;
        height:100%;
        line-height:0.48rem;
        padding-right: 0.6rem;
        font-size: .32rem;
        overflow: hidden;
        color:rgba(148,148,148,1);
        background:none;
      }
      .addr-input{
        width: 2.36rem;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
      }
      .r-img{
        width:0.32rem;
        img{
          width:.16rem;
          height:.32rem;
        }
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
    .fpm-introduction{
      margin-top: 0.25rem;
      width: calc(100% - 0.6rem);
      padding: 0 0.3rem;
      height:0.33rem;
      font-size:0.24rem;
      color:rgba(255,101,51,1);
      line-height:0.33rem;
      margin-bottom: 1.23rem;
    }
    .fpm-bottom-btn{
      display:block;
      position:fixed;
      width: 100%;
      left:0;
      bottom:0;
      height:0.98rem;
      line-height:0.98rem;
      font-size:0.3rem;
      color:rgba(255,255,255,1);
      text-align: center;
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
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
      /*height:100%;*/
      height:6.8rem;
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
  .spacing-h{
    width:100%;
    margin-bottom:5rem!important;
  }
</style>
