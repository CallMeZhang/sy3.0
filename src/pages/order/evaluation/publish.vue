<template>
    <section v-title="title" class="container">
        <section class="list border-top-1px border-bottom-1px" v-for="(item,index) in list">
            <ul class="info-goods">
                <li class="goods-item border-bottom-1px">
                    <aside class="goods-pic" @click="ccc">
                        <!--<img :src="item.goodsImage" :alt="item.goodsName">-->
                        <img v-img-cover="item.goodsImage + ossUrl('webp_240')" :src="item.goodsImage + ossUrl('webp_240')">
                    </aside>
                    <div class="goods-info">
                        <h3 class="h3 no-enter">{{item.goodsName}}</h3>
                        <h4 class="h4 no-enter">{{item.specUnit}}</h4>
                    </div>
                </li>
            </ul>
            <section class="operater">
                <div class="row border-bottom-1px">
                    <span class="title">描述相符</span>
                    <div class="score">
                        <span   v-for="(itemC,indexC) in 5"
                                :class="{item:true,true:itemC <= item.score}"
                                @click="setScore('list',index,itemC)"></span>
                    </div>
                </div>
                <div class="row row2 border-bottom-1px">
                    <span class="title">发表评价</span>
                    <div class="text-box">
                        <textarea rows="6" maxlength="140" v-model='item.text' class="textarea" placeholder="发表您的帮扶感受，超过10个字将获得20积分哦"></textarea>
                        <aside class="textarea-tip">{{item.text.length}}/140</aside>
                    </div>
                </div>
                <div class="column">
                    <div class="title">上传照片</div>
                    <upload-img :maxLength="maxLength" :sign="index" :imgList="item.picImgList"></upload-img>
                </div>
            </section>
        </section>
        <section class="bot border-bottom-1px border-top-1px">
            <div class="row padl30 border-bottom-1px">
                <span class="title bold">店铺评价</span>
                <div class="score">贫困地区经营不易，满意请给5星哦</div>
            </div>
            <div class="padl30">
                <div class="row border-bottom-1px" v-for="(item,index) in storeEvaluation">
                    <span class="title">{{item.type}}</span>
                    <div class="score">
                        <span   v-for="(itemC,indexC) in 5"
                                :class="{item:true,true:itemC <= item.score}"
                                @click="setScore('storeEvaluation',index,itemC)"></span>
                    </div>
                </div>
            </div>
        </section>
        <section class="bot-tip" v-if="list.length">
            © 17shuanyuan.com
        </section>
        <section class="fix-btn-box iphone10-footer-padding g-fff">
            <section class="fix-btn border-top-1px iphone10-footer-padding">
                <div class="fix-btn-left">
                    <input id="a" type="checkbox" v-model="anonymous" class="input_checkbox">
                    <label for="a" class="list_one_checkbox"></label>
                    <label for="a">匿名评价</label>
                </div>
                <div class="button-linear" @click="publish()">发表评价</div>
            </section>
        </section>


    </section>
</template>

