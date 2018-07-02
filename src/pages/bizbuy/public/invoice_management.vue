<template>
  <div class="invoice-management">
    <div class="invoice-con">
      <div v-title="cTitle"></div>
      <div class="invoice-info">
        <div class="invoice-input border-bottom-1px">
          <div class="sy-input-text">名称</div>
          <input type="text" v-model.trim="invoiceObj.purchaserName" placeholder="请填写公司名称">
        </div>
        <div class="invoice-input border-bottom-1px">
          <div class="sy-input-text">税号</div>
          <input type="text" v-model.trim="invoiceObj.identifyNo" placeholder="15-20位">
        </div>
        <div class="invoice-input border-bottom-1px">
          <div class="sy-input-text">单位地址</div>
          <input type="text" v-model.trim="invoiceObj.companyAddress" placeholder="与营业执照上一致">
        </div>
        <div class="invoice-input border-bottom-1px">
          <div class="sy-input-text">电话号码</div>
          <input type="text" v-model.trim="invoiceObj.companyTel" placeholder="与营业执照上一致">
        </div>
        <div class="invoice-input border-bottom-1px">
          <div class="sy-input-text">开户银行</div>
          <input type="text" v-model.trim="invoiceObj.bankName" placeholder="请输入开户银行名称">
        </div>
        <div class="invoice-input border-bottom-1px">
          <div class="sy-input-text">银行账户</div>
          <input type="number" v-model.trim="invoiceObj.bankAccount" placeholder="请输入银行卡号">
        </div>
      </div>
      <footer class="invoice-bottom" @click="postInvoiceData">保存</footer>
    </div>
  </div>
</template>
<script>
  import {getFpmOrderInfo, postInvoiceInfo} from "@/requests/fpmOrder.js"
  export default{
    data(){
      return {
        cTitle:'发票管理',
        invoiceObj:{
          purchaserName:'',
          identifyNo:'',
          companyAddress:'',
          companyTel:'',
          bankName:'',
          bankAccount:''
        },
      }
    },
    created() {
      this.getInvoiceData();
    },
    mounted() {
      this.$nextTick(()=>{
        this.$header.setTitle("发票管理")
        this.$loading.show = false;
      })
    },
    methods: {
      myAlert(){
        this.$confirm("弹窗",function(){},"发票管理");
      },
      getInvoiceData(){
        getFpmOrderInfo().then((res)=>{
          if(res && res.data.code == 200){
            this.invoiceObj = res.data.data.orderExtendVo;
          }else{
//            console.log(res.data.message)
          }
        },(error)=>{
          console.log(error);
        })
      },
      postInvoiceData(){
        let obj = this.invoiceObj;
        if((obj.purchaserName && obj.identifyNo && obj.companyAddress && obj.companyTel && obj.bankName && obj.bankAccount) == ''){
          this.$toast('所填项不能为空')
        }else{
          postInvoiceInfo(obj).then((res)=>{
            if(res && res.data.code == 200){
              this.$toast(res.data.message)
              setTimeout(()=>{
                this.syJsbCloseAppPage()
              },1000)
            }else{
//              console.log(res.data.message)
            }
          },(error)=>{
            console.log(error);
          })
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .invoice-management{
    width: 100%;
  }
  .invoice-con{
    width: 7.5rem;
    margin: 0 auto;
    .invoice-input{
      padding:0 0.3rem;
      height:.88rem;
      box-sizing: border-box;
      /*padding: 0 .3rem;*/
      padding-right:.3rem;
      font-size: .32rem;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .sy-input-text{
        padding-right:.3rem;
        min-width:2.1rem;
        color:#4b4b4b;
      }
      input{
        flex:1;
        font-size: .32rem;
        overflow: hidden;
        color:#949494;
      }
    }

    .invoice-bottom{
      margin: 1.6rem auto 0;
      width:6.9rem;
      height:0.88rem;
      line-height: 0.88rem;
      text-align:center;
      font-size:0.32rem;
      color:rgba(255,255,255,1);
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
      border-radius: 0.16rem;
    }

  }

</style>
