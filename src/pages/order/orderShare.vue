<template>
  <div class="share-top">
      <downLoad></downLoad>
    <div class="share-bg">
      <img :src="imgUrl+'/common/order-share.png'" alt="" class="share-red">
      <div class="text-list">
        <p class="text">我在“一起善源”平台上购买了这些商品</p>
        <p class="text text-one">都是我精心挑选的好货，邀请您一起来帮扶</p>
      </div>
      <img v-lazy="userHeadUrl" alt="" class="share-header">
    </div>
    <ul style="padding-left: 0.3rem;overflow: hidden">
      <li v-for="item in getData" class="li-list border-bottom-1px" @click="goUrl(item)">
        <div class="div-img fl">
          <img v-lazy="item.goodsImage+ossUrl('webp_240')" alt="" class="li-img">
        </div>
        <div class="fl div-right-text">
          <p class="goods-p">{{item.goodsName}}</p>
          <p class="goods-type">{{item.orderType|mingCheng}} <span v-if="item.orderType==10||item.orderType==12">{{item.sellerName}}</span></p>
          <span class="money red"><span v-if="item.goodsPrice!=0">{{'¥'+moneyFormat(item.goodsPrice)}} </span><span v-if="item.totalPoints!=0&&item.goodsPrice!=0">+</span><span v-if="item.totalPoints!=0">{{item.totalPoints+'积分'}}</span> </span>
          <button class="btn" @click.stop="goUrl(item)">立即帮扶</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import downLoad from '../../components/common/downLoad.vue'
  import * as type from '../../requests/order'
  import share from '../../modules/_share/share'
	export default {
		data() {
			return {
			  getData:[1,2],
        userHeadUrl:''
      }
		},
		created() {
		  this.getServiceData()
		},
    filters:{
      mingCheng(p){
        var str = ""
        switch(p){
          case 10:str = "助理人：";break;
          case 12:str = "贫困户：";break;
          case 20:str = "积分商城";break;
          case 30:str = "善源甄选";break;
        }
        return str;
      },
    },
    mounted(){
		  setTimeout(()=>{
        this.$header.show=false;
      },0)
    },
		methods: {
      moneyFormat(p){
        if(!p&&p!=0) return
        if(p==0)return 0
        p=parseFloat(p)
        p=p/100
        p=p.toString()
        var arr=p.split('.')
        if(!arr[1]){
          arr[1]="00"
        }else if(arr[1].length==1){
          arr[1]=arr[1]+"0"
        }
        return arr[0]+'.'+arr[1]
      },
      goUrl(item){
        this.appOpen('goodsDetail',{goodsId:item.goodsId})
      },
      getServiceData(){
        var data={mainId:this.$route.query.mainId}
        type['getShareData'](data).then(res=>{
          this.$loading.show=false
          if(res.data.code==200){
            this.getData=res.data.data.shareGoodsList
            if(!res.data.data.memberInfo.avatar){
              this.userHeadUrl=this.imgUrl+'/common/head-default.jpg'
            }else{
              this.userHeadUrl=res.data.data.memberInfo.avatar
            }
            this.shareSecond()
          }else{
            this.$toast(res.data.message)
            this.appOpen('/failure',{},false,false,true)
          }
        })
      },
      shareSecond(){
        var msg = {
          title:'[爱・源于善] 购买这些爱心产品能扶贫，我已下单，你也看看？',
          text:this.getData[0].goodsName,
          url :window.location.href+'&isShare=yes',
          logo :this.getData[0].goodsImage,
        }
        share(msg)
      },
    },
		components: {
      downLoad
    }
	}
</script>

<style lang="scss" scoped>
.share-top{
  height:100%;
  .share-load{
    height: 1rem;
    position: relative;
  }
  .share-bg{
   position: relative;
    height: 1.49rem;
    overflow: hidden;
  }
  .share-red{
    position: absolute;
    top:0;
    width: 100%;
    height: 1.49rem;
    z-index: -1;
  }
  .text{

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:4.79rem;
    height:0.4rem;
    font-size:0.28rem;
    color:rgba(255,255,255,1);
    line-height:0.4rem;
  }
  .text-one{
    margin-top: 0.08rem;
    height:0.33rem;
    font-size:0.24rem;
    line-height:0.33rem;
  }
  .text-list{
    margin: 0.34rem 0 0 0.3rem;
  }
  .share-header{
    position: absolute;
    right:0.3rem;
    top:.34rem;
    width: .82rem;
    height: 0.82rem;
    border-radius: 50%;
  }
  .li-list{
    height: 2.6rem;
    padding-top: 0.4rem;
    box-sizing: border-box;
  }
  .div-img{
    margin-right: 0.3rem;
    width: 2.7rem;
    height: 1.89rem;
  }
  .li-img{
    width: 100%;
    height: 100%;
  }
  .div-right-text{
    height: 100%;
    position: relative;
  }
  .goods-p{
    width:3.9rem;
    font-size:0.32rem;
    color:rgba(46,46,46,1);
    line-height:0.45rem;
  }
  .red{
    color:rgba(255,25,25,1);
  }
  .money{
    font-size:0.32rem;
    font-weight: 600;
    color:rgba(255,25,25,1);
    position: absolute;
    bottom: 0.25rem;
    left: 0;
  }
  .goods-type{
    margin-top: 0.06rem;
    height:0.37rem;
    font-size:0.26rem;
    color:rgba(208,208,208,1);
    line-height:0.37rem;
  }
  .btn{
    width:1.39rem;
    height:0.66rem;
    background:rgba(255,25,25,1);
    border-radius:0.08rem;
    font-size:0.26rem;
    color:rgba(255,255,255,1);
    line-height:0.37rem;
    position: absolute;
    bottom: 0.25rem;
    right: 0rem;
  }
}
</style>
