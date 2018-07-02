<template>
  <div class="top-wrapper">
    <div class="info bg-f border-bottom-1px">
      <div class="gender font30 border-bottom-1px" @click="appOpen('modifyGender',{genders:userInfo.gender})">
        <div class="clearfix">
          <span>性别</span>
          <p class="fr rin-con">{{userInfo.gender | selectGender}}</p>
        </div>
      </div>
      <div class="gender font30 border-bottom-1px" @click="appOpen('selectPolitics',{politics:userInfo.politicalStatus})">
        <div class="clearfix">
          <span>政治面貌</span>
          <p class="fr rin-con">{{userInfo.politicalStatus}}</p>
        </div>
      </div>
        <selectProvince :name="'故乡'" :addressName="userInfo.hometown" ref="a" class="border-bottom-1px"></selectProvince>
        <selectProvince :name="'所在地'" :addressName="userInfo.locus" ref="b" class="border-bottom-1px"></selectProvince>
      <div class="gender font30 border-bottom-1px" @click="appOpen('selectWork',{works:userInfo.profession})">
        <div class="clearfix">
          <span>所属行业</span>
          <p class="fr rin-con">{{userInfo.profession}}</p>
        </div>
      </div>
      <div class="gender font30 border-bottom-1px" @click="appOpen('modifyName',{where:'email'})">
        <div class="clearfix">
          <span>邮箱</span>
          <p class="fr rin-con" :class="{'font-col':!userInfo.email}">{{userInfo.email ? userInfo.email : '暂未设置'}}</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import selectProvince from '@/components/common/selectAddress'

  export default {
    data() {
      return {
        userInfo:"",

      }
    },
    filters:{
      //性别
      selectGender(sex){
        var str = '';
        switch (sex) {
          case "u":
            str = '保密';
            break;
          case "f":
            str = '女'
            break;
          case "m":
            str = '男'
            break;
        }
        return str;
      },
    },
    created() {
      this.getData();
      document.title = '信息完善'
      this.$header.setTitle('信息完善')
    },
    mounted(){
      //notify刷新页面
      window.completeInfoRefresh=(res)=>{
        this.getData();
      }
      setTimeout(()=>{
        this.syJsbIosRegisterHandler('completeInfoRefresh')
      },0)
    },
    components: {selectProvince},
    methods: {
      //获取信息
      getData(){
        this.getWithToken("/user-center/usr/memberByToken").then(res => {
          if(res.code == 200){
            this.userInfo = res.content;
          }else {
            this.$toast(res.message)
          }
          this.$loading.show=false
        })
      },
    }
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
    background: url("/static/images/common/arrow.png") no-repeat 96% 50%;
    background-size:.13rem .22rem ;
  }
  .rin-con {
    margin-right:.62rem;
  }
  .font-col {
    color:rgba(208,208,208,1) !important;
  }

</style>
