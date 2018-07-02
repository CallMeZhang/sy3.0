<template>
  <div class="bor">
    <div v-title="title"></div>
    <div class="download" id="download">
      <downLoad></downLoad>
    </div>
    <div class="con" v-if="articleType == 0 || this.where == 'iframe'">
      <div v-for="v in content" v-show="!isString">
        <div v-if="v && v.type == 'text'">
          <div class="font-s" v-html="v.textarea" style="padding:.3rem 0;"></div>
        </div>
        <div v-if="v && v.type == 'img'" >
          <div class="flex moreImg">
            <div v-for="(i,n) in v.imgUrl" :class="{'width1':v.imgUrl.length == 1,'width2':v.imgUrl.length == 2,'width3':v.imgUrl.length == 3}">
              <img v-lazy="i + ossUrl('webp_960')" alt="" @click="goDet(v,n)">
            </div>
          </div>
        </div>
      </div>
      <div v-show="isString" style="padding:.22rem 0 0;">{{content}}</div>
    </div>
    <!--无列表-->
    <div class="none-list " v-if="articleType == 2">
      <div class="non-pos absolute">
        <img :src="imgUrl+'/common/error.png'" alt="错误" class="error-img">
        <p class="error-det font32">您访问的文章已下线</p>
      </div>
    </div>
    <div class="wish-bottom border-top-1px font24" v-if="!articleType == 2">
      <p>© 17shuanyuan.com</p>
    </div>
  </div>
</template>

<script>
  console.log(window.location.href)
  //import loading from '@/components/'
  import share from '../../modules/_share/share'
  import downLoad from "@/components/common/downLoad.vue"
  export default {
    components:{downLoad},
    data(){
      return {
        where:'',
        content:{},
        noticeId:'',
        title:'',
        isString:false,
        articleType:'',
        shareCon:{},
        isShare:'',
        isParams:''
      }
    },
    created(){
      this.where = this.$route.query.where || ''
      this.noticeId = this.$route.query.noticeId || ''
      this.isShare = this.$route.query.isShare || ''
      if(this.where == 'iframe'){
        this.getData();
      }else if(this.where == 'article'){
        this.getArticleData();
      }else if(this.where == 'userCenter'){
        this.userCenterData();
      }
    },
    mounted(){
      if(this.where == 'iframe' || this.isShare == 'yes'){
        //不显示导航
        this.$header.show = false;
      }
    },
    methods:{
      //iframe
      getData(){
        this.get('/msg-center/noticePc/getOneMsgNotice',{noticeId:this.noticeId}).then(res => {
          if(res.code == 200){
            if(res.data.msgNoticeBo.content){
              this.content = JSON.parse(res.data.msgNoticeBo.content);
            }
          }else{
            this.$toast(res.message)
          }
          this.$loading.show = false
        })
      },
      //获取文章信息
      getArticleData(){
        this.get('/sy3_cms/article/user/detail',{articleId:this.noticeId}).then(res => {
          if(res.code == 200){
            this.shareCon = res.data.articleDetail
            this.title = this.shareCon.articleTitle;
            if(res.data.articleDetail.content){
              this.content = JSON.parse(res.data.articleDetail.content)
            }
            this.articleType = res.data.articleDetail.articleType;
            this.$header.setTitle(this.title)
            if(this.isShare == 'yes' && this.articleType == 2){
              this.appOpen('failure',{},false,false,true)
            }
          }else{
            this.$toast(res.message)
            if(this.isShare == 'yes'){
              this.appOpen('failure',{},false,false,true)
            }
          }
          if(this.articleType != 2){
            this.$header.rightFn({
              type:'img',
              url:this.imgUrl + '/common/share.png',
              callback:()=>{
                let shareUrl = window.location.origin+'/letterDetails?where=article&isShare=yes&noticeId='+this.shareCon.articleId
                let params = {
                  text:this.shareCon.shareDesc,
                  url:shareUrl,
                  title:this.shareCon.shareTitle,
                  logo:this.shareCon.shareImgUrl?this.shareCon.shareImgUrl:this.imgUrl + '/common/whitebg.jpg',
                  sms:'[一起善源]爱・源于善，您的好友向您推荐了一篇好文，点击查看：' + shareUrl
                };
                this.syJsbShare(params);
              }
            })
          }
          window.document.title = this.title;
          share({
            url:window.location.origin+'/letterDetails?where=article&isShare=yes&noticeId='+this.shareCon.articleId,
            title:this.shareCon.shareTitle,
            text:this.shareCon.shareDesc,
            logo:this.shareCon.shareImgUrl?this.shareCon.shareImgUrl:this.imgUrl + '/common/whitebg.jpg'
          })
          this.$loading.show = false
        })
      },
      //获取帮助中心的文章
      userCenterData(){
        this.get('/sy3_cms/helpCenter/user/detail',{articleId:this.noticeId}).then(res => {
          if(res.code == 200){
            this.title = res.data.articleDetail.articleTitle;
            if(res.data.articleDetail.content){
              this.content = JSON.parse(res.data.articleDetail.content);
            }
            this.shareCon = res.data.articleDetail
            this.title = this.shareCon.articleTitle;
            this.articleType = res.data.articleDetail.articleType;
            if(this.isShare == 'yes' && this.articleType == 2){
              this.appOpen('failure',{},false,false,true)
            }
            this.$header.setTitle(this.title)
          }else{
            this.$toast(res.message)
            if(this.isShare == 'yes'){
              this.appOpen('failure',{},false,false,true)
            }
          }
          if(this.articleType != 2){
            this.$header.rightFn({
              type:'img',
              url:this.imgUrl + '/common/share.png',
              callback:()=>{
                let shareUrl = window.location.origin+'/letterDetails?where=userCenter&isShare=yes&noticeId='+this.shareCon.articleId
                let params = {
                  text:this.shareCon.shareDesc,
                  url:shareUrl,
                  title:this.shareCon.shareTitle,
                  logo:this.shareCon.shareImgUrl?this.shareCon.shareImgUrl:this.imgUrl + '/common/whitebg.jpg',
                  sms:'[一起善源]爱・源于善，您的好友向您推荐了一篇好文，点击查看：' + shareUrl
                };
                this.syJsbShare(params);
              }
            })
          }
          window.document.title = this.title;
          share({
            url:window.location.origin+'/letterDetails?where=userCenter&isShare=yes&noticeId='+this.shareCon.articleId,
            title:this.shareCon.shareTitle,
            text:this.shareCon.shareDesc,
            logo:this.shareCon.shareImgUrl?this.shareCon.shareImgUrl:this.shareCon.shareImgUrl
          })
          this.$loading.show = false
        })
      },
      goDet(v,n){
        if(v.imgLink[n] != null){
          if(v.imgLink[n].indexOf("?")!=-1){
            this.isParams = '&'
          }else{
            this.isParams = '?'
          }
          this.appOpen(v.imgLink[n] + this.isParams + "isShare=" + this.isShare ,null,true)
        }else {
          return
        }

        // this.appOpen(v.imgLink[n],null,true)
      }
    },

  }
