<template>
  <div class="fpm-agreement">
    <div v-title="fTitle"></div>
    <h1 class="agreement-title">“一起善源”平台扶贫电子码集中采购合同</h1>
    <h2 class="agreement-top">甲方：<span>{{orderInfo.purchaserName}}</span></h2>
    <h2 class="agreement-top">乙方：<span>中益善源（北京）科技有限公司</span></h2>
    <p class="agreement-con mar-top44">甲乙双方根据《中华人民共和国合同法》及其他有关法律法规的规定，遵循平等、自愿、公平和诚实信用的原则，就甲方采购乙方扶贫电子码相关事宜协商订立本合同，以供双方共同遵守。</p>
    <p class="agreement-con">本合同是甲方采购乙方扶贫电子码的框架合同文本，适用于甲方向乙方提出的各批次扶贫电子码采购内容。本合同是执行扶贫电子码采购订单的重要组成部分，乙方收到甲方盖章后的合同方能执行。</p>
    <h3 class="agreement-t">第一条  采购内容</h3>
    <h4 class="agreement-t-2">1.1采购内容：</h4>
    <div class="agreement-con">
      <p >扶贫电子码：&ensp;{{orderInfo.goodsNum}}&ensp;张</p>
      <p>每张面额：&ensp;￥{{orderInfo.goodsPrice}}&ensp;元</p>
      <p>有效期：&ensp;30 &ensp;天</p>
      <p>采购金额总计：&ensp;￥<span>{{orderInfo.totalPrice}}&ensp;元</span></p>
      <p>甲方具体采购内容以甲方在“一起善源”平台扶贫电子码采购专区提交的采购订单为准。</p>
    </div>
    <h4 class="agreement-t-2"><span>1.2采购价款：</span></h4>
    <p class="agreement-con">以甲方各批次在“一起善源”平台采购的扶贫电子码实际购买平台货物所对应的价款为准。</p>
    <h3 class="agreement-t">第二条  扶贫电子码的发放及使用</h3>
    <p class="agreement-con">2.1甲方各批次在“一起善源”平台下单采购扶贫电子码形成有效订单后，乙方于2个工作日内将扶贫电子码发放给甲方。</p>
    <p class="agreement-con">2.2甲方在“一起善源”平台下单采购扶贫电子码时，已明确知晓扶贫电子码的有效期，应在有效期内及时使用。</p>
    <p class="agreement-con">2.3甲方若将扶贫电子码发放给员工使用的，应明确告知员工扶贫电子码的有效期，并提醒员工在有效期内及时使用。</p>
    <p class="agreement-con">若甲方或甲方员工未在有效期内使用或全额使用完毕的，则过期未使用或未全额使用完毕的扶贫电子码作废。</p>
    <h3 class="agreement-t">第三条  价款及付款时间、方式</h3>
    <p class="agreement-con">3.1本合同签订后，乙方根据甲方各批次在“一起善源”平台下单采购的扶贫电子码实际购买平台货物明细，向甲方开具增值税发票。甲方收到发票后的10个工作日内将相应款项（发票金额）支付给乙方。</p>
    <p class="agreement-con">3.2 付款方式：对公银行转账。</p>
    <p class="agreement-con">3.3 乙方账户信息如下：</p>
    <div>
      <p class="agreement-con">户  名： <span class="font-formatting">&ensp;中益善源（北京）科技有限公司&ensp;</span></p>
      <p class="agreement-con">开户行： <span class="font-formatting">&ensp;中国银行北京使馆区支行&ensp;</span></p>
      <p class="agreement-con">行  号：  <span class="font-formatting">&ensp;104100004193&ensp;</span></p>
      <p class="agreement-con">账  号：  <span class="font-formatting">&ensp;324667039648&ensp;</span></p>
    </div>
    <p class="agreement-con">3.4乙方根据甲方在“一起善源”平台下单时填写的开票信息或者甲方通过其他有效方式（书面通知、电子邮件等）告知乙方的开票信息向甲方开具符合税法规定的发票。</p>
    <div>
      <p class="agreement-con">发票类型：{{orderInfo.showInvoiceType}}</p>
      <p class="agreement-con">单位名称：{{orderInfo.purchaserName}}</p>
      <p class="agreement-con">纳税人识别号：{{orderInfo.identifyNo}}</p>
      <p class="agreement-con">地址：{{orderInfo.companyAddress}}</p>
      <p class="agreement-con">电话：{{orderInfo.companyTel}}</p>
      <p class="agreement-con">开户银行：{{orderInfo.bankName}}</p>
      <p class="agreement-con">银行账号：{{orderInfo.bankAccount}}</p>
      <p class="agreement-con">发票内容：购物明细</p>
      <p class="agreement-con">开票要求：{{orderInfo.showRequest}}</p>
      <p class="agreement-con">发票接收地址：{{orderInfo.invoiceContactAddress}}&ensp;{{orderInfo.invoiceExactAddress}}&ensp;&ensp;{{orderInfo.invoiceReciverName}}&ensp;{{orderInfo.invoiceReciverTel}}</p>
    </div>
    <h3 class="agreement-t">第四条  违约责任</h3>
    <p class="agreement-con">4.1 乙方应及时向甲方发放扶贫电子码，超过15日仍未发放的，甲方有权撤销订单，如已付款，甲方可要求乙方退回已支付的款项。</p>
    <p class="agreement-con">4.2 甲方逾期向乙方付款的，每逾期一日，应按逾期应付金额的万分之五向乙方支付违约金。</p>
    <h3 class="agreement-t">第五条  保密条款</h3>
    <p class="agreement-con">若事先未征得对方的书面同意，任何一方不得以任何方式透露双方签订本合同的事实、本合同内容以及在双方履行本合同过程中所得到的对方的各种信息。</p>

    <h3 class="agreement-t">第六条  争议解决方式</h3>
    <p class="agreement-con">因履行本合同发生的争议，双方应友好协商解决，协商不成时，提交乙方所在地的人民法院诉讼解决。</p>
    <h3 class="agreement-t">第七条  其他约定</h3>
    <p class="agreement-con">7.1本合同邮寄地址为：北京西城区西交民巷17号中国银行旧址（钟楼）</p>
    <p class="agreement-con">收件人：公益中国，联系电话：130 0117 5257</p>
    <p class="agreement-con">7.2 本合同经双方加盖单位印章后生效。</p>
    <p class="agreement-con">7.3本合同一式四份，双方各执二份，具有同等法律效力。</p>
    <p class="agreement-con">7.4与履行本合同有关的文件（包括但不限于“一起善源”平台订单，双方往来的电子邮件等），为本合同的组成部分，彼此相互解释，相互补充，并与本合同具有同等法律效力。</p>
    <div>
      <p class="agreement-con mar-10"><span>甲方：{{orderInfo.purchaserName}}（盖章）</span></p>
      <p class="agreement-con mar-10"><span>乙方：中益善源（北京）科技有限公司（盖章）</span></p>
      <p class="agreement-con mar-10">签署日期： {{orderInfo.createdAt}}</p>
    </div>
    <p class="agreement-bottom iphonex-margin-bottom">&copy;17shanyuan.com</p>
  </div>
