<template>
    <div class="wrapper">
      <img :src="imgUrl+'/common/pays.png'" alt=""
           class="success-img">
      <h2 class="title">订单已支付成功</h2>
      <p class="money">合计现金：￥{{gainData.payFeeStr}}</p>
      <div class="btn-one" @click="inviteFirends">邀请朋友一起帮扶</div>
      <div class="btn-one btn-two" @click="watchOrder">查看订单</div>
      <div class="footer">
        <span class="gry">—— </span>平台谨代表 <span class="org">{{gainData.poorCount}}</span>位贫困户，感谢您的爱心善举 <span class="gry"> ——</span>
      </div>
    </div>
</template>

<script>
  import * as type from '../../requests/order'
	export default {
		data() {
			return {
        gainData:{
          payFeeStr: 0,
          poorCount:0,
          chooseType:''
        }
      }
		},
		created() {
      this.getData()
      this.setAppData({ 'h5Key': 'chooseType' , 'h5Value' :''})
		},
    mounted(){
      this.appUnBack()
      this.$header.hideBack=false;
      this.$header.setTitle('支付结果')
    },
		methods: {
		  getData(){
        var data={
          outTradeNo:this.$route.query.mainId||'',
          payWay:this.$route.query.payWay||''
        }
        type['getAffirmPayResult'](data).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            this.gainData=res.data.data
          }
        })


      },
      inviteFirends(){

      },
      watchOrder(){
        this.appOpen('consumRecord',{chooseType :'receive',payment:'payIndex'})
      }
    },
		components: {}
	}
</script>

<style lang="scss" scoped>
  .gry{
    font-weight: 300;
    color: #D0D0D0;
    opacity: 0.5;
  }
  .org{
    color: #FF6533;
  }
  .footer{
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.4rem;
    position: fixed;
    bottom: 0.7rem;
    text-align: center;
    width:100%;

  }
  .footer::after{
    width:0.3rem;
    height:0.02rem;
    background: #D0D0D0;
  }
.wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  .success-img{
    border: 0;
    display: block;
    width: 2rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    margin-bottom: 0.23rem;
  }
  .title{
    height:0.5rem;
    font-size:0.36rem;
    text-align: center;
    color:rgba(46,46,46,1);
    line-height:0.5rem;
  }
  .money{
    text-align: center;
    height:0.37rem;
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
    line-height:0.37rem;
  }
  .btn-one{
    width: 6.9rem;
    margin: 0 auto;
    margin-top: 1.17rem;
    margin-bottom: 0.44rem;
    height:0.88rem;
    font-size:0.32rem;
    color:rgba(255,255,255,1);
    line-height:0.88rem;
    text-align: center;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.16rem ;
  }
  .btn-two{
    margin-top: 0;
    color:rgba(46,46,46,1);
    border-radius: 0.16rem ;
    border: 1px solid #D0D0D0;
    background: #fff;
  }
</style>
