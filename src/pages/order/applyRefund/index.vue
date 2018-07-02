<template>
    <div class="container container_top g-order" v-title="title">
        <section  class="container_mid">
            <aside class="tip border-bottom-1px" v-if="!(info.isRefundAtOnce || info.isRefundAll)">本订单包含多个包裹，请选择要退款商品和数量：</aside>
            <ul class="list_group border-bottom-1px" v-for="(item,index) in info.refundPackageVos" :key="item.epId">
                <li class="list_one border-bottom-1px" v-for="(childItem,childIndex) in item.packageGoods" :key="childItem.pgId">
                    <div style="width:0.64rem;">
                      <input type="checkbox" :id="'id-' + childItem.pgId" class="input_checkbox" v-model="childItem.checked">
                      <label :for="'id-' + childItem.pgId" class="list_one_checkbox" v-if="!(info.isRefundAtOnce || info.isRefundAll)"></label>
                    </div>
                    <aside :class="{list_one_pic:true,youpin:childItem.isBestGoods}">
                        <img v-img-cover="childItem.goodsImg + ossUrl('webp_240')" :src="childItem.goodsImg + ossUrl('webp_240')">
                    </aside>
                    <section class="list_one_info">
                        <h3 :class="{h3:true,yushou:childItem.isPresell}">{{childItem.goodsName}}</h3>
                        <h4 class="h4">{{childItem.specUnit}}</h4>
                        <aside class="list_one_bot">
                            <span class="amount" v-show="!childItem.checked">数量：× {{childItem.goodsNum}}</span>
                            <div class="list_one_operate" v-show="childItem.checked">
                                <span class="reduce" @click="changeNum(index,childIndex,'-')"></span>
                                <span class="count-view">{{childItem.refundNum}}</span>
                                <span class="add" @click="changeNum(index,childIndex,'+')"></span>
                            </div>
                            <span class="totle_tip" v-if="childItem.refundNum >= childItem.goodsNum && childItem.checked">产品数量已达上限</span>
                        </aside>
                    </section>
                </li>
            </ul>
        </section>
        <section class="container_bot iphone10-footer-padding g-fff">
            <section class="container_bot_inner border-top-1px iphone10-footer-padding g-gray">
                <div class="bot_text">
                    <span class="text">合计：</span>共<span class="num">{{totalChooseAmout}}</span>件
                </div>
                <div class="button-linear" @click="next">下一步</div>
            </section>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import headerC from "@/components/common/g-header.vue"
    var timer = null;
    export default{
        data(){
            return {
                orderId:this.$route.query.orderId,
                title:"申请退款",
                bAllCheck:true,
                totalChooseAmout:0,

                info:{
                    isRefundAtOnce:true,    //急速退款 ture :是(整单退，不能自由选取数量)  false :否
                    isRefundAll:true,       //整单退款 ture :是(整单退，不能自由选取数量)  false :否
                    refundPackageVos:[
                        {
                            packageGoods:[]
                        }
                    ]
                },
            }
        },
        methods:{
            ccc(){
//                this.info.refundPackageVos[0].packageGoods[0].goodsNum = 10;
                this.info.isRefundAtOnce = true;
            },
            next(){
                if (this.info.isRefundAtOnce || this.info.isRefundAll) { //整单退
                    var json =  JSON.stringify(this.info);
                    window.localStorage.setItem("ORDER-applyRefundList",json);
//                    setTimeout(()=>{
                        this.appOpen('applyRefundReason',{orderId:this.orderId});
//                    },500)
                }else{
                    var s = JSON.stringify(this.info.refundPackageVos);
                    var a = JSON.parse(s);

                    for(var i = a.length - 1; i >= 0; i--){
                        var n = 0;
                        for(var j = a[i].packageGoods.length - 1; j >= 0; j--){
                            if (a[i].packageGoods[j].checked) {
                                ++n;
                            }else{
                                a[i].packageGoods.splice(j,1);
                            }
                        }
                        if (n==0) {
                            a.splice(i,1);
                            console.log(456)
                        }
                    }

                    if(a.length == 0){
                        this.$toast("请勾选需要退款的商品");
                        return;
                    }
                    var json = {
                        isRefundAtOnce:this.info.isRefundAtOnce,
                        isRefundAll:this.info.isRefundAll,
                        orderStatus:this.info.orderStatus,
                        refundPackageVos:a,
                    };
                    window.localStorage.setItem("ORDER-applyRefundList",JSON.stringify(json));

                    if (!timer) {
                        timer = setTimeout(()=>{
                            timer = null;
                            this.appOpen('applyRefundReason',{orderId:this.orderId});
                        },700)
                    }
                }
            },
            headerBtn(con){     //更新头部状态
                this.$header.rightFn({
                    type:'text',
                    rightText:con.toString(),
                    imgUrl:'',
                    callback:()=>{
                        this.allCheck();
                    }
                })
            },
            allCheck(){                             //全选
                for(let i = 0; i < this.info.refundPackageVos.length; i++){
                    for(let j = 0; j < this.info.refundPackageVos[i].packageGoods.length; j++){
                        if (this.bAllCheck) {
                            this.info.refundPackageVos[i].packageGoods[j].checked = true;
                        }else{
                            this.info.refundPackageVos[i].packageGoods[j].checked = false;
                        }
                    }
                }
                this.bAllCheck = !this.bAllCheck;
            },
            changeNum(index,childIndex,operator){       //加减数量
                var operateData = parseInt(this.info.refundPackageVos[index].packageGoods[childIndex].refundNum);
                var totalData   = parseInt(this.info.refundPackageVos[index].packageGoods[childIndex].goodsNum);
                var resultData  = eval(operateData + operator + 1);
                if (resultData <= totalData && resultData>=1) {
                    this.info.refundPackageVos[index].packageGoods[childIndex].refundNum = resultData;
                }
                return;
            },
            getrefundPackageList(){     //获取
                let url = "/order-center/refund/refundPackageList";
                this.getWithToken(url,{orderId:this.orderId}).then(res=>{
                  this.$loading.show=false
                  if (res && res.code == 200) {

                      var total = 0;//计算一下商品总数
                      res.data.refundPackageVos.forEach((cur,index)=>{

                          cur.packageGoods.forEach((curC,indexC)=>{
                              curC.checked    = false;
                              curC.refundNum  = curC.goodsNum;
                              total += curC.goodsNum;

                              curC.picImgList = [];    //下个页面要用
                              curC.describe   = "";    //下个页面要用
                              curC.reason     = "";    //下个页面要用
                              curC.rrId       = "";    //下个页面要用
                          })
                      })
//                      console.log(res.data.refundPackageVos.length);
                      if (res.data.refundPackageVos.length == 1 && !(res.data.isRefundAtOnce || res.data.isRefundAll)) {      //只有一个商品默认选中
                          if (res.data.refundPackageVos[0].packageGoods.length == 1) {
                              res.data.refundPackageVos[0].packageGoods[0].checked = true;
                          }
                      }

                      if (res.data.isRefundAtOnce || res.data.isRefundAll) {//整单退款不用出现全选按钮
                          this.totalChooseAmout = total;
                      }else{
                          this.headerBtn("全选");
                      }

                      this.info = res.data;
                  }else{
                      this.$toast(res.message)
                  }
                })
            },
        },
        watch:{
            'info':{
                handler(){
                    if ( !(this.info.isRefundAtOnce || this.info.isRefundAll) ) {
                        let length = 0;
                        let checkLength = 0;
                        let totalChooseAmout = 0;
                        for(let i = 0; i < this.info.refundPackageVos.length; i++){
                            for(let j = 0; j < this.info.refundPackageVos[i].packageGoods.length; j++){
                                length++;
                                if (this.info.refundPackageVos[i].packageGoods[j].checked) {
                                    checkLength++;
                                    totalChooseAmout += this.info.refundPackageVos[i].packageGoods[j].refundNum;
                                }
                            }
                        }
                        length == checkLength ? this.bAllCheck = false : this.bAllCheck = true;
                        this.totalChooseAmout = totalChooseAmout;
                    }
                    console.log('别动我，我是info')
                },
                deep:true
            },
            bAllCheck(){
                this.bAllCheck ? this.headerBtn("全选") : this.headerBtn("取消全选");
            }
        },
        created(){
            this.getrefundPackageList();
        },
        mounted(){
          this.$header.setTitle('申请退款');
          var that =this
          this.$header.rightFn({
            type:'img',
            url:require('../../../../static/images/mine/service.png'),
            callback:function () {
              that.m7Chat()
            }
          })
        },
        components:{
            headerC
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .container_mid{
        background-color:#FAFAFA;
    }
    .container_bot{
        height:0.98rem;
    }
    .container_bot_inner{
        position:fixed;
        width:100%;
        height:0.98rem;
        /*border-top:1px solid rgba(0,0,0,0.15);*/
        left:0;
        bottom:0;
        z-index:12;
        background:url("/static/images/applyRefund/maoboli_bot@2x.png") left top/contain no-repeat;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    .bot_text{
        padding-left:0.3rem;
        color:#2e2e2e;
        font:0.24rem/0.42rem "";
    }
    .bot_text .text{
        font:0.3rem/0.42rem "";
    }
    .bot_text .num{
        font:bold 0.3rem/0.42rem "";
        color:#FF1919;
    }
    .list_one_checkbox{ /*扩大点击区域*/
        margin:0!important;
        padding:0.27rem 6rem 0.27rem 0!important;
        position: absolute !important;
        background-position:left center!important;
    }
    .list_one_operate{
        min-width:1.78rem;
    }
</style>