<script type="text/ecmascript-6">
    import uploadImg from "@/components/common/uploadImg.vue"
    import Bus from "@/modules/bus/bus.js"
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    export default{
        data(){
            return{
                token:"",
                orderId:this.$route.query.orderId,
                orderCode:this.$route.query.orderCode,
                title:"发表评价",
                text:"",
                anonymous:false,//匿名提交
                isUpLoaded:true,  //当前的上传任务是否已经完成
                list:[],
                fileIndex:-1,               //当前点击的上传序号（第几个上传组件）
                maxLength:3,                //最大上传数
                storeEvaluation:[           //店铺评价
                    {
                        type:'物流服务',
                        score:0
                    },{
                        type:'服务态度',
                        score:0
                    }
                ],
            }
        },
        methods:{
            getData(){
                var url = "/order-center/evaluate/evaluateGoodsList";
                this.getWithToken(url,{orderId:this.orderId}).then(res=>{
                  this.$loading.show=false
                    if (res && res.code == 200) {
                        var list  =  res.data.evalGoods;
                        list.forEach((cur,i)=>{
                            cur.text = "";
                            cur.score = 5;
                            cur.picImgList = [];
                        })
                        this.list = list;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            ccc(){

            },
            installData(){                      //组装数据
                var aResult = [];
                var noLessThenOneText = false;  //验证最少有一条评价
                var wuliuScore  = this.storeEvaluation[0].score;
                var fuwuScore   = this.storeEvaluation[1].score;
                for(var i = 0; i < this.list.length; i++){
                    var a       = this.list[i];
                    var text    = a.text;
                    var picImgList = a.picImgList;
                    if (text.trim()) {
                        noLessThenOneText = true;
                    }
                    var o = {
                        "orderId":a.orderId,
                        "orderCode":this.orderCode,
                        "skuId":a.skuId,
                        "goodsId":a.goodsId,
                        "goodsImg":a.goodsImage,
                        "goodsName":a.goodsName,
                        "evalLevel":a.score,
                        "evalDesc":text,
                        "evalImgs":picImgList,
                        "storeLogisticsLevel":wuliuScore,
                        "storeServiceLevel":fuwuScore,
                        "isAnonymous": this.anonymous ? 1 : 0,
                        "storeId":a.storeId,
                        "specUnit":a.specUnit
                    };
                    aResult.push(o);
                };

                if (!noLessThenOneText) {
                    this.$toast('请填写至少一个商品的内容');
                    return false;
                }
                if (wuliuScore == 0 ) {
                    this.$toast('请选择物流服务');
                    return false;
                }
                if (fuwuScore == 0 ) {
                    this.$toast('请选择服务态度');
                    return false;
                }
                return aResult;
            },
            publish(){
                var aResult = this.installData();
                if (aResult) {
                    var url = "/order-center/evaluate/evaluate";
                    this.postWithToken(url,{evalJSONData:JSON.stringify(aResult)}).then(res=>{
                        if (res && res.code == 200) {
                          this.appNotify({callback:'consumRecordRefresh'})
                           this.appOpen("evaluationResult",{isAddPoints:res.data.isAddPoints});
                        }else{
                            this.$toast(res.message)
                        }
                    })
                }
            },
            setScore(type,index,number){
//                number += 1;
                console.log(index,number)
                this[type][index].score = number;
            },
        },
        filters:{

        },
        created(){
            this.getData();
            Bus.$on("addImg",(sign)=>{
                console.log('sign',sign)
                if (this.isUpLoaded) {
                    this.isUpLoaded = false;
                    this.fileIndex = sign;
                    var url = "/order-center/oss/buildOSSFolder";
                    var buildFolderData = {
                        "folderType":'evaluate',
                        "storeId":this.list[sign].storeId,
                        "skuId":this.list[sign].skuId
                    }
                    this.postWithToken(url,{folderType:'evaluate',buildFolderData:JSON.stringify(buildFolderData)}).then(res=>{
                        if (res.code == 200) {
                            var amount = this.maxLength - this.list[this.fileIndex].picImgList.length;//当前可上传数量
                            console.log('还可上传',amount);
                            if (amount) {
                                this.syJsbUploadFile(JSON.stringify({
                                    id:"pic",
                                    rateX:1,
                                    rateY:1,
                                    token:this.token,
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
                this.list[this.fileIndex].picImgList = this.list[this.fileIndex].picImgList.concat(a.images);
            }
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
            this.$header.setTitle(this.title);
        },
        components:{
            uploadImg
        },

    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .fix-btn-box{
        height:0.96rem;
    }
    .fix-btn{
        width:100%;
        position:fixed;
        left:0;
        bottom:0;
        height:0.98rem;
        display:flex;
        justify-content:space-between;
        align-items:center;
        z-index:4;
        background-color:#fff;
        .fix-btn-left{
            display:flex;
            align-items:center;
            flex-grow:1;
            height:100%;
            padding-left:.3rem;
        }
        .button-linear{
            width:4rem;
            flex:0 0 auto;
        }
    }
    .input_checkbox:checked + .list_one_checkbox{
        background-image: url(/static/images/applyRefund/choose.png);
    }
    .list_one_checkbox{
        width: 0.44rem;
        min-width:0.44rem;
        height: 0.44rem;
        margin-right:0.2rem;
        background: url(/static/images/applyRefund/nochoose.png) center center/0.36rem 0.36rem no-repeat;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
    }
    .bot{
        background-color:#fff;
        color:$c2E;
    }
    .bold{
        font-weight:bold;
    }
    .padl30{
        padding-left:0.3rem;
    }
    .container{
        background-color:#fafafa;
    }
    .column{
        .title{
            line-height:0.88rem;
        }
    }
    .list:first-child:before{
        display:none;
    }
    .row{
        height:0.88rem;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .title{
            width:1.5rem;
            line-height:0.88rem;
        }
        .score{
            flex-grow:1;
            display:flex;
            align-items:center;
        }
        .item{
            width:0.44rem;
            height:0.44rem;
            margin-right:0.3rem;
            background:url(/static/images/common/starNo.png) center center/cover no-repeat;
        }
        .true{
            background-image:url(/static/images/common/star.png);
        }
    }
    .row2{
        align-items:flex-start;
        justify-content:flex-start;
        height:auto;
        .textarea{
            width:5.4rem;
            margin-top:0.21rem;
            resize:none;
            font:0.3rem/0.46rem $fa;
        }
        .textarea-tip{
            /*position:absolute;*/
            /*right:0;*/
            /*bottom:0;*/
            text-align:right;
            font:0.3rem/0.46rem $fa;
            color:#D0D0D0;
            padding-bottom:0.13rem;
        }
        .text-box{
            position:relative;
            font:0/0 '';
        }
    }
    .operater{
        padding-left:0.3rem;
    }
    .list{
        background-color:#fff;
        font:0.3rem/0.42rem $fa;
        color:$c2E;
        margin-bottom:0.2rem;
    }
    .info-goods li{
        height:100%;
        display:flex;
        padding:0.3rem;

    }
    .info-goods li + li{
        padding-top:0rem;

    }
    .other{
        color:$c4B;
        text-align:center;
        font:300 0.26rem/0.37rem $fa;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        /*background-color:red;*/
        width:1.7rem;
        background:url(/static/images/common/arrow.png) right center/0.13rem 0.22rem no-repeat;
    }
    .goods-item{
        display:flex;
        flex:0 0 auto;
    }
    .goods-info{
        width:5.2rem;
        padding-left:0.3rem;
        flex:0 0 auto;
        .h3{
            color:$c4B;
            font:0.28rem/0.4rem $fa;
            margin-bottom:0.07rem;
        }
        .h4{
            color:#949494;
            font:0.24rem/0.33rem $fa;
        }
    }
    .goods-pic{
        width:1.4rem;
        min-width:1.4rem;
        height:0.98rem;
        img{
            height:100%;
        }
    }
    .bot-tip{
        padding:0.33rem 0.3rem 0.45rem;
        color:#E3E3E3;
        font:300 0.24rem/0.33rem $fa;
        text-align:center;
    }

</style>
