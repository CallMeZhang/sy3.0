<template>
  <div>
    <div class="mask" :style="{width:isNative?'6.5rem':'100%',background:isNative?'#fff':'rgba(0,0,0,.4)'}">
      <div class="absolute verify-box" style="top:50%;margin-top:-2.4rem">
        <div id="__nc" style="margin-left:auto;margin-right:auto;width:80%;height:2rem;padding-top:2rem;">
          <div id="nc"></div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  //import loading from '@/components/'
//  import '../../../static/js/verify.js'
  import loadScript from './loadScript.js'
  export default {
    props:['isNative'],
    components:{},
    data(){
      return {

      }
    },
    created(){
      const _this = this;
      let t = new Date();
//      let a = '' + t.getFullYear() + (1+t.getMonth()) + t.getDate() + t.getHours()
//      console.log(a)
      let q = this.getDateStr() + t.getHours();
      loadScript('https://g.alicdn.com/sd/nch5/index.js?'+q).then(()=>{
        this.$nextTick(()=>{
          try{
            this.$loading.show = false;
          }catch(e){
            setTimeout(()=>{
              this.$loading.show = false;
            })
          }
          var nc_token = ["FFFF0N00000000005BCF", (new Date()).getTime(), Math.random()].join(':');
          var scene = 'nc_message_h5'
          var nc=NoCaptcha.init({
            renderTo: '#nc',
            appkey: 'FFFF0N00000000005BCF',
            scene: scene,
            token: nc_token,
            trans: {"key1": "code200"},
            elementID: ["usernameID"],
            is_Opt: 0,
            language: "cn",
            timeout: 10000,
            retryTimes: 5,
            errorTimes: 5,
            inline:true,
            apimap: {
              // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
              // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
            },
            bannerHidden:false,
            initHidden:false,
            callback: function (data) {
              _this.$emit('success',{sessionId:data.csessionid,sig:data.sig,stoken:nc_token,scene:scene})
            },
            error: function (s) {
              _this.$emit('error',s)
              _this.$toast(s);
            }
          });
          NoCaptcha.setEnabled(true);
          nc.reset();//请务必确保这里调用一次reset()方法

          NoCaptcha.upLang('cn', {
            'LOADING':"加载中...",//加载
            'SLIDER_LABEL': "请向右滑动验证",//等待滑动
            'CHECK_Y':"验证通过",//通过
            'ERROR_TITLE':"非常抱歉，这出错了...",//拦截
            'CHECK_N':"验证未通过", //准备唤醒二次验证
            'OVERLAY_INFORM':"经检测你当前操作环境存在风险，请输入验证码",//二次验证
            'TIPS_TITLE':"验证码错误，请重新输入"//验证码输错时的提示
          });
        })

      },err=>{
        this.$toast('加载验证失败，请刷新')
      })
    },
    mounted(){
//      require('../../../static/js/verify.js')
//
    },
    methods:{

    },


  }
</script>
<style>
  #__nc #nc_1-stage-1 .slider .label{
    padding-left:30px;
    box-sizing: border-box;
  }
</style>
<style lang="scss" scoped>
.verify-box{
  width:100%;
}
</style>
