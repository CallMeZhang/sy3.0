<template>
    <div class="container" v-title="title">
        <header-search  :key-word="''"></header-search>
        <section class="container_mid">
            <section class="sideBar">
                <ul>
                    <li :class="{active:nowIndex == index}"
                        v-for="(item,index) in catalogVO.catalogVOList"
                        @click.stop.prevent="getCurrentInfo(item.catalogId,index)"
                        :key="item.catalogId">
                        <span class="sideBar_item no-enter">{{item.name}}</span>
                    </li>
                </ul>
            </section>
            <section class="sideCont" v-if="show"  id="container">
                <aside class="cont_img" v-if="!!catalogVO.adImgUrl" @click="go(catalogVO.catalogVOList[nowIndex].adUrl)">
                    <img v-lazy.container="catalogVO.catalogVOList[nowIndex].adImgUrl + ossUrl('webp_240')">
                </aside>
                <section class="goods_classify" v-show="catalogVO.catalogVOList[nowIndex].goodsList && catalogVO.catalogVOList[nowIndex].goodsList.length != 0">
                    <h3 class="goods_classify_title">
                        <span class="mart_adjust">目录下商品</span>
                    </h3>
                    <ul class="goods_lists" data-type="2">
                        <li @click="appOpenMode('goodsDetail',{goodsId:item.goodsId,keyWord:''},1)"
                                     v-for="(item,index) in catalogVO.catalogVOList[nowIndex].goodsList"
                                     :key="item.goodsId"><!--目录下商品-->
                            <section class="goods_lists_pic">
                                <img v-lazy.container="item.imgUrl + ossUrl('webp_240')">
                            </section>
                            <p class="goods_lists_name">{{item.goodsName | cutStr(8,true)}}</p>
                        </li>
                    </ul>
                </section>
                <section class="goods_classify"
                         v-for="(item,index) in catalogVO.catalogVOList[nowIndex].catalogVOList"
                         :key="item.catalogId"
                         v-if="catalogVO.catalogVOList[nowIndex].catalogVOList[index].catalogVOList.length ||
                               catalogVO.catalogVOList[nowIndex].catalogVOList[index].goodsList.length"><!--二级目录-->
                    <h3 class="goods_classify_title">
                        <span class="mart_adjust">{{item.name | cutStr(8,false)}}</span>
                    </h3>
                    <aside class="cont_img" v-if="item.adImgUrl" @click="go(item.adUrl)">
                        <img v-lazy.container="item.adImgUrl + ossUrl('webp_240')">
                    </aside>
                    <ul class="goods_lists" data-type="2" v-if="item.goodsList.length">
                        <li @click="appOpenMode('goodsDetail',{goodsId:itemG.goodsId,keyWord:''},1)"
                            v-for="(itemG,indexG) in item.goodsList"
                            :key="itemG.goodsId"><!--二级目录下商品-->
                            <section class="goods_lists_pic">
                                <img v-lazy.container="itemG.imgUrl + ossUrl('webp_240')">
                            </section>
                            <p class="goods_lists_name">{{itemG.goodsName | cutStr(8,true)}}</p>
                        </li>
                    </ul>
                    <ul class="goods_lists" data-type="3"> <!--三级目录actGoodsLists-->
                        <li v-for="(childItem,indexC) in item.catalogVOList"
                            :key="childItem.catalogId"
                            @click="goList(childItem)">
                            <section class="goods_lists_pic">
                                <img v-lazy.container="childItem.catalogImgUrl + ossUrl('webp_240')">
                            </section>
                            <p class="goods_lists_name">{{childItem.name | cutStr(4,true)}}</p>
                        </li>
                    </ul>
                </section>
            </section>
            <div class="container_mid sideCont"  v-else>
                <div class="_empty">
                    <aside class="empty_icon"></aside>
                    <p class="empty_text">暂无商品</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import headerSearch from "@/components/common/header_search.vue"
    export default{
        data(){
            return{
                title:"目录列表",
                catalogId:this.$route.query.catalogId,
                target:this.$route.query.target,    //默认打开的目录ID
                nowIndex:0,                         //右侧显示的当前目录
                catalogVO:{
                    goodsList:[],
                    catalogVOList:[
                        {
                            catalogId:"id",
                            name:"",
                            active:false,
                            goodsList:[]
                        }
                    ]
                },
                isFirst:true,                   //是否第一次请求 第一次请求的是根目录
            }
        },
        watch:{
            nowIndex(n){
            },
        },
        methods:{
            ccc(){
                console.log(this.catalogVO.catalogVOList);
            },
            go(url){
                if (url) {
                    this.appOpen(url,{},true);
                }else{
                    console.log("路径不正确",url)
                }
            },
            goList(childItem){
              if(this.catalogId ===this.syHomeTownId){
//                this.appOpenMode('goodsList',{catalogId:this.catalogId,keyWord:'',come_form:'catalogList'},1)
                this.appOpenMode('goodsListC',{catalogId:childItem.catalogId,keyWord:'',come_form:'catalogList',catalogIdRoot:this.catalogId},1)
              }else{
                this.appOpenMode('actGoodsLists',{catalogId:childItem.catalogId,keyWord:''},1)
              }
            },
            getCurrentInfo(id,index){
                this.nowIndex = index;
                this.getCatalog(id);

//                console.log("id:" + id,"index:" + index);
//                this.catalogVO.catalogVOList.forEach((cur,i)=>{
//                    if (cur.catalogId === id) {
//                        cur.active = true
//                        //右侧视图更新
//                    }else{
//                        cur.active = false
//                    }
//                })
            },
            getCatalog(id,targetId){
//                this.$loading.show = true;
                var ind = this.nowIndex;
//                var url = "/ebgoods/catalog/" + id;
                var otherParams = targetId ? '?defaultCatalogId=' + targetId : "";
                var url = "/ebgoods/catalog/user/" + id + otherParams;
                this.get(url).then(res=>{
                    this.$loading.show = false;
                    if(res && res.code == 200){
                        if (this.isFirst) {
                            res.data.catalogVO.catalogVOList.forEach((cur,i)=>{
                              this.$set(cur,"active",false);
                            })
                            this.catalogVO = res.data.catalogVO;
                            this.isFirst = false;
                            this.goTarget();

                        }else{
                            this.catalogVO.catalogVOList.splice(ind,1,res.data.catalogVO);
                        }
                    }
                })
            },
            goTarget(){     //指定第几个目录是初始化打开状态
                var target = this.target;
//                console.log('target',target);
                if (target) {
                    var ar = this.catalogVO.catalogVOList;
                    for(var i = 0; i < ar.length; i++){
                        if (ar[i].catalogId == target) {
                            this.nowIndex = i;
//                            console.log('iii',i)
                            break;
                        }
                    }
                }else{
                    this.nowIndex = 0;
                }
            }
        },
        created(){
            this.getCatalog(this.catalogId,this.target);//catalogId:de44c092093444af9df2ad78d81728bf
        },
        mounted(){
//          this.$refs.sideCont.addEventListener('scroll',()=>{
//            var aImg = document.querySelectorAll('img');
//            var len = aImg.length;
//            var n = 0;//存储图片加载到的位置，避免每次都从第一张图片开始遍历
//              var seeHeight = document.documentElement.clientHeight;
//              var scrollTop = this.$refs.sideCont.scrollTop || document.documentElement.scrollTop;
//              console.log(seeHeight,scrollTop)
//              for (var i = n; i < len; i++) {
//                console.log(aImg[i].offsetTop < seeHeight + scrollTop)
//                if (aImg[i].offsetTop < seeHeight + scrollTop) {
//                  if (aImg[i].getAttribute('src') == '') {
//                    aImg[i].src = aImg[i].getAttribute('data-src');
//                  }
//                  n = i + 1;
////                  console.log('n = ' + n);
//                }
//              }
//            })
            this.$header.show = false;
        },
        components:{
            "header-search":headerSearch
        },
        filters:{
            cutStr(str,len=8,bEllipsis=true){  //字符串 判断截取长度(中文) 是否添加省略号…
//                console.log(len);
                if ( str.length > len) {
                    str = bEllipsis ? str.substring(0,len) + "…" : str.substring(0,len);
                }
                return str;
            }
        },
        computed:{
            show(){
//                var a = this.catalogVO.catalogVOList[this.nowIndex].catalogVOList;
//                var b = this.catalogVO.catalogVOList[this.nowIndex].goodsList;
//                if (a.length || b.length) {
//                    return true;
//                }
                return true;
            }
        }
    }
