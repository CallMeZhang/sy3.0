<template>
  <div class="user-info iphoneTop-box">
    <div v-title="'修改性别'"></div>
    <div class="info bg-f border-bottom-1px">
      <div class="gender font30 border-bottom-1px"  v-for="gender in genderList" @click="checkGender(gender)">
        <div class="clearfix">
          <span>{{gender.name}}</span>
          <img :src="imgUrl+'/common/checked2.png'" alt="选中" class="checked fr" v-show="genders === gender.gen">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    name:'modifyGender',
    components:{},
    data(){
      return {
        genders:'',
        genderList:[
          {name:'男',gen:'m'},
          {name:'女',gen:'f'},
          {name:'保密',gen:'u'}
        ]
      }
    },
    created(){
      this.genders = this.$route.query.genders || '';
    },
    mounted(){
      this.$header.setTitle('修改性别')
      this.$loading.show=false
    },
    methods:{
      checkGender(gender){
        this.genders = gender.gen;
        this.postWithToken("/user-center/usr/modifyGender",{gender:gender.gen}).then(res=>{
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
