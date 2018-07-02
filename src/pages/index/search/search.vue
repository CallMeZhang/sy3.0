<template>
    <div class="container" v-title="title">
        <div class="container-box header-paddingTop">
            <section class="container_top with-cancel border-bottom-1px iphone10-paddingTop">
                <form class="search" action="#" onsubmit="return false">
                    <span class="search_icon"></span>
                    <input type="search" class="search_input needsclick" :placeholder="hotWord.default.con" v-model="input" @keyup.13="enterSearch(1)">
                </form>
                <aside class="cancel" @click="closePage">取消</aside><!--返回上一页-->
            </section>
        </div>

        <section class="container_mid" v-if="input.length == 0">
            <section class="lists_area" v-if="hotWord.list.length != 0">
                <section class="lists_title">
                    <span class="lists_title_t" @click="ccc">热搜</span>
                </section>
                <section class="lists_items">
                    <ul class="ul-flex">
                        <li v-for="(item,index) in hotWord.list"
                            :class="{item:true,active:item.isHighlight == 1}"
                            :style="'order:' + item.idx"
                            @click="keyWordSearch('hot',index)"
                        >
                        {{item.content}}
                        </li>
                    </ul>
                </section>
            </section>
            <section class="lists_area" v-if="historyRecord.length != 0">
                <section class="lists_title">
                    <span class="lists_title_t">搜索历史</span>
                    <section class="lists_title_clear" @click="clearHistory">
                        <span class="clear_icon"></span>
                        <span>清空历史</span>
                    </section>
                </section>
                <section class="lists_items">
                    <ul class="ul-flex">
                        <li class="item" v-for="(item,index) in historyRecord" @click="keyWordSearch('history',index)">
                            {{ item.plate | plateChangeIntoName }}“{{item.content}}”
                        </li>
                    </ul>
                </section>
            </section>
        </section>
        <section class="container_mid" v-else>
            <ul class="container_mid_tip">
                <li style="color:#FF1919" @click="enterSearch(1)">在故乡特产中搜索“{{input}}”</li>
                <!--<li @click="enterSearch(2)">在积分商城中搜索“{{input}}”</li>-->
                <li @click="enterSearch(3)">在助理人或贫困户中搜索“{{input}}”</li>
                <!--<li @click="enterSearch(4)">在文章中搜索“{{input}}”</li>-->
            </ul>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    export default{
        data(){
            return {
                title:"搜索",
                input:(()=>{
                    var search = window.localStorage.getItem('search') == "undefined" ? "" : window.localStorage.getItem('search');
                    window.localStorage.setItem('search','');
                    return this.$route.query.keyWord ||search|| "";
                })(),
                hotWord:{
                    default: {
                        con:"",  //默认搜索词
                        plate:"",
                    },
                    list:[]
                },
                historyRecord:[],
                holdHistoryNum:10           //历史记录只显示10个
            }
        },
        methods:{
          closePage(){
            window.localStorage.setItem('search','')
            this.syJsbCloseAppPage()
          },
            ccc(){
//                this.appOpenMode('hometownGoods',{},1);
            },
            enterSearch(type=1){          //键盘enter键位的搜索(eg：若用户不选择搜索版块，默认在故乡特产1中搜索)
                let word = '';
                if (this.input.trim()) {
                    word = this.input.trim();
                }else if(this.hotWord.default.con){
                    word = this.hotWord.default.con;
                    type = this.hotWord.default.plate || 1;
                }


                if (word) {
                    let hotObj       = {};
                    hotObj.plate     = type;
                    hotObj.content   = word;
                    this.addNewHistory(hotObj);
                    this.locationGo(hotObj,0,0);
                }else{
                    this.$toast("请输入搜索关键词")
                }
            },
            keyWordSearch(from,index){   //关键词和历史记录的搜索
                let curSearchObj = {};
                if (from == "hot") {
                    curSearchObj = this.hotWord.list[index];
                    this.addNewHistory(curSearchObj);
                    this.locationGo(curSearchObj,1,0);
                }else if(from == "history"){
                    curSearchObj = this.historyRecord[index];
                    this.addNewHistory(curSearchObj);
                    this.locationGo(curSearchObj,0,1);
                }
            },
            locationGo(wordObj,isRecommend,isHistory){    //路由跳转 interferenceType:0不干涉 1有跳转的url 2转换之后搜索
                let t   = wordObj.plate,
                    con = wordObj.content ? wordObj.content : this.input,
                    query =  "";        //被转换的关键词（没有取con）
                if (wordObj.interferenceType == 1) {
                  console.log(wordObj.interferenceContent)
                    this.appOpen('webOutside',{url:encodeURIComponent(wordObj.interferenceContent)})
                   // this.appOpen(wordObj.interferenceContent,{},true);
                }else if(wordObj.interferenceType == 2){
                    query = wordObj.interferenceContent;
                };
                if(wordObj.interferenceType != 1){
                    switch(t){
                        case 0:
                            this.$toast("暂无此类型页面")
                            break;
                        case 1:
                            this.appOpenMode("goodsList",{keyWord:con,query:query,isRecommend:isRecommend,isHistory:isHistory},1)
                            break;
                        case 2:
                            this.appOpenMode("integralGoods",{keyWord:con,query:query,isRecommend:isRecommend,isHistory:isHistory},1)
                            break;
                        case 3:
                            this.appOpen("resultStore",{keyWord:con,query:query,isRecommend:isRecommend,isHistory:isHistory})
                            break;
                        case 4:
                            this.appOpen("resultArticle",{keyWord:con,query:query,isRecommend:isRecommend,isHistory:isHistory})
                            break;
                        default:
                            console.log("没有这个选项");
                    }
                }
            },
            clearHistory(){     // 清除历史记录
                this.historyRecord = [];
                window.localStorage.removeItem("SEARCH-historyRecord");
            },
            getHotWordLists(type=0){    //0全部 1故乡特产 2积分商城 3店铺 4文章
                var url = "/ebgoods/hot-word/list/user";
                this.getWithToken(url,{}).then(res=>{
                  this.$loading.show=false
                    if(res && res.code == 200){
                        console.log(res.data)
                        this.hotWord = res.data;
                    }
                })
            },
            historyRecordInit(){    //历史记录初始化
                let lh  = window.localStorage.getItem("SEARCH-historyRecord");
                let arr = [];
                arr     = lh ? JSON.parse(lh) : [];
                var n   = this.holdHistoryNum;
                arr.length >= n ? arr.splice(n,arr.length-n) : "";
                this.historyRecord = arr;
            },
            addNewHistory(o){    //增加一个新的历史记录对象（同时去重）
                var g = this.historyRecord.concat();
                g.unshift(o);
                g = this.arrRemoveRepeatEle(g);
                this.historyRecord = g;     //当前历史记录增加一条
                g.length >= this.holdHistoryNum + 1 ? g.pop() : "";
                var gStr = JSON.stringify(g);
                try{
                    window.localStorage.setItem("SEARCH-historyRecord",gStr);
                }catch(res){
                    console.log("无痕模式")
                }
            },
            arrRemoveRepeatEle(arr){      //去重（obj.plate和content 都一样才去重）
                var resArr = [];
                for(let i = 0; i < arr.length; i++){
                    let b = true;
                    for(let j = 0; j < resArr.length; j++){
                        if (resArr[j].plate == arr[i].plate && resArr[j].content == arr[i].content){
                            b = false
                        }
                    }
                    if(b){resArr.push(arr[i])}
                };
                return resArr;
            },
        },
        created(){
          window.searchRefreshUnData=(res)=>{
            window.localStorage.setItem('search','');
            this.input=''
          }
          setTimeout(()=>{
            this.syJsbIosRegisterHandler('searchRefreshUnData')
          },0)
          window.searchRefresh=(res)=>{
            var search = window.localStorage.getItem('search') == "undefined" ? "" : window.localStorage.getItem('search');
            window.localStorage.setItem('search','');
            this.input=search
          }
          setTimeout(()=>{
            this.syJsbIosRegisterHandler('searchRefresh')
          },0)
          this.historyRecordInit();
          this.getHotWordLists();
        },
        mounted(){
          this.$header.show = false;

        },
        filters:{
            plateChangeIntoName(n){
                switch(n){
                    case 1:
                        return "故乡特产"
                    case 2:
                        return "积分商城"
                    case 3:
                        return "助理人或善企"
                    case 4:
                        return "文章"
                    default:
                        return ""
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    .container-box{
        height:44px;
        min-height:44px;
        /*padding-top:20px;*/
        flex-shrink:0;
    }
    .container{
        width:100%;
        height:100%;
        font-family: $fa;
        overflow:hidden;
        display:-webkit-flex;
        display:flex;
        -webkit-flex-direction:column;
        flex-direction:column;
        color:#4b4b4b;
    }
    .container_top{
        flex-shrink:0;
        position:fixed;
        left:0;
        top:0;
        z-index:99;
        padding:20px 0.3rem 0 0;
        /*min-height:0.88rem;*/
        min-height:44px;
        /*height:0.88rem;*/
        height:44px;
        display:-webkit-flex;
        display:flex;
        -webkit-justify-content:space-between;
        justify-content:space-between;
        -webkit-align-items:center;
        align-items:center;
        background-color:rgba(249,249,249,1);
        /*border-bottom:1px solid #DADEE4;*/
    }
    .container .search{
        min-width:6.05rem;
        width:6.05rem;
        /*height:0.64rem;*/
        height:32px;
        background-color:#F0F0F0;
        border-radius:0.32rem;
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
    }
    .container .cancel{
        font:0.32rem/0.64rem $fa;
        min-width:0.85rem;
        -webkit-flex-grow:2;
        flex-grow:2;
        text-align:right;
        -webkit-user-select:none;
        user-select:none;
    }
    .search_icon{
        /*width:0.28rem;*/
        /*min-width:0.28rem;*/
        /*height:0.28rem;*/
        /*background:transparent url(/static/images/search/search@2x.png) center center/cover no-repeat;*/
        /*margin:0 0.3rem;*/
        width: .64rem;
        height: .64rem;
        background: transparent url(/static/images/search/search@2x.png) 50%/.28rem .28rem no-repeat;
        margin-left: .12rem;
    }
    .search_input{
        -webkit-flex-grow:2;
        flex-grow:2;
        height:100%;
        font:0.28rem/1.5 $fa;
        color:#2E2E2E;
        background-color:transparent;
        margin-right:0.2rem;

        /*background-color:red;*/
        height:44px;

    }
    input::-webkit-search-decoration,input::-webkit-search-cancel-button {
        display: none;
    }
    ::-webkit-input-placeholder{
        color:#d0d0d0;
    }
    ::-moz-placeholder,:-ms-input-placeholder,:-moz-placeholder{
        color:#d0d0d0;
    }
    img{
        max-width:100%;
    }
    .goback{
        width:0.9rem;
        height:100%;
        background:url(/static/images/search/goback.png) center center/.21rem .37rem no-repeat;
    }
    .with-cancel{
        padding:20px 0.3rem 0;
    }
    .container_mid{
        -webkit-flex-grow:2;
        flex-grow:2;
        overflow:auto;
        display:-webkit-flex;
        display:flex;
        -webkit-flex-direction:column;
        flex-direction:column;
        /*border-top:1px solid #DADEE4;*/
        -webkit-overflow-scrolling: touch;
    }
    .lists_area{
        padding:0 0.3rem;
    }
    .lists_title{
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        -webkit-justify-content:space-between;
        justify-content:space-between;
        height:1.08rem;
    }
    .lists_title_t{
        color:#2E2E2E;
        font:0.32rem/1.5 $fa;
    }
    .lists_title_clear{
        color:#FF1919;
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        font-size:0.28rem;
    }
    .clear_icon{
        width:0.3rem;
        height:0.3rem;
        background:transparent url(/static/images/search/delete@2x.png) center center/cover no-repeat;
        margin-right:0.05rem;
        margin-top: -0.03rem;
    }
    .lists_items{
        width:7.2rem;
    }
    .ul-flex{
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        flex-wrap:wrap;
    }
    .item{
        display: flex;
        padding:0.12rem 0.2rem 0.11rem;
        font:0.26rem/1.5 $fa;
        color:#2E2E2E;
        border:1px #d0d0d0 solid;
        border-radius:0.08rem;
        margin:0 0.3rem 0.3rem 0;
        user-select:none;
    }
    .item.active{
        border:1px #FF1919 solid;
        color:#FF1919;
    }
    .container_mid_tip{
        color:#2E2E2E;
        font:0.32rem/0.45rem $fa;
        padding:0.25rem 0.3rem;
    }
    .container_mid_tip li{
        padding:0.18rem 0;
    }

</style>
