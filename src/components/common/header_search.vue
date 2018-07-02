<template>
    <section class="container-box header-paddingTop">
        <section class="container_top border-bottom-1px iphone10-paddingTop">
            <aside class="goback" @click="syJsbCloseAppPage()"></aside>
            <div class="search" @click="goSearch">
                <span class="search_icon"></span>
                <span class="search_con" v-if="!!keyWord" @click.stop.prevent="goSearchUn">{{keyWord}}</span>
                <input type="search" class="search_input" :placeholder="defaultCon" v-else readonly>
            </div>
        </section>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        props:['keyWord','closePage','needDefault'],
        data(){
            return{
                defaultCon:""//需要请求一个接口，或者当前页面返回？？？？
            }
        },
        methods:{
//            goSearch(){
//                window.localStorage.setItem("search",this.keyWord)
//                if(this.closePage){
//                    this.syJsbCloseAppPage(1,1)
//                }else{
//                    this.appOpenMode('search',{keyWord:this.keyWord},1)
//                }
//            },
            goSearch(){
                window.localStorage.setItem("search",this.keyWord)
                if(this.closePage){
                    this.appNotify({callback:'searchRefresh'})
                    this.syJsbCloseAppPage(0,1)
                }else{
                    this.appOpenMode('search',{keyWord:this.keyWord},1)
                }
            },

//            goSearchUn(){
//                window.localStorage.setItem("search",'')
//              if(this.closePage){
//                this.syJsbCloseAppPage(1,1)
//              }else{
//                this.appOpenMode('search',{keyWord:''},1)
//              }
//            },
            goSearchUn(){
                window.localStorage.setItem("search",'')
                if(this.closePage){
                    this.appNotify({callback:'searchRefreshUnData'})
                    this.syJsbCloseAppPage(0,1)
                }else{
                    this.appOpenMode('search',{keyWord:''},1)
                }
            },


            goBack(){
                console.log("back11")
            },
          getHotWordLists(type=0){    //0全部 1故乡特产 2积分商城 3店铺 4文章
              if (!this.needDefault) {
                  var url = "/ebgoods/hot-word/list/user";
                  this.getWithToken(url,{}).then(res=>{
                      this.$loading.show=false
                      if(res && res.code == 200){
                          console.log(res.data)
//                this.hotWord = res.data;
                          this.defaultCon=res.data.default.con;
                      }
                  })
              }
          }
        },
        created(){
          console.log(this.keyWord)
          this.getHotWordLists()
//            setInterval(()=>{
//                console.log(1,this.result);
//            },2000)
        }
    }
</script>

<style scoped>

    .container-box{
        height:44px;
        min-height:44px;
        /*padding-top:20px;*/
        flex-shrink:0;
    }
    .container_top{
        flex-shrink:0;
        position:fixed;
        left:0;
        top:0;
        z-index:99;
        padding:0 0.3rem 0 0;
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
        background-color:#fafafa;
    }
    .search{
        min-width:6.05rem;
        width:6.3rem;
        /*height:32px;*/
        /*height:0.64rem;*/
        height:32px;
        background-color:#F0F0F0;
        border-radius:0.32rem;
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
    }
    .cancel{
        font:0.32rem/0.64rem '';
        min-width:0.85rem;
        -webkit-flex-grow:2;
        flex-grow:2;
        text-align:right;
        -webkit-user-select:none;
        user-select:none;
    }
    .search_icon{
        width:0.64rem;
        height:0.64rem;
        background:transparent url(/static/images/search/search@2x.png) center center/0.28rem 0.28rem no-repeat;
        margin-left:0.12rem;
        /*margin:0 0.3rem;*/
    }
    .search_input{
        -webkit-flex-grow:2;
        flex-grow:2;
        height:100%;
        font:0.28rem/1.5 "";
        color:#2E2E2E;
        background-color:transparent;
        padding-right:0.2rem;
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
        background:url(/static/images/common/goBack@1.5x.png) center center/0.44rem 0.44rem no-repeat;
    }
    .with-cancel{
        padding:0 0.3rem!important;
    }
    .search_con{
        font:0.28rem/0.4rem "";
        color:#fff;
        background-color:#949494;
        border-radius:0.04rem;
        padding-left:0.08rem;
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        padding-top:0.02rem;
    }
    .search_con:after{
        content:"";
        color:#fff;
        background:url("/static/images/search/secrch_dele.png") center center/cover no-repeat;
        width:0.13rem;
        height:0.13rem;
        margin:0 0.11rem 0 0.1rem;
    }
</style>
