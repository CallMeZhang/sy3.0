<template>
  <div class="user-info iphoneTop-box">
    <div v-title="'选择政治面貌'"></div>
    <div class="info bg-f border-bottom-1px">
      <div class="gender font30 border-bottom-1px"  v-for="politic in politicList" @click="checkGender(politic)">
        <div class="clearfix">
          <span>{{politic.name}}</span>
          <img :src="imgUrl+'/common/checked2.png'" alt="选中" class="checked fr" v-show="politics === politic.name">
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:"selectPolitics",
    components:{},
    data(){
      return {
        politics:'',
        politicList:[
          {name:'中共党员',code:'party_member'},
          {name:'共青团员',code:'league_member'},
          {name:'民主党派成员',code:'democratic_parties'},
          {name:'无党派人士',code:'nonparty'},
          {name:'群众',code:'masses'}
        ]
      }
    },
    created(){
      this.politics = this.$route.query.politics || '';
    },
    mounted(){
      this.$header.setTitle('选择政治面貌')
      this.$loading.show=false
    },
    methods:{
      checkGender(politic){
        this.politics = politic.name;
        this.postWithToken("/user-center/usr/modifyPoliticalStatus",{politicalStatus:politic.code}).then(res=>{
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
