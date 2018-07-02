<template>
  <div class="bor">
    <div v-title="'公益平台客服'"></div>
    <div class="con">
      <div class="title" :class="{'titile-left':title.length > 21}">{{title}}</div>
      <div v-for="v in content">
        <div v-if="v && v.type == 'text'">
          <!--<div v-for="text in v.value">-->
          <div v-html="v.textarea" style="padding:0 0 .22rem"></div>
          <!--</div>-->
        </div>
        <div v-if="v && v.type == 'img'" >
          <div v-for="(i,n) in v.imgUrl" class="det-img" @click="appOpen(v.imgLink[n])">
            <img v-lazy="i" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
  export default {
    components:{},
    data(){
      return {
        content:{},
        noticeId:'',
        title:''
      }
    },
    created(){
      this.noticeId = this.$route.query.noticeId || ''
      this.userCenterData();
    },
    mounted(){
      this.$header.setTitle('公益平台客服')
    },
    methods:{
      //获取帮助中心的文章
      userCenterData(){
        this.get('/sy3_cms/helpCenter/user/detail',{noticeId:this.noticeId}).then(res => {
          if(res.code == 200){
            this.title = res.data.articleDetail.title;
            this.content = JSON.parse(res.data.articleDetail.content);
          }else{
            this.$toast(res.message)
          }
          this.$loading.show = false
        })
      },

    },

  }
</script>

<style lang="scss" scoped>
  .bor {
    box-sizing: border-box;
  }
  .con {
    padding:0 .3rem;
  }
  .title {
    font-size:0.32rem;
    color:rgba(46,46,46,1);
    line-height:0.45rem;
    font-weight: 700;
    padding-top:.36rem;
    text-align: center;
  }
  .titile-left {
    text-align: left !important;
  }
  .img {
    width:6.9rem;
    height:2.9rem;
    margin-top:.35rem;
  }
  img {
    width:100%;
    height:100%;
    background: #e3e3e3;
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
  .det-img {
    /*width:6.9rem;*/
    height:2.9rem;
    margin-bottom:.22rem;
  }
</style>
