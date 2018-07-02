<template>
  <div class="service">
    <div v-title="'公益平台客服'"></div>
    <div class="guess clearfix" @click="appOpen('questionList')">
      <span class="red-bor fl"></span>
      <span class="want fl">猜你想问</span>
      <span class="look-all fr">查看全部</span>
    </div>
    <!--list-->
    <div class="list border-bottom-1px border-top-1px">
      <div class="list-det" :class="{'border-top-1px':k != 0}" v-for="(i,k) in list" @click="appOpen('letterDetails',{noticeId:i.id,where:'userCenter'})">
        <p class="det no-enter">{{i.name}}</p>
      </div>
    </div>
    <!--按钮-->
    <div class="fixed btn-pos iphone10-footer-padding">
      <div class="border-top-1px">
        <div class="flex con">
          <div class="item" @click="kfzx">
            <img :src="imgUrl+'/mine/service.png'" alt="" class="btn-img">
            <p class="btn-det">在线咨询</p>
          </div>
          <div class="item" @click="jsCallPhone('4006667308')">
            <img :src="imgUrl+'/mine/phone.png'" alt="" class="btn-img">
            <p class="btn-det">电话联系</p>
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
        headUrl:'',
        name:'',
        speciesId:'02aa21aae59f4c3eae89f061f6c80441',
        pageNo:1,
        pageSize:10,
        list:[
          {name:'在哪里查看订单？',id:'4d0edcaad0fd4a17b082270ef0aa713b'},
          {name:'怎么查询物流信息？',id:'56ed9dd70da44ce883618fe5e0f2885a'},
          {name:'我无法及时收货怎么办？',id:'1b32559e02454ed7a478a91fb22a53c2'},
          {name:'如何下企业采购订单？',id:'82be76c21a0c415ea5d529406ca1c76b'},
          {name:'企业采购合同寄送问题。',id:'f96d218610d7467ba1004623c30101cf'},
          {name:'企业采购如何付款？',id:'0d724fafc96a447eb2c48ec6648b68ef'},
          // {name:'集采订单发送到不同的地址需要分别下单吗？',id:'c4f3cc7456d4483e9bf7017ad12e20ba'},
          {name:'为什么我购买产品/捐赠项目后没有积分奖励？',id:'4d4f755a8d8b4f13954907ef192a3840'},
          {name:'如何购买扶贫码？',id:'11136e36621c4d4cad42a7e59a044c59'},
        ]
      }
    },
    created(){
      this.headUrl = this.$route.query.headUrl || ''
      this.name = this.$route.query.name || ''
      // this.getData();
    },
    mounted(){
      this.$header.setTitle('公益平台客服')
      this.$loading.show = false
    },
    methods:{
      kfzx(){
        this.m7Chat(
          {
          head_image:this.headUrl,
          member_truename:this.name
          }
        )
      },
      //获取数据
      // getData(){
      //   this.get('/sy3_cms/helpCenter/user/list',{speciesId:this.speciesId,pageNo:this.pageNo,pageSize:this.pageSize}).then(res => {
      //     if(res.code == 200){
      //       this.list = res.data.articleList;
      //     }else{
      //       this.$toast(res.message)
      //     }
      //     this.$loading.show = false
      //   })
      // },
    },


  }
</script>

<style lang="scss" scoped>
  .service {
    height:100%;
    background: #fff;
  }
  .guess {
    margin-right:.3rem;
    background: url('/static/images/common/arrow2.png') no-repeat 102% 49%;
    background-size: .44rem;
  }
  .red-bor {
    display: inline-block;
    width:0.1rem;
    height:0.32rem;
    background:rgba(255,101,51,1);
    margin:.32rem .1rem 0;
  }
  .want {
    font-size:0.36rem;
    color:rgba(46,46,46,1);
    line-height:0.98rem;
    font-weight: 700;
  }
  .look-all {
    font-size:0.26rem;
    color:rgba(148,148,148,1);
    line-height:0.98rem;
    font-weight: 300;
    padding-right:.28rem;
  }
  /*列表*/
  .list {
    padding-left:.3rem;
  }
  .list-det {
    background: url('/static/images/common/arrow2.png') no-repeat 97.2% center;
    background-size: .44rem;
  }
  .det {
    font-size:0.3rem;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
    width: 5.94rem;
  }
  /*按钮*/
  .btn-pos {
    width:100%;
    bottom:0;
    left:0;
  }
  .con {
    height:1.4rem;
    background:rgba(248,248,248,1);
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .item {
    width: 50%;
    height:100%;
    text-align: center;
  }
  .btn-img {
    width:.8rem;
    height:.8rem;
  }
  .btn-det {
    font-size:0.26rem;
    color:rgba(46,46,46,1);
    line-height:0.26rem;
  }
</style>
