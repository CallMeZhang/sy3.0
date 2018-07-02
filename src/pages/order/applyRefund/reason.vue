<template>
    <div class="container g-order" v-title="title">
        <section class="container_mid">
            <aside class="tip" v-if="info.orderStatus != 20">您的货物已寄出，此时退款会为卖家带来额外的损失，若仍要退款，请填下以下信息：</aside>
            <section class="form_lists border-top-1px border-bottom-1px" v-for="(item,index) in list" :key="item.pgId">
                <ul class="list_group border-top-1px border-bottom-1px">
                    <li class="list_one border-bottom-1px">
                        <aside :class="{list_one_pic:true,youpin:item.isBestGoods}">
                            <!--<img :src="item.goodsImg + ossUrl('webp_240')">-->
                            <img v-img-cover="item.goodsImg + ossUrl('webp_240')" :src="item.goodsImg + ossUrl('webp_240')">
                        </aside>
                        <section class="list_one_info">
                            <h3 :class="{h3:true,yushou:item.isPresell}">{{item.goodsName}}</h3>
                            <h4 class="h4">{{item.specUnit}}</h4>
                            <aside class="list_one_bot">
                                <span class="amount">数量：× {{item.refundNum}}</span>
                            </aside>
                        </section>
                    </li>
                </ul>
                <section class="reason_form">
                    <div class="reason_form_item border-bottom-1px" @click="reasonShow(index)">
                        <h5 class="item_title">退款原因</h5>
                        <aside class="select">
                            <span :class="{gray:item.reason == ''}">{{item.reason || "请选择"}}</span>
                        </aside>
                    </div>
                    <div class="reason_form_item border-bottom-1px">
                        <h5 class="item_title">退款描述</h5>
                        <input class="item_right no-enter" type="text" placeholder="请至少填写10个字" v-model="item.describe">
                    </div>
                    <div class="reason_form_item column border-bottom-1px">
                        <div class="flex-row column_top">
                            <h5 class="item_title">上传凭证</h5>
                            <h5 class="item_title gray">(最多9张)</h5>
                        </div>
                        <upload-img :maxLength="maxLength" :sign="index" :imgList="item.picImgList"></upload-img>
                    </div>
                </section>
            </section>
        </section>

        <section class="container_bot iphone10-footer-padding g-fff">
            <section class="container_bot_inner iphone10-footer-padding g-gray">
                <section class="orange-linear" @click="submit">提交</section><!--disabled-->
            </section>
        </section>

        <transition name="fade2">
            <aside class="shadow" @click="reasonHide" v-show="show"></aside>
        </transition>
        <transition name="slideTop">
            <section class="sToTop-box" v-show="show">
                <div class="sToTop-box-close" @click="reasonHide"></div>
                <div class="sToTop-box-title">请选择退款原因</div>
                <ul class="sToTop-box-list border-top-1px">
                    <li class="sToTop-box-item border-bottom-1px" v-for="(item,index) in reasonArr" :key="item.rrId">
                        <label :for="'reason_' + item.rrId" class="sToTop-item-text no-enter">{{item.reasonDesc}}</label>
                        <input :id="'reason_' + item.rrId" type="radio" name="reason" :value="index" class="input_radio" v-model="chooseReason">
                        <label :for="'reason_' + item.rrId" class="list_one_radio"></label>
                    </li>
                </ul>
                <section class="sToTop-button" @click="confirmReason()">确定</section>
            </section>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import uploadImg from "@/components/common/uploadImg.vue"
    import Bus from "@/modules/bus/bus.js"
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    }
    export default{
        data(){
            return {
                token:getCookie('token'),
                orderId:this.$route.query.orderId,
                title:"申请退款",
                info:JSON.parse(window.localStorage.getItem("ORDER-applyRefundList")),//格式和上一个页面一样
                list:[],//info拆分成单个商品
                reasonArr:[
                    {},
                ],
                chooseReason:"",//选择的序号
                show:false,
                promise:null,
                fileIndex:-1,    //当前点击的上传序号（第几个上传组件）
                maxLength:9,     //最大上传数
                isUpLoaded:true,  //当前的上传任务是否已经完成
                canClick:true,      //提交按钮是否可以点击
            }
        },
        methods:{
            submit(){
                var b = true;
                var aResult = [];
                this.list.forEach((cur,index)=>{
                    var goodsCount  = cur.goodsNum;
                    var goodsPoints = cur.goodsPoints;
                    var goodsPrice  = cur.goodsPrice;
                    var packageId   = cur.packageId;
                    var refundCount = cur.refundNum;
                    var refundDesc  = cur.describe;                          //退款说明

                    var refundImgUrl = cur.picImgList.join(",");
                    console.log(refundImgUrl)
//上传的图片
                    if (!refundImgUrl) {
                        this.$toast('请上传凭证');
                        b = false;
                    }
                    if (refundDesc.trim().length < 10) {
                        console.log(this.orderId)
                        this.$toast('请至少填写10个字');
                        b = false;
                    }
                    var refundReasonId = cur.rrId;
                    if (!refundReasonId) {
                        this.$toast('请选择退款原因');
                        b = false;
                    }
                    var shippingNo  = cur.shippingNo;
                    var skuId       = cur.skuId;
                    var specUnit    = cur.specUnit;
                    var goodsName   = cur.goodsName;
                    var goodsImg    = cur.goodsImg;
                    aResult.push({
                        "goodsCount": goodsCount,
                        "goodsPoints": goodsPoints,
                        "goodsPrice": goodsPrice,
                        "packageId": packageId,
                        "refundCount": refundCount,
                        "refundDesc": refundDesc,
                        "refundImgUrl": refundImgUrl,
                        "refundReasonId": refundReasonId,
                        "shippingNo": shippingNo,
                        "skuId": skuId,
                        "specUnit": specUnit,
                        "goodsName":goodsName,
                        "goodsImg":goodsImg
                    });
                });
                if (b) {
                    if (this.canClick) {
                        this.canClick = false;
                        var obj = {
                            goodsJSONData:JSON.stringify(aResult),
                            isRefundAtOnce:this.info.isRefundAtOnce,
                            orderId:this.orderId
                        }
                        let url = "/order-center/refund/applyRefund"
                        this.postWithToken(url,obj).then(res =>{
                            this.canClick = true;
                            if (res && res.code == 200) {
//                            this.$toast(res.message);
                                if (res.data.applyFlag) {
                                    this.appNotify({callback:'mineRefresh'});   //刷新tab页面
                                    this.appOpen("applyRefundDetails",{orderId:this.orderId,disableReturn:1});
                                }
                            }else{
                                this.$toast(res.message);
                            }
                        })
                    }
                }
            },
            getReasonList(){    //获取原因列表
                var url = "/order-center/refund/refundReasonList";
                this.getWithToken(url,{}).then(res=>{
                  this.$loading.show=false
                  if ( res && res.code == 200) {
                     this.reasonArr = res.data.refundReasonList;
                  }
                },err=>{

                })
            },
            reasonShow(index){
                var rrId = this.list[index].rrId;   //当前已经选取的rrId
                if (rrId) {     //选过的回显
                    for(var i = 0; i < this.reasonArr.length; i++){
                        var obj = this.reasonArr[i];
                        if (obj.rrId == rrId) {
                            this.chooseReason = i;
                            break;
                        }
                    }
                }else{
                    this.chooseReason = "";
                }
                this.show = true;
                this.promise = new Promise(function(resolve,reject){
                    if (true) {
                        resolve(index)
                    }else{
                        reject(index)
                    }
                })
            },
            confirmReason(){
                this.promise.then((res)=>{
                    this.list[res].reason = this.reasonArr[this.chooseReason].reasonDesc;
                    this.list[res].rrId = this.reasonArr[this.chooseReason].rrId;
                },(err)=>{
                    console.log(err)
                })
                this.show = false;
            },
            reasonHide(){
                this.show = false;
                this.promise = null;
            },
            dataInit(){
//                console.log(this.info);
                var res = [];
                var aOriginData = this.info.refundPackageVos;
                console.log("data",aOriginData);
                aOriginData.forEach((cur,index)=>{
                    var epId            = cur.epId;
                    var goodsNum        = cur.goodsNum;
                    var orderId         = cur.orderId;
                    var packageNo       = cur.packageNo;
                    var packageStatus   = cur.packageStatus;
                    var refundStatus    = cur.refundStatus;
                    var shippingNo      = cur.shippingNo;
                    var urgeNum         = cur.urgeNum;
                    cur.packageGoods.forEach((curC,indexC)=>{
                        var o = {
                            epId,
                            goodsNum,
                            orderId,
                            packageNo,
                            packageStatus,
                            refundStatus,
                            shippingNo,
                            urgeNum,
                            createdAt:curC.createdAt,
                            describe:curC.describe,
                            goodsImg:curC.goodsImg,
                            goodsName:curC.goodsName,
                            goodsNum:curC.goodsNum,
                            goodsPoints:curC.goodsPoints,
                            goodsPrice:curC.goodsPrice,
                            isBestGoods:curC.isBestGoods,
                            isDelete:curC.isDelete,
                            isPresell:curC.isPresell,
                            packageId:curC.packageId,
                            pgId:curC.pgId,
                            picImgList:curC.picImgList,
                            reason:curC.reason,
                            refundFee:curC.refundFee,
                            refundNum:curC.refundNum,
                            refundStatus:curC.refundStatus,
                            rrId:curC.rrId,
                            skuId:curC.skuId,
                            specUnit:curC.specUnit,
                            storeId:curC.storeId,
                            updatedAt:curC.updatedAt
                        }
                        res.push(o);
                    })
                })
                this.list = res;
                console.log(this.list)
            },
            open(){
                this.appOpen('applyRefundList')
            }
        },
        created(){
            this.getReasonList();

            Bus.$on("addImg",(sign)=>{
                console.log('sign',sign)
                if (this.isUpLoaded) {
                    this.isUpLoaded = false;
                    this.fileIndex = sign;
                    var url = "/order-center/oss/buildOSSFolder";
                    var buildFolderData = {
                        "folderType":'refund',
                        "storeId":this.list[sign].storeId,
                        "skuId":this.list[sign].skuId
                    }
                    this.postWithToken(url,{folderType:'refund',buildFolderData:JSON.stringify(buildFolderData)}).then(res=>{
                        if (res.code == 200) {
                            var amount = this.maxLength - this.list[this.fileIndex].picImgList.length;//当前可上传数量
                            console.log('还可上传',amount);
                            if (amount) {
                                this.syJsbUploadFile(JSON.stringify({
                                    id:"pic",
                                    rateX:1,
                                    rateY:1,
                                    token:this.token,
//                                    uploadType:'refund/b1f0acb778ff46b49f2b6e0ca9d8ffe6/a000rABAAC',
                                    uploadType:res.data.folder,
                                    pNum:amount
                                }))

                            }else{
                                this.$toast('上传数量最多为' + this.maxLength + '张');
                                this.isUpLoaded = true;
                            }
                        }else{
                            this.$toast(res.message);
                            this.isUpLoaded = true;
                        }
                    },res=>{
                        this.$toast("获取上传目录失败，请重试");
                        this.isUpLoaded = true;
                    })
                }else{
                    console.log("上传任务进行中，请稍等");
                }
            })

            window.setImageByUrl = (a) =>{  //上传原生回调方法
                this.isUpLoaded = true;
                if (typeof a == "string") {
                    a = JSON.parse(a)
                }
                console.log(a);
                this.list[this.fileIndex].picImgList = this.list[this.fileIndex].picImgList.concat(a.images);
            }
//
            setInterval(()=>{
                this.isUpLoaded = true;
            },2500)

            this.syJsbGetAppInfo((res)=>{   //接收token
                if (typeof res == 'string') {
                    res = JSON.parse(res);
                }
                this.token = res.token;
            })

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

            this.dataInit();
//            console.log(this.info)
        },

        components:{
            uploadImg
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .container_top{
      position: absolute;
      top: 44px;
    }
    .container_mid{
        background-color:#FAFAFA;
    }
    .reason_form{
        padding-left:0.3rem;
        color:#4B4B4B;
        font:0.3rem/0.88rem $fa;
    }
    .reason_form_item{
        /*border-bottom: 1px solid #E3E3E3;*/
        height:0.88rem;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    .item_title{
        width:1.5rem;
        min-width:1.5rem;
    }
    .select{
        display:flex;
        align-items:center;
        height:0.88rem;
        user-select:none;
    }
    .select span{
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
        max-width:5rem;
    }
    .select:after{
        content:'';
        width:0.44rem;
        height:0.44rem;
        background:url(/static/images/applyRefund/toRight.png) center center /0.44rem 0.44rem no-repeat;
        margin:0 0.15rem 0 0.03rem;
    }
    .item_right{
        flex-grow:1;
        background:transparent;
    }
    .item_right[type=text]{
        color:#4B4B4B;
        font:0.3rem/1.5 $fa;
        padding-right:0.3rem;
    }
    .gray{
        color:#D0D0D0;
    }
    .reason_form_item.column{
        flex-direction:column;
        height:auto;
        /*justify-content:flex-start;*/
    }
    .column_top{
        width:100%;
    }
    .reason_form_item:last-child{
        border-bottom:none;
    }
    .form_lists{
        background-color:#fff;
        /*border-bottom:0.02rem solid #D0D0D0;*/
    }
    .form_lists + .form_lists{
        margin-top: 0.2rem;
    }
    .container_bot{
        height: 4.98rem;
    }
    .container_bot_inner{
        font:0.3rem/0.98rem $fa;
        color:#fff;
        text-align:center;

        position:fixed;
        width:100%;
        height:0.98rem;
        left:0;
        bottom:0;
        z-index:12;
    }
    .container_bot_inner.disabled{
        background-image:linear-gradient(to right,#E3E3E3,#F0F0F0);
    }
    .slideTop-enter-active, .slideTop-leave-active {
        transition:all 0.5s ease-in-out;
        transform:translate(0,0);
    }
    .slideTop-enter, .slideTop-leave-to{
        transform:translate(0,7.9rem);
    }
    .border-bottom-1px{
        z-index:1;
    }
    .form_lists:first-child .list_group:before{
        display:none;
    }
    /*选择菜单end*/
</style>