</script>

<style scoped>
    .container{
        width:100%;
        height:100%;
        font-family: PingFang SC, SF-UI Display, Source Han Sans, Roboto;
        overflow:hidden;
        display:-webkit-flex;
        display:flex;
        -webkit-flex-direction:column;
        flex-direction:column;
        color:#4b4b4b;
    }
    .container_mid{
        -webkit-flex-grow:2;
        flex-grow:2;
        display:-webkit-flex;
        display:flex;
        height:calc(100% - 44px);
        /*height:auto;*/
    }
    .sideBar{
        width:1.8rem;
        min-width:1.8rem;
        color:#555;
        overflow:auto;
        -webkit-overflow-scrolling: touch;
    }
    .sideCont{
        flex-grow:1;
        overflow-x:hidden;
        overflow-y:scroll;
        -webkit-overflow-scrolling: touch;
    }
    .sideBar li{
        height:1.02rem;
        width:100%;
        box-sizing:border-box;
        background-color:#FAFAFA;
        user-select:none;
        text-align:center;
        border-bottom:1px solid #fff;
        display:-webkit-flex;
        display:flex;
        align-items:center;
    }
    .sideBar li:before{
        content:"";
        display:inline-block;
        width:0.1rem;
        height:100%;
        background-image:none;
    }
    .sideBar li.active{
        background-color:#fff;
        color:#FF1919;
    }
    .sideBar li.active:before{
         background-image:linear-gradient(to bottom,#FF1919,#FF6533);
    }
    .sideBar_item{
        font:0.28rem/1.02rem PingFang SC, SF-UI Display, Source Han Sans, Roboto;
        flex-grow:1;
    }
    .cont_img{
        width:5.1rem;
        height:2rem;
        margin:0.3rem auto 0.42rem;
        font-size:0;
    }
    .cont_img img{
        width:100%;
        height:2rem;
    }
    .goods_classify_title{
        width:2.8rem;
        height:0.4rem;
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin:0 auto;
    }
    .goods_classify_title:before,.goods_classify_title:after{
        content:'';
        width:0.4rem;
        height:0.02rem;
        background-color:#d0d0d0;
    }
    .mart_adjust{
        margin-top: 0.02rem;
    }
    .goods_classify{
        padding-top:0.32rem;
    }
    .goods_classify .cont_img{
        /*margin:0.2rem auto 0.4rem;*/
        margin:0.2rem auto 0;
    }
    .goods_lists li{
        width:2.44rem;
        margin-right:0.22rem;
        float:left;
    }

    .goods_lists[data-type="2"] li:nth-child(even){
        margin-right:0;
    }
    .goods_lists{
        padding:0.4rem 0 0 0.3rem;
        overflow:auto;
    }
    .goods_lists_pic{
        height:1.75rem;
        box-sizing:border-box;
        /*border:#E3E3E3 1px solid;*/
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .goods_lists_pic img{
        width:100%;
        height:100%;
    }
    .goods_lists_name{
        font:0.22rem/1.5 "";
        padding:0.15rem 0 0.4rem;
        overflow:hidden;
        /*text-overflow:ellipsis;*/
        white-space:nowrap;
        text-align:center;
    }
    .goods_lists[data-type="3"]{
        padding:0.4rem 0 0 0.49rem;
    }
    .goods_lists[data-type="3"] li{
        width:1.16rem;
        margin-right:0.62rem;
    }
    .goods_lists[data-type="3"] li:nth-child(3n){
        margin-right:0;
    }
    .goods_lists[data-type="3"] .goods_lists_name{
        width:1.2rem;
    }
    .goods_lists[data-type="3"] .goods_lists_pic{
        height:1.24rem;
        border:none;
    }
    .goods_lists[data-type="3"] .goods_lists_pic img{
        height:100%;
    }
    .empty_text{
        font:0.28rem/1.5 $fa;
        text-align:center;
        color:#D0D0D0;
    }
    ._empty{
        /*background-color:#fafafa;*/
        height:4.18rem;
        padding-top:0.6rem;
        box-sizing:border-box;
        width:100%;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
    }
    .empty_icon{
        width: 2rem;
        height: 2rem;
        margin: 0 auto 0.33rem;
        background: url(/static/images/common/error.png) left top/cover no-repeat;
    }
    .container_mid{
        position:relative;
    }

</style>
