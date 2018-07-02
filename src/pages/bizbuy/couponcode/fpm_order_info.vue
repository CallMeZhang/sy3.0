<template>
  <div class="fpm-order">
    <div v-title="fTitle"></div>
    <div class="fpm-input">
      <div class="fpm-input-text">单张面额</div>
      <input type="number" class="input other-font" placeholder="请填写单张面额(精确到元)" v-model.trim="curOrderInfo.goodsPirce" @blur="checkNumber(curOrderInfo.goodsPirce);cutOutNum(curOrderInfo.goodsPirce);">
    </div>
    <div class="fpm-input-other">
      <div class="fpm-input-left">采购数量</div>
      <div class="fpm-input-middle">
        <span class="add-bg" @click="subNumbers"></span>
        <input type="number" value="5" placeholder="数量" v-model="curOrderInfo.goodsNum" @blur="checkFpmNums(curOrderInfo.goodsNum,'请填写采购数量')">
        <span class="sub-bg" @click="addNumbers"></span>
      </div>
      <div class="fpm-input-right">最少采购&ensp;5&ensp;张！</div>
    </div>

    <div class="fpm-input">
      <div class="fpm-input-text">发放署名</div>
      <input type="text" class="input other-font" placeholder="请填写发放方署名(20字以内)" v-model="curOrderInfo.signatusre"  oninput="if(value.length>20)value=value.slice(0,20)" @blur="checkEpty(curOrderInfo.signatusre,'请填发放方署名')">
    </div>
    <div class="fpm-input">
      <div class="fpm-input-text">有效期&ensp;&ensp;</div>
      <input type="text" value="1个月" class="input other-font" placeholder="1个月" disabled>
    </div>
    <div class="fpm-introduction"><span class="points"></span>有效期从扶贫码生成时间开始计算，为不影响使用，发放时请让收码人尽快激活</div>
    <button class="fpm-bottom-btn iphonex-bottom-after" @click.prevent="nextStep()" :disabled="isDisabled">下一步</button>
  </div>
