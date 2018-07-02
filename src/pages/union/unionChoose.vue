<template>
    <div class="union-rank" style="height:100%;padding-bottom: 0.9rem;box-sizing: border-box;">
      <div style="width: 100%;overflow-x: scroll;height:0.9rem;-webkit-overflow-scrolling: touch;">
        <div class='flex-top scroll-div border-bottom-1px'>
          <div class="item" @click="getData('hot')">
            <div class="type" :class="{'activity':type=='hot'}">火热集结
              <div v-if="type=='hot'" class="border-b"></div>
            </div>
          </div>
          <div class="item" @click="getData('zhongyang')">
            <div class="type" :class="{'activity':type=='zhongyang'}">中央和国家机关
              <div v-if="type=='zhongyang'" class="border-b"></div>
            </div>
          </div>
          <div class="item" @click="getData('yangqi')">
            <div class="type" :class="{'activity':type=='yangqi'}">央企
              <div v-if="type=='yangqi'" class="border-b"></div>
            </div>
          </div>
          <div class="item" @click="getData('difang')">
            <div class="type" :class="{'activity':type=='difang'}">地方
              <div v-if="type=='difang'" class="border-b"></div>
            </div>
          </div>
          <div class="item" @click="getData('jingrong')">
            <div class="type" :class="{'activity':type=='jingrong'}">金融机构
              <div v-if="type=='jingrong'" class="border-b"></div>
            </div>
          </div>
          <div class="item" @click="getData('gaoxiao')">
            <div class="type" :class="{'activity':type=='gaoxiao'}">高校
              <div v-if="type=='gaoxiao'" class="border-b"></div>
            </div>
          </div>
          <div class="item" @click="getData('shehui')">
            <div class="type" :class="{'activity':type=='shehui'}">社会力量
              <div v-if="type=='shehui'" class="border-b"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="partment">
        <div v-for="(item,index) in filterUnionList "
             class="rank-item"
             @click="goUrl(item)"
             :class="{'activity-item':item.state}"
             style="position: relative" :key="item.id">
          <div class="cir">
            <img v-lazy="item.image+ossUrl('webp_240')" alt="" style="width: 100%;height: 100%">
          </div>
          <img v-if="item.operateStatus==1" src="../../../static/images/biz/shiyunxing.png" alt="" style="position: absolute;top: 0;left: 0;width: 1rem;">
          <p class="name">{{item.name}}</p>
          <p class="prople">{{item.memberNums}}人</p>
        </div>
        <div v-if="filterUnionList.length==0" style="height: 100%">
          <div style="padding-right: 0.25rem">
            <img src="../../../static/images/common/error.png" alt="" style="width: 3.1rem;display: block;margin: 0 auto;margin-top: 2.3rem">
            <p style="text-align: center;font-size:0.32rem;color:rgba(208,208,208,1);margin-top: 0.8rem">暂无联盟</p>
          </div>
        </div>
      </div>
      <div class="iphonex-bottom-blank" style="background: #FAFAFA;height: 0.9rem"></div>
      <div class="footer-p iphone10-footer-padding">
        <div class="footer" @click="goYiKe">
          未找到单位？以益客身份加入>
        </div>
      </div>
    </div>
</template>

