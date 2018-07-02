<template>
  <div class="biz-order-agreement">
    <div v-title="fTitle"></div>
    <h1 class="agreement-title">一起善源采购协议</h1>
    <h3 class="agreement-both">甲方（采购方）：<span>取用户之前填写的单位信息</span></h3>
    <h3 class="agreement-both">乙方（采购方）：<span>中益善源（北京）科技有限公司</span></h3>
    <p class="agreement-top mar-top44">协议开头内容沙发沙发上发顺丰沙发斯蒂芬沙发斯蒂芬所发生的斯蒂芬是否水电费是地方</p>
    <div class="orderInfo mar-top44">
      <h4 class="agreement-con">采购金额共计：￥<span>1678.0（含税￥230.43）</span></h4>
      <p class="mar-top44">采购物品如下：</p>
      <div class="products-con">
        <ul class="products-item">
          <li class="item"><span class="number">1.</span>商品名称：[中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料</li>
          <li class="item">商品规格：每箱500g 每箱500g 每箱500g 每箱500g</li>
          <li class="item">购买数量：2</li>
          <li class="item">商品单价：￥50</li>
        </ul>
        <ul class="products-item">
          <li class="item"><span class="number">2.</span>商品名称：[中宁农家鸡] 爱心帮扶农家散养鸡蛋绿色无危害，未添加饲料</li>
          <li class="item">商品规格：每箱500g 每箱500g 每箱500g 每箱500g</li>
          <li class="item">购买数量：2</li>
          <li class="item">商品单价：￥50</li>
        </ul>
      </div>

    </div>
    <div class="orderInfo mar-top44">
      <h4 class="agreement-con">甲方对采购合同签章后将合同寄送至：<br/>XX市XX路某某人收</h4>
    </div>
    <p class="agreement-top mar-top44">乙方收到合同后将采购物品进行发货。</p>
    <div class="orderInfo mar-top44">
      <h4 class="agreement-con">采购款发票开具信息为：</h4>
      <p>名称：XXXX公司</p>
      <p>税号： XXXXX</p>
      <p>单位地址：XXXXX</p>
      <p>电话：XXXX</p>
      <p>开户银行：XXXX</p>
      <p>银行账户：XXXX</p>
    </div>
    <div class="orderInfo mar-top44">
      <h4 class="agreement-con">合同及发票寄送至甲方以下地址：<br/>XX市XX路,某某人,1886666999收</h4>
    </div>
    <div class="orderInfo mar-top44">
      <h4 class="agreement-con">甲方采购款项转账至乙方以下银行账户：</h4>
      <p>银行名称：XXXX公司</p>
      <p>银行账户： XXXXX</p>
    </div>
    <p class="agreement-top mar-top44">协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容协议其他内容
      协议其他内容协议其他内容协议其他内容协议其他内容</p>
    <p class="agreement-bottom iphonex-margin-bottom">最后更新于：10:45 @17shanyuan.com</p>
    <div class="iphonex-bottom-blank"></div>
    <div class="xy-bottom-btn iphonex-bottom-after">同意并下单</div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        fTitle:'单位采购',
      }
    },
    created() {

    },
    beforeMount(){
      this.$loading.show =false;
    },
    mounted() {
      this.$nextTick((res)=>{

        this.$header.middleFn({
          type:'img',
          url:require('../../../../static/images/common/step_3.png'),
          callback:function () {
          }
        })
      })
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
  $red:red;
  h1{color:$red;text-align:center;}
  .biz-order-agreement{
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
    .agreement-both,.agreement-top,.agreement-con{
      padding: 0 0.3rem;
      font-size: 0.28rem;
      line-height: 0.44rem;
    }
    .orderInfo p{
      padding: 0 0.3rem;
      font-size: 0.28rem;
      line-height: 0.44rem;
    }
    .orderInfo .products-con{
      margin:0 0.3rem;
      .products-item{
        font-size: 0.28rem;
        line-height: 0.44rem;
        .item{
          position:relative;
          padding-left: 0.3rem;
        }
        .number{
          position:absolute;
          left:0;
          display:inline-block;
        }
      }
    }
    .mar-top44{
      margin-top:0.44rem;
    }
    .agreement-bottom{
      height: 1.12rem;
      display:flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 0.98rem;
      font-size:0.24rem;
      color:rgba(227,227,227,1);
      line-height:0.33rem;
      background:#fafafa;
      box-shadow: 0px 1px 0px 0px rgba(227,227,227,1);
    }
    .xy-bottom-btn{
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