</template>
<script>
  import Ls from '@/modules/storage/storage.js'
  import { getShowFpmOrderInfo, postFpmOrderInfoSecond} from "@/requests/fpmOrder"
  export default{
    data(){
      return {
        fTitle:'扶贫码采购',
        isDisabled:false,//控制按钮重复点击
        curOrderInfo:{
          goodsNum:5, //扶贫码数量
          goodsPirce:'',//扶贫码面额
          signatusre:'', //发放署名
        },//
        fpmOrderId:'',//orderId
      }
    },
    watch:{
      goodsPirce:function(val,oldVal){/*console.log(val,oldVal);*/},
    },
    filters: {
      checkStr: function (str) {
        str = str.substring(0, str.length - 1);
        return str;
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      this.$nextTick(()=>{
        this.$loading.show = false;
        this.$header.middleFn({
          type:'img',
          url:require('../../../../static/images/common/step_2.png'),
          callback:function () {
          }
        })
      })
    },
    methods: {
      getData(){
        this.fpmOrderId = Ls.getLsItem("postOrderFirstId");
        if(this.fpmOrderId){
          getShowFpmOrderInfo(this.fpmOrderId).then((res)=>{
            if(res && res.data.code == 200){
              let allData = res.data.data.BizOrderSaveBo;
              this.curOrderInfo.goodsNum = (allData.goodsNum == '' || allData.goodsNum == 0) ? 5 : allData.goodsNum;
              let goodsPirce = parseInt(allData.goodsPirce) / 100;
              this.curOrderInfo.goodsPirce = goodsPirce == 0 ? '' : goodsPirce;
              allData.signatusre != '' ? this.curOrderInfo.signatusre = '' : this.curOrderInfo.signatusre = allData.signatusre;
            }else{
//              console.log(res.data.message);
            }
          },(error)=>{
            console.log(error);
          })
        }
      },
      nextStep(){
        this.fpmOrderId = Ls.getLsItem("postOrderFirstId");
        if(this.curOrderInfo.goodsPirce == ''){
          this.$toast("请填写单张面额");
          return false;
        }else if(this.checkNumber(this.curOrderInfo.goodsPirce)){
          return false;
        }else if(this.curOrderInfo.goodsNum == ''){
          this.$toast("请填写采购数量");
          return false;
        }else if(parseInt(this.curOrderInfo.goodsNum) <5 || parseInt(this.curOrderInfo.goodsNum)>5000){
          this.$toast("采购数量最少5张,最多5000张！");
          return false;
        }else if(this.curOrderInfo.signatusre == ''){
          this.$toast("请填发放方署名");
          return false;
        }else{
          this.curOrderInfo.goodsNum = parseInt(this.curOrderInfo.goodsNum);
          this.curOrderInfo.goodsPirce = parseFloat(this.curOrderInfo.goodsPirce);
          this.curOrderInfo.bizId = this.fpmOrderId;
//          console.log(this.curOrderInfo)
          this.isDisabled = true;
          let timer = setTimeout(()=>{
            this.isDisabled = false;
            postFpmOrderInfoSecond(this.curOrderInfo).then((res)=>{
              if(res && res.data.code == 200){
                this.appOpen("/fpmAgreement");
              }else{
//                console.log(res.data.message)
              }
            },(error)=>{
              console.log(error);
            })
          },800);
        }
      },
      checkNumber(value){
        var test_value=value;
        var patrn=/^([1-9]\d*|0|-)(\d*[0-9])?$/;
        if(value == ''){
          this.$toast("请填写单张面额");
          return true;
        }else if((!patrn.exec(test_value)) && value !== ''){
          if(isNaN(value)){
            this.$toast("请填写单张面额");
            return true;
          }
          var rep = /-/;
          var res = rep.test(value);
          if(res){
            this.curOrderInfo.goodsPirce = '';
          }
          this.$toast("请输入正确的正整数，面额1~5000元");
          return true;
        }else if(parseInt(value) < 1){
          this.curOrderInfo.goodsPirce = '';
          this.$toast("单张面额不能小于1元");
          return true;
        }else if(parseInt(value) > 5000){
          this.$toast("单张面额不能超过5000元");
          return true;
        }else{
          return false;
        }
      },
      cutOutNum(val){
//        val = val.toString().replace(/[^\d]/g,'');
        if(val !== '' && isNaN(val)){
          return;
        }else{
          this.curOrderInfo.goodsPirce = parseInt(val);
        }

      },
      checkEpty(val,str){
        if(val == ''){
          this.$toast(str)
        }
      },
      checkFpmNums(val,str){
        if(val == ''){
          this.$toast(str)
        }else if(parseInt(val)<5){
          this.$toast("采购数量最少5张");
          this.curOrderInfo.goodsNum=5;
        }else if(parseInt(val)>5000){
          this.$toast("采购数量最多5000张");
          this.curOrderInfo.goodsNum=5000;
        }
      },
      addNumbers(){
        this.curOrderInfo.goodsNum++;
        if(this.curOrderInfo.goodsNum >= 5000){
          this.curOrderInfo.goodsNum=5000;
        }
      },
      subNumbers(){
        this.curOrderInfo.goodsNum--;
        if(this.curOrderInfo.goodsNum < 5){
          this.curOrderInfo.goodsNum=5;
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  $red:red;
  h1{color:$red;text-align:center;}
  .fpm-order{
    width: 100%;
    height: 100%;
    background: rgba(249,249,249,1);
    .fpm-input{
      height:.88rem;
      border-bottom:1px solid #E3E3E3;
      box-sizing: border-box;
      padding: 0 .3rem;
      /*padding-right:.3rem;*/
      font-size: .32rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background:#fff!important;
      .fpm-input-text{
        padding-right:.3rem;
        color:#4B4B4B;
        background:#fff!important;
        /*min-width:1.2rem;*/
      }
      .other-font{color:rgba(148,148,148,1);}
      .input{
        flex:1;
        font-size: .32rem;
        overflow: hidden;
        background:#fff!important;
        color:#2E2E2E;
      }
      .r-img{
        width:.16rem;
        height:.32rem;
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
    .fpm-input-other{
      height:.88rem;
      border-bottom:1px solid #E3E3E3;
      padding: 0 0.3rem;
      font-size: .32rem;
      background:#fff!important;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .fpm-input-left{
        width: 1.58rem;
      }
      .fpm-input-middle{
        display:flex;
        flex-flow: row nowrap;
        input{
          width: 0.9rem;
          text-align: center;
          background:#fff;
        }
        .add-bg{
          display:inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background:url("/static/images/common/sub_num.png")no-repeat center;
          background-size:cover;
          border-radius: 50%;
        }
        .sub-bg{
          display:inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background:url("/static/images/common/add_num.png")no-repeat center;
          background-size:cover;
          border-radius: 50%;
        }
      }
      .fpm-input-right{
        flex-grow:1;
        width:1.73rem;
        height:0.88rem;
        text-align:right;
        font-size:0.24rem;
        color:rgba(255,101,51,1);
        line-height:0.88rem;
      }

    }
    .fpm-introduction{
      position:relative;
      margin: 0.25rem 0.3rem 0;
      padding-left: 0.25rem;
      font-size:0.24rem;
      color:rgba(255,101,51,1);
      line-height:0.33rem;
      .points{
        position: absolute;
        left: 0;
        top: 6px;
        width: 5px;
        height: 5px;
        background: #FF6533;
        border-radius: 50%;
      }
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

  }
</style>
