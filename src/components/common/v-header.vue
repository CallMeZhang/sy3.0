<template>
  <div v-if="show" class="header-paddingTop" style="background-color:rgba(249,249,249,0.82);" >
    <section class="container_top iphone10-paddingTop border-bottom-1px" :style="headerStyle">
      <div class="header-left">
        <div class="go-back inline" @click="goBack" v-if="hideBack"></div>
        <div class="close-page inline" @click="closePage" v-if="close">
        </div>
      </div>
      <div class="header-middle">
        <div class="title-text" v-if="middleMode=='text'">{{title}}</div>
        <p class='middle-img' v-if="middleMode=='img'" :style="'background: url('+middle.img.url+') no-repeat center center;background-size:2.5rem;'"></p>
      </div>

      <div class="title-right">
        <div v-for="(value, key) in right" :index='key' class="right-item" @click="value.callback">
          <span v-if="value.type=='text'" class="item-span" :style="rightTextStyle">{{value.text}}</span>
          <img class='item-img' v-if="value.type=='img'" :src="value.url" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script >
var index=0
  import  bridge from '../../modules/_appjs/bridge'
  import browser from '../../modules/_ua/browserUa'
    export default{
        props:["text"],
      data(){
        return {
          customHandle:'',
          show:true,
          title:'一起善源',
          middle:{img:{url:''}},
          middleMode:'text',
          setBackData:{isReload:0,times:1},
          hideBack:true,
          headerStyle:'',
          rightTextStyle:'',
          isHistory:false,
          close:false,
          backParameter:'',
          right:{
            text:{callback:()=>{}},
            img:{callback:()=>{}}
            },
          goBackHandle:()=>{return new Promise(function(resolve,reject){resolve('ok1');})}
        }
      },
      created(){
        var that =this
        this.syJsbGetAppInfo(function (appInfo) {
          if (!appInfo) {
            var flag=/isShare=yes/ig.test(window.location.href)
            if(flag){
              that.show=false
            }else{
              that.show=true
            }
          }else{
//            that.show=true
          }
        });

      },
      watch:{
        show(val){
          if(!this.show){
            this.$emit('changeTitle',this.show)
          }
        }
      },
      mounted(){
      },
      methods:{
        closePage(){
          this.syJsbCloseAppPage()
        },
        customBehavior(callback){
          this.customHandle=callback
        },
        setBack(p){
          this.setBackData=p
//          console.log('setBack 即将废弃')
        },
        setBackUrl(url,obj){
          this.backParameter={url:url,obj:obj}
//          console.log('setBackUrl 即将废弃')
        },
        goBack(){
          this.goBackHandle().then((res)=>{
            if(res=='payment'){
              this.appOpen('consumRecord',{chooseType :'pay',payment:'payIndex'})
            }else{
              if(this.isHistory&&this.close){
                if(/pageFirst=1/.test(window.location.href)){
                  this.syJsbCloseAppPage()
                }else{
                  window.history.go(-1)
                }
              }else if(typeof this.customHandle=='function'||this.customHandle!=''){
                this.customHandle()
              }else{
                if(this.backParameter!=''){
                  var url=this.backParameter.url;
                  var obj = this.backParameter.obj
                  if(this.backParameter.url=='mine'){
                    try{
                      this.appBackTabbarIndex(5,1)
                    } catch(err){
                      this.syJsbCloseAppPage()
                    }
                  }else{
                    this.appOpen(url,obj)
                  }
                }else{
                  var data=this.setBackData
                  this.setBackData={isReload:0,times:1}
                  this.syJsbCloseAppPage(data.isReload,data.times)
                }
              }
            }
          })
        },
        Handle(callback){
          this.goBackHandle=callback
        },
        setTitle(p){
          this.middleMode='text'
          this.title=p;
          document.title = p;
        },
        middleFn(p){
          var type=p['type']
          if(!type&& typeof p['callback'] =='function' ){
            // console.log('参数有误！')
            this.show=false
            return;
          }
          this.middleMode=p['type']
          // console.log(123)
          this.middle[type]=p
        },
        rightFn(p){
          var type=p['type']
          if(!type&& typeof p['callback'] =='function' ){
            // console.log('参数有误！')
            this.show=false
            return;
          }
          this.right[type]=p
          // console.log(this.right)
        },
      }
    }
</script>

<style scoped>
  .middle-img{
    width: 2.5rem;
    height: 100%;
    display: block;
    margin: 0 auto;
    background-size: 2.5rem;

  }
  .inline{
    display: inline-block;
    float: left;
  }
  .close-page{
    width:0.88rem;
    height:100%;
    background:url(/static/images/common/closePage.png) no-repeat center center  ;
    background-size: 0.56rem;
  }
  .header-left{
    position: absolute;
    left: 0;
    height: 44px
  }
  .header-middle{
    position: absolute;
    left:50%;
    width: 3.74rem;
    margin-left:-1.87rem ;
    height: 44px;
  }
  .item-img{
    width: 28px;
    height: 28px;
    margin-top: 8px;
    margin-right: 5px;
  }
  .item-span{
    width:28px;
    /*font-size:0.34rem;*/
    line-height:44px;
  }
  .right-item{
    display: inline-block;
    float: right;
    height: 44px;
    position:relative;
  }
    .go-back{
        width:0.88rem;
        height:100%;
        background:url(/static/images/common/goBack.png) no-repeat center center;
        background-size: 0.56rem;
    }
    .container_top{
        min-height:44px;
        height:44px;
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        background:rgba(249,249,249,1);
        position:fixed;
        z-index: 99;
        width: 100%;
    }
    .title-text {
        height: 100%;
        width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:18px;
        color:#2E2E2E;
        line-height: 44px;
    }
    .title-right{
      position: absolute;
      right:0rem;
    }
</style>
