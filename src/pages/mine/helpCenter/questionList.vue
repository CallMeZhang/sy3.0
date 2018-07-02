<template>
  <div class="service">
    <div v-title="'公益平台客服'"></div>
    <!--<div class="fixed bg-f" style="z-index: 100">-->
      <!--<div class="flex bg-f head">-->
        <!--<div class="head-com font30 relative" :class="{'read-font':chooseType=='common'}" @click="select('common')">-->
          <!--<p>购买回复问题</p>-->
          <!--<div class="red-line absolute" v-show="chooseType=='common'"></div>-->
        <!--</div>-->
        <!--<div class="head-com font30 relative" :class="{'read-font':chooseType=='system'}" @click="select('system')">-->
          <!--<p>公益志愿</p>-->
          <!--<div class="red-line absolute" v-show="chooseType=='system'"></div>-->
        <!--</div>-->
        <!--<div class="head-com font30 relative" :class="{'read-font':chooseType=='module'}" @click="select('module')">-->
          <!--<p>其他问题</p>-->
          <!--<div class="red-line absolute" v-show="chooseType=='module'"></div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="fixed bg-f list-top">
        <div class="border-bottom-1px">
          <div class='flex-top' :class="{'title-width':titleList.length > 4}">
            <div class="item" v-for="(list,li) in titleList">
              <div class="type" :class="{'activity':type == (choose = li)}" @click="select(list,li)">
                {{list.title}}
                <div :class="{'border-b':type == (choose = li)}"></div>
              </div>
            </div>
          </div>
        </div>

    </div>
    <div style="height:.9rem;"></div>

    <!--list-->
    <!--<div class="list border-bottom-1px list-det" :class="{'border-top-1px':k != 0}" v-for="(i,k) in list" @click="appOpen('letterDetails',{noticeId:i.articleId,where:'userCenter'})">-->
    <div class="list border-bottom-1px list-det" v-for="(i,k) in list" @click="appOpen('letterDetails',{noticeId:i.articleId,where:'userCenter'})">
      <div class="det no-enter">{{i.articleTitle}}</div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    components:{},
    data(){
      return {
        chooseType:'common',
        speciesId:'',
        pageNo:1,
        pageSize:10,
        list:[],
        type:0,
        titleList:[
          // {title:'订单问题',id:'6ab61e96927e4cbe915f0d031838be1d'},
          // {title:'企业采购',id:'63a64d38be6540679185103e3590aa48'},
          // {title:'我的钱包',id:'bdf09ccfa5524ee98eee2aa283b9328e'},
          // {title:'善源公益',id:'63a64d38be6540679185103e3590aa48'},
          // {title:'一起志愿',id:'6ab61e96927e4cbe915f0d031838be1d'},
          // {title:'其他问题',id:'bdf09ccfa5524ee98eee2aa283b9328e'}
        ],
        choose:0
      }
    },
    created(){
      // this.getData('6ab61e96927e4cbe915f0d031838be1d')
      this.getHeadList();
    },
    mounted(){
      this.$header.setTitle('公益平台客服')
    },
    methods:{
      select(list,v){
        this.type = v;
        this.getData(list.id);
      },
      //获取头部列表
      getHeadList(){
        this.get('/sy3_cms/helpCenter/user/speciesList').then(res => {
          if(res.code == 200){
            this.titleList = res.data.titleList;
            this.getData(this.titleList[0].id)
          }else{
            this.$toast(res.message)
          }
          this.$loading.show = false
        })
      },
      //获取数据
      getData(id){
        this.get('/sy3_cms/helpCenter/user/list',{speciesId:id,pageNo:this.pageNo,pageSize:this.pageSize}).then(res => {
          if(res.code == 200){
            this.list = res.data.articleList;
          }else{
            this.$toast(res.message)
          }
        })
      },
    },


  }
</script>

<style lang="scss" scoped>
  .service {
    /*height:100%;*/
    background: #FAFAFA;
  }
  .head {
    width:100%;
    height:.9rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom:1px solid #E3E3E3;
  }
  .head-com {
    width:2.5rem;
    height:.9rem;
    text-align: center;
    line-height:.86rem;
    font-weight: 300;
  }
  .red-line {
    width:2rem;
    height:0.04rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    left:.25rem;
    bottom:0;
    z-index:10;
  }
  .read-font {
    color:rgba(255,25,25,1) !important;
    font-weight: 400 !important;
  }
  /*列表*/
  .list {
    padding-left:.3rem;
    background-color: #fff;
  }
  .list-det {
    background: url('/static/images/common/arrow2.png') no-repeat 98% center;
    background-size: .44rem;
  }
  .det {
    font-size:0.3rem;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
    width: 5.94rem;
  }
  /*头部list*/
  .list-top{
    z-index: 100;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    height:0.9rem;
    -webkit-overflow-scrolling: touch;
    white-space:nowrap;
  }
  .flex-top{
    padding:0 0.2rem;
    overflow-x: auto;
    overflow-y: hidden;
    white-space:nowrap;
    height: .9rem;
  }
  .item-pos {
    height:.9rem;
  }
  .item {
    min-width:1rem;
    margin-right: 0.4rem;
    display: inline-block;
  }
  .item:nth-last-of-type(1){
    margin-right: 0rem;
  }
  .type{
    height: 100%;
    position: relative;
    text-align: center;
    font-size:0.3rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
    line-height:0.9rem;
  }
  .border-b{
    position: absolute;
    bottom: 0;
    width: 100%;
    height:0.04rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
  }
  .activity{
    color:rgba(255,25,25,1) !important;
  }
</style>
