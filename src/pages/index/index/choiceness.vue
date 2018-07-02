<template>
  <!-- 精选 -->
  <div class="choiceness">
    <div class="i-title">
      <div class="flex between">
        <div class="w-700 font48 color2e">{{data.topic.name}}</div>
        <div class="i-title-right" v-if="data.topic.moreLink">
          <div class="flex between" @click="appOpen(data.topic.moreLink,{},true)">
            <div class="font26 color94">{{data.topic.moreName}}</div>
            <div class="arrow"><img :src="imgUrl+'/common/arrow2.png'" alt=""></div>
          </div>
        </div>

      </div>
    </div>
    <div class="choiceness-box">

      <div class="choiceness-con border-bottom-1px">
        <div class="flex" v-if="data.topic.content.length">
          <div class="c-left-img relative">
            <img v-lazy="data.topic.content[0].image + ossUrl('webp_480')" alt="" @click="open(data.topic.content[0])">
            <div class="c-img-tip">{{data.topic.content[0].tag}}</div>
          </div>
          <div class="c-right-img flex-1">
            <div class="clearfix">
              <div class="fl c-top-img relative">
                <img v-lazy="data.topic.content[1].image + ossUrl('webp_240')" alt=""  @click="open(data.topic.content[1])">
                <div class="c-img-tip">{{data.topic.content[1].tag}}</div>
              </div>
              <div class="fr c-top-img relative">
                <img v-lazy="data.topic.content[2].image + ossUrl('webp_240')" alt=""  @click="open(data.topic.content[2])">
                <div class="c-img-tip">{{data.topic.content[2].tag}}</div>
              </div>
            </div>
            <div class="c-bottom-img relative">
              <img v-lazy="data.topic.content[3].image + ossUrl('webp_240')" alt=""  @click="open(data.topic.content[3])">
              <div class="c-img-tip">{{data.topic.content[3].tag}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'
  export default {
    props:['data'],
    components: {},
    data(){
      return {
        isLoading: true,
      }
    },
    created(){

    },
    mounted(){

    },
    methods: {
      open(item){
       this.$parent.open(item)
      }
    },


  }
</script>

<style lang="scss" scoped>
  @import './css';
  .choiceness{
    padding-bottom:.28rem;
    img{
      display: block;
    }
    .choiceness-box{
      padding:0 .3rem;
    }
    .choiceness-con{
      padding-bottom:.49rem;
      height:100%;
      .c-left-img{
        width:2.3rem;
        height:3.8rem;
        img{
          height:3.8rem;
          width:2.3rem;
        }
      }
      .c-right-img{
        padding-left:.1rem;

        .c-top-img{
          width:2.2rem;
          height:2rem;
          img{
            width:2.2rem;
            height:2rem;
          }
        }
        .c-bottom-img{
          margin-top:.1rem;
          height:1.7rem;
          img{
            width:100%;
            height:1.7rem;
          }
        }
      }
      .c-img-tip{
        position: absolute;
        left:.28rem;
        top:.2rem;
        height:0.33rem;
        padding:0 .14rem;
        font-size:0.24rem;
        color:#fff;
        background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
        border-radius: 1.03rem 0.02rem 1.03rem 1.03rem ;
        line-height:0.33rem;
      }
    }
  }
</style>
