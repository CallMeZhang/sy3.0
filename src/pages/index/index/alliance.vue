<template>
    <div>
      <!-- 联盟 -->
      <div class="alliance">
        <div :style="{backgroundImage:'url('+topBg+')'}" class="alliance-bg" >
          <div class="bg-con" @click="appOpen('unionRank')">
            <div class="flex item-center alliance-con">
              <div class="person-1">
                <div class="color4b">集结员工人数</div>
                <div class="color2e font30 num-box">
                  <num-jump :num="info.staffNum" ></num-jump>
                </div>
              </div>
              <div class="line"></div>
              <div class="person-2">
                <div class="color4b">邀请益客人数</div>
                <!--<div class="color2e font30 num-box">112,888,888</div>-->
                <div class="color2e font30">
                  <num-jump :num="info.invite"></num-jump>
                </div>
              </div>
              <div class="line"></div>
              <div class="performance">
                <div class="flex item-center">
                  <div v-if="info.showType =='rankRate'">
                    <div class="color4b">扶贫成绩</div>
                    <div class="color2e font30 num-box">超越{{info.rankRate * 100}}%的联盟</div>
                  </div>
                  <div v-if="info.showType =='perCapitaPoints'">
                    <div class="color4b">人均公益积分</div>
                    <div class="color2e font30 num-box">
                      <num-jump :num="info.perCapitaPoints"></num-jump>
                    </div>
                  </div>
                  <div v-if="info.showType !='perCapitaPoints' && info.showType !='rankRate'">
                    <div class="color4b">公益消费金额</div>
                    <div class="color2e font30 num-box">
                      <num-jump :num="info.amount" :text="'元'"></num-jump>
                      <!--<span class="font24">元</span>-->
                    </div>
                  </div>
                  <div class="go-detail">
                    <img :src="imgUrl+'/common/arrow2.png'" alt="">
                  </div>
                </div>
                <!--<div class="flex item-center" v-else>-->
                  <!--<div>-->
                    <!--<div class="color4b">公益消费金额</div>-->
                    <!--<div class="color2e font30 num-box">112,888,888 <span class="font24">元</span></div>-->
                  <!--</div>-->
                  <!--<div class="go-detail" @click="appOpen('unionRank')">-->
                    <!--<img :src="imgUrl+'/common/arrow2.png'" alt="">-->
                  <!--</div>-->
                <!--</div>-->
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import numJump from '@/components/common/num'

  export default {
    components: {numJump},
    props:['data'],
    data(){
      return {
        topBg:'',
        numArr:['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'],
        number:'',
        info:{},
        token:'',
        dataBack:false,
      }
    },
    created(){
      if(!this.data.themeImage){
        this.topBg = this.imgUrl +'/index/top_bg3.png';
      }else{
        this.topBg = this.data.themeImage + this.ossUrl('webp_480')
      }
//      this.topBg = this.imgUrl +'/index/top_bg3.png'
      this.getData()
    },
    mounted(){
      this.syJsbGetToken(token=>{
        this.token = token
        setInterval(()=>{
          this.getData({token:this.token})
        },10000)
      })
//      setTimeout(()=>{this.number = '2423344'},2000)
//      setTimeout(()=>{this.number = '23423423'},4000)
//      setTimeout(()=>{this.number = '9305005'},6000)

//      setInterval(()=>{this.getData()},10000)
      this.getData()

    },
    methods: {
      getData(param){
        let type = 'postWithToken';
        if(param){
          type = 'post'
        }
        return this[type]('layout-center/layoutOpen/unionStats',param).then(res=>{
          if(res && res.code == 200){
            this.info = res.content;
            this.dataBack = true;
//            this.info.staffNum = 665449;
          }else{
            this.$toast(res?res.message:'获取联盟信息失败')
          }
        })
      }
    },


  }
</script>

<style lang="scss" scoped>
  $d0: #D0D0D0;
  $red: #FF1919;
  .alliance{
    .alliance-bg{
      background-size: cover;
      .bg-con{
        padding-top:.95rem;
        padding-bottom:.2rem;
        background:linear-gradient(rgba(222,222,222,0) 0%,rgba(222,222,222,.55) 40%,#fff 100%);
        /*background:url('/static/images/index/mask.png') no-repeat left top;*/
        background-size: cover;
        /*background: #fff;*/
      }
      .alliance-con{
        justify-content: space-between;
        padding:0 .3rem;
        .num-box{
          height:.4rem;
          line-height: .4rem;
          overflow: hidden;
          .num-item{
            transition: margin-top 2s;
          }
        }
        .line{
          width:1px;
          height:.5rem;
          background:$d0;
        }
        .go-detail{
          width:.44rem;
          height:.44rem;

        }
      }



    }

  }
</style>
