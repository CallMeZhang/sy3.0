<template>
    <div class="receive">
      <div class="r-top font26 color94 border-bottom-1px">
        该订单已有{{orderList.length}}个包裹待收货
      </div>
      <div class="r-con">
        <div class="r-list-con">
          <div class="r-list" v-for="(order,i) in orderList">
            <div class="flex" @click="order.checked = !order.checked">
              <div class="r-left-img" >
                <img :src="order.checked?imgUrl+'/common/checked.png':imgUrl+'/common/cir.png'" alt="">
              </div>
              <div class="flex-1 r-right">
                <div v-for="(v,k) in order">
                  <div class="r-right-con" v-for="(item,index) in v" :class="{'border-bottom-1px':index != v.length-1}">
                    <div class="clearfix">
                      <div class="fl goods-img">
                        <img v-lazy="item.goodsImage" alt="" v-img-cover="item.goodsImage">
                      </div>
                      <div class="fl goods-r">
                        <div class="goods-tit no-enter2 color4b font28">
                          <span class="goods-decs sy-red" v-show="item.isQuality">预售 | </span>
                          <span> {{item.goodsName}}</span>
                        </div>
                        <div class="r-sku color94">{{item.specUnit}}</div>
                        <div class="goods-num font26 color2e">数量：x{{item.goodsNum}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="space border-top-1px border-bottom-1px" v-if="i != orderList.length - 1"></div>
          </div>


        </div>
      </div>

      <!--<bottom :date="new Date().getTime()"></bottom>-->
      <div class="r-btn font30 colorff iphone10-footer-padding" @click.stop="sureReceive">确认收货</div>
    </div>
</template>

<script>
//  import bottom from '@/components/common/bottom'

  export default {
//    components: {bottom},
    data(){
      return {
        orderId:this.$route.query.orderId || '201805171550458895205200001',
        orderList:[],
      }
    },
    created(){
      this.getData()
    },
    mounted(){
      setTimeout(()=>{
        this.$header.setTitle('确认收货')
      },0)
    },
    methods: {
      getData(){
        return this.getWithToken('/order-center/affirmReceived/getOrderPackageList',{orderId:this.orderId}).then(res=>{
          if(res && res.code == 200){
            let obj = res.data.packageList.length?res.data.packageList[0]:{}
            let list = []
            for (let k in obj){
              var tmp = {}
              tmp[k] = obj[k]
              tmp['checked'] = false
              list.push(tmp)
            }
//            list.forEach(item=>item.checked = false)
            this.orderList = list
          }else{
            this.$toast(res?res.message:'获取包裹列表失败')
          }
          this.$loading.show=false
        })
      },
      sureReceiveAjax(str){
        return this.getWithToken('/order-center/affirmReceived/packageReceived',{orderId:this.orderId,packageCount:this.orderList.length,packageNos:str}).then(res=>res)
      },
      sureReceive(){
        let arr = this.orderList.filter(item=>item.checked)
        let tmp = [];
        arr.forEach(item=>{
          for( var k in item ){
            if(k !== 'checked'){
              tmp.push(k)
            }
          }
        })
        if(!tmp.length){
          this.$toast('请选择收货包裹');
          return;
        }
        let str = tmp.join(',')
        this.$confirm('亲，请务必在收到货后，再确认收货，否则您可能钱货两空',()=>{
          this.sureReceiveAjax(str).then(res=>{
            if(res && res.code == 200){
//            this.getData().then();
              this.$toast(res.message)
              setTimeout(()=>{this.syJsbCloseAppPage(1)},1200)
            }else{
              this.$toast(res?res.message:'确认收货失败')
            }
          })
        })
      },
    },


  }
</script>

<style lang="scss" scoped>
.receive{
  /*position: relative;*/
  padding-bottom:.98rem;
  box-sizing: border-box;
  height:100%;
  .space{
    background: #FAFAFA;
    height:.2rem;
  }
  .r-top{
    padding-left:.3rem;
    height:.72rem;
    line-height: .72rem;
    background: #FAFAFA;
  }
  .r-con{
    padding-bottom:1rem;
    .r-list-con{
      .r-list{

        .r-left-img{
          width:.9rem;
          box-sizing: border-box;
          padding-left:.3rem;
          padding-top:.34rem;
          img{
            height:.36rem;
            width:.36rem;
          }
        }
        .r-right{
          .r-right-con{
            padding-top:.3rem;
            padding-bottom:.42rem;
          }

          .goods-img{
            width:1.4rem;
            height:.98rem;
            img{
              vertical-align: middle;
              width:100%;
              height:100%
            }
          }
          .goods-r{
            width:4.7rem;
            margin-left:.2rem;
            .goods-tit{
              .goods-decs{

              }
            }
            .goods-num{
              margin-top:.39rem;
            }

          }
        }
      }
    }
  }
  .r-btn{
    position: fixed;
    width:100%;
    height:.98rem;
    line-height: .98rem;
    left:0;
    bottom:0;
    text-align: center;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
  }
}
</style>
