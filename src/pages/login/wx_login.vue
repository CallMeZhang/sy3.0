<template>
  <div id="sigin1">
    <div class="top-text">绑定手机号</div>

    <div class="phone-box">
      <div class="phone">
        <input type="number" placeholder="输入手机号" v-model="phone_num">
      </div>

    </div>

    <div class="next-btn" :class="checkTrue?'btn-red':''" @click="goNext" >下一步</div>

  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        phone_num:'12345678901',
        passwordShow:false,
        checkTrue:true,
      }
    },
    created(){

    },
    mounted(){
      this.$loading.show=false
    },
    methods:{
      goNext(){
        if(this.checkTrue){
          this.$router.push({path:'code_login_next',query:{mobile:this.phone_num}})
        }else{
          this.$toast('请输入正确的手机号')
        }
      }
    },
    watch:{
      phone_num(val){
        this.checkTrue = this.checkPhone(val)
      }
    }

  }
</script>

<style lang="scss" scoped>
  #sigin1{
    ::-webkit-input-placeholder{
      color:#CBCBCB;
    }
    input{
      background: transparent;
    }
    .top-text{
      padding:.34rem 1.05rem;
      font-size: .48rem;
      color: #2E2E2E;
    }

    .phone-box{
      padding-top:1.58rem;
      .tip{
        padding:0 0 0.1rem 1.05rem;
        color: #909090;
      }
      .phone{
        display: flex;
        justify-content: center;
        align-items: center;
        width:5.4rem;
        margin:0 auto;
        padding-bottom:.1rem;
        border-bottom:1px solid #E3E3E3;
        input{
          font-size: .36rem;
          flex:1;
          overflow: hidden;
        }
        .get-code{
          color:#FF1919;
          font-size: .32rem;
        }
      }

      .password{
        display: flex;
        width:5.4rem;
        margin:.66rem auto .1rem auto;
        padding-bottom:.1rem;
        border-bottom:1px solid #E3E3E3;
        input{
          font-size: .36rem;
          flex:1;
          overflow: hidden;
        }
        img{
          height:.44rem;
          width:.44rem;
        }
      }

      .pass-tip{
        color: #909090;
      }
    }

    .next-btn{
      width:5.4rem;
      margin:.81rem auto;
      margin-bottom:0;
      height:.88rem;
      line-height: .88rem;
      text-align: center;
      font-size: .32rem;
      color:#fff;
      background:linear-gradient(90deg,rgba(255,181,181,1),rgba(255,169,141,1));
      border-radius: 0.16rem ;
    }
    .btn-red{
      background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    }
  }

</style>
