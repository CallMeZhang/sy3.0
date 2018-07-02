<template>
  <div class="con">
    <div v-title="type == 1?'用户协议':type == 2?'用户隐私保护协议':''"></div>
    <div class="container-det bg-f font28" :class="{'f36':type == ''}">
        <div v-for="v in content">
          <div class="textDet" v-if="v && v.type == 'text'">
            <div v-for="text in v.value">
              <div v-html="text" style="padding:0 0 .22rem"></div>
            </div>
          </div>
          <div v-if="v && v.type == 'img'" >
            <div v-for="i in v.value" class="det-img">
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
        title:'',
        content:{},
        agreementId:'',
        type:'',
      }
    },
    created(){
      this.title = this.$route.query.title || '';
      this.agreementId = this.$route.query.agreementId || '';
      this.type = this.$route.query.type || '';
      if(this.type == ''){
        this.getData(this.agreementId);
      }else if(this.type == 1){
        this.agreementId = 'a4c2f5a8258042baba61932f1cc6743b'
        this.getData(this.agreementId);
      }else if(this.type == 2){
        this.agreementId = 'a4d77fffdc5348b9a31f569628abdfff'
        this.getData(this.agreementId);
      }
    },
    mounted(){
      if(this.type == ''){
        //不显示导航
        this.$header.show = false;
      }else{
        this.$header.setTitle(this.title)
      }

    },
    methods:{
      //获取数据
      getData(v){
        this.getWithToken('sy3_cms/agreement/user/detail',{agreementId:v}).then(res => {
          if(res.code == 200){
            this.content = JSON.parse(res.data.agreementDetail.content);
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
  .con {
    box-sizing: border-box;
  }
  .textDet {
    word-wrap: break-word;
  }
  .container-det {
   padding:.3rem;
   color:rgba(75,75,75,1);
   line-height:0.4rem;
   text-align: justify;
  }
  .f36 {
    font-size: .36rem !important;
  }
  .tit {
    text-align: center;
    padding-bottom: .43rem;
  }
  .det-img {
    /*width:6.9rem;*/
    /*height:2.9rem;*/
    margin-bottom:.22rem;
  }
  img {
    width:100%;
    height:100%;
  }
</style>
