<template>
    <div class="union-choose">
      <div class="next">
        {{allData[0].unionName}}
      </div>
      <div class="p border-bottom-1px border-top-1px">
        <div class="next-item border-bottom-1px" :key="index" v-for="(item,index) in allData" @click="goUrl(item)" v-if="item.orgJoinStatus!='close'">
          <p class="name">{{item.orgName}}</p>
          <span class="number">{{item.memberNums}}人</span>
          <img :src="item.img==0?imgUrl+'/applyRefund/nochoose.png':imgUrl+'/applyRefund/choose.png'" alt="" class="more-img">
        </div>
      </div>
      <div class="iphone10-footer-padding34" style="height: 0.98rem;width: 100%"></div>
      <div class="iphone10-footer-padding union-p">
        <div class='union-footer' @click="goNext">{{allDataComp}}</div>
      </div>
    </div>
</template>

<script>
  import * as typeFn from '../../requests/union'
	export default {
		data() {
			return {
        allData:[{unionName:''}],
        appInfo:''
      }
		},
		created() {
      this.$header.close=true
      this.$header.isHistory=true
		  this.where = this.$route.query.where
      this.$header.setTitle('选择单位')
      this.unionCode=this.$route.query.unionCode
      this.orgId=this.$route.query.orgId
      this.appInfo={
        orgId:this.orgId||'',
        unionCode:this.unionCode||'',
        clientType:'',
        appVersion:'',
        appStoreId:'',
      }

      typeFn['getUnionOrgList'](this.appInfo).then((res)=>{
        this.$loading.show=false
        if(res.data.code==200){
          for(var i=0;i<res.data.content.length;i++){
            res.data.content[i]['img']=0
          }
          this.allData=res.data.content
        }
      })
		},
    computed: {
      allDataComp: function () {
        var data=''
        for(var i=0;i<this.allData.length;i++){
          if(this.allData[i].img==1){
            data=this.allData[i]
            break;
          }
        }
        if(data.isLeaf==1){
          return '完成';
        }else{
          return '下一级';
        }
      }
    },
		methods: {
      goNext(){
        var item =''
        for(var i=0;i<this.allData.length;i++){
          if(this.allData[i].img==1){
            item=this.allData[i]
          }
        }
        if(item==''){
          this.$toast('您还没有选择单位')
          return ;
        }
        if(item.orgJoinStatus!='open') {
          this.$toast('该部门为限制加入部门！');
          return;
        }
        this.appInfo={
          orgId:item.orgId,
          unionCode:'',
          clientType:'',
          appVersion:'',
          appStoreId:'',
        }
        if(item.isLeaf==1){
          var data={
            orgId:item.orgId,
            staffCode:''
          }
          typeFn['getUnionJoinOrg'](data).then((res)=>{
            if(res.data.code==200){
//              if(this.where=='userCeter')
              this.appNotify({callback:'userSettingRefresh'})
              this.appNotify({callback:'mineRefresh'})
              this.appNotify({callback:'refreshIndexPage'})
              this.syJsbCloseAppPage(0,2)
//              this.appOpen('userSetting')
            }else{
              this.$toast(res.data.message)
            }
          })
        }else{
          window.location.href=window.location.protocol+'//'+window.location.host+'/unionChooseNext?where='+this.where+'&orgId='+item.orgId
//          this.$router.push({path:"/unionChooseNext",query:{where:this.where,orgId:item.orgId}})
//          this.appOpen('unionChooseNext',)
        }
      },
		  goUrl(item){
		    for(var i=0;i<this.allData.length;i++){
          this.allData[i].img=0
        }
        item.img=1
        return;
      },
    },
		components: {}
	}
</script>

<style lang="scss" scoped>
  .union-p{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .union-footer{
    height: 0.98rem;
    width: 100%;
    text-align: center;
    line-height: 0.98rem;
    font-size:0.32rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    color:rgba(255,255,255,1);
  }
.union-choose{
  width: 7.5rem;
  overflow: hidden;
.next{
line-height: 0.72rem;
  padding-left: 0.3rem;
  font-size:0.26rem;
  color:rgba(148,148,148,1);
  height:0.72rem;
  background:rgba(250,250,250,1);
}
  .more-img{
    width: 0.44rem;
    height: 0.44rem;
    margin-top: -0.22rem;
    position: absolute;
    top:50%;
    right:0.3rem;
  }
  .p{
    position: relative;
    padding-left: 0.3rem;
    background:rgba(255,255,255,1);
  }
  .next-item:nth-last-child(1)::after{
    border: 0;
  }
  .next-item{
    position: relative;
    height: 1.2rem;
    overflow: hidden;
  }
  .name{
    margin-top: 0.24rem;
    height:0.42rem;
    font-size:0.3rem;
    color:rgba(75,75,75,1);
    line-height:0.42rem;
  }
  .number{
    height:0.33rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(148,148,148,1);
    line-height:0.33rem;
  }
}
</style>
