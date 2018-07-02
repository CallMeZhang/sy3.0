<template>
  <div class="com relative">
    <div v-title="'投诉'"></div>
    <!--投诉原因-->
    <div class="complain bg-f">
      <div class="reasion font30 clearfix">
        <p class="com-lef fl">投诉原因</p>
        <p class="com-rig fr">请选择</p>
      </div>
      <div class="reasion font30 clearfix">
        <p class="com-lef fl">投诉原因</p>
        <input class="com-inp" type="text" :minlength="10" placeholder="请至少填写10个字" v-model="userInput">
      </div>
      <div class="reasion font30 clearfix bor-none">
        <p class="com-lef fl">上传凭证<span class="pad-lef">(最多9张)</span></p>
      </div>
      <!--图片上传-->
      <div class="sy-img">
        <div class="cont">
          <div class="img-cont" v-for="(item,index) in imgList">
            <img src="/static/images/wishList/add.png" alt="">
            <img src="/static/images/wishList/add_1.png" alt="删除" class="del-img" @click="delImg(index)">
          </div>
          <div class="add-img">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="text">添加照片</div>
          </div>
        </div>
      </div>

    </div>

    <div class="submit font30 absolute" :class="userInput.length>10?'submit-red':''">提交</div>

  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:'complain',
    components:{},
    data(){
      return {
        userInput:'',
        imgList:[
          "/static/images/wishList/add.png",
          "/static/images/wishList/add.png",
          "/static/images/wishList/add.png",
          "/static/images/wishList/add.png",
          "/static/images/wishList/add.png",
        ],
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{

    },


  }
</script>

<style lang="scss" scoped>
  input::-webkit-input-placeholder {
    color: #D0D0D0;
  }

  input:-moz-placeholder {
    color: #D0D0D0;
  }

  input::-moz-placeholder {
    color: #D0D0D0;
  }

  input:-ms-input-placeholder {
    color: #D0D0D0;
  }
  .com {
    background: #FAFAFA;
    height:100%;
  }
  .complain {
    padding-left:.3rem;
  }
  .reasion {
    border-bottom:1px solid #E3E3E3;
    line-height:0.88rem;
  }
  .com-lef {
    color:rgba(75,75,75,1);
  }
  .com-rig {
    width:1.22rem;
    color:rgba(208,208,208,1);
    margin-right:.3rem;
    background: url("/static/images/wishList/go.png") no-repeat 115% 50%;
    background-size: .44rem;
  }
  .com-inp {
    margin-left:.3rem;
    color:rgba(208,208,208,1);
  }
  .bor-none {
    border:none;
  }
  .pad-lef {
    color:#D0D0D0;
    padding-left:.3rem;
  }
  .sy-img{
    .cont{
      padding:.15rem 0  .3rem;
      display: flex;
      flex-wrap: wrap;
      &>div{
        position: relative;
        width:1.5rem;
        height:1.5rem;
        margin:0 .5rem .5rem 0;
      }
      .img-cont{
        .del-img{
          position: absolute;
          top:-0.15rem;
          right:-0.15rem;
          height:.4rem;
          width:.4rem;
        }
      }
      .add-img{
        width:1.5rem;
        height:1.5rem;
        text-align: center;
        border:1px dashed #E3E3E3;
        border-radius: .1rem;
        .line1,.line2{
          position: absolute;
        }
        .line1{
          width:.6rem;
          height:.02rem;
          background: #D0D0D0;
          left:50%;
          top:.6rem;
          margin-left:-.3rem;
        }
        .line2{
          height:.6rem;
          width:.02rem;
          background: #D0D0D0;
          left:50%;
          top:.3rem;
          margin-left:-.01rem;
        }
        .text{
          padding-top:1.05rem;
        }
      }
    }
  }
  .submit {
    width:100%;
    height:0.98rem;
    background:linear-gradient(90deg,rgba(227,227,227,1),rgba(240,240,240,1));
    color:rgba(255,255,255,1);
    line-height:0.98rem;
    text-align: center;
    bottom:0;
    left:0;
  }
  .submit-red {
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
  }
</style>