</script>

<style lang="scss" scoped>
  .bor {
    box-sizing: border-box;
  }
  .con {
    padding:.3rem;
  }
  .font-s {
    font-size:0.32rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.5rem;
    text-align: justify;
    word-wrap: break-word;
  }
  .title {
    font-size:0.32rem;
    color:rgba(46,46,46,1);
    line-height:0.45rem;
    font-weight: 700;
    padding:.36rem 0 .35rem;
    text-align: center;
  }
  .titile-left {
    text-align: left !important;
  }
  img {
    width:100%;
    height:100%;
    display: block;
  }
  .width1 {
    width:100%;
  }
  .width2 {
    width:50%;
  }
  .width3 {
    width:33.3%;
  }
  .det {
    padding-top:.23rem;
    font-size:0.24rem;
    color:rgba(75,75,75,1);
    line-height:0.38rem;
  }
  .line {
    height:.37rem;
  }
  /*无列表*/
  .none-list {
  }
  .non-pos {
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .error-img {
    margin:0 auto;
    width:3.1rem;
    height:3.1rem;
  }
  .error-det {
    color:rgba(208,208,208,1);
    line-height:0.48rem;
    padding-top:.22rem;
    text-align: center;
  }
  .moreImg {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .wish-bottom {
    height:1.12rem;
    background:rgba(250,250,250,1);
    font-weight: 300;
    color:rgba(227,227,227,1);
    line-height:1.12rem;
    text-align: center;
    box-sizing: border-box;
  }
</style>
