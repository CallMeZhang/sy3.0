<template>
  <div class="con iphoneTop-box">
    <div v-title="'意见反馈'"></div>
    <div class="border-bottom-1px bg-f">
      <textarea name="rz" class="rz-arear font30" cols="30" rows="4" placeholder="请描述您的问题与意见"
                maxlength="300"  minlength="0" v-model="report_con">
      </textarea>
    </div>
    <!--上传凭证-->
    <div class="upload bg-f border-top-1px border-bottom-1px">
      <div class="reasion font30 clearfix bor-none">
        <p class="com-lef fl">图片<span class="pad-lef">(选填，最多5张)</span></p>
      </div>
      <!--图片上传-->
      <div class="sy-img">
        <div class="cont">
          <div class="img-cont" v-for="(item,index) in imgList">
            <img :src="item" alt="">
            <img :src="imgUrl+'/common/close.png'" alt="删除" class="del-img" @click="delImg(index)">
          </div>
          <div class="add-img" v-show="imgList.length < 5" @click="upload">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="text">添加照片</div>
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
        report_con:'',//反馈内容
        imgList:[
          // "/static/images/wishList/add.png",
          // "/static/images/wishList/add.png",
          // "/static/images/wishList/add.png",
          // "/static/images/wishList/add.png",
        ],
        imgNum:5,
        memberId:'',
        token:''
      }
    },
    created(){
      this.memberId = this.$route.query.memberId || '';
      //获取token
      this.syJsbGetAppInfo((res)=>{
        if (typeof res == 'string') {
          res = JSON.parse(res);
        }
        this.token = res.token;
      })
      //上传图片
      window.setImageByUrl = (json_data) =>{
        var data = eval('(' + json_data + ')');
        this.imgList = this.imgList.concat(data.images);
        //向后台传输数据
      }

    },
    mounted(){
      this.$header.setTitle("意见反馈")
      this.$loading.show=false
    },
    methods:{
      //获取文件上传目录
      getCatalog(){
        this.uploadJson = {'folderType':'feeback','memberId':this.memberId}
        this.postWithToken('/order-center/oss/buildOSSFolder',{folderType:'head',buildFolderData:JSON.stringify(this.uploadJson)}).then(res => {
          if(res.code == 200){
            this.uploadType = res.data.folder;
          }
        })
      },
      //上传头像
      upload(){
        if((this.imgNum - this.imgList.length) <= 0){
          this.$toast('最多上传'+this.imgNum+'张图片');
          return
        }
        this.getCatalog();
        this.syJsbUploadFile(JSON.stringify({
          id:"pic",
          rateX:1,
          rateY:1,
          token:this.token,
          uploadType:this.uploadType,
          pNum:this.imgNum - this.imgList.length
        }))
      },
    },


  }
</script>

<style lang="scss" scoped>
  textarea::-webkit-input-placeholder {
    color:rgba(208,208,208,1);
  }
  textarea:-moz-placeholder {
    color:rgba(208,208,208,1);
  }
  textarea::-moz-placeholder {
    color:rgba(208,208,208,1);
  }
  textarea:-ms-input-placeholder {
    color:rgba(208,208,208,1);
  }
  .con {
    width:100%;
    height:100%;
    background: #FAFAFA;
  }
  .rz-arear{
    width:100%;
    height: 3rem;
    color:rgba(148,148,148,1);
    line-height: 0.42rem;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    padding: .19rem .3rem;
    text-align: justify;
  }
  /*上传凭证*/
  .upload {
    margin-top: .2rem;
    padding:0 .3rem;
  }
  .reasion {
    border-bottom:1px solid #E3E3E3;
    line-height:0.88rem;
  }
  .com-lef {
    color:rgba(75,75,75,1);
  }
  .pad-lef {
    color:#D0D0D0;
    padding-left:.3rem;
  }
  .bor-none {
    border:none;
  }
  .sy-img{
    .cont{
      padding-top:.15rem;
      display: flex;
      flex-wrap: wrap;
      &>div{
        position: relative;
        width:1.5rem;
        height:1.5rem;
        margin:0 .5rem .3rem 0;
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
</style>