<script>
  import * as typeFn from '../../requests/union'
	export default {
		data() {
			return {
        allData:[],
        type:'hot',
        sendType:'hot',
        appInfo:null,
        unionId:'',
        hotData:'',
        otherData:''
      }
		},
		created() {
		  this.where = this.$route.query.where
      this.unionId = this.$route.query.unionId
      this.$header.setTitle('选择单位')
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
          type:'',
          clientType:res['platform']?res['platform']:'H5',
          appVersion:res['ver']?res['ver']:'3.0',
          appStoreId:'',
        }
        typeFn['getUnionList'](that.appInfo).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            for(var i=0;i<res.data.content.length;i++){
              res.data.content[i]['state']=false
            }
            that.allData=res.data.content
            for(var i=0;i<that.allData.length;i++){
              if(that.allData[i].id==this.unionId){
                that.allData[i]['state']=true
              }
            }
            that.otherData=that.allData
          }
          typeFn['getUnionTopList']().then((res)=>{
            this.$loading.show=false
            if(res.data.code==200){
              for(var i=0;i<res.data.content.length;i++){
                res.data.content[i]['state']=false
              }
              that.hotData=res.data.content.result
              for(var i=0;i<that.hotData.length;i++){
                if(that.hotData[i].id==this.unionId){
                  that.hotData[i]['state']=true
                }
              }
              that.allData=that.hotData;
            }
          })
        })
      })

		},
    computed: {
      filterUnionList: function () {
        var unionList=[]
        unionList = this.allData;
        if(unionList.length==0) return []
        var that=this
        return unionList.filter(function (item) {
          if(that.type=='hot')return true;
          return item.unionType==that.sendType
        });
      }
    },
		methods: {
		  goYiKe(){
        var data={
          orgId:'',
          staffCode:''
        }
        typeFn['getUnionJoinOrg'](data).then((res)=>{
          if(res.data.code==200){
            this.appNotify({callback:'userSettingRefresh'})
            this.appNotify({callback:'mineRefresh'})
            this.appNotify({callback:'refreshIndexPage'})
            this.syJsbCloseAppPage()
          }else{
            this.$toast(res.data.message)
          }
        })
      },
		  goUrl(item){
        this.allData.map((item)=>{
          item.state=false
          return item
        })
        item.state=true
        if(this.where=='userCeter'){
//          this.syJsbCloseAppPage(1,1)
            this.appOpen('unionChooseNext',{where:'userCeter',unionCode:item.code,pageFirst:1})
        }else{
          this.appOpen('unionChooseNext',{where:'',unionCode:item.code,pageFirst:1})
        }
      },
      getData(p){
        this.type=p
        this.allData =this.otherData
        if(p=='gaoxiao'){
          this.sendType='1'
        }else if(p=='zhongyang'){
          this.sendType='2'
        }else if(p=='yangqi'){
          this.sendType='3'
        }else if(p=='shehui'){
          this.sendType='4'
        }else if(p=='difang'){
          this.sendType='5'
        }else if(p=='jingrong'){
          this.sendType='6'
        }else{
         this.allData =this.hotData
        }
//        this.getUnionList()
      },
      getUnionList(){
        var that=this
        var data={
          type:this.sendType,
          clientType:this.appInfo.clientType,
          appVersion:this.appInfo.appVersion,
          appStoreId:this.appInfo.appStoreId,
        }
        typeFn['getUnionList'](data).then((res)=>{
          if(res.data.code==200){
            that.allData[that.type]=res.data.content
          }

        })
      }
    },
		components: {}
	}
</script>

<style lang="scss" scoped>
.union-rank{
  width: 7.5rem;
  background: #FAFAFA;
  .activity-item{
    border-radius: 0.02rem;
    border: 0px;
    box-sizing: border-box;
  }
  .footer-p{
    position: fixed;
    width: 100%;
    bottom: 0;
    height:0.9rem;
  }
  .footer{
    width: 100%;
    padding-left: 0.3rem;
    font-size:0.28rem;
    font-weight: 300;
    color:rgba(255,25,25,1);
    line-height:0.9rem;
    height:0.9rem;
    background:rgba(255,248,248,1);
  }
  .prople{
    margin-top: 0.05rem;
    height:0.33rem;
    font-size:0.24rem;
    text-align: center;
    color:rgba(203,203,203,1);
    line-height:0.33rem;
  }
  .name{
    font-size:0.28rem;
    text-align: center;
    color:rgba(85,85,85,1);
    line-height:0.4rem;
  }
  .cir{
    overflow: hidden;
    width: 0.92rem;
    height: 0.92rem;
    background:rgba(255,248,248,1);
    border: 0px;
    text-align: center;
    line-height: 0.92rem;
    margin: 0.34rem auto 0.21rem;
    font-size:0.36rem;
    font-weight: 600;
    color:rgba(255,25,25,1);
  }
  .font22{
    font-size: 0.22rem;
  }
  .partment{
    padding:0.41rem 0 0 0.25rem;
    box-sizing: border-box;
    overflow: hidden;
    background: #fafafa;
  }
  .rank-item:nth-of-type(3n){
    margin-right: 0;
  }
  .rank-item{
    box-sizing: border-box;
    background: #fff;
    width: 2.1rem;
    height: 2.64rem;
    float: left;
    margin-right: 0.4rem;
    margin-bottom: 0.23rem;
  }
  .font-n{
    font-weight: normal;
  }
  .span-three{
    height:0.4rem;
    font-size:0.28rem;
    font-weight: 300;
    color:rgba(46,46,46,1);
    line-height:0.4rem;
  }
  .span-two{
    height:0.45rem;
    font-size:0.32rem;margin-left: 0.17rem;
    color:rgba(46,46,46,1);
    line-height:0.45rem;
  }
  .span-one{
    height:0.5rem;
    font-size:0.36rem;
    font-weight: 600;
    color:rgba(255,25,25,1);
    line-height:0.5rem;
  }
  .rank-d{
    position: relative;
    height: 0.89rem;
    padding-left:0.2rem;
    line-height: 0.89rem;
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
    width: 10.15rem;
    overflow: hidden;
  }
  .item {
    height: 100%;
    margin-right: 0.4rem;
    float: left;
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
}
</style>