</template>
<script>
  import {getOrderDetail} from "@/requests/fpmOrder.js"
  export default{
    data(){
      return {
        fTitle:'扶贫码采购',
        main_id:'',
        orderInfo:{
          creatorType:10,
          orderSource:'',
          purchaserName:'',
          identifyNo:'',
          companyAddress:'',
          companyTel:'',
          bankName:'',
          bankAccount:'',
          invoiceType: 0,//'发票类型（0普通,1增值税',
          showInvoiceType:'',
          isSpecial:0,//是否有特殊要求0没有1有
          specialInfo: '',
          showRequest:'',
          invoiceReciverName: '',
          invoiceReciverTel:'',
          invoiceContactAddress:'',
          invoiceExactAddress: '',
          pointsUnoinId:'',
          pointsUnoinName:'',
          email: '',
          signatusre:'',
          goodsPrice:0,
          goodsNum:0,
          createdAt:'',
        },
        showOrderInfo:{},//显示订单信息
        order_id:'',//订单id
        biz_id:'',//post订单id
        result:'',//
        dateTime:'',
        isDisable:false,//控制按钮
      }
    },
    created() {

      if(this.$route.query.mainId){
        this.main_id = this.$route.query.mainId;
      }
      this.getOnlineData();
    },
    mounted() {
      this.$nextTick(()=>{
        this.$loading.show = false;
        this.$header.setTitle("查看合同");
      })
    },
    methods: {
      getOnlineData(){
        getOrderDetail(this.main_id).then((res)=>{
          this.$loading.show = false;
          if(res && res.data.code == 200){
            if(res.data.data.orderMainVo != '' || res.data.data.orderMainVo != null || Json.stringify(res.data.data.orderMainVo) != '{}'){
              this.orderInfo = res.data.data.orderMainVo;
              this.orderInfo.goodsPrice = this.orderInfo.goodsPrice;
              let invoice = res.data.data.orderMainVo.invoiceType == 0 ? '增值税普通发票':'增值税专用发票'
              this.orderInfo.showInvoiceType = invoice;
              let request = res.data.data.orderMainVo.isSpecial == 0 ? '无特殊要求' : res.data.data.orderMainVo.specialInfo;
              this.orderInfo.showRequest = request;
              let getObj = res.data.data.orderMainVo;
              let _year = getObj.createdAt.slice(0,4);
              let _month = getObj.createdAt.slice(5,7);
              let _day = getObj.createdAt.slice(8,10);
              this.orderInfo.createdAt = _year+'  年 ' +_month+'  月 '+_day+'  日 ';
            }
          }else{
//            console.log(res.data.message)
          }
        })
      },
      getDateTime(){
        var myDate = new Date();
        this.dateTime = myDate.toLocaleString();
      },

    },
  }
