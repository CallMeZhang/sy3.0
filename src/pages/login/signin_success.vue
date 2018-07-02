<template>
  <div id="login_success">
    <div class="main">
      <div class="title color2e">欢迎来到一起善源</div>
      <div class="text color94">
        已有{{num}}个公益联盟在一起善源 <br>
        开展精准扶贫公益行动，<br>
        快向您所在单位报到吧！
      </div>
      <div class="btn">
        <div class="sy-btn-box">
          <div class="sy-btn" @click="appOpen('/')">立即报道</div>
        </div>
      </div>
      <div class="code-text sy-red font28">扫描部门二维码直接加入</div>
    </div>
    <div class="statistics">
      <div class="box flex">
        <div class="item">
          <div class="tip">公益人士在集结</div>
          <div class="num">8,888,888</div>
        </div>
        <div class="border"></div>
        <div class="item">
          <div class="tip">扶贫产品在上行</div>
          <div class="num">8,888,888</div>
        </div>
        <div class="border"></div>
        <div class="item">
          <div class="tip">贫困户被帮扶</div>
          <div class="num">8,888,888</div>
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
        num:124,
      }
    },
    created(){
      this.getData()
    },
    mounted(){
//      this.$header.show=true
      this.$header.setTitle(' ')
      this.$loading.show=false
    },
    methods:{
      getData(){

      }
    },


  }
</script>

<style lang="scss" scoped>
//@import "/bocm/platformjs/static/css/common.css";
  #login_success{
    .main{
      padding:0 1.05rem;
      .title{
        margin-top:.34rem;
        font-size: .48rem;
      }
      .text{
        margin-top:1.49rem;
        font-size: .36rem;
      }
      .btn{
        margin-top:3.5rem;
      }
      .code-text{
        margin-top:.42rem;
        text-align: center;
      }
    }
    .statistics{
      margin-top:1.5rem;
      .box{
        padding: 0 .4rem;
        justify-content: space-around;
        align-items: center;
        .item{
          .tip{
            color:#4B4B4B;
          }
          .num{
            font-size: .3rem;
          }
        }
        .border{
          width:.02rem;
          height:.5rem;
          background: #CBCBCB
        }

      }
    }

  }


</style>
