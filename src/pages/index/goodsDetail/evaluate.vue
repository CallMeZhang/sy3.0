<template>
  <div class="evaluate">
    <div v-title="'帮扶者说'"></div>
    <div class="wrapper">
      <!--顶部-->
      <div class="top plr3">
        <div class="text-center font38"><span class="font42 w-700">{{good_percent}}%</span>好评</div>
        <div class="overview clearfix color2e font26">
          <div class="item fl" v-for="item in 5" :class="active == item?'active':''" @click="active = item">好评 300</div>
        </div>
      </div>
      <div class="border-top-1px border-bottom-1px interval"></div>
      <!--评价内容-->
      <div class="detail">
        <div class="item" v-for="item in 2">
          <div class="con border-bottom-1px">
            <div class="clearfix">
              <div class="left fl">
                <img src="/static/images/common/close.png" alt="头像" class="avatar">
              </div>
              <div class="right ">
                <div class="right-top flex">
                  <div class="name">Pz***asg</div>
                  <div class="star">
                    <img :src="imgUrl + '/common/star.png'" alt="" v-for="item in 3">
                  </div>
                </div>
                <div>小谷是一位年轻的咖啡师，穿梭sdf于咖啡品鉴会的小姑娘，寻找不sd 同品相的咖啡豆，在不断的尝试中进行学习。</div>
                <div class="evaluate-img">
                  <img :src="imgUrl+'/login/login_bg.jpg'" alt="" v-for="item in 3">
                </div>
                <div class="bottom flex space-between">
                  <div>容量：L 颜色：红</div>
                  <div>2018-03-12</div>
                </div>
                <div class="reply color94">
                  <span class="reply-person color4b">张文博回复：</span>小谷是一位年轻的咖啡师，穿梭于咖啡品鉴会的小姑娘，寻找不同品相的咖啡豆，在不断的尝试中进行学习。
                </div>
              </div>
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
    components: {},
    data(){
      return {
        good_percent:'100',
        active:'1'
      }
    },
    created(){
      this.getData()
    },
    mounted(){

    },
    methods: {
      getData(){

      }
    },


  }
</script>

<style lang="scss" scoped>
  .evaluate{
    .wrapper{
      .top{
        padding-top:.3rem;
        .overview{
          padding:.3rem 0 .1rem;
          .item{
            padding:.12rem .2rem;
            border:1px solid #D0D0D0;
            border-radius:.08rem;
            margin:0 .4rem .3rem 0;
            &.active{
              border:1px solid #FF1919;
              color:#FF1919;
            }
          }
        }
      }
      .interval{
        height:.2rem;
        background: #FAFAFA;
      }

      .detail{
        padding-left:.3rem;
        .item{
          .con{
            padding:.4rem 0 .33rem 0;
            .left{
              .avatar{
                height:.7rem;
                width:.7rem;
                border-radius: 50%;
              }
            }
            .right{
              padding-left:1rem;
              padding-right:.3rem;
              .right-top{
                justify-content: space-between;
                .star img{
                  width:.28rem;
                }
              }
              .evaluate-img {
                padding:.2rem 0 .25rem 0;
                img{
                  height:1.64rem;
                  margin-right:.1rem;
                }
              }
              .reply{
                background: #F0F0F0;
                padding:.14rem .2rem;
                border-radius: .04rem;
                margin-top:.2rem;
                .reply-person{

                }
              }
            }
          }
        }
      }
    }
  }
</style>
