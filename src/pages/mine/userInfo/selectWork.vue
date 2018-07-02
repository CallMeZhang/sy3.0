<template>
  <div class="user-info iphoneTop-box">
    <div v-title="'选择所属行业'"></div>
    <div class="info bg-f border-bottom-1px">
      <div class="gender font30 border-bottom-1px"  v-for="work in workList" @click="checkGender(work)">
        <div class="clearfix">
          <span>{{work.name}}</span>
          <img :src="imgUrl+'/common/checked2.png'" alt="选中" class="checked fr" v-show="works === work.code">
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:"selectWork",
    components:{},
    data(){
      return {
        works:'',
        workList:[
          {name:'IT/通信/电子/互联网',code:'1'},
          {name:'金融业',code:'2'},
          {name:'房地产/建筑业',code:'3'},
          {name:'商业服务',code:'4'},
          {name:'贸易/批发/零售/租赁业',code:'5'},
          {name:'文体教育/工艺美术',code:'6'},
          {name:'生产/加工/制造',code:'7'},
          {name:'交通/运输/物流/仓储',code:'8'},
          {name:'服务业',code:'9'},
          {name:'文化/传媒/娱乐/体育',code:'10'},
          {name:'能源/矿产/环保',code:'11'},
          {name:'政府/非营利机构',code:'12'},
          {name:'农林牧渔',code:'13'},
          {name:'自由职业',code:'14'},
          {name:'离退休',code:'15'},
          {name:'学生',code:'16'},
          {name:'其他',code:'17'}
        ]
      }
    },
    created(){
      this.works = this.$route.query.works || '';
    },
    mounted(){
      this.$header.setTitle('选择所属行业')
      this.$loading.show=false
    },
    methods:{
      checkGender(work){
        this.works = work.code;
        this.postWithToken("/user-center/usr/modifyProfession",{profession:work.code}).then(res=>{
          if(res.code == 200){
            this.appNotify({callback:'completeInfoRefresh'})
            this.$toast(res.message)
            setTimeout(()=>{
              this.syJsbCloseAppPage(0,1)
            },1000)
          }else{
            this.$toast(res.message)
          }
        })
      }
    },


  }
</script>

<style lang="scss" scoped>
  .user-info {
    background: #FAFAFA;
    height: 100%;
  }
  .info {
    padding-left:.3rem;
  }
  .gender {
    color:rgba(75,75,75,1);
    line-height:0.88rem;
  }
  .checked {
    width:0.42rem;
    height:0.37rem;
    padding:.26rem .3rem 0 0;
  }
</style>
