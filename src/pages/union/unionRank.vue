<template>
    <div class="union-rank">
      <div style="width: 100%;overflow-x: scroll;height:0.9rem;-webkit-overflow-scrolling: touch;">
        <div class=' flex-top border-bottom-1px'>
        <div class="item1" @click="getData('goverment')">
          <div class="type" :class="{'activity':type=='goverment'}">中央和国家机关
          <div v-if="type=='goverment'" class="border-b"></div>
          </div>
        </div>
        <div class="item1" @click="getData('centralEnterprise')">
          <div class="type" :class="{'activity':type=='centralEnterprise'}">央企
            <div v-if="type=='centralEnterprise'" class="border-b"></div>
          </div>
        </div>
        <div class="item1" @click="getData('enterprise')">
          <div class="type" :class="{'activity':type=='enterprise'}">地方
            <div v-if="type=='enterprise'" class="border-b"></div>
          </div>
        </div>
        <div class="item1" @click="getData('finance')">
          <div class="type" :class="{'activity':type=='finance'}">金融机构
            <div v-if="type=='finance'" class="border-b"></div>
          </div>
        </div>
        <div class="item1" @click="getData('school')">
            <div class="type" :class="{'activity':type=='school'}">高校
              <div v-if="type=='school'" class="border-b"></div>
            </div>
          </div>
        <div class="item1" @click="getData('socialGroups')">
            <div class="type" :class="{'activity':type=='socialGroups'}">社会力量
              <div v-if="type=='socialGroups'" class="border-b"></div>
            </div>
          </div>
      </div>
      </div>
      <div class="time" v-if="false">
        更新于 8月12日 24:00
      </div>
      <div class="flex-able bg-light">
        <div class="" style="width: 1.5rem">排名</div>
        <div class="" style="width: 2.9rem;text-align: left;padding-left: 0.7rem;box-sizing: border-box;">公益伙伴</div>
        <div class="item" style="text-align: left" @click="goHelp">人均公益积分<img :src="imgUrl+'/biz/quest-bg.png'" alt="" style="margin-left:0.11rem;width: 0.27rem !important;display: inline-block;vertical-align: middle;"></div>
      </div>
      <div v-for="(item,index) in allData[type]" class="rank-item border-bottom-1" @click="goUnion(item)" :key="item.unionId">
        <div class="rank-d  flex-able">
          <!--<img :src="imgUrl+'/coupon/'+index+'.png'" alt="" v-if="index<3" class="rank-img">-->
          <span class="span-one ">
            <img :src="imgUrl+'/coupon/'+index+'.png'" alt="" v-if="index<3" class="rank-img">
            <span v-if="index>=3">{{parseInt(index)+1}}</span></span>
          <span class="span-two"><img :src="item.UnionIcon+ossUrl('webp_120')" alt="" class="span-img">{{item.unionName}}</span>
          <!--<span class="span-three">(人均<span class="font-n">42</span>公益积分)</span>-->
          <span class="span-three item bg-union" style="font-weight: normal">{{item.desc|changeNumber}}</span>
        </div>
        <div v-if="false">
          <div class="left-div b-right">
            <div class="juanz">
              公益捐赠 <span class="font22">(元)</span>
            </div>
            <div class="num">
              {{item.donate|changeNumber}}
            </div>
          </div>

          <div class="right-div">
            <div class="juanz">
              公益消费 <span class="font22">(元)</span>
            </div>
            <div class="num">
              {{item.buy|changeNumber}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="allData[type].length==0" style="height: 100%;overflow: hidden;background: #fff;">
        <div style="padding-right: 0.25rem">
          <img src="../../../static/images/common/error.png" alt="" style="width: 3.1rem;display: block;margin: 0 auto;margin-top: 2.3rem">
          <p style="text-align: center;font-size:0.32rem;color:rgba(208,208,208,1);margin-top: 0.8rem">暂无伙伴</p>
        </div>
      </div>
    </div>
</template>

<script>
  import * as typeFn from '../../requests/union'
	export default {
		data() {
			return {
        allData:{
          goverment:[],
          centralEnterprise:[],
          enterprise:[],
          socialGroups:[],
          school:[],
          finance:[]
        },
        type:'goverment'
      }
		},
		created() {
      this.$header.setTitle('公益伙伴光荣榜')
      var that =this
      new Promise((resolve, reject) => {
        that.syJsbGetAppInfo(function (appInfo) {
          if (!appInfo) {
            resolve(appInfo)
          }else{
            if(typeof appInfo=='string'){
              appInfo=JSON.parse(appInfo)
            }
            resolve(appInfo)
          }

        })
      }).then((res)=>{
        that.appInfo={
          type:'2',
          clientType:res['platform']?res['platform']:'H5',
          appVersion:res['ver']?res['ver']:'3.0',
          appStoreId:'',
        }
        typeFn['getUnionGetTopUnion'](that.appInfo).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            that.allData[that.type]=res.data.content.list
          }
        })
      })
		},
    filters:{
      time(p){
        return new Date(p).toLocaleString()
      },
      number(p){
        return p<10?'0'+p:p
      },
      changeNumber(num){
        if(!num){
          num=0
        }
        var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return c;
      }
    },
		methods: {
      goHelp(){
        this.appOpen('letterDetails?where=userCenter&noticeId=0d4f3833961e4ee99d8bc92a26a81a3d')
      },
		  goUnion(p){
        this.appOpen('union',{unionId:p.unionId,unionCode:p.unionCode})
      },
      getData(p){
        this.type=p
        var d='2'
        //1 高校 2 中央和国家机关 3 央企 4 社会力量 5 地方 6 金融机构
        switch(this.type){
          case 'enterprise':d='5';break;
          case 'goverment':d='2';break;
          case 'centralEnterprise':d='3';break;
          case 'socialGroups':d='4';break;
          case 'finance':d='6';break;
          case 'school':d='1';break;
        }
        this.getUnionGetTopUnion(d)
      },
      getUnionGetTopUnion(p){
        this.appInfo.type=p
        typeFn['getUnionGetTopUnion'](this.appInfo).then((res)=>{
          if(res.data.code==200){
            this.allData[this.type]=res.data.content.list
          }

        })
      }
    },
		components: {}
	}
