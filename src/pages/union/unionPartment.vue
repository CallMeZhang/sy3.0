<template>
    <div class="partment">

      <div class="blank" style="overflow: hidden">
        <div class="rank-parent">
          <div v-for="(item,index) in content" class="rank-item">
            <div style="position: relative">
              <span class='rank' :class="{'org':item.idx<=3}">{{item.idx|number}}</span>
              <span class="address">{{item.name}}</span>
              <span class="prople fr">{{item.value|changeNumber}} <span class="prople-text">{{item.unit}}</span></span>
            </div>
            <div class="rank-div" :style="'width:'+5.12*item.value/content[0].value+'rem'"></div>
          </div>
          <div class="footer-rank">{{$route.query.unionName}}{{$route.query.type|showText}}<span style="font-weight: normal"> {{number|changeNumber}}</span> {{content[0].unit}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import * as typeFn from '../../requests/union'
	export default {
		data() {
			return {
        content:[
          {idx: 1,
          name:"商洛市·商州区·阎村镇人民政府",
          unit:"元/人",
          value:"540"},
          {
            idx: 2,
            name:"商洛市·商州区·阎村镇人民政府",
            unit:"元/人",
            value:"540"},
          {
            idx: 3,
            name:"商洛市·商州区·阎村镇人民政府",
            unit:"元/人",
            value:"540"},
          {
            idx: 4,
            name:"商洛市·商州区·阎村镇人民政府",
            unit:"元/人",
            value:"540"},
          {
            idx: 5,
            name:"商洛市·商州区·阎村镇人民政府",
            unit:"元/人",
            value:"540"}],
        number:'0',
      }
		},
		created() {
      var type = this.$route.query.type
      var id = this.$route.query.id
      var code = this.$route.query.code
		  this.$header.setTitle('精准扶贫报告页')
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
          code:code||'',
          id:id||'',
          type:type||'reg',
          clientType:res['platform']?res['platform']:'H5',
          appVersion:res['ver']?res['ver']:'3.0',
          appStoreId:'',
        }
        typeFn['getUnionOrgTopList'](that.appInfo).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            that.number=res.data.content.count
            that.content=res.data.content.list
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
      showText(p){
        var str=''
        if(p=='buy'){
          str='累计消费金额'
        }else if(p=='reg'){
          str='累计注册'
        }else{
          str='累计人均消费金额'
        }
        return str;
      },
      changeNumber(num){
        if(!num){
          num=0
        }
        var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return c;
      }
    },
		methods: {},
		components: {}
	}
</script>

<style lang="scss" scoped>
.partment{
  overflow: hidden;
  .rank-parent{
    padding: 0.5rem 0.3rem 0 0.32rem;
    box-sizing: border-box;
    width: 100%;
  }
  .rank-item{
    height: 0.87rem;
  }
  .rank{
    height:0.37rem;
    font-size:0.26rem;
    font-weight: 600;
    color:rgba(75,75,75,1);
    line-height:0.37rem;
    padding-right: 0.23rem;
  }
  .org{
    color: #FF6533;
  }
  .rank-item{
    height: 0.87rem;
  }
  .address{
    height:0.33rem;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(75,75,75,1);
    line-height:0.33rem;
  }
  .prople{
    font-size:0.26rem;
    color:rgba(255,25,25,1);
    line-height:0.37rem;
  }
  .rank-div{
    margin-top: 0.14rem;
    margin-left: 0.5rem;
    width:5.2rem;
    height:0.1rem;
    background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
    border-radius: 0.68rem ;
  }
  .footer-rank{
    text-align: center;

    width:6.9rem;
    height:0.4rem;
    background:rgba(255,248,248,1);
    margin: 0 auto;
    font-size:0.24rem;
    font-weight: 300;
    color:rgba(255,101,51,1);
    line-height:0.4rem;
    margin-top: 0.14rem;
    margin-bottom: 0.43rem;
  }
}
</style>