</script>
<style lang="scss" scoped>
  $red:red;
  h1{color:$red;text-align:center;}
  .fpm-agreement{
    width: 100%;
    overflow:scroll;
    .agreement-title{
      margin-top: 0.32rem;
      margin-bottom:0.43rem;
      width: 100%;
      height:0.48rem;
      font-size:0.34rem;
      color:rgba(46,46,46,1);
      line-height:0.48rem;
      font-weight:600;
    }
    .agreement-top{
      padding: 0 0.3rem;
      font-size:0.28rem;
      font-weight: 600;
      color:rgba(75,75,75,1);
      line-height:0.44rem;
    }
    .agreement-con{
      padding: 0 0.3rem;
      font-size: 0.28rem;
      line-height: 0.44rem;
      text-indent: 2em;
      text-align: justify;
    }
    .font-formatting{
      text-decoration:underline;
    }
    .agreement-t{
      margin:0.2rem 0;
      padding:0 0.3rem;
      font-size: 0.3rem;
      font-weight: 600;
      line-height: 0.45rem;
    }
    .agreement-t-2{
      margin-bottom:0.1rem;
      padding:0 0.3rem;
      font-size: 0.28rem;
      font-weight: 600;
      line-height: 0.44rem;
    }
    .mar-top44{
      margin-top:0.44rem;
    }
    .mar-10{
      margin:0.1rem 0;
    }
    .agreement-bottom{
      height: 1.12rem;
      display:flex;
      justify-content: center;
      align-items: center;
      font-size:0.24rem;
      color:rgba(227,227,227,1);
      line-height:0.33rem;
      background:#fafafa;
      box-shadow: 0px 1px 0px 0px rgba(227,227,227,1);
    }

  }
</style>