</script>

<style lang="scss" scoped>
  .border-bottom-1{
    position: relative;
    margin-top: 1px !important;
    &::after{
      border-bottom: 1px solid #e3e3e3;
      position: absolute;
      display: block;
      left: 0;
      width: 100%;
      content: '';
      box-sizing: border-box;
      bottom: 0px;
      transform: scaleY(0.5);
    }
  }
.union-rank{
  width: 7.5rem;
  overflow: hidden;
  .span-img{
    float: left;
    width: 0.6rem;
    height: 0.6rem;
    margin-top: 0.1rem;
    margin-right: 0.1rem;
  }
  .bg-light{
    background:rgba(249,249,249,1) !important;
    height: 0.72rem;
    line-height: 0.72rem;
    font-size:0.26rem;
    color:rgba(148,148,148,1);
    text-align: center;
    padding-left: 0.2rem;
  }
  .bg-union{
    background: url(../../../static/images/common/arrow2.png) no-repeat right center !important;
    background-size: 0.44rem !important;
  }
  .font22{
    font-size: 0.22rem;
  }
  .b-right{
    border-right: 1px solid #E3E3E3;
  }
  .left-div,.right-div{
    margin-top: 0.29rem;
    box-sizing: border-box;
    width: 50%;
    float: left;
    text-align: center;
  }
  .num{
    margin-top: 0.03rem;
    height:0.45rem;
    font-size:0.32rem;
    font-weight: 600;
    color:rgba(75,75,75,1);
    line-height:0.45rem;
  }
  .juanz{
    height:0.37rem;
    font-size:0.26rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.37rem;
  }
  .rank-img{
    z-index: 10;
    width: 0.57rem;
    margin-top: 0.31rem;
  }
  .rank-item{
    height: 1.2rem;
    margin:0 0 0 0.2rem;
    background: #fff;
    width: 7.5rem;
  }
  .font-n{
    font-weight: normal;
  }
  .span-three,.span-two,.span-one{
    height: 1.2rem;
    line-height: 1.2rem;
  }
  .span-three{
    font-size:0.28rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
  }
  .span-two{
    width: 2.9rem;
    height:0.88rem;
    font-size:0.3rem;
    color:rgba(75,75,75,1);
    line-height:0.88rem;
  }
  .span-one{
    text-align: center;
    width: 1.5rem;
    font-size:0.3rem;
    color:rgba(75,75,75,1);
  }
  .rank-d{
    padding-right: 0.14rem;
    position: relative;
    margin-right: 0.16rem;
    height: 1.2rem !important;
    line-height: 1.2rem !important;
  }
  .time{
    text-align: center;
    font-size:0.26rem;
    color:rgba(208,208,208,1);
    height: 0.72rem;
    line-height:0.72rem;
  }
  .activity{
    color:rgba(255,25,25,1) !important;
  }
  .flex-able{

    background: #fff;
    height: 0.9rem;
    line-height: 0.9rem;
    flex-direction: row;
    position: relative;
    clear: both;
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    align-items: center
  }
  .border-b{
    position: absolute;
    bottom: 0;
    width: 100%;
    height:0.04rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));

  }
  .flex-top{
     background: #fff;
     padding:0 0 0 0.2rem;
     width: 8.55rem;
     overflow: hidden;
   }
  .item {
    height: 100%;
    flex: 1;
  }
  .item1 {
    height: 100%;
    margin-right: 0.4rem;
    float: left;
  }
  .item1:nth-last-of-type(1){
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
}
</style>
